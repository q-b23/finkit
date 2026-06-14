import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Personal finance guides, debt payoff strategies, FIRE planning tips, and loan comparison insights — all from the FinKit team.",
};

const POSTS = [
  {
    slug: "snowball-vs-avalanche",
    title: "Snowball vs Avalanche: Which Debt Payoff Strategy Is Right for You?",
    description:
      "A deep comparison of the two most popular debt repayment methods — how they work, the math behind each, and which one saves you more money.",
    date: "2026-06-13",
    readTime: "6 min read",
    tag: "Debt",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          FinKit Blog
        </h1>
        <p className="mt-3 text-zinc-500">
          Strategies, guides, and insights for taking control of your financial future.
        </p>
      </div>

      <div className="space-y-8">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700">
                {post.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-400">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              <span className="text-xs text-zinc-400">{post.readTime}</span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
              {post.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {post.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
              Read more
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
