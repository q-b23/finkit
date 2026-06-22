"use client";

import Link from "next/link";
import { ArrowRight, Home, ArrowLeftRight, Clock, PiggyBank, X } from "lucide-react";
import { useSavedAnalyses, SavedAnalysis } from "@/hooks/useSavedAnalyses";

const ENGINE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  mortgage: Home,
  "rent-vs-buy": ArrowLeftRight,
  timing: Clock,
  "mortgage-vs-invest": PiggyBank,
};

const ENGINE_COLORS: Record<string, string> = {
  mortgage: "bg-red-50 text-red-600",
  "rent-vs-buy": "bg-amber-50 text-amber-600",
  timing: "bg-blue-50 text-blue-600",
  "mortgage-vs-invest": "bg-purple-50 text-purple-600",
};

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const mins = Math.floor((now - then) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

/**
 * Displays the user's most recent saved analysis as a "resume" card
 * on the homepage. Designed for the return-traffic system: gives users
 * a reason to click back into an engine and recalculate.
 */
export default function ResumeCard() {
  const { analyses, removeAnalysis, clearAll } = useSavedAnalyses();

  if (analyses.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-900">
            Your Recent Analyses
          </h2>
          <button
            onClick={clearAll}
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-2">
          {analyses.slice(0, 3).map((a: SavedAnalysis) => {
            const Icon = ENGINE_ICONS[a.engine] ?? Home;
            const accent = ENGINE_COLORS[a.engine] ?? "bg-zinc-50 text-zinc-600";
            return (
              <div
                key={a.id}
                className="group flex items-center gap-3 rounded-xl border border-zinc-100 px-4 py-3 hover:border-zinc-200 transition-colors"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accent}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <Link href={a.href} className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {a.label}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {a.outcome} &middot; {timeAgo(a.savedAt)}
                  </p>
                </Link>
                <button
                  onClick={() => removeAnalysis(a.id)}
                  className="shrink-0 p-1 rounded-md text-zinc-300 hover:text-zinc-500 hover:bg-zinc-100 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
