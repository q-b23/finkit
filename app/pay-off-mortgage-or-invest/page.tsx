import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pay Off Mortgage or Invest? — Guaranteed Return vs Market Returns",
  description:
    "Got extra cash? Compare the guaranteed return of paying down your mortgage against the expected return of investing — with your exact numbers, risk-adjusted.",
  openGraph: {
    title: "Pay Off Mortgage or Invest? — Free Comparison Tool",
    description:
      "Paying down a 6.5% mortgage is a guaranteed, tax-free 6.5% return. Can the stock market beat that? Run both scenarios with your numbers.",
  },
};

/**
 * SEO landing page targeting "pay off mortgage or invest" and "mortgage payoff
 * vs investing" queries.
 *
 * This addresses the optimization-tier question — not fear-driven like
 * affordability or timing, but a genuine wealth-maximization tradeoff where
 * both options are reasonable.
 */

export default function PayOffMortgageOrInvestPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        {/* ================================================================
            HERO
            ================================================================ */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
            Wealth Optimization
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Pay Off Your Mortgage or Invest the Cash?
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              The Short Answer
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              Paying down your mortgage gives you a{" "}
              <strong>guaranteed, tax-free return equal to your interest rate</strong>.
              If your mortgage is at 6.5%, that&apos;s a guaranteed 6.5% return
              — which beats most risk-free investments by a wide margin.
              Investing in the stock market <em>might</em> return more (the S&P
              500 has averaged ~10% historically), but that return is neither
              guaranteed nor tax-free.{" "}
              <strong>
                The right call depends on your mortgage rate, your investment
                alternatives, and your risk tolerance. Compare both paths below.
              </strong>
            </p>
          </div>
        </header>

        {/* ================================================================
            SECTION 1 — the guaranteed return lens
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            The Most Important Insight Most People Miss
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-4">
            Paying down a mortgage is mathematically equivalent to{" "}
            <strong>buying a bond that pays your mortgage rate</strong> — tax-free,
            with zero default risk. Every dollar you put toward principal saves
            you interest at exactly your mortgage rate for the remaining life of
            the loan.
          </p>

          <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-5 mb-4">
            <p className="text-sm font-semibold text-purple-900 mb-2">
              Example: $30,000 toward a 6.5% mortgage with 25 years remaining
            </p>
            <p className="text-sm text-purple-800/80 leading-relaxed">
              That $30,000 payment saves you roughly $52,000 in interest over
              the remaining loan term. That&apos;s a guaranteed, tax-free 6.5%
              annualized return — the equivalent of finding a 25-year bond
              paying 6.5% with zero credit risk. In today&apos;s market, the
              10-year Treasury yields about 4.3%. The mortgage paydown beats it
              by over 2 percentage points — guaranteed.
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            The higher your mortgage rate, the stronger the case for paying it
            down. At 3%, the math often favors investing. At 7%, the guaranteed
            return is hard to beat.
          </p>
        </section>

        {/* ================================================================
            SECTION 2 — when each wins
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            When Paying Down Wins. When Investing Wins.
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-6">
              <p className="text-sm font-bold text-purple-800 mb-3">
                Pay down the mortgage when:
              </p>
              <ul className="space-y-2 text-sm text-purple-700/80">
                <li>• Your mortgage rate is 5% or higher</li>
                <li>• You value guaranteed returns over potential gains</li>
                <li>• You&apos;d sleep better debt-free</li>
                <li>• You&apos;re close to retirement and reducing risk</li>
                <li>• You lack the discipline to actually invest the cash</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6">
              <p className="text-sm font-bold text-emerald-800 mb-3">
                Invest the cash when:
              </p>
              <ul className="space-y-2 text-sm text-emerald-700/80">
                <li>• Your mortgage rate is under 4%</li>
                <li>• You have decades until retirement</li>
                <li>• You need liquidity (you can&apos;t &ldquo;un-pay&rdquo; a mortgage)</li>
                <li>• You have tax-advantaged account space available</li>
                <li>• You can deduct mortgage interest at a high tax bracket</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-500 text-center">
            At 6%–7% — where rates sit in 2026 — the math strongly favors
            paying down the mortgage for most people. But there&apos;s no
            one-size-fits-all answer.
          </p>
        </section>

        {/* ================================================================
            SECTION 3 — the liquidity trap
            ================================================================ */}
        <section className="mb-12 rounded-2xl border border-amber-100 bg-amber-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-amber-900 mb-3">
            The One Catch: You Can&apos;t Get the Money Back
          </h2>
          <p className="text-amber-800/80 leading-relaxed mb-4">
            When you pay down a mortgage, that money is gone — locked in your
            walls. You can&apos;t access it without selling or refinancing
            (which comes with costs). If you lose your job six months after
            making a big principal payment, you can&apos;t &ldquo;un-pay&rdquo;
            the mortgage to cover living expenses.
          </p>
          <p className="text-amber-800/80 leading-relaxed">
            This is the strongest argument for investing instead: liquidity.
            Money in a brokerage account can be sold in days. Money in home
            equity requires a HELOC (at 8%+ interest) or selling the house.
            Before you pay down your mortgage, make sure you have a fully
            funded emergency fund — at least 6 months of expenses.
          </p>
        </section>

        {/* ================================================================
            SECTION 4 — the hybrid approach
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            The Best of Both Worlds: Do Some of Each
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-4">
            This doesn&apos;t have to be all-or-nothing. A balanced approach
            often makes the most sense:
          </p>
          <div className="space-y-3">
            <div className="flex gap-3 rounded-xl border border-zinc-100 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">1</span>
              <p className="text-sm text-zinc-600 leading-relaxed">
                <strong>Keep a fully funded emergency fund</strong> in a
                high-yield savings account. This is non-negotiable — don&apos;t
                pay down the mortgage with your safety net.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border border-zinc-100 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">2</span>
              <p className="text-sm text-zinc-600 leading-relaxed">
                <strong>Max out tax-advantaged accounts first</strong> (401(k)
                match, Roth IRA). The tax benefits often outweigh the guaranteed
                return of mortgage paydown.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border border-zinc-100 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">3</span>
              <p className="text-sm text-zinc-600 leading-relaxed">
                <strong>Split the remainder</strong> — half toward the mortgage
                (guaranteed return), half into a taxable brokerage account
                (potential upside + liquidity). This diversifies your approach
                and avoids putting all your eggs in one basket.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            CTA
            ================================================================ */}
        <section className="text-center mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              Compare Both Paths With Your Numbers
            </h2>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Enter your mortgage balance, rate, the extra cash you have, and
              your expected investment return. See exactly which path builds
              more wealth — and by how much.
            </p>
            <Link
              href="/decision/mortgage-vs-invest"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-500 hover:shadow-purple-600/40 active:scale-[0.98]"
            >
              Run Mortgage vs Invest Comparison
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
            Common Questions About Paying Off Your Mortgage vs Investing
          </h2>

          <FaqItem
            q="Is it better to pay off my mortgage or invest?"
            a="At 2026 rates (6%–7%), paying down your mortgage gives you a guaranteed, tax-free return equal to your interest rate — which is hard to beat with safe investments. The S&P 500 has historically returned ~10%, but that's not guaranteed and comes with risk. For most people at current rates, paying down the mortgage is mathematically the better risk-adjusted decision."
          />
          <FaqItem
            q="What return do I get from paying down my mortgage?"
            a="Exactly your mortgage rate — tax-free. If your mortgage is at 6.5%, every dollar you pay toward principal saves you 6.5% annually in interest for the remaining loan term. This is guaranteed: the bank can't change the terms. Compare this to the 10-year Treasury at ~4.3% (taxable) or a high-yield savings account at ~4% (taxable)."
          />
          <FaqItem
            q="Should I pay off my mortgage early if I plan to move?"
            a="Probably not — unless you plan to stay long enough for the interest savings to exceed the opportunity cost. If you sell in 3 years, the money you put toward principal could have been invested and growing instead. Use our tool to model your specific timeline."
          />
          <FaqItem
            q="Does paying off my mortgage affect my taxes?"
            a="It can — if you itemize deductions and deduct mortgage interest. Paying down principal reduces your interest payments, which reduces your mortgage interest deduction. This means the effective after-tax return of paying down your mortgage is slightly lower than your nominal rate if you itemize. For most homeowners (especially after the 2017 tax law changes), the standard deduction exceeds itemized deductions, so this is less of a factor."
          />
          <FaqItem
            q="What's the biggest risk of paying down my mortgage instead of investing?"
            a="Liquidity. Once you pay down a mortgage, that money is locked in home equity. You can't access it without selling or taking out a home equity loan (at higher rates). Before making a large principal payment, ensure you have a fully funded emergency fund (6+ months of expenses) and aren't sacrificing retirement contributions."
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
                name: "Is it better to pay off my mortgage or invest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "At 2026 rates (6%–7%), paying down gives a guaranteed, tax-free return equal to your rate — hard to beat. The S&P 500 has averaged ~10% but with risk. For most people at current rates, paying down is the better risk-adjusted decision.",
                },
              },
              {
                "@type": "Question",
                name: "What return do I get from paying down my mortgage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Exactly your mortgage rate — tax-free. At 6.5%, every dollar toward principal saves 6.5% annually in interest. Compare to the 10-year Treasury at ~4.3% (taxable) or savings accounts at ~4% (taxable).",
                },
              },
              {
                "@type": "Question",
                name: "Should I pay off my mortgage early if I plan to move?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Probably not unless staying long enough for interest savings to exceed opportunity cost. If selling in 3 years, that money could have been invested instead. Model your specific timeline with our tool.",
                },
              },
              {
                "@type": "Question",
                name: "Does paying off my mortgage affect my taxes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you itemize and deduct mortgage interest, paying down principal reduces your deduction. The after-tax return is slightly lower than your nominal rate. Most homeowners use the standard deduction, making this less relevant.",
                },
              },
              {
                "@type": "Question",
                name: "What's the biggest risk of paying down my mortgage instead of investing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Liquidity. Money in home equity can't be easily accessed. Before making a large principal payment, ensure a fully funded emergency fund (6+ months) and don't sacrifice retirement contributions.",
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

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-zinc-100 py-4 last:border-0">
      <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">{q}</h3>
      <p className="text-sm text-zinc-600 leading-relaxed">{a}</p>
    </div>
  );
}
