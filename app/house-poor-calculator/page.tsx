import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Home, EyeOff, Scale } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "House Poor Calculator — Are You at Risk of Being House Poor?",
  description:
    "House poor means your housing costs consume so much of your income that you have little left for everything else. Check your risk score and see the 4 warning signs.",
  openGraph: {
    title: "House Poor Calculator — Free Risk Check",
    description:
      "Being house poor is the #1 regret of American homebuyers. Check your numbers before you sign — free, private, 60 seconds.",
  },
};

export default function HousePoorCalculatorPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Housing Affordability
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Are You at Risk of Being House Poor?
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              What Does House Poor Mean?
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              Being house poor means your housing costs — mortgage, taxes,
              insurance, HOA, maintenance — consume so much of your monthly
              income that you have little left for savings, emergencies, or
              everyday life. It is the single most common regret among American
              homebuyers, and it is almost always preventable.
            </p>
          </div>
        </header>

        {/* Warning Signs */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            4 Warning Signs You Are House Poor (or About to Be)
          </h2>

          <div className="space-y-4">
            {[
              {
                num: "1",
                title: "More than 40% of take-home pay goes to housing",
                desc: "If your mortgage, taxes, insurance, and HOA combined eat more than 40% of what actually hits your checking account each month, you are in the danger zone. Lenders use gross income — you should use take-home.",
              },
              {
                num: "2",
                title: "You cannot save after paying the mortgage",
                desc: "If there is nothing left for an emergency fund, retirement contributions, or even a small vacation after housing costs, the house is stretching you too thin. A single unexpected repair can spiral into debt.",
              },
              {
                num: "3",
                title: "You are counting on future raises to make it work",
                desc: 'Buying a house based on income you do not have yet is one of the most common paths to becoming house poor. If the math does not work at your current salary, it is a risk — not a plan.',
              },
              {
                num: "4",
                title: "You ignored the hidden costs when budgeting",
                desc: "Property taxes, homeowners insurance, HOA dues, maintenance (1% of home value per year), and higher utilities add hundreds — sometimes thousands — per month that first-time buyers consistently forget.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-white p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 text-sm font-bold">
                  {item.num}
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

        {/* Tools CTA */}
        <section className="mb-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">
            Check Your Numbers — Free Tools
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Everything runs in your browser. No accounts, no data collection.
          </p>

          <div className="space-y-3">
            <Link
              href="/decision/mortgage"
              className="flex items-center gap-3 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 hover:bg-red-400 transition-colors"
            >
              <AlertTriangle className="h-5 w-5" />
              Take the Mortgage Stress Test
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
            <Link
              href="/affordability-score"
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 transition-colors"
            >
              <Home className="h-5 w-5 text-zinc-400" />
              Get Your Affordability Score
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
            <Link
              href="/hidden-housing-costs"
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 transition-colors"
            >
              <EyeOff className="h-5 w-5 text-zinc-400" />
              See Your Hidden Housing Costs
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
            <Link
              href="/decision/rent-vs-buy"
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-900 transition-colors"
            >
              <Scale className="h-5 w-5 text-zinc-400" />
              Compare Rent vs Buy
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </div>
        </section>

        {/* Budget Reality Check */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            The Budget Reality Check
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-4">
            Most first-time buyers budget for the mortgage payment and stop
            there. But a mortgage payment is only the starting line. Here is
            what the math actually looks like for a $450,000 home with 10%
            down at 6.5%:
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="text-left py-3 px-4 font-medium text-zinc-700">Monthly Cost</th>
                  <th className="text-right py-3 px-4 font-medium text-zinc-700">Estimated</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Mortgage (P&I)", value: "$2,560" },
                  { label: "Property Tax (1.1%)", value: "$413" },
                  { label: "Home Insurance", value: "$150" },
                  { label: "Maintenance (1%/yr)", value: "$375" },
                  { label: "Utilities (increase)", value: "$350" },
                  { label: "Total True Monthly Cost", value: "$3,848", emphasis: true },
                ].map((row) => (
                  <tr key={row.label} className={`border-b border-zinc-50 ${row.emphasis ? "bg-zinc-50 font-semibold" : ""}`}>
                    <td className="py-3 px-4 text-zinc-700">{row.label}</td>
                    <td className="text-right py-3 px-4 text-zinc-900">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            That is $1,288 in hidden costs on top of the mortgage — every single
            month. Use our tools above to run the numbers with your actual
            situation.
          </p>
        </section>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"What does it mean to be house poor?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Being house poor means your housing costs \\u2014 mortgage, property tax, insurance, HOA, and maintenance \\u2014 consume so much of your monthly income that you have little left for savings, emergencies, or everyday life. It is the most common regret among American homebuyers.\"}}, {\"@type\": \"Question\", \"name\": \"How do I know if I am house poor?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Four warning signs: (1) over 40% of take-home pay goes to housing, (2) you cannot save after paying the mortgage, (3) you are counting on future raises to afford the payment, (4) you ignored hidden costs like taxes and maintenance when budgeting.\"}}, {\"@type\": \"Question\", \"name\": \"How can I avoid becoming house poor?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Run a stress test before you buy. Budget for total housing costs \\u2014 not just the mortgage. Keep an emergency fund of 3\\u20136 months of expenses after closing. If the numbers are tight, consider a lower-priced home, a larger down payment, or waiting.\"}}]}" }}
      />

      <RelatedArticles category="mortgage" />
      </div>
    </>
  );
}
