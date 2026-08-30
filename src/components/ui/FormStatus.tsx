"use client";

import Link from "next/link";
import type { SubmissionResult } from "@/lib/submissions";
import { site } from "@/content/site";

/**
 * Honest submission feedback.
 * `delivered` is true only when the notification email was accepted by the
 * provider; environments without delivery configured show an explicit
 * integration-pending note instead — success never overstates what happened.
 */
export function FormResult({
  state,
  successHeading,
  whatHappensNext,
}: {
  state: SubmissionResult;
  successHeading: string;
  whatHappensNext: string;
}) {
  if (!state.ok) return null;
  return (
    <div
      className="border border-line-600 bg-surface-850 p-6 md:p-8"
      role="status"
      aria-live="polite"
    >
      <p className="tech-label text-success">
        {state.delivered ? "SENT TO ALLSCOPE" : "SUBMISSION VALIDATED"}
      </p>
      <h2 className="display mt-2 text-2xl text-ink">{successHeading}</h2>
      <dl className="mt-4 space-y-2 text-[0.9rem] text-ink-2">
        <div>
          <dt className="tech-label inline text-ink-3">Reference: </dt>
          <dd className="inline font-mono text-ink">{state.reference}</dd>
        </div>
        <div>
          <dt className="tech-label inline text-ink-3">Received: </dt>
          <dd className="inline">{new Date(state.storedAt).toLocaleString("en-AU")}</dd>
        </div>
      </dl>
      <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-2">{whatHappensNext}</p>
      {!state.delivered && (
        <p className="mt-4 border border-warning/40 bg-warning/10 p-3 text-[0.82rem] leading-relaxed text-warning">
          Preview environment: this submission was validated and stored securely on the
          server, but email delivery is not yet connected. For anything urgent, call{" "}
          <a href={site.phoneHref} className="font-medium underline underline-offset-2">
            {site.phone}
          </a>
          . [[INTEGRATION REQUIRED]]
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-4">
        <Link href="/projects" className="tech-label text-orange hover:text-orange-400">
          View projects →
        </Link>
        <Link href="/" className="tech-label text-ink-3 hover:text-ink-2">
          Back to home →
        </Link>
      </div>
    </div>
  );
}

/** Error summary with anchors to invalid fields; announced to screen readers. */
export function ErrorSummary({ state }: { state: SubmissionResult | null }) {
  if (!state || state.ok) return null;
  const entries = Object.entries(state.fieldErrors ?? {});
  return (
    <div
      className="border border-error/50 bg-error/10 p-4"
      role="alert"
      aria-live="assertive"
    >
      <p className="font-medium text-error">{state.formError}</p>
      {entries.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 text-[0.85rem] text-ink-2">
          {entries.map(([key, msg]) => (
            <li key={key}>
              {key.startsWith("file:") ? (
                <span>
                  <span className="font-mono text-[0.8rem]">{key.slice(5)}</span>: {msg}
                </span>
              ) : (
                <a href={`#${key}`} className="underline underline-offset-2 hover:text-orange">
                  {msg}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
