/**
 * Copies the enhanced project-page upgrade files (photo-upgrades-2026-08-30)
 * into public/media/projects/<slug>/ under their new asset ids and writes
 * scripts/photo-upgrade-dims.json for build-media-data.mjs. Files are
 * already web-ready WebP; copied as-is, never upscaled.
 *
 * Run: node scripts/install-photo-upgrades-2026-08-30.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { UPGRADES_DIR, photoUpgrades } from "./photo-upgrades-2026-08-30.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");

const dims = {};
for (const u of photoUpgrades) {
  const src = path.join(UPGRADES_DIR, u.file);
  if (!fs.existsSync(src)) throw new Error(`upgrade file missing: ${u.file}`);
  const dest = path.join(SITE, "public", "media", "projects", u.slug, `${u.newAssetId}.webp`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  const m = await sharp(dest).metadata();
  dims[u.newAssetId] = { width: m.width, height: m.height };
  console.log(`${u.newAssetId}  ${m.width}x${m.height}  <- ${u.file}  (replaces ${u.replaceAssetId} on ${u.slug})`);
}
fs.writeFileSync(path.join(HERE, "photo-upgrade-dims.json"), JSON.stringify(dims, null, 1), "utf8");
console.log("dims written to scripts/photo-upgrade-dims.json");
