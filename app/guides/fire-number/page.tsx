import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "How to Calculate Your FIRE Number (Step by Step)",
  description:
    "Learn how to calculate your FIRE number step by step. Master the 4% rule, factor in inflation, and use our free calculator to find your financial independence target.",
  openGraph: {
    title: "How to Calculate Your FIRE Number — Step by Step Guide + Free Calculator",
    description:
      "Master the 4% rule, inflation adjustments, and Coast FIRE. Includes free browser-based calculator.",
    type: "article",
  },
};

export default function FireNumberGuide() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All guides
      </Link>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-4">
          FIRE
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          How to Calculate Your FIRE Number (Step by Step)
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          The FIRE number is the amount of money you need invested to achieve
          financial independence. Here is exactly how to calculate yours — plus a
          free calculator to do it in seconds.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          The Core Formula: The 4% Rule
        </h2>

        <p className="text-zinc-600 leading-relaxed mb-4">
          The most widely used method comes from the{" "}
          <strong>Trinity Study</strong>, which found that withdrawing 4% of
          your portfolio annually, adjusted for inflation, has a very high
          probability of lasting 30+ years.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 my-6 text-center">
          <p className="text-lg font-mono font-semibold text-zinc-900">
            FIRE Number = Annual Expenses × 25
          </p>
        </div>

        <p className="text-zinc-600 leading-relaxed mb-4">
          Why 25? Because 1 ÷ 0.04 = 25. If you spend $40,000/year, your FIRE
          number is{" "}
          <strong>$40,000 × 25 = $1,000,000</strong>.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          Step-by-Step Calculation
        </h2>

        <h3 className="text-lg font-semibold text-zinc-800 mt-8 mb-2">
          Step 1: Calculate Your Annual Expenses
        </h3>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Track every dollar you spend for 3-6 months. Include rent or mortgage,
          food, utilities, insurance, transportation, and entertainment. Do not
          forget irregular expenses like car repairs or medical bills — average
          them out monthly. Multiply by 12 to get your annual expenses.
        </p>

        <h3 className="text-lg font-semibold text-zinc-800 mt-8 mb-2">
          Step 2: Multiply by 25 (The 4% Rule)
        </h3>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Annual Expenses × 25 = Your baseline FIRE number. This assumes a 4%
          safe withdrawal rate. If your annual spending is $50,000, your FIRE
          number is $1,250,000.
        </p>

        <h3 className="text-lg font-semibold text-zinc-800 mt-8 mb-2">
          Step 3: Adjust for Inflation
        </h3>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If you are 10 years from retirement, $50,000 today will be roughly
          $67,000 at 3% annual inflation. Your FIRE number should reflect future
          expenses, not today's. Use a 3% inflation rate for conservative
          planning.
        </p>

        <h3 className="text-lg font-semibold text-zinc-800 mt-8 mb-2">
          Step 4: Factor In a Safety Margin
        </h3>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Many FIRE practitioners prefer a 3.5% or even 3% withdrawal rate for
          extra safety, especially for retirements longer than 30 years. At 3.5%,
          multiply expenses by 28.6 instead of 25. At 3%, multiply by 33.3.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          What About Coast FIRE?
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Coast FIRE is the point where your existing investments will grow to
          your FIRE number by your target retirement age — even if you never
          invest another dollar. You only need to cover your living expenses
          ("coast") until then.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 my-6 text-center">
          <p className="text-lg font-mono font-semibold text-zinc-900">
            Coast FIRE Number = FIRE Number ÷ (1 + r)^n
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            where r = expected annual return and n = years until retirement
          </p>
        </div>

        {/* CTA */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">
              Calculate your FIRE number now
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Enter your numbers in our free calculator. All calculations run locally — no data leaves your browser.
            </p>
          </div>
          <Link
            href="/dashboard/fire"
            className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
          >
            Open FIRE Calculator
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">
          Key Takeaways
        </h2>
        <ul className="space-y-2 text-zinc-600 mb-6">
          <li>Your FIRE number = annual expenses × 25 (using the 4% rule)</li>
          <li>Track real expenses for 3-6 months — guessing leads to wrong targets</li>
          <li>Adjust for inflation, especially if you are more than 5 years out</li>
          <li>Consider a 3-3.5% withdrawal rate for retirements longer than 30 years</li>
          <li>Coast FIRE lets you stop contributing early if compound growth does the rest</li>
        </ul>
      <RelatedArticles category="fire" />

      </article>
    </div>
  );
}
