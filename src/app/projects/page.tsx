import { projects } from "@/data/projects";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import Ground from "@/components/ui/Ground";
import type { Metadata } from "next";
import { SITE_NAME, TWITTER_HANDLE, url } from "@/lib/site";

const DESCRIPTION =
  "Full-stack projects by Fasil Valiyattil — movie booking, fintech and microservice applications built with Angular, React, Node.js, NestJS, MongoDB and AWS.";

export const metadata: Metadata = {
  // Root layout's template appends "| Fasil Valiyattil".
  title: "Projects",
  description: DESCRIPTION,
  keywords: ["projects", "portfolio projects", "full-stack"],
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description: DESCRIPTION,
    url: url("/projects"),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="min-h-screen">
      {/* Same ground as the Projects section on the home page, so arriving here
          from "View all" is a continuation rather than a new surface. */}
      <Ground pattern="graph">
        <div className="mx-auto w-full max-w-5xl px-6 py-28 md:py-36">
          {/* ground-halo: this heading and lead sit straight on the lanes, with
              no card between. The cards below need nothing — they are opaque. */}
          <div className="ground-halo mb-20">
            <h1 className="font-display text-display text-foreground text-balance">
              All Projects
            </h1>
            <p className="text-foreground-muted text-lead mt-6 max-w-[68ch] text-pretty">
              A comprehensive showcase of my work, featuring full-stack
              applications, innovative solutions, and cutting-edge technologies.
            </p>
          </div>

          <div data-reveal-group className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              // h2: these sit directly under the page h1, with no h2 between.
              <ProjectCard
                key={project.id}
                project={project}
                headingLevel="h2"
              />
            ))}
          </div>

          <div className="mt-20">
            <Button
              href="/"
              label="Back to Home"
              color="outline"
              iconPosition="left"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </Ground>

      <Footer />
    </main>
  );
}
