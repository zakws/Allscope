# The generation guide — everything you do, in order

> **Generating in ChatGPT instead of Midjourney?** Use
> [CHATGPT-PROMPTS.md](CHATGPT-PROMPTS.md) — the same workflow rewritten as
> full prose prompts for ChatGPT's image model and Sora: 8 stage stills,
> 8 edits (including the hero before/after pair) and 8 motion clips.

Companion to [AI-IMAGERY.md](AI-IMAGERY.md) (the policy: where AI is allowed and
where it never goes). This is the operational side: accounts, exact prompts,
settings, file naming, delivery. Follow it top to bottom and you produce every
AI-permitted visual on the site plus the full animation source in one or two
evenings.

---

## Phase 0 — accounts (~A$80–110/month total, cancel any time)

| Tool | Plan | What it's for | Watch out |
|---|---|---|---|
| **Midjourney** | Standard (~US$30/mo) | All still images — best documentary construction realism | Use `--ar` flags per prompt below |
| **Gemini** (Google AI Pro) | ~US$20/mo (you may already have it) | Image EDITING — deriving "before" frames and fixing flaws without re-rolling | Ask for edits conversationally; keep iterating on the same image |
| **Higgsfield** | Plus (~US$39/mo, 1,000 credits) | The video hub — one subscription runs Kling, Veo, Sora and more for the image-to-video clips | See the warnings below |

### Higgsfield — the honest verdict

Good, with three caveats. It's an aggregator: one subscription gives you
Kling 3.0, Veo 3.1, Sora 2, Seedance and others in one workspace, which beats
juggling separate video subscriptions — so it **replaces Kling/Veo accounts as
the video tool**, and the Plus tier's credits comfortably cover this project
(Kling runs a few credits per clip; Veo/Sora burn 40–70 per generation, so
default to Kling and spend premium credits only where Kling disappoints).

The caveats:

1. **Its signature feature is the wrong tool for this job.** Higgsfield is
   famous for dramatic camera presets — crash zooms, bullet time, FPV orbits.
   Scroll-scrubbed animation needs the exact opposite: a locked, calm camera.
   Ignore the preset library entirely; use plain image-to-video with the
   motion prompts below.
2. **It does not replace Midjourney for stills.** Its own image model leans
   fashion/social aesthetics; documentary construction realism is weaker.
   Generate stills in Midjourney, animate them in Higgsfield.
3. **Credit hygiene:** annual billing is the signup default — switch to
   monthly. Credits don't roll over and top-ups expire, so buy only what the
   month needs.

---

## The two reusable blocks

Paste the STYLE BLOCK at the start of every still-image prompt. Add the AVOID
list as negative prompts where the tool supports them (in Midjourney append
`--no text, logos, signage, watermarks`).

**STYLE BLOCK**
> Documentary construction photography, shot on a full-frame camera with a
> 35mm lens, early morning low directional sunlight, long soft shadows, dark
> moody cinematic colour grade with deep charcoal shadows and warm highlights,
> Sydney commercial construction site, photorealistic, natural film grain, no
> text, no logos, no readable signage

**AVOID (negative prompts / checklist)**
> text, lettering, logos, watermarks, cartoonish, illustration, oversaturated,
> midday flat light, extra fingers, deformed hands, floating objects,
> impossible machinery

---

## Phase 1 — the master scene (do this first, everything hangs off it)

Generate **stage 05 (PLACE)** before anything else. It's the richest moment —
wet concrete, crew, boom — and it becomes the consistency anchor: several
other stages are *edits of this image*, which guarantees the same deck, same
camera, same light across the sequence.

**Prompt (Midjourney, `--ar 16:9`):**
> STYLE BLOCK + wide locked-off shot of a large suspended concrete deck pour
> in progress on a commercial building site, wet dark-grey concrete flowing
> from a boom pump hose held by a worker in orange hi-vis and white hard hat,
> three more workers in orange hi-vis spreading and screeding the fresh
> concrete with shovels and a screed bar, dense two-layer steel reinforcement
> — bottom steel with top bars raised on high chairs and flat post-tensioning
> ducts running between the layers — visible ahead of the wet concrete edge,
> a red truck-mounted concrete placing boom arm reaching in from the upper
> right corner of frame, orange mesh edge-protection screens running along
> the deck perimeter, city construction cranes soft in the background haze,
> shot from slightly elevated tripod height at the deck edge, workers
> mid-distance so faces are small, golden morning light raking across the wet
> surface

Generate 6–8, pick the one with the most believable concrete and cleanest
hands/faces. This file is `POUR-05-PLACE-still.png` — and the parent of the
whole family.

---

## Phase 2 — the hero pair (the before/after reveal)

The hero wants its own composition: more sky, more drama, big dark negative
space on the LEFT for the headline.

**HOME-HERO-01-after (Midjourney, widest ratio available — `--ar 21:9`, else 16:9 and we crop):**
> STYLE BLOCK + cinematic ultra-wide establishing shot at dawn, a large
> commercial concrete pour in progress on an open deck, red truck-mounted
> placing boom arm cutting a strong diagonal across the upper right of frame
> with its hose lowered to the deck, small crew of workers in orange hi-vis
> and white hard hats working wet concrete in the mid-distance right of frame,
> orange mesh edge-protection screens along the deck perimeter, fresh grey
> concrete catching low golden light, dense Sydney construction context and
> tower cranes silhouetted behind, the entire left third of the frame in deep
> dark shadow with almost no detail, atmosphere of controlled quiet before
> full daylight

**HOME-HERO-01-before (Gemini edit — upload the chosen "after" and say):**
> Edit this photo. The concrete pour has not started yet: remove all wet
> concrete and the workers placing it, and show the same deck surface as
> dense two-layer steel reinforcement — bottom steel with top bars on high
> chairs and flat post-tensioning ducts between the layers — ready for
> concrete, with formwork edge boards and the orange edge-protection screens
> visible along the deck edge. Keep one person only: a supervisor standing at
> the near edge in hi-vis and hard hat, looking at a tablet. Keep the camera
> angle, the red boom position, the background, the lighting and everything
> else exactly identical.

Then upscale both (Topaz/Magnific or Midjourney upscale) — the hero renders
full-viewport, so aim for 3000px+ wide. Deliver both files; they install as
`src` + `srcBefore` and the hover reveal literally pours the deck.

---

## Phase 3 — the other seven POUR stills

Route A (recommended): **edit the master** in Gemini — guarantees scene
continuity. Route B (fallback if edits fight you): standalone generation with
the consistency block. Do Route A first; only fall back per-stage as needed.

**Consistency block for Route B standalone prompts:**
> …same suspended concrete deck on a commercial site as previous image, same
> slightly elevated tripod camera position at the deck edge, same red placing
> boom, same morning light direction…

| Stage | Route A — Gemini edit of the master | Route B — standalone tail (after STYLE + consistency block) |
|---|---|---|
| 01 SET OUT | "Edit: it is now much earlier. Remove the concrete, the crew and the reinforcement; show the bare formed deck with plywood formwork surface, chalk set-out lines, and one worker crouched at mid-deck marking a line beside a surveyor's level on a yellow tripod. Boom folded away out of frame. Same camera, same light." | "…bare plywood formwork deck at first light, chalk set-out lines snapped across it, one worker crouched marking the slab edge beside a surveyor's level on a tripod, no concrete anywhere, boom absent" |
| 02 INTERFACE CHECK | "Edit: remove the wet concrete and the placing crew; cover the whole deck in dense two-layer steel reinforcement — bottom steel with top bars on high chairs and flat post-tensioning ducts between the layers. One supervisor in hi-vis walks across the steel on boards, inspecting it, holding a folded drawing. Nobody is installing anything. Same camera, edge screens, same light." | "…deck fully covered in dense two-layer steel reinforcement, bottom steel with top bars raised on high chairs and flat post-tensioning ducts between the layers, a lone supervisor walking planks across it inspecting the steel with a folded drawing in hand, nobody working, orange edge-protection screens along the perimeter, morning light" |
| 03 HOLD POINT | "Edit: same reinforced deck as the interface check; now two workers stand together at the near deck edge reviewing a checklist on a clipboard, one pointing across the deck. The two-layer reinforcement is complete and ready behind them. Same camera, edge screens, same light." | "…two workers in orange hi-vis and white hard hats at the deck edge inside the orange edge-protection screens, reviewing a checklist on a clipboard, one pointing out across the completed two-layer reinforcement, first sunlight catching their hi-vis" |
| 04 MOBILISE | "Edit: same reinforced deck; the red placing boom arm now reaches over it from the right, hose hanging above the steel, and below in the background a concrete agitator truck is backing toward the pump, whose outriggers are down on timber pads on hardstand. Two workers wait at the hose position. No concrete placed yet. Same camera, edge screens, same light." | "…red truck-mounted placing boom unfolding its arm over the reinforced deck, rubber hose hanging above the steel, concrete agitator truck reversing into position at ground level behind, pump outriggers down on timber pads on hardstand, two workers waiting at the hose behind the orange edge screens, anticipation before the pour" |
| 05 PLACE | (this is the master — already done) | — |
| 06 FINISH | "Edit: the pour is complete. Replace all reinforcement and wet placement with a full deck of fresh smooth concrete; one worker rides a power trowel across it mid-deck and another works the far edge with a hand trowel. Boom folded back out of frame. Lower, warmer late-afternoon light. Same camera." | "…full deck of fresh smooth grey concrete, a worker riding a power trowel machine across it leaving overlapping polished arcs, low warm raking light showing the flatness of the surface" |
| 07 CURE | "Edit: it is now dusk. The finished concrete deck is empty, smooth, with a slight sheen of curing compound; the site is quiet, no workers, boom gone, warm dusk sky, a few site lights on in the background. Same camera." | "…finished empty concrete deck at dusk with a soft sheen of curing compound, deserted site, warm violet-orange sky, scattered site lighting glowing in the background, stillness" |
| 08 HANDOVER | "Edit: next morning. The cured pale-grey deck is perfectly clean and flat; two workers stand at the far edge reviewing paperwork together, golden morning light across the whole slab. Same camera." | "…clean cured pale-grey concrete deck at golden hour, perfectly flat and empty except two workers at the far edge reviewing paperwork, long shadows, sense of completion" |

Name them `POUR-01-SETOUT-still.png` … `POUR-08-HANDOVER-still.png`.

---

## Phase 4 — the motion clips (in Higgsfield, image-to-video)

For each approved still: upload it as the **first frame** (Kling's
first-frame / start-frame mode — this is why Kling is the default), 5–8
seconds, highest quality your credits allow, and use ONLY motion language in
the prompt. The still already owns the look; the prompt's only job is motion.
**No camera presets. No zooms. Nothing dramatic.**

Shared instruction to append to every clip prompt:
> Locked-off tripod camera, absolutely no camera movement, slow subtle
> continuous motion only, calm beginning and calm ending, realistic physics

| Stage | Motion prompt |
|---|---|
| 01 SET OUT | "The worker slowly draws a chalk line and glances up at the level; dust drifts gently; nothing else moves" |
| 02 INTERFACE CHECK | "The supervisor walks slowly and steadily across the boards checking the steel, pausing once to look down; gentle breeze moves their sleeve" |
| 03 HOLD POINT | "One worker slowly turns a page on the clipboard while the other points across the deck; subtle nods; hi-vis fabric moves slightly in the breeze" |
| 04 MOBILISE | "The boom arm extends very slowly and smoothly over the deck as the hose settles; the agitator truck creeps backward a short distance and stops" |
| 05 PLACE | "Wet concrete flows steadily from the hose spreading slowly outward; workers make slow deliberate spreading movements with shovels; the wet edge advances gradually" |
| 06 FINISH | "The power trowel glides slowly across the surface leaving a polished arc; the second worker makes slow smooth hand-trowel strokes at the edge" |
| 07 CURE | "Almost still: the light very slowly warms and dims toward dusk; a faint heat shimmer rises off the slab; background site lights flicker on one by one" |
| 08 HANDOVER | "The two workers slowly look up from the paperwork across the slab; one gestures across it; long shadows creep almost imperceptibly" |

Roll each clip 2–3 times, keep the calmest. Kling first; if a stage looks off
(concrete physics is the usual offender on stage 05), spend premium credits
re-rolling that one stage on Veo. Name them `POUR-01-SETOUT-clip.mp4` … etc.

**Priority if you run short on credits or patience: stages 04, 05, 06.**
That's where the scroll-flow magic lives; the others survive as stills.

---

## Phase 5 — capability and tender stills (Midjourney, `--ar 3:2` unless noted)

Two of these are conditional in the manifest: **CAP-SLAB-01** and
**CAP-INDUSTRIAL-01** install only once the owner confirms those capability
wordings (see `src/content/media.ts`). Generate them if you like, but they
stay out of the site until that confirmation lands.

- **CAP-PLACE-01**: STYLE BLOCK + "crew of three placing concrete from a pump hose on a large ground slab, controlled dark-grey flow, one worker guiding the hose and two spreading, agitator trucks staged on hardstand behind, the boom pump's outriggers set down on timber pads, believable exclusion zone around the machine"
- **CAP-FINISH-01**: STYLE BLOCK + "extreme close-up low angle of a steel hand trowel sweeping across firm, freshly set concrete taking its final smooth polish — placed hours earlier, surface stiffened, a slight satin sheen — worker's gloved hand and forearm only, shallow depth of field"
- **CAP-SLAB-01** (`--ar 16:9`): STYLE BLOCK + "suspended deck under construction seen from the level above, formwork and reinforcement grid stretching away, workers small in frame walking boards, city skyline soft behind"
- **CAP-BASEMENT-01** (`--ar 16:9`): STYLE BLOCK + "concrete pour deep inside a three-level basement excavation, shotcrete walls and steel shoring visible, concrete hose descending from above, artificial work lighting mixing with a shaft of daylight from the opening above"
- **CAP-INDUSTRIAL-01** (`--ar 16:9`): STYLE BLOCK + "vast industrial warehouse floor slab mid-pour, laser screed machine working the far section, enormous flat expanse of fresh concrete reflecting the roof lights"
- **CAP-LIVE-SITE-01** (`--ar 16:9`): STYLE BLOCK + "concrete works behind clean temporary hoarding directly beside an operating shopping area, pedestrians passing safely in the foreground blur, works contained and orderly behind the barrier line"
- **TENDER-PLANS-01**: STYLE BLOCK + "construction drawings rolled open on a site table beside a tablet and a white hard hat, shallow depth of field so no drawing detail is legible, morning site context blurred behind"
- **TENDER-BOOM-01** (`--ar 16:9`): STYLE BLOCK + "red placing boom arm silhouetted against a vast dawn sky over a quiet site, machine small in the lower third, enormous graduated sky as negative space above"

---

## Phase 6 — QC and delivery

1. Run every keeper through the accuracy checklist in
   [AI-IMAGERY.md](AI-IMAGERY.md) — PPE on everyone, hands correct, no
   readable text, plausible reo, outriggers on pads, nothing branded Allscope.
2. Fix small flaws in Gemini ("give this worker a white hard hat", "remove
   the lettering on that vest") instead of re-rolling a good composition.
3. Drop everything in `allscope-site/incoming-photos/` with the exact names
   above.
4. I take it from there: crop to each slot's manifest spec, install with the
   visible **AI CONCEPT** label, extract 120–160 desktop / 40–60 mobile frames
   from the clips, and wire the sequence into the scroll adapter with
   cross-blending.

## Budget and time

| Item | Rolls | Time |
|---|---|---|
| Master scene + hero pair | ~15 image rolls + 2 edits | 1 hour |
| Seven remaining stage stills | ~15 edits/rolls | 1–2 hours |
| Eight motion clips | ~20 video rolls | 1–2 hours |
| Capability + tender stills | ~30 image rolls | 1 hour |

One to two evenings, roughly A$80–110 of subscriptions, and the site gets its
full visual layer plus a flowing animation — all clearly labelled as concept
imagery, all replaceable by real photography as it arrives, and none of it
ever standing in for proof of a real Allscope project.
