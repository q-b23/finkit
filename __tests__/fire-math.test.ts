/**
 * Unit tests for FIRE math utilities.
 *
 * Run with: npx vitest run
 */

import { describe, it, expect } from "vitest";
import { fireNumber, yearsToFire, coastFireNumber, compound } from "@/lib/fire-math";

describe("fireNumber", () => {
  it("calculates the classic 4% rule: $40k expenses → $1,000,000", () => {
    expect(fireNumber(40000, 4)).toBe(1_000_000);
  });

  it("handles a 3.5% withdrawal rate", () => {
    const result = fireNumber(40000, 3.5);
    expect(result).toBeCloseTo(1_142_857.14, 0);
  });

  it("handles high expenses", () => {
    expect(fireNumber(100000, 4)).toBe(2_500_000);
  });

  it("returns Infinity for zero withdrawal rate", () => {
    expect(fireNumber(40000, 0)).toBe(Infinity);
  });

  it("returns zero for zero expenses", () => {
    expect(fireNumber(0, 4)).toBe(0);
  });
});

describe("yearsToFire", () => {
  it("returns 0 if already at FIRE number", () => {
    expect(yearsToFire(1_000_000, 0, 7, 1_000_000)).toBe(0);
  });

  it("returns 0 if savings exceed FIRE number", () => {
    expect(yearsToFire(1_500_000, 0, 7, 1_000_000)).toBe(0);
  });

  it("returns null when FIRE number is zero", () => {
    expect(yearsToFire(50000, 500, 7, 0)).toBeNull();
  });

  it("returns null when no return AND no contributions", () => {
    expect(yearsToFire(50000, 0, 0, 1_000_000)).toBeNull();
  });

  it("calculates years with contributions when return is zero", () => {
    // $1,000,000 target, $50,000 saved, $1,000/month = $12,000/year
    // Need $950,000 more at $12,000/year ≈ 79.17 years → ceil = 80
    const result = yearsToFire(50000, 1000, 0, 1_000_000);
    expect(result).toBe(80);
  });
});

describe("coastFireNumber", () => {
  it("calculates Coast FIRE with 7% return over 25 years", () => {
    const result = coastFireNumber(1_000_000, 7, 25);
    expect(result).toBeCloseTo(184249, -2);
  });
});

describe("compound", () => {
  it("doubles in ~10 years at 7% (Rule of 72)", () => {
    const result = compound(10000, 7, 10);
    expect(result).toBeCloseTo(19671, -1);
  });

  it("returns principal when years is 0", () => {
    expect(compound(5000, 10, 0)).toBe(5000);
  });
});
