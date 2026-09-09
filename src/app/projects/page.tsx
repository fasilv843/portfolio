import { projects } from "@/data/projects";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
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
    <main id="main" className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="gradient-text mb-4 text-5xl font-bold">
            All Projects
          </h1>
          <p className="text-foreground-muted mx-auto max-w-2xl text-xl">
            A comprehensive showcase of my work, featuring full-stack
            applications, innovative solutions, and cutting-edge technologies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
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
    </main>
  );
}
