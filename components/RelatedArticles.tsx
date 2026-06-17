import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Article = {
  href: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
};

const RELATED: Record<string, Article[]> = {
  debt: [
    {
      href: "/debt-avalanche-vs-snowball",
      title: "Avalanche vs Snowball",
      description: "Side-by-side with real numbers — see the dollar difference.",
      tag: "Debt",
      tagColor: "bg-emerald-50 text-emerald-700",
    },
    {
      href: "/credit-card-payoff",
      title: "Credit Card Payoff",
      description: "Escape the minimum payment trap. Real APR comparison table.",
      tag: "Debt",
      tagColor: "bg-emerald-50 text-emerald-700",
    },
    {
      href: "/pay-off-debt-faster",
      title: "Pay Off Debt Faster",
      description: "7 concrete strategies — bi-weekly, windfalls, balance transfers.",
      tag: "Debt",
      tagColor: "bg-emerald-50 text-emerald-700",
    },
  ],
  fire: [
    {
      href: "/how-long-to-retire",
      title: "How Long to Retire",
      description: "Savings rate to retirement timeline — with a quick-reference table.",
      tag: "FIRE",
      tagColor: "bg-amber-50 text-amber-700",
    },
    {
      href: "/fire-at-40",
      title: "FIRE at 40",
      description: "The math, the income required, and the Barista FIRE alternative.",
      tag: "FIRE",
      tagColor: "bg-amber-50 text-amber-700",
    },
    {
      href: "/coast-fire-guide",
      title: "Coast FIRE Guide",
      description: "The point where your money works harder than you do.",
      tag: "FIRE",
      tagColor: "bg-amber-50 text-amber-700",
    },
  ],
  investing: [
    {
      href: "/how-long-to-retire",
      title: "How Long to Retire",
      description: "Savings rate to retirement timeline — with a quick-reference table.",
      tag: "FIRE",
      tagColor: "bg-amber-50 text-amber-700",
    },
    {
      href: "/coast-fire-guide",
      title: "Coast FIRE Guide",
      description: "The point where your money works harder than you do.",
      tag: "FIRE",
      tagColor: "bg-amber-50 text-amber-700",
    },
    {
      href: "/compound-interest-examples",
      title: "Compound Interest Examples",
      description: "Three real scenarios: Sarah, Mike, and Alex.",
      tag: "Investing",
      tagColor: "bg-purple-50 text-purple-700",
    },
  ],
  mortgage: [
    {
      href: "/mortgage-payoff",
      title: "Mortgage Payoff",
      description: "Cut years off your loan with extra principal and bi-weekly payments.",
      tag: "Mortgage",
      tagColor: "bg-blue-50 text-blue-700",
    },
    {
      href: "/pay-off-debt-faster",
      title: "Pay Off Debt Faster",
      description: "7 concrete strategies — bi-weekly, windfalls, balance transfers.",
      tag: "Debt",
      tagColor: "bg-emerald-50 text-emerald-700",
    },
    {
      href: "/how-long-to-retire",
      title: "How Long to Retire",
      description: "Savings rate to retirement timeline — with a quick-reference table.",
      tag: "FIRE",
      tagColor: "bg-amber-50 text-amber-700",
    },
  ],
};

export default function RelatedArticles({ category }: { category: keyof typeof RELATED }) {
  const articles = RELATED[category];
  if (!articles) return null;

  return (
    <section className="mt-16 border-t border-zinc-100 pt-12">
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group rounded-xl border border-zinc-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 ${article.tagColor}`}>
              {article.tag}
            </span>
            <h3 className="font-semibold text-sm text-zinc-900 group-hover:text-zinc-700 transition-colors">
              {article.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              {article.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors">
              Read <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
