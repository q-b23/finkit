/**
 * Debt payoff strategy math.
 */

/**
 * A single debt entry for payoff calculations.
 */
export interface DebtEntry {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export type PayoffStrategy = "snowball" | "avalanche";

/**
 * Information about a single debt's payoff within the overall plan.
 */
export interface DebtPayoffStep {
  order: number;
  name: string;
  initialBalance: number;
  apr: number;
  monthsToPayoff: number;
  estimatedInterest: number;
}

/**
 * Full payoff simulation result.
 */
export interface PayoffResult {
  steps: DebtPayoffStep[];
  totalMonths: number;
  totalInterest: number;
  totalPrincipal: number;
  totalPaid: number;
}

/**
 * Sort debts according to the chosen strategy.
 * - snowball: smallest balance first
 * - avalanche: highest APR first
 */
export function sortDebts(
  debts: DebtEntry[],
  strategy: PayoffStrategy
): DebtEntry[] {
  return [...debts].sort((a, b) => {
    if (strategy === "snowball") return a.balance - b.balance;
    return b.apr - a.apr;
  });
}

/**
 * Simulate paying off a list of debts month-by-month.
 *
 * Each month:
 * 1. Interest accrues on each debt.
 * 2. Minimum payments are made.
 * 3. Extra payment goes to the first debt (in strategy order) that still has a balance.
 *
 * Caps at 600 months (50 years) to prevent infinite loops.
 */
export function simulatePayoff(
  debts: DebtEntry[],
  strategy: PayoffStrategy,
  extraMonthly: number
): PayoffResult {
  if (debts.length === 0) {
    return {
      steps: [],
      totalMonths: 0,
      totalInterest: 0,
      totalPrincipal: 0,
      totalPaid: 0,
    };
  }

  // Deep-clone into mutable working list
  const working = debts.map((d) => ({
    id: d.id,
    name: d.name,
    balance: d.balance,
    apr: d.apr,
    minPayment: d.minPayment,
  }));

  const totalPrincipal = debts.reduce((sum, d) => sum + d.balance, 0);
  const payoffSteps: DebtPayoffStep[] = [];
  let month = 0;
  let totalInterest = 0;
  const paidOff = new Set<string>();

  const sortFn =
    strategy === "snowball"
      ? (a: typeof working[number], b: typeof working[number]) => a.balance - b.balance
      : (a: typeof working[number], b: typeof working[number]) => b.apr - a.apr;

  while (working.length > 0 && month < 600) {
    month++;

    // Apply interest + minimum payments
    for (const d of working) {
      const monthlyRate = d.apr / 100 / 12;
      const interest = d.balance * monthlyRate;
      totalInterest += interest;
      d.balance += interest;
      const payment = Math.min(d.minPayment, d.balance);
      d.balance -= payment;
    }

    // Apply extra to first debt in strategy order
    if (extraMonthly > 0 && working.length > 0) {
      const sorted = [...working].sort(sortFn);
      for (const d of sorted) {
        if (d.balance <= 0.01) continue;
        d.balance -= Math.min(extraMonthly, d.balance);
        break;
      }
    }

    // Record newly paid-off debts
    for (const d of [...working]) {
      if (d.balance <= 0.01 && !paidOff.has(d.id)) {
        paidOff.add(d.id);
        const original = debts.find((o) => o.id === d.id)!;
        const share = totalPrincipal > 0 ? original.balance / totalPrincipal : 0;
        payoffSteps.push({
          order: payoffSteps.length + 1,
          name: d.name,
          initialBalance: original.balance,
          apr: d.apr,
          monthsToPayoff: month,
          estimatedInterest: Math.round(totalInterest * share * 100) / 100,
        });
      }
    }

    // Remove paid-off debts
    for (let i = working.length - 1; i >= 0; i--) {
      if (working[i].balance <= 0.01) working.splice(i, 1);
    }
  }

  return {
    steps: payoffSteps,
    totalMonths: month,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPrincipal,
    totalPaid: Math.round((totalPrincipal + totalInterest) * 100) / 100,
  };
}
