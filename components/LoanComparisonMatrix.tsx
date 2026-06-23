"use client";

import { useMemo } from "react";
import {
  DollarSign,
  Percent,
  Clock,
  TrendingDown,
  Award,
  ArrowRight,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calcPMT } from "@/lib/loan-math";

/* ── Types ── */

interface LoanOption {
  amount: number;
  apr: number;
  termYears: number;
}

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

interface ComparisonData {
  optionA: LoanOption;
  optionB: LoanOption;
}



function computeResult(opt: LoanOption): LoanResult {
  const monthly = calcPMT(opt.amount, opt.apr, opt.termYears);
  const totalCost = monthly * opt.termYears * 12;
  const totalInterest = totalCost - opt.amount;

  return {
    monthlyPayment: Math.round(monthly * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
}

/* ── Helpers ── */

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtShort(n: number): string {
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/* ── Defaults ── */

const DEFAULT_DATA: ComparisonData = {
  optionA: { amount: 350000, apr: 6.5, termYears: 30 },
  optionB: { amount: 350000, apr: 5.75, termYears: 15 },
};

/* ── Component ── */

export default function LoanComparisonMatrix() {
  const [data, setData] = useLocalStorage<ComparisonData>(
    "finkit-loan-comparison",
    DEFAULT_DATA
  );

  const resultA = useMemo(() => computeResult(data.optionA), [data.optionA]);
  const resultB = useMemo(() => computeResult(data.optionB), [data.optionB]);

  /* ── Winner logic ── */
  const monthlyWinner =
    resultA.monthlyPayment < resultB.monthlyPayment ? "A" : "B";
  const interestWinner =
    resultA.totalInterest < resultB.totalInterest ? "A" : "B";

  const monthlyDiff = Math.abs(
    resultA.monthlyPayment - resultB.monthlyPayment
  );
  const interestDiff = Math.abs(resultA.totalInterest - resultB.totalInterest);
  const monthlyWinnerLabel =
    monthlyWinner === "A" ? "Option A" : "Option B";
  const interestWinnerLabel =
    interestWinner === "A" ? "Option A" : "Option B";

  function updateOption(
    option: "optionA" | "optionB",
    field: keyof LoanOption,
    raw: string
  ) {
    const num = parseFloat(raw);
    setData((prev) => ({
      ...prev,
      [option]: { ...prev[option], [field]: isNaN(num) ? 0 : num },
    }));
  }

  /* ── Input card for one option ── */
  function OptionCard({
    label,
    data: opt,
    result,
    accent,
  }: {
    label: string;
    data: LoanOption;
    result: LoanResult;
    accent: "blue" | "emerald";
  }) {
    const borderColor =
      accent === "blue"
        ? "border-blue-400 dark:border-blue-500 ring-blue-500/20"
        : "border-emerald-400 dark:border-emerald-500 ring-emerald-500/20";
    const bgColor =
      accent === "blue"
        ? "bg-blue-50 dark:bg-blue-950/40"
        : "bg-emerald-50 dark:bg-emerald-950/40";
    const key = accent === "blue" ? "optionA" : "optionB";

    return (
      <div
        className={`bg-white dark:bg-zinc-900 border rounded-2xl p-6 shadow-sm transition-all ${borderColor} ring-2`}
      >
        {/* Header */}
        <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-semibold ${bgColor} ${
          accent === "blue" ? "text-blue-700 dark:text-blue-300" : "text-emerald-700 dark:text-emerald-300"
        } mb-5`}>
          {label}
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Loan Amount */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
              Loan Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="number"
                value={opt.amount || ""}
                onChange={(e) => updateOption(key, "amount", e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500/10 focus:border-zinc-400"
              />
            </div>
          </div>

          {/* APR */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
              Interest Rate (APR)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="number"
                step="0.01"
                value={opt.apr || ""}
                onChange={(e) => updateOption(key, "apr", e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500/10 focus:border-zinc-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                %
              </span>
            </div>
          </div>

          {/* Term */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
              Loan Term
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="number"
                value={opt.termYears || ""}
                onChange={(e) => updateOption(key, "termYears", e.target.value)}
                className="w-full pl-9 pr-14 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500/10 focus:border-zinc-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                Years
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-zinc-400">Monthly Payment</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
              {fmt(result.monthlyPayment)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-zinc-400">Total Interest</span>
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
              {fmt(result.totalInterest)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-zinc-400">Total Cost</span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
              {fmt(result.totalCost)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Loan Comparison Matrix
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Compare two loan options side-by-side to see how much interest you can save.
        </p>
      </div>

      {/* ── Two-Column Comparison ── */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <OptionCard
          label="Option A"
          data={data.optionA}
          result={resultA}
          accent="blue"
        />
        <OptionCard
          label="Option B"
          data={data.optionB}
          result={resultB}
          accent="emerald"
        />
      </div>

      {/* ── Winner / Insight Card ── */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Comparison Insights
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Monthly Payment Insight */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5">
            <p className="text-xs text-zinc-400 mb-2">
              Monthly Payment Difference
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums mb-2">
              {fmt(monthlyDiff)}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <ArrowRight className="w-3 h-3" />
                {monthlyWinnerLabel}
              </span>
              <span className="text-xs text-zinc-400">has the lower monthly payment</span>
            </div>
          </div>

          {/* Interest Savings Insight */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5">
            <p className="text-xs text-zinc-400 mb-2">
              Total Interest Savings
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mb-2">
              {fmt(interestDiff)}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <ArrowRight className="w-3 h-3" />
                {interestWinnerLabel}
              </span>
              <span className="text-xs text-zinc-400">saves you in total interest</span>
            </div>
          </div>
        </div>

        {/* Summary sentence */}
        <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {interestWinnerLabel}
            </span>
            {" "}saves you{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {fmt(interestDiff)}
            </span>
            {" "}in total interest and{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
              {fmt(monthlyDiff)}
            </span>
            {" "}per month compared to{" "}
            <span className="font-semibold text-zinc-500">
              {interestWinner === "A" ? "Option B" : "Option A"}
            </span>
            .
          </p>
        </div>
      </div>

      {/* Privacy note */}
      <p className="text-xs text-zinc-400 mt-6 text-center">
        Your comparison data is saved locally in your browser. Nothing is sent to a server.
      </p>
    </div>
  );
}
