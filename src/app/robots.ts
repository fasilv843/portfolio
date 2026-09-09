import type { MetadataRoute } from "next";
import { SITE_URL, url } from "@/lib/site";

/**
 * One group, replacing the two conflicting `User-agent: *` blocks the generated
 * robots.txt emitted. The old `Disallow: /404` is dropped: App Router has no
 * /404 route, so it protected nothing — the not-found pages carry `noindex`
 * metadata instead.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: url("/sitemap.xml"),
    host: SITE_URL,
  };
}
