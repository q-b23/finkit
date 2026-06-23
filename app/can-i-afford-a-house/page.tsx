import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Can I Afford a House in the US? — Your Numbers, Not the Bank's Formula",
  description:
    "Banks approve you for way more than you can comfortably afford. Learn the 3 numbers that actually predict whether you'll be house poor — and check yours in 60 seconds.",
  openGraph: {
    title: "Can I Afford a House in the US? — Free Risk Score",
    description:
      "The bank says you qualify. Your gut says maybe not. Here's how to know for sure — with your real numbers, not theirs.",
  },
};

/**
 * SEO landing page targeting "can I afford a house" and affordability-anxiety
 * queries.
 *
 * This page directly addresses Fear #2 (Affordability Illusion) — the gap
 * between what a lender will approve and what a buyer can safely live with.
 */

export default function CanIAffordAHousePage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        {/* ================================================================
            HERO — direct answer for AI + SGE
            ================================================================ */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Affordability Reality Check
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Can You Afford a House in the US? Your Numbers, Not the
            Bank&apos;s Formula.
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              The Short Answer
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              If a lender says you qualify for a $600,000 mortgage, that means
              their risk model says they&apos;ll get paid back —{" "}
              <strong>not that you&apos;ll have a life you enjoy living</strong>
              . The number that actually matters is what percentage of your
              take-home pay goes to housing. Under 35%? You&apos;re in safe
              territory. Over 50%? You&apos;re about to become house poor.{" "}
              <strong>Run your numbers below — it takes 60 seconds and your data never leaves your browser.</strong>
            </p>
          </div>
        </header>

        {/* ================================================================
            SECTION 1 — the gap
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            What the Bank Won&apos;t Tell You About &ldquo;Affordability&rdquo;
          </h2>

          <p className="text-zinc-600 leading-relaxed mb-4">
            Banks use a formula called the debt-to-income ratio. They add up
            your proposed housing payment plus your existing debts, divide by
            your <em>gross</em> income, and approve you if the result is under
            43%–50%. That means they&apos;re calculating affordability based on
            money you haven&apos;t even received yet — before taxes, before
            health insurance, before your 401(k).
          </p>

          <div className="my-6 grid gap-3 sm:grid-cols-3">
            <StatCard
              value="43-50%"
              label="Max DTI lenders allow"
              sublabel="Of gross (pre-tax) income"
              color="red"
            />
            <StatCard
              value="28-36%"
              label="Safe housing cost"
              sublabel="Of gross income — the old rule"
              color="amber"
            />
            <StatCard
              value="&lt;40%"
              label="Actual safe zone"
              sublabel="Of take-home pay — what you feel"
              color="emerald"
            />
          </div>

          <p className="text-zinc-600 leading-relaxed">
            See the gap? A bank will lend you up to a monthly payment that eats
            45% of your pre-tax income. But in real life — after taxes,
            retirement, and basic living —{" "}
            <strong>anything over 40% of take-home pay feels like drowning.</strong>{" "}
            That gap between 43% gross DTI and 40% take-home is where the
            regret posts come from.
          </p>
        </section>

        {/* ================================================================
            SECTION 2 — the 3 numbers
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            The 3 Numbers That Actually Predict Whether You Can Afford It
          </h2>

          <div className="space-y-6">
            <NumberExplainer
              num={1}
              label="Your housing-to-take-home ratio"
              detail={
                <>
                  <strong>How to calculate it:</strong> Add up your monthly
                  mortgage payment (principal + interest), property tax,
                  insurance, and HOA. Divide by your monthly take-home pay.{" "}
                  <strong>What&apos;s safe:</strong> Under 35% is comfortable.
                  35%–45% is tight. Over 50% means you are — by the definition
                  real homeowners use — house poor.
                </>
              }
            />

            <NumberExplainer
              num={2}
              label="Your cashflow buffer after housing"
              detail={
                <>
                  <strong>How to calculate it:</strong> Take-home pay minus
                  housing costs minus existing debts minus basic living
                  expenses.{" "}
                  <strong>What&apos;s safe:</strong> If less than 10% of your
                  take-home remains after housing, debts, and basics, one
                  emergency sends you into credit card debt. This is where the
                  spiral begins — and it&apos;s the most common pattern in
                  first-time buyer regret stories.
                </>
              }
            />

            <NumberExplainer
              num={3}
              label="Your regret risk at current interest rates"
              detail={
                <>
                  <strong>How to calculate it:</strong> The same PITI payment
                  that felt manageable at 3% interest is crushing at 6.5%. With
                  2026 rates, the monthly payment on a $400,000 loan is roughly
                  $900 more than it was in 2021.{" "}
                  <strong>What this means:</strong> The houses you could
                  comfortably afford three years ago cost significantly more per
                  month today — even if the sticker price hasn&apos;t changed.
                </>
              }
            />
          </div>
        </section>

        {/* ================================================================
            SECTION 3 — real example walkthrough
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            A Real Example: $120K Income, $450K House
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-6">
            Let&apos;s walk through a realistic scenario. This is what the bank
            sees — and what your actual life would look like.
          </p>

          <div className="rounded-2xl border border-zinc-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="text-left py-3 px-4 font-semibold text-zinc-900">
                    Factor
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-zinc-500">
                    Bank&apos;s View
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-zinc-500">
                    Your Reality
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-700">
                    Income basis
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-600">
                    $10,000/mo gross
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-600">
                    $7,600/mo take-home
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-700">
                    Mortgage P&amp;I
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-600">
                    $2,270
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-600">
                    $2,270
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-700">
                    Tax + Insurance
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-600">
                    ~$560
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-600">
                    ~$560
                  </td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="py-3 px-4 font-semibold text-zinc-900">
                    Total housing
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-zinc-600">
                    $2,830/mo
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-zinc-600">
                    $2,830/mo
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-700">
                    % of income
                  </td>
                  <td className="text-right py-3 px-4 text-emerald-600">
                    28% of gross ✅
                  </td>
                  <td className="text-right py-3 px-4 text-amber-600">
                    37% of take-home ⚠️
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-700">
                    Left after housing
                  </td>
                  <td className="text-right py-3 px-4 text-zinc-400">
                    N/A — bank doesn&apos;t care
                  </td>
                  <td className="text-right py-3 px-4 text-amber-600">
                    $4,770 for everything else
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-zinc-700">
                    Verdict
                  </td>
                  <td className="text-right py-3 px-4 text-emerald-600 font-semibold">
                    APPROVED
                  </td>
                  <td className="text-right py-3 px-4 text-amber-600 font-semibold">
                    CAUTIOUS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-500 text-center">
            Bank says approved. Gut says tight. This is the affordability
            illusion in one table.
          </p>
        </section>

        {/* ================================================================
            SECTION 4 — rate impact
            ================================================================ */}
        <section className="mb-12 rounded-2xl border border-amber-100 bg-amber-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-amber-900 mb-3">
            The Interest Rate Reality: 2021 vs. 2026
          </h2>
          <p className="text-amber-800/80 leading-relaxed mb-4">
            In 2021, a $400,000 mortgage at 3% cost about $1,686/month. In
            2026, the same loan at 6.5% costs $2,528/month. That&apos;s{" "}
            <strong>$842 more every single month</strong> — over $10,000/year —
            for the exact same house. This is why &ldquo;can I afford
            it?&rdquo; is a fundamentally different question now than it was
            five years ago.
          </p>
          <p className="text-amber-800/80 leading-relaxed">
            Our risk score tool doesn&apos;t use a national average rate. It
            uses <strong>your rate</strong> — so you can see exactly what 6.5%
            means for your monthly payment, not 3%.
          </p>
        </section>

        {/* ================================================================
            CTA
            ================================================================ */}
        <section className="text-center mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              Plug In Your Numbers — Free, Private, 60 Seconds
            </h2>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Enter your income, the home price, and your down payment. Get
              your risk score, see your safe price range, and know exactly
              where the line is. Nothing leaves your browser.
            </p>
            <Link
              href="/decision/mortgage"
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-400 hover:shadow-red-500/40 active:scale-[0.98]"
            >
              Check My Affordability
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-zinc-400">
              No account. No email. Everything runs locally in your browser.
            </p>
          </div>
        </section>

        {/* ================================================================
            FAQ
            ================================================================ */}
        <section className="border-t border-zinc-100 pt-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            Common Questions About Home Affordability
          </h2>

          <FaqItem
            q="How much house can I afford on a $120,000 salary?"
            a="At $120,000 gross income, a safe purchase price is roughly $350,000–$425,000 with a 10% down payment at 6.5% interest, depending on your other debts. This keeps housing at 35%–40% of your take-home pay. Banks may approve you up to $550,000 — but at that level, housing would consume 50%+ of your take-home, which is the house poor zone."
          />
          <FaqItem
            q="What percentage of income should go to a mortgage?"
            a="The classic rule is 28% of gross income for housing alone and 36% for all debts combined. But a more useful benchmark: keep housing under 40% of your take-home pay. That's the number you'll actually feel month to month."
          />
          <FaqItem
            q="Why does the bank say I can afford more than I think I can?"
            a="Banks use gross (pre-tax) income and allow DTI ratios up to 43%–50%. They don't account for your actual living expenses, retirement savings goals, emergency fund needs, or the lifestyle you want. Their job is to lend money safely — not to make sure you enjoy your life after the mortgage payment clears."
          />
          <FaqItem
            q="How do I calculate my actual home affordability?"
            a="Start with your monthly take-home pay. Add up the mortgage P&I, property tax, home insurance, and estimated maintenance (1% of home value per year). Divide by your take-home. If it's under 35%, you're in the safe zone. Over 50%, you will be house poor — regardless of what the bank's approval letter says."
          />
          <FaqItem
            q="Is it harder to afford a house in 2026 than it was a few years ago?"
            a="Yes — significantly. At 6.5% interest vs 3% in 2021, the monthly payment on the same loan is about 50% higher. A $400,000 mortgage costs roughly $842 more per month. This means the same income buys a lot less house today than it did in 2021, even at identical home prices."
          />
        </section>
      <RelatedArticles category="mortgage" />

      </article>

      {/* ================================================================
          FAQPage structured data
          ================================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much house can I afford on a $120,000 salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "At $120,000 gross income, a safe purchase price is roughly $350,000–$425,000 with 10% down at 6.5% interest. Banks may approve up to $550,000, but housing would consume 50%+ of your take-home at that level — the house poor zone.",
                },
              },
              {
                "@type": "Question",
                name: "What percentage of income should go to a mortgage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The classic rule is 28% of gross income. A more useful benchmark: keep housing under 40% of your take-home pay — the number you'll actually feel month to month.",
                },
              },
              {
                "@type": "Question",
                name: "Why does the bank say I can afford more than I think I can?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Banks use gross pre-tax income and allow DTI ratios up to 43%–50%. They don't account for your actual living expenses, retirement savings, or emergency fund needs. Their job is to lend money safely — not to make sure you enjoy your life after the mortgage.",
                },
              },
              {
                "@type": "Question",
                name: "How do I calculate my actual home affordability?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Add up mortgage P&I, property tax, insurance, and maintenance. Divide by your take-home pay. Under 35% is safe. Over 50% means you will be house poor regardless of what the approval letter says.",
                },
              },
              {
                "@type": "Question",
                name: "Is it harder to afford a house in 2026 than a few years ago?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — significantly. At 6.5% vs 3% in 2021, the same loan costs about 50% more per month. A $400,000 mortgage costs roughly $842 more monthly. The same income buys a lot less house today.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatCard({
  value,
  label,
  sublabel,
  color,
}: {
  value: string;
  label: string;
  sublabel: string;
  color: "red" | "amber" | "emerald";
}) {
  const colors = {
    red: "bg-red-50 border-red-100 text-red-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm font-semibold mt-1">{label}</p>
      <p className="text-xs opacity-70 mt-0.5">{sublabel}</p>
    </div>
  );
}

function NumberExplainer({
  num,
  label,
  detail,
}: {
  num: number;
  label: string;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
        {num}
      </div>
      <div>
        <h3 className="text-base font-semibold text-zinc-900 mb-2">{label}</h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-zinc-100 py-4 last:border-0">
      <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">{q}</h3>
      <p className="text-sm text-zinc-600 leading-relaxed">{a}</p>
    </div>
  );
}
