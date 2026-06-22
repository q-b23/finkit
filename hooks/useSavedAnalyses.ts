"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface SavedAnalysis {
  /** Unique ID for this save */
  id: string;
  /** Which engine: "mortgage" | "rent-vs-buy" | "timing" | "mortgage-vs-invest" */
  engine: string;
  /** ISO timestamp of when it was saved */
  savedAt: string;
  /** Human-readable label shown in the resume card */
  label: string;
  /** Short summary of the outcome (e.g. "SAFE — 12% risk score" or "Renting saves $47K") */
  outcome: string;
  /** Route to the engine so the user can click through */
  href: string;
}

const STORAGE_KEY = "finkit:saved-analyses";
const MAX_SAVED = 5;

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

/**
 * Manages a lightweight ring-buffer of saved analyses in localStorage.
 *
 * Designed for the return-traffic system: when a user runs a calculation,
 * we save a snapshot so they see "Your Last Analysis" on the homepage
 * when they come back.
 */
export function useSavedAnalyses() {
  const [analyses, setAnalyses] = useLocalStorage<SavedAnalysis[]>(
    STORAGE_KEY,
    []
  );

  const saveAnalysis = useCallback(
    (analysis: Omit<SavedAnalysis, "id" | "savedAt">) => {
      const entry: SavedAnalysis = {
        ...analysis,
        id: `${analysis.engine}-${Date.now()}`,
        savedAt: new Date().toISOString(),
      };
      setAnalyses((prev) => {
        // Keep the latest MAX_SAVED, newest first
        const next = [entry, ...prev].slice(0, MAX_SAVED);
        return next;
      });
    },
    [setAnalyses]
  );

  const removeAnalysis = useCallback(
    (id: string) => {
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    },
    [setAnalyses]
  );

  const clearAll = useCallback(() => {
    setAnalyses([]);
  }, [setAnalyses]);

  return {
    analyses,
    saveAnalysis,
    removeAnalysis,
    clearAll,
    /** Most recent saved analysis */
    latest: analyses[0] ?? null,
  };
}
