"use client";

import React, { useId, useState } from "react";

type DisclosureProps = {
  children: React.ReactNode;
  /** Trigger text when collapsed. */
  labelMore?: string;
  /** Trigger text when expanded. */
  labelLess?: string;
  className?: string;
};

/**
 * Expand/collapse wrapper. `grid-template-rows: 0fr -> 1fr` animates to the
 * content's natural height, which max-height cannot do without a magic number —
 * the same idiom as Navbar's mobile menu. `inert` keeps the collapsed content
 * out of the tab order while leaving it in the DOM, so the markup still ships in
 * the SSR HTML and crawlers read the full section.
 *
 * `children` is rendered by the caller, so a server component can pass
 * server-rendered content through without becoming a client component itself.
 */
export default function Disclosure({
  children,
  labelMore = "Show more",
  labelLess = "Show less",
  className = "",
}: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="text-foreground-muted hover:text-foreground focus-visible:outline-ring group inline-flex items-center gap-2 rounded-sm font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {open ? labelLess : labelMore}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ease-out-quart h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={`ease-out-quart grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
