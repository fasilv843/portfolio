import Disclosure from "@/components/ui/Disclosure";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" index="03" title="Work Experience">
      <div className="relative">
        {/* The rail. -translate-x-1/2 puts the 1px stroke's centre on x=0,
            where the dots are centred — at left-0 alone it sat on 0.5px and
            every dot read as half a pixel off the line. The gradient holds the
            border token through the middle and fades over the last 1.5rem at
            each end, so the terminals stop softly instead of being cut. */}
        <div
          className="absolute top-2 bottom-2 left-0 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,var(--border)_1.5rem,var(--border)_calc(100%-1.5rem),transparent)]"
          aria-hidden="true"
        />

        <ol data-reveal-group className="space-y-14">
          {experiences.map((exp) => (
            <li key={exp.id} className="relative pl-8 md:pl-12">
              {/* ring, not border: a ring is drawn outside the box, so the dot
                  stays a solid 8px while the halo punches a clean gap in the
                  rail behind it. border-2 was painting into the dot instead,
                  leaving a 6px core. */}
              <span
                className="ring-background bg-primary absolute top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full ring-4"
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

              {/* Collapsed by default: the eyebrow, role, company and blurb
                  above are what a scanning reader needs. The detail below is
                  still in the HTML, just behind a toggle. */}
              <Disclosure className="mt-6">
                <div className="space-y-8 pt-8">
                  {exp.achievements && (
                    <div>
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

                  <div>
                    <h4 className="text-foreground-faint font-mono text-xs tracking-[0.15em] uppercase">
                      Projects
                    </h4>
                    {/* Hairline-separated rows, not nested cards — a card inside
                        a card inside a rail was three borders deep. */}
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
                </div>
              </Disclosure>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
