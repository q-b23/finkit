import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "How Long to Retire — The Compound Growth Formula",
  description:
    "Calculate exactly how many years you need to retire based on your savings rate, income, and expenses. Real examples with different starting ages.",
};

export default function HowLongToRetirePage() {
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
          How Long to Retire — The Compound Growth Formula
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Your savings rate is the single biggest lever. Here is exactly how it translates to years until retirement, with real numbers.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Simple Math of Early Retirement</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The time to retirement depends on exactly one ratio: <strong>how much you save ÷ how much you earn</strong>. If you save 10% of your income, you need roughly 51 years. If you save 50%, you need roughly 17 years. This is the power of savings rate.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Savings Rate</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Working Years</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Retire At (from 25)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">10%</td><td className="text-right py-3 px-3 text-zinc-600">51 years</td><td className="text-right py-3 px-3 text-zinc-600">76</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">20%</td><td className="text-right py-3 px-3 text-zinc-600">37 years</td><td className="text-right py-3 px-3 text-zinc-600">62</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">30%</td><td className="text-right py-3 px-3 text-zinc-600">28 years</td><td className="text-right py-3 px-3 text-zinc-600">53</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">40%</td><td className="text-right py-3 px-3 text-zinc-600">22 years</td><td className="text-right py-3 px-3 text-zinc-600">47</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">50%</td><td className="text-right py-3 px-3 text-zinc-600">17 years</td><td className="text-right py-3 px-3 text-zinc-600">42</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">60%</td><td className="text-right py-3 px-3 text-zinc-600">12.5 years</td><td className="text-right py-3 px-3 text-zinc-600">37.5</td></tr>
              <tr><td className="py-3 px-3 font-medium text-zinc-700">70%</td><td className="text-right py-3 px-3 text-zinc-600">8.5 years</td><td className="text-right py-3 px-3 text-zinc-600">33.5</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-zinc-400 mt-2">
          Assumes 7% annual return, 4% safe withdrawal rate, and starting from $0. Adapted from Mr. Money Mustache's "Shockingly Simple Math."
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Starting Age Matters Tremendously</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Starting at 25 vs 35 with the same 40% savings rate is the difference between retiring at 47 and retiring at 57. Those 10 early years benefit from compound growth — every dollar saved at 25 is worth roughly twice as much as a dollar saved at 35 by retirement age.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Two Ways to Improve Your Timeline</h2>
        <ol className="space-y-3 text-zinc-600 my-6">
          <li><strong>Increase income:</strong> A $10,000 raise, if you save 100% of it, adds $10,000/year to investments while keeping expenses flat. This is the fastest lever.</li>
          <li><strong>Decrease expenses:</strong> Cutting $500/month from spending both reduces your FIRE number (you need less to live on) and increases your savings rate. Double impact.</li>
        </ol>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Calculate your exact retirement date</p>
            <p className="text-sm text-amber-700 mt-1">Plug in your age, savings, and target date. The FIRE Calculator shows your projected nest egg and Coast FIRE age.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">
            Try FIRE Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
