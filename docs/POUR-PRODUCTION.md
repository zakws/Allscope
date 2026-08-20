# Making THE POUR real — production guide

The homepage animation is confirmed. This is how it goes from technical drawing
to real footage, what to film, and exactly what to hand back.

The section was architected for this from day one: the scroll machinery
(pinning, scrubbing, stage copy, progress dots, skip control, reduced-motion
fallback) is finished and stays. Only the picture behind it changes — the
canvas renderer implements a single `draw(progress)` interface
(`src/components/home/pour-renderer.ts`), so a real frame sequence drops in
without rewriting the section.

## What the animation needs: eight stages, eight shots

You cannot film one slab through all eight stages in a day — set-out to cure
spans a week or more. You don't need to. The sequence is built from **eight
locked-off clips that cross-dissolve at stage boundaries**, and they can come
from different bays, different days, even different projects, as long as the
framing feels consistent (similar height, similar angle, landscape).

| Stage | Scroll range | What to film | Easiest source |
|---|---|---|---|
| 01 SET OUT / REVIEW | 0–10% | Supervisor with drawings/level over a bare formed deck; set-out marks visible | Any morning before a pour |
| 02 INTERFACE CHECK | 10–24% | Slow pan or hold on completed reo/formwork, someone checking it (never installing it) | Day before a pour |
| 03 PRE-POUR HOLD POINT | 24–36% | The checklist actually being completed; tablet or paper, deck behind | Pour morning, first light |
| 04 MOBILISE | 36–48% | The boom unfolding + first agitator backing in — the money shot for drama | Pour morning; drone lift here is gold |
| 05 PLACE | 48–64% | Concrete flowing from the hose, crew working the pour | Pour day |
| 06 FINISH | 64–78% | Screeding, then trowel passes; low angle across the surface | Pour day, afternoon |
| 07 CURE / PROTECT | 78–90% | Curing cover going down / finished surface at dusk | End of pour day |
| 08 HANDOVER / PROOF | 90–100% | Clean wide of the finished slab, or the crew stepping back | End of pour day or next morning |

**One pour day covers stages 3–8. Stages 1–2 are a 30-minute visit the day
before.** So the whole animation is one day plus one short visit — and it's the
same day as the photography shoot in `PHOTO-BRIEF.md`, same photographer.

## How to film it

- **Tripod, locked off, landscape.** No handheld, no pans except where noted.
  4K if the camera has it, 1080p minimum. A recent iPhone on a $40 tripod
  genuinely works; a hired videographer for the day is better.
- **5–10 seconds per stage** of steady footage is plenty. Shoot 30–60 seconds
  and we choose the best window.
- **Frame wide with headroom** — the web crops top and bottom, and phones crop
  the sides. Keep the action in the middle 60%.
- **Timelapse bonus:** a GoPro or site camera shooting one frame every 5–10
  seconds through the whole pour day gives a stunning alternative for stages
  4–7. Set it up, forget it.
- **Light:** early or late beats midday. Overcast is fine — concrete reads
  better without harsh shadows.

**Accuracy rules still apply on film.** Nobody shown installing reo or
formwork (checking it, yes). Full PPE always. No outriggers on fresh concrete.
Allscope's own red boom can be shown branded; any other pump stays a background
machine and is never claimed.

## What happens to the footage (my side)

1. You drop the clips in `allscope-site/incoming-photos/` with a note of which
   stage each one is.
2. I extract frames mapped to the scroll ranges above — the shipped build uses
   **216 desktop frames** (24–39 per stage) and **90 lighter mobile frames**,
   encoded as WebP (~20 MB desktop / ~3.5 MB mobile, loaded progressively:
   a coarse pass makes the sequence scrubbable within the first few frames'
   worth of downloads, the rest streams behind it). The renderer cross-blends
   adjacent frames by fractional scroll position and eases to the single
   nearest frame when scrolling rests, so motion is smooth and stills are
   crisp.
   Flow rules for the source clips: slow, one-direction motion, locked-off
   camera, calm first and last seconds (transitions dissolve there). Scrubbing
   amplifies jerkiness — calm clips scrub beautifully, dynamic ones feel
   chaotic. This applies equally to filmed footage and AI image-to-video
   clips (see AI-IMAGERY.md for that route: 8 approved stills, then one
   5–8 second clip per stage).
3. A frame-sequence renderer replaces the drawing behind the same
   `draw(progress)` seam. Stage labels, proof lines, progress dots, skip
   control and the static fallback all stay exactly as they are.
4. The final dissolve lands on the real HOME-POUR-02 photograph, connecting
   process to proof, as specced.

Fallback route: if frame extraction ever fights us, the same clips become a
single scrubbed video — slightly less precise per-stage control, same
experience. Either way the footage brief above is identical, so nothing about
the filming day changes.

## How it behaves on an iPhone (current build, and after the footage)

- The pinned sequence is **shorter on phones** (220vh of scroll vs 300vh on
  desktop) so thumbs aren't scrolling forever.
- The drawing renders in **compact mode**: fewer annotation labels, same eight
  stages, same stage copy. The progress dots are a desktop affordance and are
  not shown on phones.
- Scrolling stays fully native — no hijacked gestures; the scrub follows the
  page scroll through the pinned section.
- **Reduced motion** (an iOS accessibility setting) replaces the whole
  sequence with the static eight-stage grid carrying the same information; the
  "view process without motion" button does the same for anyone.
- Phones get the **lighter 90-frame set** (900px wide, ~3.5 MB) — they never
  download desktop assets.
- Verified in device-size emulation; a hands-on pass in Safari on a real
  iPhone remains on the pre-launch QA list (docs/QA-REPORT.md).
