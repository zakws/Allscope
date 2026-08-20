import type { Metadata } from "next";
import { CTABand } from "@/components/cinema/Editorial";
import { ProjectExplorer } from "@/components/cinema/ProjectExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Seventeen concreting projects across Sydney and NSW: multi-residential precincts, an airport departures hall, self-storage, hospitality venues, a public school and service stations.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <div className="container-x pb-12 pt-24 md:pb-16">
        <Reveal>
          <p className="eyebrow">Projects</p>
          <h1 className="display display-tight mt-3 max-w-4xl text-5xl text-ink md:text-7xl">
            The built record
          </h1>
          <p className="measure mt-4 text-lg leading-relaxed text-ink-2">
            Seventeen projects across Sydney and NSW. Each entry lists the
            location, sector and delivery team as recorded, with the photography
            behind it. Filter by sector, or by what&rsquo;s on site now.
            References for any of them are available on request.
          </p>
        </Reveal>
        <div className="mt-8 md:mt-10">
          <ProjectExplorer />
        </div>
      </div>
      <CTABand
        line1="Tendering concrete works?"
        line2="Send the drawings and programme."
        secondary={{ label: "Discuss a project", href: "/contact" }}
      />
    </>
  );
}
