import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MarketTimingEngine from "@/components/MarketTimingEngine";

import EmailCapture from "@/components/EmailCapture";
export const metadata: Metadata = {
  title: "Is Now a Bad Time to Buy? — Market Timing Analysis",
  description:
    "Evaluate current interest rates, local market conditions, and your personal timeline to decide whether to buy now or wait.",
};

export default function TimingDecisionPage() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors ml-4 mt-6 sm:ml-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>
      <MarketTimingEngine />
      <EmailCapture />
    </>
  );
}
