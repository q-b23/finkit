"use client";

import { useEffect, useRef } from "react";
import { useSavedAnalyses } from "@/hooks/useSavedAnalyses";

/**
 * Auto-saves an analysis snapshot to localStorage whenever the watched
 * dependency values change (debounced: only saves after values stabilize).
 *
 * Designed for the return-traffic system: users see their last analysis
 * on the homepage when they return.
 */
export function useAutoSave(
  engine: string,
  label: string,
  outcome: string,
  href: string,
  deps: unknown[]
) {
  const { saveAnalysis } = useSavedAnalyses();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Debounce: only save after values have been stable for 800ms
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveAnalysis({ engine, label, outcome, href });
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
