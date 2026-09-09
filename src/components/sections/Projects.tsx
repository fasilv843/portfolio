import Link from "next/link";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

// Four, not three: the grid is 2-up at one shared container width, so an odd
// count would leave a hole.
const featuredProjects = projects.slice(0, 4);

export default function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      title="Featured Projects"
      lead="A few things I've built end to end, from schema to deploy."
    >
      {/* Group rather than per-card: each child gets its own view() timeline,
          so they stagger naturally as the grid scrolls past. */}
      <div data-reveal-group className="grid gap-8 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {projects.length > featuredProjects.length && (
        // Same hairline-rule-then-link shape as a ProjectCard footer, so the
        // grid closes the way each card in it does.
        <div className="border-border mt-12 flex justify-end border-t pt-6">
          <Link
            href="/projects"
            className="text-primary focus-visible:outline-ring inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </Section>
  );
}
