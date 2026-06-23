import { Metadata } from "next";
import LoanComparisonMatrix from "@/components/LoanComparisonMatrix";

export const metadata: Metadata = {
  title: "Loan Comparison Matrix",
  description:
    "Compare two loan offers side by side. See monthly payment, total interest, and find out which option saves you the most money.",
};

export default function LoanComparisonPage() {
  return <LoanComparisonMatrix />;
}
