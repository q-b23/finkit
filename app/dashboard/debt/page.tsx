import { Metadata } from "next";
import Link from "next/link";
import { DebtPayoffPlanner } from "@/components/DebtPayoffPlanner";

export const metadata: Metadata = {
  title: "Debt Payoff Planner — Snowball vs Avalanche Calculator",
  description:
    "Free debt payoff calculator. Compare snowball vs avalanche side by side. See your exact debt-free date, total interest saved, and amortization schedule.",
};

/**
 * Debt Payoff Planner page with SEO intro content + interactive tool.
 */
export default function DebtPlannerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Which debt payoff method saves more money?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"The avalanche method (highest interest rate first) is mathematically optimal and always saves the most in interest. However, the snowball method (smallest balance first) has higher completion rates because early wins build momentum.\"}}, {\"@type\": \"Question\", \"name\": \"How do I use the debt payoff planner?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Add each debt with its name, balance, interest rate, and minimum monthly payment. Then enter how much extra you can pay each month beyond the minimums. The planner instantly calculates your debt-free date and total interest for both snowball and avalanche strategies.\"}}, {\"@type\": \"Question\", \"name\": \"Should I use snowball or avalanche?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"If you have struggled to stick with financial plans, choose snowball \u2014 the quick wins from paying off small debts first keep you motivated. If you are disciplined and want to minimize total interest paid, choose avalanche.\"}}]}" }}
      />

      {/* SEO Intro */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Debt Payoff Planner — Snowball vs Avalanche
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">
          Add your debts below and see exactly when you will be debt-free. The planner compares both strategies side by side — snowball (smallest balance first) and avalanche (highest interest first) — so you can see the difference in months and dollars before committing to a plan.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/debt-avalanche-vs-snowball" className="text-sm text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
            Avalanche vs Snowball: full comparison →
          </Link>
          <Link href="/pay-off-debt-faster" className="text-sm text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
            Pay off debt faster: 7 strategies →
          </Link>
          <Link href="/credit-card-payoff" className="text-sm text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
            Credit card payoff guide →
          </Link>
        </div>
      </section>

      {/* Interactive Tool */}
      <DebtPayoffPlanner />

      {/* FAQ Section */}
      <section className="mt-16 border-t border-zinc-100 pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Which debt payoff method saves more money?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              The avalanche method (highest interest rate first) is mathematically optimal and always saves the most in interest. However, the snowball method (smallest balance first) has been shown in studies to have higher completion rates because the early psychological wins build momentum. Use this planner to see the exact dollar difference for your specific debts.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              How do I use the debt payoff planner?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Add each debt with its name, balance, interest rate, and minimum monthly payment. Then enter how much extra you can pay each month beyond the minimums. The planner instantly calculates your debt-free date and total interest for both snowball and avalanche strategies, so you can compare side by side.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Should I use snowball or avalanche?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              If you have struggled to stick with financial plans in the past, choose snowball — the quick wins from paying off small debts first can keep you motivated. If you are disciplined and want to minimize total interest paid, choose avalanche. The difference is often a few hundred dollars and a couple of months, but for large high-interest debts (like credit cards at 20%+), avalanche can save significant money.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              What counts as "extra monthly payment"?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              The extra payment is any money beyond your total monthly minimums that you can allocate to debt. This could come from cutting a subscription, a side hustle, a tax refund, or simply budgeting. Even $50/month extra can shave months off your timeline and save hundreds in interest.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Is my data safe?
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Yes. All calculations run locally in your browser. Your debt information never leaves your device — no accounts, no servers, no tracking. You can verify this by opening the browser developer tools Network tab: you will see zero data sent out.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
