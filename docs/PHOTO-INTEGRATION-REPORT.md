# Allscope 4K photo integration — completion report (20 Aug 2026)

Site: `C:\Users\zakar\OneDrive\Desktop\Allscope website\allscope-site` (Next.js 16, TS strict)
Sources: `..\03-ALLSCOPE-OWNER-PHOTOS-ENHANCED-4K` (owner photos) and `..\04-ALLSCOPE-ONLINE-ACTUAL-JOBS-4K` (30 exact-project photos, SOURCE-RIGHTS-REGISTER.csv).
Placement register (deliverable inside the repo): `allscope-site\docs\PHOTO-INTEGRATION-REGISTER.md`.

## 1. Pages / components / scripts changed

| File | Change |
|---|---|
| `scripts/new-media-sources.mjs` (new) | Authored decision tables: one decision per folder-04 register row (lead / gallery / skip + caption), 8 owner project photos, 7 owner capability photos. Permission wording recorded. |
| `scripts/process-4k.mjs` (new) | Sharp pipeline modeled on process-media.mjs: 40 WebP masters (leads 2400px q84, gallery/capability 2000px q82, `.rotate()`), writes `scripts/4k-dims.json` with true output dims. Originals untouched. |
| `scripts/build-media-data.mjs` | New `EXCLUDED_ASSETS` map (mirrors `EXCLUDED_PROJECTS`) filtering register rows with reasons; parses folder-04 CSV and joins the authored decisions; lead-override table applied after the register mapping; folder-03/04 gallery appends (CONCRETE-LED first, PROJECT-CONTEXT-ONLY last, "Project context:" prefix enforced); `RENDER_LEADS` mechanism removed — `lead.render` replaced by generic `lead.label`; throws if any RENDER row escapes the audit; media-jobs no longer emitted for excluded projects or replaced leads. |
| `scripts/clean-orphan-media.mjs` (new) | Deletes WebP masters under `public/media/{leads,projects,capability}` not referenced by the generated data (brand/ and film/ untouched). Removed 51 orphans. |
| `src/content/projects-data.gen.ts` | Regenerated: 16 projects, 105 gallery images, 10 capability images, 0 renders. |
| `src/components/cinema/ProjectMedia.tsx` | ProjectCard lead label now generic (`lead.label`), used by Twenty95's "Project context". Gallery render-label mechanism kept (no image sets it). |
| `src/app/projects/[slug]/page.tsx` | Hero overlay label now `record.lead.label`. |
| `src/app/page.tsx` | Safety & quality band gains the floated-slab detail (OWN-CAP-166), grid 2 -> 3 cols. Homepage imagery: hero film + 7 images (within the 8-12 constraint). |
| `src/app/capabilities/page.tsx` | The three imageless rows now carry owner photos: pumping OWN-CAP-146, pre-pour OWN-CAP-152, planning/supervision OWN-CAP-149. |
| `src/app/safety-quality/page.tsx` | Section 02 gains OWN-CAP-169 (trowelling behind the pour), section 03 gains OWN-CAP-166 (floated slab); both with tech-label captions matching the existing section-01 figure. |
| `src/app/about/page.tsx` | New "The work" band: OWN-CAP-149 (raft pour) + OWN-CAP-197 (finished charcoal driveway). |
| `src/app/tenders/page.tsx` | Panoramic band under the intro: OWN-CAP-215 (fresh deck, starter bars ready). |
| `docs/PHOTO-INTEGRATION-REGISTER.md` (new) | Per-placement table (filename, folder, subfolder, project, page+section, reason, concrete relevance, grade, permission) + full excluded lists. |

## 2. Zetland confirmation

- `grep -ri zetland src/ public/` returns **zero matches**. The generated data, pages and served media are entirely Zetland-free.
- Folder `04\17-ZETLAND-BUILD-TO-RENT` untouched on disk; its only file (ASC-ZETLAND-BTR-01) is listed as excluded in the register with reason "not an Allscope project". Folder `03\17-ZETLAND` holds only the marker file (its docs also ban Binah media for this job).
- The stale `PROJECT-17-ZETLAND-BINAH-01.webp` lead master was deleted by the orphan cleaner.

## 3. Images removed from the site (EXCLUDED_ASSETS) and why

- **Renders/CGI (20)** — every RENDER_CONTEXT row: EDS-001/002, BAB-001 (was Babylon's lead), BAB-002, OPH-001/003/005, ASH-001/002/003, OTW-001/002/004, T95-001/002, T95-003 (was Twenty95's lead), OTP-001, VRK-001/002/003. The site now publishes photography only; the generator throws if a render row is ever not excluded.
- **People-dominant (10)** — BAB-003/004/005/006/007/008 (ceremonies, portraits, milestone groups), OPH-002 (topping-out), OPH-007 (two personnel), OTW-008 (crane technicians), SYD-003 (media event; file was also absent).
- **Third-party branding (3)** — AUB-005 (Binah spokesperson video frame with caption overlay), T95-010/011 (excavation contractor's branded machinery, no concrete).
- **Superseded (1)** — OPS-002: lens-flared social crop of the amphitheatre, replaced by the clean folder-04 master of the same scene.
- `RENDER_LEADS` removed from the generator: no render leads remain, so the mechanism is gone; leads carry a generic `label` instead.
- All 51 orphaned WebP masters (the above + replaced leads + never-referenced lead-duplicates) deleted from `public/media`.

## 4. Folder 03 selections (owner photos)

- **Sydney Airport gallery (2 of 3):** OWNER-1 (pump line through the live terminal, night works), OWNER-2 (trench reinforcement inside the terminal).
- **Oran Park Public School gallery (6 of 42):** OWNER-72 (fresh path panels, swirl/broom finishes), OWNER-85 (mesh + pump line pre-pour), OWNER-101 (edge reinforcement), OWNER-128 (exposed-aggregate macro), OWNER-130 (slab pour across the campus, landscape), OWNER-89 (deck reinforcement/formwork, landscape).
- **Capability pool (7 assets, 9 placements, max 2 uses each, none adjacent):** OWN-CAP-146 (capabilities pumping), 149 (capabilities planning + about), 152 (capabilities pre-pour), 166 (safety 03 + homepage safety band), 169 (safety 02), 197 (about), 215 (tenders pano). Concrete-led only; total well under the ~15 cap.

## 5. Folder 04 selections per project

- Leads replaced (5): **Kennards** OJ4-KMP-03 (native-4K master of the same exposed-PT-frame photo as ASC-KMP-011 — compared side by side, 4K file sharper); **Babylon** OJ4-BAB-01 (concrete seat/walkway, replaces render); **Oran Park Hotel** OJ4-OPH-01 (native-4K concrete facade, replaces 800px drone frame); **Twenty95** OJ4-T95-01 (real facade photo, labelled "Project context", replaces render); **School** OJ4-OPS-01 (dusk concrete piazza, replaces flared crop). BP Prestons kept its stronger existing full-site lead (BPP-001).
- Galleries (20 rows): Ed.Square +2, Babylon +2, Auburn +1 (Stage 1 only), Airport +1 (context, last), Hotel +1 (sign wall), Asha +2 (1 context), One The Waterfront +2 (both context — the page previously showed no completed-project imagery), VIEW +2 (1 context), Bay Pavilions +1 (sign wall), School +1 (amphitheatre), BP Prestons +2, El Jannah +2 (1 context), BP Oberon +1. Previously empty galleries (BP Prestons, El Jannah, BP Oberon) now have photography.

## 6. Rejected photos and why

- **Folder 04 (5 of 30):** KENNARDS-01/02 (exact duplicates of ASC-KMP-008/009 already in the gallery), BAY-PAVILIONS-01/02 (redundant beside nine existing exact-project exteriors), ZETLAND-01 (not an Allscope project).
- **Folder 03:** airport OWNER-8 (readable number plate, weakest of trio); school OWNER-216 (discovered to be the same photograph as folder-04 ASC-ORAN-SCHOOL-02 — the folder-04 copy has the cleaner rights lineage and was used instead); remaining school shots (near-duplicates or flagged: timestamp overlays, finger, clipped tones); 98-GENERAL remainder (equipment-only, people-dominant, low-res/damaged, near-duplicates — incl. 203 supplied sideways with a phone chevron); all 40 of 99-UNCONFIRMED (job identity deliberately unconfirmed by the pack's own register).

## 7. Copy improvements

- Every new image carries an authored caption and/or alt text: accurate, human, Australian English, no em dashes, no "we built". All PROJECT-CONTEXT-ONLY captions start "Project context:" and never claim the pictured element as Allscope concrete; the Twenty95 lead label is "Project context" (a real photograph must not carry a render label). No full street addresses in captions (El Jannah caption says "at Prestons", not the street).
- Section captions match the site's existing tech-label voice ("Finishing follows the pour down the deck", "A floated slab, level held to handover", "A deck poured and finished, starter bars ready for the next lift").

## 8. Unsupported claims withheld

- Asha facade, Bay Pavilions sign wall, Airport concourse floor and El Jannah facade are never described as concrete (their packs flag the material as unverified); all sit behind "Project context:" captions.
- One The Waterfront context images make no placement/formwork claims (public attribution conflict noted in the pack).
- Auburn Stage 2 media remains withheld; only the Stage 1 courtyard was added.
- No project-name attribution for any 98-GENERAL or 99-UNCONFIRMED owner photo.

## 9. Permission status

Recorded against every placement in `docs/PHOTO-INTEGRATION-REGISTER.md` and in the generator headers: **verified (user confirmation 20 Aug 2026)**.

## 10. Performance notes

- 40 new WebP masters via sharp (leads maxW 2400 q84, gallery/capability maxW 2000 q82, EXIF rotation honoured); next/image derives responsive sizes.
- `public/media` payload after orphan cleanup: **49 MB** (was 55.9 MB after processing, pre-cleanup); 51 unreferenced masters deleted.
- Homepage stays at hero film + 7 content images; galleries beyond five rows stay behind the existing "view full gallery" toggle, so page weight is unchanged in kind.

## 11. Build / test results

- `node scripts/process-4k.mjs` — 40/40 processed, 0 failed.
- `node scripts/build-media-data.mjs` — 16 projects, 105 gallery images, 10 capability images, **renders published: 0**, 49 recorded exclusions; re-run is idempotent.
- `npx tsc --noEmit` — clean. `npm run lint` — clean.
- `rm -rf .next && npm run build` — green, 33 static pages.
- `grep -ri zetland src/ public/` — no matches.
- Puppeteer QA (scratchpad `photo-integration-qa.mjs`, dev server on :3000): home, /projects, babylon, twenty95, kennards, school, capabilities at 1440 and 390 — **ALL GREEN**: 0 "Artist's impression" labels anywhere, 0 zetland, 0 broken images; about/tenders/safety also screenshotted. Screenshots in `scratchpad\photo-integration-qa\`. Visual review confirmed sane gallery pairing (landscapes full-row, portraits paired) and no blank slots.
- Note: the dev server running on :3000 broke when `.next` was cleaned mid-QC; it was restarted and is left running.

## 12. Remaining gaps / flags for Zak

- **Parkside** received nothing from folders 03/04 (0 photos found). Its page is not text-only though: it keeps 7 existing library photographs after the OTP-001 render was removed; lead remains the twilight photo ASC-OTP-004. Owner photographs or a licensed original are still the pack's recommendation.
- **ASC-OPS-001** (existing school exterior, retained) shows schoolchildren mid-ground. It passes the stated exclusion rules (building-led, not people/ceremony/portrait), but worth a conscious keep/crop decision before go-live.
- Twenty95's gallery is all facade/context photography — no concrete-proof imagery exists for it in any pack; the overview copy still states the package plainly, which is the honest ceiling for now.
- Folder-03 dates suggest more owner photos exist for the 13 named projects that still have no owner imagery; the marker files ask Allscope to supply/identify them.
- The `[[VERIFY: …]]` footer tokens visible in screenshots are the pre-existing PREVIEW_MODE verify system, untouched by this work.
