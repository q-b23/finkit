import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is a Good APR? Mortgage, Auto, and Personal Loan Guide",
  description: "Understand APR across loan types, what rates to expect in 2026, and how your credit score impacts what you pay.",
};

export default function LoanAprGuide() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8">
        <ArrowLeft className="h-3.5 w-3.5" />All guides
      </Link>
      <div className="mb-10">
        <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700 mb-4">Loans</span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">What Is a Good APR? Mortgage, Auto, and Personal Loan Guide</h1>
      </div>
      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">APR vs Interest Rate</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">APR (Annual Percentage Rate) includes the interest rate plus fees, giving you the true cost of borrowing. A loan with a 5.5% interest rate but high origination fees might have a 6.2% APR. Always compare APRs, not just interest rates.</p>
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">What Is a Good Rate by Loan Type?</h2>
        <p className="text-zinc-600 leading-relaxed mb-4"><strong>Mortgages:</strong> Excellent credit (740+) can qualify for rates near 6-7% on a 30-year fixed in 2026. <strong>Auto loans:</strong> 5-7% for good credit, 10%+ for fair credit. <strong>Personal loans:</strong> 7-12% for good credit, 20%+ for poor credit. <strong>Credit cards:</strong> 18-30% — always pay these off first.</p>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-blue-900">Compare real loan offers</p>
            <p className="text-sm text-blue-700 mt-1">Enter multiple loan offers and see the total cost difference side by side.</p>
          </div>
          <Link href="/dashboard/loan" className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Compare Loans</Link>
        </div>
      </article>
    </div>
  );
}
