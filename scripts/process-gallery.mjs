/**
 * General gallery pipeline (modeled on scripts/process-media.mjs and
 * scripts/process-4k.mjs): converts the authored owner-photo selections below
 * into WebP masters under public/media/gallery and emits
 * src/content/gallery-data.gen.ts with true output dimensions and alt text.
 *
 * Sources are the folder-03 owner photos that are deliberately NOT
 * job-specific: 98-GENERAL-ALLSCOPE-CAPABILITY (capability, activity-sorted)
 * and 99-UNCONFIRMED-JOB (held for identification; usable as general imagery
 * only, never attributed to a named project — and none is attributed here).
 *
 * Curation rules applied to the 86-image pool (every selection was viewed):
 * concrete-led or concrete-visible only; excluded people-dominant frames,
 * third-party branding, the ASC-OWNER-71 contact-sheet anomaly, the
 * ASC-OWNER-157 rival-branded hat, and every file the folder inventory lists
 * with baked-in flaws (phone UI, pillarboxing, sideways capture, finger,
 * overlays, low-res source, blur, clipping, night-noise).
 *
 * Photo-use permission: verified (user confirmation 20 Aug 2026), same
 * clearance as the folder-03 capability assets already published.
 *
 * Run: node scripts/process-gallery.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { FOLDER03_DIR } from "./new-media-sources.mjs";

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("sharp is not installed in this repo — npm i -D sharp");
  process.exit(1);
}

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");

const P1 = "98-GENERAL-ALLSCOPE-CAPABILITY/01-PLACEMENT-AND-FRESH-POURS";
const P3 = "98-GENERAL-ALLSCOPE-CAPABILITY/03-FINISHED-SLABS-AND-FLOORS";
const P4 = "98-GENERAL-ALLSCOPE-CAPABILITY/04-REINFORCEMENT-AND-PREPOUR";
const P5 = "98-GENERAL-ALLSCOPE-CAPABILITY/05-EXTERNAL-CONCRETE-WORKS";
const P9 = "99-UNCONFIRMED-JOB/UNCONFIRMED-MULTI-RESIDENTIAL-BATCH-A";

/**
 * Authored selections in page order: the first twelve open the page, the rest
 * sit behind the expand toggle. Alt text describes what each photograph
 * actually shows; no project attribution anywhere.
 */
const SELECTIONS = [
  // — Opening twelve
  {
    id: "GAL-149",
    file: `${P1}/ASC-OWNER-149-PHOTO-2026-07-29-20-56-53.jpg`,
    alt: "A wide basement raft pour in progress, finishers screeding behind the pump hose with power trowels standing by.",
  },
  {
    id: "GAL-005",
    file: `${P9}/ASC-OWNER-5-PHOTO-2026-07-29-18-23-07(1).jpg`,
    alt: "In-situ concrete planter and retaining walls with tanking and reinforcement, finished apartment buildings behind.",
  },
  {
    id: "GAL-197",
    file: `${P5}/ASC-OWNER-197-PHOTO-2026-07-29-20-58-18(2).jpg`,
    alt: "A finished charcoal driveway with a contrast border band and trench grate.",
  },
  {
    id: "GAL-146",
    file: `${P1}/ASC-OWNER-146-PHOTO-2026-07-29-20-56-53(1).jpg`,
    alt: "A boom pump placing a suspended slab in a basement, the crew screeding the fresh concrete below.",
  },
  {
    id: "GAL-062",
    file: `${P9}/ASC-OWNER-62-PHOTO-2026-07-29-18-23-09(47).jpg`,
    alt: "Fresh kerb and gutter laid along a new street at dusk, finishers working further up the run.",
  },
  {
    id: "GAL-166",
    file: `${P3}/ASC-OWNER-166-PHOTO-2026-07-29-20-58-10(1).jpg`,
    alt: "A freshly floated basement slab with a drain grate and capped starter bars.",
  },
  {
    id: "GAL-031",
    file: `${P9}/ASC-OWNER-31-PHOTO-2026-07-29-18-23-09(19).jpg`,
    alt: "Footing cages placed below an anchored shoring wall in a bulk excavation.",
  },
  {
    id: "GAL-169",
    file: `${P1}/ASC-OWNER-169-PHOTO-2026-07-29-20-58-10.jpg`,
    alt: "An operator power trowelling a fresh slab, a boom pump and scaffolded building behind.",
  },
  {
    id: "GAL-177",
    file: `${P4}/ASC-OWNER-177-PHOTO-2026-07-29-20-58-13(2).jpg`,
    alt: "Steel fixers tying deck reinforcement between tilt panels.",
  },
  {
    id: "GAL-030",
    file: `${P9}/ASC-OWNER-30-PHOTO-2026-07-29-18-23-09(18).jpg`,
    alt: "New concrete steps and ramp at dusk, the fresh finish still holding its sheen.",
  },
  {
    id: "GAL-067",
    file: `${P9}/ASC-OWNER-67-PHOTO-2026-07-29-18-23-09(6).jpg`,
    alt: "A basement floor sheeted in waterproofing membrane ahead of the raft pour, seen from above.",
  },
  {
    id: "GAL-162",
    file: `${P4}/ASC-OWNER-162-PHOTO-2026-07-29-20-56-58.jpg`,
    alt: "Formed footing boxes with mesh in place beside a tilt-panel warehouse.",
  },

  // — Full gallery
  {
    id: "GAL-213",
    file: `${P1}/ASC-OWNER-213-PHOTO-2026-07-29-20-58-22(2).jpg`,
    alt: "A fresh slab stretching away between column starter cages and blockwork walls.",
  },
  {
    id: "GAL-152",
    file: `${P4}/ASC-OWNER-152-PHOTO-2026-07-29-20-56-54.jpg`,
    alt: "Mesh, membrane and starter bars checked on the morning of a raft pour.",
  },
  {
    id: "GAL-155",
    file: `${P3}/ASC-OWNER-155-PHOTO-2026-07-29-20-56-56(1).jpg`,
    alt: "A freshly floated slab in the foreground with the finishing crew working beyond.",
  },
  {
    id: "GAL-209",
    file: `${P1}/ASC-OWNER-209-PHOTO-2026-07-29-20-58-21(2).jpg`,
    alt: "Mesh and membrane laid for the next pour, the finished slab and pump truck beyond.",
  },
  {
    id: "GAL-045",
    file: `${P9}/ASC-OWNER-45-PHOTO-2026-07-29-18-23-09(31).jpg`,
    alt: "Curved footpath formwork set out along a building frontage at dusk.",
  },
  {
    id: "GAL-056",
    file: `${P9}/ASC-OWNER-56-PHOTO-2026-07-29-18-23-09(41).jpg`,
    alt: "A pump line dropped between completed apartment buildings to reach a courtyard pour.",
  },
  {
    id: "GAL-172",
    file: `${P1}/ASC-OWNER-172-PHOTO-2026-07-29-20-58-11.jpg`,
    alt: "A freshly finished slab beside a bulk excavation, seen from above.",
  },
  {
    id: "GAL-198",
    file: `${P5}/ASC-OWNER-198-PHOTO-2026-07-29-20-58-18(3).jpg`,
    alt: "A finished dark driveway apron with a curved formed edge.",
  },
  {
    id: "GAL-018",
    file: `${P9}/ASC-OWNER-18-PHOTO-2026-07-29-18-23-07(8).jpg`,
    alt: "Fresh footpath panels poured beside an apartment building.",
  },
  {
    id: "GAL-205",
    file: `${P4}/ASC-OWNER-205-PHOTO-2026-07-29-20-58-20(2).jpg`,
    alt: "Allscope crew placing concrete at a slab edge under a storm sky.",
  },
  {
    id: "GAL-208",
    file: `${P1}/ASC-OWNER-208-PHOTO-2026-07-29-20-58-21(1).jpg`,
    alt: "A fresh slab with column starter cages rising from it, blockwork walls behind.",
  },
  {
    id: "GAL-163",
    file: `${P4}/ASC-OWNER-163-PHOTO-2026-07-29-20-58-08(1).jpg`,
    alt: "Formwork and mesh set out for footings alongside tilt panels.",
  },
  {
    id: "GAL-033",
    file: `${P9}/ASC-OWNER-33-PHOTO-2026-07-29-18-23-09(20).jpg`,
    alt: "Footing and lift-pit pours under way in a bulk excavation, the pump line run down from street level.",
  },
  {
    id: "GAL-040",
    file: `${P9}/ASC-OWNER-40-PHOTO-2026-07-29-18-23-09(27).jpg`,
    alt: "Mesh and formwork ready for a courtyard slab between terrace walls.",
  },
  {
    id: "GAL-043",
    file: `${P9}/ASC-OWNER-43-PHOTO-2026-07-29-18-23-09(3).jpg`,
    alt: "A shored basement excavation with capping beams poured and starter bars ready for footings.",
  },
  {
    id: "GAL-049",
    file: `${P9}/ASC-OWNER-49-PHOTO-2026-07-29-18-23-09(35).jpg`,
    alt: "An Allscope finisher on a fresh textured walkway between apartment buildings.",
  },
  {
    id: "GAL-050",
    file: `${P9}/ASC-OWNER-50-PHOTO-2026-07-29-18-23-09(36).jpg`,
    alt: "A finished footpath running along a terrace frontage with new street trees.",
  },
  {
    id: "GAL-052",
    file: `${P9}/ASC-OWNER-52-PHOTO-2026-07-29-18-23-09(38).jpg`,
    alt: "Walkway deck reinforcement fixed over void formers between buildings.",
  },
  {
    id: "GAL-053",
    file: `${P9}/ASC-OWNER-53-PHOTO-2026-07-29-18-23-09(39).jpg`,
    alt: "The crew finishing a fresh laneway slab between apartment buildings.",
  },
  {
    id: "GAL-061",
    file: `${P9}/ASC-OWNER-61-PHOTO-2026-07-29-18-23-09(46).jpg`,
    alt: "Reinforcement set out for a curved driveway and paths between buildings.",
  },
  {
    id: "GAL-068",
    file: `${P9}/ASC-OWNER-68-PHOTO-2026-07-29-18-23-09(7).jpg`,
    alt: "A footing pour in progress at the base of a deep shored excavation.",
  },
  {
    id: "GAL-069",
    file: `${P9}/ASC-OWNER-69-PHOTO-2026-07-29-18-23-09(8).jpg`,
    alt: "The pump boom reaching over a shored excavation during an early works pour.",
  },
  {
    id: "GAL-147",
    file: `${P5}/ASC-OWNER-147-PHOTO-2026-07-29-20-56-53(2).jpg`,
    alt: "A fresh concrete path running along a gabion stone wall.",
  },
  {
    id: "GAL-148",
    file: `${P1}/ASC-OWNER-148-PHOTO-2026-07-29-20-56-53(3).jpg`,
    alt: "A residential driveway pour in progress, the agitator truck backed up to the forms.",
  },
  {
    id: "GAL-156",
    file: `${P4}/ASC-OWNER-156-PHOTO-2026-07-29-20-56-56(2).jpg`,
    alt: "Deck mesh and membrane down, the pump set up beside the warehouse for pour day.",
  },
  {
    id: "GAL-167",
    file: `${P3}/ASC-OWNER-167-PHOTO-2026-07-29-20-58-10(2).jpg`,
    alt: "Swirl finish on a fresh backyard slab.",
  },
  {
    id: "GAL-212",
    file: `${P1}/ASC-OWNER-212-PHOTO-2026-07-29-20-58-22(1).jpg`,
    alt: "Two ride-on trowels working a fresh slab between column starter cages.",
  },
  {
    id: "GAL-215",
    file: `${P1}/ASC-OWNER-215-PHOTO-2026-07-29-20-58-22.jpg`,
    alt: "A freshly poured and finished deck, starter bars ready for the next lift.",
  },
];

const ids = new Set(SELECTIONS.map((s) => s.id));
if (ids.size !== SELECTIONS.length) throw new Error("duplicate gallery ids");

const OUT_DIR = path.join(SITE, "public", "media", "gallery");
fs.mkdirSync(OUT_DIR, { recursive: true });

let done = 0;
let skipped = 0;
let failed = 0;
const rows = [];
const t0 = Date.now();

for (const sel of SELECTIONS) {
  const src = path.join(FOLDER03_DIR, sel.file);
  const outAbs = path.join(OUT_DIR, `${sel.id}.webp`);
  if (!fs.existsSync(src)) {
    console.error(`MISSING SOURCE: ${src}`);
    failed++;
    continue;
  }
  try {
    // Idempotent: convert only when missing or older than the source; always
    // re-read the true output dimensions for the emitted data.
    const stale =
      !fs.existsSync(outAbs) ||
      fs.statSync(outAbs).mtimeMs <= fs.statSync(src).mtimeMs;
    if (stale) {
      await sharp(src)
        .rotate() // honour EXIF orientation
        .resize({ width: 2000, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(outAbs);
      done++;
    } else {
      skipped++;
    }
    const meta = await sharp(outAbs).metadata();
    rows.push({
      src: `/media/gallery/${sel.id}.webp`,
      width: meta.width,
      height: meta.height,
      orientation:
        meta.width > meta.height
          ? "landscape"
          : meta.width === meta.height
            ? "square"
            : "portrait",
      alt: sel.alt,
    });
  } catch (e) {
    console.error(`FAILED ${src}: ${e.message}`);
    failed++;
  }
}

if (failed) process.exit(1);

const ts = `/**
 * GENERATED by scripts/process-gallery.mjs from the authored owner-photo
 * selections (folder 03, 98-GENERAL and 99-UNCONFIRMED batches). Do not edit
 * by hand — adjust the selections in the script and re-run it. None of these
 * photographs is attributed to a named project by design.
 */

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait" | "square";
  alt: string;
}

export const galleryPhotos: GalleryPhoto[] = ${JSON.stringify(rows, null, 2)};
`;
fs.writeFileSync(path.join(SITE, "src", "content", "gallery-data.gen.ts"), ts, "utf8");

const bytes = fs
  .readdirSync(OUT_DIR)
  .reduce((n, f) => n + fs.statSync(path.join(OUT_DIR, f)).size, 0);
console.log(
  `processed ${done}, skipped ${skipped}, failed ${failed} of ${SELECTIONS.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
);
console.log(`gallery payload: ${(bytes / 1024 / 1024).toFixed(2)} MB (${rows.length} images)`);
