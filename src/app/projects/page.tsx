import { projects } from '@/data/projects';
import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
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
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-4">All Projects</h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            A comprehensive showcase of my work, featuring full-stack applications, 
            innovative solutions, and cutting-edge technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button href="/" label="Back to Home" color="outline" iconPosition="left" icon={(
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          )} />
        </div>
      </div>
    </main>
  );
}