import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pay Off Debt Faster — 7 Proven Strategies That Actually Work",
  description:
    "Concrete strategies to accelerate debt payoff. Extra payments, snowball method, balance transfers, and side hustles — with real savings numbers.",
};

export default function PayOffDebtFasterPage() {
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
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-4">
          Debt
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Pay Off Debt Faster — 7 Proven Strategies That Actually Work
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          Most people stay in debt years longer than necessary. These seven strategies — from extra payments to balance transfers — can shave thousands off your total and months off your timeline.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">1. Make Bi-Weekly Payments Instead of Monthly</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Split your monthly payment in half and pay every two weeks. Because there are 52 weeks in a year, you end up making 26 half-payments — the equivalent of <strong>13 full monthly payments</strong> instead of 12. That extra payment goes entirely to principal, silently accelerating your payoff.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">2. Round Up Every Payment</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If your minimum is $347, pay $400. If it is $182, pay $200. Rounding up is painless but compounds dramatically. An extra $50/month on a $15,000 loan at 18% saves roughly $1,800 in interest and cuts 8 months off the term.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">3. Use Windfalls Aggressively</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Tax refunds, bonuses, gift money, garage sale proceeds — every unexpected dollar goes to debt. A single $3,000 windfall applied to principal on a $20,000 loan at 15% saves over $2,000 in interest over the life of the loan.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">4. The Debt Avalanche: Target High Interest First</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          List all debts by interest rate, highest to lowest. Pay minimums on everything, throw all extra cash at the highest-rate debt. This is <strong>mathematically optimal</strong> — you pay the least total interest and get out of debt fastest.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 my-6">
          <p className="text-sm text-emerald-700 mb-2">Avalanche Savings Example</p>
          <p className="text-emerald-900 text-sm">
            Three debts: $5,000 at 24%, $10,000 at 15%, $8,000 at 6%. Avalanche saves ~$900 and 4 months versus snowball. Run both strategies side by side in the Debt Planner to see your exact numbers.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">5. Balance Transfer to 0% APR</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Many credit cards offer 0% APR on balance transfers for 12–21 months, with a 3–5% transfer fee. On a $10,000 balance at 22%, transferring saves ~$2,200 in interest even after the fee. The key: <strong>pay it off completely before the promotional period ends</strong>, or the retroactive interest can wipe out all savings.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">6. Cut One Recurring Expense, Redirect to Debt</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Cancel one subscription ($15/month), make coffee at home ($40/month), negotiate your internet bill ($25/month). That is $80/month redirected to debt. On a $10,000 balance at 18%, $80 extra/month saves $1,200 in interest and cuts 10 months off the timeline.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">7. Pick Up a Side Hustle — Even Temporarily</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Driving for a delivery app 8 hours/week at $20/hour nets ~$640/month after expenses. Apply that entirely to debt and you accelerate payoff by <strong>years</strong>, not months. The hustle is temporary — the freedom is permanent.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">See exactly how much faster you can be debt-free</p>
            <p className="text-sm text-emerald-700 mt-1">Enter your real debts into the Debt Payoff Planner. It compares snowball and avalanche side by side and shows your debt-free date for both strategies.</p>
          </div>
          <Link href="/dashboard/debt" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Try Debt Planner
          </Link>
        </div>
      </article>
    </div>
  );
}
