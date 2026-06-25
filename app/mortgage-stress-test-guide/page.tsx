import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Home, TrendingDown, Shield } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Mortgage Stress Test Guide: How to Evaluate Housing Stress Before You Buy",
  description:
    "A mortgage stress test evaluates whether your mortgage will create unhealthy financial pressure. Learn how it works, what a safe DTI looks like, and check your numbers — free, private, 60 seconds.",
  openGraph: {
    title: "Mortgage Stress Test Guide: Evaluate Housing Stress Before You Buy",
    description:
      "Before you commit to a mortgage, stress-test it against your real take-home pay. See your stress score, monthly breakdown, and safe price range.",
  },
};

export default function MortgageStressTestGuidePage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Mortgage Decision Guide
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Mortgage Stress Test: Will This Payment Stretch You Too Thin?
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              What Is a Mortgage Stress Test?
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              A mortgage stress test evaluates whether your proposed mortgage
              will create unhealthy financial pressure — not just whether a
              lender will approve it. It compares your total housing costs
              (mortgage, taxes, insurance, HOA) against your actual take-home
              pay and existing debts.{" "}
              <strong>
                It answers the question banks do not ask: can you actually live
                with this payment?
              </strong>
            </p>
          </div>
        </header>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            How Our Stress Test Works
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: Home,
                title: "Enter your numbers",
                desc: "Home price, down payment, interest rate, income, and monthly debts. Everything stays on your device.",
              },
              {
                icon: TrendingDown,
                title: "Get your stress score",
                desc: "A 0-100 score with a clear stress level: Safe, Cautious, Risky, or Avoid. See exactly where the danger zone starts.",
              },
              {
                icon: Shield,
                title: "Understand why",
                desc: "No black boxes. See your housing-to-income ratio, DTI, remaining disposable income, and a plain-English recommendation.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
                  <item.icon className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stress Level Framework */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            Understanding Your Stress Level
          </h2>
          <div className="space-y-4">
            {[
              {
                level: "Safe",
                color: "bg-emerald-50 border-emerald-200",
                textColor: "text-emerald-700",
                desc: "Housing costs under 35% of take-home pay. You have a healthy cashflow buffer and room for savings, emergencies, and life. This is where you want to be.",
              },
              {
                level: "Cautious",
                color: "bg-amber-50 border-amber-200",
                textColor: "text-amber-700",
                desc: "Housing costs between 35-40% of take-home pay. The payment is manageable, but you will want to watch discretionary spending. Build your emergency fund before closing.",
              },
              {
                level: "Risky",
                color: "bg-orange-50 border-orange-200",
                textColor: "text-orange-700",
                desc: "Housing costs between 40-50% of take-home pay. You are firmly in house-poor territory. A single unexpected expense — car repair, medical bill, roof leak — can trigger financial stress.",
              },
              {
                level: "Avoid",
                color: "bg-red-50 border-red-200",
                textColor: "text-red-700",
                desc: "Housing costs over 50% of take-home pay. This is the definition of house poor. Most households in this zone report financial regret within 2 years. Consider a lower price, larger down payment, or waiting.",
              },
            ].map((item) => (
              <div
                key={item.level}
                className={`rounded-xl border p-4 ${item.color}`}
              >
                <h3 className={`text-sm font-bold ${item.textColor}`}>
                  {item.level}
                </h3>
                <p className="mt-1 text-sm leading-relaxed opacity-80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 rounded-2xl border-2 border-red-200 bg-red-50 p-6 text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-red-800 mb-2">
            Ready to Check Your Numbers?
          </h2>
          <p className="text-sm text-red-700 mb-5 max-w-md mx-auto">
            Takes 60 seconds. Everything runs in your browser. No accounts, no
            spam, no data collection.
          </p>
          <Link
            href="/decision/mortgage"
            className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 hover:bg-red-400 transition-colors"
          >
            Take the Stress Test Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Decision Framework */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            The Decision Framework: 3 Questions to Ask Before You Commit
          </h2>
          <ol className="space-y-4 list-decimal list-inside text-zinc-600 leading-relaxed">
            <li className="pl-1">
              <strong>Can I afford this payment at my current income — not my
              expected future income?</strong> If the answer depends on a raise,
              promotion, or bonus, the risk is higher than it looks.
            </li>
            <li className="pl-1">
              <strong>Do I have 3-6 months of total housing costs saved after
              closing?</strong> Closing costs and the down payment should not
              drain your emergency fund. A house with no cash buffer is a house
              of cards.
            </li>
            <li className="pl-1">
              <strong>Have I accounted for all hidden costs?</strong> Property
              taxes, insurance, HOA, maintenance (budget 1% of home value per
              year), and higher utilities are real. Do not budget for the
              mortgage alone.
            </li>
          </ol>
        </section>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"What is a mortgage stress test?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"A mortgage stress test evaluates whether your mortgage payment will create unhealthy financial pressure. It compares your total housing costs against your actual take-home pay and existing debts \\u2014 not just whether a lender will approve the loan.\"}}, {\"@type\": \"Question\", \"name\": \"What is a safe debt-to-income ratio for a mortgage?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Most lenders cap DTI at 43\\u201350% of gross income. But a safer target is keeping total housing under 35\\u201340% of your take-home pay. The stress test uses take-home pay because that is the money you actually live on.\"}}, {\"@type\": \"Question\", \"name\": \"How accurate is the mortgage stress test?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The stress test uses standard mortgage math (PMT amortization) combined with your real income, debt, and local tax numbers. It is an educational estimate \\u2014 not financial advice \\u2014 but it gives you a far more realistic picture than a pre-qualification letter.\"}}]}" }}
      />

      <RelatedArticles category="mortgage" />
      </div>
    </>
  );
}
