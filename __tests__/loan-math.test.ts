/**
 * Unit tests for loan math utilities (PMT formula).
 *
 * Run with: npx vitest run
 */

import { describe, it, expect } from "vitest";
import { calcPMT, computeLoanResult, compareLoans } from "@/lib/loan-math";

describe("calcPMT", () => {
  it("calculates standard 30-year mortgage: $300K at 6% → ~$1,798.65/month", () => {
    const payment = calcPMT(300000, 6, 30);
    expect(payment).toBeCloseTo(1798.65, 0);
  });

  it("calculates 15-year mortgage at lower rate", () => {
    const payment = calcPMT(300000, 5, 15);
    expect(payment).toBeCloseTo(2372.38, 0);
  });

  it("zero-interest loan is just principal / months", () => {
    const payment = calcPMT(120000, 0, 10);
    expect(payment).toBe(1000); // $120,000 / 120 months
  });

  it("small car loan: $35K at 4.5% for 5 years", () => {
    const payment = calcPMT(35000, 4.5, 5);
    expect(payment).toBeCloseTo(652.53, 0);
  });

  it("handles edge case: zero principal", () => {
    const payment = calcPMT(0, 5, 30);
    expect(payment).toBe(0);
  });
});

describe("computeLoanResult", () => {
  it("returns full breakdown for $300K at 6% for 30 years", () => {
    const result = computeLoanResult(300000, 6, 30);

    expect(result.monthlyPayment).toBeCloseTo(1798.65, 0);
    // Total paid: $1,798.65 × 360 = ~$647,514
    expect(result.totalCost).toBeCloseTo(647514, -2);
    // Total interest: $647,514 - $300,000 = ~$347,514
    expect(result.totalInterest).toBeCloseTo(347514, -2);
  });

  it("zero-interest loan has zero total interest", () => {
    const result = computeLoanResult(100000, 0, 10);
    expect(result.totalInterest).toBe(0);
    expect(result.totalCost).toBe(100000);
  });
});

describe("compareLoans", () => {
  it("identifies the cheaper option correctly", () => {
    const optionA = computeLoanResult(300000, 6, 30);
    const optionB = computeLoanResult(300000, 5, 15);

    const comparison = compareLoans(optionA, optionB);

    // 15-yr has higher monthly but much less total interest
    expect(comparison.monthlyWinner).toBe("A"); // 30-yr has lower monthly
    expect(comparison.interestWinner).toBe("B"); // 15-yr has lower total interest
    expect(comparison.interestSavings).toBeGreaterThan(100000);
  });
});
