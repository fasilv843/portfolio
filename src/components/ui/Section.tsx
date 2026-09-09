import React from "react";

type SectionProps = {
  /** Anchor target. Navbar's scrollspy matches on these, so they are fixed. */
  id: string;
  /** Two-digit index for the mono eyebrow, e.g. "01". */
  index: string;
  title: string;
  lead?: string;
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
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border-border scroll-mt-24 border-t py-24 md:py-32 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6">
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
        {/* No data-reveal here: sections apply it to their own content, so a
            reveal group never nests inside an already-revealing wrapper and
            compounds the fade. */}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
