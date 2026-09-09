import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Tag from "@/components/ui/Tag";
import { Metadata } from "next";
import { AUTHOR, SITE_NAME, TWITTER_HANDLE, truncate, url } from "@/lib/site";

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

  // Server-rendered so crawlers see it in the initial HTML.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: url("/projects"),
        },
        { "@type": "ListItem", position: 3, name: project.name },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.name,
      description: project.description,
      url: url(`/projects/${project.id}`),
      applicationCategory: "WebApplication",
      operatingSystem: "Web browser",
      author: { "@type": "Person", name: AUTHOR, url: url("/") },
      ...(project.liveLink && { installUrl: project.liveLink }),
      ...(project.sourceCode && { codeRepository: project.sourceCode }),
      keywords: project.technologies.join(", "),
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: url("/") },
    },
  ];

  return (
    <main id="main" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-5xl px-6 pt-24 pb-16 md:pt-32">
        <nav aria-label="Breadcrumb">
          <Link
            href="/projects"
            className="text-foreground-faint hover:text-foreground focus-visible:outline-ring font-mono text-xs tracking-[0.15em] uppercase transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span aria-hidden="true">← </span>All Projects
          </Link>
        </nav>

        <h1 className="font-display text-display text-foreground mt-8 text-balance">
          {project.name}
        </h1>
        <p className="text-foreground-muted text-lead mt-4 max-w-[68ch] text-pretty">
          {project.subheading}
        </p>

        {project.image && (
          <div className="border-border relative mt-14 aspect-[16/9] w-full overflow-hidden rounded-lg border">
            <Image
              src={project.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-14 px-6 pb-28 lg:grid-cols-3">
        <div className="space-y-16 lg:col-span-2">
          <section>
            <h2 className="text-foreground-faint border-border border-b pb-3 font-mono text-xs tracking-[0.15em] uppercase">
              Project Overview
            </h2>
            <p className="text-foreground-muted mt-6 text-lg leading-relaxed text-pretty">
              {project.description}
            </p>
          </section>

          {project.features?.length > 0 && (
            <section>
              <h2 className="text-foreground-faint border-border border-b pb-3 font-mono text-xs tracking-[0.15em] uppercase">
                Key Features
              </h2>
              {/* Two columns: CineSnap has 14 of these and a single column read
                  as an endless list. Real semantic grouping needs the data to
                  carry categories — that is phase 7, not a layout fix. */}
              <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-foreground-muted border-border flex gap-3 border-b py-3 text-sm text-pretty"
                  >
                    <span className="text-primary shrink-0" aria-hidden="true">
                      —
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.demoUrl && (
            <section>
              <h2 className="text-foreground-faint border-border border-b pb-3 font-mono text-xs tracking-[0.15em] uppercase">
                Project Demo
              </h2>
              <div className="border-border mt-6 aspect-video w-full overflow-hidden rounded-lg border">
                <iframe
                  src={project.demoUrl}
                  title={`${project.name} Demo`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>

        {/* One sidebar, not two copies of the same buttons. Sticky so the
            actions stay reachable through a long feature list. */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-foreground-faint border-border border-b pb-3 font-mono text-xs tracking-[0.15em] uppercase">
            Built with
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          {(project.liveLink || project.sourceCode) && (
            <div className="mt-10 flex flex-col gap-3">
              {project.liveLink && (
                <Button
                  href={project.liveLink}
                  label="View live site"
                  className="w-full"
                />
              )}
              {project.sourceCode && (
                <Button
                  href={project.sourceCode}
                  label="View source"
                  color="outline"
                  className="w-full"
                />
              )}
            </div>
          )}
        </aside>
      </div>

      <Footer />
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

  const description = truncate(project.description);

  return {
    // Root layout's template appends "| Fasil Valiyattil".
    title: project.name,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.name,
      description,
      url: url(`/projects/${project.id}`),
      type: "article",
      // Images come from the sibling opengraph-image.tsx, which generates a real
      // 1200x630 card. The old inline entry pointed at via.placeholder.com, a
      // service that is now dead.
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
  };
}

// Prerender all five project pages. Previously commented out, which left them
// server-rendered on demand and absent from the sitemap.
export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}
