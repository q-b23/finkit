"use client";

import { Coffee } from "lucide-react";

const KOFI_URL = "https://ko-fi.com/finkit";

/** Fire Plausible custom event on Ko-fi click. */
function trackKofiClick() {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible("kofi-click");
  }
}

/** Compact inline Ko-fi link. */
export function KoFiLink() {
  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackKofiClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors underline underline-offset-2"
    >
      <Coffee className="h-4 w-4" />
      Support FinKit on Ko-fi
    </a>
  );
}

/** Full Ko-fi button pill matching the site's amber palette. */
export function KoFiButton() {
  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackKofiClick}
      className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 hover:border-amber-300 hover:scale-105 active:scale-95"
    >
      <Coffee className="h-4 w-4" />
      Support FinKit
    </a>
  );
}

/**
 * Post-result support prompt for calculator/engine pages.
 * "Did this help? Support FinKit" with Ko-fi button.
 */
export function KoFiSupportPrompt() {
  return (
    <div className="mt-8 mx-auto max-w-lg rounded-2xl border border-amber-100 bg-amber-50/60 p-5 text-center">
      <p className="text-sm font-medium text-amber-800 mb-1">
        Did this help you make a better housing decision?
      </p>
      <p className="text-xs text-amber-600 mb-4">
        FinKit is free, private, and ad-free. If this tool gave you clarity,
        consider supporting future development.
      </p>
      <KoFiButton />
    </div>
  );
}
