/**
 * 4K photo pipeline (modeled on scripts/process-media.mjs): converts the
 * authored folder-03 (owner) and folder-04 (exact-project) selections from
 * scripts/new-media-sources.mjs into WebP masters under public/media, and
 * writes scripts/4k-dims.json with the exact output dimensions so
 * build-media-data.mjs can emit true aspect ratios.
 *
 * Leads are capped at 2400px wide (quality 84); gallery and capability
 * images at 2000px (quality 82). Originals are read only, never modified.
 *
 * Run: node scripts/process-4k.mjs   (before build-media-data.mjs)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import {
  FOLDER03_DIR,
  FOLDER04_DIR,
  FOLDER04_JOB_SLUGS,
  folder03CapabilityAssets,
  folder03ProjectAssets,
  folder04Decisions,
} from "./new-media-sources.mjs";

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
const DIMS_PATH = path.join(HERE, "4k-dims.json");

/** Locate a folder-04 register file by its output name (job folder unknown here). */
function folder04Path(outputName) {
  for (const jobFolder of Object.keys(FOLDER04_JOB_SLUGS)) {
    const p = path.join(FOLDER04_DIR, jobFolder, outputName);
    if (fs.existsSync(p)) return { path: p, jobFolder };
  }
  return null;
}

const jobs = [];
for (const d of folder04Decisions) {
  if (d.role === "skip") continue;
  const hit = folder04Path(d.outputName);
  if (!hit) throw new Error(`folder-04 source not found: ${d.outputName}`);
  const slug = FOLDER04_JOB_SLUGS[hit.jobFolder];
  jobs.push({
    src: hit.path,
    out:
      d.role === "lead"
        ? `public/media/leads/${d.assetId}.webp`
        : `public/media/projects/${slug}/${d.assetId}.webp`,
    assetId: d.assetId,
    maxW: d.role === "lead" ? 2400 : 2000,
    quality: d.role === "lead" ? 84 : 82,
  });
}
for (const a of folder03ProjectAssets) {
  jobs.push({
    src: path.join(FOLDER03_DIR, a.file),
    out: `public/media/projects/${a.slug}/${a.assetId}.webp`,
    assetId: a.assetId,
    maxW: 2000,
    quality: 82,
  });
}
for (const a of folder03CapabilityAssets) {
  jobs.push({
    src: path.join(FOLDER03_DIR, a.file),
    out: `public/media/capability/${a.assetId}.webp`,
    assetId: a.assetId,
    maxW: 2000,
    quality: 82,
  });
}

const dims = fs.existsSync(DIMS_PATH)
  ? JSON.parse(fs.readFileSync(DIMS_PATH, "utf8"))
  : {};

let done = 0;
let skipped = 0;
let failed = 0;
const t0 = Date.now();

for (const job of jobs) {
  const outAbs = path.join(SITE, job.out);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  if (!fs.existsSync(job.src)) {
    console.error(`MISSING SOURCE: ${job.src}`);
    failed++;
    continue;
  }
  try {
    // Idempotent: convert only when the output is missing or older than the
    // source; always (re)record the true output dimensions.
    const stale =
      !fs.existsSync(outAbs) ||
      fs.statSync(outAbs).mtimeMs <= fs.statSync(job.src).mtimeMs;
    if (stale) {
      await sharp(job.src)
        .rotate() // honour EXIF orientation
        .resize({ width: job.maxW, withoutEnlargement: true })
        .webp({ quality: job.quality, effort: 5 })
        .toFile(outAbs);
      done++;
    } else {
      skipped++;
    }
    const meta = await sharp(outAbs).metadata();
    dims[job.assetId] = {
      width: meta.width,
      height: meta.height,
      src: job.out.replace(/^public/, ""),
    };
  } catch (e) {
    console.error(`FAILED ${job.src}: ${e.message}`);
    failed++;
  }
}

fs.writeFileSync(DIMS_PATH, JSON.stringify(dims, null, 1), "utf8");
console.log(
  `processed ${done}, skipped ${skipped}, failed ${failed} of ${jobs.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
);
console.log(`dims manifest: ${DIMS_PATH} (${Object.keys(dims).length} assets)`);
if (failed) process.exit(1);
