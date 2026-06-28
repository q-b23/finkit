"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

interface EmailResultFormProps {
  /** Subject line for the email */
  subject: string;
  /** Plain-text body of the email */
  text: string;
}

export default function EmailResultForm({ subject, text }: EmailResultFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), subject, text }),
      });
      if (!res.ok) throw new Error("Delivery failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 mx-auto max-w-md rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 text-center">
        <Check className="mx-auto h-6 w-6 text-emerald-500 mb-3" />
        <p className="text-sm font-semibold text-emerald-800 mb-1">
          Results sent to {email}
        </p>
        <p className="text-xs text-emerald-700">
          Check your inbox. If you don&apos;t see it, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-auto max-w-md rounded-2xl border border-zinc-100 bg-white p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
          <Mail className="h-4 w-4 text-zinc-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-800">
            Want a copy of your results?
          </p>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            Receive a clean summary of this calculation in your inbox.
            Useful if you&apos;d like to compare multiple mortgage scenarios later.
          </p>
        </div>
      </div>

      {/* Privacy guarantees */}
      <ul className="mb-4 space-y-1">
        {[
          "No spam",
          "No marketing emails",
          "Your email is only used to deliver the results you requested.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
            <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>

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
          disabled={status === "sending" || !email.trim()}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending
            </>
          ) : (
            "Send My Results"
          )}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-3 text-xs text-red-500">
          Failed to send. Please try again or email us directly at support@getfinkit.com.
        </p>
      )}
    </div>
  );
}
