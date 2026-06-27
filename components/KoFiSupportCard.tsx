"use client";

const KOFI_URL = "https://ko-fi.com/finkit";

function trackKofiClick() {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible("kofi-click");
  }
}

export default function KoFiSupportCard() {
  return (
    <div className="mt-8 mx-auto max-w-md rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm">
      <p className="text-2xl mb-3" aria-hidden="true">❤️</p>
      <p className="text-sm font-semibold text-zinc-800 mb-1">
        Enjoying FinKit?
      </p>
      <p className="text-xs text-zinc-500 mb-4 leading-relaxed max-w-xs mx-auto">
        If FinKit saved you time, money, or stress, consider supporting future free tools.
      </p>
      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackKofiClick}
        aria-label="Support FinKit on Ko-fi"
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 hover:border-amber-300 hover:scale-105 active:scale-95"
      >
        ☕ Support FinKit on Ko-fi
      </a>
    </div>
  );
}
