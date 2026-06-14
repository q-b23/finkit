import { Metadata } from "next";
import { FIRECalculator } from "@/components/FIRECalculator";

export const metadata: Metadata = {
  title: "FIRE Calculator",
  description:
    "Project compound growth, find your FIRE number, and discover your Coast FIRE age. All calculations run locally — no data leaves your browser.",
};

/**
 * FIRE Calculator page — renders the FIRECalculator component directly.
 */
export default function FireCalculatorPage() {
  return <FIRECalculator />;
}
