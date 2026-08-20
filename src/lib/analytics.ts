"use client";

/**
 * Conversion event layer. No analytics IDs are configured yet
 * (INTEGRATION REQUIRED — see docs/INTEGRATIONS.md). Events push to
 * window.dataLayer when a tag manager is installed; otherwise they are
 * dev-logged and dropped. Never send drawing filenames or personal data.
 */

export type AnalyticsEvent =
  | "tender_start"
  | "tender_submit"
  | "tender_file_upload"
  | "tender_validation_failure"
  | "capability_pack_view"
  | "capability_pack_request"
  | "phone_click"
  | "email_click"
  | "project_filter"
  | "project_view"
  | "related_project_click"
  | "careers_application"
  | "contact_submission";

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, data?: EventData) {
  if (typeof window === "undefined") return;
  const payload = { event, ...sanitise(data) };
  if (window.dataLayer) {
    window.dataLayer.push(payload);
  } else if (process.env.NODE_ENV === "development") {
    console.debug("[analytics:stub]", payload);
  }
}

/** Strip anything that looks like file names or free text. */
function sanitise(data?: EventData): EventData {
  if (!data) return {};
  const out: EventData = {};
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "string" && (v.includes(".") || v.length > 64)) continue;
    out[k] = v;
  }
  return out;
}
