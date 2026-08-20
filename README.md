# Allscope Concrete — website

Production codebase for allscopeconcrete.com.au: a digital prequalification and
tender-confidence platform for a Sydney commercial-concrete contractor.

Built July 2026. Next.js 16 (App Router, Turbopack) · TypeScript strict ·
Tailwind CSS 4 · GSAP ScrollTrigger (homepage only) · Zod · server actions.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build (includes type checking)
npm start          # serve the production build
npm run lint       # ESLint
```

No credentials are required to run the site. Forms validate server-side and
store submissions in `.submissions/` (gitignored, not web-addressable) with an
honest "integration not connected" notice in the UI. See
[docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) for connecting email, storage,
spam protection and analytics, and `.env.example` for the variables.

## Preview mode — read this before launch

`PREVIEW_MODE` in [src/content/site.ts](src/content/site.ts) is `true`. It
renders amber `[[VERIFY]]` chips, media-placeholder spec sheets and the
per-project evidence panels. **Do not flip it to false until every item in
[docs/CONTENT-VERIFICATION.md](docs/CONTENT-VERIFICATION.md) is signed off**
and unverified claims have been corrected or removed. Placeholder markers must
never ship on the public site.

## Where things live

| Concern | Location |
|---|---|
| Business facts (name, ABN, phone, nav, CTA wording) | `src/content/site.ts` |
| Projects (evidence-graded case studies) | `src/content/projects.ts` |
| Capabilities, exclusions, FAQ | `src/content/capabilities.ts` |
| Process stages, THE POUR stages, metric slots, roles | `src/content/process.ts` |
| Image-placeholder manifest (all shot specs + rights) | `src/content/media.ts` |
| Design tokens | `src/app/globals.css` |
| Form server actions + local storage | `src/lib/actions.ts`, `src/lib/submissions.ts` |
| THE POUR scroll section + swappable renderer | `src/components/home/PourSequence.tsx`, `pour-renderer.ts` |
| Legacy URL redirect map | `next.config.ts` |

The content layer models a headless-CMS schema (Sanity-shaped) 1:1: every
project carries evidence grade, claim source, permission status and last-verified
date, so migration is a mapping exercise, not a rewrite.

## Deploying

Vercel: zero-config (`vercel deploy`). Cloudflare: via OpenNext
(`@opennextjs/cloudflare`) — the site uses server actions, so a plain static
export is not an option while the forms live in-app. Set `NEXT_PUBLIC_SITE_URL`
in the environment. Server actions body limit is configured in
`next.config.ts` (120 MB) for tender uploads; move large files to signed
direct-to-storage uploads when storage is connected (see INTEGRATIONS.md).

## Documentation

- [docs/PHOTO-BRIEF.md](docs/PHOTO-BRIEF.md) — the full shoot list, priority-ordered, ready to hand a photographer
- [docs/POUR-PRODUCTION.md](docs/POUR-PRODUCTION.md) — how THE POUR animation becomes real footage: the eight-shot filming plan and delivery spec
- [docs/AI-IMAGERY.md](docs/AI-IMAGERY.md) — AI image/video policy: allowed slots, tool picks, workflow and the full prompt pack
- [docs/GENERATION-GUIDE.md](docs/GENERATION-GUIDE.md) — the step-by-step generation playbook: accounts, master-scene workflow, detailed prompts per slot, motion prompts, delivery
- [docs/CHATGPT-PROMPTS.md](docs/CHATGPT-PROMPTS.md) — the same pack rewritten for ChatGPT + Sora: 8 stills, 8 edits, 8 video prompts, copy-paste ready
- [docs/CONTENT-VERIFICATION.md](docs/CONTENT-VERIFICATION.md) — every claim the owner must confirm before launch
- [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) — email, storage, Turnstile, analytics, CMS path
- [docs/IMAGE-REPLACEMENT.md](docs/IMAGE-REPLACEMENT.md) — how to install real photography once cleared
- [docs/QA-REPORT.md](docs/QA-REPORT.md) — what was tested and known limitations
- [docs/DESIGN-PASS.md](docs/DESIGN-PASS.md) — the design audit and what it changed
