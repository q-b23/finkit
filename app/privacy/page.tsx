import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "No account required. Your data stays on your device. Email is the only optional identifier.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-zinc-400 mb-12">
        Last updated: June 22, 2026
      </p>

      <article className="prose prose-zinc max-w-none">
        {/* ================================================================
            1 — No account required
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          1. No Account Required
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit does not require you to create an account or log in. Every
          tool — affordability analysis, rent vs buy comparison, market timing,
          mortgage payoff modeling — works immediately with no sign-up.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          We do not track you across sessions. We do not use cookies for
          analytics or advertising. We do not have a database of user accounts.
        </p>

        {/* ================================================================
            2 — Local-first storage
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          2. Local-First Storage
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          All your inputs — income, home price, debts, down payment — are
          stored in your browser&apos;s local storage by default. This data
          never leaves your device.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Every calculation runs locally in your browser using JavaScript. We
          never see your numbers. We have no way to see your numbers. When you
          clear your browser storage or close the tab, that data is gone.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          You can delete all locally stored data at any time through your
          browser settings — no confirmation required, no lingering copies.
        </p>

        {/* ================================================================
            3 — Optional email only
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          3. Optional Email Only
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Email is the only personal identifier we ever collect — and only if
          you explicitly choose to subscribe to updates.
        </p>
        <ul className="space-y-2 text-zinc-600 mb-6">
          <li>
            If you subscribe, your email is stored securely and used solely to
            send the updates you requested.
          </li>
          <li>
            Every email includes a one-click unsubscribe link. Unsubscribing
            removes your email from our list immediately.
          </li>
          <li>
            We do not sell, share, or enrich your email with third-party data.
          </li>
          <li>
            You can request permanent deletion of your email at any time —
            we&apos;ll confirm within 48 hours.
          </li>
        </ul>

        {/* ================================================================
            What we never do
            ================================================================ */}
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">
            What We Never Do
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>Sell or share your data with third parties</li>
            <li>Build credit profiles or financial profiles on you</li>
            <li>Enrich your inputs with external databases</li>
            <li>Store your financial inputs on our servers</li>
            <li>Require an account to use any feature</li>
          </ul>
        </div>

        {/* ================================================================
            Hosting + open source
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          Hosting &amp; Open Source
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit is hosted on Vercel, which collects standard server logs for
          operational purposes. These logs are not linked to your identity or
          inputs.
        </p>
        <p className="text-zinc-600 leading-relaxed">
          FinKit is fully open source under the MIT license. You can inspect
          every line of code on{" "}
          <a
            href="https://github.com/q-b23/finkit"
            className="text-zinc-900 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          or clone the repo and run it entirely offline. Questions?{" "}
          <a
            href="https://github.com/q-b23/finkit/issues"
            className="text-zinc-900 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open an issue
          </a>
          .
        </p>
      </article>
    </div>
  );
}
