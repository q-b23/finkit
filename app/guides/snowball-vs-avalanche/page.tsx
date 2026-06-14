import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Snowball vs Avalanche — Full Strategy Comparison",
  description:
    "Deep dive into both debt repayment methods with real examples, pros and cons, and guidance on which strategy to pick for your situation.",
};

export default function SnowballVsAvalancheGuide() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All guides
      </Link>

      <div className="mb-10">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-4">
          Debt
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Snowball vs Avalanche — Full Strategy Comparison
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Everything you need to know to choose between the two most popular debt payoff strategies.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Debt Snowball Method</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Popularized by Dave Ramsey, the snowball method prioritizes debts by balance size — smallest to largest. You make minimum payments on everything and throw all extra cash at the smallest debt. Once it is gone, you roll that payment into the next smallest, creating a "snowball" effect.
        </p>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 my-6">
          <p className="font-semibold text-emerald-900 text-sm mb-1">Key advantage</p>
          <p className="text-emerald-800 text-sm">Psychological momentum. Paying off small debts quickly creates visible progress and builds confidence.</p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Debt Avalanche Method</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The avalanche method prioritizes debts by interest rate — highest to lowest. You pay minimums on everything and direct all extra money to the highest-rate debt. Mathematically, this minimizes total interest paid.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
          <p className="font-semibold text-blue-900 text-sm mb-1">Key advantage</p>
          <p className="text-blue-800 text-sm">Mathematically optimal. You always pay the least total interest, which means you get out of debt faster.</p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">How to Choose</h2>
        <p className="text-zinc-600 leading-relaxed mb-2">
          <strong>Choose snowball if:</strong> You have struggled to stick with financial plans in the past. The early wins keep you motivated when the journey feels long.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          <strong>Choose avalanche if:</strong> You are disciplined and want to minimize every dollar of interest. The math is on your side, and over large balances the savings are significant.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">Run both strategies with your real numbers</p>
            <p className="text-sm text-emerald-700 mt-1">Our Debt Payoff Planner compares snowball and avalanche side by side. See the exact difference in months and dollars.</p>
          </div>
          <Link href="/dashboard/debt" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Try Debt Planner
          </Link>
        </div>
      </article>
    </div>
  );
}
