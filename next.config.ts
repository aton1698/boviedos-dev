import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fallback for the footer year during prerender; the client shows the real current year.
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // English is served at the site root (canonical https://boviedos.dev); /en still resolves.
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/cv", destination: "/en/cv" },
      { source: "/blog/:category", destination: "/en/blog/:category" },
    ];
  },
  async headers() {
    if (process.env.SITE_ENV === "production" || process.env.VERCEL_ENV === "production") {
      // Brand and blog images are not content-hashed: cache for a day, revalidate in the background for a week.
      const cache = { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" };
      return [
        { source: "/logo/:path*", headers: [cache] },
        { source: "/blog/:file*.svg", headers: [cache] },
      ];
    }
    // Defense in depth: anything that is not production must never be indexed.
    return [
      { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
