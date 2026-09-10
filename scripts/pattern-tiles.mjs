/* Source of truth for the decorative background tiles.
 *
 *     npm run tiles
 *
 * Authors each tile as readable SVG, percent-encodes it, and rewrites the
 * --pattern-stack / --pattern-glyphs / --pattern-graph declarations in
 * globals.css in place. Edit the shapes here, never the encoded data URI: it
 * has to be one physical line, which makes it effectively uneditable by hand.
 *
 * Three constraints the tiles must respect, each of which fails silently at
 * runtime rather than erroring:
 *
 * 1. No background <rect>. Masks read alpha, so an opaque tile passes the
 *    whole mask and paints a solid slab of colour over the section.
 * 2. No '#' anywhere. Inside a data URI it opens a URL fragment and truncates
 *    the rest of the SVG, so colours are written `black`, never a hex. The
 *    colour is irrelevant regardless — only alpha reaches the mask, and the
 *    paint comes from --pattern-color.
 * 3. Every mark's centre stays clear of the tile edge. A mark clipped at the
 *    seam is the one thing in a repeating pattern that reads as a mistake.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const enc = (s) =>
  s
    .replace(/%/g, "%25") // must be first
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/"/g, "%22")
    .replace(/#/g, "%23")
    .replace(/\s+/g, "%20");

const svg = (w, h, body) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round'>${body}</svg>`;

/* place(mark, x, y, rot, scale) — marks are all drawn centred on 0,0 in a
   ~40-unit box, so they can be scattered without re-authoring coordinates. */
const place = (mark, x, y, rot, s = 1) =>
  `<g transform='translate(${x} ${y}) rotate(${rot}) scale(${s})'>${mark}</g>`;

/* ------------------------------------------------------------------ marks */

const react = `
  <g stroke-width='2.2'>
    <ellipse rx='18' ry='6.9'/>
    <ellipse rx='18' ry='6.9' transform='rotate(60)'/>
    <ellipse rx='18' ry='6.9' transform='rotate(120)'/>
  </g>
  <circle r='3.5' fill='black' stroke='none'/>`;

const angular = `
  <g stroke-width='2.4'>
    <path d='M0 -18 L16 -12.5 L13.4 10 L0 18 L-13.4 10 L-16 -12.5 Z'/>
    <path d='M-5.6 7 L0 -8.4 L5.6 7'/>
    <path d='M-3.2 1.6 L3.2 1.6'/>
  </g>`;

const node = `
  <g stroke-width='2.4'>
    <path d='M0 -18 L15.6 -9 L15.6 9 L0 18 L-15.6 9 L-15.6 -9 Z'/>
    <path d='M-5.5 -4 L-5.5 6 A4 4 0 0 1 -13 6'/>
    <path d='M13 -3 A5 4 0 0 0 3 -2 A5 4 0 0 0 13 1 A5 4 0 0 1 3 3'/>
  </g>`;

/* Whale: container grid over a hull. Reads as Docker in silhouette without
   the real logo's spout-and-tail detail, which vanishes at this opacity. */
const docker = `
  <g stroke-width='2.0'>
    <rect x='-16' y='-4' width='7' height='7'/>
    <rect x='-7.5' y='-4' width='7' height='7'/>
    <rect x='1' y='-4' width='7' height='7'/>
    <rect x='-7.5' y='-12.5' width='7' height='7'/>
    <rect x='1' y='-12.5' width='7' height='7'/>
    <path d='M-19 5.5 h38 a9 9 0 0 1 -9 9 h-20 a9 9 0 0 1 -9 -9 Z'/>
  </g>`;

const mongo = `
  <path fill='black' stroke='none'
        d='M0 -19 C7.5 -11 12 -3.5 12 4 C12 12 6 17.5 1.6 19.5
           L1.6 12 L-1.6 12 L-1.6 19.5 C-6 17.5 -12 12 -12 4
           C-12 -3.5 -7.5 -11 0 -19 Z'/>`;

const redis = `
  <g stroke-width='2.4'>
    <ellipse cy='-9' rx='16' ry='5.2'/>
    <path d='M-16 -9 v6 a16 5.2 0 0 0 32 0 v-6'/>
    <path d='M-16 0 v6 a16 5.2 0 0 0 32 0 v-6'/>
    <path d='M-16 9 v5 a16 5.2 0 0 0 32 0 v-5'/>
  </g>`;

const git = `
  <g stroke-width='2.4'>
    <path d='M-10 14 L-10 -14'/>
    <path d='M-10 3 C-10 -4 2 -3 8 -6'/>
    <circle cx='-10' cy='14' r='3.6' fill='black' stroke='none'/>
    <circle cx='-10' cy='-14' r='3.6'/>
    <circle cx='10' cy='-8' r='3.6'/>
  </g>`;

const tailwind = `
  <g fill='black' stroke='none'>
    <path d='M-17 -6 C-13.6 -13.2 -9.3 -16 -4.3 -16 C3.4 -16 4.3 -10.3 8.1 -8.9
             C10.7 -7.9 12.9 -8.8 15 -11.5 C11.6 -4.3 7.3 -1.5 2.3 -1.5
             C-5.4 -1.5 -6.3 -7.2 -10.1 -8.6 C-12.7 -9.6 -14.9 -8.7 -17 -6 Z'/>
    <path d='M-17 10 C-13.6 2.8 -9.3 0 -4.3 0 C3.4 0 4.3 5.7 8.1 7.1
             C10.7 8.1 12.9 7.2 15 4.5 C11.6 11.7 7.3 14.5 2.3 14.5
             C-5.4 14.5 -6.3 8.8 -10.1 7.4 C-12.7 6.4 -14.9 7.3 -17 10 Z'/>
  </g>`;

const prisma = `
  <g stroke-width='2.4'>
    <path d='M-3 -19 L13 11.5 L-13.5 17.5 Z'/>
    <path d='M-3 -19 L-5.5 9.5'/>
  </g>`;

/* ----------------------------------------------------------------- glyphs */

const braces = `
  <g stroke-width='2.6'>
    <path d='M-5 -14 C-10 -14 -8 -3 -13 0 C-8 3 -10 14 -5 14'/>
    <path d='M5 -14 C10 -14 8 -3 13 0 C8 3 10 14 5 14'/>
  </g>`;

const codeTag = `
  <g stroke-width='2.6'>
    <path d='M-6 -8 L-14 0 L-6 8'/>
    <path d='M-2 10 L2 -10'/>
    <path d='M6 -8 L14 0 L6 8'/>
  </g>`;

const arrow = `
  <g stroke-width='2.6'>
    <path d='M-14 -3 L2 -3'/>
    <path d='M-14 3 L2 3'/>
    <path d='M6 -6 L13 0 L6 6'/>
  </g>`;

const semicolon = `
  <g stroke-width='2.6'>
    <circle cy='-7' r='1.9' fill='black' stroke='none'/>
    <circle cy='4' r='1.9' fill='black' stroke='none'/>
    <path d='M0.8 5.4 C1.4 9 -0.4 11.4 -2.8 12.8'/>
  </g>`;

const prompt = `
  <g stroke-width='2.6'>
    <path d='M-12 -7 L-4 0 L-12 7'/>
    <path d='M-1 8 L12 8'/>
  </g>`;

const parens = `
  <g stroke-width='2.6'>
    <path d='M-6 -13 C-12 -7 -12 7 -6 13'/>
    <path d='M6 -13 C12 -7 12 7 6 13'/>
  </g>`;

const brackets = `
  <g stroke-width='2.6'>
    <path d='M-4 -13 L-11 -13 L-11 13 L-4 13'/>
    <path d='M4 -13 L11 -13 L11 13 L4 13'/>
  </g>`;

const slashes = `
  <g stroke-width='2.6'>
    <path d='M-7 10 L-1 -10'/>
    <path d='M3 10 L9 -10'/>
  </g>`;

const diamond = `
  <g stroke-width='2.6'>
    <path d='M-12 0 L0 -11 L12 0 L0 11 Z'/>
  </g>`;

/* ------------------------------------------------------------------ tiles */

/* Marks, 360px. Every centre stays 24-336 so no mark is clipped by the tile
   edge — a half-whale at the seam is the one thing that reads as a mistake.
   Rows are jittered in y and the columns are offset per row, so the 4x4 the
   positions are derived from never surfaces as visible rows or columns. */
const stack = svg(
  360,
  360,
  [
    place(react, 50, 44, -12),
    place(docker, 148, 70, 8, 1.05),
    place(prisma, 250, 40, -20, 0.9),
    place(angular, 330, 92, 14, 0.8),

    place(tailwind, 32, 150, 14, 1.05),
    place(mongo, 134, 172, -8, 0.85),
    place(node, 232, 142, 16, 0.95),
    place(redis, 322, 188, -18, 0.8),

    place(git, 64, 252, 10, 0.95),
    place(react, 166, 274, 22, 0.75),
    place(docker, 262, 246, -12, 0.85),
    place(prisma, 336, 292, 8, 0.75),

    place(angular, 44, 332, -6, 0.8),
    place(mongo, 240, 336, 18, 0.7),
  ].join(""),
);

/* Glyphs, 290px. Coprime with 360 so the combined repeat period is 10440px —
   longer than any section, so the eye never finds the seam. Carried at a
   higher count than the marks: the brief is a developer's wall, and too many
   recognisable logos tips it into looking like a sponsor page. */
const glyphs = svg(
  290,
  290,
  [
    place(braces, 44, 38, -10),
    place(codeTag, 130, 56, 12),
    place(arrow, 222, 34, -6),
    place(semicolon, 272, 96, 8),

    place(slashes, 30, 118, 14),
    place(parens, 112, 140, -14),
    place(prompt, 200, 118, 10),
    place(brackets, 268, 176, -8),

    place(diamond, 40, 210, 16, 0.85),
    place(codeTag, 126, 232, -12, 0.9),
    place(braces, 212, 244, 8, 0.85),
    place(arrow, 62, 274, -16, 0.8),
  ].join(""),
);

/* Git graph, 240px. Lanes run the full height so the tile is seamless
   vertically; every curve and node stays inside the box. */
const graph = svg(
  240,
  240,
  `<g stroke-width='2.4'>
     <path d='M48 0 L48 240'/>
     <path d='M120 0 L120 240'/>
     <path d='M192 0 L192 240'/>
     <path d='M48 132 C48 108 120 116 120 92'/>
     <path d='M120 196 C120 216 192 208 192 228'/>
     <path d='M192 60 C192 40 120 48 120 28'/>
   </g>
   <g fill='black' stroke='none'>
     <circle cx='48' cy='36' r='4'/>
     <circle cx='48' cy='132' r='4'/>
     <circle cx='48' cy='204' r='4'/>
     <circle cx='120' cy='28' r='4'/>
     <circle cx='120' cy='92' r='4'/>
     <circle cx='120' cy='196' r='4'/>
     <circle cx='192' cy='60' r='4'/>
     <circle cx='192' cy='152' r='4'/>
     <circle cx='192' cy='228' r='4'/>
   </g>`,
);

/* ----------------------------------------------------------------- rewrite */

const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, "..", "src", "app", "globals.css");

let css = readFileSync(target, "utf8");

for (const [name, art] of [
  ["stack", stack],
  ["glyphs", glyphs],
  ["graph", graph],
]) {
  const encoded = enc(art.trim());
  if (encoded.includes("#")) throw new Error(`unescaped # in ${name}`);

  // Anchored on the declaration name, not the value: the value is exactly what
  // is being replaced, so it must not take part in the match. Built by
  // concatenation rather than a template literal — in a template literal the
  // parens would need doubled backslashes, and getting that wrong silently
  // turns them into capture groups that never match.
  const re = new RegExp("(--pattern-" + name + ': )url\\("[^"]*"\\);');
  if (!re.test(css))
    throw new Error(`no --pattern-${name} declaration in globals.css`);

  css = css.replace(re, `$1url("data:image/svg+xml,${encoded}");`);
  console.log(`${name.padEnd(7)} ${String(encoded.length).padStart(5)} bytes`);
}

writeFileSync(target, css);
console.log(
  "\nglobals.css updated. Run `npx prettier --write` on it if needed.",
);
