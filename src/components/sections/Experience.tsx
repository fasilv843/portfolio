import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" index="04" title="Work Experience">
      <div className="relative">
        {/* The rail. Stops at the last dot rather than running to the bottom
            edge, which used to leave a stub hanging below the final entry. */}
        <div
          className="bg-border absolute top-2 bottom-2 left-0 w-px"
          aria-hidden="true"
        />

        <ol data-reveal-group className="space-y-20">
          {experiences.map((exp) => (
            <li key={exp.id} className="relative pl-8 md:pl-12">
              <span
                className="border-background bg-primary absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2"
                aria-hidden="true"
              />

              <p className="text-foreground-faint font-mono text-xs tracking-[0.15em] uppercase">
                {exp.duration}
                <span aria-hidden="true"> · </span>
                {exp.location}
              </p>

              <h3 className="font-display text-foreground mt-3 text-2xl md:text-3xl">
                {exp.role}
              </h3>
              <p className="text-primary mt-1 text-sm">{exp.company}</p>

              {exp.description && (
                <p className="text-foreground-muted mt-5 max-w-[68ch] text-pretty">
                  {exp.description}
                </p>
              )}

              {exp.achievements && (
                <div className="mt-8">
                  <h4 className="text-foreground-faint font-mono text-xs tracking-[0.15em] uppercase">
                    Key Achievements
                  </h4>
                  <ul className="text-foreground-muted mt-3 max-w-[68ch] list-disc space-y-2 pl-5">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <h4 className="text-foreground-faint font-mono text-xs tracking-[0.15em] uppercase">
                  Projects
                </h4>
                {/* Hairline-separated rows, not nested cards — a card inside a
                    card inside a rail was three borders deep. */}
                <ul className="divide-border border-border mt-3 divide-y border-t">
                  {exp.projects.map((project) => (
                    <li key={project.name} className="py-5">
                      <h5 className="text-foreground font-medium">
                        {project.name}
                      </h5>
                      <p className="text-foreground-muted mt-1.5 max-w-[68ch] text-sm text-pretty">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
