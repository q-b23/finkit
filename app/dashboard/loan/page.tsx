import { Metadata } from "next";
import Link from "next/link";
import { LoanCompare } from "@/components/LoanCompare";

export const metadata: Metadata = {
  title: "Loan Comparison Calculator — Compare Multiple Loans Side by Side",
  description:
    "Compare mortgage, auto, and personal loan offers side by side. See monthly payments, total interest, total cost, and a composite score to find the best deal.",
};

export default function LoanComparePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"What should I compare when shopping for a loan?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Focus on three numbers: monthly payment, total interest paid, and total cost (principal + interest). A lower monthly payment might hide a longer term and higher total cost. Use this tool to see all three side by side.\"}}, {\"@type\": \"Question\", \"name\": \"What is a good APR for a mortgage in 2026?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"A good mortgage APR for a borrower with excellent credit (740+) is typically 6.0-6.5% for a 30-year fixed and 5.5-6.0% for a 15-year fixed. Auto loans range from 5-8% for prime borrowers.\"}}, {\"@type\": \"Question\", \"name\": \"How is the composite score calculated?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The score equally weights three factors: lowest monthly payment, lowest total interest, and lowest total cost. Each loan is ranked on each factor, and the ranks are averaged. A score of 100 means the loan is best on all three measures.\"}}]}" }}
      />

      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Loan Comparison Calculator — Find the Best Deal
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">
          Add up to four loan offers below and compare them side by side. See monthly payments, total interest, total cost over the full term, and a composite score that weights all three factors. Perfect for comparing mortgage quotes, auto loan offers, or personal loan options.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/mortgage-payoff" className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2">
            Mortgage payoff strategies →
          </Link>
          <Link href="/guides/loan-apr" className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2">
            What is a good APR? →
          </Link>
        </div>
      </section>

      <LoanCompare />

      <section className="mt-16 border-t border-zinc-100 pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              What should I compare when shopping for a loan?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Focus on three numbers: monthly payment, total interest paid, and total cost (principal + interest). A lower monthly payment might hide a longer term and higher total cost. Use this tool to see all three side by side for each offer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              What is a good APR for a mortgage in 2026?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              As of 2026, a good mortgage APR for a borrower with excellent credit (740+) is typically 6.0–6.5% for a 30-year fixed and 5.5–6.0% for a 15-year fixed. Auto loans range from 5–8% for prime borrowers. Always compare multiple offers — even a 0.5% difference can save thousands over the life of the loan.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              How is the composite score calculated?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              The score equally weights three factors: lowest monthly payment, lowest total interest, and lowest total cost. Each loan is ranked on each factor, and the ranks are averaged. A score of 100 means the loan is the best on all three measures. Use it as a quick reference — your personal priorities (e.g. cash flow vs total cost) should guide the final decision.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Should I choose the lowest monthly payment or lowest total cost?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              It depends on your financial situation. If cash flow is tight, a lower monthly payment gives breathing room. If you can comfortably afford a higher payment, minimizing total cost saves the most money long-term. Use this tool to see both numbers and find the balance that works for you.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Is my loan data private?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Yes. All loan comparisons run locally in your browser. Your loan amounts, rates, and terms never leave your device. FinKit is open source, has no accounts, and does not track or sell data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
