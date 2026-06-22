import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RentVsBuyEngine from "@/components/RentVsBuyEngine";

import EmailCapture from "@/components/EmailCapture";
export const metadata: Metadata = {
  title: "Rent vs Buy — Compare the Real 5-Year Cost",
  description:
    "See exactly how renting compares to buying over your timeframe — factoring in taxes, maintenance, appreciation, and opportunity cost.",
};

export default function RentVsBuyDecisionPage() {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors ml-4 mt-6 sm:ml-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to FinKit
      </Link>
      <RentVsBuyEngine />
      <EmailCapture />
    </>
  );
}
