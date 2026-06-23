import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "What Is Coast FIRE?",
  description: "The point where your investments will grow to your FIRE number without another dollar of contributions. Find your Coast FIRE age.",
};

export default function CoastFireGuide() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8">
        <ArrowLeft className="h-3.5 w-3.5" />All guides
      </Link>
      <div className="mb-10">
        <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-4">FIRE</span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 leading-tight">What Is Coast FIRE and How to Calculate It</h1>
      </div>
      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">The Coast FIRE Concept</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">Coast FIRE is the moment when your existing investments, left to grow at a reasonable rate of return, will reach your full FIRE number by your target retirement age — even if you never invest another dollar. From that point forward, you only need to earn enough to cover your living expenses. You can "coast" to retirement.</p>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 my-6 text-center">
          <p className="text-lg font-mono font-semibold text-zinc-900">Coast FIRE Number = FIRE Number ÷ (1 + r)^n</p>
          <p className="text-sm text-zinc-500 mt-2">r = expected annual return (e.g. 0.07) · n = years until retirement</p>
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mt-10 mb-4">Example</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">If your FIRE number is $1,250,000 and you are 25 years from retirement with a 7% expected return, your Coast FIRE number is roughly $230,000. Once you have $230K invested, you can stop contributing and still hit $1.25M by age 50.</p>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Find your Coast FIRE age</p>
            <p className="text-sm text-amber-700 mt-1">Enter your numbers in the FIRE calculator to discover when you can stop contributing.</p>
          </div>
          <Link href="/dashboard/fire" className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors">Open FIRE Calculator</Link>
        </div>
      <RelatedArticles category="fire" />

      </article>
    </div>
  );
}
