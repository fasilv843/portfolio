import Image from "next/image";
import Button from "@/components/Button";
import { AUTHOR, EMAIL, ROLE } from "@/lib/site";

/**
 * The one section that does not use <Section>: it is full-height and carries no
 * numbered eyebrow, because it is the masthead rather than an entry in the spine.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-svh scroll-mt-24 items-center px-6 py-28"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
        {/* One considered sequence on first paint. data-animate is defined in
            globals.css and is fully disabled under prefers-reduced-motion. */}
        <div className="order-2 lg:order-1">
          <p
            data-animate
            className="text-foreground-faint font-mono text-xs tracking-[0.2em] uppercase"
          >
            {ROLE}
          </p>

          <h1
            data-animate
            className="font-display text-display text-foreground mt-6 text-balance [animation-delay:80ms]"
          >
            {AUTHOR}
          </h1>

          <p
            data-animate
            className="text-foreground-muted text-lead mt-7 max-w-[46ch] text-pretty [animation-delay:180ms]"
          >
            I build fintech systems where correctness is the feature — payments,
            ledgers and the edge cases around them — across Angular, React and
            Node.js.
          </p>

          {/* Three lg buttons wrap onto two rows on a narrow screen. Below sm we
              drop to the two that matter — the CTA and LinkedIn — and step the
              padding back down to md sizing, so the row stays on one line. */}
          <div
            data-animate
            className="mt-10 flex flex-wrap gap-3 [animation-delay:280ms]"
          >
            <Button
              href={`mailto:${EMAIL}`}
              label="Get in touch"
              className="sm:px-7 sm:py-3.5 sm:text-lg"
            />
            <Button
              href="https://github.com/fasilv843"
              label="GitHub"
              color="outline"
              className="max-sm:hidden sm:px-7 sm:py-3.5 sm:text-lg"
            />
            <Button
              href="https://linkedin.com/in/fasilv843"
              label="LinkedIn"
              color="outline"
              className="sm:px-7 sm:py-3.5 sm:text-lg"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          {/* Deliberately NOT data-animate. This is the LCP element, and the
              entrance animation holds it at opacity 0 through its delay
              (fill-mode backwards) — LCP only counts a real paint, so animating
              it cost ~3s of render delay in Lighthouse for a 30KB image that
              had already finished downloading. The text still staggers. */}
          <div className="border-border relative mx-auto aspect-[4/5] w-56 overflow-hidden rounded-sm border sm:w-64 lg:mx-0 lg:w-full">
            <Image
              src="/portrait.jpg"
              alt={`${AUTHOR}, ${ROLE}`}
              fill
              priority
              // `priority` emits the preload link but not the attribute itself,
              // and this is the LCP element — Lighthouse flags the missing hint.
              fetchPriority="high"
              // Must track the frame's own widths (w-56 / sm:w-64 / lg:w-full
              // inside a max-w-5xl column). Claiming 16rem at mobile made the
              // browser fetch a wider candidate than it renders.
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 16rem, 14rem"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
