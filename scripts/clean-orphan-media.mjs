/**
 * Deletes WebP masters under public/media/{leads,projects,capability} that
 * are no longer referenced by src/content/projects-data.gen.ts (leads,
 * galleries, capability images). Run after build-media-data.mjs whenever the
 * register or the image audit changes, so excluded assets (renders, people
 * shots, replaced leads, Zetland) leave no files behind.
 *
 * public/media/brand and public/media/film are never touched.
 *
 * Run: node scripts/clean-orphan-media.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");
const GEN = path.join(SITE, "src", "content", "projects-data.gen.ts");
const dry = process.argv.includes("--dry");

const gen = fs.readFileSync(GEN, "utf8");
const referenced = new Set(gen.match(/\/media\/[^"\s]+\.webp/g) ?? []);
if (referenced.size === 0) throw new Error("no /media references found in the generated data");

const roots = ["leads", "projects", "capability"].map((d) =>
  path.join(SITE, "public", "media", d),
);

let kept = 0;
let removed = 0;
const removedList = [];
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
        if (fs.readdirSync(abs).length === 0 && !dry) fs.rmdirSync(abs);
        continue;
      }
      const rel = "/" + path.relative(path.join(SITE, "public"), abs).split(path.sep).join("/");
      if (referenced.has(rel)) {
        kept++;
      } else {
        removedList.push(rel);
        if (!dry) fs.unlinkSync(abs);
        removed++;
      }
    }
  };
  walk(root);
}

console.log(`referenced: ${referenced.size}, kept on disk: ${kept}, ${dry ? "would remove" : "removed"}: ${removed}`);
for (const r of removedList) console.log(`  - ${r}`);
