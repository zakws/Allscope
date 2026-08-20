/**
 * Phase 1 image pipeline — executes scripts/media-jobs.json (emitted by
 * build-media-data.mjs): library originals -> public/media WebP masters.
 *
 * One high-quality WebP master per image, capped at the job's maxW;
 * next/image generates the responsive sizes from these at request time.
 * Originals stay untouched inside the library folder (which is never served).
 *
 * Run: node scripts/process-media.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

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
const jobs = JSON.parse(fs.readFileSync(path.join(HERE, "media-jobs.json"), "utf8"));

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
  // Idempotent: skip when the output is newer than the source.
  if (
    fs.existsSync(outAbs) &&
    fs.statSync(outAbs).mtimeMs > fs.statSync(job.src).mtimeMs
  ) {
    skipped++;
    continue;
  }
  try {
    await sharp(job.src)
      .rotate() // honour EXIF orientation
      .resize({ width: job.maxW, withoutEnlargement: true })
      .webp({ quality: job.quality, effort: 5 })
      .toFile(outAbs);
    done++;
  } catch (e) {
    console.error(`FAILED ${job.src}: ${e.message}`);
    failed++;
  }
}

const sum = (dir) => {
  let n = 0;
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else n += fs.statSync(p).size;
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return n;
};

console.log(`processed ${done}, skipped ${skipped}, failed ${failed} of ${jobs.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(`public/media payload: ${(sum(path.join(SITE, "public/media")) / 1024 / 1024).toFixed(2)} MB`);
if (failed) process.exit(1);
