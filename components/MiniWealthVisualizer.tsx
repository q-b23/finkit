"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

/**
 * Compound interest formula: Future Value of a series.
 *   FV = P * ((1 + r)^n - 1) / r
 *
 *   P = monthly contribution
 *   r = monthly interest rate (annual 7% / 12)
 *   n = number of months
 */
function computeNestEgg(
  monthlySavings: number,
  currentAge: number,
  targetFireAge: number
): number {
  const years = targetFireAge - currentAge;
  if (years <= 0) return 0;

  const months = years * 12;
  const monthlyRate = 0.07 / 12;
  const fv =
    monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return Math.round(fv);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MiniWealthVisualizer() {
  // Mount guard to avoid hydration mismatch on slider rendering
  const [mounted, setMounted] = useState(false);
  const [monthlySavings, setMonthlySavings] = useState(1000);
  const [currentAge, setCurrentAge] = useState(30);
  const [targetFireAge, setTargetFireAge] = useState(50);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nestEgg = mounted
    ? computeNestEgg(monthlySavings, currentAge, targetFireAge)
    : computeNestEgg(1000, 30, 50);

  // Guard against impossible age combos
  const validYears = targetFireAge > currentAge;
  const displayValue = validYears ? formatCurrency(nestEgg) : "—";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl shadow-zinc-900/30 backdrop-blur-xl sm:p-5 md:p-6">
      {/* Subtle glow behind the card */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
            <Calculator className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-zinc-300">
            See the math in real-time
          </span>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          {/* Monthly Savings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="hero-monthly-savings"
                className="text-sm font-medium text-zinc-400"
              >
                Monthly Savings
              </label>
              <span className="text-lg font-semibold text-white tabular-nums sm:text-xl">
                {mounted
                  ? formatCurrency(monthlySavings)
                  : formatCurrency(1000)}
              </span>
            </div>
            <input
              id="hero-monthly-savings"
              type="range"
              min={100}
              max={5000}
              step={100}
              value={mounted ? monthlySavings : 1000}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              className="hero-slider w-full"
              style={{ fontSize: 16 }}
              aria-label="Monthly savings amount"
            />
            <div className="flex justify-between text-xs text-zinc-600">
              <span>$100</span>
              <span>$5,000</span>
            </div>
          </div>

          {/* Current Age */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="hero-current-age"
                className="text-sm font-medium text-zinc-400"
              >
                Current Age
              </label>
              <span className="text-lg font-semibold text-white tabular-nums sm:text-xl">
                {mounted ? currentAge : 30}
              </span>
            </div>
            <input
              id="hero-current-age"
              type="range"
              min={18}
              max={60}
              step={1}
              value={mounted ? currentAge : 30}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="hero-slider w-full"
              style={{ fontSize: 16 }}
              aria-label="Current age"
            />
            <div className="flex justify-between text-xs text-zinc-600">
              <span>18</span>
              <span>60</span>
            </div>
          </div>

          {/* Target FIRE Age */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="hero-target-age"
                className="text-sm font-medium text-zinc-400"
              >
                Target FIRE Age
              </label>
              <span className="text-lg font-semibold text-white tabular-nums sm:text-xl">
                {mounted ? targetFireAge : 50}
              </span>
            </div>
            <input
              id="hero-target-age"
              type="range"
              min={35}
              max={70}
              step={1}
              value={mounted ? targetFireAge : 50}
              onChange={(e) => setTargetFireAge(Number(e.target.value))}
              className="hero-slider w-full"
              style={{ fontSize: 16 }}
              aria-label="Target retirement age"
            />
            <div className="flex justify-between text-xs text-zinc-600">
              <span>35</span>
              <span>70</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Projected Nest Egg
          </p>
          <p
            className={`mt-1 font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${
              validYears ? "text-emerald-400" : "text-zinc-600"
            }`}
          >
            {displayValue}
          </p>
          {!validYears && (
            <p className="mt-1 text-xs text-zinc-500">
              Your target age must be greater than your current age.
            </p>
          )}
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-xs leading-relaxed text-zinc-600">
          Calculated instantly in your browser. No servers involved.
        </p>
      </div>
    </div>
  );
}
