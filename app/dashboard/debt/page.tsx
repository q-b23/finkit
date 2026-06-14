import { Metadata } from "next";
import { DebtPayoffPlanner } from "@/components/DebtPayoffPlanner";

export const metadata: Metadata = {
  title: "Debt Payoff Planner",
  description:
    "Compare snowball vs avalanche debt payoff strategies. See your exact debt-free date, total interest, and amortization schedule.",
};

/**
 * Debt Payoff Planner page — renders the DebtPayoffPlanner component.
 */
export default function DebtPlannerPage() {
  return <DebtPayoffPlanner />;
}
