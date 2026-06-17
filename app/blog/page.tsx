import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Personal Finance Guides & Strategies",
  description:
    "In-depth articles on debt payoff, FIRE planning, mortgage strategies, and compound interest. Free, no-nonsense guides from the FinKit team.",
};

const POSTS = [
  {
    slug: "/debt-avalanche-vs-snowball",
    title: "Debt Avalanche vs Snowball — Which Strategy Saves More?",
    description:
      "Side-by-side comparison with real numbers. See exactly how much interest and time each method costs you, with a $30K example.",
    date: "2026-06-15",
    readTime: "5 min read",
    tag: "Debt",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    slug: "/pay-off-debt-faster",
    title: "Pay Off Debt Faster — 7 Proven Strategies That Actually Work",
    description:
      "Bi-weekly payments, windfalls, balance transfers, and side hustles. Concrete strategies with real savings numbers.",
    date: "2026-06-15",
    readTime: "6 min read",
    tag: "Debt",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    slug: "/credit-card-payoff",
    title: "Credit Card Payoff — How to Eliminate High-APR Debt Fast",
    description:
      "The minimum payment trap, balance transfer strategy, and debt consolidation — with a real APR comparison table.",
    date: "2026-06-15",
    readTime: "5 min read",
    tag: "Debt",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    slug: "/how-long-to-retire",
    title: "How Long to Retire — The Compound Growth Formula",
    description:
      "Your savings rate is the single biggest lever. Savings rate to retirement timeline quick-reference table included.",
    date: "2026-06-16",
    readTime: "4 min read",
    tag: "FIRE",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "/fire-at-40",
    title: "FIRE at 40 — Can You Retire by 40? Real Numbers",
    description:
      "Breaking down the math to retire at 40. Savings targets, income requirements, and Barista FIRE as a realistic alternative.",
    date: "2026-06-16",
    readTime: "6 min read",
    tag: "FIRE",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "/barista-fire",
    title: "Barista FIRE — Retire Early Without Giving Up Work Entirely",
    description:
      "The middle path: part-time income covers expenses while investments grow. Halves your required nest egg.",
    date: "2026-06-17",
    readTime: "5 min read",
    tag: "FIRE",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "/lean-fire",
    title: "Lean FIRE — Financial Independence on a Minimal Budget",
    description:
      "Retire on $24K/year with a real budget breakdown. Lean vs Traditional vs Fat comparison table.",
    date: "2026-06-17",
    readTime: "5 min read",
    tag: "FIRE",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "/fat-fire",
    title: "Fat FIRE — Retire Early Without Sacrificing Lifestyle",
    description:
      "$100K+/year in retirement. Income-to-timeline projections, career paths, and the lifestyle creep trap.",
    date: "2026-06-17",
    readTime: "5 min read",
    tag: "FIRE",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "/coast-fire-guide",
    title: "Coast FIRE Guide — Let Your Investments Do the Work",
    description:
      "Find your Coast FIRE age — the point where your existing investments grow to your target without another contribution.",
    date: "2026-06-16",
    readTime: "4 min read",
    tag: "FIRE",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    slug: "/compound-interest-examples",
    title: "Compound Interest Examples — See the Math in Action",
    description:
      "Sarah, Mike, and Alex: three real scenarios showing how time, rate, and contributions multiply your savings.",
    date: "2026-06-16",
    readTime: "4 min read",
    tag: "Investing",
    tagColor: "bg-purple-50 text-purple-700",
  },
  {
    slug: "/mortgage-payoff",
    title: "Mortgage Payoff — How to Pay Off Your Mortgage Years Early",
    description:
      "Bi-weekly payments, extra principal, recasting, and refinance — with an interest savings table for each strategy.",
    date: "2026-06-15",
    readTime: "6 min read",
    tag: "Mortgage",
    tagColor: "bg-blue-50 text-blue-700",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          FinKit Blog
        </h1>
        <p className="mt-3 text-base text-zinc-500">
          In-depth articles on debt payoff, FIRE planning, mortgage strategies, and compound interest. No fluff — just real numbers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={post.slug}
            className="group rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md sm:p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${post.tagColor}`}>
                {post.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-400">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              <span className="text-xs text-zinc-400">{post.readTime}</span>
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              {post.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {post.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read article
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
