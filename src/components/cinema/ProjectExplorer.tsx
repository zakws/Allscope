"use client";

import { useMemo, useState } from "react";
import { ProjectCard, sectorLabel } from "./ProjectMedia";
import { projectRecords } from "@/content/projects-data.gen";
import type { ProjectRecord } from "@/content/projects-data.gen";
import { track } from "@/lib/analytics";

type Sector = ProjectRecord["sector"];
type Filter = "all" | Sector | "under-construction";

/**
 * Client-side project index. One row of filter chips — the seven sectors plus
 * an under-construction status facet — over a uniform editorial grid. Counts
 * are computed from the record set, never hard-coded; every chip carries an
 * aria-pressed state. No carousel: the grid shows every match at once.
 */

const SECTOR_ORDER: Sector[] = [
  "multi-residential",
  "commercial",
  "mixed-use",
  "industrial",
  "hospitality",
  "education",
  "retail-fuel",
];

const ordered = [...projectRecords].sort((a, b) => a.order - b.order);

function isUnderConstruction(p: ProjectRecord): boolean {
  return p.status !== "completed";
}

function matches(p: ProjectRecord, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "under-construction") return isUnderConstruction(p);
  return p.sector === filter;
}

export function ProjectExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const chips = useMemo(() => {
    const sectorChips = SECTOR_ORDER.map((s) => ({
      id: s as Filter,
      label: sectorLabel(s),
      count: ordered.filter((p) => p.sector === s).length,
    })).filter((c) => c.count > 0);
    return [
      { id: "all" as Filter, label: "All", count: ordered.length },
      ...sectorChips,
      {
        id: "under-construction" as Filter,
        label: "Under construction",
        count: ordered.filter(isUnderConstruction).length,
      },
    ];
  }, []);

  const filtered = ordered.filter((p) => matches(p, filter));

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                const nextFilter: Filter = active && c.id !== "all" ? "all" : c.id;
                setFilter(nextFilter);
                if (nextFilter !== "all") track("project_filter", { filter: nextFilter });
              }}
              className={`tech-label min-h-[44px] border px-4 py-2 transition-colors ${
                active
                  ? "border-red-350 bg-red/10 text-red-350"
                  : "border-line-600 text-ink-2 hover:border-concrete-400 hover:text-ink"
              }`}
            >
              {c.label}{" "}
              <span className={active ? "text-red-350/80" : "text-ink-3"}>({c.count})</span>
            </button>
          );
        })}
      </div>

      <p className="tech-label mt-5 text-ink-3" aria-live="polite">
        {filtered.length} of {ordered.length} projects
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} headingLevel="h2" priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
