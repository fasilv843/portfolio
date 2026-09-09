"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { toggleTheme } = useTheme();
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
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background),black_20%)]/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className={`text-lg font-semibold transition-opacity duration-300 ${hideBrand ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          Fasil Valiyattil
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {isHome &&
            navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative pb-1 transition-colors ${activeId === l.id ? "text-[var(--primary)]" : "text-foreground/80 hover:text-foreground"} after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-[var(--primary)] after:transition-all after:duration-300 after:content-[""] ${activeId === l.id ? "after:w-full after:opacity-100" : "after:w-0 after:opacity-0"}`}
              >
                {l.label}
              </a>
            ))}
          {/* <button
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] hover:bg-[var(--muted)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4.5 h-4.5">
              <path d="M12 3v2m0 14v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </button> */}
        </div>
        {isHome && (
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5.5 w-5.5"
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
      {isHome && menuOpen && (
        <div className="border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--background),black_10%)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className={`py-1 ${activeId === l.id ? "text-[var(--primary)]" : ""}`}
              >
                {l.label}
              </a>
            ))}
            {/* <button
              onClick={() => { toggleTheme(); setMenuOpen(false); }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] px-3 py-2"
            >
              Theme
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4.5 h-4.5">
                <path d="M12 3v2m0 14v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
}
