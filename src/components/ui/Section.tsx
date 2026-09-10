import React from "react";
import type { PatternName } from "@/components/ui/Ground";

type SectionProps = {
  /** Anchor target. Navbar's scrollspy matches on these, so they are fixed. */
  id: string;
  /** Two-digit index for the mono eyebrow, e.g. "01". */
  index: string;
  title: string;
  lead?: string;
  /**
   * Opt into a decorative ground on top of the page-wide blueprint. Omit for
   * the blueprint alone, which is what most sections want.
   */
  pattern?: PatternName;
  children: React.ReactNode;
  className?: string;
};

/**
 * The single canonical section shell. Before this existed, all six sections on
 * the home page shared `px-4 py-20` but each picked a different `max-w-*`
 * (7xl / 4xl / 7xl / 7xl / 6xl / 3xl), so the page breathed unevenly. The width
 * is decided here and nowhere else — narrow prose inside with `max-w-[68ch]`,
 * never by changing the container.
 */
export default function Section({
  id,
  index,
  title,
  lead,
  pattern,
  children,
  className,
}: SectionProps) {
  return (
    // `relative isolate` is unconditional, not gated on `pattern`: making a
    // section's containing block depend on a decorative prop is the kind of
    // action at a distance that is impossible to debug later. isolate is also
    // load-bearing where a pattern is set — it gives the z-index:-1 pseudo a
    // stacking context to stay inside, and without one it escapes to the root
    // and paints behind the page-wide ground.
    //
    // There is no border-t any more: sections are separated by the vertical
    // rhythm alone, and the grounds fade out at their own edges (see
    // [data-pattern]::before in globals.css) so one background gives way to the
    // next without a seam to draw.
    //
    // `pattern` is spread bare rather than defaulted to "": an empty string
    // still matches [data-pattern], and a pseudo with no mask is not clipped
    // at all, so the section would render as a solid slab of colour.
    <section
      id={id}
      data-pattern={pattern}
      className={`relative isolate scroll-mt-24 py-24 md:py-32 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* The header block is wrapped so the halo can be set once here rather
            than on each of the three elements. It is scoped to the header and
            not the whole section because text-shadow inherits: on the outer
            container every card's text would carry a halo it does not need,
            since an opaque card already hides the ground. */}
        <div className={pattern ? "ground-halo" : undefined}>
          {/* Decorative index + rule. aria-hidden because the <h2> immediately
              below already names the section; announcing "01" adds nothing. */}
          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="text-primary font-mono text-xs tracking-[0.2em]">
              {index}
            </span>
            <span className="bg-border h-px flex-1" />
          </div>
          {/* data-reveal drives the scroll-linked entrance in globals.css. It is
              CSS-only and inert where the browser lacks scroll timelines or the
              user prefers reduced motion. */}
          <h2
            data-reveal
            className="font-display text-title text-foreground mt-5 text-balance"
          >
            {title}
          </h2>
          {lead && (
            <p
              data-reveal
              className="text-foreground-muted text-lead mt-5 max-w-[68ch] text-pretty"
            >
              {lead}
            </p>
          )}
        </div>
        {/* No data-reveal here: sections apply it to their own content, so a
            reveal group never nests inside an already-revealing wrapper and
            compounds the fade. */}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
