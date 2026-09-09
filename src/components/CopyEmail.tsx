"use client";

import { useState } from "react";

/**
 * The only new client component in the rewrite. `navigator.clipboard` needs a
 * handler, so this cannot be a server component — but it is deliberately small,
 * so the client boundary stays around this button and nothing else.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable outside a secure context or when the user has
      // denied permission. The mailto link beside this still works, so there is
      // nothing useful to tell them here.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-foreground-muted hover:text-foreground focus-visible:outline-ring inline-flex items-center gap-2 font-mono text-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      {copied ? "Copied" : "Copy address"}
      {/* Announced politely so the confirmation is not silent for screen
          readers, which would otherwise get no feedback at all. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
    </button>
  );
}
