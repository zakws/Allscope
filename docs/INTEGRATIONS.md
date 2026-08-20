# Integration checklist

The site is fully functional without credentials: forms validate server-side,
store to `.submissions/` (outside `public/`, gitignored) and tell the user
honestly that delivery is not yet connected. Connect the following before
launch. All variables go in `.env.local` / the hosting environment — see
`.env.example`. Never commit secrets.

## 1. Email delivery (required for launch)

Recommended: Resend (or SMTP). Wire-up point: `src/lib/submissions.ts` →
`storeSubmission()` currently ends with local persistence; add a send step that
notifies `TENDER_INBOX` with the reference, form data summary and secure links
(never raw attachments if files are large). Confirm the real tender inbox with
the owner first (`site.ts` → `email`).

## 2. Object storage for tender documents (required for launch)

Recommended: Cloudflare R2 or S3, private bucket.

- Signed upload URLs for large files (raises the current 25 MB/file local cap;
  UI copy in `FileUploader.tsx` and `submissions.ts` limits should be updated
  to match the storage-backed limits, e.g. 100 MB/file)
- 12-month lifecycle deletion rule (retention promise in the privacy policy)
- Malware scanning/quarantine where the platform supports it
- Objects keyed by submission reference; never publicly addressable

## 3. Spam protection (recommended)

Honeypot + minimum-fill-time + in-memory rate limiting are active. Add
Cloudflare Turnstile before launch (accessible, no puzzles): render the widget
in the three forms, verify the token server-side in `src/lib/actions.ts`.
Platform-level rate limiting / WAF on `/tenders` is also worthwhile — the
in-memory limiter resets per server instance.

## 4. Analytics (recommended)

`src/lib/analytics.ts` pushes typed events to `window.dataLayer` (tender_start,
tender_submit, tender_file_upload, tender_validation_failure, phone_click,
email_click, project_filter, project_view, careers_application,
contact_submission, capability pack events). Install GTM/GA4 by adding the GTM
snippet to `src/app/layout.tsx` with a consent-appropriate setup, or swap in a
privacy-first tool. No IDs are hard-coded anywhere. Do not log file names.

## 5. Headless CMS (post-launch path)

The typed content layer in `src/content/` is Sanity-shaped: Projects,
Capabilities, Sectors, Media assets (with rights/approval fields), Metrics,
FAQ, Roles, Site settings. Migration = define matching schemas, port records,
replace the imports with fetches. Keep the evidence-grade/permission fields —
they are the guardrail that stops unverified claims being published.

## 6. Deployment

- Vercel: works as-is. Set `NEXT_PUBLIC_SITE_URL=https://allscopeconcrete.com.au`.
- Cloudflare: use `@opennextjs/cloudflare` (server actions are in use).
- Point the domain only after the redirect map in `next.config.ts` is live so
  the twelve legacy URLs 301 correctly.
- Multi-instance self-hosting: set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.

## Dev-dependency note

`npm audit` reports vulnerabilities inherited from the create-next-app ESLint
toolchain (dev-only, not shipped to the browser). Re-audit and bump before
launch as part of normal dependency hygiene.
