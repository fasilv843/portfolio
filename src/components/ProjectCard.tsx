"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import Button from "./Button";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = Boolean(project.image);

  return (
    <div className="rounded-xl p-6 border gradient-border transition-all duration-300 group flex flex-col">
      <div className="w-full h-48 rounded-lg mb-4 overflow-hidden border border-[var(--border)]/60 bg-[color-mix(in_oklab,var(--muted),black_10%)]">
        {hasImage ? (
          <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
            <Image src={project.image as string} alt={project.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{project.name}</h3>
      <p className="text-sm text-foreground/70 mb-3">{project.subheading}</p>
      <p className="text-foreground/80 text-sm mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="px-2 py-1 bg-[color-mix(in_oklab,var(--background),white_6%)] text-foreground/80 text-xs rounded border border-border/30">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          href={`/projects/${project.id}`}
          label="View Project"
          iconPosition="right"
          icon={(
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        />
      </div>
    </div>
  );
}


