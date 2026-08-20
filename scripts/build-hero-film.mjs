/**
 * Phase 1 hero film — cuts the five approved clips into the homepage films.
 *
 * Beat plan (brief §6, ~12.5s total, 0.5s crossfades):
 *   1. dl0  ground-level placing boom + agitators   (machinery)
 *   2. dl1  aerial wide of the slab pour            (wide commercial pour)
 *   3. v14  placement + spreading over mesh         (active placement)
 *   4. v13  screed bar pass, wet concrete close-up  (screeding/levelling)
 *   5. vez  ride-on power trowel from above         (finishing)
 *   6. vez  later trowel pass over the glossy slab  (finished closing frame)
 *
 * Treatment: 24fps, monochrome with lifted blacks (no crush), subtle grain,
 * dip-from/to black so the loop point reads as an intentional beat rather
 * than a jump. Desktop 1920x1080; mobile a reframed 1080x1920 vertical.
 * Audio stripped. Poster pulled from beat 1.
 *
 * Run: node scripts/build-hero-film.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");
const V = path.join(SITE, "NEW PHOTOs AND VIDEOS", "Videos");
const OUT = path.join(SITE, "public", "media", "film");
fs.mkdirSync(OUT, { recursive: true });

const SRC = {
  dl0: path.join(V, "download.mp4"),
  dl1: path.join(V, "download (1).mp4"),
  v13: path.join(V, "13415066_1920_1080_24fps.mp4"),
  v14: path.join(V, "14526896_1920_1080_25fps.mp4"),
  vez: path.join(V, "vecteezy_a-construction-worker-skillfully-operating-a-power-trowel-on_53614816.mp4"),
};

// [clip, inPoint, duration] — 2.5s beats.
// [clip, inPoint, duration] — 3.2s beats, every one of the five clips
// present; the trowel clip closes the loop with a second, later pass.
const BEAT_LEN = 3.2;
const BEATS = [
  ["dl0", 5.5, BEAT_LEN],
  ["dl1", 1.8, BEAT_LEN],
  ["v14", 7.6, BEAT_LEN],
  ["v13", 2.8, BEAT_LEN],
  ["vez", 0.8, BEAT_LEN],
  ["vez", 5.8, BEAT_LEN],
];
const FADE = 0.6;
const TOTAL = BEATS.length * BEAT_LEN - (BEATS.length - 1) * FADE; // 16.2s

/**
 * Per-clip framing for the vertical master. Each entry is the horizontal
 * centre of interest (0 = left, 0.5 = centre, 1 = right) used to place the
 * 9:16 crop — an intentional reframe, not a blind centre crop.
 */
const MOBILE_FOCUS = { dl0: 0.62, dl1: 0.45, v14: 0.5, v13: 0.42, vez: 0.5 };

// Monochrome grade: desaturate, gentle S-curve with lifted blacks, mild grain.
const GRADE =
  "hue=s=0," +
  "curves=all='0/0.035 0.5/0.52 1/0.985'," +
  "eq=contrast=1.06:brightness=0.005," +
  "noise=alls=5:allf=t";

function buildFilm({ w, h, out, crf, maxrate }) {
  const inputs = [];
  const filters = [];
  BEATS.forEach(([clip, inPoint, dur], i) => {
    inputs.push("-ss", String(inPoint), "-t", String(dur + 0.2), "-i", SRC[clip]);
    const focus = MOBILE_FOCUS[clip] ?? 0.5;
    // Cover-fit to target: scale so both dimensions cover, then crop with the
    // focus point deciding what survives on the vertical master.
    const fit =
      `scale=${w}:${h}:force_original_aspect_ratio=increase,` +
      `crop=${w}:${h}:min(iw-${w}\\,max(0\\,(iw-${w})*${focus})):(ih-${h})/2`;
    filters.push(`[${i}:v]fps=24,${fit},${GRADE},setpts=PTS-STARTPTS,settb=AVTB[s${i}]`);
  });

  // xfade chain
  let prev = "s0";
  let offset = 0;
  for (let i = 1; i < BEATS.length; i++) {
    offset += BEAT_LEN - FADE;
    const label = i === BEATS.length - 1 ? "xf" : `x${i}`;
    filters.push(
      `[${prev}][s${i}]xfade=transition=fade:duration=${FADE}:offset=${offset}[${label}]`,
    );
    prev = label;
  }
  // Dip from/to black so the loop point is an intentional beat.
  filters.push(
    `[xf]fade=t=in:st=0:d=0.5,fade=t=out:st=${(TOTAL - 0.7).toFixed(2)}:d=0.7[v]`,
  );

  execFileSync(
    ffmpeg,
    [
      "-y", "-loglevel", "error",
      ...inputs,
      "-filter_complex", filters.join(";"),
      "-map", "[v]",
      "-an",
      "-c:v", "libx264",
      "-preset", "slow",
      "-crf", String(crf),
      "-maxrate", maxrate,
      "-bufsize", "8M",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      path.join(OUT, out),
    ],
    { stdio: "inherit" },
  );
  const size = fs.statSync(path.join(OUT, out)).size;
  console.log(`${out}: ${(size / 1024 / 1024).toFixed(2)} MB (${TOTAL.toFixed(1)}s)`);
}

console.log("desktop 16:9 …");
buildFilm({ w: 1920, h: 1080, out: "hero-desktop.mp4", crf: 23, maxrate: "4500k" });
console.log("mobile 9:16 …");
buildFilm({ w: 1080, h: 1920, out: "hero-mobile.mp4", crf: 24, maxrate: "2600k" });

// Poster: beat-1 frame with the same grade.
for (const [name, w, h, focus] of [
  ["hero-poster.jpg", 1920, 1080, 0.5],
  ["hero-poster-mobile.jpg", 1080, 1920, MOBILE_FOCUS.dl0],
]) {
  execFileSync(ffmpeg, [
    "-y", "-loglevel", "error",
    "-ss", "7.2", "-i", SRC.dl0,
    "-frames:v", "1",
    "-vf",
    `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}:min(iw-${w}\\,max(0\\,(iw-${w})*${focus})):(ih-${h})/2,${GRADE.replace(",noise=alls=5:allf=t", "")}`,
    "-q:v", "3",
    path.join(OUT, name),
  ]);
  console.log(`${name} written`);
}
console.log("film build complete");
