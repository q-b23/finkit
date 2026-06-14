"use client";

import { useState, useMemo } from "react";

const fmt = (n: number): string => {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
};

function calcYearsToFire(
  current: number,
  monthly: number,
  annualReturn: number,
  fireNumber: number
): number | null {
  if (fireNumber <= 0 || annualReturn <= 0) return null;
  if (current >= fireNumber) return 0;
  const r = annualReturn / 100 / 12;
  if (r === 0 && monthly === 0) return null;
  if (r === 0) return Math.ceil((fireNumber - current) / (monthly * 12));
  // Solve: FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r >= fireNumber
  // (1+r)^n >= (fireNumber * r + PMT) / (PV * r + PMT)
  const numerator = fireNumber * r + monthly;
  const denominator = current * r + monthly;
  if (denominator <= 0) return null;
  const months = Math.log(numerator / denominator) / Math.log(1 + r);
  return Math.ceil(months / 12);
}

export default function FIRECalculator() {
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [annualExpenses, setAnnualExpenses] = useState(40000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const fireNumber = useMemo(
    () => (withdrawalRate > 0 ? annualExpenses / (withdrawalRate / 100) : 0),
    [annualExpenses, withdrawalRate]
  );

  const yearsToFire = useMemo(
    () => calcYearsToFire(currentSavings, monthlyInvestment, annualReturn, fireNumber),
    [currentSavings, monthlyInvestment, annualReturn, fireNumber]
  );

  const monthlyIncomeAtFire = useMemo(() => fireNumber * (withdrawalRate / 100) / 12, [fireNumber, withdrawalRate]);

  const inputs = [
    { label: "Current Savings", key: "savings", value: currentSavings, set: setCurrentSavings, prefix: "$", placeholder: "50,000", min: 0, step: 1000 },
    { label: "Monthly Investment", key: "monthly", value: monthlyInvestment, set: setMonthlyInvestment, prefix: "$", placeholder: "1,000", min: 0, step: 100 },
    { label: "Annual Return Rate", key: "return", value: annualReturn, set: setAnnualReturn, suffix: "%", placeholder: "7", min: 0, max: 50, step: 0.5 },
    { label: "Target Annual Expenses in Retirement", key: "expenses", value: annualExpenses, set: setAnnualExpenses, prefix: "$", placeholder: "40,000", min: 0, step: 1000 },
    { label: "Safe Withdrawal Rate", key: "wr", value: withdrawalRate, set: setWithdrawalRate, suffix: "%", placeholder: "4", min: 1, max: 10, step: 0.5 },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left — Input */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Calculate Your FIRE Number</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Adjust the sliders — results update instantly.</p>
        </div>

        <div className="space-y-4">
          {inputs.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">{f.label}</label>
              <div className="flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-700">
                {f.prefix && <span className="mr-1 text-sm text-zinc-400 dark:text-zinc-500">{f.prefix}</span>}
                <input
                  type="number"
                  value={f.value}
                  onChange={(e) => f.set(parseFloat(e.target.value) || 0)}
                  placeholder={f.placeholder}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  className="w-full border-0 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-300 dark:text-zinc-100 dark:placeholder:text-zinc-600 [&::-webkit-inner-spin-button]:opacity-100"
                />
                {f.suffix && <span className="ml-1 text-sm text-zinc-400 dark:text-zinc-500">{f.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="rounded-xl border border-amber-200 bg-amber-50/50 px-5 py-4 dark:border-amber-800 dark:bg-amber-950/20">
          <p className="text-sm italic leading-relaxed text-amber-700 dark:text-amber-300">
            &ldquo;Play iterated games. All the returns in life, whether in wealth, relationships, or knowledge, come from compound interest.&rdquo;
          </p>
          <footer className="mt-2 text-xs font-medium text-amber-500 dark:text-amber-400">— Naval Ravikant</footer>
        </blockquote>
      </div>

      {/* Right — Results */}
      <div className="space-y-5">
        {/* FIRE Number — Hero Metric */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Your FIRE Number</p>
          <p className="mt-2 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{fmt(fireNumber)}</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            At {withdrawalRate}% withdrawal, that&rsquo;s <strong className="text-zinc-700 dark:text-zinc-300">{fmt(monthlyIncomeAtFire)}/mo</strong> in retirement.
          </p>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Years to FIRE</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              {yearsToFire !== null ? yearsToFire : "—"}
            </p>
            {yearsToFire === 0 && <p className="mt-1 text-xs text-emerald-500">You&rsquo;re already there! 🎉</p>}
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Annual Expenses</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{fmt(annualExpenses)}</p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Target lifestyle cost</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-500">
          <div className="text-center">
            <svg className="mx-auto mb-2 h-8 w-8 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="3 17 9 11 13 15 21 7" /><polyline points="17 7 21 7 21 11" />
            </svg>
            <p>Portfolio Growth Chart</p>
            <p className="text-xs">Coming in a future update</p>
          </div>
        </div>
      </div>
    </div>
  );
}
