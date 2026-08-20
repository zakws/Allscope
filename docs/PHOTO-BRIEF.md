# Allscope Concrete — photography brief

Every image slot on the website, in the order that gets the most value fastest.
This is the shoot list to hand a photographer, plus what must be collected from
builders. The same specifications appear on-screen inside each placeholder in
preview mode (`src/content/media.ts` is the source of truth).

**41 slots total.** 26 can be shot by Allscope on its own sites. 15 are
project-specific and need either an Allscope shoot on that site or the
builder's written permission to reuse their photography.

---

## Rules that apply to every photograph

Non-negotiable, because breaking one creates a false claim or a safety problem:

1. Real documentary construction photography. No stock. No AI-generated imagery
   presented as real completed work.
2. Full correct PPE on every visible worker: hard hat, hi-vis, boots, glasses
   and gloves where the task requires them.
3. Nobody inside a boom or plant exclusion zone. No outriggers or truck stands
   on fresh concrete.
4. **Allscope branding only on Allscope's plant.** The decalled machine **is**
   Allscope's (owner-confirmed 27 Jul 2026) and should be shown branded — but
   WHICH machine is now unclear: the 16 Aug 2026 photo audit found the red
   decalled unit is a knuckle-boom CRANE, while a separate WHITE placing boom
   also carries an Allscope decal. Make, model and reach are UNCONFIRMED and
   must never be stated. Supplier agitators, hired pumps and any unbadged boom
   stay unbranded and uncaptioned.
5. **Never show Allscope installing reo or formwork.** Those interfaces may be
   visible as existing work by others; the Allscope action in frame is
   checking, placing or finishing.
6. Anyone identifiable needs to agree to appear. Third-party logos, site
   addresses and readable drawings stay out of frame unless approved.
7. Capture metadata on the day: project, date, stage, names and roles,
   photographer, builder, permission status, equipment.

Shoot **RAW on a full-frame camera**, wide-to-short-telephoto (roughly 24–70mm
plus something long for compression), and deliver un-retouched files. Directional
early-morning or late-afternoon light for anything hero-scale.

---

## Priority 1 — the one shot that changes the site most

### `HOME-HERO-01` · Hero pour · 21:9
Wide cinematic frame of a commercial project during **active placement**. The
placing boom forms a strong diagonal through the upper frame; crew are working
the pour; the concrete surface is visible; dense but controlled Sydney site
context behind.

- **Crops needed:** 21:9 desktop, plus safe 16:9 and 4:5 (phone) crops from the
  same frame — so shoot wide with room to recompose.
- **Composition:** keep the left and lower-left third visually quiet. The
  headline sits there. Dark negative space is a feature, not a fault.
- **Light:** early morning or late afternoon, directional.
- **Note:** until this exists the site renders an original technical drawing of
  a boom over a pour bay. That is deliberate and looks intentional — but a real
  frame here is worth more than every other image combined.

---

## Priority 2 — the boom reference: RESOLVED 27 July 2026

The owner supplied reference photographs. **Allscope's own plant is a
Truck-mounted placing boom, make/model/reach UNCONFIRMED,
finished in RED with a white pedestal and outriggers, carrying an Allscope
Concrete decal on the boom arm.**

Two things follow, and both are already applied to the build:

1. **The boom is red, not orange.** The brief's premise of an "orange placing
   boom" was wrong. All plant artwork on the site is now red, sharing the brand
   red token. The vivid orange survives only as the interface action colour and
   has been renamed `--signal-orange` so it no longer implies a plant match.
   Working plant red: `#CF2B26`, estimated from compressed JPEGs shot in direct
   sun — **still worth a definitive sample** from an original file or an on-site
   colour reference.
2. **Allscope branding on this machine is correct and should be shown.** The
   previous rule ("never show Allscope branding on plant") is replaced by:
   *Allscope branding is correct on the decalled machine; any white or differently
   liveried pump belongs to someone else and stays unbranded and uncaptioned.*

Still outstanding: the **logo master file** (SVG/AI/EPS, or a high-res
transparent PNG). The header currently uses a faithful vector reconstruction.

### New slot created by this finding

`CAP-PLANT-01` · **Allscope plant on site** · 3:2 — the boom pump deployed on a
real pour: boom out, outriggers down on pads, decal legible. An elevated or
aerial angle shows the boom geometry best. This is now a headline credibility
image, because owning the pump is a genuine differentiator for a placement
contractor. The aerial the owner already supplied is very close to this brief.

### The three supplied photographs — status

| Image | What it shows | Use | Blocker |
|---|---|---|---|
| Aerial of the decalled machine with outriggers deployed | Allscope's own plant, decal legible | Ideal `CAP-PLANT-01`, strong `TENDER-BOOM-01` | Confirm it is Allscope's own photograph and cleared to publish |
| Elevated suspended-slab pour, red/white boom over a deck, waterfront apartments behind | Matches the Allscope boom; strong suspended-slab proof | Excellent `HOME-HERO-01` (needs a 21:9 crop) or `CAP-SLAB-01` | Confirm the photo is Allscope's, the project name, and whether the crew shown are Allscope's |
| Slab-on-ground pour, large crew, **white** boom pump | Good placement/crew action | `HOME-POUR-02` or `CAP-PLACE-01` | The boom here is **not** Allscope's — it must never be captioned as Allscope plant. Confirm the crew and the project |

None of these are installed on the site yet: the files did not arrive on disk,
and publication rights and captions are unconfirmed. To install them, drop the
originals in `allscope-site/incoming-photos/` and confirm for each one: is it
Allscope's own photograph, which project is it, and are the people shown
Allscope's crew.

---

## Priority 3 — the process set (one controlled half-day covers all six)

Shoot these in sequence on a single real pour. This one visit fills the
homepage process story, the safety page and most of the capability panels.

| ID | Shot | Ratio | What must be in frame |
|---|---|---|---|
| `HOME-POUR-01` | Pre-pour readiness | 3:2 | Supervisor checking levels and interfaces before trucks arrive. Existing reo/formwork visible, **nobody installing it**. Checklist, tablet or drawing in shot. |
| `HOME-POUR-02` | Placement | 16:9 | Controlled concrete flow from the hose, team coordinating, boom and active slab context, believable machine position and exclusion zone. Also used to close THE POUR animation. |
| `HOME-POUR-03` | Finish detail | 3:2 | Close, low-angle screed or trowel pass. Surface texture and straightness are the subject. |
| `HOME-SAFETY-01` | Pre-start / toolbox | 3:2 | Small group reviewing the pour plan. Natural interaction, correct PPE, no staged line-up. |
| `SQ-HOLDPOINT-01` | Hold point | 3:2 | The readiness checklist actually being completed before the pour is called. |
| `SQ-LEVELS-01` | Level / finish check | 3:2 | Straightedge or laser level being used on the slab. |

Two more from the same day if the work genuinely happens:

| ID | Shot | Ratio | Condition |
|---|---|---|---|
| `SQ-TESTING-01` | Slump test / quality record | 3:2 | Only if this reflects real practice on Allscope pours. |
| `SQ-TRAINING-01` | Toolbox or training moment | 3:2 | Real interaction, not a posed classroom. |

---

## Priority 4 — the people set (one hour, same day)

| ID | Shot | Ratio | Direction |
|---|---|---|---|
| `HOME-TEAM-01` | Owner / supervisor portrait | 4:5 | Environmental portrait on an active but safely controlled site. Engaged, mid-conversation or reviewing a plan. **Not** folded arms against a blank wall. |
| `ABOUT-ALI-01` | Owner portrait, premium | 4:5 | Same session, more considered: stronger light, cleaner background, confident and calm. This is the accountability image. |
| `ABOUT-TEAM-01` | Team group | 16:9 | The crew on site, correct PPE, wide composition with real context behind them. |
| `ABOUT-CANDID-01` | Site planning conversation | 3:2 | Two or three people over a drawing or tablet. Candid. |
| `CAREERS-CREW-01` | Crew collaboration | 16:9 | Genuine teamwork during a pour. This page sells the crew to future crew. |
| `CAREERS-ROLE-01` | Skilled finisher at work | 4:5 | One person, skilled task, close enough to read the craft. |
| `CAREERS-CULTURE-01` | Break / toolbox / recognition | 3:2 | Candid, human, unposed. |

Names and faces publish only with each person's agreement. The team section
currently shows roles without names for exactly this reason.

---

## Priority 5 — capability panels

| ID | Shot | Ratio | Notes |
|---|---|---|---|
| `CAP-PLACE-01` | Controlled placement | 3:2 | Hose and crew, believable plant position. |
| `CAP-FINISH-01` | Screed / trowel detail | 3:2 | Surface quality as the subject. |
| `CAP-SLAB-01` | Suspended slab context | 16:9 | Only once suspended-slab wording is confirmed. |
| `CAP-BASEMENT-01` | Constrained basement works | 16:9 | Ramps, pump reach, below-ground logistics. |
| `CAP-INDUSTRIAL-01` | Industrial slab / floor | 16:9 | Only if industrial floors are a confirmed capability. |
| `CAP-LIVE-SITE-01` | Work beside live operations | 16:9 | Protection and controls visible — that is the proof. |
| `TENDER-PLANS-01` | Drawings and logistics review | 3:2 | No confidential project detail readable. Blur or exclude titles and addresses. |
| `TENDER-BOOM-01` | Boom / site establishing | 16:9 | Negative space for copy. Boom branding subject to verification. |

---

## Priority 6 — project imagery (permission-gated)

Each of the seven case studies has a hero plus six gallery slots
(establishing, pre-pour, placement, finish, crew, completed result). That is the
sequence that proves delivery rather than showing glamour shots.

**Heroes:**
`PROJECT-KENNARDS-01` · `PROJECT-EDSQUARE-01` · `PROJECT-BABYLON-01` ·
`PROJECT-AUBURN-STAGE1-01` · `PROJECT-SYD-AIRPORT-01` · `PROJECT-ORAN-PARK-01` ·
`PROJECT-ASHA-01` — all 16:9.

**Gallery slots:** `PROJECT-<NAME>-EST / -PRE / -PLACE / -FINISH / -TEAM / -DONE`
for each project (Asha carries a reduced set: EST and DONE only).

Since these projects are complete, most of this imagery has to come from the
builders. Candidate sources were identified in the research register, and each
needs written permission before use:

| Project | Ask | Watch out for |
|---|---|---|
| Kennards Macquarie Park | Total Construction / their photographer | High-res exposed-concrete structure exists and is the strongest concrete-led image in the set |
| Ed.Square | Binah (and Frasers Property where relevant) | Completion set plus aerial progress |
| Babylon | Binah | Confirm the period shown overlaps Allscope's package |
| Auburn Square **Stage 1** | Binah | **Stage 2 first-pour footage must not be used as Stage 1 proof.** Stage 2 involvement is unconfirmed |
| Sydney International Airport | Versatile Construction; Hassell / Sydney Airport for the finished hall | Finished-hall photography shows the environment, not concreting — caption it as context, never as proof of the pour |
| Oran Park Hotel | Versatile Construction | Progress aerials are the most useful frames |
| Asha Westmead | Resico / their photographer | Dusk exterior is the strongest single frame |

Suggested permission wording (keep the reply with the files):

> Please confirm that Allscope Concrete may use the attached photographs/video
> from **[project]** on its company website, capability statement, tender
> presentations and organic social media, with credit to **[owner]** where
> requested. Please also confirm whether cropping, colour grading and short
> edited excerpts are permitted.

`ABOUT-HISTORY-01` (4:3 archival) is optional and only usable if both the rights
and the date are known. Leave it out rather than guess.

---

## The efficient plan

1. ~~Send the boom photo~~ — **done 27 July.** Still needed: the **logo master
   file**, and confirmation of publication rights on the three supplied photos.
2. **Book one half-day on the next visually strong pour.** With a competent
   photographer that single visit yields `HOME-HERO-01`, the six process shots,
   the people set and most capability panels — roughly 20 of the 41 slots, all
   Allscope-owned with no permission problem.
3. **Send the seven permission emails in parallel.** They take a week or two to
   come back, so start them before the shoot, not after.
4. Install files per `docs/IMAGE-REPLACEMENT.md`: drop into `public/images/`,
   set `src` and `approvalStatus: "approved"` in the manifest. The placeholder
   becomes an optimised image automatically — no layout work.

Until then the site is honest about what is missing, and nothing on it pretends
to be a completed Allscope project that has not been verified.
