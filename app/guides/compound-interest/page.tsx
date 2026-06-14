import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "How Compound Interest Works",
  description: "The most powerful force in personal finance, explained with concrete numbers. See how time and rate multiply your savings.",
};

export default function CompoundInterestGuide() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8">
        <ArrowLeft className="h-3.5 w-3.5" />All guides
      </Link>
      <div className="mb-10">
        <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-purple-700 mb-4">Investing</span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">How Compound Interest Works — With Real Examples</h1>
      </div>
      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Rule of 72</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">Divide 72 by your annual return rate to estimate how many years it takes to double your money. At 7% return, your money doubles roughly every 10.3 years. At 10%, it doubles every 7.2 years.</p>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 my-6 text-center">
          <p className="text-lg font-mono font-semibold text-zinc-900">Years to Double = 72 ÷ Annual Return Rate</p>
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Time Is the Multiplier</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">A $10,000 investment at 7% annual return grows to roughly $76,123 after 30 years — without adding another dollar. Add $500/month and it becomes over $600,000. The earlier you start, the less you need to save.</p>
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-purple-900">Model your own compound growth</p>
            <p className="text-sm text-purple-700 mt-1">Use our FIRE calculator to see how your savings grow over time with compound interest.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors">Open FIRE Calculator</Link>
        </div>
      </article>
    </div>
  );
}
