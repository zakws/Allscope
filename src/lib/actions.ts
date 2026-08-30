"use server";

import { z } from "zod";
import {
  checkFiles,
  deliverSubmission,
  looksLikeSpam,
  makeReference,
  rateLimited,
  type SubmissionResult,
} from "./submissions";

/**
 * Server actions for the three forms. All validation is server-side and
 * mirrored client-side for UX. On success, submissions are emailed through
 * (attachments included) when delivery is configured; the UI reports the
 * delivered/undelivered state honestly either way.
 */

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function getFiles(formData: FormData, field: string): File[] {
  return formData
    .getAll(field)
    .filter((v): v is File => v instanceof File && v.name !== "" && v.size >= 0);
}

/* ================= TENDER ================= */

const tenderSchema = z.object({
  company: z.string().trim().min(2, "Enter your company name."),
  fullName: z.string().trim().min(2, "Enter your full name."),
  role: z.string().trim().min(2, "Enter your role."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(8, "Enter a contact number."),
  preferredContact: z.enum(["email", "phone"]),
  projectName: z.string().trim().min(2, "Enter the project name."),
  siteAddress: z.string().trim().min(2, "Enter the site address or suburb."),
  builder: z.string().trim().optional().or(z.literal("")),
  sector: z.string().trim().min(1, "Select a sector."),
  stage: z.string().trim().min(1, "Select the current stage."),
  expectedStart: z.string().trim().optional().or(z.literal("")),
  tenderClose: z.string().trim().optional().or(z.literal("")),
  scopeSummary: z.string().trim().min(10, "Give a short summary of the package."),
  packageType: z.string().trim().min(1, "Select the closest package type."),
  programmeNote: z.string().trim().optional().or(z.literal("")),
  volumeEstimate: z.string().trim().optional().or(z.literal("")),
  constraints: z.string().trim().optional().or(z.literal("")),
  privacyConsent: z.literal("on", {
    message: "Please acknowledge the privacy statement.",
  }),
  contactConsent: z.literal("on", {
    message: "Please confirm Allscope may contact you about this package.",
  }),
  authorisedConsent: z.literal("on", {
    message: "Please confirm you are authorised to share these documents.",
  }),
});

export async function submitTender(
  _prev: SubmissionResult | null,
  formData: FormData,
): Promise<SubmissionResult> {
  if (looksLikeSpam(formData)) {
    return { ok: false, formError: "Submission could not be verified. Please try again, or call Allscope directly." };
  }
  if (await rateLimited("tender")) {
    return { ok: false, formError: "Too many submissions from this connection. Please wait a few minutes and try again, or call Allscope." };
  }

  const parsed = tenderSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      ok: false,
      formError: "Some details need attention before the package can be sent.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const files = getFiles(formData, "documents");
  const fileErrors = checkFiles(files);
  if (fileErrors.length > 0) {
    return {
      ok: false,
      formError: "One or more files could not be accepted.",
      fieldErrors: Object.fromEntries(fileErrors.map((e) => [`file:${e.name}`, e.reason])),
    };
  }

  try {
    const reference = makeReference("TEN");
    return await deliverSubmission("tender", reference, parsed.data, files);
  } catch (err) {
    console.error("[submission] tender delivery failed:", (err as Error).message);
    return { ok: false, formError: "The package could not be sent. Please try again in a few minutes, or call Allscope directly." };
  }
}

/* ================= CONTACT ================= */

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name."),
  company: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us what you need help with."),
  privacyConsent: z.literal("on", {
    message: "Please acknowledge the privacy statement.",
  }),
});

export async function submitContact(
  _prev: SubmissionResult | null,
  formData: FormData,
): Promise<SubmissionResult> {
  if (looksLikeSpam(formData)) {
    return { ok: false, formError: "Submission could not be verified. Please try again." };
  }
  if (await rateLimited("contact")) {
    return { ok: false, formError: "Too many submissions from this connection. Please wait a few minutes and try again." };
  }
  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      ok: false,
      formError: "Some details need attention.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }
  try {
    const reference = makeReference("CON");
    return await deliverSubmission("contact", reference, parsed.data);
  } catch (err) {
    console.error("[submission] contact delivery failed:", (err as Error).message);
    return { ok: false, formError: "The message could not be sent. Please try again in a few minutes, or call Allscope directly." };
  }
}

/* ================= CAREERS ================= */

const careersSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(8, "Enter a contact number."),
  roleInterest: z.string().trim().min(1, "Select the role you're interested in."),
  tickets: z.string().trim().optional().or(z.literal("")),
  experience: z.string().trim().min(10, "Give a short summary of your experience."),
  privacyConsent: z.literal("on", {
    message: "Please acknowledge the privacy statement.",
  }),
});

export async function submitCareers(
  _prev: SubmissionResult | null,
  formData: FormData,
): Promise<SubmissionResult> {
  if (looksLikeSpam(formData)) {
    return { ok: false, formError: "Submission could not be verified. Please try again." };
  }
  if (await rateLimited("careers")) {
    return { ok: false, formError: "Too many submissions from this connection. Please wait a few minutes and try again." };
  }
  const parsed = careersSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      ok: false,
      formError: "Some details need attention.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }
  const files = getFiles(formData, "cv");
  const fileErrors = checkFiles(files);
  if (fileErrors.length > 0) {
    return {
      ok: false,
      formError: "Your CV file could not be accepted.",
      fieldErrors: Object.fromEntries(fileErrors.map((e) => [`file:${e.name}`, e.reason])),
    };
  }
  try {
    const reference = makeReference("EOI");
    return await deliverSubmission("careers", reference, parsed.data, files);
  } catch (err) {
    console.error("[submission] careers delivery failed:", (err as Error).message);
    return { ok: false, formError: "The application could not be sent. Please try again in a few minutes, or call Allscope directly." };
  }
}
