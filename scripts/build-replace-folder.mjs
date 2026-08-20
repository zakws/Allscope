/**
 * Builds "NEW PHOTOs AND VIDEOS/REPLACE WITH BETTER QUALITY/" — a copy of
 * every image CURRENTLY IN USE on the site that originates from Allscope's
 * own material (owner-supplied social/attachments + media recovered from the
 * old allscopeconcrete.com.au site). These are the low-quality survivors the
 * owner can hunt down originals for.
 *
 * Each copy is named  {tier}-{NN}--{where-it-appears}--{assetId}.jpg  so the
 * filename alone says how urgent it is (A best … D worst) and where it shows.
 * A README.txt in the folder explains the swap workflow.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");
const LIB = path.join(SITE, "NEW PHOTOs AND VIDEOS", "allscope-photo-library-2026-08-19");
const OUT = path.join(SITE, "NEW PHOTOs AND VIDEOS", "REPLACE WITH BETTER QUALITY");

const register = JSON.parse(fs.readFileSync(path.join(LIB, "04_MANIFESTS", "photo-register.json"), "utf8"));
const leads = JSON.parse(fs.readFileSync(path.join(LIB, "04_MANIFESTS", "lead-placements.json"), "utf8"));
const gen = fs.readFileSync(path.join(SITE, "src", "content", "projects-data.gen.ts"), "utf8");

// Every assetId actually rendered on the site (leads + galleries + capability).
const inUse = new Set([...gen.matchAll(/"assetId": "(ASC-[A-Z0-9-]+)"/g)].map((m) => m[1]));

const OWN_SOURCES = new Set(["owner-supplied-social", "current-allscope-site"]);
const leadByAsset = new Map(leads.map((l) => [l.sourceAssetId, l]));

const rows = register.filter(
  (x) => OWN_SOURCES.has(x.sourceSet) && inUse.has(x.assetId) && fs.existsSync(path.join(LIB, x.relativePath)),
);

// Where does each image appear? Leads appear on the card + project hero;
// gallery images on their project page; CAP images on home/capabilities.
function placeOf(x) {
  if (leadByAsset.has(x.assetId)) return `${x.projectSlug}-LEAD-card-and-hero`;
  if (x.relativePath.includes("99-allscope-social")) return "capability-home-or-capabilities";
  return `${x.projectSlug}-gallery`;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const tierOf = (x) => (x.qualityTier || "D").trim()[0];
rows.sort((a, b) => tierOf(b).localeCompare(tierOf(a)) || a.projectSlug.localeCompare(b.projectSlug));

const lines = [];
let n = 0;
for (const x of rows) {
  n++;
  const ext = path.extname(x.relativePath) || ".jpg";
  const name = `${tierOf(x)}-${String(n).padStart(2, "0")}--${placeOf(x)}--${x.assetId}${ext}`;
  fs.copyFileSync(path.join(LIB, x.relativePath), path.join(OUT, name));
  lines.push(
    `${name}\n   shows: ${x.description}\n   used:  ${placeOf(x).replace(/-/g, " ")}\n   now:   ${x.width}x${x.height}px (tier ${tierOf(x)})\n   want:  original export, ideally 2000px+ on the long edge\n`,
  );
}

const readme = `REPLACE WITH BETTER QUALITY
===========================

These ${n} images are LIVE ON THE WEBSITE right now and are the ones that came
from Allscope's own material (social posts, attachments, and files recovered
from the old website) — mostly small or re-compressed copies. Everything else
on the site came from builder/developer galleries at decent resolution.

Filenames start with the CURRENT quality tier, worst first:
  D = detail/mobile only (replace these first)
  C = standard web
  B/A = decent already — replace only if you have something better

HOW TO REPLACE ONE
------------------
1. Find the original photo (camera roll, Drive, the person who shot it).
2. Save it into THIS folder with the SAME AssetId in the filename
   (e.g. "ASC-CAP-003 original.jpg" is enough).
3. Tell Claude — the pipeline re-cuts, re-places and re-verifies it
   everywhere it appears automatically. Do not edit the website files.

Send originals, not screenshots or WhatsApp copies. Minimum useful width is
about 1600px; 2400px+ is ideal for anything marked LEAD.

THE LIST (worst first)
----------------------
${lines.join("\n")}`;

fs.writeFileSync(path.join(OUT, "README.txt"), readme, "utf8");
console.log(`${n} images copied to REPLACE WITH BETTER QUALITY`);
const tiers = {};
for (const x of rows) tiers[tierOf(x)] = (tiers[tierOf(x)] || 0) + 1;
console.log("by tier:", JSON.stringify(tiers));
console.log("leads among them:", rows.filter((x) => leadByAsset.has(x.assetId)).length);
