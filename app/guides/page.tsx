import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "In-depth personal finance guides — FIRE planning, debt payoff strategies, loan comparison, and compound interest explained.",
};

const GUIDES = [
  {
    slug: "fire-number",
    title: "How to Calculate Your FIRE Number (Step by Step)",
    description:
      "Master the 4% rule, inflation adjustments, and Coast FIRE. Learn the exact formula to find your financial independence target.",
    readTime: "5 min read",
    tag: "FIRE",
    accent: "text-amber-600 bg-amber-50",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "snowball-vs-avalanche",
    title: "Snowball vs Avalanche — Full Strategy Comparison",
    description:
      "Deep dive into both debt repayment methods with real examples, pros and cons, and guidance on which to pick.",
    readTime: "6 min read",
    tag: "Debt",
    accent: "text-emerald-600 bg-emerald-50",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    slug: "four-percent-rule",
    title: "The 4% Rule Explained — Does It Still Work?",
    description:
      "Understanding the Trinity Study, safe withdrawal rates, and how to adjust for longer retirements and current market conditions.",
    readTime: "5 min read",
    tag: "FIRE",
    accent: "text-amber-600 bg-amber-50",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "compound-interest",
    title: "How Compound Interest Works — With Real Examples",
    description:
      "The most powerful force in personal finance, explained with concrete numbers. See how time and rate multiply your savings.",
    readTime: "4 min read",
    tag: "Investing",
    accent: "text-purple-600 bg-purple-50",
    tagColor: "bg-purple-50 text-purple-700",
  },
  {
    slug: "coast-fire",
    title: "What Is Coast FIRE and How to Calculate It",
    description:
      "The point where your investments will grow to your FIRE number without another dollar of contributions. Find your Coast FIRE age.",
    readTime: "4 min read",
    tag: "FIRE",
    accent: "text-amber-600 bg-amber-50",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "debt-payoff-timeline",
    title: "How Long to Pay Off Debt With Extra Payments",
    description:
      "Calculate exactly when you will be debt-free. See how even small extra payments can shave years off your timeline.",
    readTime: "4 min read",
    tag: "Debt",
    accent: "text-emerald-600 bg-emerald-50",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    slug: "loan-apr",
    title: "What Is a Good APR? Mortgage, Auto, and Personal Loan Guide",
    description:
      "Understand APR across loan types, what rates to expect in 2026, and how your credit score impacts what you pay.",
    readTime: "5 min read",
    tag: "Loans",
    accent: "text-blue-600 bg-blue-50",
    tagColor: "bg-blue-50 text-blue-700",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
            <BookOpen className="h-5 w-5 text-zinc-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Guides
          </h1>
        </div>
        <p className="text-zinc-500 max-w-2xl">
          In-depth articles to help you understand personal finance concepts and make smarter decisions with your money.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${guide.tagColor}`}>
                {guide.tag}
              </span>
              <span className="text-xs text-zinc-400">{guide.readTime}</span>
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              {guide.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {guide.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read guide
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>


      {/* Long-Form Articles */}
      <div className="mt-16 pt-12 border-t border-zinc-100">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-6">
          Long-Form Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/debt-avalanche-vs-snowball"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">Debt</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Debt Avalanche vs Snowball — Which Strategy Saves More?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Side-by-side comparison with real numbers. See exactly how much interest and time each method costs you.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/how-long-to-retire"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              How Long to Retire — The Compound Growth Formula
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Your savings rate is the single biggest lever. See exactly how it translates to years until retirement.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/fire-at-40"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              FIRE at 40 — Can You Retire by 40? Real Numbers
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Breaking down the math to retire at 40. Savings targets, income requirements, and Barista FIRE as a realistic path.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/coast-fire-guide"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Coast FIRE Guide — Let Your Investments Do the Work
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Find your Coast FIRE age — the point where your investments grow to your target without another contribution.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/compound-interest-examples"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-purple-700 mb-3">Investing</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Compound Interest Examples — See the Math in Action
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Three real scenarios showing how time, rate, and contributions multiply your savings over decades.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/pay-off-debt-faster"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">Debt</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Pay Off Debt Faster — 7 Proven Strategies
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Bi-weekly payments, windfalls, balance transfers, and side hustles. Concrete strategies with real savings numbers.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/credit-card-payoff"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">Debt</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Credit Card Payoff — Kill High-APR Debt Fast
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              The minimum payment trap, balance transfer strategy, and debt consolidation — with a real APR comparison table.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/mortgage-payoff"
            className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700 mb-3">Mortgage</span>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Mortgage Payoff — Cut Years Off Your Loan
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Bi-weekly payments, extra principal, recasting, and refinance — with an interest savings table for each strategy.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
}
