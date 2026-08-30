# Integration checklist

Without credentials the forms validate server-side, capture to
`.submissions/` in dev (outside `public/`, gitignored — Vercel's function
filesystem is read-only, so this never persists in production) and tell the
user honestly that delivery is not yet connected. All variables go in
`.env.local` / the hosting environment. Never commit secrets.

## 1. Email delivery (BUILT — needs two env vars to switch on)

Implemented 30 Aug 2026 in `src/lib/email.ts` (Resend HTTP API, no SDK):
every validated tender / contact / careers submission is emailed with its
attachments, reply-to set to the submitter. The success screen says "SENT TO
ALLSCOPE" only when the provider accepted the email; a failed send returns an
honest error to the user, never a fake success.

To activate:

1. Create a free account at resend.com **using the inbox that should receive
   submissions** (until a sending domain is verified, Resend's onboarding
   sender only delivers to the account owner's own address).
2. Resend dashboard → API Keys → Create API key.
3. Vercel → Project → Settings → Environment Variables (Production):
   - `RESEND_API_KEY` = the key
   - `SUBMISSIONS_TO_EMAIL` = the receiving inbox (same address as step 1)
4. Redeploy. Submit a test tender and confirm it lands.

When the company domain is on Resend (Domains → verify
allscopeconcrete.com.au DNS records), also set
`SUBMISSIONS_FROM_EMAIL="Allscope Website <tenders@allscopeconcrete.com.au>"`
— then `SUBMISSIONS_TO_EMAIL` can be any address (e.g. Ali's), not just the
account owner's.

## 2. Object storage for large tender documents (upgrade path)

Submissions travel as one request through a Vercel function (hard 4.5 MB
body cap), so uploads are limited to 4 MB combined and the form points
larger sets at file-share links. To accept full drawing sets directly:
Vercel Blob (or R2/S3) client uploads — browser-to-bucket via signed URLs,
email then carries download links instead of attachments.

- Raise the limits in `submissions.ts` + `FileUploader.tsx` together
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
