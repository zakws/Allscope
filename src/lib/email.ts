import "server-only";

/**
 * Submission delivery by email through the Resend HTTP API (no SDK; one
 * POST). Activation is configuration only:
 *
 *   RESEND_API_KEY          — from resend.com (API Keys)
 *   SUBMISSIONS_TO_EMAIL    — inbox that receives tender/contact/careers mail
 *   SUBMISSIONS_FROM_EMAIL  — optional; defaults to Resend's onboarding
 *                             sender, which only delivers to the Resend
 *                             account owner's address until the company
 *                             domain is verified (docs/INTEGRATIONS.md)
 *   RESEND_BASE_URL         — optional; test override only
 *
 * Attachments ride along base64-encoded. The submitter's address goes in
 * reply-to, so answering the notification emails them directly.
 */

const BASE_URL = () => process.env.RESEND_BASE_URL || "https://api.resend.com";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.SUBMISSIONS_TO_EMAIL);
}

const KIND_LABEL = {
  tender: "Tender package",
  contact: "Contact message",
  careers: "Careers expression of interest",
} as const;

export type SubmissionKind = keyof typeof KIND_LABEL;

/** Field order and labels mirror the forms so the email reads like the page. */
function fieldLabel(key: string): string {
  const map: Record<string, string> = {
    company: "Company",
    fullName: "Full name",
    role: "Role",
    email: "Email",
    phone: "Phone",
    preferredContact: "Preferred contact",
    projectName: "Project name",
    siteAddress: "Site address / suburb",
    builder: "Builder / developer",
    sector: "Sector",
    stage: "Current stage",
    expectedStart: "Expected start",
    tenderClose: "Tender closing date",
    scopeSummary: "Scope summary",
    packageType: "Package type",
    volumeEstimate: "Estimated volume",
    programmeNote: "Programme / sequencing",
    constraints: "Site constraints",
    message: "Message",
    roleInterest: "Role of interest",
    tickets: "Tickets / licences",
    experience: "Experience",
  };
  return map[key] ?? key;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function subjectFor(kind: SubmissionKind, reference: string, data: Record<string, unknown>): string {
  const who = String(data.company || data.fullName || "").trim();
  const project = String(data.projectName || "").trim();
  const detail = kind === "tender" && project ? `${project}${who ? ` — ${who}` : ""}` : who;
  return `${KIND_LABEL[kind]}${detail ? `: ${detail}` : ""} [${reference}]`;
}

export async function sendSubmissionEmail(
  kind: SubmissionKind,
  reference: string,
  data: Record<string, unknown>,
  files: File[] = [],
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SUBMISSIONS_TO_EMAIL;
  if (!apiKey || !to) throw new Error("email delivery is not configured");
  const from = process.env.SUBMISSIONS_FROM_EMAIL || "Allscope Website <onboarding@resend.dev>";

  // Consent checkboxes arrive as "on"; skip them and empty optionals so the
  // email carries only what was actually written.
  const rows = Object.entries(data).filter(
    ([k, v]) => !k.endsWith("Consent") && String(v ?? "").trim() !== "",
  );

  const text = [
    `${KIND_LABEL[kind]} — ${reference}`,
    `Received ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })} (Sydney time)`,
    "",
    ...rows.map(([k, v]) => `${fieldLabel(k)}: ${String(v)}`),
    "",
    files.length
      ? `Attached: ${files.map((f) => `${f.name} (${Math.round(f.size / 1024)} KB)`).join(", ")}`
      : "No files attached.",
    "",
    "Reply to this email to answer the sender directly.",
  ].join("\n");

  const html = `
<div style="font-family:Arial,sans-serif;max-width:640px">
  <p style="font-size:12px;letter-spacing:1px;color:#888;margin:0">ALLSCOPE CONCRETE — WEBSITE SUBMISSION</p>
  <h2 style="margin:6px 0 2px">${esc(KIND_LABEL[kind])}</h2>
  <p style="font-family:monospace;color:#555;margin:0 0 16px">${esc(reference)}</p>
  <table style="border-collapse:collapse;width:100%">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px 6px 0;color:#777;vertical-align:top;white-space:nowrap">${esc(fieldLabel(k))}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(String(v))}</td></tr>`,
      )
      .join("\n")}
  </table>
  <p style="color:#777;font-size:13px">${
    files.length
      ? `Attached: ${esc(files.map((f) => f.name).join(", "))}`
      : "No files attached."
  }</p>
  <p style="color:#777;font-size:13px">Reply to this email to answer the sender directly.</p>
</div>`;

  const attachments = [];
  for (const f of files) {
    attachments.push({
      filename: f.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120),
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    });
  }

  const replyTo = String(data.email ?? "").trim();
  const res = await fetch(`${BASE_URL()}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: subjectFor(kind, reference, data),
      text,
      html,
      ...(replyTo ? { reply_to: [replyTo] } : {}),
      ...(attachments.length ? { attachments } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}
