/**
 * Targeted production content update, 26 Aug 2026 — from the handover folder
 * "Allscope-Website-Project-Update-2026-08-26" (fact and rights register:
 * 02-PROJECT-FACTS-AND-PHOTO-RIGHTS.md).
 *
 * RIGHTS GATE: the only publication-cleared asset in the handover is the
 * owner-supplied Oran Park render. Every REFERENCE image (Kuatro, school,
 * Bunnings directory, Woodburn exterior, Versatile progress, venue interiors)
 * stays STAGED in the handover folder until reuse permission is confirmed;
 * the three new projects therefore launch with text-led presentation, never
 * a substituted photograph from another job.
 */

/** Oran Park Hotel correction (existing slug preserved). */
export const oranParkCorrection = {
  slug: "oran-park-hotel",
  // Owner-supplied corrected render: the previous lead (OJ4-OPH-01) showed a
  // different building and is removed everywhere. Native 2:1 kept so the
  // hotel name on the facade is never cropped away.
  lead: {
    assetId: "OWNER-OPH-RENDER",
    label: "Artist's impression",
    src: "/media/leads/oran-park-hotel-owner-render.webp",
    width: 2048,
    height: 1024,
    preferredCrop: "native 2:1; do not crop the hotel name",
  },
  // The off-form sign-wall photo cannot be verified as 81 Central Avenue;
  // staged pending confirmation, so the gallery ships empty.
  gallery: [],
  overview:
    "Allscope Concrete completed concrete works for Versatile Construction on Oran Park Hotel, a three-level hospitality and entertainment precinct at 81 Central Avenue, Oran Park. Construction began in November 2021 and the venue is now open. The 7,500 square metre venue brings together dining, entertainment and event spaces across three levels. Allscope's role was the concrete works package for Versatile Construction.",
  team: "Momento Hospitality / Versatile Construction / Archebiosis Architects",
};

/**
 * Three new project records. Text-led (lead: null) until image rights clear.
 * Copy is the approved wording from the fact register, verbatim.
 */
export const newProjects = [
  {
    slug: "chalmers-hotel-mascot",
    order: 0, // first among current projects on the index
    code: "CHM",
    name: "Chalmers Hotel, Mascot",
    location: "Mascot",
    sector: "hospitality",
    team: "Kuatro Build",
    legacyPage: null,
    status: "under-construction",
    statusNote: "Currently under construction with Kuatro Build",
    lead: null,
    gallery: [],
    overview:
      "Allscope Concrete is currently delivering concrete works at Chalmers Hotel in Mascot for Kuatro Build. The 12-storey development at 2 Chalmers Crescent is planned to include 144 guest rooms and supporting hospitality facilities.",
  },
  {
    slug: "bunnings-rose-bay",
    order: 17,
    code: "BRB",
    name: "Bunnings Rose Bay",
    location: "Rose Bay",
    sector: "retail-fuel",
    team: "Delivery team not recorded",
    legacyPage: null,
    status: "completed",
    statusNote: null,
    lead: null,
    gallery: [],
    overview:
      "Allscope Concrete delivered concrete works for the Bunnings store at 538-544 Old South Head Road, Rose Bay.",
  },
  {
    slug: "al-noori-muslim-school",
    order: 18,
    code: "ANS",
    name: "Al Noori Muslim School",
    location: "Greenacre",
    sector: "education",
    team: "Delivery team not recorded",
    legacyPage: null,
    status: "completed",
    statusNote: null,
    lead: null,
    gallery: [],
    overview:
      "Allscope Concrete delivered concrete works at Al Noori Muslim School in Greenacre.",
  },
];
