import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Rent vs Buy in 2026 — Which Actually Builds More Wealth?",
  description:
    "Renting feels wasteful. Buying feels risky. At 6.5% rates, the math has changed. Compare the real 5-year cost of both paths with your numbers — free, private, 60 seconds.",
  openGraph: {
    title: "Rent vs Buy Decision — Which Builds More Wealth in 2026?",
    description:
      "The old advice was 'always buy.' At today's rates, that advice is wrong. Compare both paths side by side with your real numbers.",
  },
};

/**
 * SEO landing page targeting "rent vs buy" decision-intent queries.
 *
 * Addresses Fear #4 — rent/buy confusion. Unlike affordability pages with a
 * clear villain (the bank), this is a genuine tradeoff. The page provides a
 * framework without pretending there's a universal answer.
 */

export default function RentVsBuyDecisionPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        {/* ================================================================
            HERO
            ================================================================ */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">
            Rent vs Buy Decision
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Rent vs Buy in 2026: Which Path Actually Builds More Wealth?
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              The Short Answer
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              The old advice was &ldquo;always buy.&rdquo; At today&apos;s
              6%–7% mortgage rates, that advice is wrong — or at least
              incomplete. In many US cities, renting and investing the down
              payment plus monthly savings actually builds more wealth over 5–7
              years. But if you plan to stay 10+ years, buying still wins.{" "}
              <strong>
                There is no universal answer — but there is a right answer for
                your numbers. Compare both paths below.
              </strong>
            </p>
          </div>
        </header>

        {/* ================================================================
            SECTION 1 — the emotional tension
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            Why Both Options Feel Like a Mistake Right Now
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-5">
              <p className="text-sm font-semibold text-red-800 mb-2">
                The case against buying
              </p>
              <ul className="space-y-2 text-sm text-red-700/80">
                <li>• 6.5% rates mean most of your payment is interest</li>
                <li>• Closing costs: 2%–5% of the purchase price upfront</li>
                <li>• Maintenance: ~1% of home value per year</li>
                <li>• Selling costs: 6% agent commission when you move</li>
                <li>• Property tax: another 1%–2% annually</li>
              </ul>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5">
              <p className="text-sm font-semibold text-amber-800 mb-2">
                The case against renting
              </p>
              <ul className="space-y-2 text-sm text-amber-700/80">
                <li>• Your rent payment builds zero equity</li>
                <li>• Rent increases 3%–5% per year, every year</li>
                <li>• No tax benefits (mortgage interest deduction)</li>
                <li>• Zero control: landlord can sell, raise rent, or not renew</li>
                <li>• You&apos;re paying someone else&apos;s mortgage</li>
              </ul>
            </div>
          </div>

          <p className="text-zinc-600 leading-relaxed">
            Both sides have real arguments. The right choice depends entirely
            on <strong>how long you&apos;ll stay</strong> and{" "}
            <strong>what the numbers actually look like</strong> in your
            specific market — not the national average, not your parents&apos;
            experience, not what your real estate agent tells you.
          </p>
        </section>

        {/* ================================================================
            SECTION 2 — the 5-year framework
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            The Only Comparison That Matters: 5-Year Real Cost
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-6">
            Most rent-vs-buy calculators compare monthly payments and call it a
            day. That misses{" "}
            <strong>the three biggest costs of buying</strong> — and the one
            biggest advantage of renting.
          </p>

          <div className="space-y-5">
            <CostRow
              label="Mortgage interest (5 years)"
              buyDetail="At 6.5%, you pay ~$125K interest on a $400K loan in the first 5 years — that's money you never get back."
              rentDetail="Zero. Your rent check is pure expense — about $120K over 5 years at $2,000/month."
            />
            <CostRow
              label="Transaction costs"
              buyDetail="~$15K–$25K in closing costs to buy. ~6% agent commission to sell. Total: ~$40K–$50K just to enter and exit."
              rentDetail="Security deposit + first month's rent: ~$4,000. Moving costs apply either way."
            />
            <CostRow
              label="Maintenance & repairs"
              buyDetail="~1% of home value/year. On a $500K house, that's $25,000 over 5 years — and that's if nothing major breaks."
              rentDetail="$0. The landlord fixes the roof, the water heater, the AC."
            />
            <CostRow
              label="Opportunity cost of the down payment"
              buyDetail="A $50,000 down payment locked in your walls earns 0% return. Invested at 7% in the S&P 500, that same $50K becomes ~$70K in 5 years."
              rentDetail="Your $50,000 down payment stays invested and compounding. At 7%, you earn ~$20,000 over 5 years."
            />
          </div>
        </section>

        {/* ================================================================
            SECTION 3 — when each wins
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            When Buying Wins. When Renting Wins.
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6">
              <p className="text-sm font-bold text-emerald-800 mb-3">
                Buying usually wins when:
              </p>
              <ul className="space-y-2 text-sm text-emerald-700/80">
                <li>• You&apos;ll stay 10+ years</li>
                <li>• Your mortgage rate is under 5%</li>
                <li>• You&apos;re in a market with strong appreciation</li>
                <li>• Rent for equivalent housing is expensive</li>
                <li>• You value stability and control highly</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6">
              <p className="text-sm font-bold text-amber-800 mb-3">
                Renting usually wins when:
              </p>
              <ul className="space-y-2 text-sm text-amber-700/80">
                <li>• You might move within 5–7 years</li>
                <li>• Your mortgage rate is 6% or higher</li>
                <li>• You&apos;re in a market with slow appreciation</li>
                <li>• Rent is significantly cheaper than a mortgage</li>
                <li>• You value flexibility and liquidity</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-500 text-center">
            Notice a pattern? In 2026 — with 6.5% rates — the green column
            shrinks and the amber column grows. This is why the old advice
            doesn&apos;t hold.
          </p>
        </section>

        {/* ================================================================
            SECTION 4 — real example
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            Real Example: $500K House vs $2,500/Month Rent
          </h2>

          <div className="rounded-2xl border border-zinc-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="text-left py-3 px-4 font-semibold text-zinc-900">
                    5-Year Comparison
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-emerald-700">
                    Buying
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-amber-700">
                    Renting + Investing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="py-3 px-4 text-zinc-600">Monthly housing cost</td>
                  <td className="text-right py-3 px-4">$3,500</td>
                  <td className="text-right py-3 px-4">$2,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-600">5-year housing total</td>
                  <td className="text-right py-3 px-4">$210,000</td>
                  <td className="text-right py-3 px-4">$150,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-600">Down payment</td>
                  <td className="text-right py-3 px-4">$50,000 (locked)</td>
                  <td className="text-right py-3 px-4">$50,000 (invested)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-600">Transaction costs</td>
                  <td className="text-right py-3 px-4">~$45,000</td>
                  <td className="text-right py-3 px-4">~$4,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-600">Maintenance</td>
                  <td className="text-right py-3 px-4">~$25,000</td>
                  <td className="text-right py-3 px-4">$0</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-600">Investment returns</td>
                  <td className="text-right py-3 px-4">$0</td>
                  <td className="text-right py-3 px-4 text-emerald-600">+$72,000</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="py-3 px-4 font-semibold text-zinc-900">
                    5-year net position
                  </td>
                  <td className="text-right py-3 px-4 font-semibold">
                    -$330,000<br />
                    <span className="text-xs font-normal text-zinc-400">
                      (minus any appreciation)
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-amber-700">
                    -$82,000<br />
                    <span className="text-xs font-normal text-zinc-400">
                      (+$72K investment gains)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-500 text-center">
            At 6.5% rates, renting + investing the difference saves ~$248K over
            5 years. Home appreciation would need to exceed 8%/year to close
            that gap — which is historically unlikely in most US markets.
          </p>
        </section>

        {/* ================================================================
            CTA
            ================================================================ */}
        <section className="text-center mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              Compare Both Paths With Your Actual Numbers
            </h2>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Our rent vs buy tool factors in your market&apos;s actual prices,
              your tax bracket, expected appreciation, and how long you&apos;ll
              stay. Free, private, nothing leaves your browser.
            </p>
            <Link
              href="/decision/rent-vs-buy"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:shadow-amber-500/40 active:scale-[0.98]"
            >
              Run Rent vs Buy Comparison
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-zinc-400">
              No account. No email. Everything runs locally.
            </p>
          </div>
        </section>

        {/* ================================================================
            FAQ
            ================================================================ */}
        <section className="border-t border-zinc-100 pt-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            Common Questions About Renting vs Buying
          </h2>

          <FaqItem
            q="Is it better to rent or buy in 2026?"
            a="In 2026, with mortgage rates at 6%–7%, the math favors renting in many US markets if you plan to stay less than 7–10 years. The high cost of mortgage interest plus transaction costs and maintenance often outweighs the benefits of building equity. But if you'll stay long-term and are in a market with strong appreciation, buying still wins."
          />
          <FaqItem
            q="Is renting just throwing money away?"
            a="No — this is the most persistent myth in personal finance. Rent buys you shelter, flexibility, and freedom from maintenance costs and property tax. A mortgage payment is mostly interest in the early years — in 2026 at 6.5%, roughly 80% of your first year's payments go to interest, not equity. Renting + investing the difference often builds more wealth over 5–7 years."
          />
          <FaqItem
            q="How long do I need to stay in a house for buying to be worth it?"
            a="At 2026 rates, the break-even point is typically 7–10 years depending on your market. This factors in closing costs to buy, selling commission to exit, maintenance, and the opportunity cost of your down payment. If you're not confident you'll stay at least 7 years, renting is likely the better financial decision."
          />
          <FaqItem
            q="What hidden costs do most rent-vs-buy comparisons miss?"
            a="Three big ones: (1) closing costs — 2%–5% of the purchase price upfront. (2) Selling costs — typically 6% agent commission, paid when you sell. (3) The opportunity cost of your down payment — money locked in your walls earning 0% vs invested in the market at ~7%. These three costs alone can total $100K+ on a median-price home."
          />
          <FaqItem
            q="Does buying a house build wealth?"
            a="Over long enough time horizons, yes — but not always. Building equity through mortgage paydown is slow: in year one at 6.5%, only about 18% of your payment goes to principal. Home appreciation historically averages 3%–5% annually, but it's not guaranteed and varies dramatically by market. The wealth-building case for buying gets stronger the longer you stay."
          />
        </section>
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
                name: "Is it better to rent or buy in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "With mortgage rates at 6%–7%, the math favors renting in many US markets if you plan to stay less than 7–10 years. The high cost of mortgage interest plus transaction costs often outweigh equity building. But long-term buyers in strong appreciation markets still benefit from buying.",
                },
              },
              {
                "@type": "Question",
                name: "Is renting just throwing money away?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Rent buys shelter, flexibility, and freedom from maintenance. At 6.5% rates, roughly 80% of first-year mortgage payments go to interest, not equity. Renting plus investing the difference often builds more wealth over 5–7 years.",
                },
              },
              {
                "@type": "Question",
                name: "How long do I need to stay in a house for buying to be worth it?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "At 2026 rates, the break-even point is typically 7–10 years, factoring in closing costs, selling commission, maintenance, and opportunity cost of the down payment.",
                },
              },
              {
                "@type": "Question",
                name: "What hidden costs do rent-vs-buy comparisons miss?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Three big ones: closing costs (2%–5% of purchase price), selling commission (6%), and opportunity cost of the down payment earning 0% vs ~7% invested. These three costs can total $100K+ on a median-price home.",
                },
              },
              {
                "@type": "Question",
                name: "Does buying a house build wealth?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Over long time horizons, yes — but slowly. At 6.5%, only ~18% of year-one payments go to principal. Home appreciation historically averages 3%–5% annually but varies dramatically by market.",
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

function CostRow({
  label,
  buyDetail,
  rentDetail,
}: {
  label: string;
  buyDetail: string;
  rentDetail: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 p-4 sm:p-5">
      <p className="text-sm font-semibold text-zinc-900 mb-3">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex gap-2">
          <span className="text-xs font-semibold uppercase text-emerald-600 shrink-0 mt-0.5">
            BUY
          </span>
          <p className="text-xs text-zinc-600 leading-relaxed">{buyDetail}</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-semibold uppercase text-amber-600 shrink-0 mt-0.5">
            RENT
          </span>
          <p className="text-xs text-zinc-600 leading-relaxed">{rentDetail}</p>
        </div>
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
