import { Metadata } from "next";
import { FIRECalculator } from "@/components/FIRECalculator";

const BASE_URL = process.env.FINKIT_BASE_URL ?? "https://getfinkit.com";

/**
 * Page-specific SEO metadata targeting long-tail FIRE keywords.
 */
export const metadata: Metadata = {
  title: "Free FIRE Calculator — Financial Independence, Retire Early",
  description:
    "Calculate your FIRE number, project compound growth, and discover your Coast FIRE age. Free, private, and open source — every calculation runs locally in your browser.",
  keywords: [
    "free FIRE calculator",
    "financial independence retire early calculator",
    "FIRE number calculator",
    "Coast FIRE calculator",
    "compound interest retirement calculator",
    "early retirement calculator",
  ],
  openGraph: {
    title: "Free FIRE Calculator — Financial Independence, Retire Early",
    description:
      "Calculate your FIRE number and Coast FIRE age. Free, private, open source.",
    url: `${BASE_URL}/dashboard/fire`,
  },
  alternates: {
    canonical: `${BASE_URL}/dashboard/fire`,
  },
};

/**
 * JSON-LD WebApplication schema for Google rich snippets.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FinKit FIRE Calculator",
  url: `${BASE_URL}/dashboard/fire`,
  description:
    "A free, privacy-first FIRE (Financial Independence, Retire Early) calculator that runs entirely in your browser. Compute your FIRE number, project compound growth, and discover your Coast FIRE age — no sign-up, no tracking, no servers involved.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "FinKit",
    url: BASE_URL,
  },
  browserRequirements: "Requires JavaScript",
  permissions: "No personal data collected. All calculations run client-side.",
};

/**
 * FIRE Calculator page with rich snippet schema markup.
 */
export default function FireCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FIRECalculator />
    </>
  );
}
