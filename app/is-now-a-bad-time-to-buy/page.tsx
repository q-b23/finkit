import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Is Now a Bad Time to Buy a House? — Rate & Market Timing Analysis",
  description:
    "Mortgage rates, home prices, and your personal timeline all factor in. Get a clear buy-now-or-wait recommendation based on your numbers — not headlines.",
  openGraph: {
    title: "Is Now a Bad Time to Buy a House? — Free Timing Analysis",
    description:
      "Rates are at 6.5%. Prices are still high. Should you wait? Answer the question with your numbers — free, private, 60 seconds.",
  },
};

/**
 * SEO landing page targeting "is now a bad time to buy a house" and market
 * timing queries.
 *
 * This is the "Fear #3" page — rate/pricing anxiety. Unlike affordability
 * (fear of being house poor) or rent-vs-buy (fear of making the wrong choice),
 * this addresses the fear of bad timing — buying at the peak.
 */

export default function IsNowABadTimeToBuyPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        {/* ================================================================
            HERO
            ================================================================ */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Market Timing
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Is Now a Bad Time to Buy a House?
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              The Short Answer
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              It depends far more on{" "}
              <strong>your personal timeline and finances</strong> than on
              national headlines. Yes, 6.5% mortgage rates and elevated home
              prices make 2026 harder than 2021. But &ldquo;bad timing&rdquo;
              isn&apos;t the same for everyone — a buyer planning to stay 15
              years faces a completely different equation than someone who might
              move in 3.{" "}
              <strong>
                Model both scenarios — buy now vs wait — with your real numbers
                below. It takes 60 seconds.
              </strong>
            </p>
          </div>
        </header>

        {/* ================================================================
            SECTION 1 — why timing anxiety is rational
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            Why This Question Feels Impossible Right Now
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-4">
            In 2026, buyers face a collision of three uncomfortable facts.
            Ignoring any one of them leads to a bad decision.
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-100 p-5">
              <p className="text-sm font-semibold text-zinc-900 mb-1.5">
                1. Mortgage rates are roughly double what they were in 2021
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                At 6.5%, the monthly payment on a $400K loan is about $2,530 —
                compared to $1,690 at 3%. That&apos;s an extra $840/month, or
                $302,000 more in interest over 30 years. The rate environment
                has fundamentally changed the affordability math.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-100 p-5">
              <p className="text-sm font-semibold text-zinc-900 mb-1.5">
                2. Home prices haven&apos;t fallen enough to offset higher rates
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                In a normal market, higher rates push prices down. But low
                inventory — homeowners with 3% mortgages aren&apos;t selling —
                has kept prices elevated. The result: buyers face both high
                rates AND high prices simultaneously, a historically unusual
                combination.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-100 p-5">
              <p className="text-sm font-semibold text-zinc-900 mb-1.5">
                3. Nobody can predict where rates or prices go next
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Forecasts for 2027 mortgage rates range from 4.5% to 7.5%.
                Forecasts for home prices range from -5% to +5%. Anyone who
                claims certainty is selling something. The only rational
                approach: model multiple scenarios and see which one works for
                <em> your</em> timeline.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 2 — the buy now vs wait framework
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            Buy Now vs Wait: The Only 4 Numbers That Matter
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-6">
            Strip away the headlines. Here&apos;s the actual math.
          </p>

          <div className="space-y-5">
            <TimingFactor
              num={1}
              title="How much will prices rise while you wait?"
              detail="If homes appreciate 3%/year and you wait 12 months, a $450K house becomes $463,500. That's $13,500 more — per year you wait. In hot markets at 5%+ appreciation, waiting can cost more than the rate savings you're hoping for."
            />
            <TimingFactor
              num={2}
              title="How much will rates change?"
              detail="If rates drop from 6.5% to 5.5%, the monthly payment on a $400K loan drops about $250/month. That's real savings — but only if rates actually fall that much, and only if prices don't rise enough to cancel it out. Our tool lets you test any rate scenario."
            />
            <TimingFactor
              num={3}
              title="How much rent will you pay while waiting?"
              detail="At $2,200/month, a 12-month wait costs $26,400 in rent — money you'll never get back. Add that to any price increase during the wait, and the 'savings' from a lower rate might disappear completely."
            />
            <TimingFactor
              num={4}
              title="How much extra can you save toward the down payment?"
              detail="If you save an extra $800/month while waiting, that's $9,600 more toward your down payment in a year. A bigger down payment means a smaller loan, less interest, and potentially no PMI. This is the one factor that consistently makes waiting worthwhile."
            />
          </div>
        </section>

        {/* ================================================================
            SECTION 3 — reality check
            ================================================================ */}
        <section className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3">
            The Hidden Variable: Your Life, Not the Market
          </h2>
          <p className="text-blue-800/80 leading-relaxed mb-4">
            The biggest timing mistake isn&apos;t buying at the market peak —
            it&apos;s letting the market decide your life. If you have a stable
            job, plan to stay 10+ years, and can comfortably afford the payment
            at current rates, you should probably buy — regardless of what
            rates do next.
          </p>
          <p className="text-blue-800/80 leading-relaxed">
            Conversely, if you might move in 3–5 years, or the payment would
            stretch you thin even at today&apos;s rates, waiting is almost
            certainly the right call — regardless of where you think the market
            is headed.
          </p>
        </section>

        {/* ================================================================
            CTA
            ================================================================ */}
        <section className="text-center mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              Model Both Paths With Your Real Numbers
            </h2>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Set the rate you expect, the price trend in your market, and how
              long you&apos;d wait. See in seconds whether buying now or later
              leaves you better off.
            </p>
            <Link
              href="/decision/timing"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 active:scale-[0.98]"
            >
              Run Timing Analysis
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
            Common Questions About Market Timing
          </h2>

          <FaqItem
            q="Is 2026 a bad time to buy a house?"
            a="It's a harder time than 2020–2021, when rates were historically low. At 6%–7% mortgage rates combined with still-elevated prices, the monthly cost of buying is higher than it's been in decades relative to incomes. But 'bad timing' depends on your personal situation — how long you'll stay, your local market, and whether you can comfortably afford the payment."
          />
          <FaqItem
            q="Should I buy now or wait for rates to drop?"
            a="Waiting for lower rates is a gamble: rates might not drop, and prices might rise while you wait, canceling out any savings. In our model, if rates drop 1% but prices rise 3% while you wait 12 months and pay $26K+ in rent, you often end up worse off. The right answer depends on your specific numbers and market."
          />
          <FaqItem
            q="What if I buy now and the market crashes?"
            a="If you plan to stay 10+ years, a short-term price drop doesn't affect you — you're not selling. Over 10–15 year horizons, US home prices have never declined in nominal terms. The real risk isn't a temporary price dip; it's being forced to sell during a downturn because you bought a house you couldn't comfortably afford."
          />
          <FaqItem
            q="How do I know if I should wait or buy immediately?"
            a="Four questions to answer: (1) How long will you stay? Under 5 years = likely wait. (2) Can you afford the payment comfortably at today's rates? If no = wait. (3) Are you saving aggressively for a bigger down payment? If yes = waiting might pay off. (4) Is your local market appreciating fast? If yes = buying sooner may win."
          />
          <FaqItem
            q="Will mortgage rates go down in 2027?"
            a="Nobody knows. Current forecasts range from 4.5% to 7.5%. The Federal Reserve has signaled potential rate cuts, but mortgage rates don't move in lockstep with the Fed funds rate. Rather than trying to predict rates, model multiple rate scenarios and see at what point waiting becomes worthwhile for your situation."
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
                name: "Is 2026 a bad time to buy a house?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It's harder than 2020–2021 due to 6%–7% rates and elevated prices. But it depends on your personal timeline: long-term buyers in affordable situations can still benefit. Run your numbers to see your personal risk.",
                },
              },
              {
                "@type": "Question",
                name: "Should I buy now or wait for rates to drop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Waiting is a gamble — rates may not drop, and prices may rise. If you wait 12 months paying rent while prices appreciate 3%, a 1% rate drop may not save you money. Model both scenarios with your numbers.",
                },
              },
              {
                "@type": "Question",
                name: "What if I buy now and the market crashes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you stay 10+ years, short-term price drops don't affect you. Over 10–15 year horizons, US home prices have never declined nominally. The real risk is being forced to sell during a downturn because the payment was unaffordable.",
                },
              },
              {
                "@type": "Question",
                name: "How do I know if I should wait or buy immediately?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Answer four questions: (1) Stay duration — under 5 years = wait. (2) Can you afford the payment at current rates? (3) Are you saving for a bigger down payment? (4) Is your market appreciating fast? Your answers determine the right call.",
                },
              },
              {
                "@type": "Question",
                name: "Will mortgage rates go down in 2027?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nobody knows — forecasts range from 4.5% to 7.5%. Rather than predicting, model multiple rate scenarios to see at what point waiting becomes worthwhile for your specific situation.",
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

function TimingFactor({
  num,
  title,
  detail,
}: {
  num: number;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-zinc-100 p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
        {num}
      </div>
      <div>
        <h3 className="text-base font-semibold text-zinc-900 mb-2">{title}</h3>
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
