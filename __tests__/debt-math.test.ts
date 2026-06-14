/**
 * Unit tests for debt payoff math.
 *
 * Run with: npx vitest run
 */

import { describe, it, expect } from "vitest";
import { sortDebts, simulatePayoff, DebtEntry } from "@/lib/debt-math";

const SAMPLE_DEBTS: DebtEntry[] = [
  { id: "1", name: "Credit Card", balance: 5000, apr: 24, minPayment: 150 },
  { id: "2", name: "Auto Loan", balance: 15000, apr: 7, minPayment: 350 },
  { id: "3", name: "Student Loan", balance: 20000, apr: 5, minPayment: 220 },
];

describe("sortDebts", () => {
  it("snowball: sorts by smallest balance first", () => {
    const sorted = sortDebts(SAMPLE_DEBTS, "snowball");
    expect(sorted[0].name).toBe("Credit Card");   // $5,000
    expect(sorted[1].name).toBe("Auto Loan");     // $15,000
    expect(sorted[2].name).toBe("Student Loan");  // $20,000
  });

  it("avalanche: sorts by highest APR first", () => {
    const sorted = sortDebts(SAMPLE_DEBTS, "avalanche");
    expect(sorted[0].name).toBe("Credit Card");   // 24%
    expect(sorted[1].name).toBe("Auto Loan");     // 7%
    expect(sorted[2].name).toBe("Student Loan");  // 5%
  });

  it("does not mutate the original array", () => {
    const original = [...SAMPLE_DEBTS];
    sortDebts(SAMPLE_DEBTS, "avalanche");
    expect(SAMPLE_DEBTS[0].name).toBe(original[0].name);
  });
});

describe("simulatePayoff", () => {
  it("returns empty result for empty debt list", () => {
    const result = simulatePayoff([], "avalanche", 200);
    expect(result.steps).toHaveLength(0);
    expect(result.totalMonths).toBe(0);
    expect(result.totalPrincipal).toBe(0);
  });

  it("returns steps for each debt", () => {
    const result = simulatePayoff(SAMPLE_DEBTS, "avalanche", 200);
    expect(result.steps).toHaveLength(3);
  });

  it("avalanche pays off highest APR first", () => {
    const result = simulatePayoff(SAMPLE_DEBTS, "avalanche", 200);
    const firstPaidOff = result.steps[0];
    expect(firstPaidOff.name).toBe("Credit Card"); // 24% APR
  });

  it("snowball pays off smallest balance first", () => {
    const result = simulatePayoff(SAMPLE_DEBTS, "snowball", 200);
    const firstPaidOff = result.steps[0];
    expect(firstPaidOff.name).toBe("Credit Card"); // $5,000
  });

  it("totalPaid = totalPrincipal + totalInterest", () => {
    const result = simulatePayoff(SAMPLE_DEBTS, "avalanche", 200);
    expect(result.totalPaid).toBeCloseTo(
      result.totalPrincipal + result.totalInterest,
      0
    );
  });

  it("extra payments reduce total months", () => {
    const noExtra = simulatePayoff(SAMPLE_DEBTS, "avalanche", 0);
    const withExtra = simulatePayoff(SAMPLE_DEBTS, "avalanche", 500);
    expect(withExtra.totalMonths).toBeLessThan(noExtra.totalMonths);
  });
});
