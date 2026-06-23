/**
 * Unit tests for the MortgageDecisionEngine analyze function.
 *
 * Tests the core risk-scoring math directly without JSX rendering.
 */

import { describe, it, expect } from "vitest";
import { analyze } from "@/components/MortgageDecisionEngine";

describe("analyze (MortgageDecisionEngine core math)", () => {
  const defaultParams = {
    grossIncome: 120000,
    takeHome: 7600,
    homePrice: 450000,
    downPct: 10,
    rate: 6.5,
    monthlyDebts: 0,
    taxRate: 1.1,
    insurance: 150,
  };

  it("returns a risk score between 0 and 100", () => {
    const result = analyze(defaultParams);
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
    expect(result.riskScore).toBeLessThanOrEqual(100);
  });

  it("computes monthly principal and interest", () => {
    const result = analyze(defaultParams);
    expect(result.monthlyPI).toBeGreaterThan(0);
  });

  it("computes DTI ratio as a percentage", () => {
    const result = analyze(defaultParams);
    expect(result.dti).toBeGreaterThanOrEqual(0);
  });

  it("returns a recommendation label", () => {
    const result = analyze(defaultParams);
    expect(["SAFE", "CAUTIOUS", "RISKY", "DANGER"]).toContain(
      result.recommendation
    );
  });

  it("gives SAFE recommendation for low home price with high income", () => {
    const result = analyze({
      ...defaultParams,
      homePrice: 150000,
      grossIncome: 250000,
      takeHome: 14000,
    });
    expect(result.recommendation).toBe("SAFE");
    expect(result.riskScore).toBeLessThanOrEqual(25);
  });

  it("gives RISKY or DANGER for expensive house with low income", () => {
    const result = analyze({
      ...defaultParams,
      homePrice: 900000,
      grossIncome: 55000,
      takeHome: 3600,
    });
    expect(["RISKY", "AVOID"]).toContain(result.recommendation);
    expect(result.riskScore).toBeGreaterThanOrEqual(50);
  });

  it("higher down payment reduces risk score", () => {
    const lowDown = analyze({ ...defaultParams, downPct: 5 });
    const highDown = analyze({ ...defaultParams, downPct: 30 });
    expect(highDown.riskScore).toBeLessThanOrEqual(lowDown.riskScore);
  });

  it("higher interest rate increases risk score", () => {
    const lowRate = analyze({ ...defaultParams, rate: 3 });
    const highRate = analyze({ ...defaultParams, rate: 8 });
    expect(highRate.riskScore).toBeGreaterThanOrEqual(lowRate.riskScore);
  });

  it("zero-interest loan still produces valid result", () => {
    const result = analyze({ ...defaultParams, rate: 0 });
    expect(result.monthlyPI).toBeGreaterThan(0);
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
  });
});
