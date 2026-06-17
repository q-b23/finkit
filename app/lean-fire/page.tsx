import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Lean FIRE — Financial Independence on a Minimal Budget",
  description:
    "Lean FIRE targets retirement on $25,000–$40,000/year. Learn the math, see real budgets, and decide if extreme frugality is the right path for you.",
};

export default function LeanFirePage() {
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
          Lean FIRE — Financial Independence on a Minimal Budget
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          The fastest path to financial independence: extreme frugality to reach your FIRE number years ahead of schedule. Here is the math, the lifestyle tradeoffs, and whether it fits you.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What Is Lean FIRE?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Lean FIRE means retiring on a frugal budget — typically $25,000–$40,000/year for an individual or $40,000–$60,000 for a couple. The target nest egg is $625,000–$1,500,000 at a 4% withdrawal rate. The advantage: you can reach it <strong>5–15 years faster</strong> than traditional FIRE. The tradeoff: your lifestyle is intentionally spartan.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
          <p className="text-sm text-amber-700 mb-2">Lean FIRE at a Glance</p>
          <p className="text-amber-900 text-sm">
            <strong>Income target:</strong> ≤$40,000/person/year &nbsp;|&nbsp; <strong>Nest egg needed:</strong> ≤$1,000,000 &nbsp;|&nbsp; <strong>Lifestyle:</strong> No car, cooking at home, low-cost hobbies, roommates or LCOL area.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">A Realistic Lean FIRE Budget</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Category</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Monthly</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Annual</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Housing (shared or LCOL)</td><td className="text-right py-3 px-3 text-zinc-600">$800</td><td className="text-right py-3 px-3 text-zinc-600">$9,600</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Groceries (home cooking)</td><td className="text-right py-3 px-3 text-zinc-600">$350</td><td className="text-right py-3 px-3 text-zinc-600">$4,200</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Utilities + internet</td><td className="text-right py-3 px-3 text-zinc-600">$200</td><td className="text-right py-3 px-3 text-zinc-600">$2,400</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Health insurance (ACA subsidy)</td><td className="text-right py-3 px-3 text-zinc-600">$250</td><td className="text-right py-3 px-3 text-zinc-600">$3,000</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Transportation (bike/bus)</td><td className="text-right py-3 px-3 text-zinc-600">$100</td><td className="text-right py-3 px-3 text-zinc-600">$1,200</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Phone</td><td className="text-right py-3 px-3 text-zinc-600">$30</td><td className="text-right py-3 px-3 text-zinc-600">$360</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Entertainment + misc</td><td className="text-right py-3 px-3 text-zinc-600">$270</td><td className="text-right py-3 px-3 text-zinc-600">$3,240</td></tr>
              <tr><td className="py-3 px-3 font-semibold text-zinc-900">Total</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">$2,000</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">$24,000</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">Sample lean budget for a single person in a MCOL US city. At $24,000/year, the Lean FIRE target is $600,000.</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Lean FIRE vs Traditional FIRE vs Fat FIRE</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium"></th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Annual Spend</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Nest Egg</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Years to Reach*</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">Lean FIRE</td><td className="text-right py-3 px-3 text-zinc-600">$24,000</td><td className="text-right py-3 px-3 text-zinc-600">$600,000</td><td className="text-right py-3 px-3 text-zinc-600">17 years</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">Traditional FIRE</td><td className="text-right py-3 px-3 text-zinc-600">$48,000</td><td className="text-right py-3 px-3 text-zinc-600">$1,200,000</td><td className="text-right py-3 px-3 text-zinc-600">25 years</td></tr>
              <tr><td className="py-3 px-3 font-medium text-zinc-700">Fat FIRE</td><td className="text-right py-3 px-3 text-zinc-600">$100,000</td><td className="text-right py-3 px-3 text-zinc-600">$2,500,000</td><td className="text-right py-3 px-3 text-zinc-600">35+ years</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">*Starting from $0 at 25, saving 50% of income, 7% return. All targets use the 4% rule.</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Is Lean FIRE Right for You?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Lean FIRE works for people who genuinely enjoy a minimalist lifestyle — not those who see frugality as deprivation. If you already derive joy from hiking, reading, cooking, and community rather than travel, dining, and shopping, Lean FIRE is not a sacrifice. But if you are counting down the days until you can "start living," Lean FIRE will feel like a prison. Be honest about which camp you are in.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Find your Lean FIRE number</p>
            <p className="text-sm text-amber-700 mt-1">Set your annual expenses to a lean budget in the FIRE Calculator. See how many years of work it saves you versus a traditional retirement budget.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">
            Try FIRE Calculator
          </Link>
        </div>
      </article>

      <RelatedArticles category="fire" />
    </div>
  );
}
