/**
 * FIRE (Financial Independence, Retire Early) math utilities.
 */

/**
 * Calculate the FIRE number from annual expenses and withdrawal rate.
 * FIRE Number = Annual Expenses / (Withdrawal Rate / 100)
 *
 * @example fireNumber(40000, 4) → 1000000
 */
export function fireNumber(annualExpenses: number, withdrawalRatePct: number): number {
  if (withdrawalRatePct <= 0) return Infinity;
  return annualExpenses / (withdrawalRatePct / 100);
}

/**
 * Calculate how many years until FIRE given current savings,
 * monthly contributions, and expected annual return.
 *
 * Returns null if the inputs make FIRE impossible (e.g. zero return with zero contributions).
 * Returns 0 if already at or past the FIRE number.
 */
export function yearsToFire(
  currentSavings: number,
  monthlyContribution: number,
  annualReturnPct: number,
  targetFIRE: number
): number | null {
  if (targetFIRE <= 0) return null;
  if (currentSavings >= targetFIRE) return 0;

  const r = annualReturnPct / 100 / 12;

  if (r === 0 && monthlyContribution === 0) return null;
  if (r === 0) return Math.ceil((targetFIRE - currentSavings) / (monthlyContribution * 12));

  // Solve: FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r >= target
  // (1+r)^n >= (target * r + PMT) / (PV * r + PMT)
  const numerator = targetFIRE * r + monthlyContribution;
  const denominator = currentSavings * r + monthlyContribution;

  if (denominator <= 0) return null;

  const months = Math.log(numerator / denominator) / Math.log(1 + r);
  return Math.ceil(months / 12);
}

/**
 * Calculate the Coast FIRE number — how much you need invested today
 * for it to grow to your FIRE number by retirement age without further contributions.
 *
 * Coast = FIRE / (1 + r)^years
 */
export function coastFireNumber(
  targetFIRE: number,
  annualReturnPct: number,
  yearsUntilRetirement: number
): number {
  const r = annualReturnPct / 100;
  return targetFIRE / Math.pow(1 + r, yearsUntilRetirement);
}

/**
 * Compound a single lump sum forward n years.
 */
export function compound(
  principal: number,
  annualReturnPct: number,
  years: number
): number {
  const r = annualReturnPct / 100;
  return principal * Math.pow(1 + r, years);
}
