"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import Button from "./Button";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = Boolean(project.image);

  return (
    <div className="gradient-border group flex flex-col rounded-xl border p-6 transition-all duration-300">
      <div className="mb-4 h-48 w-full overflow-hidden rounded-lg border border-[var(--border)]/60 bg-[color-mix(in_oklab,var(--muted),black_10%)]">
        {hasImage ? (
          <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105">
            <Image
              src={project.image as string}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        )}
      </div>

      <h3 className="text-foreground mb-2 text-xl font-semibold">
        {project.name}
      </h3>
      <p className="text-foreground/70 mb-3 text-sm">{project.subheading}</p>
      <p className="text-foreground/80 mb-4 line-clamp-3 text-sm">
        {project.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-foreground/80 border-border/30 rounded border bg-[color-mix(in_oklab,var(--background),white_6%)] px-2 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          href={`/projects/${project.id}`}
          label="View Project"
          iconPosition="right"
          icon={
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}
