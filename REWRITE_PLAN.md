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
      compiler API is gone**. Blockers, in order:

      - **typescript-eslint** (via `eslint-config-next` → `typescript-eslint@^8.46.0`) — hard
        blocker. Peer is `typescript >=4.8.4 <6.1.0`, so install fails ERESOLVE, and
        `@typescript-eslint/typescript-estree` structurally needs the classic API to parse.
        `next/typescript` would stop working entirely. **There is no typescript-eslint v9** —
        dist-tags are `latest: 8.70.0` only.
      - `plugins: [{ "name": "next" }]` in `tsconfig.json` — TS 7 is LSP-based and does not load
        classic language-service plugins, so Next's editor diagnostics would be lost. Editor-only.
      - **No stable TypeScript 6** exists (only `6.0.0-beta`) — there is no intermediate step.

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

## Phase 2 — Fix what is actually broken ✅ done

Landed as commits `6c10261`…`80e0804`. Two items were found to be worse or different than the
original notes claimed — see 2.1 and 2.2.

- [x] **2.1 Skill icons were broken in production.** All 22 devicon URLs in `skills.ts` pointed at
      `cdn.jsdelivr.net`, which is not in `images.remotePatterns`, so `next/image` returned **400
      (url parameter is not allowed)** for every one. The whole Skills section was broken images.

      **Vendoring alone would not have fixed it.** `dangerouslyAllowSVG` defaults to `false` and the
      optimizer rejects any `image/svg` upstream, so local SVGs through `<Image>` return 400 too —
      the render had to change as well. The 22 SVGs now live in `public/icons/` and are rendered
      with a plain `<img>`, which is correct for a 24px SVG anyway: no optimizer round-trip, no
      third-party request on first paint. Verified: 22 local `img` tags, zero `_next/image` calls,
      zero jsdelivr references in the served HTML.

      `images.remotePatterns` is **left in place** — it allowlists `media.istockphoto.com` for the
      commented-out `image:` values, which stay under the 2.6 deferral.
- [x] **2.2 Fixed — but the original diagnosis was wrong.** Inter *was* being applied: the next/font
      class on `<body>` declared `--font-sans: "Inter"`, which beat the `:root` value, so the `body`
      rule resolved correctly. The real defects were that `--default-font-family` resolved to
      `var(--font-geist-sans)` — **a variable nothing ever defined** — so `<html>` had no
      font-family and every `font-sans` utility was dead, and that **Geist Mono was downloaded on
      every page load and used by nothing**.

      Root cause: the font variables were declared on `<body>` while `@theme` consumes them at
      `:root`. Inter is now exposed as `--font-inter` with the variable class on **`<html>`**, with
      `display: swap`. Geist Mono is gone; `--font-mono` falls back to Tailwind's default monospace
      stack, so that utility works correctly for the first time. Verified in the emitted CSS: zero
      `geist` references, one font file preloaded instead of two.
- [x] **2.3 `tailwind.config.ts` deleted.** Confirmed fully dead — no `@config` directive, and every
      declaration was either already duplicated in the `@theme inline` block or had zero usages
      (including `gradient-radial` / `gradient-conic`). The two keyframes are ported into a plain
      `@theme` block using v4's `--animate-*` namespace. Verified they now generate, where
      previously they never did. Note that v4 tree-shakes unused theme values, so they only appear
      in the bundle once phase 6 actually uses them.
- [x] **2.4 Scoped to the commented-out contact form only** (66 lines removed from `page.tsx`).
      **Deliberately kept:** `ThemeSelector.tsx`, the unused `toggleTheme` in `Navbar.tsx`,
      `Project.logo`, and the commented theme buttons. Consequence: `npm run lint` reports **one
      warning** (unused `toggleTheme`) — that is the accepted baseline, not a regression.
- [x] **2.5 Both 404 pages are theme-aware now.** The plan only listed the root `not-found.tsx`, but
      `projects/[id]/not-found.tsx` had the identical leftover palette. Both now use the foreground
      tokens, and their hand-rolled links were replaced with the existing `Button` component so they
      stop drifting from the rest of the site.
- [ ] **2.6 Deferred to phase 7.** No project images exist; every `image:` in `src/data/projects.ts`
      is commented out and all of them point at the *same* istockphoto stock photo, so uncommenting
      is not a fix. Real screenshots needed — see **7.4**.
- [x] **2.7 Smooth scroll moved to CSS**, gated on `prefers-reduced-motion: no-preference` so the
      accessible behaviour is the default and smooth scrolling is the opt-in. First piece of the
      reduced-motion handling **6.2** requires before any animation is added.
- [x] **2.8 (new) Tailwind was generating utilities from markdown prose.** v4 auto-detects sources
      across the whole project, markdown included — so this document *describing* class names in
      item 2.5 caused Tailwind to emit real rules for them, four of which survived in the bundle
      after the classes were gone from the code. Markdown is now excluded via `@source not`. Worth
      knowing: without that fix, every class name written into this file in phases 3–6 would ship.

## Phase 3 — Theme system (dark + light) ✅ done

Uncommitted at time of writing — under review.

- [x] **3.1 Model: light + dark, one accent.** The three hues are gone; `ThemeProvider.tsx` and
      `ThemeSelector.tsx` are deleted and `next-themes` (installed in phase 1) drives everything.
- [x] **3.2 Token set rebuilt in OKLCH**, but with **different names than proposed here**. The plan
      suggested `--bg` / `--text` / `--text-muted`; the implementation kept
      `--background` / `--foreground` / `--foreground-muted` / `--primary` / `--border` because
      (a) `text-foreground` was already used 28× and `border-border` 24×, so renaming was churn for
      nothing, and (b) Tailwind derives utility names from tokens, so `--color-text` would have
      produced the unreadable `text-text`.

      Full set: `--background`, `--surface`, `--surface-raised`, `--surface-sunken`,
      `--foreground`, `--foreground-muted`, `--foreground-faint`, `--border`, `--border-strong`,
      `--border-interactive`, `--primary`, `--primary-strong`, `--primary-contrast`, `--ring`.

      Cascade is `:root` (light) → `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`
      → `[data-theme="dark"]`. The `:not()` guard is what makes an explicit light choice survive on
      a dark-OS machine, and the media query is what makes the no-JS case work.
- [x] **3.3 All 17 `color-mix()` expressions removed** (they were only 6 distinct values). Verified:
      `color-mix` no longer appears anywhere in `src/`. Every `[var(--token)]` arbitrary class and
      every opacity-derived colour is gone too — the components now use plain semantic utilities.
- [x] **3.4 Contrast audited — and verified against the CSS the build actually emits**, not just the
      authored values. That distinction mattered: Lightning CSS re-converts `oklch()` to hex itself
      and produced e.g. `#0bffd1` where the author-time round-trip gave `#02ffd1`. **All 28 pairs
      pass AA** on the emitted output. Tightest margins: light `--primary` as text **4.90:1**,
      light `--foreground-faint` **4.72:1**, dark `--border-interactive` on surface **3.44:1**.

      Two deliberate calls: `--border` sits at ~1.4:1 and stays there, because WCAG 1.4.11 governs
      controls whose boundary is the only way to identify them, not decorative card edges — hence
      the separate `--border-interactive` for real controls. And the hardcoded `text-black` on
      primary buttons (3×) was a **latent bug**: legible only because the dark accent is near-white,
      it would have broken outright under the light accent. Now `--primary-contrast`.
- [x] **3.5 FOUC fixed** by `next-themes`' blocking script plus `suppressHydrationWarning` on
      `<html>`. Verified in the served HTML: no `data-theme` baked into SSR, and the inline script
      (`("data-theme","theme","system",null,["light","dark"],null,true,true)`) runs before `<nav>`.
- [x] **3.6 Persistence + system preference** come from the same script — `localStorage.getItem("theme")`
      falling back to `matchMedia("(prefers-color-scheme: dark)")`.
- [x] **3.7 Toggle shipped** as `src/components/ThemeToggle.tsx`. Two notes:
      it **swaps icons in CSS via a `dark:` variant** bound to the attribute with `@custom-variant`,
      rather than the usual `mounted` state — that pattern is a synchronous `setState` in an effect,
      exactly what `eslint-plugin-react-hooks@7` rejected in `Navbar.tsx` back in phase 1. And it is
      mounted **outside** the `isHome` gates, because the mobile menu only renders on the home page
      and the toggle would otherwise be unreachable on mobile everywhere else.
      Removing the old provider also cleared the unused `toggleTheme`, so **lint is now at 0
      warnings** (down from the 1 accepted in phase 2).
- [x] **3.8 Theme-aware chrome.** `themeColor` now ships per scheme via a `viewport` export — which
      also lands the `viewport` half of **4.8**; `colorScheme` is set there too. The webmanifest's
      stale `theme_color: "#00ffd1"` is now the dark background, so the standalone splash cannot
      flash a colour the app never shows.
- [x] **3.9 Scrollbar** now sets `scrollbar-color` / `scrollbar-width` for Firefox alongside the
      `::-webkit-` rules, both token-driven so they follow the theme.
- [x] **3.10 (new) Focus rings designed.** Controls had none. Buttons, nav links and the toggle now
      carry `focus-visible:outline-2 outline-offset-2 outline-ring`. Partially pre-empts **6.8**.
      While in the mobile menu button, added the `aria-expanded` / `aria-controls` that **4.15**
      asks for.

## Phase 4 — SEO corrections ✅ done

Uncommitted at time of writing — under review.

- [x] **4.1 Project pages were invisible to search.** The generated `sitemap-0.xml` held exactly two
      URLs; all five project pages were unlinked, and `generateStaticParams` was commented out so
      they were server-rendered on demand. Replaced `next-sitemap` with native
      `src/app/sitemap.ts` + `src/app/robots.ts` that **derive from the `projects` array**, so the
      sitemap cannot drift again. `generateStaticParams` restored. Verified: `/sitemap.xml` now
      returns **7 URLs** and the build reports all five project pages as `●` (SSG), not `ƒ`.

      **The blocker worth remembering:** `public/robots.txt`, `public/sitemap.xml` and
      `public/sitemap-0.xml` were committed to git, and a static file in `public/` **shadows** an
      App Router route of the same path. The new routes were dead until those were deleted — and it
      would have looked like it worked, just serving the stale two-URL sitemap.
      `next-sitemap`, its config and the `postbuild` script are all gone.
- [x] **4.2 Domain unified** behind `SITE_URL` in the new `src/lib/site.ts`, which also holds
      `SITE_NAME` / `AUTHOR` / `ROLE` / `TWITTER_HANDLE` / `SOCIAL_LINKS` and a `truncate()` helper.
      Verified zero non-`www` `fasilv.in` references in the served HTML.
- [x] **4.3 / 4.14 OG cards are now generated** with `next/og` (ships with Next 16, no new
      dependency): `opengraph-image.tsx` at the root, on `/projects`, and per project. All three
      verified returning **HTTP 200, `image/png`, 1200×630**.

      Two findings the original notes did not have: `logo.png` is actually **831×814**, yet the
      metadata declared it `1200×630` — every social share was handed wrong dimensions. And
      `via.placeholder.com` is **confirmed dead** (request times out). Both are gone; the
      hand-written `openGraph.images` arrays were removed so the file-based convention is the only
      source.

      *Gotcha for later:* Satori requires an explicit `display` on any element with more than one
      child — `{projects.length} full-stack builds` counts as two and failed the build until it was
      made a single interpolated string. Every div in those files now sets `display` explicitly.
- [x] **4.4 Canonicals added** to `/projects` and `/projects/[id]`; verified on every route.
- [x] **4.5 Manifest linked** via `metadata.manifest`. It existed but nothing referenced it.
- [x] **4.6 Title template** in place. Verified: `"Projects | Fasil Valiyattil"`,
      `"CineSnap | Fasil Valiyattil"` — no doubled suffixes. Root is now
      `"Fasil Valiyattil — Full-Stack Developer"` instead of the bare name.
- [x] **4.7 OG gaps filled**: `siteName`, `locale`, `url`, `twitter.creator`, and an explicit
      `robots` block with the `googleBot` directives.
- [x] **4.8 `viewport` complete** — phase 3 added `themeColor` / `colorScheme`; `width` and
      `initialScale` added here.
- [x] **4.9 JSON-LD server-rendered** as a plain `<script type="application/ld+json">` instead of
      `next/script` with `afterInteractive`; `next/script` is no longer imported. `Person` gained
      `worksFor` and `knowsAbout`, `WebSite` added at the root, and project pages carry
      `BreadcrumbList` + `SoftwareApplication`. Verified in the server HTML: 2 blocks on `/`, 4 on a
      project page.
- [x] **4.10 `robots.txt` is one group** now. The `Disallow: /404` rule was dropped rather than
      kept — App Router has no `/404` route, so it protected nothing; 4.11 handles noindex properly.
- [x] **4.11 Both 404 pages** have `title` and `robots: { index: false }`.
- [x] **4.12 Real descriptions** written for `/` and `/projects`, naming the actual stack; the
      literal `"..."` placeholders are gone. Detail pages truncate `project.description` to 160.
- [x] **4.13 Heading hierarchy flattened.** The hero tagline became a `<p>` (it was an `h2`
      competing with every section heading) and the experience cards moved `h5`/`h6` → `h4`/`h5`.
      Verified order is now `h1 → h2 → h3 → h4 → h5` with no skipped levels.
- [x] **4.15 Accessibility**: skip-to-content link added as the first focusable element targeting
      `<main id="main">` (added on every page); the decorative `👨‍💻` is now `aria-hidden`. The
      `aria-expanded` / `aria-controls` part was already done in phase 3.

**One thing to confirm on the real deploy:** locally, `next start` renders `og:image` with a
`localhost:3000` origin, because Next falls back to a local metadata base when it re-renders
metadata at request time. The **prerendered artifacts are correct** — `.next/server/app/index.html`
and each project page carry `https://www.fasilv.in/...`, with and without Vercel env vars set — and
those are what a deploy serves. Still worth spot-checking a live social card after deploying.

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
- [ ] **7.4 Project screenshots** — 2.6 was deferred here in full. Blocking for both UI and SEO.
      Note the existing commented-out `image:` values are all the *same* istockphoto stock photo, so
      they are placeholders to delete, not content to restore. `next.config.ts` still allowlists
      that host and can be dropped once real (local) screenshots land.
- [ ] **7.5 Two different `Project` interfaces** exist: one in `data/projects.ts`, one in
      `data/experience.ts`. Rename the latter (`ExperienceProject`) to avoid import confusion.
      Also: **`Project.logo` is a dead field** — every project sets it to `/api/placeholder/300/200`,
      a route that does not exist, and no component ever reads it. Kept deliberately in phase 2;
      delete it here unless a use appears in phase 5.
- [ ] **7.6 About copy** is generic ("Curiosity drives me to keep learning"). Rewrite with
      specifics — the fintech domain work is genuinely differentiating and is currently buried.
- [ ] **7.7 Add a downloadable resume** at `public/resume.pdf` with a hero CTA.

## Phase 8 — Verification

- [ ] **8.1** `npm run build` + `npm run lint` clean. Note there is no longer a `postbuild` step —
      phase 4 removed `next-sitemap`, so the sitemap is a route, generated during the build itself.
- [ ] **8.2** Lighthouse on `/`, `/projects`, `/projects/[id]` — target 95+ across the board,
      in **both** themes.
- [ ] **8.3** Validate structured data (Google Rich Results Test) and the OG/Twitter cards
      (opengraph.xyz).
- [ ] **8.4** Keyboard-only pass + screen-reader pass on the nav, theme toggle and cards.
- [ ] **8.5** Re-submit the sitemap in Google Search Console — the project URLs are included as of
      4.1. The URL is unchanged (`/sitemap.xml`) but it is now a route rather than a static file, so
      confirm Search Console fetches all 7 URLs.
- [ ] **8.6** Check `tsconfig.tsbuildinfo` (94 KB, at repo root) is genuinely ignored — `.gitignore`
      covers `*.tsbuildinfo`, so just confirm it was never committed.

---

### Suggested commit slicing

`0 → 1 → 2` in one PR (toolchain + fixes, no visual change), `3` (theme), `4` (SEO),
`5 + 6` (the visible rewrite), `7` (content), `8` (verification). Keeping the SEO work in its own
commit means you can point Search Console at a specific deploy if rankings move.
