import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import Tag from "./ui/Tag";

// No "use client" — this has no state, no handlers and no hooks. It was only a
// client component because it imported Button, which used to carry the directive.

type ProjectCardProps = {
  project: Project;
  /**
   * On the home page these cards sit under the "Featured Projects" h2, so h3 is
   * right. On /projects they sit directly under the h1 with no h2 between, and
   * hardcoding h3 there skipped a level.
   */
  headingLevel?: "h2" | "h3";
};

export default function ProjectCard({
  project,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const hasImage = Boolean(project.image);

  return (
    <article className="border-border bg-surface hover:border-border-strong group relative flex flex-col rounded-lg border transition duration-200">
      <div className="border-border bg-surface-sunken h-52 w-full overflow-hidden rounded-t-lg border-b">
        {hasImage ? (
          <div className="relative h-full w-full">
            <Image
              src={project.image as string}
              alt=""
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          // No screenshots exist yet — every `image:` in projects.ts is
          // commented out. Placeholder stays type-based rather than an emoji.
          <div
            className="text-foreground-faint font-display flex h-full w-full items-center justify-center text-5xl"
            aria-hidden="true"
          >
            {project.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="font-display text-foreground text-2xl">
          {/* Stretched link: the whole card is the target, but only the title
              is in the tab order, so keyboard users get one stop, not three. */}
          <Link
            href={`/projects/${project.id}`}
            className="focus-visible:outline-ring rounded-sm before:absolute before:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {project.name}
          </Link>
        </Heading>
        <p className="text-foreground-faint mt-1 font-mono text-xs tracking-wide">
          {project.subheading}
        </p>
        <p className="text-foreground-muted mt-4 line-clamp-3 text-sm text-pretty">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        {(project.liveLink || project.sourceCode) && (
          // Surfaced on the card itself (5.7). z-10 lifts these above the
          // stretched title link so they stay independently clickable.
          <div className="border-border relative z-10 mt-auto flex gap-5 border-t pt-5">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary focus-visible:outline-ring text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Live site
                <span className="sr-only"> for {project.name}</span> ↗
              </a>
            )}
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-foreground focus-visible:outline-ring text-sm underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Source
                <span className="sr-only"> for {project.name}</span> ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
