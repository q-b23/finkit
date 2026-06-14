import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "FinKit runs entirely in your browser. No accounts, no tracking, no data collection. Your financial information never leaves your device.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-zinc-400 mb-12">
        Last updated: June 14, 2026
      </p>

      <article className="prose prose-zinc max-w-none">
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          We Collect Nothing
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit is designed from the ground up with a simple principle: your
          financial data is yours, and it should stay on your device. Every
          calculation — debt payoff projections, loan comparisons, FIRE number
          estimates — happens entirely in your browser using JavaScript.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          We do not use cookies. We do not use analytics. We do not have a
          database. We do not have user accounts that store information. There
          is no server-side processing of your financial inputs. When you close
          the tab, everything is gone.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          What Happens When You Use FinKit
        </h2>
        <ul className="space-y-2 text-zinc-600 mb-6">
          <li>You open a calculator page — the HTML, CSS, and JavaScript load from our server (Vercel).</li>
          <li>You type numbers into input fields — those numbers stay in your browser's memory.</li>
          <li>You click calculate — JavaScript running locally performs the math and updates the page.</li>
          <li>You close the tab — all data is purged from memory.</li>
        </ul>
        <p className="text-zinc-600 leading-relaxed mb-4">
          At no point are your numbers transmitted to us, stored on a server, or shared with third parties. We have no way to see what you type.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          Hosting and Infrastructure
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit is hosted on Vercel. Vercel may collect standard server logs
          (IP address, request path, timestamp) for operational purposes. These
          logs are not linked to your financial inputs and are automatically
          purged. We do not have access to them in a way that would identify
          individual users.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          Open Source — Verify It Yourself
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit is fully open source under the MIT license. You can inspect
          every line of code on{" "}
          <a
            href="https://github.com/q-b23/finkit"
            className="text-zinc-900 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . If you prefer, you can clone the repository and run FinKit entirely
          offline on your own machine. There is no hidden tracking, no
          obfuscated code, and no surprise data collection.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          Changes to This Policy
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If this policy ever changes, the update will be reflected here with a
          new date. The core promise — no data collection, no tracking, no
          accounts — is fundamental to FinKit and will not change.
        </p>
        <p className="text-zinc-600 leading-relaxed">
          Questions? Open an issue on{" "}
          <a
            href="https://github.com/q-b23/finkit/issues"
            className="text-zinc-900 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </article>
    </div>
  );
}
