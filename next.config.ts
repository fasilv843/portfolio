import type { NextConfig } from "next";

// `images.remotePatterns` used to allowlist media.istockphoto.com. That existed
// solely for the commented-out placeholder `image:` values in data/projects.ts,
// which are now deleted — every image the site loads is local. Re-add a pattern
// here only if a genuinely remote image is ever introduced.
const nextConfig: NextConfig = {
  // The chat route reads about.md at runtime; fs paths built from cwd are not
  // traced automatically, so ship the file with the serverless function.
  outputFileTracingIncludes: {
    "/api/chat": ["./src/data/about.md"],
  },
};

export default nextConfig;
