/**
 * Enhanced photo upgrades, 30 Aug 2026: project-page instances of the six
 * enhanced photographs supplied by Zak (see the README in
 * ALLSCOPE-ENHANCED-REPLACEMENTS-2026-08-30, beside the other photo
 * masters). Gallery and feature-slot instances are handled by their own
 * pipelines (gallery-selection.json `replacement` field and the
 * REPLACEMENTS table in process-v2-features.mjs); this module covers
 * gallery rows inside project records.
 *
 * Each entry swaps one existing gallery row's pixels for the enhanced
 * file under a new asset id, keeping the row's caption, tier and position.
 * install-photo-upgrades-2026-08-30.mjs copies the files and probes dims.
 */

export const UPGRADES_DIR =
  "C:/Users/zakar/OneDrive/Desktop/Allscope website/ALLSCOPE-ENHANCED-REPLACEMENTS-2026-08-30";

export const photoUpgrades = [
  {
    slug: "oran-park-public-school",
    // Same twilight amphitheatre photograph; the folder-04 master behind
    // OJ4-OPS-02 was soft, the enhanced copy is clean.
    replaceAssetId: "OJ4-OPS-02",
    newAssetId: "UP-OPS-02",
    file: "PHOTO-2026-07-29-20-58-23_ENHANCED.webp",
  },
];
