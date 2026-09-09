import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { Metadata } from "next";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero image with overlay */}
      <section className="relative w-full">
        {project.image ? (
          <div className="relative h-[60vh] w-full md:h-[65vh] lg:h-[75vh]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent_40%)]" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-6xl px-4">
                <div className="inline-block w-full max-w-3xl rounded-xl bg-[rgba(0,0,0,0.38)] p-4 md:p-6">
                  <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">
                    {project.name}
                  </h1>
                  <p className="text-foreground/90 mt-2 text-base md:text-xl lg:text-2xl">
                    {project.subheading}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
                    {project.liveLink && (
                      <Button
                        href={project.liveLink}
                        label="Live Demo"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4.5 w-4.5"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
                          </svg>
                        }
                      />
                    )}
                    {project.sourceCode && (
                      <Button
                        href={project.sourceCode}
                        label="Source Code"
                        color="outline"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.65-.35 2.5-.35.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.67.94.67 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                          </svg>
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-8">
            <h1 className="text-4xl font-bold md:text-6xl">{project.name}</h1>
            <p className="text-foreground/80 mt-2 max-w-3xl text-lg md:text-2xl">
              {project.subheading}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-black transition-all hover:brightness-110"
                >
                  Live Demo
                </Link>
              )}
              {project.sourceCode && (
                <Link
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground rounded-lg border border-[var(--border)] px-5 py-2.5 transition-all hover:bg-[var(--muted)]"
                >
                  Source Code
                </Link>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_3%)] p-8">
              <h2 className="mb-4 text-2xl font-semibold">Project Overview</h2>
              <p className="text-foreground/80 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.features?.length > 0 && (
              <div className="rounded-2xl border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_3%)] p-8">
                <h2 className="mb-6 text-2xl font-semibold">Key Features</h2>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.demoUrl && (
              <div className="rounded-2xl border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_3%)] p-8">
                <h2 className="mb-6 text-2xl font-semibold">Project Demo</h2>
                <div className="relative h-0 w-full overflow-hidden rounded-lg pb-[56.25%]">
                  <iframe
                    src={project.demoUrl}
                    title={`${project.name} Demo`}
                    className="absolute top-0 left-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-2xl border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_3%)] p-6">
              <h3 className="mb-4 text-xl font-semibold">Technologies Used</h3>
              <div className="space-y-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[var(--primary)]"></div>
                    <span className="text-foreground/80">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons (duplicated for sidebar quick access) */}
            {(project.liveLink || project.sourceCode) && (
              <div className="space-y-3 rounded-2xl border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_3%)] p-6">
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full justify-center rounded-lg bg-[var(--primary)] px-6 py-3 text-black transition-all hover:brightness-110"
                  >
                    View Live Demo
                  </Link>
                )}
                {project.sourceCode && (
                  <Link
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground inline-flex w-full justify-center rounded-lg border border-[var(--border)] px-6 py-3 transition-all hover:bg-[var(--muted)]"
                  >
                    View Source Code
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* Navigation */}
        <div className="mx-auto mt-16 flex max-w-6xl justify-between">
          <Link
            href="/projects"
            className="text-foreground inline-flex items-center rounded-lg border border-[var(--border)] px-6 py-3 transition-all hover:bg-[var(--muted)]"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            All Projects
          </Link>

          <Link
            href="/"
            className="text-foreground inline-flex items-center rounded-lg border border-[var(--border)] px-6 py-3 transition-all hover:bg-[var(--muted)]"
          >
            <svg
              className="mr-2 h-5 w-5"
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
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project does not exist",
    };
  }

  return {
    title: `${project.name} - Fasil Valiyattil`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      url: `https://fasilv.in/projects/${project.id}`,
      images: [
        {
          url:
            project.image ||
            "https://via.placeholder.com/1200x630.png?text=Fasil+Valiyattil+Portfolio",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@fasilv843",
      creator: "@fasilv843",
    },
  };
}

// export async function generateStaticParams() {
//   return projects.map((project) => ({ id: project.id }));
// }
