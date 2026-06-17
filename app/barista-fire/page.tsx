import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Barista FIRE — Retire Early Without Giving Up Work Entirely",
  description:
    "Barista FIRE combines partial retirement with a low-stress job for benefits and supplemental income. Calculate your Barista FIRE number and see if it is right for you.",
};

export default function BaristaFirePage() {
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
        <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-4">
          FIRE
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Barista FIRE — Retire Early Without Giving Up Work Entirely
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          The middle path between full-time grind and full retirement. A low-stress job covers living expenses while your investments grow untouched for decades.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What Is Barista FIRE?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Barista FIRE means you have saved enough that your investments will eventually reach your full FIRE number without further contributions — but you are not ready to stop working entirely. Instead, you leave your high-stress career for a <strong>low-stress job</strong> that covers your living expenses. The most cited example: working at Starbucks for health insurance (hence "Barista" FIRE).
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
          <p className="text-sm text-amber-700 mb-2">Barista FIRE Formula</p>
          <p className="text-sm text-amber-900">
            <strong>Part-time income ≥ Living expenses.</strong> Your investments grow untouched — no withdrawals needed. When you reach full retirement age, you stop working completely and begin the 4% withdrawal.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">How Much Do You Need for Barista FIRE?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          It depends on how much of your expenses the part-time job covers. If you earn $24,000/year from a part-time job and your annual expenses are $48,000, your investments only need to cover the remaining $24,000/year. At a 4% withdrawal rate, that means a <strong>$600,000 nest egg</strong> instead of the full $1.2 million. That is the power of Barista FIRE — it roughly halves your required nest egg.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Part-Time Income</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Expenses Covered by Job</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Nest Egg Needed</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">vs Full FIRE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$12,000/yr</td><td className="text-right py-3 px-3 text-zinc-600">25%</td><td className="text-right py-3 px-3 text-zinc-600">$900,000</td><td className="text-right py-3 px-3 text-zinc-600">−$300K</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$24,000/yr</td><td className="text-right py-3 px-3 text-zinc-600">50%</td><td className="text-right py-3 px-3 text-zinc-600">$600,000</td><td className="text-right py-3 px-3 text-zinc-600">−$600K</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$36,000/yr</td><td className="text-right py-3 px-3 text-zinc-600">75%</td><td className="text-right py-3 px-3 text-zinc-600">$300,000</td><td className="text-right py-3 px-3 text-zinc-600">−$900K</td></tr>
              <tr><td className="py-3 px-3 font-medium text-zinc-700">$48,000/yr</td><td className="text-right py-3 px-3 text-zinc-600">100%</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">$0</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">Full FI</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">Assumes $48,000 annual expenses and 4% safe withdrawal rate. Full FIRE target: $1.2M.</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Best Barista FIRE Jobs</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The ideal Barista FIRE job has three qualities: <strong>low stress</strong>, <strong>health insurance</strong>, and <strong>flexible hours</strong>. Popular choices include working at a coffee shop or bookstore (health insurance at 20+ hours at Starbucks), tutoring or teaching part-time, freelance writing or consulting in your former field (high hourly rate, low hours), dog walking or pet sitting, and seasonal work like tax preparation or summer camp staffing.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Barista FIRE vs Coast FIRE — What Is the Difference?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Coast FIRE means your investments will grow to your target by retirement age without more contributions — but you still need to cover living expenses from a job. Barista FIRE is <strong>one way to execute Coast FIRE</strong>: intentionally switching to a lower-paying, lower-stress job that covers expenses while your investments coast. Coast FIRE is the math; Barista FIRE is the lifestyle choice.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Calculate your path to Barista FIRE</p>
            <p className="text-sm text-amber-700 mt-1">Enter your numbers in the FIRE Calculator. Adjust your target nest egg down based on expected part-time income to see how much sooner you can leave your full-time job.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">
            Try FIRE Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
