# AI-generated imagery — what to use, where it's allowed, and the prompts

> **Ready to generate?** [GENERATION-GUIDE.md](GENERATION-GUIDE.md) is the
> operational version: accounts to open (including the Higgsfield verdict),
> the master-scene workflow, expanded per-slot prompts with edit instructions,
> motion prompts for every POUR clip, file naming and delivery. This document
> stays the policy of record for where AI is and is not allowed.

## The verdict

**AI images: yes — easy, cheap, and genuinely photorealistic in 2026.**
**AI video: harder and less controllable — use it only via image-to-video for
THE POUR's motion stages, not as a general tool.**

The single most powerful trick for this site: generate one strong "after"
still, then use an AI *editor* to derive the matching "before" from it. That
gives the hero's before/after reveal a perfectly aligned pair — something even
a real photographer needs a locked tripod and two visits to achieve.

## The hard line (from Allscope's own brief)

AI imagery must never be presented as proof of real completed work. That rule
exists because the audience — estimators, PMs, contract administrators — are
the most construction-literate image readers on earth. One impossible boom
angle or wrong reo pattern and the "PROOF IN EVERY POUR" promise dies on the
spot. Presenting AI scenes as photos of Allscope's actual projects would also
risk misleading-conduct territory commercially. So:

| Slot | AI allowed? |
|---|---|
| Hero backdrop (atmosphere, before/after pair) | ✅ Yes — it's a brand image, not a project claim |
| THE POUR stages (process illustration) | ✅ Yes — the section is an explainer, never claimed as footage of a specific pour |
| Capability mood panels (CAP-*) | ✅ Yes, labelled |
| Tender Hub establishing shots | ✅ Yes, labelled |
| **Project heroes and galleries (Kennards, Ed.Square, …)** | ❌ Never — these are named real projects; only real, cleared photography |
| **Ali's portraits, crew and careers imagery** | ❌ Never — real people only, with consent |
| **The Allscope boom with Allscope branding** | ❌ Never generate it — the real machine exists; photograph it |
| Anything on the Safety & Quality page shown as records/testing | ❌ Never |

Every AI file installed gets `rightsStatus: "ai-concept"` in
`src/content/media.ts`, which renders a visible **AI CONCEPT — NOT A REAL
SITE** chip in preview mode. The brief treats even permitted AI slots as
styled placeholders: the plan of record is still to replace them with real
photography as it arrives. AI buys polish now, not permanence.

## Tools (pick one per column and you're set)

| Job | First pick | Also good | Rough cost |
|---|---|---|---|
| Photoreal stills | **Midjourney v7** (best cinematic construction look) | Flux 1.1 Ultra (via Freepik/fal.ai), Google Imagen (in Gemini), Adobe Firefly (cleanest licensing) | ~US$10–30/mo |
| Editing / before-after pairs / fixes | **Gemini's image editing ("Nano Banana")** — give it the "after", ask for the "before" with concrete removed and reo exposed, same camera | Photoshop Generative Fill, Flux Kontext, Midjourney editor | Included / ~US$20/mo |
| Image-to-video (POUR stages) | **Kling** (first+last frame control = perfect for stage transitions) | Veo 3 via Google Flow (best raw realism), Runway Gen-4, Sora | ~US$10–30/mo |
| Upscaling for the 21:9 hero | Topaz Gigapixel or Magnific | — | one-off |

Why images beat video for realism: a still only has to be right once. Video
has to keep concrete flowing like concrete, booms articulating like booms and
crews moving like crews for 8 seconds — that's exactly where 2026 models still
produce tells. Image-to-video from a still you've already approved keeps the
composition locked and limits the model to adding motion, which is the one
regime where AI video is reliable.

## The workflow

1. Generate candidates from the prompts below (4–8 per slot, pick ruthlessly).
2. Run every keeper through the **accuracy checklist** (bottom of this doc) —
   this is where most AI construction images fail.
3. Fix small violations with the editor (add a missing hard hat, remove
   gibberish signage, move an outrigger onto pads) rather than re-rolling.
4. Drop finals in `allscope-site/incoming-photos/` named by slot id
   (e.g. `HOME-HERO-01-after.png`, `HOME-HERO-01-before.png`).
5. I curate, crop per the manifest specs, install with the `ai-concept` label,
   and for THE POUR extract the frames into the scroll adapter.

For THE POUR specifically: generate the eight stage stills first (prompts
below, one consistent scene), approve them, then animate each approved still
with image-to-video (5–8s each). I take ~15–20 frames per stage from the
clips (120–160 desktop total) and a lighter 40–60 set for phones.

## Prompt pack

Use these as-is in Midjourney/Flux/Imagen; append your tool's aspect flags
(hero: 21:9 or widest available; most others 3:2 or 16:9). The style prefix
keeps the whole set looking like one photographer shot it.

**Style prefix (paste before every prompt):**
> Documentary construction photography, full-frame camera, 35mm lens, early
> morning directional light, dark moody cinematic grade, deep charcoal
> shadows, Sydney commercial construction site, photorealistic, no text, no
> logos, no signage lettering

### HOME-HERO-01 — the pair for the reveal

**After (generate first):**
> …style prefix… wide establishing shot of a large concrete pour in progress
> on a commercial building site at dawn, a red truck-mounted concrete placing
> boom arm reaching diagonally across the upper right of frame, crew of
> workers in orange hi-vis and white hard hats screeding wet concrete on a
> suspended deck, orange mesh edge-protection screens along the deck
> perimeter, fresh grey concrete surface catching low golden light, city
> construction context behind, large dark negative space in the left third of
> frame for headline text

**Before (derive with the editor, do not re-generate):**
> Edit this photo: the pour has not started yet. Remove all wet concrete and
> the crew working it; show the same deck as dense two-layer steel
> reinforcement — bottom steel with top bars on high chairs and flat
> post-tensioning ducts between the layers — ready for concrete, formwork
> edges and edge-protection screens visible, one supervisor standing at the
> edge checking a tablet. Keep the camera position, boom position, light and
> everything else identical.

Install as `src` (after) + `srcBefore` (before) — the hover reveal then
literally pours the deck.

### THE POUR — eight stage stills (keep one consistent scene)

Add to the style prefix for ALL eight: *"same suspended concrete deck on a
commercial site, same camera position, tripod height, locked-off wide shot"* —
then per stage:

1. **SET OUT** — "empty formed deck at first light, surveyor's level on a tripod, chalk set-out lines, one worker crouched marking the slab edge"
2. **INTERFACE CHECK** — "deck covered in dense two-layer steel reinforcement, bottom steel with top bars on high chairs and flat post-tensioning ducts between the layers, a supervisor walking the steel on boards inspecting it with a checklist, nobody installing anything"
3. **HOLD POINT** — "two workers reviewing a checklist on a clipboard at the deck edge, reinforcement ready behind them, first sun hitting the site"
4. **MOBILISE** — "red placing boom arm unfolding over the deck, concrete agitator truck reversing into position below, workers waiting at the hose"
5. **PLACE** — "wet concrete flowing from the boom hose onto the reinforced deck, three workers in hi-vis spreading it with shovels, motion in the concrete"
6. **FINISH** — "worker driving a power trowel across fresh smooth concrete, low sun raking across the surface showing its flatness"
7. **CURE** — "finished concrete slab at dusk covered in curing compound sheen, empty site, warm low light, boom folded away in background"
8. **HANDOVER** — "clean wide shot of the finished grey slab at golden hour, perfectly flat, two workers at the far edge reviewing paperwork"

### Capability panels (one line each, with the style prefix)

- **CAP-PLACE-01**: "crew placing concrete from a pump hose on a ground slab, controlled flow, believable machine positions"
- **CAP-FINISH-01**: "close low-angle of a steel trowel polishing firm, freshly set concrete placed hours earlier, satin sheen and surface texture filling the frame"
- **CAP-BASEMENT-01**: "concrete pour deep inside a multi-level basement excavation, ramps and shoring visible, artificial lighting mixing with daylight from above"
- **CAP-LIVE-SITE-01**: "concrete works behind temporary hoarding beside an operating business, pedestrians passing safely on the far side"
- **CAP-SLAB-01**: "suspended deck formwork and reinforcement viewed from an upper level, city behind"
- **TENDER-BOOM-01**: "red placing boom silhouetted over a site at dawn, large negative space in the sky"

## Accuracy checklist (run on every image before it ships)

- [ ] Hard hat + hi-vis on every visible worker; no missing gloves on tools
- [ ] Hands, faces, limbs anatomically correct (prefer backs turned / distance)
- [ ] No text, logos or signage anywhere (AI text is always gibberish)
- [ ] Boom geometry physically possible; outriggers down on pads, on hardstand, never on fresh concrete
- [ ] Nobody standing under the boom or inside exclusion zones
- [ ] Reo plausible for the element: suspended decks show TWO layers (bottom steel + top bars on high chairs, often PT ducts), not a single house-slab mesh; ground slabs may show single mesh
- [ ] Edge protection (rails, screens or mesh barriers) present wherever anyone is near a deck edge or penetration
- [ ] Concrete looks like concrete (wet = dark grey and heavy, not liquid silver)
- [ ] No Allscope branding on anything AI-generated
- [ ] Machine types are real-world plausible (no fantasy hybrids)
- [ ] Consistent light direction with the rest of the set
