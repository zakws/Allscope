import type { MetadataRoute } from "next";
import { projectRecords } from "@/content/projects-data.gen";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/projects",
    "/capabilities",
    "/about",
    "/safety-quality",
    "/careers",
    "/tenders",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/projects" || path === "/tenders" ? 0.9 : 0.6,
  }));

  const projectRoutes = projectRecords.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
