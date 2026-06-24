import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import MortgageDecisionEngine from "@/components/MortgageDecisionEngine";

import EmailCapture from "@/components/EmailCapture";
export const metadata: Metadata = {
  title: "Mortgage Stress Test — Will This Mortgage Create Financial Stress?",
  description:
    "Check if your mortgage will create unhealthy financial stress. Get your stress score, see the full cost breakdown, and compare down payment scenarios — free, private, no accounts.",
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
