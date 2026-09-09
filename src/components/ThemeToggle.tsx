"use client";

import { useTheme } from "next-themes";

/**
 * The icons are swapped by CSS (the `dark:` variant, bound to [data-theme] in
 * globals.css), not by JavaScript. The usual next-themes pattern gates render
 * on a `mounted` flag set from an effect — but that is a synchronous setState
 * inside useEffect, which eslint-plugin-react-hooks@7 rejects. Rendering both
 * icons and letting CSS pick needs no client-only state and cannot produce a
 * hydration mismatch, because next-themes stamps the attribute before paint.
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      // Static label: the active theme genuinely is not known at render time.
      aria-label="Toggle theme"
      title="Toggle theme"
      className={`border-border-interactive text-foreground hover:bg-surface-raised focus-visible:outline-ring inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      {/* Moon: shown in light mode — activating switches to dark. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 dark:hidden"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {/* Sun: shown in dark mode — activating switches to light. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-4.5 w-4.5 dark:block"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2m0 14v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
