# Image replacement list

> **Using AI to fill slots?** Read [AI-IMAGERY.md](AI-IMAGERY.md) first: which
> slots permit AI concept imagery (hero, POUR stages, capability panels), which
> never do (project galleries, people, anything shown as proof), the tool
> picks, and the ready-made prompt pack. AI files install with
> `rightsStatus: "ai-concept"` and are visibly labelled in preview.

Every visual slot renders through `MediaPlaceholder` from the manifest in
`src/content/media.ts`. Each placeholder displays its asset ID, required
subject, crops, PPE and branding rules, and rights status on the page itself
(preview mode), so the shot list is self-documenting in the browser.

## How to install a real image

1. Confirm rights in writing (owner's suggested permission wording is in the
   research register). Record owner/photographer/date in the manifest entry.
2. Drop the file in `public/images/` with a descriptive filename
   (e.g. `kennards-deck-pour-2024.jpg`).
3. In `src/content/media.ts`, set on the asset: `src: "/images/…"`,
   `approvalStatus: "approved"`, plus final `altTextDraft` and caption.
4. The component switches from placeholder to optimised `next/image`
   automatically. Nothing else changes.

## Non-negotiable imagery rules (also embedded per-asset)

- Real documentary construction photography; no AI imagery as project proof
- Full correct PPE on every visible worker; no unsafe positions
- No outriggers on fresh concrete; no workers in boom exclusion zones
- No third-party mixer trucks or pumps branded as Allscope. The owner's own
  photographs show unbadged WHITE placing booms on Allscope pours (a supplier's
  plant) alongside separate Allscope-decalled machines; never caption or
  retouch an unbadged boom as Allscope's, and never state any machine's make,
  model or reach
- Auburn Square: Stage 1 evidence only — Binah's Stage 2 first-pour video must
  not be presented as Stage 1 or as Allscope's work without confirmation
- Crew identified as Allscope only with confirmation; third-party logos,
  addresses and readable drawings kept out unless approved

## Priority order (highest impact first)

1. `HOME-HERO-01` — hero pour, 21:9 (the single most valuable shot; brief a
   photographer for the next major pour)
2. `HOME-POUR-02` — placement 16:9 (also ends THE POUR sequence)
3. Six project heroes: `PROJECT-KENNARDS-01`, `PROJECT-EDSQUARE-01`,
   `PROJECT-BABYLON-01`, `PROJECT-AUBURN-STAGE1-01`, `PROJECT-SYD-AIRPORT-01`,
   `PROJECT-ORAN-PARK-01` (cleared candidates identified in the research
   shortlist; every one needs the named owner's permission)
4. `HOME-TEAM-01` / `ABOUT-ALI-01` — owner portraits (one session covers both)
5. `HOME-POUR-01`, `HOME-POUR-03`, `HOME-SAFETY-01` — process shots
6. Capability panels (`CAP-*`), Safety (`SQ-*`), Careers (`CAREERS-*`),
   Tender Hub (`TENDER-*`)
7. Project galleries: six slots per flagship project (EST/PRE/PLACE/FINISH/
   TEAM/DONE) — a half-day shoot on one live pour fills most of a project's
   set and several HOME slots at once

## Brand assets

- `src/components/ui/Logo.tsx` is an interim vector reconstruction. Replace
  with the master logo file (SVG/AI/EPS) when supplied; keep the silver-on-dark
  variant for dark surfaces (the original grey #6D6E71 fails contrast on
  charcoal).
- `--boom-orange: #F28C18` in `globals.css` is TEMPORARY. Sample the real boom
  photograph and update the token (plus the hover/active variants) before
  calling the palette final.
- `src/app/opengraph-image.tsx` uses system fonts; regenerate with brand fonts
  once the logo master is in.
