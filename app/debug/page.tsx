"use client";

import { useState, useCallback } from "react";
import { ShieldCheck, RotateCw, CheckCircle2, XCircle, Flame, Scale, Banknote, Trash2 } from "lucide-react";

import { fireNumber, yearsToFire, coastFireNumber, compound } from "@/lib/fire-math";
import { calcPMT, computeLoanResult, compareLoans } from "@/lib/loan-math";
import { sortDebts, simulatePayoff, type DebtEntry } from "@/lib/debt-math";

/* ── Types ── */

interface TestCase {
  tool: string;
  name: string;
  run: () => boolean;
}

interface TestResult {
  tool: string;
  name: string;
  passed: boolean;
}

/* ── Mock Data ── */

const MOCK_DEBTS: DebtEntry[] = [
  { id: "1", name: "Credit Card", balance: 5000, apr: 24, minPayment: 150 },
  { id: "2", name: "Auto Loan", balance: 15000, apr: 7, minPayment: 350 },
  { id: "3", name: "Student Loan", balance: 20000, apr: 5, minPayment: 220 },
];

/* ── Test Suite ── */

function buildTests(): TestCase[] {
  return [
    /* ── FIRE Math ── */
    {
      tool: "FIRE Calculator",
      name: "$40K expenses at 4% WR → $1,000,000",
      run: () => fireNumber(40000, 4) === 1_000_000,
    },
    {
      tool: "FIRE Calculator",
      name: "Already at FIRE → yearsToFire returns 0",
      run: () => yearsToFire(1_000_000, 0, 7, 1_000_000) === 0,
    },
    {
      tool: "FIRE Calculator",
      name: "Coast FIRE: 7% × 25yr ≈ 5.43× divisor",
      run: () => {
        const c = coastFireNumber(1_000_000, 7, 25);
        return c > 180000 && c < 190000;
      },
    },
    {
      tool: "FIRE Calculator",
      name: "Compound: $10K at 7% × 10yr ≈ $19,671",
      run: () => {
        const c = compound(10000, 7, 10);
        return c > 19000 && c < 20000;
      },
    },

    /* ── Loan Math ── */
    {
      tool: "Loan Comparison",
      name: "$300K at 6% / 30yr → ~$1,798.65/mo",
      run: () => {
        const p = calcPMT(300000, 6, 30);
        return Math.abs(p - 1798.65) < 1;
      },
    },
    {
      tool: "Loan Comparison",
      name: "Zero-interest → principal / months",
      run: () => calcPMT(120000, 0, 10) === 1000,
    },
    {
      tool: "Loan Comparison",
      name: "computeLoanResult: interest = total − principal",
      run: () => {
        const r = computeLoanResult(300000, 6, 30);
        return Math.abs(r.totalCost - r.totalInterest - 300000) < 1;
      },
    },
    {
      tool: "Loan Comparison",
      name: "15yr saves > $100K vs 30yr at same principal",
      run: () => {
        const a = computeLoanResult(300000, 6, 30);
        const b = computeLoanResult(300000, 6, 15);
        const cmp = compareLoans(a, b);
        return cmp.interestSavings > 100000;
      },
    },

    /* ── Debt Math ── */
    {
      tool: "Debt Planner",
      name: "Avalanche: highest APR first (24% → 7% → 5%)",
      run: () => {
        const sorted = sortDebts(MOCK_DEBTS, "avalanche");
        return sorted[0].apr === 24 && sorted[1].apr === 7 && sorted[2].apr === 5;
      },
    },
    {
      tool: "Debt Planner",
      name: "Snowball: smallest balance first ($5K → $15K → $20K)",
      run: () => {
        const sorted = sortDebts(MOCK_DEBTS, "snowball");
        return (
          sorted[0].balance === 5000 &&
          sorted[1].balance === 15000 &&
          sorted[2].balance === 20000
        );
      },
    },
    {
      tool: "Debt Planner",
      name: "Extra payments reduce total months",
      run: () => {
        const noExtra = simulatePayoff(MOCK_DEBTS, "avalanche", 0);
        const withExtra = simulatePayoff(MOCK_DEBTS, "avalanche", 500);
        return withExtra.totalMonths < noExtra.totalMonths;
      },
    },
    {
      tool: "Debt Planner",
      name: "totalPaid = totalPrincipal + totalInterest",
      run: () => {
        const r = simulatePayoff(MOCK_DEBTS, "avalanche", 200);
        return Math.abs(r.totalPaid - r.totalPrincipal - r.totalInterest) < 0.01;
      },
    },

    /* ── Edge Cases ── */
    {
      tool: "Edge Cases",
      name: "Zero principal PMT → $0",
      run: () => calcPMT(0, 5, 30) === 0,
    },
    {
      tool: "Edge Cases",
      name: "Empty debt list returns empty result",
      run: () => simulatePayoff([], "avalanche", 200).totalMonths === 0,
    },
    {
      tool: "Edge Cases",
      name: "Zero withdrawal rate → Infinity",
      run: () => fireNumber(40000, 0) === Infinity,
    },
  ];
}

/* ── Component ── */

export default function DebugPage() {
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const [localStorageCleared, setLocalStorageCleared] = useState(false);

  const runDiagnostics = useCallback(() => {
    setRunning(true);
    setResults(null);

    // Use setTimeout so the UI updates before the (synchronous) tests run
    setTimeout(() => {
      const tests = buildTests();
      const outcomes: TestResult[] = tests.map((t) => ({
        tool: t.tool,
        name: t.name,
        passed: t.run(),
      }));
      setResults(outcomes);
      setRunning(false);
    }, 100);
  }, []);

  const clearLocalStorage = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
    setLocalStorageCleared(true);
    setTimeout(() => setLocalStorageCleared(false), 2000);
  }, []);

  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = totalCount > 0 && passedCount === totalCount;

  /* Group results by tool */
  const grouped = (results ?? []).reduce<Record<string, TestResult[]>>((acc, r) => {
    if (!acc[r.tool]) acc[r.tool] = [];
    acc[r.tool].push(r);
    return acc;
  }, {});

  const toolIcons: Record<string, React.ReactNode> = {
    "FIRE Calculator": <Flame className="w-4 h-4" />,
    "Loan Comparison": <Banknote className="w-4 h-4" />,
    "Debt Planner": <Scale className="w-4 h-4" />,
    "Edge Cases": <ShieldCheck className="w-4 h-4" />,
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-zinc-600" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            FinKit Diagnostics
          </h1>
        </div>
        <p className="text-zinc-500 text-sm">
          Self-test suite that verifies all core math functions. Runs entirely in your browser.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={runDiagnostics}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
        >
          <RotateCw className={`w-4 h-4 ${running ? "animate-spin" : ""}`} />
          {running ? "Running..." : "Run Diagnostics"}
        </button>

        <button
          onClick={clearLocalStorage}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50 active:scale-[0.98]"
        >
          <Trash2 className="w-4 h-4" />
          {localStorageCleared ? "Cleared!" : "Clear localStorage"}
        </button>
      </div>

      {/* Results grid */}
      {results && (
        <>
          {/* Summary banner */}
          <div
            className={`rounded-2xl border p-5 mb-6 ${
              allPassed
                ? "bg-emerald-50 border-emerald-200"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {allPassed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              ) : (
                <XCircle className="w-6 h-6 text-amber-600" />
              )}
              <div>
                <p
                  className={`text-lg font-bold ${
                    allPassed ? "text-emerald-800" : "text-amber-800"
                  }`}
                >
                  {allPassed
                    ? "All Tests Passed"
                    : `${passedCount}/${totalCount} Tests Passed`}
                </p>
                <p className="text-sm text-zinc-500">
                  {totalCount} assertions across {Object.keys(grouped).length} modules
                </p>
              </div>
            </div>
          </div>

          {/* Per-module sections */}
          {Object.entries(grouped).map(([tool, tests]) => (
            <div
              key={tool}
              className="bg-white border border-zinc-200 rounded-2xl shadow-sm mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-100 bg-zinc-50">
                <span className="text-zinc-500">{toolIcons[tool]}</span>
                <span className="text-sm font-semibold text-zinc-700">{tool}</span>
                <span className="ml-auto text-xs text-zinc-400">
                  {tests.filter((t) => t.passed).length}/{tests.length}
                </span>
              </div>

              <div className="divide-y divide-zinc-50">
                {tests.map((test, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    {test.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className="text-sm text-zinc-700">{test.name}</span>
                    <span
                      className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                        test.passed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {test.passed ? "PASS" : "FAIL"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Empty state */}
      {!results && !running && (
        <div className="text-center py-16 border border-dashed border-zinc-200 rounded-2xl">
          <ShieldCheck className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm font-medium">No diagnostics run yet</p>
          <p className="text-zinc-300 text-xs mt-1">
            Click &ldquo;Run Diagnostics&rdquo; to verify all core math functions.
          </p>
        </div>
      )}
    </div>
  );
}
