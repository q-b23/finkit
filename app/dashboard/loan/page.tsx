import { Metadata } from "next";
import { LoanCompare } from "@/components/LoanCompare";

export const metadata: Metadata = {
  title: "Loan Compare",
  description:
    "Compare multiple loan offers side by side. Monthly payments, total interest, total cost, and a composite score to find the best deal.",
};

/**
 * Loan Compare page — renders the LoanCompare component.
 */
export default function LoanComparePage() {
  return <LoanCompare />;
}
