import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { emailConfigured, sendSubmissionEmail, type SubmissionKind } from "./email";

/**
 * Submission delivery.
 *
 * With RESEND_API_KEY + SUBMISSIONS_TO_EMAIL configured (docs/INTEGRATIONS.md)
 * every validated submission is emailed with its attachments; `delivered`
 * reports that truthfully to the UI. Local capture to `.submissions/`
 * (outside public/, gitignored) is a dev convenience only — Vercel's
 * function filesystem is read-only, so it is best-effort and never the
 * reason a configured submission fails.
 */

export interface StoredResult {
  ok: true;
  reference: string;
  /** True only when the notification email was accepted by the provider. */
  delivered: boolean;
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

// Vercel serverless requests are hard-capped at 4.5 MB, so anything larger
// never reaches the action in production. Limits are set inside that cap
// (fields + multipart overhead need headroom) and the forms point larger
// packages at file-share links instead.
export const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB per file
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB per submission
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
      errors.push({ name: f.name, reason: "Over the 4 MB per-file limit. Send a file-share link in the summary instead." });
    }
    if (f.size === 0) {
      errors.push({ name: f.name, reason: "File is empty." });
    }
    total += f.size;
  }
  if (total > MAX_TOTAL_BYTES) {
    errors.push({ name: "(all)", reason: "Combined files exceed the 4 MB submission limit. Send a file-share link in the summary instead." });
  }
  return errors;
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

/* ---------- Delivery ---------- */

/** Dev capture to `.submissions/`; best-effort (read-only FS on Vercel). */
async function captureLocally(
  kind: SubmissionKind,
  reference: string,
  data: Record<string, unknown>,
  files: File[],
): Promise<boolean> {
  try {
    const dir = path.join(SUBMISSIONS_DIR, kind, reference);
    await mkdir(dir, { recursive: true });
    const record = {
      reference,
      kind,
      receivedAt: new Date().toISOString(),
      data,
      files: files.map((f) => ({ name: safeFilename(f.name), size: f.size, type: f.type })),
    };
    await writeFile(path.join(dir, "submission.json"), JSON.stringify(record, null, 2), "utf8");
    for (const f of files) {
      const buf = Buffer.from(await f.arrayBuffer());
      await writeFile(path.join(dir, safeFilename(f.name)), buf);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Email first (when configured), local capture second. A configured send
 * that fails throws so the caller reports an honest error — success is
 * never claimed for a submission nobody will receive.
 */
export async function deliverSubmission(
  kind: SubmissionKind,
  reference: string,
  data: Record<string, unknown>,
  files: File[] = [],
): Promise<StoredResult> {
  let delivered = false;
  if (emailConfigured()) {
    await sendSubmissionEmail(kind, reference, data, files);
    delivered = true;
  }
  const stored = await captureLocally(kind, reference, data, files);
  if (!delivered && !stored) {
    throw new Error("no delivery path: email not configured and local capture unavailable");
  }
  // Log status only — never drawing contents.
  console.info(
    `[submission] ${kind} ${reference}: ${delivered ? "emailed" : "NOT emailed (delivery unconfigured)"}${stored ? ", captured locally" : ""} (${files.length} file(s))`,
  );
  return {
    ok: true,
    reference,
    delivered,
    storedAt: new Date().toISOString(),
  };
}
