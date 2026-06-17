import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Compound Interest Examples — See the Math in Action",
  description:
    "Real compound interest examples with charts and numbers. See how time, rate, and monthly contributions multiply your savings over decades.",
};

export default function CompoundInterestExamplesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>

      <div className="mb-10">
        <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-purple-700 mb-4">
          Investing
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Compound Interest Examples — See the Math in Action
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Three concrete scenarios showing how time, rate, and monthly contributions multiply your money. No theory — just numbers.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Example 1: The Early Starter ($500/month from 25)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Sarah starts at 25, investing $500/month ($6,000/year) in a low-cost index fund earning 7%. After 40 years at 65, she has contributed $240,000 of her own money.
        </p>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-500 mb-1">Result at age 65</p>
          <p className="text-2xl font-mono font-bold text-emerald-600">$1,197,811</p>
          <p className="text-xs text-zinc-400 mt-1">$240,000 contributed → $957,811 in pure growth (4.99×)</p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Example 2: The Late Starter ($1,000/month from 40)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Mike waits until 40 but saves twice as much — $1,000/month ($12,000/year). He invests for 25 years at 7%. He contributes $300,000 total.
        </p>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-500 mb-1">Result at age 65</p>
          <p className="text-2xl font-mono font-bold text-amber-600">$759,494</p>
          <p className="text-xs text-zinc-400 mt-1">$300,000 contributed → $459,494 in growth (2.53×)</p>
        </div>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Mike contributed 25% more money but ended with <strong>$438,000 less</strong>. Sarah's 15-year head start, even with half the monthly contribution, crushed Mike's results. This is the power of time.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Example 3: The Lump Sum ($50,000 at 30, Never Adds Another Dollar)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Alex receives a $50,000 windfall at 30 and invests it all. They never add another cent. At 7% for 35 years:
        </p>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-500 mb-1">Result at age 65</p>
          <p className="text-2xl font-mono font-bold text-blue-600">$533,829</p>
          <p className="text-xs text-zinc-400 mt-1">$50,000 contributed → $483,829 in growth (10.68×)</p>
        </div>
        <p className="text-zinc-600 leading-relaxed mb-4">
          A single $50,000 at 30, with zero additional effort, grew to over half a million. This is Coast FIRE in action — the lump sum does the heavy lifting while you live your life.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Three Rules of Compound Interest</h2>
        <ol className="space-y-3 text-zinc-600 my-6">
          <li><strong>Start early.</strong> Sarah's 15-year advantage over Mike was worth $438,000. You cannot out-earn time.</li>
          <li><strong>Be consistent.</strong> Monthly contributions, even small ones, add up. $500/month from 25 beats $1,000/month from 40.</li>
          <li><strong>Let it sit.</strong> Alex's $50,000 grew 10× with zero effort. The market rewards patience, not activity.</li>
        </ol>

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-purple-900">Run your own compound interest projection</p>
            <p className="text-sm text-purple-700 mt-1">Adjust monthly savings, age, and target date. See your projected nest egg update in real time — right on the home page.</p>
          </div>
          <Link href="/" className="shrink-0 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors">
            Try Interactive Widget
          </Link>
        </div>
      </article>
    </div>
  );
}
