import { MetadataRoute } from "next";

/**
 * Dynamic sitemap for FinKit.
 *
 * Excludes internal/auth/debug pages. All production URLs use the canonical
 * base URL (FINKIT_BASE_URL env var, falling back to https://getfinkit.com).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.FINKIT_BASE_URL ?? "https://getfinkit.com";

  const routes: MetadataRoute.Sitemap = [
    // ===== Primary entry points =====
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // ===== SEO landing pages =====
    { url: `${base}/should-i-buy-a-house`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/can-i-afford-a-house`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },

    { url: `${base}/am-i-house-poor`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },

    { url: `${base}/rent-vs-buy-decision`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },

    { url: `${base}/is-now-a-bad-time-to-buy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/pay-off-mortgage-or-invest`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/hidden-housing-costs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/house-poor-calculator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/mortgage-stress-test-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },

    // ===== Decision engines =====
    { url: `${base}/affordability-score`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/decision/mortgage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/decision/rent-vs-buy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/decision/timing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/decision/mortgage-vs-invest`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // ===== Dashboard tools =====
    { url: `${base}/dashboard/fire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/dashboard/debt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/dashboard/loan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/dashboard/loans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // ===== Guides =====
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/coast-fire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides/compound-interest`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides/debt-payoff-timeline`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides/fire-number`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides/four-percent-rule`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides/loan-apr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides/snowball-vs-avalanche`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },

    // ===== Blog & standalone content =====
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/debt-avalanche-vs-snowball`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pay-off-debt-faster`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/credit-card-payoff`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/mortgage-payoff`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-long-to-retire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/fire-at-40`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/coast-fire-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/compound-interest-examples`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/barista-fire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/lean-fire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/fat-fire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // ===== Legal =====
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes;
}
