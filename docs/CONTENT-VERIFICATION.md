# Content verification checklist

Nothing on this list may be treated as fact until the owner (Ali) or a primary
document confirms it. The site renders `[[VERIFY]]` chips at each location
while `PREVIEW_MODE` is true. Work through this list, update the content files,
then flip preview mode off.

## Identity and legal

- [ ] Public brand form is exactly "Allscope Concrete" everywhere
- [ ] Legal entity + ABN current: Allscope Concrete Group Pty Ltd, ABN 11 643 746 543 (source: ABR, 23 Jul 2026)
- [ ] Relationship (if any) to the former "Allscope Concrete and Pumping Pty Ltd" clarified with the accountant; no history claims borrow from it
- [ ] Phone 0499 969 991 confirmed as the business line
- [ ] Tender/general email confirmed (placeholder: tenders@allscopeconcrete.com.au)
- [ ] Instagram handle confirmed and account ownership verified before linking
- [ ] Privacy policy and terms reviewed by a legal professional (both pages carry LEGAL REVIEW REQUIRED chips)

## Services and scope wording (src/content/capabilities.ts)

- [ ] Confirm the exact services contracted today (placement, finishing, pumping, readiness checks, supervision)
- [ ] Confirm reo/formwork exclusion wording ("checked, not installed") matches practice
- [x] **Pumping model — RESOLVED 27 Jul 2026.** Allscope owns and operates its own
      truck-mounted boom pump (make, model and reach UNCONFIRMED —
      Allscope decal on the boom arm), confirmed by the owner from reference
      photographs. The site previously described pumping as subcontracted
      coordination; that has been corrected to an in-house capability.
- [ ] **Follow-up:** is the pump used only on Allscope's own placement packages,
      or also supplied to other contractors with an operator? (Changes the
      capability wording and opens a second service line if so.)
- [ ] Confirm the boom's reach/specification figures before publishing any numbers
- [ ] Confirm whether there is more than one machine in the fleet
- [ ] Confirm suspended slab / basement / live-site / industrial wording
- [ ] Confirm service area ("Sydney metro and Greater Western Sydney")
- [ ] Confirm night/weekend/possession-window availability claim in the FAQ

## Projects (src/content/projects.ts)

Per project: confirm scope sentence, package boundary, completion date, and
whether the builder may be named beyond a factual reference.

- [ ] Kennards Macquarie Park (Total Construction) — scope + dates
- [ ] Ed.Square (Binah) — scope + dates
- [ ] Babylon (Binah) — scope, stages covered, dates
- [ ] Auburn Square Stage 1 (Binah) — Stage 1 boundary; any Stage 2 involvement is UNCONFIRMED and unpublished
- [ ] Sydney International Airport (Versatile) — exact areas poured, stage detail
- [ ] Oran Park Hotel (Versatile) — scope + dates
- [ ] Asha Westmead — builder, dates; currently a reduced "secondary" entry
- [ ] Held back until scope is confirmed: One the Waterfront (Captain Formwork conflict), Parkside, Twenty95, View Rockdale, Bay Pavilions, Project Yagoona

## Metrics (src/content/process.ts → metricSlots)

Every homepage metric slot is empty by design. Supply supportable figures for
any of: team experience years, projects delivered, concrete placed, largest
pour, repeat builder relationships, safety record. The "3,000 cube basement"
Instagram caption is a lead, not a publishable figure, until backed by records.

## People

- [ ] Ali Youssef: name spelling, title, and approval of both draft statements (homepage + about)
- [ ] Combined-experience wording on About ("[[verified number]] years")
- [ ] Team roster: each person's name, role and portrait individually approved
- [ ] Jayson Munnings / John Sassen testimonials: company, role, project and written permission before any use

## Safety, quality, compliance

- [ ] Certifications, licences, insurances, EBA status: list what exists and is current; the site currently claims none
- [ ] Testing practice wording ("dockets", testing arrangements) matches reality
- [ ] Document-request flow: who fulfils requests and from where

## Plant and brand assets

- [x] Boom colour resolved: the machine is **red**, not orange. Plant artwork
      corrected; the interface orange renamed `--signal-orange`.
- [ ] Definitive plant-red sample (`#CF2B26` is estimated from compressed photos)
- [ ] Logo master file (SVG/AI/EPS or high-res transparent PNG) — the header
      currently uses a faithful vector reconstruction

## Approvals register

- [ ] Builder logos: none displayed; request written approval before adding (Binah, Versatile, Total Construction)
- [ ] Every photograph: see docs/IMAGE-REPLACEMENT.md — no third-party image ships without written permission recorded in the manifest
- [ ] **The three photographs supplied 27 Jul 2026** (aerial of the decalled machine;
      suspended-slab pour with the red boom; slab-on-ground pour with a white
      boom): for each, confirm it is Allscope's own photograph and cleared to
      publish, which project it shows, and whether the people in frame are
      Allscope's crew. The white boom in the third image is **not** Allscope's
      and must never be captioned as Allscope plant.

## Final gate

- [ ] All chips above cleared, content updated
- [ ] `PREVIEW_MODE = false` in src/content/site.ts
- [ ] Grep the build for "VERIFY", "REPLACE", "INTEGRATION REQUIRED", "Lorem" — zero hits in rendered output
- [ ] Re-run the QA pass in docs/QA-REPORT.md
