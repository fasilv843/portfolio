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
        <h1 className="gradient-text mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          Project Not Found
        </h2>
        <p className="text-foreground-muted mb-8 max-w-md">
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
