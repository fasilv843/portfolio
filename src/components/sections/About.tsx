import Section from "@/components/ui/Section";

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      {/* No card wrapper — rule 2. The measure does the containing. */}
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
