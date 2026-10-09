import Link from "next/link";
import React from "react";
import CopyEmail from "@/components/CopyEmail";
import { LinkedInIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT_TOKEN } from "@/lib/chat/types";
import {
  EMAIL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  SITE_URL,
  WHATSAPP_URL,
} from "@/lib/site";

const linkClass =
  "text-primary underline underline-offset-2 hover:text-primary-strong focus-visible:outline-ring rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2";

function ChatLink({ href, children }: { href: string; children: string }) {
  // Links to this site navigate in place; everything else opens a new tab.
  const local = href.startsWith(SITE_URL)
    ? href.slice(SITE_URL.length) || "/"
    : href.startsWith("/") && !href.startsWith("//")
      ? href
      : null;

  if (local) {
    return (
      <Link href={local} className={linkClass}>
        {children}
      </Link>
    );
  }
  if (!/^(https?:|mailto:)/.test(href)) return <>{children}</>;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={linkClass}
    >
      {children}
    </a>
  );
}

// [label](url) | **bold** | bare URL. Rendered as React nodes, never as HTML,
// so nothing the model writes can inject markup.
const INLINE =
  /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+[^\s).,;:!?])/g;

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [, label, href, bold, bare] = match;
    if (label && href) {
      nodes.push(
        <ChatLink key={index} href={href}>
          {label.replace(/\*\*/g, "")}
        </ChatLink>,
      );
    } else if (bold) {
      nodes.push(
        // Recurse: the model often bolds a whole link, `**[Name](url)**`, and
        // the bold match wins because it starts first.
        <strong key={index} className="text-foreground font-semibold">
          {renderInline(bold)}
        </strong>,
      );
    } else if (bare) {
      nodes.push(
        <ChatLink key={index} href={bare}>
          {bare.replace(/^https?:\/\/(www\.)?/, "")}
        </ChatLink>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const rowLinkClass =
  "text-foreground hover:text-primary focus-visible:outline-ring inline-flex items-center gap-2 rounded-sm underline-offset-2 transition duration-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2";

const rowIconClass = "text-foreground-faint h-4 w-4 shrink-0";

/**
 * Contact channels in the order Fasil wants to be reached: email, WhatsApp,
 * LinkedIn. The footer's full SOCIALS list is deliberately not used here —
 * GitHub, X and Facebook are profiles, not ways to get in touch.
 */
function ContactCard() {
  return (
    <ul className="border-border bg-surface-sunken my-1 space-y-2.5 rounded-lg border p-3">
      <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <a href={`mailto:${EMAIL}`} className={`${rowLinkClass} break-all`}>
          <MailIcon className={rowIconClass} />
          {EMAIL}
        </a>
        <CopyEmail email={EMAIL} />
      </li>
      <li>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={rowLinkClass}
        >
          <WhatsAppIcon className={rowIconClass} />
          {PHONE_DISPLAY}
          <span className="text-foreground-faint text-xs">WhatsApp</span>
        </a>
      </li>
      <li>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={rowLinkClass}
        >
          <LinkedInIcon className={rowIconClass} />
          LinkedIn
        </a>
      </li>
    </ul>
  );
}

/**
 * A deliberately small Markdown subset — paragraphs, bullet lists, bold and
 * links — which is all the system prompt allows the model to use. A full
 * Markdown library would be most of this widget's bundle for no gain.
 */
export default function ChatMessage({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let paragraph: string[] = [];

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-1 pl-5">
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(
      <p key={`p-${blocks.length}`}>{renderInline(paragraph.join(" "))}</p>,
    );
    paragraph = [];
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    const bullet = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);

    if (line.includes(CONTACT_TOKEN)) {
      const rest = line.replace(CONTACT_TOKEN, "").trim();
      if (rest) paragraph.push(rest);
      flushList();
      flushParagraph();
      blocks.push(<ContactCard key={`contact-${blocks.length}`} />);
    } else if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
    } else if (line === "") {
      flushList();
      flushParagraph();
    } else {
      flushList();
      // Headings are not allowed by the prompt, but render them as plain text
      // rather than leaking "##" if one slips through.
      paragraph.push(line.replace(/^#{1,6}\s+/, ""));
    }
  }
  flushList();
  flushParagraph();

  return <div className="space-y-2">{blocks}</div>;
}
