"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Home, ArrowLeftRight } from "lucide-react";

/**
 * Fixed bottom bar that appears when the user scrolls past the hero section.
 * Mobile-first: full-width bar with a single primary CTA.
 * Desktop: secondary CTA shown alongside, centered within the content area.
 *
 * Used on the landing page (/) only.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the CTA after scrolling past roughly the hero height (400px)
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position in case page loads scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 transition-all duration-300 ease-out md:left-64 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop blur border */}
      <div className="border-t border-zinc-200/60 bg-white/90 backdrop-blur-lg dark:border-zinc-800/60 dark:bg-zinc-950/90">
        <div className="mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Label — hidden on smallest screens */}
          <p className="hidden text-sm font-medium text-zinc-600 sm:block dark:text-zinc-400">
            Make your housing decision with confidence.
          </p>

          <div className="flex w-full items-center gap-2.5 sm:w-auto">
            {/* Primary CTA */}
            <Link
              href="/decision/mortgage"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-400 hover:shadow-red-500/40 active:scale-[0.98] sm:flex-initial"
            >
              <Home className="h-4 w-4" />
              Check My Affordability
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Secondary CTA — hidden on mobile */}
            <Link
              href="/decision/rent-vs-buy"
              className="hidden items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:border-zinc-300 hover:text-zinc-800 active:scale-[0.98] sm:inline-flex dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Rent vs Buy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
