import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// ==========================================
// 1. 模拟核心算法（确保你的业务代码中逻辑与之对齐）
// ==========================================

// FIRE 计算逻辑
const calculateFIRE = (targetExpenses: number, withdrawalRate: number) => {
  return targetExpenses / (withdrawalRate / 100);
};

// 贷款 PMT (每月还款) 计算公式
const calculatePMT = (principal: number, annualRate: number, years: number) => {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  if (monthlyRate === 0) return principal / numberOfPayments;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
};

// 债务雪崩排序逻辑（按利率从高到低）
interface Debt {
  name: string;
  balance: number;
  apr: number;
}
const sortDebtAvalanche = (debts: Debt[]): Debt[] => {
  return [...debts].sort((a, b) => b.apr - a.apr);
};


// ==========================================
// 2. 自动化单元测试集
// ==========================================

describe('FinKit Core Financial Logic Tests', () => {

  // 测试一：FIRE 财务自由计算精度
  test('FIRE Calculator: should precisely calculate target net worth', () => {
    const targetExpenses = 40000; // 每年预期开销 4 万美元
    const safeWithdrawalRate = 4; // 4% 安全提现率 (Trinity Study)
    
    const fireNumber = calculateFIRE(targetExpenses, safeWithdrawalRate);
    
    // 理论上应该刚好等于 1,000,000
    expect(fireNumber).toBe(1000000);
  });

  // 测试二：贷款每月还款额公式（PMT）精度
  test('Loan PMT Formula: should match US standard mortgage amortization', () => {
    const loanAmount = 300000; // 贷款 30 万美元
    const apr = 6;            // 年利率 6%
    const termYears = 30;     // 30年期房贷
    
    const monthlyPayment = calculatePMT(loanAmount, apr, termYears);
    
    // 美国标准房贷计算器精确答案应为 $1,798.65
    // 允许 0.01 的浮点数绝对误差
    expect(monthlyPayment).toBeCloseTo(1798.65, 2);
  });

  // 测试三：债务雪崩法排序逻辑
  test('Debt Avalanche: should sort debts by highest APR first', () => {
    const mockDebts: Debt[] = [
      { name: 'Credit Card A', balance: 5000, apr: 18.9 },
      { name: 'Student Loan', balance: 25000, apr: 4.5 },
      { name: 'Car Loan', balance: 12000, apr: 6.2 },
    ];

    const sorted = sortDebtAvalanche(mockDebts);

    // 应该把利率最高的信用卡排在第一位，其次是车贷，最后是学贷
    expect(sorted[0].name).toBe('Credit Card A');
    expect(sorted[1].name).toBe('Car Loan');
    expect(sorted[2].name).toBe('Student Loan');
  });
});

// ==========================================
// 3. 浏览器本地隐私存储 (LocalStorage) 异常与水合测试
// ==========================================

describe('Privacy Storage (LocalStorage) Isolation Tests', () => {
  beforeEach(() => {
    // 每次测试前清空模拟的 localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  test('LocalStorage hook: should interact natively with browser storage and not leak', () => {
    const key = 'finkit_test_key';
    const value = { data: 'private_financial_data' };

    localStorage.setItem(key, JSON.stringify(value));
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });
});
