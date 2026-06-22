"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedAnalyses } from "@/hooks/useSavedAnalyses";

/**
 * A manual "Save this result" button for decision engines.
 *
 * Part of the light retention system: lets users save one calculation
 * snapshot so they see it on the homepage when they return.
 */
export default function SaveResultButton({
  engine,
  label,
  outcome,
  href,
}: {
  engine: string;
  label: string;
  outcome: string;
  href: string;
}) {
  const { saveAnalysis } = useSavedAnalyses();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    saveAnalysis({ engine, label, outcome, href });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <button
      onClick={handleSave}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
        saved
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
      }`}
    >
      {saved ? (
        <BookmarkCheck className="h-3.5 w-3.5" />
      ) : (
        <Bookmark className="h-3.5 w-3.5" />
      )}
      {saved ? "Saved" : "Save result"}
    </button>
  );
}
