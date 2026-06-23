import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-mono",
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
    default: "FinKit — US Home Affordability & Financial Decision System",
    template: "%s · FinKit",
  },
  description:
    "Will you become house poor? FinKit analyzes your finances and tells you what you can safely afford. Rent vs buy, mortgage risk, debt freedom — all free, private, and local.",
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
    title: "FinKit — Will You Become House Poor?",
    description:
      "Before you buy a home, know your number. Free affordability analysis, rent vs buy comparison, and mortgage risk scoring — all private, no accounts.",
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
    title: "FinKit — Will You Become House Poor?",
    description:
      "Before you buy a home, know your number. Free affordability analysis, rent vs buy comparison, and mortgage risk scoring.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={PLAUSIBLE_DOMAIN}
          strategy="afterInteractive"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("finkit-theme")||(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");document.documentElement.classList.add(t)}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-white font-sans text-zinc-900 antialiased`}>
        <Sidebar />

        {/*
          Main content area:
          - On desktop, ml-64 pushes content right of the fixed sidebar.
          - On mobile (md breakpoint applies), ml-0 and pt-14 accounts for the top bar.
        */}
        <ThemeProvider>
          <main className="min-h-screen pt-14 md:ml-64 md:pt-0">
            {children}
          </main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
