import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { url } from "@/lib/site";

/**
 * Derived from the projects data, so it cannot drift again. The previous
 * next-sitemap setup listed only "/" and "/projects" — all five project detail
 * pages were unlinked from the sitemap entirely.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: url("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: url("/projects"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: url(`/projects/${project.id}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
