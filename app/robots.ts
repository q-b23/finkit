import { MetadataRoute } from "next";

/**
 * Dynamic robots.txt for FinKit.
 *
 * Allows all crawling except:
 *  - /api/*       (serverless functions, no crawl value)
 *  - /auth/*      (authentication pages, no crawl value)
 *  - /debug/*     (internal debug page)
 *
 * Sitemap reference uses the canonical base URL.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.FINKIT_BASE_URL ?? "https://getfinkit.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/debug"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
