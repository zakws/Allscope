import { PREVIEW_MODE } from "@/content/site";

/**
 * Visible verification marker. Renders ONLY in preview mode; production
 * builds (PREVIEW_MODE=false) must not contain unverified claims at all —
 * see docs/CONTENT-VERIFICATION.md.
 */
export function VerifyChip({
  label = "VERIFY",
  title,
}: {
  label?: string;
  title?: string;
}) {
  if (!PREVIEW_MODE) return null;
  return (
    <span className="chip border-warning/50 bg-warning/10 text-warning" title={title}>
      [[{label}]]
    </span>
  );
}

export function IntegrationChip({ label = "INTEGRATION REQUIRED" }: { label?: string }) {
  if (!PREVIEW_MODE) return null;
  return (
    <span className="chip border-orange/50 bg-orange/10 text-orange">[[{label}]]</span>
  );
}
