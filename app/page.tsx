import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Scale, Banknote, Shield } from "lucide-react";

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
 * Landing page — minimal hero with CTA, feature grid, and privacy reassurance.
 */
export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:py-32">
      {/* ---- Hero ---- */}
      <section className="animate-fade-in text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Take Control of Your Financial Future,{" "}
          <span className="text-zinc-400">Privately.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-zinc-500">
          Open-source tools to plan your debt payoff and calculate your path to
          FIRE. 100% local, zero tracking.
        </p>

        <div className="mt-10">
          <Link
            href="/dashboard/fire"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md active:scale-[0.98]"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ---- Feature Grid ---- */}
      <section className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* ---- Privacy Reassurance ---- */}
      <section className="mt-24 border-t border-zinc-100 pt-12 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50">
            <Shield className="h-6 w-6 text-zinc-400" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Your data stays on your device
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Every calculation runs locally in your browser. No accounts required.
            No analytics. No tracking. Just you and your numbers.
          </p>
        </div>
      </section>
    </div>
  );
}
