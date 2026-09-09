import Button from "@/components/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center px-4"
    >
      <div className="text-center">
        <p className="text-primary font-mono text-xs tracking-[0.2em]">404</p>
        <h1 className="font-display text-title text-foreground mt-4">
          Page Not Found
        </h1>
        <p className="text-foreground-muted mx-auto mt-4 mb-10 max-w-md text-pretty">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Button
          href="/"
          label="Back to Home"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          }
        />
      </div>
    </main>
  );
}
