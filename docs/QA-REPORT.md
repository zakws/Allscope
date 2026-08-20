# QA report

## Addendum — 28 July 2026: hero before/after reveal

The new hero reveal (greyscale set-out → colour poured, cursor-following mask)
went through an 18-agent adversarial review (4 lenses, every finding
independently attacked by two verifiers). Seven findings survived and all seven
were fixed and re-verified in headless Chrome:

1. Touch sweep could never retire its mask if the hero resized mid-sweep
   (stale radius target) — target now re-read live in the settle check;
   verified by rotating the viewport mid-sweep
2. Reduced-motion users saw a permanent dead "HOVER" hint — hint now derived
   from the motion preference and force-hidden in CSS
3. Hint was announced to screen readers and persisted at opacity 0 —
   aria-hidden added (it is a purely visual affordance)
4. Hybrid touch devices (touchscreen laptops) got a colour-blob flicker on
   touch-scroll — touch pointers now reveal-and-stick instead of collapsing
5. Per-frame mask writes continued at sub-pixel deltas — epsilon skip added;
   touch sweep delayed to 1.2s so it lands after the intro reveals
6. The future real hero photo would have lazy-loaded — both layers now pass
   priority + sizes
7. POUR-PRODUCTION.md claimed phones keep the progress dots (they are
   desktop-only) — doc corrected

Verified states after fixes: hover reveal to full radius, collapse on leave,
touch-sticky on hybrid devices, mask retired after rotation mid-sweep, hint
aria-hidden and suppressed under reduced motion. Lint, types and production
build clean.

# QA report — 26 July 2026

Testing performed against the dev build on Windows, with automated checks in
headless Chromium (Puppeteer 25 / Chrome 150) plus code-level review. The
in-app preview pane on this machine suppresses rendering callbacks
(document.visibilityState = hidden), so visual QA ran through headless Chrome
screenshots instead.

## Automated checks

- `npm run build` — clean (Turbopack production build, 24 routes, TypeScript strict)
- `npm run lint` — clean (ESLint 9 + Next flat config, react-hooks rules)
- Overflow/heading/link audit: 11 routes × 4 viewports (390/768/1440/1920):
  zero horizontal overflow, exactly one h1 per page, no empty/broken hrefs
- Console: no errors on any route (only the intentional 404 route's response)

## Functional QA (verified)

- Navigation: all header/footer routes resolve; active route indicated; 404 page renders with recovery actions
- Mobile menu: opens full-height, 8 links, body scroll locked, focus trapped, Escape closes and returns focus, tender CTA dominant over phone
- THE POUR: scrubs with native scroll through all 8 stages; stage indicator and copy update; dissolve into the reveal panel; "View process without motion" toggle works; `prefers-reduced-motion` swaps to the static grid (verified via emulation); GSAP load failure falls back to the static grid; sr-only stage list always present
- Tender form: empty submit produces an error summary (14 field errors, anchored links, role=alert); happy path with a PDF attachment validated server-side, stored to `.submissions/<ref>/` with sanitised filename, returned reference (format ACG-TEN-YYYYMMDD-XXXX) and an explicit "email delivery not connected" notice — no fake success
- Contact and careers forms: same validation/storage architecture (shared code path, verified through the tender flow plus schema review)
- File uploader: extension/size/count/total limits enforced client- and server-side; remove per file; drag-and-drop and picker both feed a real `<input type=file>` so native submission carries the files
- Spam controls: honeypot, minimum-fill-time, per-IP rate limit (5/10 min) — exercised in code review; the QA happy-path submission passed the fill-time gate
- Keyboard: first Tab lands on the skip link; focus-visible outlines throughout; filters and accordions are native buttons/details
- Redirect map for 15 legacy URLs configured (verify after DNS cutover)

## Visual QA (screenshot review at 390 / 768 / 1440 / 1920)

- No overflow, clipping or overlapping sections found at any breakpoint
- Hero holds negative space for the headline; CTAs and heading render before any media
- Placeholder system reads as deliberate art direction (IDs, crop marks, rights chips, collapsible shot specs)
- Featured grid: first project spans two columns (fixed during QA — span was landing on a non-grid child)
- Dark surfaces distinguishable; orange reserved for action, red for identity accents
- Contrast: token pairs computed against WCAG 2.2 AA (orange on charcoal ≈ 8:1; body text ≈ 12:1+; red used at display sizes only)

## Defects found and fixed during this pass

1. Pour section never initialised — ref declared but not attached; also progress now maps exactly to the pinned wrapper
2. IK elbow solution flipped below ground for left-hand targets — now selects the elbow-up candidate
3. Boom tip poured nowhere near the concrete's leading edge — rewritten so the hose tracks the fill edge
4. Mobile drawer invisible — the header's backdrop-filter created a containing block for the fixed drawer; drawer moved outside `<header>`
5. Reveal-hidden content would be permanently invisible without JS — initial hidden state now gated behind `html[data-js]`
6. Hydration warning from the data-js stamp — `suppressHydrationWarning` on `<html>`
7. Stage labels ghosted through the end-of-sequence dissolve — per-stage fade-outs added
8. react-hooks setState-in-effect violations (Header/Honeypot/PourSequence) — refactored to render-time adjustment, ref-imperative value, and useSyncExternalStore

## Known limitations / remaining blockers

- **Content**: all VERIFY items in CONTENT-VERIFICATION.md; site must stay in preview mode until cleared
- **Imagery**: every slot is a placeholder pending cleared photography (IMAGE-REPLACEMENT.md)
- **Integrations**: email, storage, Turnstile, analytics unconnected (INTEGRATIONS.md); submissions store locally by design
- **Boom orange token is temporary** pending a real boom photograph
- Real-device Safari/iPhone and Firefox passes not possible from this environment — repeat the motion QA (pour scrub, drawer, forms) on a physical iPhone before launch
- Lighthouse/Core Web Vitals should be measured on the production host; the build is server-rendered, ships GSAP only on the homepage, self-hosts subset fonts and defines media aspect ratios, but field numbers need the real host and real images
- `npm audit` reports dev-only findings in the scaffold's ESLint chain — bump before launch
