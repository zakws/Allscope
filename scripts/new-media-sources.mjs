/**
 * Authored source tables for the 4K photo integration (20 Aug 2026).
 *
 * Two libraries live one level above the site folder and are never served:
 *   03-ALLSCOPE-OWNER-PHOTOS-ENHANCED-4K   — owner-supplied photos, enhanced
 *     to 3840px masters (faithful restorations, no generative edits).
 *   04-ALLSCOPE-ONLINE-ACTUAL-JOBS-4K      — 30 exact-project photographs,
 *     graded CONCRETE-LED / CONCRETE-VISIBLE / PROJECT-CONTEXT-ONLY in
 *     SOURCE-RIGHTS-REGISTER.csv (parsed by build-media-data.mjs).
 *
 * Permission status for every asset listed here: verified (user confirmation
 * 20 Aug 2026). Folder 17-ZETLAND is excluded — the project is not
 * Allscope's — and is never read by the pipeline.
 *
 * Every caption below is published verbatim. PROJECT-CONTEXT-ONLY captions
 * must start with "Project context:" and must not claim the pictured
 * element as Allscope concrete work.
 *
 * Consumed by scripts/process-4k.mjs (conversion + dims manifest) and
 * scripts/build-media-data.mjs (data emission).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..");

export const FOLDER04_DIR = path.resolve(SITE, "..", "04-ALLSCOPE-ONLINE-ACTUAL-JOBS-4K");
export const FOLDER03_DIR = path.resolve(SITE, "..", "03-ALLSCOPE-OWNER-PHOTOS-ENHANCED-4K");

/** Map from the folder-04 job folder names to the site's project slugs. */
export const FOLDER04_JOB_SLUGS = {
  "01-KENNARDS-SELF-STORAGE-MACQUARIE-PARK": "kennards-macquarie-park",
  "02-ED-SQUARE-ARLINGTON-AND-CLIFTON": "ed-square",
  "03-BABYLON-ROUSE-HILL": "babylon",
  "04-AUBURN-SQUARE-STAGES-1-AND-2": "auburn-square",
  "05-SYDNEY-INTERNATIONAL-AIRPORT-T1-DEPARTURES": "sydney-international-airport",
  "06-ORAN-PARK-HOTEL": "oran-park-hotel",
  "07-ASHA-WESTMEAD": "asha-westmead",
  "08-ONE-THE-WATERFRONT-WENTWORTH-POINT": "one-the-waterfront",
  "09-ONE-THE-WATERFRONT-PARKSIDE": "one-the-waterfront-parkside",
  "10-VIEW-ROCKDALE": "view-rockdale",
  "11-BAY-PAVILIONS-LANE-COVE": "bay-pavilions-lane-cove",
  "12-TWENTY95-MANLY": "twenty95-manly",
  "13-ORAN-PARK-PUBLIC-SCHOOL": "oran-park-public-school",
  "14-BP-PRESTONS-SERVICE-STATION-AND-TRUCK-STOP": "bp-prestons",
  "15-EL-JANNAH-PRESTONS": "el-jannah-prestons",
  "16-BP-OBERON": "bp-oberon",
  // 17-ZETLAND-BUILD-TO-RENT: excluded — not an Allscope project.
};

/**
 * One authored decision per folder-04 register row (Zetland rows excepted —
 * they are excluded wholesale). role:
 *   "lead"    — becomes the project lead (processed at 2400px into /media/leads)
 *   "gallery" — appended to the project gallery (2000px)
 *   "skip"    — not placed; skipReason is recorded in the integration register
 * keepOldLeadOut (leads only): the register lead this one replaces is the
 * same photograph, so it must stay out of the gallery too.
 */
export const folder04Decisions = [
  // 01 — Kennards Self Storage, Macquarie Park
  {
    outputName: "ASC-KENNARDS-01-CONCRETE-CORRIDOR-NATIVE-4K.jpg",
    role: "skip",
    skipReason: "duplicate of ASC-KMP-008, already in the Kennards gallery",
  },
  {
    outputName: "ASC-KENNARDS-02-CONCRETE-STORAGE-FLOOR-NATIVE-4K.jpg",
    role: "skip",
    skipReason: "duplicate of ASC-KMP-009, already in the Kennards gallery",
  },
  {
    outputName: "ASC-KENNARDS-03-EXPOSED-STRUCTURE-NATIVE-4K.jpg",
    assetId: "OJ4-KMP-03",
    role: "lead",
    // Same photograph as the outgoing lead (ASC-KMP-011), supplied here as a
    // native-4K master; the old lead must not resurface in the gallery.
    keepOldLeadOut: true,
  },

  // 02 — Ed.Square, Arlington and Clifton
  {
    outputName: "ASC-ED-SQUARE-02-ROOFTOP-HARDSCAPE-4K-ENHANCED.jpg",
    assetId: "OJ4-EDS-01",
    role: "gallery",
    caption: "Rooftop hardscape across the completed podium at Ed.Square.",
  },
  {
    outputName: "ASC-ED-SQUARE-03-COURTYARD-HARDSCAPE-4K-ENHANCED.jpg",
    assetId: "OJ4-EDS-02",
    role: "gallery",
    caption: "Courtyard walkway, paving and planter edges at Ed.Square.",
  },

  // 03 — Babylon, Rouse Hill
  {
    outputName: "ASC-BABYLON-01-CONCRETE-SEAT-AND-WALKWAY-4K-ENHANCED.jpg",
    assetId: "OJ4-BAB-01",
    role: "lead",
  },
  {
    outputName: "ASC-BABYLON-02-COURTYARD-HARDSCAPE-4K-ENHANCED.jpg",
    assetId: "OJ4-BAB-02",
    role: "gallery",
    caption: "Courtyard hardscape and planter faces in the completed courtyard.",
  },
  {
    outputName: "ASC-BABYLON-03-COURTYARD-STRUCTURE-4K-ENHANCED.jpg",
    assetId: "OJ4-BAB-03",
    role: "gallery",
    caption: "The wider courtyard, its slab and planter edges at Babylon.",
  },

  // 04 — Auburn Square, Stage 1
  {
    outputName: "ASC-AUBURN-STAGE1-01-COURTYARD-HARDSCAPE-4K-ENHANCED.jpg",
    assetId: "OJ4-AUB-01",
    role: "gallery",
    caption: "Stage 1 courtyard hardscape at Auburn Square.",
  },

  // 05 — Sydney International Airport T1 Departures
  {
    outputName: "ASC-SYDNEY-AIRPORT-01-EXACT-PROJECT-CONTEXT-4K-ENHANCED-CROPPED.jpg",
    assetId: "OJ4-SYD-01",
    role: "gallery",
    caption: "Project context: the completed T1 departures concourse.",
  },

  // 06 — Oran Park Hotel
  {
    outputName: "ASC-ORAN-PARK-HOTEL-01-CONCRETE-FACADE-NATIVE-4K.jpg",
    assetId: "OJ4-OPH-01",
    role: "lead",
  },
  {
    outputName: "ASC-ORAN-PARK-HOTEL-02-CONCRETE-SIGN-WALL-NATIVE-4K-CROPPED.jpg",
    assetId: "OJ4-OPH-02",
    role: "gallery",
    caption: "The off-form concrete sign wall at the hotel entry.",
  },

  // 07 — Asha, Westmead
  {
    outputName: "ASC-ASHA-01-ROOFTOP-HARDSCAPE-4K-ENHANCED.jpg",
    assetId: "OJ4-ASH-01",
    role: "gallery",
    caption: "Rooftop hardscape and low planter walls on the finished rooftop.",
  },
  {
    outputName: "ASC-ASHA-02-FINISHED-FACADE-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-ASH-02",
    role: "gallery",
    caption: "Project context: the finished building from the street.",
  },

  // 08 — One The Waterfront, Wentworth Point
  {
    outputName: "ASC-ONE-WATERFRONT-01-FINISHED-PROJECT-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-OTW-01",
    role: "gallery",
    caption: "Project context: the completed development at Wentworth Point.",
  },
  {
    outputName: "ASC-ONE-WATERFRONT-02-STAGE2-AERIAL-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-OTW-02",
    role: "gallery",
    caption: "Project context: Stage 2 of the development from the air.",
  },

  // 10 — VIEW, Rockdale
  {
    outputName: "ASC-VIEW-ROCKDALE-01-COURTYARD-FINISH-4K-ENHANCED.jpg",
    assetId: "OJ4-VRK-01",
    role: "gallery",
    caption: "Courtyard and hardscape detail from above at VIEW.",
  },
  {
    outputName: "ASC-VIEW-ROCKDALE-02-FINISHED-PROJECT-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-VRK-02",
    role: "gallery",
    caption: "Project context: the completed building in Rockdale.",
  },

  // 11 — Bay Pavilions, Lane Cove
  {
    outputName: "ASC-BAY-PAVILIONS-01-FINISHED-PROJECT-CONTEXT-4K-ENHANCED.jpg",
    role: "skip",
    skipReason:
      "completed-exterior context; the gallery already carries nine exact-project exterior photographs of the same subject",
  },
  {
    outputName: "ASC-BAY-PAVILIONS-02-FINISHED-PROJECT-CONTEXT-4K-ENHANCED.jpg",
    role: "skip",
    skipReason:
      "completed-exterior context; redundant beside the existing exact-project exterior photography",
  },
  {
    outputName: "ASC-BAY-PAVILIONS-03-PROJECT-SIGN-WALL-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-BPL-01",
    role: "gallery",
    caption: "Project context: the project sign wall at the entry.",
  },

  // 12 — Twenty95, Manly. A real photograph replacing a render lead; it is
  // facade context, so it carries a "Project context" label, not a render label.
  {
    outputName: "ASC-TWENTY95-01-STREET-FACADE-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-T95-01",
    role: "lead",
    label: "Project context",
  },

  // 13 — Oran Park Public School
  {
    outputName: "ASC-ORAN-SCHOOL-01-CONCRETE-PIAZZA-4K-ENHANCED.jpg",
    assetId: "OJ4-OPS-01",
    role: "lead",
  },
  {
    outputName: "ASC-ORAN-SCHOOL-02-CONCRETE-AMPHITHEATRE-4K-ENHANCED.jpg",
    assetId: "OJ4-OPS-02",
    role: "gallery",
    caption: "The concrete amphitheatre and piazza at dusk.",
  },

  // 14 — BP Prestons Service Station and Truck Stop (14 Bernera Road site)
  {
    outputName: "ASC-BP-PRESTONS-02-TRUCK-FORECOURT-4K-ENHANCED.jpg",
    assetId: "OJ4-BPP-01",
    role: "gallery",
    caption: "The truck refuelling slab and forecourt under the canopy.",
  },
  {
    outputName: "ASC-BP-PRESTONS-03-DRIVEWAY-FORECOURT-4K-ENHANCED.jpg",
    assetId: "OJ4-BPP-02",
    role: "gallery",
    caption: "Finished driveway and forecourt concrete across the site.",
  },

  // 15 — El Jannah, Prestons (5 Yato Road restaurant; separate from the BP site)
  {
    outputName: "ASC-EL-JANNAH-PRESTONS-01-ENTRY-FACADE-CONTEXT-4K-ENHANCED.jpg",
    assetId: "OJ4-EJP-01",
    role: "gallery",
    caption: "Project context: the completed restaurant entry at Prestons.",
  },
  {
    outputName: "ASC-EL-JANNAH-PRESTONS-02-FORECOURT-PATH-4K-ENHANCED.jpg",
    assetId: "OJ4-EJP-02",
    role: "gallery",
    caption: "Forecourt paths and kerbs around the restaurant.",
  },

  // 16 — BP Oberon
  {
    outputName: "ASC-BP-OBERON-01-CONCRETE-FORECOURT-4K-ENHANCED-CROPPED.jpg",
    assetId: "OJ4-BPO-01",
    role: "gallery",
    caption: "The entry and concrete forecourt at BP Oberon.",
  },
];

/**
 * Owner photos (folder 03) placed into the two project galleries their
 * subfolders name. Owner photos are scope-safe for their named project.
 * Paths are relative to FOLDER03_DIR.
 */
export const folder03ProjectAssets = [
  // 05 — Sydney International Airport T1 Departures (3 in folder; 2 placed)
  {
    file: "05-SYDNEY-INTERNATIONAL-AIRPORT-T1-DEPARTURES/ASC-OWNER-1-PHOTO-2026-07-29-18-22-59.jpg",
    assetId: "OWN-SYD-01",
    slug: "sydney-international-airport",
    caption: "The pump line, run through the live terminal during night works.",
  },
  {
    file: "05-SYDNEY-INTERNATIONAL-AIRPORT-T1-DEPARTURES/ASC-OWNER-2-PHOTO-2026-07-29-18-23-05(1).jpg",
    assetId: "OWN-SYD-02",
    slug: "sydney-international-airport",
    caption: "Trench reinforcement and substrate works inside the terminal.",
  },

  // 13 — Oran Park Public School (42 in folder; 6 placed, curated hard)
  {
    file: "13-ORAN-PARK-PUBLIC-SCHOOL/ASC-OWNER-72-PHOTO-2026-07-29-18-33-26(1).jpg",
    assetId: "OWN-OPS-01",
    slug: "oran-park-public-school",
    caption: "Fresh path panels, swirl and broom finishes still between the forms.",
  },
  {
    file: "13-ORAN-PARK-PUBLIC-SCHOOL/ASC-OWNER-85-PHOTO-2026-07-29-18-33-40.jpg",
    assetId: "OWN-OPS-02",
    slug: "oran-park-public-school",
    caption: "Mesh down and the pump line in ahead of an external slab pour.",
  },
  {
    file: "13-ORAN-PARK-PUBLIC-SCHOOL/ASC-OWNER-101-PHOTO-2026-07-29-18-33-41(23).jpg",
    assetId: "OWN-OPS-03",
    slug: "oran-park-public-school",
    caption: "Edge reinforcement and conduits set out along the wall line.",
  },
  {
    file: "13-ORAN-PARK-PUBLIC-SCHOOL/ASC-OWNER-128-PHOTO-2026-07-29-20-56-24.jpg",
    assetId: "OWN-OPS-04",
    slug: "oran-park-public-school",
    caption: "Exposed-aggregate finish up close.",
  },
  {
    file: "13-ORAN-PARK-PUBLIC-SCHOOL/ASC-OWNER-130-PHOTO-2026-07-29-20-56-25(2).jpg",
    assetId: "OWN-OPS-05",
    slug: "oran-park-public-school",
    caption: "Placing and finishing a slab across the campus.",
  },
  {
    file: "13-ORAN-PARK-PUBLIC-SCHOOL/ASC-OWNER-89-PHOTO-2026-07-29-18-33-41(12).jpg",
    assetId: "OWN-OPS-06",
    slug: "oran-park-public-school",
    caption: "Reinforcement and formwork ahead of a deck pour.",
  },
];

/**
 * Owner capability photos (folder 03, 98-GENERAL — deliberately not
 * job-specific). Concrete-led selections only; placed on the capability
 * surfaces (capabilities rows, safety, about, tenders, homepage band).
 */
export const folder03CapabilityAssets = [
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/01-PLACEMENT-AND-FRESH-POURS/ASC-OWNER-146-PHOTO-2026-07-29-20-56-53(1).jpg",
    assetId: "OWN-CAP-146",
    caption: "Placing a suspended slab from the boom, seen from above.",
    purpose: "Pumping and placement",
  },
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/01-PLACEMENT-AND-FRESH-POURS/ASC-OWNER-149-PHOTO-2026-07-29-20-56-53.jpg",
    assetId: "OWN-CAP-149",
    caption: "A wide raft pour under way, screeding behind the hose.",
    purpose: "Pour supervision",
  },
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/04-REINFORCEMENT-AND-PREPOUR/ASC-OWNER-152-PHOTO-2026-07-29-20-56-54.jpg",
    assetId: "OWN-CAP-152",
    caption: "Mesh, membrane and starter bars checked on pour day.",
    purpose: "Pre-pour readiness",
  },
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/03-FINISHED-SLABS-AND-FLOORS/ASC-OWNER-166-PHOTO-2026-07-29-20-58-10(1).jpg",
    assetId: "OWN-CAP-166",
    caption: "A freshly floated basement slab.",
    purpose: "Finished slabs",
  },
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/01-PLACEMENT-AND-FRESH-POURS/ASC-OWNER-169-PHOTO-2026-07-29-20-58-10.jpg",
    assetId: "OWN-CAP-169",
    caption: "Machine finishing under way while the pour continues.",
    purpose: "Finishing",
  },
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/05-EXTERNAL-CONCRETE-WORKS/ASC-OWNER-197-PHOTO-2026-07-29-20-58-18(2).jpg",
    assetId: "OWN-CAP-197",
    caption: "A finished charcoal driveway with a contrast border band.",
    purpose: "External works",
  },
  {
    file: "98-GENERAL-ALLSCOPE-CAPABILITY/01-PLACEMENT-AND-FRESH-POURS/ASC-OWNER-215-PHOTO-2026-07-29-20-58-22.jpg",
    assetId: "OWN-CAP-215",
    caption: "A fresh deck poured and finished, starter bars ready for the next lift.",
    purpose: "Wide band",
  },
];
