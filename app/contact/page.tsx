import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Shield, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact FinKit",
  description:
    "Questions, privacy requests, or feedback about FinKit's home affordability tools. We respond within 48 hours.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
        Contact
      </h1>
      <p className="text-zinc-500 mb-8 max-w-lg">
        Questions, privacy requests, feedback, or just want to say hi. We read
        every message and respond within 48 hours.
      </p>

      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-50">
              <Mail className="h-5 w-5 text-zinc-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                Email
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Reach us at{" "}
                <a
                  href="mailto:hello@getfinkit.com"
                  className="text-zinc-900 underline underline-offset-2 hover:text-zinc-600 transition-colors"
                >
                  hello@getfinkit.com
                </a>
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                For privacy or data deletion requests, include &ldquo;Privacy
                Request&rdquo; in the subject line.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy note */}
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
              <Shield className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                Privacy Requests
              </h2>
              <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                FinKit does not store financial data. The only personal
                information we may hold is your email address if you subscribed.
                You can request permanent deletion at any time. We will confirm
                within 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Donation note */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <Coffee className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-amber-800">
                Support FinKit
              </h2>
              <p className="mt-1 text-sm text-amber-700 leading-relaxed">
                FinKit is free and always will be. If it helped you make a
                better housing decision, consider{" "}
                <a
                  href="https://ko-fi.com/finkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-medium hover:text-amber-900 transition-colors"
                >
                  supporting us on Ko-fi
                </a>
                {" "}or{" "}
                <a
                  href="https://buymeacoffee.com/finkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-medium hover:text-amber-900 transition-colors"
                >
                  buying us a coffee
                </a>
                . Every donation helps keep the tools free, private, and
                ad-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
