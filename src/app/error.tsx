"use client";

// Error boundaries must be client components — React needs to attach the reset
// handler on the client.

import { useEffect } from "react";
import Button from "@/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vercel captures console output in production; the digest is what ties a
    // user-visible failure back to a server-side log entry.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-svh items-center justify-center px-6 text-center"
    >
      <div>
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
          Error
        </p>
        <h1 className="font-display text-title text-foreground mt-4">
          Something went wrong
        </h1>
        <p className="text-foreground-muted mx-auto mt-4 mb-10 max-w-md text-pretty">
          An unexpected error occurred while rendering this page. Trying again
          often clears it.
        </p>
        {error.digest && (
          <p className="text-foreground-faint mb-8 font-mono text-xs">
            Reference: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <Button label="Try again" onClick={reset} />
          <Button href="/" label="Back to home" color="outline" />
        </div>
      </div>
    </main>
  );
}
