"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

const DISMISSED_KEY = "finkit:email-capture-dismissed";

/**
 * Lightweight email capture component for the return-traffic system.
 *
 * Shown below decision engine results. Core message: "Rates change.
 * Should your decision?" — invites the user to leave an email so they
 * come back and recalculate when conditions shift.
 *
 * Privacy-aligned: email is the only identifier collected, optional,
 * and never shared. Matches the privacy policy exactly.
 */
export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(DISMISSED_KEY) === "1";
  });

  if (dismissed) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // In production, this would POST to a lightweight endpoint
    // (e.g. /api/subscribe) that adds to a mailing list.
    // For now, we capture the intent locally.
    setSubmitted(true);
  }

  function handleDismiss() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    }
    setDismissed(true);
  }

  if (submitted) {
    return (
      <div className="mt-12 mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 text-center">
        <Check className="mx-auto h-6 w-6 text-emerald-500 mb-3" />
        <p className="text-sm font-semibold text-emerald-800 mb-1">
          You&apos;re on the list
        </p>
        <p className="text-sm text-emerald-700">
          We&apos;ll let you know when rates shift enough to affect your
          decision. No spam — just the important stuff.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Rates change. Should your decision?
          </p>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            We&apos;ll let you know when mortgage rates or market conditions
            shift enough to make it worth re-checking your numbers. No spam,
            no sharing, unsubscribe anytime.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors active:scale-[0.98]"
        >
          Keep me updated
        </button>
      </form>

      <button
        onClick={handleDismiss}
        className="mt-3 text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
      >
        No thanks — I&apos;ll check back myself
      </button>
    </div>
  );
}
