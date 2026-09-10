import Section from "@/components/ui/Section";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      title="Skills & Technologies"
      lead="The tools I reach for, grouped by where they sit in the stack."
      // The ground scatters the same marks this section lists above it, so the
      // texture is an echo of the content rather than unrelated decoration.
      pattern="stack"
    >
      <div
        data-reveal-group
        className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillCategories.map((category) => (
          // ground-plate + ground-halo, per column rather than per line: this is
          // the one section whose content is bare text on the loudest ground,
          // with no card anywhere to hide it. The plate washes the tile back
          // behind the whole column, and the halo — text-shadow inherits, so one
          // class covers the heading, every skill name, and via the companion
          // rule the logos — handles the strokes that cross a glyph outright.
          <div key={category.name} className="ground-plate ground-halo">
            <h3 className="text-foreground border-border border-b pb-3 font-mono text-xs tracking-[0.15em] uppercase">
              {category.name}
            </h3>
            <ul className="mt-5 space-y-3">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="group/skill flex items-center gap-3"
                >
                  {skill.logo ? (
                    // Plain <img>: these are static local SVGs, and next/image
                    // refuses image/svg unless dangerouslyAllowSVG is set.
                    // alt="" because the adjacent span already names the skill.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={skill.logo}
                      alt=""
                      width={20}
                      height={20}
                      loading="lazy"
                      decoding="async"
                      className="h-5 w-5 shrink-0 opacity-60 grayscale transition duration-200 group-hover/skill:opacity-100 group-hover/skill:grayscale-0"
                    />
                  ) : (
                    // Monogram fallback. Four skills ship with logo: "" and used
                    // to render as bare text beside iconed peers.
                    <span
                      className="text-foreground-faint border-border flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border font-mono text-[10px]"
                      aria-hidden="true"
                    >
                      {skill.name.charAt(0)}
                    </span>
                  )}
                  <span className="text-foreground-muted text-sm">
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
