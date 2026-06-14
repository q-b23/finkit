import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Debt Payoff Timeline Guide",
  description: "Calculate exactly when you will be debt-free. See how even small extra payments can shave years off your timeline.",
};

export default function DebtPayoffTimelineGuide() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8">
        <ArrowLeft className="h-3.5 w-3.5" />All guides
      </Link>
      <div className="mb-10">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-4">Debt</span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">How Long to Pay Off Debt With Extra Payments</h1>
      </div>
      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Power of Small Extra Payments</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">Even $50 or $100 extra per month can dramatically shorten your payoff timeline. On a $10,000 credit card at 20% APR with a $300 minimum payment, adding just $100/month extra saves over $1,500 in interest and cuts the payoff time nearly in half.</p>
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">How Extra Payments Reduce Interest</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">Every extra dollar goes directly to principal. Since interest is calculated on the remaining balance, paying down principal faster means less interest accrues next month — creating a compounding effect in your favor.</p>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">Get your exact debt-free date</p>
            <p className="text-sm text-emerald-700 mt-1">Enter your debts and extra payment amount. See the month-by-month timeline.</p>
          </div>
          <Link href="/dashboard/debt" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">Try Debt Planner</Link>
        </div>
      </article>
    </div>
  );
}
