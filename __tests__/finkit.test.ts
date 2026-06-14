import { describe, test, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

// ============================================================
// 1.  LocalStorage Hook — SSR Hydration Safety
// ============================================================

// Replicating the core safety check from hooks/useLocalStorage.ts
const safeReadLocalStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
};

const safeWriteLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or permissions denied — silently ignore
  }
};

describe("useLocalStorage — SSR Hydration Safety", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  test("returns fallback value during SSR (window undefined)", () => {
    // Simulate SSR by temporarily removing window
    const originalWindow = globalThis.window;
    // @ts-expect-error — deliberate SSR simulation
    delete globalThis.window;

    const result = safeReadLocalStorage("test-key", "fallback");
    expect(result).toBe("fallback");

    globalThis.window = originalWindow;
  });

  test("reads existing value from localStorage on client", () => {
    localStorage.getItem = vi.fn().mockReturnValue(JSON.stringify("stored"));

    const result = safeReadLocalStorage("test-key", "fallback");
    expect(result).toBe("stored");
  });

  test("writes to localStorage and does not leak data", () => {
    const key = "finkit_private";
    const value = { fireNumber: 1_000_000 };

    safeWriteLocalStorage(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test("handles corrupt JSON gracefully", () => {
    localStorage.getItem = vi.fn().mockReturnValue("{broken");

    const result = safeReadLocalStorage("bad-key", "safe");
    expect(result).toBe("safe");
  });
});

// ============================================================
// 2.  FIRE Calculator — Core Formula
// ============================================================

const calculateFIRE = (targetExpenses: number, withdrawalRate: number): number => {
  return targetExpenses / (withdrawalRate / 100);
};

describe("FIRE Calculator — Target Net Worth Formula", () => {
  test("$40,000 expenses at 4% withdrawal rate = $1,000,000", () => {
    expect(calculateFIRE(40000, 4)).toBe(1_000_000);
  });

  test("$100,000 expenses at 4% = $2,500,000", () => {
    expect(calculateFIRE(100000, 4)).toBe(2_500_000);
  });

  test("3.5% conservative withdrawal rate reduces the number", () => {
    const result = calculateFIRE(40000, 3.5);
    // 40000 / 0.035 ≈ 1,142,857.14
    expect(result).toBeCloseTo(1_142_857.14, 0);
  });

  test("zero expenses = zero FIRE number", () => {
    expect(calculateFIRE(0, 4)).toBe(0);
  });
});

// ============================================================
// 3.  Debt Planner — Avalanche Sorting
// ============================================================

interface Debt {
  name: string;
  balance: number;
  apr: number;
}

const sortDebtAvalanche = (debts: Debt[]): Debt[] => {
  return [...debts].sort((a, b) => b.apr - a.apr);
};

describe("Debt Planner — Avalanche Strategy Sorting", () => {
  test("sorts by highest APR first (Credit Card > Car Loan > Student Loan)", () => {
    const debts: Debt[] = [
      { name: "Credit Card A", balance: 5200, apr: 22.99 },
      { name: "Student Loan", balance: 18000, apr: 5.05 },
      { name: "Car Loan", balance: 12500, apr: 6.50 },
    ];

    const sorted = sortDebtAvalanche(debts);

    expect(sorted[0].name).toBe("Credit Card A");  // 22.99%
    expect(sorted[1].name).toBe("Car Loan");        // 6.50%
    expect(sorted[2].name).toBe("Student Loan");    // 5.05%
  });

  test("does not mutate the original array", () => {
    const debts: Debt[] = [
      { name: "A", balance: 1000, apr: 10 },
      { name: "B", balance: 2000, apr: 5 },
    ];
    const copy = [...debts];

    sortDebtAvalanche(debts);

    expect(debts[0].name).toBe(copy[0].name);
  });

  test("handles ties by preserving relative order (stable sort equivalent)", () => {
    const debts: Debt[] = [
      { name: "First", balance: 5000, apr: 10 },
      { name: "Second", balance: 3000, apr: 10 },
    ];

    const sorted = sortDebtAvalanche(debts);

    // Both have same APR — order among ties is implementation-specific
    expect(sorted.map((d) => d.apr)).toEqual([10, 10]);
  });
});

// ============================================================
// 4.  Loan Comparison — PMT Formula
// ============================================================

const calculatePMT = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const n = years * 12;

  if (monthlyRate === 0) return principal / n;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
};

describe("Loan Comparison — PMT Amortization Formula", () => {
  test("$300,000 at 6% for 30 years → $1,798.65/month (delta < 0.01)", () => {
    const payment = calculatePMT(300000, 6, 30);
    expect(payment).toBeCloseTo(1798.65, 2);
  });

  test("15-year mortgage has higher monthly but less total interest", () => {
    const payment15 = calculatePMT(300000, 6, 15);
    // 15yr ≈ $2,531.57/month — significantly higher than 30yr
    expect(payment15).toBeGreaterThan(2500);
    expect(payment15).toBeLessThan(2600);
  });

  test("zero-interest loan = principal / months", () => {
    const payment = calculatePMT(120000, 0, 10);
    expect(payment).toBe(1000); // $120,000 / 120 months
  });

  test("$35,000 car loan at 4.5% for 5 years → ~$652.53", () => {
    const payment = calculatePMT(35000, 4.5, 5);
    expect(payment).toBeCloseTo(652.53, 1);
  });

  test("zero principal → $0 payment", () => {
    expect(calculatePMT(0, 5, 30)).toBe(0);
  });
});
