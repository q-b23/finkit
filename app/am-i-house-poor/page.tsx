import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Am I House Poor? — The 4 Signs + What to Do About It",
  description:
    "If you're asking the question, you probably already know the answer. Here's the real definition of house poor, the 4 signs, and what you can actually do — without selling your home.",
  openGraph: {
    title: "Am I House Poor? — 4 Signs + Solutions",
    description:
      "House poor isn't a character flaw. It's a math problem — and it's fixable. Learn the 4 signs, how you got here, and what to do next.",
  },
};

/**
 * SEO landing page targeting "am I house poor" — a diagnostic/label query.
 *
 * This page serves homeowners who are already feeling the squeeze. It provides
 * a self-diagnosis framework, validates their experience, and bridges them to
 * the decision engine for future purchases.
 */

export default function AmIHousePoorPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        {/* ================================================================
            HERO — diagnostic, not predictive
            ================================================================ */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Financial Health Check
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-4xl">
            Am I House Poor? The 4 Signs — and What You Can Actually Do
          </h1>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              The Honest Answer
            </p>
            <p className="text-base text-zinc-700 leading-relaxed">
              If you&apos;re Googling this question, you probably already know
              the answer. House poor isn&apos;t a character flaw — it&apos;s a
              math problem with a specific definition: your housing costs
              consume so much of your income that you have little left for
              anything else. Below are the 4 signs. If 2 or more apply to you,
              the math says you&apos;re house poor — but the good news is,
              it&apos;s fixable.
            </p>
          </div>
        </header>

        {/* ================================================================
            SECTION 1 — the 4 signs (self-diagnosis)
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            The 4 Signs You&apos;re House Poor
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-6">
            You don&apos;t need a spreadsheet. If you recognize yourself in
            these, the math confirms what your gut already knows.
          </p>

          <div className="space-y-5">
            {[
              {
                num: 1,
                title: "Over 50% of your take-home pay goes to housing",
                detail: (
                  <>
                    This is the single most reliable indicator. Add up your
                    mortgage, property tax, insurance, and HOA. Divide by your
                    monthly take-home pay — that&apos;s the money that actually
                    hits your bank account. If it&apos;s over 50%, you are, by
                    every real-world definition, house poor.{" "}
                    <strong>
                      Even 40%–50% is the danger zone — where you can pay the
                      bills but can&apos;t build savings or handle surprises.
                    </strong>
                  </>
                ),
              },
              {
                num: 2,
                title: "You can't handle a $5,000 emergency without credit cards",
                detail: (
                  <>
                    A water heater fails. A car transmission goes. A medical
                    bill arrives. If your first thought is &ldquo;which credit
                    card has room on it,&rdquo; rather than &ldquo;I&apos;ll
                    pull it from savings,&rdquo; you&apos;re house poor. The
                    mortgage has consumed your emergency fund — and now
                    it&apos;s consuming your future too, through 25% APR credit
                    card debt.
                  </>
                ),
              },
              {
                num: 3,
                title: "You've stopped saving for retirement — or never started",
                detail: (
                  <>
                    When housing costs squeeze everything else, retirement
                    savings are usually the first thing to go. If your 401(k)
                    contribution has dropped to zero — or you&apos;re telling
                    yourself you&apos;ll &ldquo;catch up later&rdquo; — the
                    house is costing you more than the mortgage payment. It
                    &apos;s costing you compound years you can never get back.
                  </>
                ),
              },
              {
                num: 4,
                title: "You can't furnish, maintain, or enjoy your home",
                detail: (
                  <>
                    House poor isn&apos;t just about the numbers on a
                    spreadsheet — it&apos;s about quality of life. If you have
                    rooms you can&apos;t afford to furnish, repairs you keep
                    deferring, or you haven&apos;t taken a real vacation since
                    you got the keys, you&apos;re living the definition. A home
                    should improve your life, not imprison it.
                  </>
                ),
              },
            ].map((sign) => (
              <SignCard key={sign.num} {...sign} />
            ))}
          </div>
        </section>

        {/* ================================================================
            SECTION 2 — how did I get here?
            ================================================================ */}
        <section className="mb-12 rounded-2xl border border-red-100 bg-red-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-red-900 mb-4">
            How Did I Get Here? (It&apos;s Not Your Fault)
          </h2>
          <p className="text-red-800/80 leading-relaxed mb-4">
            Most house-poor homeowners didn&apos;t make a reckless decision.
            They followed the standard advice:
          </p>
          <ol className="space-y-3 text-sm text-red-800/80 list-decimal list-inside">
            <li>
              <strong>The bank said they qualified</strong> — and banks
              approve loans up to 43%–50% DTI, which is far beyond what feels
              comfortable in real life.
            </li>
            <li>
              <strong>Every calculator said &ldquo;you can afford it&rdquo;</strong>{" "}
              — because most calculators use gross income and ignore the actual
              cost of living.
            </li>
            <li>
              <strong>Interest rates were different when they bought</strong>{" "}
              — if you bought at 3% and had to refinance or sell into a 6.5%
              world, the math changed under your feet.
            </li>
            <li>
              <strong>They trusted the monthly payment estimate</strong> — not
              realizing that property tax reassessments, insurance hikes, and
              maintenance would add hundreds more per month.
            </li>
          </ol>
        </section>

        {/* ================================================================
            SECTION 3 — what to do
            ================================================================ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            So What Can You Actually Do About It?
          </h2>

          <div className="space-y-4">
            <OptionCard
              title="Option 1: Reduce housing costs without moving"
              detail="Refinance if rates drop (unlikely in 2026, but monitor it). Appeal your property tax assessment — many homeowners overpay by $500–$1,500/year and never check. Shop insurance every year — loyalty gets punished in home insurance pricing. Rent out a room or ADU if you have the space."
            />
            <OptionCard
              title="Option 2: Restructure your budget aggressively"
              detail="This is the hardest path, but sometimes the only one. Cut all non-essential spending for 12–18 months. Build a $5,000 emergency fund as your first priority — before anything else. Once you have a buffer, redirect the freed-up cash flow to paying down high-interest debt. The math: eliminating a $10,000 credit card at 25% APR frees up ~$300/month."
            />
            <OptionCard
              title="Option 3: Sell and downsize — without shame"
              detail="This is the option nobody wants to hear, but it's often the right one. Selling a house you can't afford isn't failure — it's a course correction. The transaction costs hurt (6% agent commission), but 12 months of financial stress hurt more. If you sell, use our risk score tool below before buying the next one."
            />
          </div>
        </section>

        {/* ================================================================
            SECTION 4 — bridging to the decision engine
            ================================================================ */}
        <section className="text-center mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-zinc-900 mb-3">
              Don&apos;t Make the Same Mistake Twice
            </h2>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Whether you&apos;re house poor now and planning a move, or
              you&apos;re reading this before buying your first home — run your
              numbers before you sign. Our risk score tells you what the bank
              won&apos;t: whether you can actually afford it.
            </p>
            <Link
              href="/decision/mortgage"
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-400 hover:shadow-red-500/40 active:scale-[0.98]"
            >
              Check My Affordability
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ================================================================
            FAQ
            ================================================================ */}
        <section className="border-t border-zinc-100 pt-12">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">
            Common Questions About Being House Poor
          </h2>

          <FaqItem
            q="What exactly does 'house poor' mean?"
            a="House poor means your housing costs — mortgage, property tax, insurance, HOA, and maintenance — consume so much of your income that you have little left for savings, discretionary spending, or emergencies. The most common benchmark: housing exceeds 50% of your take-home pay. At that level, you're one unexpected expense away from a financial crisis."
          />
          <FaqItem
            q="How do I know if I'm house poor?"
            a="Four signs: (1) Over 50% of take-home pay goes to housing. (2) You couldn't handle a $5,000 emergency without credit cards. (3) You've stopped saving for retirement. (4) You can't furnish, maintain, or enjoy your home. If two or more apply, you meet the definition."
          />
          <FaqItem
            q="What can I do if I'm house poor?"
            a="Three paths: (1) Reduce housing costs without moving — refinance if rates allow, appeal property taxes, shop insurance, rent out a room. (2) Aggressively restructure your budget for 12–18 months to build a buffer and eliminate high-interest debt. (3) Sell and downsize. It's not failure — it's a course correction."
          />
          <FaqItem
            q="Is being house poor a temporary situation?"
            a="It can be — but it rarely resolves on its own. If your income is growing faster than your housing costs, the squeeze may ease over 2–3 years. But if your mortgage is fixed and your income is flat, the math doesn't improve. The most common trap: hoping things get better while credit card debt quietly accumulates."
          />
          <FaqItem
            q="How do I avoid becoming house poor on my next home?"
            a="Ignore what the bank says you qualify for. Calculate what percentage of your take-home pay will go to total housing costs. Keep it under 40%. Use a risk score tool that shows you where the line is — not just a yes/no from a lender's formula. And budget for maintenance (1% of home value per year) and property tax reassessments before you commit."
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
                name: "What exactly does 'house poor' mean?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "House poor means your housing costs consume so much of your income that you have little left for savings, emergencies, or discretionary spending. The common benchmark: housing exceeds 50% of take-home pay.",
                },
              },
              {
                "@type": "Question",
                name: "How do I know if I'm house poor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Four signs: over 50% of take-home goes to housing, can't handle a $5,000 emergency without credit cards, stopped saving for retirement, and can't furnish or enjoy your home. Two or more means you're house poor.",
                },
              },
              {
                "@type": "Question",
                name: "What can I do if I'm house poor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Three paths: reduce costs without moving (refinance, appeal taxes, shop insurance), aggressively restructure your budget, or sell and downsize. It's a course correction, not failure.",
                },
              },
              {
                "@type": "Question",
                name: "Is being house poor temporary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It can be if income grows faster than housing costs. But with fixed mortgages and flat income, the math doesn't improve on its own. The most common trap is hoping things get better while credit card debt accumulates.",
                },
              },
              {
                "@type": "Question",
                name: "How do I avoid becoming house poor on my next home?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ignore the bank's approval number. Keep total housing under 40% of take-home pay. Use a risk score tool that shows you the line — not just a yes/no from a lender. Budget for maintenance at 1% of home value annually.",
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

function SignCard({
  num,
  title,
  detail,
}: {
  num: number;
  title: string;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-zinc-100 p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
        {num}
      </div>
      <div>
        <h3 className="text-base font-semibold text-zinc-900 mb-2">{title}</h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

function OptionCard({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 p-5">
      <h3 className="text-sm font-semibold text-zinc-900 mb-2">{title}</h3>
      <p className="text-sm text-zinc-600 leading-relaxed">{detail}</p>
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
