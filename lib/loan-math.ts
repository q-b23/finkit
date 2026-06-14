/**
 * Loan amortization math utilities.
 */

/**
 * Standard PMT (amortization) formula.
 * Returns the fixed monthly payment for a fully-amortizing loan.
 *
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 *
 * @param principal   Loan amount
 * @param apr         Annual Percentage Rate (e.g. 6.0 for 6%)
 * @param termYears   Loan term in years
 * @returns Monthly payment amount
 */
export function calcPMT(principal: number, apr: number, termYears: number): number {
  const monthlyRate = apr / 100 / 12;
  const n = termYears * 12;

  if (monthlyRate === 0 || n === 0) return principal / Math.max(n, 1);

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

/**
 * Result of a full loan calculation.
 */
export interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

/**
 * Calculate full loan results: monthly payment, total interest, total cost.
 */
export function computeLoanResult(
  principal: number,
  apr: number,
  termYears: number
): LoanResult {
  const monthly = calcPMT(principal, apr, termYears);
  const totalCost = monthly * termYears * 12;
  const totalInterest = totalCost - principal;

  return {
    monthlyPayment: Math.round(monthly * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
}

/**
 * Compare two loan results and return the winner label and savings.
 */
export function compareLoans(a: LoanResult, b: LoanResult): {
  interestWinner: "A" | "B";
  monthlyWinner: "A" | "B";
  interestSavings: number;
  monthlySavings: number;
} {
  const interestWinner = a.totalInterest < b.totalInterest ? "A" : "B";
  const monthlyWinner = a.monthlyPayment < b.monthlyPayment ? "A" : "B";

  return {
    interestWinner,
    monthlyWinner,
    interestSavings: Math.abs(a.totalInterest - b.totalInterest),
    monthlySavings: Math.abs(a.monthlyPayment - b.monthlyPayment),
  };
}
