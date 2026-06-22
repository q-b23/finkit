import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MortgageVsInvestEngine from "@/components/MortgageVsInvestEngine";

import EmailCapture from "@/components/EmailCapture";
export const metadata: Metadata = {
  title: "Pay Off Mortgage or Invest? — Wealth Comparison Tool",
  description:
    "Calculate whether paying down your mortgage or investing the cash builds more wealth — risk-adjusted, with clear scenarios.",
};

export default function MortgageVsInvestDecisionPage() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors ml-4 mt-6 sm:ml-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>
      <MortgageVsInvestEngine />
      <EmailCapture />
    </>
  );
}
