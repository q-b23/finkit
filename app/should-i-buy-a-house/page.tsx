import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Should You Buy a House in 2026? — Don't Ask the Bank. Ask Your Numbers.",
  description:
    "The short answer: it depends entirely on your numbers, not the market. Learn the 4 questions to answer before you look at a single listing — and get your free risk score in 60 seconds.",
  openGraph: {
    title: "Should You Buy a House in 2026? — Free Risk Score",
    description:
      "Before you ask a lender, ask your own numbers. Get a personalized risk score and see whether buying will make you house poor.",
  },
};

/**
 * SEO landing page targeting "should I buy a house in 2026" and related
 * decision-intent queries.
 *
 * Structure:
 *   - Direct answer in the opening paragraph (AI/SGE optimization)
 *   - Fear-driven sub-questions ordered by anxiety priority
 *   - CTA into the mortgage decision engine
 *   - FAQ schema at the bottom
 */

export default function ShouldIBuyAHousePage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        {/* ================================================================
            HERO — direct answer for AI + SGE
            ================================================================ */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Housing Decision Guide
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Should You Buy a House in 2026? Don&apos;t Ask the Bank. Ask Your
            Numbers.
          </h1>

          {/* DIRECT ANSWER — AI systems scrape this as the summary */}
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              The Short Answer
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              It depends entirely on <strong>your numbers</strong>, not the
              market. A lender might approve you for a mortgage that consumes
              50% of your take-home pay — but that doesn&apos;t mean you can
              afford it. Before you ask a bank what you qualify for, ask your
              budget what you can actually live with.{" "}
              <strong>
                Run your numbers through our free risk score tool below — it
                takes 60 seconds and nothing leaves your browser.
              </strong>
            </p>
          </div>
        </header>

        {/* ================================================================
            SECTION 1 — reframe the question
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            The Real Question Isn&apos;t &ldquo;Can I Afford It?&rdquo;
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-4">
            It&apos;s &ldquo;<strong>Will I regret it?</strong>&rdquo;
          </p>
          <p className="text-zinc-600 leading-relaxed mb-4">
            Here&apos;s something most home-buying guides won&apos;t tell you:
            the lender&apos;s approval and your actual financial safety are two
            completely different numbers. Banks use debt-to-income ratios that
            max out at 43%–50% of your <em>gross</em> income — before taxes,
            before 401(k) contributions, before life happens.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            The number that actually matters?{" "}
            <strong>What percentage of your take-home pay goes to housing.</strong>{" "}
            If it&apos;s over 40%, you are almost certainly going to feel
            stretched. If it&apos;s over 50%, you are — by every real-world
            definition — house poor.
          </p>
        </section>

        {/* ================================================================
            SECTION 2 — the 4 questions (anxiety priority)
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            4 Questions to Answer Before You Look at a Single Listing
          </h2>

          <div className="space-y-6">
            <QuestionCard
              num={1}
              question="What % of your take-home pay will go to housing?"
              answer={
                <>
                  This is the only number that predicts whether you&apos;ll feel
                  house poor. Under 35% is safe. 35%–45% is tight but doable
                  with a strong budget. Over 50% means you&apos;ll have no
                  financial breathing room — you&apos;re one emergency away from
                  real trouble.{" "}
                  <strong>
                    The median regret post on Reddit? The buyer whose mortgage
                    was 50%+ of take-home.
                  </strong>
                </>
              }
            />

            <QuestionCard
              num={2}
              question="What&apos;s left after the mortgage — really?"
              answer={
                <>
                  Subtract housing, debts, utilities, groceries, and basic
                  living costs from your take-home pay. If what&apos;s left is
                  under 10% of your income, you&apos;re in the danger zone.
                  You&apos;ll be one car repair or medical bill away from
                  credit card debt — and that&apos;s how the spiral starts.
                </>
              }
            />

            <QuestionCard
              num={3}
              question="Are you buying at the worst possible moment?"
              answer={
                <>
                  In 2026, mortgage rates are hovering around 6%–7% — roughly
                  double what buyers got in 2021. That means the same house
                  costs hundreds more per month in interest alone. This
                  doesn&apos;t mean don&apos;t buy — but it does mean you need
                  to run the numbers with <em>your rate</em>, not the national
                  average. A 0.5% rate difference can change your monthly
                  payment by $150+ on a median-price home.
                </>
              }
            />

            <QuestionCard
              num={4}
              question="What if you rented instead and invested the difference?"
              answer={
                <>
                  This isn&apos;t a theoretical question. In many US markets
                  right now, renting and investing the down payment + monthly
                  savings actually builds more wealth over 5–7 years than
                  buying — especially at 6%+ mortgage rates. Our rent vs buy
                  tool runs both scenarios with your exact numbers so you can
                  see the math, not the myths.
                </>
              }
            />
          </div>
        </section>

        {/* ================================================================
            SECTION 3 — affordability illusion
            ================================================================ */}
        <section className="mb-12 rounded-2xl border border-red-100 bg-red-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-red-900 mb-3">
            The Bank Says Yes. Your Gut Says No. Here&apos;s Why.
          </h2>
          <p className="text-red-800/80 leading-relaxed mb-4">
            Lenders approve loans based on formulas designed to maximize what
            they can safely lend — not what you can safely live with. A
            &ldquo;qualified&rdquo; buyer at 45% DTI is often a stressed,
            cash-poor homeowner six months after closing.
          </p>
          <p className="text-red-800/80 leading-relaxed">
            If your gut is telling you the numbers feel wrong,{" "}
            <strong>listen to it.</strong> Run your real numbers through our
            risk score engine. It uses the same math the bank uses — but it
            tells you what the bank won&apos;t: whether you should actually say
            yes.
          </p>
        </section>

        {/* ================================================================
            CTA — into the decision engine
            ================================================================ */}
        <section className="text-center mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              Get Your Personal Risk Score — Free, 60 Seconds, Private
            </h2>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Enter your income, the home price, and your down payment. See
              exactly where the line is between safe and house poor. Nothing
              leaves your browser.
            </p>
            <Link
              href="/decision/mortgage"
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-400 hover:shadow-red-500/40 active:scale-[0.98]"
            >
              Check My Affordability
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/hidden-housing-costs"
                className="text-xs text-zinc-400 hover:text-purple-600 transition-colors underline underline-offset-2"
              >
                Hidden Housing Costs
              </Link>
              <span className="text-zinc-200">·</span>
              <Link
                href="/decision/rent-vs-buy"
                className="text-xs text-zinc-400 hover:text-amber-600 transition-colors underline underline-offset-2"
              >
                Rent vs Buy Comparison
              </Link>
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              No account needed. No email required. Everything runs locally.
            </p>
          </div>
        </section>

        {/* ================================================================
            FAQ — structured for schema + AI visibility
            ================================================================ */}
        <section className="border-t border-zinc-100 pt-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            Common Questions About Buying a House in 2026
          </h2>

          <FaqItem
            q="How do I know if I can actually afford a house — not just get approved?"
            a="Start with your take-home pay, not your gross income. Calculate what percentage goes to the mortgage, property tax, insurance, and maintenance. If it's over 40% of take-home, you are in risky territory. If it's over 50%, the math says you will be house poor — regardless of what the bank's approval letter says."
          />

          <FaqItem
            q="Is 2026 a bad year to buy a house?"
            a="It's a harder year than 2020–2021, when rates were historically low. At 6%–7% mortgage rates, the same house costs significantly more per month than it did a few years ago. But 'bad timing' also depends on your personal situation — how long you'll stay, what your local market looks like, and whether renting is actually cheaper. There is no universal answer, but our risk score tool factors in current rates so you can see your personal picture."
          />

          <FaqItem
            q="What does 'house poor' actually mean?"
            a="House poor means your housing costs consume so much of your income that you have little left for anything else — savings, vacations, emergencies, or even basic flexibility. The most common benchmark: housing costs exceed 50% of your take-home pay. At that level, one unexpected expense can trigger a debt spiral."
          />

          <FaqItem
            q="Should I rent or buy right now?"
            a="The answer depends on your local market, how long you plan to stay, and current interest rates. In many US cities at 2026 rates, renting and investing the difference builds more wealth over 5 years than buying. But if you plan to stay 10+ years, buying usually wins. Run both scenarios with your numbers to see the real comparison."
          />

          <FaqItem
            q="What's a safe debt-to-income ratio for buying a house?"
            a="Lenders allow up to 43%–50% DTI, but the safe range for actual living is 28%–36% of gross income for housing alone. In take-home terms (which matter more day-to-day), aim for under 40%. Above 50% of take-home going to housing is the house poor zone."
          />
        </section>
      <RelatedArticles category="mortgage" />

      </article>

      {/* ================================================================
          FAQPage structured data (injected via script)
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
                name: "How do I know if I can actually afford a house?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Start with your take-home pay, not your gross income. Calculate what percentage goes to the mortgage, property tax, insurance, and maintenance. If it's over 40% of take-home, you are in risky territory. If it's over 50%, the math says you will be house poor.",
                },
              },
              {
                "@type": "Question",
                name: "Is 2026 a bad year to buy a house?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "At 6%–7% mortgage rates, homes cost significantly more per month than in 2020–2021. But timing depends on your personal finances, local market, and how long you'll stay. Run your numbers to see your personal risk profile.",
                },
              },
              {
                "@type": "Question",
                name: "What does 'house poor' mean?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "House poor means your housing costs consume so much of your income that you have little left for savings, emergencies, or flexibility. The common benchmark: housing exceeds 50% of take-home pay.",
                },
              },
              {
                "@type": "Question",
                name: "Should I rent or buy right now?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your local market, how long you'll stay, and current rates. In many US cities at 2026 rates, renting and investing the difference builds more wealth over 5 years. Run both scenarios with your numbers.",
                },
              },
              {
                "@type": "Question",
                name: "What is a safe debt-to-income ratio for buying a house?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lenders allow up to 43%–50% DTI, but the safe range for actual living is 28%–36% of gross income for housing. In take-home terms, aim for under 40%.",
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

function QuestionCard({
  num,
  question,
  answer,
}: {
  num: number;
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
        {num}
      </div>
      <div>
        <h3 className="text-base font-semibold text-zinc-900 mb-2">
          {question}
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{answer}</p>
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
