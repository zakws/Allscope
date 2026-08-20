import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";

/**
 * Local submission capture.
 *
 * Until email/storage credentials are connected (see docs/INTEGRATIONS.md),
 * validated submissions are written to `.submissions/` at the project root —
 * OUTSIDE `public/`, never web-addressable, and gitignored. The UI reports
 * this state honestly; it never pretends an email was sent.
 */

export interface StoredResult {
  ok: true;
  reference: string;
  integrationConnected: false;
  storedAt: string;
}

export interface FailedResult {
  ok: false;
  formError: string;
  fieldErrors?: Record<string, string>;
}

export type SubmissionResult = StoredResult | FailedResult;

const SUBMISSIONS_DIR = path.join(process.cwd(), ".submissions");

export function makeReference(prefix: "TEN" | "CON" | "EOI"): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ACG-${prefix}-${ymd}-${rand}`;
}

/* ---------- Basic in-memory rate limiting (per runtime instance) ----------
   Production should add platform-level rate limiting / a WAF as well. */

const buckets = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export async function rateLimited(scope: string): Promise<boolean> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "local";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  buckets.set(key, hits);
  return false;
}

/* ---------- Spam heuristics ---------- */

/** Honeypot must be empty; the form must not be submitted inhumanly fast. */
export function looksLikeSpam(formData: FormData): boolean {
  const honeypot = String(formData.get("company_website") ?? "");
  if (honeypot.trim() !== "") return true;
  const startedAt = Number(formData.get("form_started_at") ?? 0);
  if (startedAt > 0 && Date.now() - startedAt < 2500) return true;
  return false;
}

/* ---------- File validation ---------- */

export const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
  ".zip",
] as const;

export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB local capture limit
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024; // 100 MB per submission
export const MAX_FILES = 10;

export interface FileCheckError {
  name: string;
  reason: string;
}

export function checkFiles(files: File[]): FileCheckError[] {
  const errors: FileCheckError[] = [];
  if (files.length > MAX_FILES) {
    errors.push({ name: "(all)", reason: `Maximum ${MAX_FILES} files per submission.` });
  }
  let total = 0;
  for (const f of files) {
    const ext = path.extname(f.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
      errors.push({ name: f.name, reason: `File type ${ext || "(none)"} is not accepted.` });
    }
    if (f.size > MAX_FILE_BYTES) {
      errors.push({ name: f.name, reason: "Over the 25 MB per-file limit." });
    }
    if (f.size === 0) {
      errors.push({ name: f.name, reason: "File is empty." });
    }
    total += f.size;
  }
  if (total > MAX_TOTAL_BYTES) {
    errors.push({ name: "(all)", reason: "Combined files exceed the 100 MB submission limit." });
  }
  return errors;
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

/* ---------- Local persistence ---------- */

export async function storeSubmission(
  kind: "tender" | "contact" | "careers",
  reference: string,
  data: Record<string, unknown>,
  files: File[] = [],
): Promise<StoredResult> {
  const dir = path.join(SUBMISSIONS_DIR, kind, reference);
  await mkdir(dir, { recursive: true });

  const record = {
    reference,
    kind,
    receivedAt: new Date().toISOString(),
    integrationConnected: false,
    data,
    files: files.map((f) => ({ name: safeFilename(f.name), size: f.size, type: f.type })),
  };
  await writeFile(path.join(dir, "submission.json"), JSON.stringify(record, null, 2), "utf8");

  for (const f of files) {
    const buf = Buffer.from(await f.arrayBuffer());
    await writeFile(path.join(dir, safeFilename(f.name)), buf);
  }

  // Log status only — never drawing contents.
  console.info(`[submission] ${kind} ${reference} stored locally (${files.length} file(s)). Integration not connected.`);

  return {
    ok: true,
    reference,
    integrationConnected: false,
    storedAt: record.receivedAt,
  };
}
