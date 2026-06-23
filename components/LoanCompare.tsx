"use client";

import React, { useState, useMemo } from 'react';

interface LoanOption {
  id: number;
  name: string;
  amount: number;
  apr: number;
  termMonths: number;
}

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  interestRatio: number;
  score: number;
}

function calculateLoan(loan: LoanOption): LoanResult {
  const monthlyRate = loan.apr / 100 / 12;
  const n = loan.termMonths;

  if (monthlyRate === 0) {
    return {
      monthlyPayment: loan.amount / n,
      totalInterest: 0,
      totalPaid: loan.amount,
      interestRatio: 0,
      score: 100,
    };
  }

  const monthlyPayment =
    (loan.amount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);

  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - loan.amount;
  const interestRatio = (totalInterest / totalPaid) * 100;

  const score = 100 - interestRatio * 2;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    interestRatio: Math.round(interestRatio * 10) / 10,
    score: Math.round(Math.max(0, score) * 10) / 10,
  };
}

function formatCurrency(val: number): string {
  return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LoanCompare() {
  const [loans, setLoans] = useState<LoanOption[]>([
    { id: 1, name: 'Bank A (30-yr fixed)', amount: 350000, apr: 6.5, termMonths: 360 },
    { id: 2, name: 'Bank B (15-yr fixed)', amount: 350000, apr: 5.75, termMonths: 180 },
  ]);
  const [nextId, setNextId] = useState(3);

  const results = useMemo(() => loans.map(l => ({
    ...l,
    result: calculateLoan(l)
  })), [loans]);

  const bestIndex = useMemo(() => {
    let best = 0;
    results.forEach((r, i) => {
      if (r.result.score > results[best].result.score) best = i;
    });
    return best;
  }, [results]);

  function addLoan() {
    setLoans([...loans, { id: nextId, name: `Option ${nextId}`, amount: 200000, apr: 6.0, termMonths: 360 }]);
    setNextId(nextId + 1);
  }

  function updateLoan(id: number, field: keyof LoanOption, value: string) {
    setLoans(loans.map(l =>
      l.id === id ? { ...l, [field]: field === 'name' ? value : parseFloat(value) || 0 } : l
    ));
  }

  function removeLoan(id: number) {
    if (loans.length <= 2) return;
    setLoans(loans.filter(l => l.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9M18 7l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Compare Loan Offers
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm ml-13">
          Compare monthly payments, total interest, and total cost across multiple loan offers.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          {loans.map((loan, idx) => (
            <div key={loan.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Option {idx + 1}</span>
                {loans.length > 2 && (
                  <button
                    onClick={() => removeLoan(loan.id)}
                    className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">Name</label>
                  <input
                    type="text"
                    value={loan.name}
                    onChange={e => updateLoan(loan.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1.5">Loan amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
                    <input
                      type="number"
                      value={loan.amount || ''}
                      onChange={e => updateLoan(loan.id, 'amount', e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5">APR</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={loan.apr || ''}
                        onChange={e => updateLoan(loan.id, 'apr', e.target.value)}
                        className="w-full pr-7 pl-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5">Term</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={loan.termMonths || ''}
                        onChange={e => updateLoan(loan.id, 'termMonths', e.target.value)}
                        className="w-full pr-10 pl-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addLoan}
            className="w-full py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors font-medium"
          >
            + Add another offer
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {results.length >= 2 && (
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">🏆</span>
                <div>
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    {results[bestIndex].name} is the best overall option
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                    Monthly {formatCurrency(results[bestIndex].result.monthlyPayment)} · Total {formatCurrency(results[bestIndex].result.totalPaid)} · Score {results[bestIndex].result.score}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((loan, idx) => (
              <div
                key={loan.id}
                className={`relative bg-white dark:bg-zinc-900 border rounded-xl p-5 shadow-sm transition-all ${
                  idx === bestIndex
                    ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {idx === bestIndex && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Best
                  </span>
                )}
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 truncate">
                  {loan.name}
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                      Monthly Payment
                    </p>
                    <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                      {formatCurrency(loan.result.monthlyPayment)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                        Total Interest
                      </p>
                      <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
                        {formatCurrency(loan.result.totalInterest)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                        Total Cost
                      </p>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                        {formatCurrency(loan.result.totalPaid)}
                      </p>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Score</span>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">{loan.result.score}/100</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${loan.result.score}%`,
                          background: loan.result.score >= 80 ? 'linear-gradient(90deg, #10b981, #34d399)' :
                                      loan.result.score >= 50 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                                      'linear-gradient(90deg, #ef4444, #f87171)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Breakdown Chart Placeholder */}
          <div className="bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8">
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">Cost Breakdown Chart</p>
                <p className="text-xs text-zinc-400/60 mt-1">Visual principal vs interest comparison coming soon</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          {results.length >= 2 && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                Summary
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-1">Max monthly difference</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {formatCurrency(
                      Math.max(...results.map(r => r.result.monthlyPayment)) -
                      Math.min(...results.map(r => r.result.monthlyPayment))
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-1">Max total cost difference</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {formatCurrency(
                      Math.max(...results.map(r => r.result.totalPaid)) -
                      Math.min(...results.map(r => r.result.totalPaid))
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
