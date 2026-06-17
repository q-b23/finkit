import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Debt Avalanche vs Snowball — Which Strategy Saves More?",
  description:
    "Side-by-side comparison of avalanche and snowball debt payoff methods. Real numbers, total interest saved, and timeline differences explained.",
};

export default function DebtAvalancheVsSnowballPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8 -mx-1 px-1 py-1.5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>

      <div className="mb-10">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-4">
          Debt
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Debt Avalanche vs Snowball — Which Strategy Saves More?
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          A data-driven comparison with real numbers. See exactly how much interest and time each method costs you.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Core Difference</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Both methods require the same discipline — pay minimums on everything, throw all extra cash at one target debt. The only difference is <strong>which debt you target first</strong>.
        </p>
        <ul className="space-y-3 text-zinc-600 my-6">
          <li><strong>Snowball:</strong> Target the smallest balance first. Quick wins build momentum.</li>
          <li><strong>Avalanche:</strong> Target the highest interest rate first. Math says this saves the most money.</li>
        </ul>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Real Example: $30,000 Across 3 Debts</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Imagine you have three debts: a $2,000 credit card at 24%, a $8,000 personal loan at 15%, and a $20,000 car loan at 6%. You can afford $800/month extra beyond minimums.
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Method</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Months to Payoff</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Total Interest</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-3 font-medium text-zinc-700">Snowball</td>
                <td className="text-right py-3 px-3 text-zinc-600">~44 months</td>
                <td className="text-right py-3 px-3 text-zinc-600">~$7,200</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-3 font-medium text-zinc-700">Avalanche</td>
                <td className="text-right py-3 px-3 text-zinc-600">~42 months</td>
                <td className="text-right py-3 px-3 text-zinc-600">~$6,400</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-emerald-700">Avalanche saves</td>
                <td className="text-right py-3 px-3 font-semibold text-emerald-700">2 months</td>
                <td className="text-right py-3 px-3 font-semibold text-emerald-700">~$800</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">When Snowball Wins</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The snowball method is not mathematically optimal, but it is <em>psychologically</em> powerful. If you have 6+ small debts (medical bills, store cards, etc.), knocking them out one by one creates visible progress that keeps you going. Studies show people who use snowball are more likely to stick with their plan long-term.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">When Avalanche Wins</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If your highest-rate debt is also your largest balance, avalanche saves dramatically more. For someone with a $25,000 credit card at 29% APR, paying that off first instead of a smaller 4% car loan can save thousands in interest and cut months off the timeline.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">Compare both strategies with your own debts</p>
            <p className="text-sm text-emerald-700 mt-1">Our Debt Payoff Planner runs snowball and avalanche side by side so you can see the exact difference in dollars and months.</p>
          </div>
          <Link href="/dashboard/debt" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Try Debt Planner
          </Link>
        </div>
      </article>

      <RelatedArticles category="debt" />
    </div>
  );
}
