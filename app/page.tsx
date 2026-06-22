import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Home, ArrowLeftRight, Clock, PiggyBank, CreditCard, Shield } from "lucide-react";
import ResumeCard from "@/components/ResumeCard";

const MiniWealthVisualizer = dynamic(
  () => import("@/components/MiniWealthVisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64 rounded-2xl bg-zinc-900 border border-white/5">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    ),
  }
);

/**
 * Per-page SEO metadata.
 */
export const metadata: Metadata = {
  title: "Will You Become House Poor? — FinKit Home Affordability Decision System",
  description:
    "Before you buy, know your number. FinKit analyzes your finances and tells you whether that house will stretch you too thin — or set you free. Free, private, no accounts.",
};

/**
 * Decision entry points ordered by fear priority — from highest anxiety
 * to optimization. Each card is framed as the question a stressed buyer
 * is actually asking themselves.
 */
const DECISIONS = [
  {
    icon: Home,
    question: "Can I actually afford this house?",
    description:
      "Get a personalized risk score and cashflow stress analysis. See if the mortgage will leave you house poor before you sign anything.",
    href: "/decision/mortgage",
    accent: "bg-red-50 text-red-600",
  },
  {
    icon: ArrowLeftRight,
    question: "Should I rent instead of buying?",
    description:
      "Compare the real 5-year cost of renting vs buying — factoring in taxes, maintenance, appreciation, and opportunity cost.",
    href: "/decision/rent-vs-buy",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    icon: Clock,
    question: "Is now a bad time to buy?",
    description:
      "Understand whether current interest rates, local market conditions, and your personal timeline make now the right — or wrong — moment.",
    href: "/decision/timing",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: PiggyBank,
    question: "Pay off the mortgage or invest?",
    description:
      "Calculate exactly which path builds more wealth over your timeframe. Rate vs return, risk-adjusted, with clear exit scenarios.",
    href: "/decision/mortgage-vs-invest",
    accent: "bg-purple-50 text-purple-600",
  },
  {
    icon: CreditCard,
    question: "How fast can I get out of debt?",
    description:
      "Compare snowball vs avalanche with your real debts. See your exact debt-free date and every milestone along the way.",
    href: "/dashboard/debt",
    accent: "bg-emerald-50 text-emerald-600",
  },
] as const;

export default function LandingPage() {
  return (
    <>
      {/* Return-traffic: saved analyses resume card */}
      <div className="pt-8 md:pt-12">
        <ResumeCard />
      </div>
      {/* ================================================================
          HERO — lead with the #1 fear: becoming house poor
          ================================================================ */}
      <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(239_68_68_/_0.08),_transparent_50%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgb(255_255_255_/_0.03),_transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12 lg:gap-16">
            {/* LEFT COLUMN — fear hook, reassurance, CTAs */}
            <div className="w-full animate-fade-in md:flex-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">
                Housing Affordability
              </p>

              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
                Will You Become{" "}
                <span className="text-red-400">House Poor?</span>
              </h1>

              <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
                The most expensive financial mistake in America isn&apos;t bad
                investing — it&apos;s buying too much house. Before you sign,
                know your number.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/decision/mortgage"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-400 hover:shadow-red-500/40 active:scale-[0.98] sm:w-auto"
                >
                  Check My Affordability
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/decision/rent-vs-buy"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:text-white active:scale-[0.98] sm:w-auto"
                >
                  Rent vs Buy Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN — visual anchor */}
            <div className="w-full animate-slide-up md:flex-1">
              <MiniWealthVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          DECISION FLOW — anxiety-prioritized questions, not feature cards
          ================================================================ */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Every Housing Decision, Answered
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Ranked by what keeps homebuyers up at night. Start at the top.
          </p>
        </div>

        <div className="space-y-4">
          {DECISIONS.map(({ icon: Icon, question, description, href, accent }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-md sm:gap-5 sm:p-6"
            >
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
                  {question}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                  {description}
                </p>
              </div>
              <div className="hidden sm:flex shrink-0 items-center self-center">
                <ArrowRight className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-zinc-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS — position as a decision system, not calculators
          ================================================================ */}
      <section className="border-t border-zinc-100 bg-zinc-50/50 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-900">
            Decisions, Not Just Calculators
          </h2>
          <p className="mt-3 text-center text-sm text-zinc-500">
            Other sites give you numbers. FinKit gives you answers.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-zinc-900">
                Enter Your Numbers
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Income, savings, debts, home price. Everything stays on your
                device. Nothing leaves your browser.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-zinc-900">
                Get Your Risk Score
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                A clear 0–100 score with a recommendation: what you can safely
                afford and where the danger zone starts.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-zinc-900">
                Understand Why
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                No black boxes. Every recommendation comes with a plain-English
                breakdown so you can make the call with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PRIVACY + TRUST — same as before, still true
          ================================================================ */}
      <section className="border-t border-zinc-100 pb-20 pt-12 text-center sm:pb-24">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 sm:px-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50">
            <Shield className="h-6 w-6 text-zinc-400" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Your data stays on your device
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Every analysis runs locally in your browser. No accounts required.
            No invasive tracking. Just you and your numbers.
          </p>
        </div>
      </section>
    </>
  );
}
