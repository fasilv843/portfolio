"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Both derived during render, not mirrored into state — an effect that calls
  // setState from a value already available here is what react-hooks@7 rejects.
  const hideBrand = isHome && activeId === "hero";

  // Scrollspy. Previously a rAF-throttled scroll listener measuring
  // getBoundingClientRect on six sections every frame; one observer with a
  // rootMargin band does the same job with no scroll handler and no layout
  // reads. The band sits between 25% and 35% down the viewport.
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Document order, so overlapping sections resolve to the upper one.
        const current = SECTION_IDS.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const navLinks = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  return (
    <nav className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`font-display focus-visible:outline-ring rounded-sm text-lg transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${hideBrand ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          Fasil Valiyattil
        </Link>
        {/* The toggle sits outside the isHome gates so it stays reachable on
            every page and at every breakpoint. */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            {isHome &&
              navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  // The underline transitions width and opacity explicitly
                  // rather than every property, which would animate layout too.
                  className={`focus-visible:outline-ring relative pb-1 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${activeId === l.id ? "text-primary" : "text-foreground-muted hover:text-foreground"} after:bg-primary after:ease-out-quart after:absolute after:-bottom-0.5 after:left-0 after:h-px after:transition-[width,opacity] after:duration-200 after:content-[""] ${activeId === l.id ? "after:w-full after:opacity-100" : "after:w-0 after:opacity-0"}`}
                >
                  {l.label}
                </a>
              ))}
          </div>
          <ThemeToggle />
          {isHome && (
            <button
              type="button"
              // Borderless to match ThemeToggle, its immediate neighbour — the
              // hover tint carries the affordance instead of a resting outline.
              className="text-foreground-muted hover:text-foreground hover:bg-surface-raised focus-visible:outline-ring inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5.5 w-5.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {isHome && (
        // grid-template-rows 0fr -> 1fr animates to the content's natural
        // height, which max-height cannot do without a magic number. `inert`
        // keeps the collapsed links out of the tab order — the menu is always
        // in the DOM now so that it has something to animate from.
        <div
          id="mobile-menu"
          inert={!menuOpen}
          className={`ease-out-quart grid transition-[grid-template-rows] duration-200 md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <div className="border-border bg-surface-sunken border-t">
              <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-2">
                {navLinks.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`focus-visible:outline-ring rounded-sm py-2.5 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${activeId === l.id ? "text-primary" : "text-foreground-muted hover:text-foreground"}`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative reading-progress rule along the nav's bottom edge. */}
      <div
        className="scroll-progress bg-primary absolute inset-x-0 bottom-0 h-px scale-x-0"
        aria-hidden="true"
      />
    </nav>
  );
}
