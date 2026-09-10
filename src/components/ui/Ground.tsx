import React from "react";

/**
 * Names of the decorative grounds. Each one must have a matching
 * `[data-pattern="…"]` rule in globals.css — TypeScript cannot see the
 * stylesheet, so this union and those rules are kept in step by hand.
 *
 * There is no "blueprint" here on purpose: blueprint is the page-wide ground on
 * `body`, so opting a box into it would only paint the same grid twice.
 */
export type PatternName = "stack" | "graph";

type GroundProps = {
  pattern: PatternName;
  children: React.ReactNode;
  className?: string;
};

/**
 * A patterned box for the routes that are not built from `Section` — the
 * `/projects` index and each project detail page. It exists so the two
 * invariants a ground depends on live in one place rather than being retyped
 * per page:
 *
 * - `relative`, so the `z-index: -1` pseudo sizes to this box instead of the
 *   initial containing block.
 * - `isolate`, so that pseudo stays inside this stacking context. Without it,
 *   it escapes to the root and paints behind the page ground, where it is
 *   invisible.
 *
 * Wrap the content, not the whole `<main>`: the footer draws its own top
 * hairline and reads as the end of the page, so the ground should stop above it.
 */
export default function Ground({ pattern, children, className }: GroundProps) {
  return (
    <div
      data-pattern={pattern}
      className={`relative isolate ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
