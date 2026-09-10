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

## Phase 5 — UI rewrite ✅ done

Landed as a single commit. The direction and the three open design questions were settled with
the site owner before any CSS was written; those decisions are recorded in 5.1 and are not to be
re-litigated.

- [x] **5.1 Direction chosen: editorial / typographic.** Five rules, which every later change was
      checked against:

      1. **Type carries hierarchy, not boxes.**
      2. **Rules over borders** — hairlines and whitespace, no decorated edges.
      3. **One accent, used sparingly** — links, section index, focus rings. No gradients.
      4. **A numbered spine** — a mono index per section. Uses `font-mono`, which falls back to
         the system stack, so this costs no font download (see 2.2).
      5. **One measure** — one container width everywhere; prose narrows with `max-w-[68ch]`
         *inside* it, never by changing the container.

      Also decided: **Instrument Serif** as a display face for headings only; the hero photo at an
      editorial **4:5 crop**; skill logos **kept but desaturated at rest**; contact is a **mailto
      CTA, no form**; and **no new sections** beyond 5.13.
- [x] **5.2 Typography.** Instrument Serif added via `next/font/google` (single weight, latin
      subset, `display: swap`) with its variable on **`<html>`** alongside Inter's — the placement
      2.2 fixed, since `@theme` reads them at `:root`. Fluid `--text-display` / `--text-title` /
      `--text-lead` in the non-inline `@theme` block, each with its own line-height and tracking.
      `text-balance` / `text-pretty` are Tailwind built-ins, so 5.2's wrapping ask needed no CSS.
- [x] **5.3 One measure, enforced by `components/ui/Section.tsx`.** The container width is decided
      in exactly one place. `body`'s 135° gradient is now flat (rule 2), and `.gradient-text` /
      `.gradient-border` are deleted — verified absent from the emitted CSS.
- [x] **5.4 Hero rebuilt.** Real portrait at `aspect-[4/5]`, `object-top`, via `next/image` with
      `priority` (a JPEG, so the 2.1 SVG restriction does not apply). Value proposition now names
      the fintech work, which 7.6 notes was buried. **No resume CTA** — `public/resume.pdf` does
      not exist and a 404 button is worse than none. Still 7.7.
- [x] **5.5 `page.tsx` 272 → 20 lines.** Six section components under `components/sections/`, plus
      `Footer`, behind three primitives in `components/ui/`: `Section`, `Card`, `Tag`. The chip
      markup was written out **five** times, not four. `SectionHeading` was folded into `Section`
      rather than made its own component — it has no independent use.
- [x] **5.6 Skills.** Logos kept, `grayscale opacity-60` at rest and full colour on hover; still a
      plain `<img>` per 2.1. Added a **monogram fallback** for the four skills with `logo: ""`,
      which **closes 7.2** as a side effect.
- [x] **5.7 Project cards.** `line-clamp-3` **verified rendering** in the built CSS (v4 ships
      line-clamp in core). Live/source links surfaced on the card; the title is a stretched link
      so the whole card is clickable but keyboard users get one tab stop, not three. Grid is 2-up
      at the shared width and featured count went 3 → **4** so the grid is even.
- [x] **5.8 Experience — the original premise here was stale.** Phase 3 had already removed the
      `color-mix` hacks; `shadow-[0_0_0_4px]` was token-driven and worked in light mode. The real
      problem was depth: a card inside a card inside a rail is three borders deep. Now hairline
      rows, with duration/location as a mono eyebrow.
- [x] **5.9 Project detail.** One **sticky** sidebar replaces two copies of the same buttons.
      Features render in two columns — genuine semantic grouping needs the data to carry
      categories, which is a phase 7 change, not a layout fix.
- [x] **5.10 Contact** is the address itself at display scale plus copy-to-clipboard
      (`CopyEmail.tsx`, with an `aria-live` confirmation). This also lands the copy-email half of
      **6.8**.
- [x] **5.11 Footer** has a dynamic year, "built with" + repo link, and social links from a new
      `SOCIALS` array in `lib/site.ts`. `SOCIAL_LINKS` is now **derived** from it, so the JSON-LD
      `sameAs` array cannot drift from what is on screen.
- [ ] **5.12 Not done, deliberately.** Scope held to a rewrite rather than an expansion.
- [x] **5.13** `app/loading.tsx`, `app/error.tsx` (client, per React's requirement, and it logs
      `error.digest` so a user-visible failure ties back to a server log).
- [x] **5.14 (new) Two accidental client components removed.** `Button` carried `"use client"`
      only for an optional `onClick`, and `ProjectCard` was client **purely because it imported
      `Button`** — which dragged the entire project grid into the client bundle on `/`,
      `/projects` and all five detail pages. Neither needs it. `Button` also learned to route
      external / `mailto:` / hash hrefs through a plain `<a>`; that gap is what had forced **six**
      hand-written anchors it was supposed to replace.
- [x] **5.15 (new) `/projects` was skipping a heading level.** Cards hardcoded `h3` while sitting
      directly under the page `h1` with no `h2` between. `ProjectCard` now takes `headingLevel`.
      Caught by walking the served HTML, not by lint — worth repeating on any new page.

## Phase 6 — Animation ✅ done (6.7 deferred)

Landed as one commit after phase 5. No JS animation runtime entered the tree: every effect is a
Tailwind utility or a CSS keyframe, and both scroll-driven effects use scroll timelines rather
than an observer.

- [x] **6.1 Easings as tokens**, `--ease-out-quart` and `--ease-spring`, in the non-inline
      `@theme` block — v4 has an `--ease-*` namespace, so they generate `ease-*` utilities
      directly. **There is no `--duration-*` namespace**; do not invent one. Durations
      standardise on the built-in `duration-150` / `200` / `400` as a convention.
- [x] **6.2 Reduced motion — landed in the same commit as the first animation, not after.**
      The blanket `*` rule **on its own is a trap**: anything that starts at `opacity: 0` and
      relies on an animation to become visible stays *permanently invisible* once that animation
      is neutralised. So `[data-reveal]`, `[data-reveal-group] > *` and `[data-animate]` are also
      explicitly reset to their final state inside the same query. Verified in the emitted CSS.
- [x] **6.3 Scroll reveal is `animation-timeline: view()` behind `@supports`** — and **no
      `IntersectionObserver` fallback**, deliberately. `@supports` is what makes this safe:
      unsupported browsers render the content statically, so there is no flash of hidden content
      and no client component. A JS fallback would reintroduce both for a decorative effect.

      One structural note: sections apply `data-reveal` to **their own** content rather than
      inheriting it from `Section`, so a reveal *group* never nests inside a revealing wrapper
      and compounds the fade.
- [x] **6.4 Hero entrance** — staggered `[animation-delay:*]` across role → name → photo → lead →
      CTAs, `backwards` fill so nothing flashes in before its turn.
- [x] **6.5 Navbar.** Scrollspy is now **one `IntersectionObserver`** with a `rootMargin` band,
      replacing the rAF scroll listener. `heroInView` state is gone entirely — brand visibility
      derives from `activeId` during render, which is also what keeps
      `eslint-plugin-react-hooks@7` happy (see 1.3). Mobile menu animates via
      `grid-template-rows: 0fr → 1fr`, which reaches the content's natural height without a magic
      `max-height`, and carries **`inert`** while collapsed so its links stay out of the tab order.
- [x] **6.6 Card hover unified** — lift + border-strong + image zoom on one curve. The mismatched
      `hover:scale-105` / `scale-[1.02]` pair is gone.
- [ ] **6.7 View Transitions — deliberately deferred.** It needs `experimental.viewTransition` in
      `next.config.ts`, and it is the one item that can be added or dropped without unpicking
      anything else. Worth doing once real project screenshots land (7.4) — the shared element is
      much more convincing with an image than with a letter placeholder.
- [x] **6.8 Micro-interactions.** Scroll-progress rule on the nav edge via
      `animation-timeline: scroll()` (pure CSS). Copy-email confirmation shipped in 5.10. Focus
      rings were already designed in 3.10.

      **The theme-toggle "morph" was not built, on purpose.** `ThemeProvider` runs with
      `disableTransitionOnChange`, which suppresses every transition for the frame in which the
      theme flips — so an animated cross-fade on the swap would be classes that can never fire.
      The icon rotates on **hover** instead, which is unaffected.
- [x] **6.9 `transition-all` eliminated.** Worth knowing: the emitted CSS **still carried a
      `.transition-all` rule after the code was clean** — Tailwind v4 scans comments, and the
      comments *explaining* the change were generating it. Exactly the 2.8 trap, but inside
      `.tsx` rather than markdown. Never write a bare class name in a comment.

## Phase 7 — Content ✅ done (7.4, 7.6, 7.7 open by decision)

Cut down by explicit decision: screenshots, the resume CTA and the skill-list expansion are out,
the Paywint dates are correct as written, and the About wording stays the owner's to write. What
executed was dead-code removal.

- [ ] **7.1 `src/data/skills.ts`** — ~15 skills sit commented out (TypeScript, Next.js, Python,
      FastAPI, Kafka, gRPC, Kubernetes, Grafana, Prometheus…). Notably **TypeScript and Next.js are
      hidden** while the site itself is built with both. Decide the real list.
- [x] **7.2 Closed in 5.6.** `TanStack Query`, `WebRTC`, `TypeORM` and `CI/CD` now render a
      bordered monogram square at the same 20px footprint as the real icons, so the column no
      longer has ragged rows. Nothing left to do here unless the skill list changes in 7.1.
- [x] **7.3 Confirmed correct, no change.** The Paywint role genuinely ended Aug 2026; the fixed
      end date is intentional, not stale data.
- [ ] **7.4 Project screenshots — skipped by decision, still open.** The commented `image:` values
      were all the *same* istockphoto stock photo, so they were placeholders to delete, not content
      to restore; they are now **deleted**, along with five identical commented `demoUrl:` lines
      that all pointed at the same rickroll YouTube embed. The optional `image?` and `demoUrl?`
      fields survive, so real screenshots can land later with no other change. Until they do, cards
      show a typographic letter placeholder. **This is what keeps 6.7 deferred** — a shared-element
      view transition on a letter is not worth the experimental flag.
- [x] **7.5 Both halves done.** `Project.logo` is gone — field and all five `/api/placeholder/300/200`
      values; `tsc --noEmit` passing is the proof nothing read it. The colliding interface in
      `experience.ts` is now `ExperienceProject`, with **zero call-site churn**: it was exported and
      never imported anywhere.
- [ ] **7.6 About copy — yours to write.** The words are untouched by request. `About.tsx` now
      carries an explicit COPY SLOT comment naming what is weak (the second paragraph says nothing
      specific) and listing the concrete material already sitting in `experience.ts`: FiChecks,
      Finogates, the Aquacodes multi-tenant monitoring work.
- [ ] **7.7 Resume — skipped by decision.** No `public/resume.pdf` exists and shipping a 404 button
      is worse than shipping none.
- [x] **7.8 (new) `next.config.ts` is now empty.** `images.remotePatterns` allowlisted
      `media.istockphoto.com` and nothing else; with the commented URLs deleted in 7.4 it was config
      pointing at a third-party host for no reason.

### 7.1 detail worth keeping

Re-enabling any commented-out skill **except `JWT` and `Lambda`** requires a new SVG in
`public/icons/` — the other 12 reference files that do not exist (`typescript.svg`, `nextjs.svg`,
`python.svg`, `kubernetes.svg`, …). The 22 icons that do exist are the 22 that are active.

## Phase 8 — Verification ✅ done (8.5 and the deploy checks are yours)

Run against a real headless Chrome and a production build, not assumed. Everything below is a
measured result; where a number is an artifact of running on localhost, it says so.

- [x] **8.1 Clean.** Lint 0 warnings, build green, five project pages `●` (SSG), `/sitemap.xml`
      7 URLs, `/opengraph-image` 200 `image/png`. No `postbuild` step exists — phase 4 removed
      `next-sitemap`, so the sitemap is generated during the build itself.
- [x] **8.2 Lighthouse run** (`npx lighthouse@12`, headless, against `next start` on localhost):

      | route | perf | a11y | best-practices | SEO |
      | ----- | ---- | ---- | -------------- | --- |
      | `/`                   | 84 | **100** | 96 | **100** |
      | `/projects`           | **97** | **100** | 96 | **100** |
      | `/projects/cinesnap`  | 89 | **100** | 96 | **100** |

      **best-practices 96 is a local-only artifact**: the only failures are two 404s for
      `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js`, which exist only on
      Vercel. Expect 100 on the deploy.

      **Performance did not hit 95 on `/` and needs re-measuring on the real deploy.** Every route
      — including the two whose LCP element is a plain `<p>` — reports 2–3 s of LCP **render
      delay** with `Load Time 0`, so the bottleneck is simulated main-thread work on a localhost
      Node server, not delivery. Total page weight is 316 KiB and CLS is 0.

      Three genuine defects were found and fixed on the way:
      - The LCP element had **no `fetchpriority` hint**. `priority` on `next/image` emits the
        preload link but not the attribute; Lighthouse checks for the attribute. Now explicit
        (`priorityHinted: true` confirmed after).
      - **`sizes` overstated the mobile width** (`16rem` where the frame is `w-56`/14rem), so the
        browser fetched a wider candidate than it renders. Now tracks the real breakpoints.
      - **The hero entrance was animating the LCP element.** `data-animate` uses
        `animation-fill-mode: backwards`, which holds the portrait at `opacity: 0` through its
        delay — and LCP only counts a real paint. Removing it did not move the localhost number
        (render delay masks it there), but it is wrong on principle and *would* dominate LCP on a
        fast connection where render delay is small. The text still staggers; only the photo is
        exempt.
- [x] **8.3 Structured data validated locally.** All blocks parse, carry `@context`, and have their
      required fields: `Person` + `WebSite` on `/`; those plus `BreadcrumbList` +
      `SoftwareApplication` on a project page. Google's Rich Results Test and opengraph.xyz both
      need a public URL, so they stay in the post-deploy list below.
- [x] **8.4 Static half done.** Lighthouse accessibility is **100 on all three routes**. Heading
      order is unchanged from the phase-6 baseline with no skipped levels
      (`/` = 1,2,2,3,3,3,3,2,3,3,3,3,2,3,4,5,5,3,4,5,5,5,2). The real screen-reader pass is still
      yours.
- [ ] **8.5 Search Console** — re-submit `/sitemap.xml`. Path unchanged, but it is now a route
      rather than a static file, so confirm all 7 URLs are fetched.
- [x] **8.6 Confirmed.** `.gitignore:40` covers `*.tsbuildinfo` and `git ls-files` shows
      `tsconfig.tsbuildinfo` was never tracked. The file exists on disk and is correctly ignored.
- [x] **8.7 (new) Reduced motion verified for real — and the first two attempts lied.**

      Headless screenshots of an anchor-scrolled view came back blank, which looked exactly like
      the failure 6.2 warns about. It was not: the same blankness appeared with reduced motion
      **off**, so it was a capture-timing artifact — Chrome's `--screenshot` fires before the hash
      scroll settles and before a `view()` timeline has advanced.

      The real check reads **computed** opacity over CDP after scrolling each target into view:
      all **20** reveal targets resolve to `opacity: 1` in **both** modes, and
      `matchMedia('(prefers-reduced-motion: reduce)')` was confirmed `true` under the flag, so the
      guard genuinely engages.

      Two tooling notes for next time: `--blink-settings=preferredColorScheme=N` **does not work**
      — light and dark captures came out byte-identical; use CDP `Emulation.setEmulatedMedia`.
      And headless Chrome defaults to **dark**, which means the Lighthouse numbers above were
      measured in the dark theme.

### Still needs you

- Lighthouse **on the deploy**, and once in dark via the real toggle (the headless run exercises
  the `prefers-color-scheme` path, not an explicit `data-theme` choice from `localStorage`).
- Rich Results Test + opengraph.xyz against the public URL.
- A screen-reader pass. Static checks catch structure, not experience.
- **8.5** Search Console.
- **The phase-4 deploy check**: locally `next start` renders `og:image` with a `localhost:3000`
  origin while the prerendered artifacts are correct. Spot-check a real social card after deploying.

---

## Phase 9 — Decorative grounds ✅ done

A masked-SVG background system, and the assignment pass over it. Every tile is a **mask**, not
artwork: `mask-image` carries the shape and `background-color` carries the paint, so one tile
serves both themes and follows `--pattern-color`. `scripts/pattern-tiles.mjs` is the source of
truth for the three SVG tiles — edit shapes there and run `npm run tiles`, never the encoded
data URIs.

- [x] **9.1 The system.** Theme-scoped tokens (`--pattern-color`, `--pattern-opacity`,
      `--pattern-opacity-soft`, `--ground-opacity`), a page ground on `body::before`, a section
      ground on `[data-pattern]::before`, and a `pattern` prop on `Section`. Dark paints
      `--border-strong`, not `--foreground`: on a near-black background a white ground at 5%
      drags `--foreground-faint` to ~3.1:1, and the ceiling for white is ~1.2% — too faint to
      see. `--border-strong` raises that ceiling to ~20%, so 18% is both visible and safe, and
      lands within a couple of levels of what light's 7% does.
- [x] **9.2 Assignment.** Blueprint is the **page** ground on `body`, so every route has it —
      home, `/projects`, each detail page, 404, the error boundary. `graph` (branches and
      merges) is the project ground and appears on all three project surfaces. `stack` is
      Skills only. Experience gave up `graph` when Projects took it: two adjacent sections on
      the same ground stop telling each other apart.
- [x] **9.3 Contrast budget.** The budget is the **local** worst case — a text pixel sitting on
      a stroke — not the average. Light bottoms out on `--primary` as text at 4.90:1, which
      breaks 4.5:1 at about 7%. The blueprint dot stop is `rgba(0,0,0,0.65)` rather than opaque
      for exactly this reason: as the page ground its dots are the worst case for every line of
      type on the site, and 0.65 keeps that where the dot field it replaced sat.
- [x] **9.4 Legibility.** Cards need nothing — an opaque `bg-surface` hides the ground outright.
      For the places with no card there are two utilities: `.ground-plate`, a `--background`
      scrim with a radial mask so it has no findable edge, and `.ground-halo`, a
      `--background` text-shadow (plus a `drop-shadow` companion rule for logos). Skills gets
      both per column, patterned section headers and the project pages get the halo. The plate
      needs `isolation: isolate` — without it its negative-z pseudo joins the section's stacking
      context and races the section ground by tree order.
- [x] **9.5 Suppression.** Grounds, scrims **and** halos all drop under `print`,
      `forced-colors: active` and `prefers-contrast: more`. They go together: a halo with no
      pattern under it is a blur around every glyph, and forced colors remaps the scrim's
      background to a system colour, turning an invisible wash into a visible slab.

### Still needs you (phase 9)

- A look in **both** themes via the real toggle, particularly Skills — the plates should have no
  findable edge, and no stroke should cross a glyph.
- A judgement call on the page ground being viewport-**fixed**: the grid holds still while the
  content scrolls over it. That is the intent (a drafting desk), not a bug.

---

### Suggested commit slicing

`0 → 1 → 2` in one PR (toolchain + fixes, no visual change), `3` (theme), `4` (SEO),
`5` then `6` (the visible rewrite — shipped as two commits, the motion one landing the
reduced-motion guard alongside the first animation), `7` (content), `8` (verification), `9` (grounds — one
commit for the system and its assignment, since the tiles are meaningless without the sections that use them). Keeping the SEO work in its own
commit means you can point Search Console at a specific deploy if rankings move.
