import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "FIRE at 40 — Can You Retire by 40? Real Numbers",
  description:
    "Breaking down the math to retire at 40. How much you need to save, what it takes at different starting ages, and a realistic roadmap.",
};

export default function FireAt40Page() {
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
        <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-4">
          FIRE
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          FIRE at 40 — Can You Retire by 40? Real Numbers
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          The math behind retiring two decades before the traditional age. It is aggressive but achievable with the right plan.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Target: How Much You Need</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Using the 4% rule, your FIRE number is <strong>25× your annual expenses</strong>. If you need $48,000/year to live comfortably, your target is $1.2 million. That is the nest egg that can sustain you indefinitely.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-500 mb-2">FIRE at 40 formula</p>
          <p className="text-lg font-mono font-semibold text-zinc-900">
            Nest Egg = Annual Expenses × 25
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Scenario: Starting at 22 (Right Out of College)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          You have 18 working years. To reach $1.2 million, investing at 7% real return, you need to save roughly <strong>$2,800/month</strong>. That means earning around $85,000–$100,000/year and living on $48,000. A 50%+ savings rate.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Scenario: Starting at 30 (Career Change)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          With only 10 years, the math tightens dramatically. You would need approximately <strong>$6,800/month</strong> invested — requiring an income of $150,000+ and disciplined frugality. Possible for high earners in tech, medicine, or law.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Realistic Path: Barista FIRE</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Many people who target 40 end up at "Barista FIRE" — leaving their high-stress career at 40, but working part-time or in a passion job to cover a portion of expenses. This drops the required nest egg dramatically. If you only need your investments to cover $24,000/year (with a part-time job covering the rest), your target is $600,000 instead of $1.2M.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Key Numbers by Starting Age</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Start Age</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Monthly to Invest</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Required Income</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Savings Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">22</td><td className="text-right py-3 px-3 text-zinc-600">$2,800</td><td className="text-right py-3 px-3 text-zinc-600">$85,000+</td><td className="text-right py-3 px-3 text-zinc-600">50%+</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">25</td><td className="text-right py-3 px-3 text-zinc-600">$3,400</td><td className="text-right py-3 px-3 text-zinc-600">$95,000+</td><td className="text-right py-3 px-3 text-zinc-600">55%+</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">30</td><td className="text-right py-3 px-3 text-zinc-600">$6,800</td><td className="text-right py-3 px-3 text-zinc-600">$150,000+</td><td className="text-right py-3 px-3 text-zinc-600">60%+</td></tr>
              <tr><td className="py-3 px-3 font-medium text-zinc-700">35</td><td className="text-right py-3 px-3 text-zinc-600">$17,000</td><td className="text-right py-3 px-3 text-zinc-600">$300,000+</td><td className="text-right py-3 px-3 text-zinc-600">70%+</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">
          Target: $1.2M nest egg. Assumes 7% real return. All figures pre-tax.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">See your personal FIRE projection</p>
            <p className="text-sm text-amber-700 mt-1">Adjust age, savings, and target date to see exactly where you stand and what it takes to reach 40.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">
            Try FIRE Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
