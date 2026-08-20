import type { NextConfig } from "next";

/**
 * Redirect map preserves equity from the current allscopeconcrete.com.au URLs
 * (12 project pages + services/FAQ/OHS) once the domain points at this site.
 * Every legacy project URL now has a dedicated page in the register; any
 * future source without one should fall back to /projects.
 */
const legacyRedirects = [
  { source: "/sydney-international-airport", destination: "/projects/sydney-international-airport" },
  { source: "/oran-park-hotel", destination: "/projects/oran-park-hotel" },
  { source: "/ed-square", destination: "/projects/ed-square" },
  { source: "/babylon", destination: "/projects/babylon" },
  { source: "/auburn-square", destination: "/projects/auburn-square" },
  { source: "/industrial-2/industrial-projects", destination: "/projects/kennards-macquarie-park" },
  { source: "/asha-westmead", destination: "/projects/asha-westmead" },
  { source: "/one-the-waterfront", destination: "/projects/one-the-waterfront" },
  { source: "/one-the-waterfront-parkside", destination: "/projects/one-the-waterfront-parkside" },
  { source: "/one-the-waterfront-parkside-copy", destination: "/projects/one-the-waterfront-parkside" },
  { source: "/view-rockdale", destination: "/projects/view-rockdale" },
  { source: "/bay-pavilion-lane-cove", destination: "/projects/bay-pavilions-lane-cove" },
  { source: "/services", destination: "/capabilities" },
  { source: "/faq", destination: "/capabilities" },
  { source: "/o-h-s", destination: "/safety-quality" },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Tender uploads: 10 files ≤ 25 MB each, 100 MB per submission,
      // plus multipart overhead. Production should move large files to
      // signed direct-to-storage uploads (see docs/INTEGRATIONS.md).
      bodySizeLimit: "120mb",
    },
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
