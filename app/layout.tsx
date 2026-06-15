import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = process.env.FINKIT_BASE_URL ?? "https://getfinkit.com";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "getfinkit.com";

/**
 * Global SEO metadata with OG, Twitter Cards, and canonical.
 * Page-level overrides (title, description) are set per-route.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FinKit — Free & Open Source Personal Finance Toolkit",
    template: "%s · FinKit",
  },
  description:
    "Free debt payoff planner, loan comparison calculator, and FIRE retirement calculator. Privacy-first — every calculation runs locally in your browser. No accounts, no tracking.",
  keywords: [
    "free FIRE calculator",
    "financial independence retire early",
    "debt payoff planner",
    "snowball vs avalanche calculator",
    "loan comparison",
    "compound interest calculator",
    "personal finance tools",
    "open source",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "FinKit — Free & Open Source Personal Finance Toolkit",
    description:
      "Free debt payoff planner, loan comparison, and FIRE calculator. Privacy-first, no tracking.",
    url: BASE_URL,
    siteName: "FinKit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FinKit — Take control of your financial future, privately.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinKit — Free & Open Source Personal Finance Toolkit",
    description:
      "Free debt payoff planner, loan comparison, and FIRE calculator. Privacy-first, no tracking.",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

/**
 * RootLayout wraps every page with:
 * - Privacy-first Plausible analytics (self-hostable, no cookies)
 * - Inter font via next/font (self-hosted at build time, no CDN)
 * - Responsive sidebar (fixed left on desktop, drawer on mobile)
 * - Main content area offset to leave room for the sidebar on desktop
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={PLAUSIBLE_DOMAIN}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} min-h-screen bg-white font-sans text-zinc-900 antialiased`}>
        <Sidebar />

        {/*
          Main content area:
          - On desktop, ml-64 pushes content right of the fixed sidebar.
          - On mobile (md breakpoint applies), ml-0 and pt-14 accounts for the top bar.
        */}
        <main className="min-h-screen pt-14 md:ml-64 md:pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
