# Design audit and fixes — 27 July 2026

A second pass over the built site: every homepage section captured at 390 / 768 /
1440 and reviewed, plus computed-style audits for type scale, tap targets and
contrast. Fourteen defects found and fixed. Build and lint clean; the
overflow/heading/link regression across 11 routes × 4 viewports is back to zero
issues.

## Typography

1. **`.display` line-height was 0.98.** Every heading that wrapped — which is
   most of them at tablet and mobile — had commas and apostrophes colliding with
   the caps on the line below, and read as congested. Default is now `1.07` with
   `text-wrap: balance`, and a `.display-tight` (0.96) opt-in for hero-scale
   headings where lines are short. Applied to the hero, the final CTA and the
   interior page h1s.
2. **`.tech-label` was 11.2px.** Below a sensible floor for metadata on a dark
   background, and the brief explicitly rules out unreadably small metadata.
   Now 12px with slightly tighter tracking and a real line-height.
3. **`--text-tertiary` lifted** `#8f959a` → `#9ba1a7` (7.5:1 on the page
   background) and `--text-secondary` `#b9bec2` → `#bfc4c8` (11.1:1), so the
   12px labels hold up.
4. **Verification chips broke line rhythm.** A bordered inline chip was taller
   than the line box and pushed into the line above (visible on Safety &
   Quality). Chips now use a shared `.chip` class with controlled leading.

## Hero

5. **The "boom" read as a stray hairline with a glitchy grey hook**, in an
   otherwise empty dark frame — the weakest thing on the site. Replaced with
   `HeroBackdrop`: an original technical composition (set-out grid, hatched pour
   bay, dimension and survey marks, articulated four-segment boom with joints,
   hose and pour point, generic unbranded pump on outriggers). It renders *only*
   while `HOME-HERO-01` is a placeholder, so installing the real photograph
   removes it automatically.
6. **Joint placement is deliberate** at x≈820 and x≈1120 so the portrait
   (cover) crop on phones still shows an articulated boom rather than one
   straight line. Sheet labels are hidden below `md`, where the crop dragged
   them into the copy block.
7. **The scrim flattened the whole frame.** Split into a vertical scrim for
   general legibility plus a left-weighted horizontal one, so the copy side is
   protected without killing the composition on the right.

## Layout and composition

8. **The featured-card span produced a ragged, orphaned grid.** On the homepage
   the first project spanned two columns, so adjacent card text started at a
   different height and the sixth project sat alone on its own row. The homepage
   is now a uniform 3-up (two clean rows of six), and the project index — which
   has seven entries — gets a genuine horizontal `FeaturedProjectCard` (image
   left, metadata right) above a 3-up grid of the remaining six. No orphans, no
   ragged baselines.
9. **Card metadata now aligns across a row** via full-height flex, so differing
   scope lengths don't stagger the bottom line.
10. **The owner portrait out-ran its column.** A 4:5 crop in a 5/12 column
    rendered ~650px tall beside a shorter text block. Capped at 22rem and the
    columns balanced.
11. **The homepage owner section was missing the team preview** the spec calls
    for. Added as three role slots with no invented names, since names publish
    only on approval.
12. **The final CTA's boom motif crossed the headline and body copy.** Moved to
    the lower corners as anchored boom geometry, clear of all text.
13. **Safety and owner sections led with a large placeholder on small screens**,
    pushing the message below the fold. Reordered so copy leads.

## Empty states — the honest ones now look deliberate

14. **The metric strip read as broken**: six cells of em-dashes each with a
    `[[VERIFY]]` chip, two indicators for the same thing. Rebuilt as an
    **evidence register**: label-first, a quiet "Awaiting records" state, and an
    "0 of 6 figures verified" counter. Still explicit that nothing is verified,
    but it now reads as a deliberate ledger rather than a rendering failure.
15. **The testimonial was a dead zone** — a large centred dashed box apologising
    for itself. Rebuilt as an editorial statement panel with an oversized quote
    mark and the standard as the headline ("Client comments, properly
    attributed"), plus a route to the projects. Same honesty, no fake quote, but
    it now earns its space.
16. **The proof rail was squeezed and undifferentiated** (py-8 against
    everything else's py-24). Now a proper project register with divider rules
    and matched rhythm.

## THE POUR

17. **The section heading repeated stage 01's on-screen line verbatim.** Changed
    to "Eight stages between the drawings and the handover".
18. **The canvas composition sank to the bottom of tall viewports**, leaving a
    dead upper half. Reframed on the drawing's actual content band.
19. **Interface labels overlapped the pour edge and hose** during placement.
    Raised clear.

## Regression caught during the pass

20. **The long testimonial chip caused 35px of real horizontal overflow at
    390px.** `white-space: nowrap` on an unbreakable flex item forced the grid
    track wider than the viewport. Chips are now wrap-capable with
    `max-width: 100%` and `overflow-wrap: anywhere` — a class-level fix, so no
    future chip label can blow out a layout. Verified: document no longer
    scrolls horizontally.

## Contrast (WCAG 2.2 AA)

Measured against the page background `#0b0c0d`:

| Pair | Ratio | Verdict |
|---|---|---|
| Primary text | 17.1:1 | Pass |
| Secondary text | 11.1:1 | Pass |
| Tertiary / metadata | 7.5:1 | Pass |
| Tertiary on elevated surface | 6.6:1 | Pass |
| Boom orange | 8.0:1 | Pass |
| Dark text on orange fill | 7.5:1 | Pass |
| Concrete grey headings | 8.7:1 | Pass |
| Warning (chips) | 9.3:1 | Pass |
| Brand red | 4.3:1 | Large text / non-text only — verified: red is never used as body text, only the logo mark, rule lines and the active-nav underline |
