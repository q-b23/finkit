import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "The 4% Rule Explained",
  description:
    "Understanding the Trinity Study, safe withdrawal rates, and how to adjust for longer retirements and current market conditions.",
};

export default function FourPercentRuleGuide() {
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
        <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-4">
          FIRE
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          The 4% Rule Explained — Does It Still Work?
        </h1>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Where the 4% Rule Comes From</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The 4% rule originated from the <strong>Trinity Study</strong> (1998), conducted by three finance professors at Trinity University. They analyzed historical stock and bond returns from 1926 to 1995 and determined that a portfolio of 50% stocks and 50% bonds could sustain a 4% annual withdrawal rate, adjusted for inflation, over a 30-year retirement with a high probability of success.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">How It Works</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          In year one, you withdraw 4% of your portfolio. Each subsequent year, you adjust that dollar amount for inflation — regardless of market performance. If the market drops, you still take the inflation-adjusted amount, which may be more than 4% of the current balance.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          This is the key insight of the Trinity Study: the 4% rule survived the worst historical periods, including the Great Depression and the 1970s stagflation.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Criticisms and Modern Adjustments</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Critics argue that future returns may be lower, bond yields are lower than historical averages, and many early retirees need their money to last 40-60 years — not 30. For these reasons, many in the FIRE community now recommend more conservative withdrawal rates.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 my-6">
          <p className="font-semibold text-zinc-900 mb-2">Updated safe withdrawal rates:</p>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li><strong>4.0%</strong> — Traditional, for 30-year retirements</li>
            <li><strong>3.5%</strong> — Conservative, for 40-year retirements</li>
            <li><strong>3.0%</strong> — Ultra-safe, for 50+ year retirements (perpetual withdrawal)</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Bottom Line</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The 4% rule is not a law — it is a guideline. It gives you a starting point for estimating your FIRE number. The right withdrawal rate depends on your risk tolerance, retirement length, and asset allocation. Use our calculator to model different rates and find the number that works for you.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Model your own FIRE number</p>
            <p className="text-sm text-amber-700 mt-1">Adjust withdrawal rates and see how your target changes. 100% private, calculated in your browser.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">
            Open FIRE Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
