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
    </div>
  );
}
