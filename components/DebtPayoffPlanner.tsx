"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  ShieldCheck,
  Snowflake,
  ArrowDownUp,
  Calendar,
  DollarSign,
  Percent,
  CreditCard,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/* ── Types ── */

interface Debt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

type Strategy = "snowball" | "avalanche";

interface PayoffStep {
  order: number;
  name: string;
  balance: number;
  apr: number;
  monthsToPayoff: number;
  interestPaid: number;
}

interface PayoffResult {
  steps: PayoffStep[];
  totalMonths: number;
  totalInterest: number;
  totalPaid: number;
  debtFreeDate: Date;
}

/* ── Helpers ── */

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatShortCurrency(n: number): string {
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/**
 * Simulate paying off debts month-by-month.
 * Returns ordered payoff steps with interest paid and months-to-payoff per debt.
 */
function simulatePayoff(
  debts: Debt[],
  strategy: Strategy,
  extraMonthly: number
): PayoffResult | null {
  if (debts.length === 0) return null;

  // Deep-clone debts into a mutable working list
  const working = debts.map((d) => ({
    id: d.id,
    name: d.name,
    balance: d.balance,
    apr: d.apr,
    minPayment: d.minPayment,
  }));

  // Sort by strategy
  const sortFn =
    strategy === "snowball"
      ? (a: typeof working[number], b: typeof working[number]) => a.balance - b.balance
      : (a: typeof working[number], b: typeof working[number]) => b.apr - a.apr;

  const payoffSteps: PayoffStep[] = [];
  let month = 0;
  let totalInterest = 0;
  const paidOff = new Set<string>();

  // Cap at 600 months (50 years) to prevent infinite loops
  while (working.length > 0 && month < 600) {
    month++;

    // Each month: apply interest, make minimum payments, then apply extra
    for (const d of working) {
      const monthlyRate = d.apr / 100 / 12;
      const interest = d.balance * monthlyRate;
      totalInterest += interest;
      d.balance += interest;

      // Pay minimum (or remaining balance if less)
      const payment = Math.min(d.minPayment, d.balance);
      d.balance -= payment;
    }

    // Apply extra payment to the first debt in strategy order
    if (extraMonthly > 0 && working.length > 0) {
      const sorted = [...working].sort(sortFn);
      for (const d of sorted) {
        if (d.balance <= 0.01) continue;
        const extra = Math.min(extraMonthly, d.balance);
        d.balance -= extra;
        break; // Extra only goes to one debt per month
      }
    }

    // Check which debts just got paid off
    for (const d of [...working]) {
      if (d.balance <= 0.01 && !paidOff.has(d.id)) {
        paidOff.add(d.id);
        payoffSteps.push({
          order: payoffSteps.length + 1,
          name: d.name,
          balance: debts.find((orig) => orig.id === d.id)!.balance,
          apr: d.apr,
          monthsToPayoff: month,
          interestPaid: 0, // computed below
        });
      }
    }

    // Remove paid-off debts
    for (let i = working.length - 1; i >= 0; i--) {
      if (working[i].balance <= 0.01) working.splice(i, 1);
    }
  }

  // Assign interest per debt proportionally
  const totalPrincipal = debts.reduce((sum, d) => sum + d.balance, 0);
  for (const step of payoffSteps) {
    const original = debts.find((d) => d.id === step.name || d.name === step.name);
    const share = original ? original.balance / totalPrincipal : 0;
    step.interestPaid = Math.round(totalInterest * share * 100) / 100;
  }

  // Compute debt-free date
  const now = new Date();
  const debtFreeDate = new Date(now);
  debtFreeDate.setMonth(debtFreeDate.getMonth() + month);

  return {
    steps: payoffSteps,
    totalMonths: month,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round((totalPrincipal + totalInterest) * 100) / 100,
    debtFreeDate,
  };
}

/* ── Component ── */

export default function DebtPayoffPlanner() {
  /* ── LocalStorage-backed state ── */
  const [debts, setDebts] = useLocalStorage<Debt[]>("finkit-debts", [
    { id: generateId(), name: "Credit Card A", balance: 5200, apr: 22.99, minPayment: 150 },
    { id: generateId(), name: "Auto Loan", balance: 12500, apr: 6.5, minPayment: 350 },
    { id: generateId(), name: "Student Loan", balance: 18000, apr: 5.05, minPayment: 220 },
  ]);

  const [strategy, setStrategy] = useLocalStorage<Strategy>("finkit-strategy", "avalanche");
  const [extraMonthly, setExtraMonthly] = useLocalStorage<number>("finkit-extra", 200);

  /* ── Derived state ── */
  const totalPrincipal = useMemo(
    () => debts.reduce((sum, d) => sum + d.balance, 0),
    [debts]
  );

  const result = useMemo(
    () => simulatePayoff(debts, strategy, extraMonthly),
    [debts, strategy, extraMonthly]
  );

  /* ── Handlers ── */
  function addDebt() {
    setDebts((prev) => [
      ...prev,
      { id: generateId(), name: "New Debt", balance: 1000, apr: 18, minPayment: 50 },
    ]);
  }

  function removeDebt(id: string) {
    if (debts.length <= 1) return;
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDebt(id: string, field: keyof Debt, raw: string) {
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        if (field === "name") return { ...d, name: raw };
        const num = parseFloat(raw);
        return { ...d, [field]: isNaN(num) ? 0 : num };
      })
    );
  }

  /* ── Render ── */
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Debt Payoff Planner
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Enter your debts, choose a strategy, and see your exact debt-free date.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* ── Left: Input Panel ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Debt Cards */}
          {debts.map((debt, idx) => (
            <div
              key={debt.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Debt {idx + 1}
                </span>
                {debts.length > 1 && (
                  <button
                    onClick={() => removeDebt(debt.id)}
                    className="p-1.5 rounded-md text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                    aria-label="Remove debt"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                    Debt Name
                  </label>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                    placeholder="e.g. Credit Card A"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {/* Balance */}
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                    Remaining Balance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={debt.balance || ""}
                      onChange={(e) => updateDebt(debt.id, "balance", e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* APR + Min Payment */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                      APR (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={debt.apr || ""}
                        onChange={(e) => updateDebt(debt.id, "apr", e.target.value)}
                        className="w-full pr-7 pl-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                      Min Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                        $
                      </span>
                      <input
                        type="number"
                        value={debt.minPayment || ""}
                        onChange={(e) => updateDebt(debt.id, "minPayment", e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addDebt}
            className="w-full py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Another Debt
          </button>
        </div>

        {/* ── Right: Strategy + Results ── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Strategy Selector */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
              Payoff Strategy
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStrategy("snowball")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  strategy === "snowball"
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                }`}
              >
                <Snowflake
                  className={`w-5 h-5 shrink-0 ${
                    strategy === "snowball" ? "text-emerald-600" : "text-zinc-400"
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      strategy === "snowball" ? "text-emerald-800 dark:text-emerald-200" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    Debt Snowball
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Smallest balance first
                  </p>
                </div>
              </button>

              <button
                onClick={() => setStrategy("avalanche")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  strategy === "avalanche"
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-500/20"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                }`}
              >
                <ArrowDownUp
                  className={`w-5 h-5 shrink-0 ${
                    strategy === "avalanche" ? "text-blue-600" : "text-zinc-400"
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      strategy === "avalanche" ? "text-blue-800 dark:text-blue-200" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    Debt Avalanche
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Highest APR first
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Extra Payment */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-3">
              Extra Monthly Payment
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="number"
                value={extraMonthly || ""}
                onChange={(e) => setExtraMonthly(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="200"
              />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Additional cash you can put toward debt each month beyond minimums.
            </p>
          </div>

          {/* ── Results ── */}
          {result && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                    Total Principal
                  </p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {formatCurrency(totalPrincipal)}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                    Total Interest
                  </p>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                    Total Cost
                  </p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {formatCurrency(result.totalPaid)}
                  </p>
                </div>
              </div>

              {/* Debt-Free Date Badge */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                      Estimated Debt-Free Date
                    </p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                      {result.debtFreeDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Months to freedom
                    </p>
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                      {result.totalMonths}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payoff Order Table */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Payoff Order —{" "}
                    {strategy === "snowball" ? "Smallest Balance First" : "Highest APR First"}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100 dark:border-zinc-800 text-left">
                        <th className="px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Debt
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Balance
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          APR
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Paid Off In
                        </th>
                        <th className="px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Interest
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.steps.map((step) => (
                        <tr
                          key={step.order}
                          className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                        >
                          <td className="px-5 py-3 font-mono text-xs text-zinc-400">
                            {step.order}
                          </td>
                          <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                            {step.name}
                          </td>
                          <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                            {formatCurrency(step.balance)}
                          </td>
                          <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                            {step.apr.toFixed(2)}%
                          </td>
                          <td className="px-5 py-3 tabular-nums">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                              {step.monthsToPayoff} mo
                            </span>
                          </td>
                          <td className="px-5 py-3 text-amber-600 dark:text-amber-400 tabular-nums">
                            {formatCurrency(step.interestPaid)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Privacy Badge */}
          <div className="flex items-center gap-2.5 text-xs text-zinc-400">
            <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
            </div>
            <span>
              100% Private. This data is stored in your browser&apos;s local storage and never touches our servers.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
