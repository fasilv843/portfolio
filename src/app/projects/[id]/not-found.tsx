import Button from "@/components/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Not Found",
  description: "The project you're looking for doesn't exist or has moved.",
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
          Project Not Found
        </h1>
        <p className="text-foreground-muted mx-auto mt-4 mb-10 max-w-md text-pretty">
          The project you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/projects" label="View All Projects" />
          <Button href="/" label="Back to Home" color="outline" />
        </div>
      </div>
    </main>
  );
}
