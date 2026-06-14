import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Snowball vs Avalanche — Which Debt Payoff Strategy Is Right for You?",
  description:
    "A deep comparison of the two most popular debt repayment methods — how they work, the math behind each, and which one saves you more money.",
  openGraph: {
    title: "Snowball vs Avalanche — Which Debt Payoff Strategy Is Right for You?",
    description:
      "Compare snowball and avalanche debt payoff methods side by side. Learn which strategy saves more interest and which keeps you motivated.",
    type: "article",
    publishedTime: "2026-06-13",
  },
};

export default function BlogPost() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All posts
      </Link>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-4">
          Debt
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Snowball vs Avalanche: Which Debt Payoff Strategy Is Right for You?
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
          <span>June 13, 2026</span>
          <span>·</span>
          <span>6 min read</span>
        </div>
      </div>

      {/* Article body */}
      <article className="prose prose-zinc max-w-none">
        <p className="text-lg leading-relaxed text-zinc-600">
          If you are paying down multiple debts, you have probably heard of two
          competing strategies: the <strong>debt snowball</strong> and the{" "}
          <strong>debt avalanche</strong>. Both work. Both have passionate fans.
          But they attack the problem from opposite angles — and the one you
          choose can mean a difference of months and thousands of dollars.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          How the Debt Snowball Works
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          With the snowball method, you list your debts from smallest balance to
          largest — regardless of interest rate. You make minimum payments on
          everything, then throw every extra dollar at the smallest debt. Once
          that debt is paid off, you roll its payment into the next-smallest
          debt. The balance grows like a snowball rolling downhill.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          <strong>Why it works:</strong> Psychology. Knocking out small debts
          quickly gives you quick wins. Each paid-off account is a dopamine hit
          that keeps you going. Research from Northwestern University found that
          people who use the snowball method are more likely to stick with their
          plan and ultimately pay off all their debt.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          How the Debt Avalanche Works
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          With the avalanche method, you sort debts by interest rate — highest
          first. Same deal: minimums on everything, extra cash goes to the
          highest-rate debt. Once the most expensive debt is dead, you move to
          the next-highest rate.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          <strong>Why it works:</strong> Math. By eliminating the highest
          interest rates first, you minimize the total interest you pay. The
          avalanche is mathematically optimal — it always costs less than the
          snowball, assuming you stick with it.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          Head-to-Head Comparison
        </h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-3 px-4 font-semibold text-zinc-900">Factor</th>
                <th className="text-left py-3 px-4 font-semibold text-emerald-700">Snowball</th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">Avalanche</th>
              </tr>
            </thead>
            <tbody className="text-zinc-600">
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-900">Sorting criteria</td>
                <td className="py-3 px-4">Smallest balance first</td>
                <td className="py-3 px-4">Highest interest rate first</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-900">Total interest paid</td>
                <td className="py-3 px-4">Higher</td>
                <td className="py-3 px-4">Lower (mathematically optimal)</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-900">Time to first win</td>
                <td className="py-3 px-4">Faster</td>
                <td className="py-3 px-4">Slower (largest debts may come last)</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-900">Psychological boost</td>
                <td className="py-3 px-4">High — quick wins build momentum</td>
                <td className="py-3 px-4">Lower — requires discipline</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-900">Best for</td>
                <td className="py-3 px-4">People who need motivation</td>
                <td className="py-3 px-4">People who want to minimize cost</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          A Real Example
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Imagine you have three debts: a $1,000 credit card at 24% APR, a
          $5,000 personal loan at 12% APR, and a $10,000 car loan at 6% APR.
          You have $500/month extra to throw at debt on top of minimums.
        </p>
        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-6 my-6">
          <p className="text-sm font-semibold text-zinc-900 mb-2">
            Snowball result: Paid off in 34 months, ${((16000 * 0.12 * 34 / 12)).toFixed(0)} in total interest
          </p>
          <p className="text-sm font-semibold text-emerald-700">
            Avalanche result: Paid off in 33 months, saves ~$400 more in interest
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          Which Should You Choose?
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If you are the type who needs visible progress to stay motivated, go
          snowball. The psychological edge is real, and completing any plan is
          better than abandoning a mathematically perfect one.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If you are disciplined and want to minimize every dollar of interest,
          go avalanche. Over large balances and long timelines, the savings add
          up significantly.
        </p>

        {/* CTA */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">
              See which strategy saves you more
            </p>
            <p className="text-sm text-emerald-700 mt-1">
              Enter your real debts and compare snowball vs avalanche side by side — all calculated locally.
            </p>
          </div>
          <Link
            href="/dashboard/debt"
            className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            Try Debt Planner
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          The Bottom Line
        </h2>
        <p className="text-zinc-600 leading-relaxed">
          The best strategy is the one you will actually follow through on.
          Both snowball and avalanche work — the difference is in the details.
          Use our free Debt Payoff Planner to run both scenarios with your real
          numbers and see exactly how many months and dollars separate them.
        </p>
      </article>
    </div>
  );
}
