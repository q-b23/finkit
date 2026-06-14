import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import "./globals.css";

/**
 * Global SEO metadata.
 * Page-level overrides (title, description) are set per-route via the Metadata API.
 */
export const metadata: Metadata = {
  title: {
    default: "FinKit — Free & Open Source Personal Finance Toolkit",
    template: "%s · FinKit",
  },
  description:
    "Debt payoff planner, loan comparison, and FIRE calculator. Privacy-first, no tracking, everything runs locally in your browser.",
  keywords: [
    "FIRE calculator",
    "debt payoff planner",
    "loan comparison",
    "financial independence",
    "personal finance",
    "open source",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "FinKit — Free & Open Source Personal Finance Toolkit",
    description:
      "Debt payoff planner, loan comparison, and FIRE calculator. Privacy-first, no tracking.",
    type: "website",
    siteName: "FinKit",
  },
};

/**
 * RootLayout wraps every page with:
 * - System font stack via Tailwind (Inter → system-ui → sans-serif)
 * - Responsive sidebar (fixed left on desktop, drawer on mobile)
 * - Main content area offset to leave room for the sidebar on desktop
 *
 * Note: The Inter font is declared in tailwind.config.ts as the primary
 * sans-serif family. It falls back gracefully if not installed locally.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-zinc-900 antialiased">
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
