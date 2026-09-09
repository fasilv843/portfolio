# Portfolio Rewrite Plan

Ordered checklist for the UI / theme / animation / dependency overhaul.
Work top to bottom — each phase assumes the previous one landed.

Repo state at time of writing: branch `ui-update`, Next 15.5.2, React 19.1.0, Tailwind v4, Node **18.16.0**.

---

## Phase 0 — Unblock the toolchain (do this first)

- [x] **0.1 Upgrade Node.** Now on **26.8.1**. Note the old 18.16.0 is still first on `PATH` inside
      Git Bash — use PowerShell, or fix the Bash `PATH`, when running `next` directly.
- [x] **0.2 Add `.nvmrc`** (`26`, matching the local toolchain) and `engines: { node: ">=20.9.0" }`
      in `package.json`. Landed in phase 1.
- [x] **0.3 Confirm a clean baseline build.** Green on Next 16.3.4 before any phase 1 change.

## Phase 1 — Dependency upgrades ✅ done

Landed as commits `0cee526`…`228ad8a`. Everything is current except **eslint** and **typescript**,
both deliberately deferred — see 1.3 and 1.4 for the blockers.

Original survey (from `npm outdated`):

| Package              | Current  | Latest  | Notes                                |
| -------------------- | -------- | ------- | ------------------------------------ |
| next                 | 15.5.2   | 16.3.4  | major — see 1.2                      |
| eslint-config-next   | 15.5.2   | 16.3.4  | must match next                      |
| react / react-dom    | 19.1.0   | 19.2.8  | minor, safe                          |
| tailwindcss          | 4.1.12   | 4.3.3   | minor                                |
| @tailwindcss/postcss | 4.1.12   | 4.3.3   | minor                                |
| eslint               | 9.34.0   | 10.10.0 | major — flat config already in use   |
| typescript           | 5.9.2    | 7.0.2   | major                                |
| @types/node          | 20.19.11 | 26.5.0  | match Node 22+                       |
| @types/react         | 19.1.12  | 19.2.18 | minor                                |
| @types/react-dom     | 19.1.9   | 19.2.7  | minor                                |
| @eslint/eslintrc     | 3.3.1    | 3.3.7   | patch                                |
| next-sitemap         | ^4.2.3   | —       | may be **dropped** entirely, see 4.1 |

- [x] **1.1 Patch/minor**: react + react-dom → 19.2.8, tailwindcss + @tailwindcss/postcss → 4.3.3,
      @types/react → 19.2.18, @types/react-dom → 19.2.7, @types/node → 26.5.0 (matching Node 26),
      typescript → 5.9.3.
- [x] **1.2 Next 15 → 16.** Already landed in `984b86e`, but only partially — `eslint-config-next`
      was left at 15.5.2, a full major behind. Fixed in 1.3.
- [x] **1.3 `eslint-config-next` 15.5.2 → 16.3.4.** Also **dropped `@eslint/eslintrc`**: v16 ships
      `core-web-vitals` and `typescript` as native flat-config subpath exports, so the `FlatCompat`
      shim in `eslint.config.mjs` is gone.
      Fallout: `eslint-plugin-react-hooks@7` (new in config-next 16) flagged a real
      setState-in-effect in `Navbar.tsx` — `hideBrand` was mirrored from `pathname` in an effect.
      Now derived during render as `isHome && heroInView`; one fewer effect, same behaviour.

      **ESLint 9 → 10 is deferred.** `eslint-plugin-react@7.37.5`, `eslint-plugin-jsx-a11y@6.10.2`
          and `eslint-plugin-import@2.32.0` — all transitive deps of `eslint-config-next@16` — cap their
          peer at `eslint ^9`. Forcing 10 needs `overrides`. Holding at **9.39.5**, which npm now marks
          deprecated ("no longer supported"), so this is worth revisiting once those plugins move.

- [x] **1.4 TypeScript 5 → 7 is BLOCKED.** Holding at **5.9.3**. TypeScript 7.0.2 is the Go native
      port; its `exports` map is `"." → lib/version.cjs` plus `./unstable/*` — **the classic JS
      compiler API is gone**. Blockers, in order: 1. **typescript-eslint** (via `eslint-config-next` → `typescript-eslint@^8.46.0`) — hard
      blocker. Peer is `typescript >=4.8.4 <6.1.0`, so install fails ERESOLVE, and
      `@typescript-eslint/typescript-estree` structurally needs the classic API to parse.
      `next/typescript` would stop working entirely. **There is no typescript-eslint v9** —
      dist-tags are `latest: 8.70.0` only. 2. `plugins: [{ "name": "next" }]` in `tsconfig.json` — TS 7 is LSP-based and does not load
      classic language-service plugins, so Next's editor diagnostics would be lost. Editor-only. 3. **No stable TypeScript 6** exists (only `6.0.0-beta`) — there is no intermediate step.

      `next build` itself is *fine*: Next 16.3.4 already anticipates TS 7 —
          `experimental.useTypeScriptCli` defaults to `true` and it shells out to `tsc` rather than
          using the API. **The single event to watch is a typescript-eslint v9 release.**

- [x] **1.5 Added**: `next-themes` (installed only — wired up in 3.5/3.6), `@vercel/analytics` +
      `@vercel/speed-insights` (mounted in `layout.tsx`; both no-op off Vercel), `sharp`,
      `prettier` + `prettier-plugin-tailwindcss` (+ `.prettierrc`, `.prettierignore` and a
      `format` script; the repo-wide reformat is its own commit, `228ad8a`).

      **`motion` deliberately NOT added.** All animation in phase 6 is Tailwind utilities and CSS
          `@keyframes` declared via `@theme` — no JS animation runtime enters the dependency tree.
          This promotes **2.3** from cleanup to a *prerequisite for phase 6*: the `fade-in` /
          `slide-up` keyframes stranded in the dead `tailwind.config.ts` are the first two motion
          tokens and must move into `globals.css` before 6.1 can build on them.

## Phase 2 — Fix what is actually broken (before restyling)

These are real bugs found in the current code; fix them before layering a new design on top.

- [ ] **2.1 `next/image` remote host is not allowlisted.** `next.config.ts` `images.remotePatterns`
      only permits `media.istockphoto.com`, but `src/data/skills.ts` feeds
      `cdn.jsdelivr.net/gh/devicons/...` URLs straight into `<Image>` in `src/app/page.tsx`.
      Either add the jsdelivr pattern **or** (better) vendor the ~25 devicon SVGs into
      `public/icons/` — removes a third-party runtime dependency, kills the render-blocking CDN
      round-trips, and lets the icons be `currentColor`-tinted per theme.
- [ ] **2.2 The Inter font is not being applied.** `layout.tsx` exposes Inter as `--font-sans`, but
      `globals.css` `@theme inline` then redefines `--font-sans: var(--font-geist-sans)` — a
      variable that is never defined. `body { font-family: var(--font-sans, Arial) }` therefore
      resolves to an invalid value. Also `--font-mono: var(--font-geist-mono)` is defined but never
      used by any rule. Fix the variable names end to end.
- [ ] **2.3 `tailwind.config.ts` is dead code.** Tailwind v4 is CSS-first; without an `@config`
      directive in `globals.css` the file is never read. Consequence: the `fade-in` / `slide-up`
      keyframes and the `background`/`primary`/`border` color aliases declared there **do nothing**.
      Delete the file and move everything into `@theme` in `globals.css`.
- [ ] **2.4 Dead / unused code.** `ThemeSelector.tsx` is never rendered. `toggleTheme` is
      destructured in `Navbar.tsx` but unused. Large commented-out blocks: the contact form in
      `page.tsx` (~65 lines), the theme buttons in `Navbar.tsx`, `generateStaticParams` in
      `projects/[id]/page.tsx`, most of `skills.ts`. Decide keep-or-delete for each.
- [ ] **2.5 `not-found.tsx` ignores the theme** — hardcoded `text-green-300`, `text-gray-300`,
      `from-green-500 to-lime-500`. Left over from an older palette.
- [ ] **2.6 No project images exist.** Every `image:` in `src/data/projects.ts` is commented out, so
      every card renders the 🚀 emoji and the detail-page hero silently falls back to the plain
      layout. Capture real screenshots — this is the single biggest visual win available.
- [ ] **2.7 Smooth scroll is set imperatively** in a `Navbar` effect (`root.style.scrollBehavior`).
      Move to CSS (`html { scroll-behavior: smooth }`) inside a `prefers-reduced-motion` guard.

## Phase 3 — Theme system (dark + light)

Today there is no light mode at all: three dark palettes (`cyan`, `peacock`, `violet`),
with `ThemeProvider` hardcoded to `cyan`, no persistence, and no system-preference support.

- [ ] **3.1 Decide the model.** Recommendation: **light/dark × one accent**, not three hues.
      A single confident accent reads as deliberate; three switchable hues read as a demo.
      Keep the accent as a CSS variable so it can still be re-skinned in one place.
- [ ] **3.2 Rebuild the token set** in `globals.css`, in OKLCH, with semantic names rather than
      raw roles: `--bg`, `--bg-subtle`, `--surface`, `--surface-raised`, `--border`,
      `--border-strong`, `--text`, `--text-muted`, `--text-faint`, `--accent`, `--accent-hover`,
      `--accent-contrast`, `--ring`. Define light on `:root`, dark under
      `:root[data-theme="dark"]` **and** `@media (prefers-color-scheme: dark)`.
- [ ] **3.3 Kill the `color-mix(...)` sprawl.** `page.tsx`, `ProjectCard.tsx`,
      `projects/[id]/page.tsx` and `Navbar.tsx` are full of inline
      `bg-[color-mix(in_oklab,var(--background),white_6%)]` — which is also **light-mode-hostile**
      (mixing toward white on a white background = invisible). Replace every one with a semantic
      token from 3.2.
- [ ] **3.4 Contrast audit.** `text-foreground/60` and `/70` on a light background will likely fail
      WCAG AA. Check every opacity-derived text colour in both themes; prefer explicit muted
      tokens over `/60` opacity.
- [ ] **3.5 Fix the FOUC.** `ThemeProvider` sets `data-theme` in a `useEffect`, i.e. after
      hydration — the first paint is always the `:root` default. Add a tiny blocking inline script
      in `<head>` that reads `localStorage` + `matchMedia` and stamps `data-theme` before paint,
      and put `suppressHydrationWarning` on `<html>`. (Or adopt `next-themes`, which does exactly
      this; then delete `ThemeProvider.tsx`.)
- [ ] **3.6 Persist the choice** to `localStorage` and honour `prefers-color-scheme` when nothing is
      stored. The current provider deliberately ignores storage — revisit that comment.
- [ ] **3.7 Ship a real toggle** in the navbar (sun/moon, animated, `aria-label`, keyboard
      reachable) replacing the commented-out button. Delete `ThemeSelector.tsx` or repurpose it.
- [ ] **3.8 Theme-aware chrome**: update `<meta name="theme-color">` per scheme (see 5.4), and the
      `theme_color` / `background_color` in `public/site.webmanifest` (currently locked to the old
      `#00ffd1` / `#0a0b0f`).
- [ ] **3.9 Custom scrollbar** in `globals.css` is `::-webkit-` only. Add `scrollbar-color` /
      `scrollbar-width` for Firefox, and verify it in light mode.

## Phase 4 — SEO corrections

Audited against `layout.tsx`, `projects/page.tsx`, `projects/[id]/page.tsx`,
`next-sitemap.config.js`, `public/robots.txt`, `public/site.webmanifest`.

**Correct today:** `metadataBase`, canonical on `/`, OG image 1200×630 with alt, Twitter
`summary_large_image`, `Person` JSON-LD with `sameAs`, sitemap on the `www` canonical host.

Problems, highest impact first:

- [ ] **4.1 Project detail pages are invisible to search engines.**
      `generateStaticParams` is commented out in `projects/[id]/page.tsx`, and the generated
      `public/sitemap-0.xml` contains only **two** URLs (`/` and `/projects`). Every individual
      project page is unlinked from the sitemap. Uncomment `generateStaticParams` and make the
      sitemap enumerate all project IDs. Simplest fix: **replace `next-sitemap` with the native
      App Router `src/app/sitemap.ts` + `src/app/robots.ts`**, which read `projects` directly and
      can never drift. That also removes the `postbuild` step and a dependency.
- [ ] **4.2 Domain inconsistency.** `alternates.canonical` and the sitemap use `https://www.fasilv.in`,
      but `openGraph.url` in `projects/page.tsx` and `projects/[id]/page.tsx` uses
      `https://fasilv.in` (no `www`). Pick one — the `www` form, per `next-sitemap.config.js` — and
      define it once as a `SITE_URL` constant in `src/lib/site.ts` used everywhere.
- [ ] **4.3 Broken OG fallback image.** `projects/[id]/page.tsx` falls back to
      `https://via.placeholder.com/...`. That service is dead — social cards for image-less projects
      get a broken preview. Fall back to `/logo.png`, or better, generate per-project cards with
      `next/og` (`opengraph-image.tsx`).
- [ ] **4.4 Missing canonicals** on `/projects` and `/projects/[id]`. Add `alternates.canonical` to
      both.
- [ ] **4.5 The webmanifest is never linked.** `public/site.webmanifest` exists but `layout.tsx`'s
      `metadata.icons` doesn't reference it. Add `manifest: "/site.webmanifest"`.
- [ ] **4.6 Add a title template**: `title: { default: "Fasil Valiyattil — Full-Stack Developer",
  template: "%s | Fasil Valiyattil" }`, then drop the hand-written `"- Fasil Valiyattil"`
      suffixes in the child pages. Also: the root `title` is bare `"Fasil Valiyattil"` with no role
      or keyword — weak as a SERP headline.
- [ ] **4.7 Fill in the OG gaps** on the root: `siteName`, `locale: "en_US"`, `url`. Add
      `twitter.creator` (only `site` is set). Add an explicit `robots` block
      (`index, follow`, `googleBot: { "max-image-preview": "large", "max-snippet": -1 }`).
- [ ] **4.8 Move to `export const viewport`.** `themeColor` / `colorScheme` / `width` belong in the
      Next 15+ `viewport` export; none is currently declared anywhere.
- [ ] **4.9 Render JSON-LD server-side.** It currently ships via
      `<Script strategy="afterInteractive">`. A plain `<script type="application/ld+json">` in the
      server output is more reliably parsed. While there: add a `WebSite` schema, a
      `BreadcrumbList` on project pages, and `CreativeWork`/`SoftwareApplication` per project.
      Consider `knowsAbout` + `alumniOf`/`worksFor` on the `Person` node.
- [ ] **4.10 `robots.txt` emits two conflicting `User-agent: *` groups** — one `Allow: /`, one
      `Disallow: /404`. Collapse into a single group. (Moot if 4.1 replaces `next-sitemap`.)
- [ ] **4.11 `not-found.tsx` has no metadata** — no title, and it should be `noindex`.
- [ ] **4.12 Thin descriptions.** `projects/page.tsx` ships literal ellipses:
      `"Explore the portfolio projects of Fasil Valiyattil..."`. Write real 150–160 char copy.
- [ ] **4.13 Heading hierarchy.** The home page opens `h1` → `h2` → `h2` (the tagline "Full-Stack
      Developer" is an `h2` competing with every section heading), and the experience cards nest
      `h3` → `h5` → `h6`, skipping `h4`. Flatten.
- [ ] **4.14 Add `src/app/opengraph-image.tsx`** so the home OG card is generated rather than
      reusing `logo.png` (a square logo is a poor 1200×630 card).
- [ ] **4.15 Accessibility items that also affect SEO**: no skip-to-content link, the decorative
      emoji avatar has no text alternative strategy, the mobile menu button lacks
      `aria-expanded`/`aria-controls`.

## Phase 5 — UI rewrite

Do this **after** phases 2–4, so you are restyling correct markup.

- [ ] **5.1 Pick a direction before writing CSS.** The current look is generic dark-mode-neon:
      rounded cards, gradient borders, a `👨‍💻` emoji where a photo should be. Choose a point of
      view (editorial/typographic, brutalist-technical, warm-minimal, terminal…) and commit.
      Write it down as 5 rules you can check work against.
- [ ] **5.2 Typography scale.** One font (Inter) at seven sizes is doing everything right now.
      Consider a display face for headings, a fluid `clamp()` scale, tightened tracking on large
      sizes, and `text-wrap: balance` on headings / `pretty` on paragraphs.
- [ ] **5.3 Spacing + layout rhythm.** Every section is `py-20 px-4` with a different `max-w-*`
      (`7xl`, `4xl`, `6xl`, `3xl`). Extract a single `<Section>` component with consistent padding
      and width so the page stops breathing unevenly.
- [ ] **5.4 Hero.** Replace the emoji circle with a real photo or a deliberate graphic element.
      Add a one-line value proposition, a resume download, and an email link alongside the two
      social buttons.
- [ ] **5.5 Component extraction.** `page.tsx` is a 276-line monolith. Split into
      `components/sections/{Hero,About,Skills,Projects,Experience,Contact}.tsx`, plus shared
      `Section`, `Tag`/`Badge`, `Card`, `SectionHeading`. The `<span className="px-2 py-1 bg-…
  text-xs rounded border">` tag markup is currently duplicated in four places.
- [ ] **5.6 Skills section.** Four static columns of icon+label. Options: group by proficiency,
      add a "currently learning" band, make icons monochrome/`currentColor` so they don't fight the
      palette (24 full-colour logos is visually noisy).
- [ ] **5.7 Project cards.** `line-clamp-3` on the description with no `@tailwindcss/typography`
      configured — verify it renders. Add real screenshots (2.6), hover treatment, and surface
      live/source links on the card itself, not just the detail page.
- [ ] **5.8 Experience timeline.** Reasonable structurally; restyle the pill badges and the
      dot/rail, which currently use `shadow-[0_0_0_4px]` + `color-mix` hacks that will break in
      light mode.
- [ ] **5.9 Project detail page.** Text-heavy `feature` lists (CineSnap has 14 bullets). Group into
      subsections, and the duplicated live/source buttons (hero + sidebar) should collapse into one
      sticky sidebar.
- [ ] **5.10 Contact.** Currently a single mailto button; the real form is commented out. Either
      restore it wired to a service (Resend / Formspree / a route handler) or delete the dead block
      and make the mailto CTA stronger.
- [ ] **5.11 Footer.** One line of copyright, hardcoded `© 2026`. Add social links, use a dynamic
      year, add a "built with" line with a repo link.
- [ ] **5.12 New sections worth adding**: testimonials/recommendations, a writing/blog index,
      GitHub activity, an availability status badge.
- [ ] **5.13 Add `loading.tsx` and `error.tsx`** for the route segments.

## Phase 6 — Animation

Nothing is animated today beyond `transition-all duration-300` on hover, and the two
Tailwind keyframes that were never active (see 2.3).

- [ ] **6.1 Establish motion tokens** — durations (fast 150 / base 250 / slow 400) and easings
      (a standard ease-out plus one spring) as CSS variables. Consistency matters more than
      cleverness.
- [ ] **6.2 `prefers-reduced-motion` is not handled anywhere.** Add a global
      `@media (prefers-reduced-motion: reduce)` block that neutralises transforms and durations,
      and gate JS-driven animation on `matchMedia` too. Do this **before** adding animations.
- [ ] **6.3 Scroll-reveal** for sections/cards — staggered fade+rise. Prefer CSS
      `animation-timeline: view()` where supported with an `IntersectionObserver` fallback, or use
      `motion`'s `whileInView`. Keep it subtle; every section sliding in is worse than none.
- [ ] **6.4 Hero entrance** — a single considered sequence on first paint, not a generic fade.
- [ ] **6.5 Nav polish.** The active-link underline already animates; the scrollspy runs a
      `rAF`-throttled scroll listener over `getBoundingClientRect` for six sections
      (`Navbar.tsx:34-76`). Replace with a single `IntersectionObserver` — less code, no scroll
      handler. Animate the mobile menu open/close (it currently pops in).
- [ ] **6.6 Card hover.** Currently `hover:scale-105` on the image and `scale-[1.02]` on buttons.
      Unify: lift + border-glow + image zoom on one timing curve.
- [ ] **6.7 View Transitions** between the projects list and a project detail page (Next 16 has
      first-class support) — high payoff for a portfolio.
- [ ] **6.8 Micro-interactions**: theme-toggle morph, copy-email confirmation, focus-visible rings
      that are actually designed, a scroll progress indicator.
- [ ] **6.9 Performance guard.** Animate only `transform` / `opacity`; avoid `transition-all`
      (currently used on nearly every interactive element — it animates layout properties too).

## Phase 7 — Content

- [ ] **7.1 `src/data/skills.ts`** — ~15 skills sit commented out (TypeScript, Next.js, Python,
      FastAPI, Kafka, gRPC, Kubernetes, Grafana, Prometheus…). Notably **TypeScript and Next.js are
      hidden** while the site itself is built with both. Decide the real list.
- [ ] **7.2 Missing-logo fallback.** `TanStack Query`, `WebRTC`, `TypeORM`, `CI/CD` have
      `logo: ""` and render as bare text next to iconed peers — visually inconsistent. Design a
      text/monogram fallback.
- [ ] **7.3 Experience dates.** Paywint reads `"Oct 2025 - Aug 2026"` — a fixed end date, not
      "Present". Confirm that's intended (today is Sep 2026).
- [ ] **7.4 Project screenshots** — see 2.6. Blocking for both UI and SEO.
- [ ] **7.5 Two different `Project` interfaces** exist: one in `data/projects.ts`, one in
      `data/experience.ts`. Rename the latter (`ExperienceProject`) to avoid import confusion.
- [ ] **7.6 About copy** is generic ("Curiosity drives me to keep learning"). Rewrite with
      specifics — the fintech domain work is genuinely differentiating and is currently buried.
- [ ] **7.7 Add a downloadable resume** at `public/resume.pdf` with a hero CTA.

## Phase 8 — Verification

- [ ] **8.1** `npm run build` + `npm run lint` clean.
- [ ] **8.2** Lighthouse on `/`, `/projects`, `/projects/[id]` — target 95+ across the board,
      in **both** themes.
- [ ] **8.3** Validate structured data (Google Rich Results Test) and the OG/Twitter cards
      (opengraph.xyz).
- [ ] **8.4** Keyboard-only pass + screen-reader pass on the nav, theme toggle and cards.
- [ ] **8.5** Re-submit the sitemap in Google Search Console once project URLs are included (4.1).
- [ ] **8.6** Check `tsconfig.tsbuildinfo` (94 KB, at repo root) is genuinely ignored — `.gitignore`
      covers `*.tsbuildinfo`, so just confirm it was never committed.

---

### Suggested commit slicing

`0 → 1 → 2` in one PR (toolchain + fixes, no visual change), `3` (theme), `4` (SEO),
`5 + 6` (the visible rewrite), `7` (content), `8` (verification). Keeping the SEO work in its own
commit means you can point Search Console at a specific deploy if rankings move.
