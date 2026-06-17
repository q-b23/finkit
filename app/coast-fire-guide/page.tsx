import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Coast FIRE Guide — Let Your Investments Do the Work",
  description:
    "Learn how to find your Coast FIRE age — the point where your existing investments grow to your retirement number without another contribution.",
};

export default function CoastFireGuidePage() {
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
          Coast FIRE Guide — Let Your Investments Do the Work
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Coast FIRE is the moment you can stop contributing and still retire on time, because compound growth carries you the rest of the way.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What Is Coast FIRE?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Coast FIRE (also called "Coast FI") is the point where your existing investments will grow to your full FIRE number by your target retirement age — without you adding another dollar. You have "front-loaded" your savings. Now your money works while you just cover living expenses.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
          <p className="text-sm text-amber-700 mb-2">Example</p>
          <p className="text-amber-900 text-sm">
            If you have $200,000 invested at age 30 and want to retire at 65 with $1.5M, you are already at Coast FIRE. At 7% return, $200K grows to ~$1.6M in 35 years with zero additional contributions.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Why Coast FIRE Is Powerful</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Reaching Coast FIRE unlocks psychological freedom. You can take a lower-paying but more fulfilling job, go part-time, or start a business — as long as you cover your living expenses, your retirement is already funded by compound growth.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Coast FIRE Formula</h2>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-500 mb-2">Coast FIRE Number Formula</p>
          <p className="text-base font-mono font-semibold text-zinc-900">
            Coast Number = FIRE Number ÷ (1 + r)<sup>n</sup>
          </p>
          <p className="text-xs text-zinc-400 mt-2">
            where r = annual return (e.g. 0.07) and n = years until target retirement
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Coast FIRE Milestones (Target: $1.5M at 65)</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Age</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Coast FIRE Number</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Years to Grow</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">25</td><td className="text-right py-3 px-3 text-zinc-600">$100,000</td><td className="text-right py-3 px-3 text-zinc-600">40</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">30</td><td className="text-right py-3 px-3 text-zinc-600">$140,000</td><td className="text-right py-3 px-3 text-zinc-600">35</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">35</td><td className="text-right py-3 px-3 text-zinc-600">$197,000</td><td className="text-right py-3 px-3 text-zinc-600">30</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">40</td><td className="text-right py-3 px-3 text-zinc-600">$276,000</td><td className="text-right py-3 px-3 text-zinc-600">25</td></tr>
              <tr><td className="py-3 px-3 font-medium text-zinc-700">45</td><td className="text-right py-3 px-3 text-zinc-600">$387,000</td><td className="text-right py-3 px-3 text-zinc-600">20</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">
          Assumes 7% annual real return and a $1.5M FIRE target at 65.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Different From "Full FIRE"</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Full FIRE means you never need to work again. Coast FIRE means you still need to cover living expenses, but your retirement is already funded. It is the middle ground — you can take career risks, go freelance, or reduce hours while your nest egg quietly grows.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Find your Coast FIRE age</p>
            <p className="text-sm text-amber-700 mt-1">The FIRE Calculator shows your Coast FIRE milestone — the exact age when you can stop saving and coast to retirement.</p>
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
