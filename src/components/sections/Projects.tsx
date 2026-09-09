import Section from "@/components/ui/Section";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/Button";
import { projects } from "@/data/projects";

// Four, not three: the grid is 2-up at one shared container width, so an odd
// count would leave a hole.
const featuredProjects = projects.slice(0, 4);

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
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
        <div className="mt-12">
          <Button
            href="/projects"
            label="All projects"
            color="outline"
            iconPosition="right"
            icon={<span aria-hidden="true">→</span>}
          />
        </div>
      )}
    </Section>
  );
}
