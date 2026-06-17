import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator — How to Eliminate Credit Card Debt Fast",
  description:
    "High-APR credit card debt is the most expensive money you can borrow. Learn the avalanche method, balance transfer strategy, and debt consolidation — with real payoff examples.",
};

export default function CreditCardPayoffPage() {
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
          Credit Card Payoff Calculator — How to Eliminate Credit Card Debt Fast
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          The average credit card APR in 2026 is 22.8%. At that rate, a $10,000 balance costs you $190/month in interest alone. Here is how to break the cycle.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Real Cost of Minimum Payments</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Credit card minimum payments are typically 2–3% of the balance. On a $10,000 card at 22.8% APR, the minimum is about $250. If you pay only the minimum, it will take <strong>over 25 years</strong> to pay off and cost more than $16,000 in interest. The minimum payment is designed to keep you in debt.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Payment Strategy</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Monthly Payment</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Time to Payoff</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Total Interest</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-3 font-medium text-red-700">Minimum only</td>
                <td className="text-right py-3 px-3 text-zinc-600">~$250</td>
                <td className="text-right py-3 px-3 text-zinc-600">25+ years</td>
                <td className="text-right py-3 px-3 text-zinc-600">$16,000+</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-3 font-medium text-zinc-700">Fixed $400</td>
                <td className="text-right py-3 px-3 text-zinc-600">$400</td>
                <td className="text-right py-3 px-3 text-zinc-600">33 months</td>
                <td className="text-right py-3 px-3 text-zinc-600">$3,100</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-3 font-medium text-zinc-700">Fixed $600</td>
                <td className="text-right py-3 px-3 text-zinc-600">$600</td>
                <td className="text-right py-3 px-3 text-zinc-600">20 months</td>
                <td className="text-right py-3 px-3 text-zinc-600">$1,800</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-emerald-700">Fixed $1,000</td>
                <td className="text-right py-3 px-3 font-semibold text-emerald-700">$1,000</td>
                <td className="text-right py-3 px-3 font-semibold text-emerald-700">11 months</td>
                <td className="text-right py-3 px-3 font-semibold text-emerald-700">$1,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">$10,000 balance at 22.8% APR. Minimum payment assumes 2.5% of balance.</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Why the Avalanche Method Is Perfect for Credit Cards</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Credit cards typically carry the highest interest rates of any debt — often 20–29%. The avalanche method targets the highest-rate debt first, which is almost always your credit cards. If you have three cards at 24%, 19%, and 15%, every extra dollar should go to the 24% card while paying minimums on the others.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Balance Transfer: The Nuclear Option</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Transferring a high-APR balance to a 0% intro APR card is the single most powerful move for credit card debt. A $10,000 transfer with a 3% fee ($300) saves $2,500+ in interest if paid off during the 18-month intro period. But two warnings:
        </p>
        <ol className="space-y-3 text-zinc-600 my-6">
          <li>Do not use the new card for new purchases — the 0% rate usually only applies to the transferred balance.</li>
          <li>Have a plan to pay it off before the promotional period ends. After that, the rate jumps back to 20%+.</li>
        </ol>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Debt Consolidation Loan — When It Makes Sense</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          A personal loan at 10–15% APR to pay off 22%+ credit cards can make sense — but only if you stop using the cards afterward. Many people consolidate, free up their credit lines, and run the balances back up within a year. Consolidation works when paired with a hard rule: <strong>no new credit card spending until the loan is gone</strong>.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-emerald-900">Enter your cards and see your debt-free date</p>
            <p className="text-sm text-emerald-700 mt-1">Add each credit card to the Debt Payoff Planner. It will show you the optimal payoff order and your exact debt-free month for both snowball and avalanche strategies.</p>
          </div>
          <Link href="/dashboard/debt" className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Try Debt Planner
          </Link>
        </div>
      </article>
    </div>
  );
}
