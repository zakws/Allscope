/**
 * Copies the installed subset of the 29 Aug 2026 final photo pack into
 * public/media (leads + per-project galleries) and probes each file's
 * intrinsic dimensions into scripts/photo-pack-dims.json, which
 * build-media-data.mjs requires when emitting the pack records.
 *
 * Only files named in scripts/photo-pack-2026-08-29.mjs are copied — the
 * held El Jannah Minto folder and the pack's handover Markdown/JSON never
 * reach public/. Idempotent; re-run after a pack refresh.
 *
 * Run: node scripts/install-photo-pack-2026-08-29.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { PACK_DIR, photoPack } from "./photo-pack-2026-08-29.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");

const dims = {};
let copied = 0;

async function install(asset, dest) {
  const src = path.join(PACK_DIR, asset.file);
  if (!fs.existsSync(src)) throw new Error(`pack file missing: ${asset.file}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  const meta = await sharp(dest).metadata();
  dims[asset.assetId] = { width: meta.width, height: meta.height };
  copied++;
  console.log(`  ${asset.assetId}  ${meta.width}x${meta.height}  <- ${asset.file}`);
}

for (const p of photoPack) {
  console.log(p.slug);
  if (p.lead) {
    await install(p.lead, path.join(SITE, "public", "media", "leads", `${p.lead.assetId}.webp`));
  }
  for (const g of p.gallery) {
    await install(g, path.join(SITE, "public", "media", "projects", p.slug, `${g.assetId}.webp`));
  }
}

fs.writeFileSync(
  path.join(HERE, "photo-pack-dims.json"),
  JSON.stringify(dims, null, 1),
  "utf8",
);
console.log(`\ninstalled: ${copied} files; dims written to scripts/photo-pack-dims.json`);
