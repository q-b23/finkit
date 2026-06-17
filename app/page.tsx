import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Scale, Banknote, Shield, Github } from "lucide-react";
import MiniWealthVisualizer from "@/components/MiniWealthVisualizer";

/**
 * Per-page SEO metadata for the landing page.
 */
export const metadata: Metadata = {
  title: "FinKit — Free & Open Source Personal Finance Toolkit",
  description:
    "Debt payoff planner, loan comparison, and FIRE calculator. Privacy-first, no tracking, everything runs locally in your browser.",
};

/**
 * Feature cards displayed below the hero.
 * Each maps to a tool available in FinKit.
 */
const FEATURES = [
  {
    icon: Flame,
    title: "FIRE Calculator",
    description:
      "Project compound growth, find your FIRE number, and discover your Coast FIRE age — all inflation-adjusted.",
    href: "/dashboard/fire",
    accent: "text-amber-600 bg-amber-50",
  },
  {
    icon: Scale,
    title: "Debt Payoff Planner",
    description:
      "Compare snowball vs avalanche strategies. See your exact debt-free date and track every milestone.",
    href: "/dashboard/debt",
    accent: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Banknote,
    title: "Loan Comparison",
    description:
      "Compare multiple loan offers side by side. Monthly payments, total cost, and a composite score.",
    href: "/dashboard/loan",
    accent: "text-blue-600 bg-blue-50",
  },
];

/**
 * Landing page with:
 * - Dark hero section (single-column on mobile, two-column on md+)
 * - Feature grid (responsive: 1 → 2 → 3 columns)
 * - Privacy reassurance footer
 */
export default function LandingPage() {
  return (
    <>
      {/* ================================================================
          HERO — dark background, stacks vertically on mobile
          ================================================================ */}
      <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-32">
        {/* Subtle background texture */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(16_185_129_/_0.08),_transparent_50%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgb(255_255_255_/_0.03),_transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12 lg:gap-16">
            {/* ================================================================
                LEFT COLUMN — Hook, copy, and CTAs
                ================================================================ */}
            <div className="w-full text-left animate-fade-in md:flex-1">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
                Take Control of Your{" "}
                <span className="text-emerald-400">Financial Future.</span>{" "}
                Privately.
              </h1>

              <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
                Open-source tools to crush debt and calculate your path to
                FIRE. 100% local, zero tracking. Your data never leaves your
                browser.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/dashboard/fire"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 active:scale-[0.98] sm:w-auto"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://github.com/q-b23/finkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:text-white active:scale-[0.98] sm:w-auto"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            </div>

            {/* ================================================================
                RIGHT COLUMN — Interactive Mini Wealth Visualizer
                ================================================================ */}
            <div className="w-full animate-slide-up md:flex-1">
              <MiniWealthVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURE GRID — white background, responsive columns
          ================================================================ */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, href, accent }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
            >
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {description}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
                Open tool
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>


      {/* ================================================================
          LONG-FORM ARTICLES
          ================================================================ */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Deep Dives
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            In-depth articles with real numbers, formulas, and examples. No fluff.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/how-long-to-retire"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              How Long to Retire
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Savings rate to retirement timeline — with a quick-reference table.
            </p>
          </Link>
          <Link
            href="/fire-at-40"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              FIRE at 40
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              The math, the income required, and the Barista FIRE alternative.
            </p>
          </Link>
          <Link
            href="/compound-interest-examples"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-purple-700 mb-3">Investing</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Compound Interest Examples
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Three real scenarios: Sarah, Mike, and Alex. See who wins.
            </p>
          </Link>
          <Link
            href="/debt-avalanche-vs-snowball"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">Debt</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Avalanche vs Snowball
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Side-by-side with real numbers — see the dollar difference.
            </p>
          </Link>
          <Link
            href="/coast-fire-guide"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Coast FIRE Guide
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              The point where your money works harder than you do.
            </p>
          </Link>
          <Link
            href="/pay-off-debt-faster"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">Debt</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Pay Off Debt Faster
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              7 concrete strategies — bi-weekly, windfalls, balance transfers.
            </p>
          </Link>
          <Link
            href="/credit-card-payoff"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700 mb-3">Debt</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Credit Card Payoff
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Escape the minimum payment trap. Real APR comparison table.
            </p>
          </Link>
          <Link
            href="/mortgage-payoff"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700 mb-3">Mortgage</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Mortgage Payoff
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Cut years off your loan with extra principal and bi-weekly payments.
            </p>
          </Link>
          <Link
            href="/barista-fire"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Barista FIRE
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Low-stress job + investments. Halves your required nest egg.
            </p>
          </Link>
          <Link
            href="/lean-fire"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Lean FIRE
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Fastest path to FI. K/year real budget breakdown.
            </p>
          </Link>
          <Link
            href="/fat-fire"
            className="group rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 mb-3">FIRE</span>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
              Fat FIRE
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              K+/year retirement. Income-to-timeline projection table.
            </p>
          </Link>
        </div>
      </section>

      {/* ================================================================
          PRIVACY REASSURANCE
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
            Every calculation runs locally in your browser. No accounts
            required. No invasive tracking. Just you and your numbers.
          </p>
        </div>
      </section>
    </>
  );
}
