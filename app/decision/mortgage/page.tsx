import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import MortgageDecisionEngine from "@/components/MortgageDecisionEngine";

import EmailCapture from "@/components/EmailCapture";
export const metadata: Metadata = {
  title: "Mortgage Affordability — Can You Safely Afford This House?",
  description:
    "Get your personal risk score. See exactly how much of your take-home pay goes to housing. Know where the line is between safe and house poor.",
};

export default function MortgageDecisionPage() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors ml-4 mt-6 sm:ml-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>
      <MortgageDecisionEngine />
      <EmailCapture />
    </>
  );
}
