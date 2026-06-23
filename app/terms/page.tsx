import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "FinKit is provided free of charge, as-is, with no warranties. All calculations are estimates — not financial advice.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
        Terms of Service
      </h1>
      <p className="text-sm text-zinc-400 mb-12">
        Last updated: June 23, 2026
      </p>

      <article className="prose prose-zinc max-w-none">
        {/* ================================================================
            1 — Acceptance
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          By accessing or using FinKit (&ldquo;the Service&rdquo;), you agree
          to be bound by these Terms of Service. If you do not agree, do not
          use the Service.
        </p>

        {/* ================================================================
            2 — Description of Service
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          2. Description of Service
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit provides free, open-source personal finance decision tools
          including mortgage affordability analysis, rent vs buy comparisons,
          debt payoff planning, FIRE calculators, and loan comparisons.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The Service is provided &ldquo;as-is&rdquo; and &ldquo;as
          available&rdquo; without warranties of any kind, either express or
          implied. We reserve the right to modify or discontinue the Service at
          any time without notice.
        </p>

        {/* ================================================================
            3 — No Financial Advice
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          3. No Financial Advice
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit is an educational and informational tool. Nothing on this
          website constitutes financial, legal, or tax advice. All calculations
          are estimates based on the inputs you provide. Results may not
          reflect actual costs, fees, taxes, or market conditions.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Before making any financial decision — especially one as significant
          as buying a home — consult a qualified professional who understands
          your complete financial picture.
        </p>

        {/* ================================================================
            4 — User Responsibilities
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          4. User Responsibilities
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          You are responsible for the accuracy of any information you enter
          into the Service. You acknowledge that outputs depend entirely on
          your inputs and that incorrect inputs will produce incorrect results.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          You agree not to use the Service for any unlawful purpose or in
          violation of any applicable laws or regulations.
        </p>

        {/* ================================================================
            5 — Privacy
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          5. Privacy
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Your use of the Service is also governed by our{" "}
          <Link
            href="/privacy"
            className="text-zinc-900 underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          . All calculations run locally in your browser. We do not store your
          financial data on our servers. The only personal identifier we
          collect is your email address, and only if you explicitly choose to
          subscribe.
        </p>

        {/* ================================================================
            6 — Intellectual Property
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          6. Open Source License
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          FinKit is open source software released under the MIT license. You
          are free to use, modify, and distribute the code under the terms of
          that license. The full source code is available on{" "}
          <a
            href="https://github.com/q-b23/finkit"
            className="text-zinc-900 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          The FinKit name, logo, and brand identity are not covered by the MIT
          license and may not be used without permission.
        </p>

        {/* ================================================================
            7 — Limitation of Liability
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          To the fullest extent permitted by law, FinKit and its contributors
          shall not be liable for any direct, indirect, incidental, special, or
          consequential damages resulting from your use of or inability to use
          the Service, including but not limited to financial losses,
          investment decisions, or real estate transactions made based on
          Service outputs.
        </p>

        {/* ================================================================
            8 — Changes
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          8. Changes to These Terms
        </h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          We may update these Terms from time to time. The most current version
          will always be available at this URL. Continued use of the Service
          after changes constitutes acceptance of the updated Terms.
        </p>

        {/* ================================================================
            Contact
            ================================================================ */}
        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          9. Contact
        </h2>
        <p className="text-zinc-600 leading-relaxed">
          Questions about these Terms? Open an issue on{" "}
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
