import { projects } from "@/data/projects";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Fasil Valiyattil",
  description: "Explore the portfolio projects of Fasil Valiyattil...",
  keywords: ["projects", "portfolio projects", "full-stack"],
  openGraph: {
    title: "Fasil Valiyattil Projects",
    description: "A showcase of web development projects...",
    url: "https://fasilv.in/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="gradient-text mb-4 text-5xl font-bold">
            All Projects
          </h1>
          <p className="text-foreground/80 mx-auto max-w-2xl text-xl">
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
