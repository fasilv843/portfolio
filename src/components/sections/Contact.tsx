import Section from "@/components/ui/Section";
import CopyEmail from "@/components/CopyEmail";
import { EMAIL } from "@/lib/site";

export default function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      title="Get In Touch"
      lead="Have a project in mind, a question, or just want to say hello? I'd love to hear from you."
    >
      {/* No form: the address itself is the call to action, at display scale. */}
      <div data-reveal className="flex flex-col items-start gap-6">
        <a
          href={`mailto:${EMAIL}`}
          className="font-display text-foreground hover:text-primary focus-visible:outline-ring text-3xl break-all transition duration-200 underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-4xl md:text-5xl"
        >
          {EMAIL}
        </a>
        <CopyEmail email={EMAIL} />
      </div>
    </Section>
  );
}
