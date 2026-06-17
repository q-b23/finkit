import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Fat FIRE — Retire Early Without Sacrificing Lifestyle",
  description:
    "Fat FIRE targets a retirement income of $100,000+/year. Learn the math, see real numbers, and decide if a high-income career path to early retirement is right for you.",
};

export default function FatFirePage() {
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
          Fat FIRE — Retire Early Without Sacrificing Lifestyle
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Fat FIRE means retiring early with an above-average lifestyle — $100,000+/year in retirement income. The hardest path, but the most comfortable destination.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What Is Fat FIRE?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Fat FIRE targets a retirement nest egg large enough to sustain an <strong>above-average lifestyle</strong> — typically $100,000–$250,000/year in spending. At a 4% withdrawal rate, that requires $2.5–$6.25 million. The path is hard: it demands a high income ($200,000+), a high savings rate (50%+), and 15–25 years of disciplined execution. The reward: you retire early and <strong>never worry about money again</strong>.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
          <p className="text-sm text-amber-700 mb-2">Fat FIRE at a Glance</p>
          <p className="text-amber-900 text-sm">
            <strong>Income target:</strong> $100,000+/year &nbsp;|&nbsp; <strong>Nest egg:</strong> $2.5M+ &nbsp;|&nbsp; <strong>Path:</strong> High-income career + 50%+ savings rate + 15–25 years.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What $100,000/Year Retirement Looks Like</h2>
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
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Mortgage or rent (nice home)</td><td className="text-right py-3 px-3 text-zinc-600">$2,500</td><td className="text-right py-3 px-3 text-zinc-600">$30,000</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Food (groceries + dining out)</td><td className="text-right py-3 px-3 text-zinc-600">$1,200</td><td className="text-right py-3 px-3 text-zinc-600">$14,400</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Travel (2–3 trips/year)</td><td className="text-right py-3 px-3 text-zinc-600">$1,250</td><td className="text-right py-3 px-3 text-zinc-600">$15,000</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Health insurance</td><td className="text-right py-3 px-3 text-zinc-600">$800</td><td className="text-right py-3 px-3 text-zinc-600">$9,600</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Car (payment + insurance + gas)</td><td className="text-right py-3 px-3 text-zinc-600">$800</td><td className="text-right py-3 px-3 text-zinc-600">$9,600</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Utilities + phone + internet</td><td className="text-right py-3 px-3 text-zinc-600">$500</td><td className="text-right py-3 px-3 text-zinc-600">$6,000</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 text-zinc-700">Entertainment + hobbies</td><td className="text-right py-3 px-3 text-zinc-600">$600</td><td className="text-right py-3 px-3 text-zinc-600">$7,200</td></tr>
              <tr><td className="py-3 px-3 font-semibold text-zinc-900">Total</td><td className="text-right py-3 px-3 font-semibold text-amber-600">$8,333</td><td className="text-right py-3 px-3 font-semibold text-amber-600">$100,000</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">How to Reach Fat FIRE: The Math</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          It comes down to one equation: <strong>high income × high savings rate × time</strong>. If you earn $250,000/year and save 50% ($125,000/year), invested at 7%, you reach $2.5 million in roughly 13 years. If you earn $150,000 and save 50%, it takes about 18 years. The lever is income: Fat FIRE is overwhelmingly a high-earner's game.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Annual Income</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Savings Rate</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Annual Investment</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Years to $2.5M</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$400,000</td><td className="text-right py-3 px-3 text-zinc-600">50%</td><td className="text-right py-3 px-3 text-zinc-600">$200,000</td><td className="text-right py-3 px-3 text-zinc-600">~9 years</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$250,000</td><td className="text-right py-3 px-3 text-zinc-600">50%</td><td className="text-right py-3 px-3 text-zinc-600">$125,000</td><td className="text-right py-3 px-3 text-zinc-600">~13 years</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$180,000</td><td className="text-right py-3 px-3 text-zinc-600">50%</td><td className="text-right py-3 px-3 text-zinc-600">$90,000</td><td className="text-right py-3 px-3 text-zinc-600">~16 years</td></tr>
              <tr><td className="py-3 px-3 font-medium text-zinc-700">$140,000</td><td className="text-right py-3 px-3 text-zinc-600">50%</td><td className="text-right py-3 px-3 text-zinc-600">$70,000</td><td className="text-right py-3 px-3 text-zinc-600">~19 years</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">Assumes 7% real return starting from $0.</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Fat FIRE Career Paths</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The typical Fat FIRE career is in <strong>tech, finance, medicine, law, or entrepreneurship</strong> — fields where $200,000+ incomes are achievable. Many Fat FIRE practitioners pair a high-W2 income with real estate investing or a side business to accelerate the timeline. The common thread: they treat their career as a <strong>limited-duration wealth-building sprint</strong>, not a 40-year marathon.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Risk: Lifestyle Creep</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The biggest threat to Fat FIRE is not the market — it is <strong>lifestyle inflation</strong>. As income rises, the temptation to upgrade housing, cars, and vacations grows. Fat FIRE aspirants need to consciously cap their lifestyle at a level they would be happy with in retirement, and bank the rest. If your income doubles and your spending doubles too, your savings rate stays flat — and your FIRE timeline stalls.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Project your Fat FIRE timeline</p>
            <p className="text-sm text-amber-700 mt-1">Set your income, savings rate, and target nest egg in the FIRE Calculator. See exactly when you can retire with the lifestyle you want.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">
            Try FIRE Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
