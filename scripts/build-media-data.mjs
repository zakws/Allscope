/**
 * Phase 0 generator — turns the supplied photo-library manifests plus the
 * 4K photo folders into the site's structured project/media data.
 *
 * Reads (never published, never copied to public/):
 *   NEW PHOTOs AND VIDEOS/allscope-photo-library-2026-08-19/04_MANIFESTS/
 *     project-plan.json     — 17 confirmed projects (names, sectors, teams, status)
 *     photo-register.json   — 136 images with purpose/quality/status/orientation
 *     lead-placements.json  — registered lead image per project
 *   ../04-ALLSCOPE-ONLINE-ACTUAL-JOBS-4K/SOURCE-RIGHTS-REGISTER.csv
 *     — 30 exact-project photographs graded CONCRETE-LED / CONCRETE-VISIBLE /
 *       PROJECT-CONTEXT-ONLY, joined against scripts/new-media-sources.mjs
 *   ../03-ALLSCOPE-OWNER-PHOTOS-ENHANCED-4K — owner photos, authored
 *     selections in scripts/new-media-sources.mjs
 *   scripts/4k-dims.json — output dims written by scripts/process-4k.mjs
 *
 * Emits:
 *   src/content/projects-data.gen.ts  — typed data the site builds from
 *   scripts/media-jobs.json           — image-processing job list for the
 *                                       library pipeline (process-media.mjs);
 *                                       folder 03/04 masters are produced by
 *                                       process-4k.mjs instead
 *
 * Publish-status handling (per 00_README.md: pre-confirmation flags are audit
 * trail; the publishStatus column is the operative state):
 *   BUILDER_APPROVED_JOB_CONFIRMED        -> publish
 *   BUILDER_APPROVED_RENDER_CONTEXT       -> EXCLUDED (image audit, 20 Aug 2026:
 *                                            no render/CGI is published anywhere)
 *   BUILDER_APPROVED_CONTEXT_ONLY         -> publish, caption constrained (no
 *                                            employee/project-proof claims)
 *   BUILDER_APPROVED_ORIGINAL_RECOMMENDED -> publish (original swap noted)
 *   BUILDER_APPROVED_HOLD_ART_DIRECTION   -> EXCLUDED from the public site
 *
 * People-dominant photographs (ceremonies, portraits, milestone groups) and
 * images dominated by another contractor's branding are excluded by the
 * EXCLUDED_ASSETS table below.
 *
 * Photo-use permission for all published imagery, including the folder 03/04
 * 4K sources: verified (user confirmation 20 Aug 2026).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FOLDER04_DIR,
  FOLDER04_JOB_SLUGS,
  folder03CapabilityAssets,
  folder03ProjectAssets,
  folder04Decisions,
} from "./new-media-sources.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");
const LIB = path.join(SITE, "NEW PHOTOs AND VIDEOS", "allscope-photo-library-2026-08-19");
const MAN = path.join(LIB, "04_MANIFESTS");

const planAll = JSON.parse(fs.readFileSync(path.join(MAN, "project-plan.json"), "utf8"));

/**
 * CORRECTION 20 Aug 2026: Allscope did NOT work on Zetland Build-to-Rent.
 * Its earlier inclusion was a mistake. Excluded entirely from the site;
 * its register rows and media are never emitted or processed. The folder-04
 * pack's 17-ZETLAND folder is likewise never read.
 */
const EXCLUDED_PROJECTS = new Set(["zetland-binah"]);
const plan = planAll.filter((p) => !EXCLUDED_PROJECTS.has(p.projectSlug));
const register = JSON.parse(fs.readFileSync(path.join(MAN, "photo-register.json"), "utf8"));
const leads = JSON.parse(fs.readFileSync(path.join(MAN, "lead-placements.json"), "utf8"));

const HOLD = "BUILDER_APPROVED_HOLD_ART_DIRECTION";
const RENDER = "BUILDER_APPROVED_RENDER_CONTEXT";
const CONTEXT = "BUILDER_APPROVED_CONTEXT_ONLY";

/**
 * Image audit, 20 Aug 2026 (mirrors EXCLUDED_PROJECTS): register rows that
 * must never be emitted, with the reason recorded for the integration
 * register (docs/PHOTO-INTEGRATION-REGISTER.md).
 *
 * Renders/CGI: the site now publishes photography only. People-dominant
 * rows: ceremonies, portraits and milestone groups. Branding rows: another
 * contractor's identity dominates the frame.
 */
const EXCLUDED_ASSETS = new Map([
  // — Architectural renders / CGI (every RENDER_CONTEXT row in the register)
  ["ASC-EDS-001", "render/CGI: balcony and park outlook render"],
  ["ASC-EDS-002", "render/CGI: park and tower render"],
  ["ASC-BAB-001", "render/CGI: courtyard render (was the Babylon lead)"],
  ["ASC-BAB-002", "render/CGI: apartment-building render"],
  ["ASC-OPH-001", "render/CGI: hotel design render"],
  ["ASC-OPH-003", "render/CGI: hotel design render"],
  ["ASC-OPH-005", "render/CGI: alternate hotel design render"],
  ["ASC-ASH-001", "render/CGI: rooftop landscape render"],
  ["ASC-ASH-002", "render/CGI: apartment living render"],
  ["ASC-ASH-003", "render/CGI: apartment kitchen render"],
  ["ASC-OTW-001", "render/CGI: precinct exterior render"],
  ["ASC-OTW-002", "render/CGI: tower exterior render"],
  ["ASC-OTW-004", "render/CGI: landscaped rooftop render"],
  ["ASC-T95-001", "render/CGI: Manly Corso context render"],
  ["ASC-T95-002", "render/CGI: apartment interior render"],
  ["ASC-T95-003", "render/CGI: street exterior render (was the Twenty95 lead)"],
  ["ASC-OTP-001", "render/CGI: Parkside park and precinct render"],
  ["ASC-VRK-001", "render/CGI: communal breezeway render"],
  ["ASC-VRK-002", "render/CGI: communal gardens render"],
  ["ASC-VRK-003", "render/CGI: full exterior render"],

  // — People-dominant (ceremony / portrait / milestone / media event)
  ["ASC-BAB-003", "people-dominant: project milestone conversation"],
  ["ASC-BAB-004", "people-dominant: olive-tree ceremony sign and attendees"],
  ["ASC-BAB-005", "people-dominant: milestone ceremony on the completed slab"],
  ["ASC-BAB-006", "people-dominant: builder and project representative portrait"],
  ["ASC-BAB-007", "people-dominant: project-team milestone group"],
  ["ASC-BAB-008", "people-dominant: milestone conversation detail"],
  ["ASC-OPH-002", "people-dominant: topping-out team milestone"],
  ["ASC-OPH-007", "people-dominant: two site personnel in discussion"],
  ["ASC-OTW-008", "people-dominant: crane technicians during erection"],
  ["ASC-SYD-003", "people-dominant: media event (file also absent from the library)"],

  // — Another contractor's branding dominant
  ["ASC-AUB-005", "third-party branding: Binah spokesperson video frame with caption overlay"],
  ["ASC-T95-010", "third-party branding: excavation contractor's machinery, no concrete visible"],
  ["ASC-T95-011", "third-party branding: excavation contractor's machinery, no concrete visible"],

  // — Superseded
  [
    "ASC-OPS-002",
    "superseded: lens-flared social crop of the amphitheatre; replaced by the clean exact-project photograph OJ4-OPS-02",
  ],

  // — Quality purge (image audit, 20 Aug 2026): register-era sources whose
  //   width AND height are both under 900px cannot fill their gallery slots
  //   without a visible upscale. Every excluded file was viewed to confirm.
  ["ASC-EDS-015", "quality purge: 800x533 source, soft at gallery size"],
  ["ASC-SYD-002", "quality purge: 800x533 source, soft at gallery size"],
  ["ASC-SYD-004", "quality purge: 800x599 source, soft at gallery size"],
  ["ASC-SYD-005", "quality purge: 800x599 source, soft at gallery size"],
  ["ASC-OPH-004", "quality purge: 800x442 source, soft at gallery size"],
  ["ASC-OPH-006", "quality purge: 800x446 source, soft at gallery size"],
  ["ASC-ASH-009", "quality purge: 726x545 source, soft at gallery size"],
  ["ASC-T95-004", "quality purge: 800x533 source, soft at gallery size"],
  ["ASC-T95-008", "quality purge: 800x533 source, soft at gallery size"],

  // — Quality purge (same audit): video frames that read soft at their slot
  //   or carry baked-in subtitles/overlays. Every one was viewed to confirm.
  ["ASC-EDS-014", "quality purge: 716px night video frame, soft and noisy at gallery size"],
  ["ASC-BAB-009", "quality purge: 720px drone video frame, visibly soft beside the 4K photography"],
  ["ASC-BAB-010", "quality purge: drone video frame with baked-in subtitle text"],
  ["ASC-BAB-011", "quality purge: drone video frame with baked-in subtitle text"],
  ["ASC-AUB-004", "quality purge: drone video frame with baked-in subtitle text"],
  ["ASC-AUB-006", "quality purge: drone video frame with baked-in subtitle text"],
]);

/** Sector labels normalised to the brief's filter set. */
const SECTOR_MAP = {
  "Industrial": "industrial",
  "Multi-residential": "multi-residential",
  "Mixed-use": "mixed-use",
  "Commercial": "commercial",
  "Hospitality": "hospitality",
  "Education": "education",
  "Retail / Fuel": "retail-fuel",
  // Build-to-rent is a delivery model, not a sector filter; Zetland files
  // under multi-residential and its BTR framing lives in the page copy.
  "Build to Rent": "multi-residential",
};
const UNKNOWN_SECTORS = [];

const tierRank = { A: 0, B: 1, C: 2, D: 3 };
const tierOf = (img) => (img.qualityTier || "D").trim()[0];

// ---------- folder 03/04 inputs ----------

/** Output dims written by process-4k.mjs; required for every 4K asset. */
const DIMS_PATH = path.join(HERE, "4k-dims.json");
const dims4k = fs.existsSync(DIMS_PATH)
  ? JSON.parse(fs.readFileSync(DIMS_PATH, "utf8"))
  : null;
function dimsOf(assetId) {
  const d = dims4k?.[assetId];
  if (!d) {
    throw new Error(
      `no processed dimensions for ${assetId} — run: node scripts/process-4k.mjs`,
    );
  }
  return d;
}

/** Minimal quoted-CSV parser (fields are quoted; quotes double-escaped). */
function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (field !== "" || row.length) {
        row.push(field);
        rows.push(row);
        field = "";
        row = [];
      }
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  const header = rows.shift();
  return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

const rightsRegister = parseCsv(
  fs.readFileSync(path.join(FOLDER04_DIR, "SOURCE-RIGHTS-REGISTER.csv"), "utf8"),
);

const decisionsByName = new Map(folder04Decisions.map((d) => [d.outputName, d]));
const usedDecisions = new Set();

/** slug -> { led: [], visible: [], ctx: [] } gallery appends from folder 04. */
const oj4Gallery = new Map();
/** slug -> lead override { assetId, label, keepOldLeadOut } from folder 04. */
const LEAD_OVERRIDES = new Map();
const excluded = [];

function fourKGalleryRow(slug, assetId, caption, { contextOnly, tier }) {
  const d = dimsOf(assetId);
  if (contextOnly && !/^Project context:/.test(caption)) {
    caption = `Project context: ${caption[0].toLowerCase()}${caption.slice(1)}`;
  }
  return {
    assetId,
    src: `/media/projects/${slug}/${assetId}.webp`,
    width: d.width,
    height: d.height,
    orientation:
      d.width > d.height ? "landscape" : d.width === d.height ? "square" : "portrait",
    tier,
    render: false,
    contextOnly,
    caption,
  };
}

for (const row of rightsRegister) {
  if (!row.output_name) continue;
  if (row.job_folder.startsWith("17-ZETLAND")) {
    excluded.push({
      assetId: row.output_name,
      reason: "Zetland Build-to-Rent is not an Allscope project (EXCLUDED_PROJECTS)",
    });
    continue;
  }
  const decision = decisionsByName.get(row.output_name);
  if (!decision) {
    throw new Error(`folder-04 register row has no authored decision: ${row.output_name}`);
  }
  usedDecisions.add(row.output_name);
  const slug = FOLDER04_JOB_SLUGS[row.job_folder];
  if (!slug) throw new Error(`unmapped folder-04 job folder: ${row.job_folder}`);

  if (decision.role === "skip") {
    excluded.push({ assetId: row.output_name, reason: decision.skipReason });
    continue;
  }
  if (decision.role === "lead") {
    LEAD_OVERRIDES.set(slug, {
      assetId: decision.assetId,
      label: decision.label ?? null,
      keepOldLeadOut: Boolean(decision.keepOldLeadOut),
    });
    continue;
  }
  const bucket = oj4Gallery.get(slug) ?? { led: [], visible: [], ctx: [] };
  const contextOnly = row.use_tier === "PROJECT-CONTEXT-ONLY";
  const tier = row.source_class.startsWith("NATIVE") ? "A" : "B";
  const target = contextOnly ? bucket.ctx : row.use_tier === "CONCRETE-LED" ? bucket.led : bucket.visible;
  target.push(fourKGalleryRow(slug, decision.assetId, decision.caption, { contextOnly, tier }));
  oj4Gallery.set(slug, bucket);
}
for (const d of folder04Decisions) {
  if (!usedDecisions.has(d.outputName)) {
    throw new Error(`authored folder-04 decision matches no register row: ${d.outputName}`);
  }
}

/** slug -> owner (folder 03) gallery rows. Owner photos are scope-safe for
 *  their named project; both folders here are register-confirmed HIGH. */
const ownGallery = new Map();
for (const a of folder03ProjectAssets) {
  const d = dimsOf(a.assetId);
  const list = ownGallery.get(a.slug) ?? [];
  list.push({
    assetId: a.assetId,
    src: `/media/projects/${a.slug}/${a.assetId}.webp`,
    width: d.width,
    height: d.height,
    orientation:
      d.width > d.height ? "landscape" : d.width === d.height ? "square" : "portrait",
    tier: "B",
    render: false,
    contextOnly: false,
    caption: a.caption,
  });
  ownGallery.set(a.slug, list);
}

// ---------- library register ----------

/**
 * Editorial gallery order, per the library README's Cadence placement logic:
 * open wide/establishing, then alternate orientation and subject, keep
 * process imagery mid-sequence, close on completed outcomes; context-only
 * culture images come last. (Renders no longer reach this point: the image
 * audit excludes every RENDER_CONTEXT row.)
 */
/**
 * Register descriptions are internal shorthand ("clean planning crop of…",
 * "crane installation linkedin"). Strip internal vocabulary; drop captions
 * that are only shorthand. Public captions must read as editorial text.
 */
function publicCaption(desc) {
  if (!desc) return "";
  let c = desc
    .replace(/clean planning crop of (the )?/gi, "")
    .replace(/\b(linkedin|instagram|screenshot|recovered|supplied)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (!c || c.length < 8) return "";
  c = c[0].toUpperCase() + c.slice(1);
  if (!/[.!?]$/.test(c)) c += ".";
  return c;
}

function orderGallery(images) {
  const docs = images.filter((i) => i.publishStatus !== RENDER && i.publishStatus !== CONTEXT);
  const culture = images.filter((i) => i.publishStatus === CONTEXT);

  const wideFirst = [...docs].sort((a, b) => {
    const aw = a.orientation === "Landscape" ? 0 : 1;
    const bw = b.orientation === "Landscape" ? 0 : 1;
    if (aw !== bw) return aw - bw;
    return tierRank[tierOf(a)] - tierRank[tierOf(b)];
  });

  // Alternate landscape/portrait so the page rhythm never repeats itself.
  const land = wideFirst.filter((i) => i.orientation === "Landscape");
  const port = wideFirst.filter((i) => i.orientation !== "Landscape");
  const seq = [];
  let li = 0;
  let pi = 0;
  let takeLand = true;
  while (li < land.length || pi < port.length) {
    if (takeLand && li < land.length) seq.push(land[li++]);
    else if (pi < port.length) seq.push(port[pi++]);
    else if (li < land.length) seq.push(land[li++]);
    takeLand = !takeLand;
  }
  return [...seq, ...culture];
}

/** Publishable register rows grouped by project. */
const byProject = new Map();
const capability = [];
for (const img of register) {
  if (EXCLUDED_PROJECTS.has(img.projectSlug)) {
    excluded.push({ assetId: img.assetId, reason: "project excluded (not an Allscope job)" });
    continue;
  }
  if (EXCLUDED_ASSETS.has(img.assetId)) {
    excluded.push({ assetId: img.assetId, reason: EXCLUDED_ASSETS.get(img.assetId) });
    continue;
  }
  if (img.publishStatus === HOLD) {
    excluded.push({ assetId: img.assetId, reason: "art-direction hold" });
    continue;
  }
  // The image audit must stay exhaustive: a render row that is not in
  // EXCLUDED_ASSETS is a policy violation, not a publishable image.
  if (img.publishStatus === RENDER) {
    throw new Error(`render row not covered by EXCLUDED_ASSETS: ${img.assetId}`);
  }
  // Register rows whose file never shipped are excluded rather than emitted
  // as broken srcs.
  if (!fs.existsSync(path.join(LIB, img.relativePath))) {
    excluded.push({ assetId: img.assetId, reason: "file not in library" });
    continue;
  }
  if (img.relativePath.includes("99-allscope-social-capability-images")) {
    capability.push(img);
    continue;
  }
  const list = byProject.get(img.projectSlug) ?? [];
  list.push(img);
  byProject.set(img.projectSlug, list);
}

const leadBySlug = new Map(leads.map((l) => [l.projectSlug, l]));

/** Suburb-level location only — never publish full street addresses. */
const projects = plan.map((p) => {
  const override = LEAD_OVERRIDES.get(p.projectSlug);
  const registeredLead = leadBySlug.get(p.projectSlug);
  if (!registeredLead && !override) throw new Error(`no lead for ${p.projectSlug}`);

  // The registered lead already opens the page; keep it out of the gallery.
  // When a folder-04 lead replaces it, the outgoing lead asset flows back
  // into the gallery unless it is the same photograph (keepOldLeadOut).
  const dropIds = new Set();
  if (!override || override.keepOldLeadOut) dropIds.add(p.leadAssetId);

  const imgs = byProject.get(p.projectSlug) ?? [];
  const libraryGallery = orderGallery(imgs)
    .filter((i) => !dropIds.has(i.assetId))
    .map((i) => ({
      assetId: i.assetId,
      src: `/media/projects/${p.projectSlug}/${i.assetId}.webp`,
      width: i.width,
      height: i.height,
      orientation: i.orientation === "Landscape" ? "landscape" : i.orientation?.startsWith("Portrait") ? "portrait" : "square",
      tier: tierOf(i),
      render: i.publishStatus === RENDER,
      contextOnly: i.publishStatus === CONTEXT,
      caption: publicCaption(i.description),
    }));

  // Appends from the 4K folders: exact-project photography first
  // (CONCRETE-LED, then CONCRETE-VISIBLE), owner photography next,
  // PROJECT-CONTEXT-ONLY always last.
  const oj4 = oj4Gallery.get(p.projectSlug) ?? { led: [], visible: [], ctx: [] };
  const own = ownGallery.get(p.projectSlug) ?? [];
  const gallery = [...libraryGallery, ...oj4.led, ...oj4.visible, ...own, ...oj4.ctx];

  const lead = override
    ? {
        assetId: override.assetId,
        label: override.label,
        src: `/media/leads/${override.assetId}.webp`,
        width: dimsOf(override.assetId).width,
        height: dimsOf(override.assetId).height,
        preferredCrop: registeredLead?.preferredCrop || "",
      }
    : {
        assetId: p.leadAssetId,
        label: null,
        src: `/media/leads/${registeredLead.websiteFilename.replace(/\.jpe?g$/i, ".webp")}`,
        width: registeredLead.width,
        height: registeredLead.height,
        preferredCrop: registeredLead.preferredCrop || "",
      };

  const underConstruction = /under construction/i.test(p.status || "");
  return {
    slug: p.projectSlug,
    order: p.order,
    code: p.code,
    name: p.name,
    location: p.location.replace(/, NSW$/, ""),
    sector:
      SECTOR_MAP[p.sector] ??
      (UNKNOWN_SECTORS.push(`${p.projectSlug}: ${p.sector}`), "commercial"),
    team: p.team,
    legacyPage: p.page || null,
    status: underConstruction
      ? p.projectSlug === "auburn-square"
        ? "stage-2-under-construction"
        : "under-construction"
      : "completed",
    statusNote: p.status && p.status !== "Confirmed project" ? p.status : null,
    lead,
    gallery,
  };
});

// Under-construction statuses the brief insists on:
const aub = projects.find((p) => p.slug === "auburn-square");
if (!aub) throw new Error("Auburn Square missing");

const capabilityImages = [
  ...capability.map((i) => ({
    assetId: i.assetId,
    src: `/media/capability/${i.assetId}.webp`,
    width: i.width,
    height: i.height,
    orientation: i.orientation === "Landscape" ? "landscape" : i.orientation?.startsWith("Portrait") ? "portrait" : "square",
    tier: tierOf(i),
    caption: publicCaption(i.description),
    purpose: i.purpose || "",
  })),
  ...folder03CapabilityAssets.map((a) => {
    const d = dimsOf(a.assetId);
    return {
      assetId: a.assetId,
      src: `/media/capability/${a.assetId}.webp`,
      width: d.width,
      height: d.height,
      orientation:
        d.width > d.height ? "landscape" : d.width === d.height ? "square" : "portrait",
      tier: "B",
      caption: a.caption,
      purpose: a.purpose,
    };
  }),
];

// ---------- emit TypeScript ----------
const ts = `/**
 * GENERATED by scripts/build-media-data.mjs from the supplied photo-library
 * manifests (04_MANIFESTS) plus the folder 03/04 4K photo packs (owner
 * photos and exact-project photography, integrated 20 Aug 2026). Do not edit
 * by hand — re-run the generator after a new library drop. Publish rules and
 * context-only constraints are encoded here from the registers; renders/CGI,
 * people-dominant and third-party-branded imagery are excluded at source.
 * Builder photo-use approval + project confirmation recorded 19 Aug 2026;
 * folder 03/04 photo permissions verified (user confirmation 20 Aug 2026).
 */

export type ProjectSector =
  | "industrial"
  | "multi-residential"
  | "mixed-use"
  | "commercial"
  | "hospitality"
  | "education"
  | "retail-fuel";

export type ProjectStatus =
  | "completed"
  | "under-construction"
  | "stage-2-under-construction";

export interface GalleryImage {
  assetId: string;
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait" | "square";
  /** Register quality tier: A hero-capable … D detail/mobile only. */
  tier: "A" | "B" | "C" | "D";
  /** Architectural render — must carry an "Artist's impression" label.
   *  (No published image sets this since the 20 Aug 2026 image audit.) */
  render: boolean;
  /** Context-only: captions must not claim project proof or identify people. */
  contextOnly: boolean;
  caption: string;
}

export interface ProjectRecord {
  slug: string;
  order: number;
  code: string;
  name: string;
  location: string;
  sector: ProjectSector;
  /** Delivery team as recorded in the register (client / builder / architect). */
  team: string;
  legacyPage: string | null;
  status: ProjectStatus;
  statusNote: string | null;
  lead: {
    assetId: string;
    /** Overlay label for the lead (e.g. "Project context"); null for none. */
    label: string | null;
    src: string;
    width: number;
    height: number;
    preferredCrop: string;
  };
  gallery: GalleryImage[];
}

export interface CapabilityImage {
  assetId: string;
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait" | "square";
  tier: "A" | "B" | "C" | "D";
  caption: string;
  purpose: string;
}

export const projectRecords: ProjectRecord[] = ${JSON.stringify(projects, null, 2)};

export const capabilityImages: CapabilityImage[] = ${JSON.stringify(capabilityImages, null, 2)};
`;

fs.mkdirSync(path.join(SITE, "src", "content"), { recursive: true });
fs.writeFileSync(path.join(SITE, "src", "content", "projects-data.gen.ts"), ts, "utf8");

// ---------- emit media job list (library sources only; folder 03/04 masters
// are produced by scripts/process-4k.mjs) ----------
const jobs = [];
for (const l of leads) {
  if (EXCLUDED_PROJECTS.has(l.projectSlug)) continue;
  if (LEAD_OVERRIDES.has(l.projectSlug)) continue; // replaced by a 4K lead
  jobs.push({
    src: path.join(LIB, l.relativePath),
    out: `public/media/leads/${l.websiteFilename.replace(/\.jpe?g$/i, ".webp")}`,
    kind: "lead",
    maxW: 2400,
    quality: 84,
  });
}
for (const [slug, imgs] of byProject) {
  const p = projects.find((x) => x.slug === slug);
  const inGallery = new Set(p ? p.gallery.map((g) => g.assetId) : []);
  for (const i of imgs) {
    if (!inGallery.has(i.assetId)) continue; // e.g. current lead, kept out of gallery
    jobs.push({
      src: path.join(LIB, i.relativePath),
      out: `public/media/projects/${slug}/${i.assetId}.webp`,
      kind: "gallery",
      maxW: 2000,
      quality: 82,
    });
  }
}
for (const i of capability) {
  jobs.push({
    src: path.join(LIB, i.relativePath),
    out: `public/media/capability/${i.assetId}.webp`,
    kind: "capability",
    maxW: 2000,
    quality: 82,
  });
}
fs.writeFileSync(path.join(HERE, "media-jobs.json"), JSON.stringify(jobs, null, 1), "utf8");

if (UNKNOWN_SECTORS.length) throw new Error("Unmapped sectors: " + UNKNOWN_SECTORS.join("; "));
const renderCount = projects.reduce((a, p) => a + p.gallery.filter((g) => g.render).length, 0);
if (renderCount > 0) throw new Error(`render rows escaped the audit: ${renderCount}`);
console.log(`projects: ${projects.length}`);
console.log(`gallery images placed: ${projects.reduce((a, p) => a + p.gallery.length, 0)}`);
console.log(`capability images: ${capabilityImages.length}`);
console.log(`lead overrides (4K photography): ${[...LEAD_OVERRIDES.keys()].join(", ")}`);
console.log(`excluded: ${excluded.length} assets`);
for (const e of excluded) console.log(`  - ${e.assetId}: ${e.reason}`);
console.log(`media jobs (library): ${jobs.length}`);
console.log(`renders published: ${renderCount}`);
for (const p of projects) {
  console.log(
    ` ${String(p.order).padStart(2)} ${p.slug.padEnd(30)} ${p.sector.padEnd(17)} ${String(p.gallery.length).padStart(2)} imgs  ${p.status}`,
  );
}
