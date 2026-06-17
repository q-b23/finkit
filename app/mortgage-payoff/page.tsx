import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mortgage Payoff Calculator — How to Pay Off Your Mortgage Early",
  description:
    "Bi-weekly payments, extra principal, recasting, and refinance — four strategies to pay off your mortgage years early and save tens of thousands in interest.",
};

export default function MortgagePayoffPage() {
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
        <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700 mb-4">
          Loans
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Mortgage Payoff Calculator — How to Pay Off Your Mortgage Early
        </h1>
        <p className="mt-3 text-lg text-zinc-500">
          The average 30-year mortgage costs more in interest than the home itself. Four proven strategies to cut years off your term and keep more of your money.
        </p>
      </div>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The True Cost of a 30-Year Mortgage</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          A $400,000 mortgage at 6.5% for 30 years costs $2,528/month. Over the full term, you pay <strong>$510,178 in interest</strong> — more than the original loan amount. The bank makes more than you borrowed. Every strategy that shortens the term converts interest dollars back into your pocket.
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 my-6">
          <p className="text-sm text-zinc-500 mb-2">The Math (30-year, 6.5%)</p>
          <p className="text-lg font-mono font-semibold text-zinc-900">
            Principal: $400,000 &nbsp;&nbsp; Interest: $510,178 &nbsp;&nbsp; Total: $910,178
          </p>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Strategy 1: Bi-Weekly Payments (The One-Trick Hack)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Split your monthly payment in half and pay every two weeks. Because there are 26 bi-weekly periods per year, you make the equivalent of <strong>13 full payments annually</strong> instead of 12. On a $400,000 30-year loan at 6.5%, this cuts the term to roughly 24 years 4 months and saves over $130,000 in interest.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Strategy 2: Extra Principal Payments (Any Amount Helps)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Even one extra payment per year — $2,528 applied directly to principal — shaves 4.5 years off the mortgage. An extra $200/month cuts 7 years. An extra $500/month cuts 12 years. The earlier in the loan you start, the more impact each dollar has, because early payments reduce the principal that future interest compounds on.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-500 font-medium">Extra/Month</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Payoff In</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Years Saved</th>
                <th className="text-right py-2 px-3 text-zinc-500 font-medium">Interest Saved</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$0 (baseline)</td><td className="text-right py-3 px-3 text-zinc-600">30 years</td><td className="text-right py-3 px-3 text-zinc-600">—</td><td className="text-right py-3 px-3 text-zinc-600">—</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$200</td><td className="text-right py-3 px-3 text-zinc-600">23 years</td><td className="text-right py-3 px-3 text-zinc-600">7</td><td className="text-right py-3 px-3 text-zinc-600">$109,000</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$500</td><td className="text-right py-3 px-3 text-zinc-600">18 years</td><td className="text-right py-3 px-3 text-zinc-600">12</td><td className="text-right py-3 px-3 text-zinc-600">$216,000</td></tr>
              <tr className="border-b border-zinc-100"><td className="py-3 px-3 font-medium text-zinc-700">$1,000</td><td className="text-right py-3 px-3 text-zinc-600">13.5 years</td><td className="text-right py-3 px-3 text-zinc-600">16.5</td><td className="text-right py-3 px-3 text-zinc-600">$309,000</td></tr>
              <tr><td className="py-3 px-3 font-semibold text-emerald-700">$2,000</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">9.5 years</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">20.5</td><td className="text-right py-3 px-3 font-semibold text-emerald-700">$392,000</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400 mt-2">$400,000 loan at 6.5%, 30-year fixed. Extra payments applied to principal only.</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Strategy 3: Recasting (Keep Your Rate, Lower Your Payment)</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If you come into a lump sum — inheritance, bonus, home sale — you can ask your lender to recast the mortgage. You make a large principal payment ($5,000+ typically) and the lender re-amortizes the remaining balance over the original term at your <strong>existing interest rate</strong>. Your monthly payment drops. No credit check, no closing costs. Most lenders charge $250–$500 for this.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Strategy 4: Refinance to a Shorter Term</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Refinancing from a 30-year to a 15-year mortgage typically comes with a 0.5–1% lower rate. On a $400,000 loan at 6.5%, refinancing to a 15-year at 5.75% raises your monthly payment from $2,528 to $3,322 — but saves $300,000+ in interest. This only works if you can comfortably afford the higher payment.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">One Decision: Invest or Pay Down?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If your mortgage rate is 3–4%, the math says invest the extra money instead — the market averages 7–10% long-term. But if your rate is 6%+, the guaranteed return of paying down principal is competitive with market returns, and it is risk-free. For most people in 2026 with rates above 6%, splitting the difference — some extra principal, some investing — is the rational middle ground.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-blue-900">Compare your mortgage options side by side</p>
            <p className="text-sm text-blue-700 mt-1">The Loan Comparison tool lets you model different mortgage scenarios — 30-year, 15-year, different rates — and see monthly payments and total cost for each.</p>
          </div>
          <Link href="/dashboard/loan" className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Compare Loans
          </Link>
        </div>
      </article>
    </div>
  );
}
