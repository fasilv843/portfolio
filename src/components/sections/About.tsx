import Section from "@/components/ui/Section";

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      {/* No card wrapper — rule 2. The measure does the containing. */}

      {/* ---------------------------------------------------------------
          COPY SLOT — replace the two paragraphs below.

          What is weak about the current text: the second paragraph says
          nothing specific ("Curiosity drives me to keep learning"), and the
          genuinely differentiating work is buried. The concrete material is
          already in the repo, in src/data/experience.ts:

            - FiChecks — an Angular check-payment platform: issuance,
              deposits, payment status tracking, validation-heavy reactive
              forms.
            - Finogates — a fintech API platform exposing financial data and
              payment APIs to third-party developers; React console with
              TanStack Query, FastAPI services behind it.
            - Aquacodes — multi-tenant employee monitoring with real-time
              activity tracking, and a Puppeteer scraping tool.

          Keep it to two paragraphs so the measure and rhythm hold.
      --------------------------------------------------------------- */}
      <div
        data-reveal
        className="text-foreground-muted max-w-[68ch] space-y-6 text-lg leading-relaxed text-pretty"
      >
        <p>
          I&apos;m a full-stack developer who builds reliable, scalable systems
          across the stack — Angular and React on the front end, Node.js on the
          back. Most recently I&apos;ve worked on fintech products, where
          correctness and careful handling of edge cases matter as much as the
          features themselves.
        </p>
        <p>
          Beyond coding, I like diving into challenges that push me to think
          differently, explore new tools, and refine my problem-solving skills.
          Curiosity drives me to keep learning and improving as I grow as a
          developer.
        </p>
      </div>
    </Section>
  );
}
