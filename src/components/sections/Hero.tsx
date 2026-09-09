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

          <div
            data-animate
            className="mt-10 flex flex-wrap gap-3 [animation-delay:280ms]"
          >
            <Button href={`mailto:${EMAIL}`} label="Get in touch" size="lg" />
            <Button
              href="https://github.com/fasilv843"
              label="GitHub"
              color="outline"
              size="lg"
            />
            <Button
              href="https://linkedin.com/in/fasilv843"
              label="LinkedIn"
              color="outline"
              size="lg"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div
            data-animate
            className="border-border relative mx-auto aspect-[4/5] w-56 overflow-hidden rounded-sm border [animation-delay:140ms] sm:w-64 lg:mx-0 lg:w-full"
          >
            <Image
              src="/portrait.jpg"
              alt={`${AUTHOR}, ${ROLE}`}
              fill
              priority
              sizes="(min-width: 1024px) 22rem, 16rem"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
