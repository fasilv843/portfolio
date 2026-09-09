/**
 * Single source of truth for site-wide identity.
 *
 * The canonical host is the `www` form. Before this existed, `alternates.canonical`
 * and the sitemap used `https://www.fasilv.in` while `openGraph.url` on the project
 * pages used `https://fasilv.in` — two canonical hosts splitting ranking signals.
 */
export const SITE_URL = "https://www.fasilv.in";
export const SITE_NAME = "Fasil Valiyattil";
export const AUTHOR = "Fasil Valiyattil";
export const ROLE = "Full-Stack Developer";
export const TWITTER_HANDLE = "@fasilv843";

/** Absolute URL for a site-relative path. `url("/projects")` -> `https://www.fasilv.in/projects` */
export function url(path = "/"): string {
  return new URL(path, SITE_URL).toString().replace(/\/$/, "") || SITE_URL;
}

/** Trim copy to a meta-description-friendly length without cutting mid-word. */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).trimEnd() + "…";
}

export const EMAIL = "fasilv.in@gmail.com";

/**
 * Labelled so the UI can render them; `SOCIAL_LINKS` below is derived from the
 * same list, so the JSON-LD `sameAs` array cannot drift from what is on screen.
 */
export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/fasilv843" },
  { label: "LinkedIn", href: "https://linkedin.com/in/fasilv843" },
  { label: "Instagram", href: "https://www.instagram.com/fa_sil_v/" },
  { label: "X", href: "https://x.com/fasilv843" },
  { label: "Facebook", href: "https://www.facebook.com/fasilv843" },
] as const;

export const SOCIAL_LINKS: string[] = SOCIALS.map((s) => s.href);
