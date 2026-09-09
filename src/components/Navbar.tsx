"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const [heroInView, setHeroInView] = useState<boolean>(true);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Brand only hides behind the hero, which only exists on the home page.
  const hideBrand = isHome && heroInView;

  // Scrollspy + hero visibility (home page only)
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;
    const ids = [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];
    const getSections = () =>
      ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sections = getSections();
        const probeY = window.innerHeight * 0.35; // probe a bit below top
        let current: string | null = null;
        for (const sec of sections) {
          const r = sec.getBoundingClientRect();
          if (r.top <= probeY && r.bottom >= probeY) {
            current = sec.id;
            break;
          }
        }
        if (!current) {
          // Fallback to closest above the probe
          let best: { id: string; dist: number } | null = null;
          for (const sec of sections) {
            const r = sec.getBoundingClientRect();
            const dist = Math.abs(r.top - probeY);
            if (!best || dist < best.dist) best = { id: sec.id, dist };
          }
          current = best ? best.id : "hero";
        }
        setActiveId(current);
        setHeroInView(current === "hero");
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const navLinks = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  return (
    <nav className="border-border supports-[backdrop-filter]:bg-surface-sunken/70 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className={`text-lg font-semibold transition-opacity duration-300 ${hideBrand ? "pointer-events-none opacity-0" : "opacity-100"}`}
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
                  className={`focus-visible:outline-ring relative pb-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${activeId === l.id ? "text-primary" : "text-foreground-muted hover:text-foreground"} after:bg-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:transition-all after:duration-300 after:content-[""] ${activeId === l.id ? "after:w-full after:opacity-100" : "after:w-0 after:opacity-0"}`}
                >
                  {l.label}
                </a>
              ))}
          </div>
          <ThemeToggle />
          {isHome && (
            <button
              type="button"
              className="border-border-interactive focus-visible:outline-ring inline-flex h-10 w-10 items-center justify-center rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
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
      {isHome && menuOpen && (
        <div
          id="mobile-menu"
          className="border-border bg-surface-sunken border-t md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className={`focus-visible:outline-ring py-1 focus-visible:outline-2 focus-visible:outline-offset-2 ${activeId === l.id ? "text-primary" : ""}`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
