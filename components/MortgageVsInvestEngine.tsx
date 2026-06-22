"use client";

import { useState, useMemo } from "react";
import { PiggyBank, TrendingUp, Shield, Info, DollarSign, Clock } from "lucide-react";
import SaveResultButton from "@/components/SaveResultButton";
import { useAutoSave } from "@/hooks/useAutoSave";

/* ------------------------------------------------------------------ */
/*  Mortgage math helpers                                             */
/* ------------------------------------------------------------------ */

function monthlyPMT(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function totalInterest(principal: number, annualRate: number, years: number): number {
  const monthly = monthlyPMT(principal, annualRate, years);
  return monthly * years * 12 - principal;
}

function remainingBalanceAfterExtra(
  principal: number, annualRate: number, years: number,
  extraMonthly: number
): { newMonths: number; totalInterest: number; interestSaved: number } {
  const r = annualRate / 100 / 12;
  const originalMonths = years * 12;
  const originalInterest = totalInterest(principal, annualRate, years);

  // Simulate month by month
  let balance = principal;
  let months = 0;
  let totalPaid = 0;
  const basePayment = monthlyPMT(principal, annualRate, years);
  const totalPayment = basePayment + extraMonthly;

  while (balance > 0 && months < originalMonths) {
    const interest = balance * r;
    const principalPayment = Math.min(totalPayment - interest, balance);
    balance -= principalPayment;
    totalPaid += totalPayment;
    months++;
  }

  const actualInterest = totalPaid - principal;
  return {
    newMonths: months,
    totalInterest: actualInterest,
    interestSaved: originalInterest - actualInterest,
  };
}

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface InvestResult {
  /** Positive = paying down wins, negative = investing wins */
  netDiff: number;
  absDiff: number;
  winner: "paydown" | "invest";
  winnerLabel: string;
  paydownReturn: number;
  investReturn: number;
  interestSaved: number;
  investGain: number;
  investFinalValue: number;
  newPayoffMonths: number | null;
  summary: string;
}

/* ------------------------------------------------------------------ */
/*  Analysis                                                          */
/* ------------------------------------------------------------------ */

function analyze(params: {
  balance: number;
  rate: number;
  remainingYears: number;
  lumpSum: number;
  expectedReturn: number;
  extraMonthly: number;
}): InvestResult {
  const { balance, rate, remainingYears, lumpSum, expectedReturn, extraMonthly } = params;

  // --- PAY DOWN MORTGAGE ---
  // Lump sum reduces principal
  const newBalance = Math.max(0, balance - lumpSum);

  // Interest saved from lump sum paydown on remaining term
  const originalInterest = totalInterest(balance, rate, remainingYears);
  const newInterest = totalInterest(newBalance, rate, remainingYears);
  let lumpSumInterestSaved = originalInterest - newInterest;

  // Monthly extra payment effect
  let extraInterestSaved = 0;
  let newPayoffMonths: number | null = null;
  if (extraMonthly > 0 && newBalance > 0) {
    const extraResult = remainingBalanceAfterExtra(newBalance, rate, remainingYears, extraMonthly);
    extraInterestSaved = lumpSumInterestSaved > 0
      ? newInterest - extraResult.totalInterest
      : originalInterest - extraResult.totalInterest;
    lumpSumInterestSaved = lumpSumInterestSaved > 0
      ? newInterest - extraResult.totalInterest
      : originalInterest - extraResult.totalInterest;
    newPayoffMonths = extraResult.newMonths;
  }

  const totalInterestSaved = lumpSumInterestSaved + extraInterestSaved;

  // Guaranteed return = total interest saved
  const paydownReturn = totalInterestSaved;

  // --- INVEST ---
  // Lump sum grows at expected return
  const investFinalValue = lumpSum * Math.pow(1 + expectedReturn / 100, remainingYears);

  // Extra monthly invested (future value of annuity)
  let monthlyInvestFinal = 0;
  let totalMonthlyInvested = 0;
  if (extraMonthly > 0) {
    const mr = expectedReturn / 100 / 12;
    const n = remainingYears * 12;
    totalMonthlyInvested = extraMonthly * n;
    if (mr === 0) {
      monthlyInvestFinal = totalMonthlyInvested;
    } else {
      monthlyInvestFinal = extraMonthly * ((Math.pow(1 + mr, n) - 1) / mr);
    }
  }

  const totalInvested = lumpSum + totalMonthlyInvested;
  const totalInvestFinal = investFinalValue + monthlyInvestFinal;
  const investGain = totalInvestFinal - totalInvested;

  // --- COMPARISON ---
  // Paydown return is guaranteed (interest saved)
  // Invest return is expected gain
  const netDiff = paydownReturn - investGain;
  const absDiff = Math.abs(netDiff);

  const winner = netDiff > 0 ? "paydown" : "invest";
  let winnerLabel: string;
  if (winner === "paydown") {
    winnerLabel = `Paying down saves ~$${Math.round(absDiff).toLocaleString()} more (guaranteed)`;
  } else {
    winnerLabel = `Investing could earn ~$${Math.round(absDiff).toLocaleString()} more (but not guaranteed)`;
  }

  // Summary
  let summary = "";
  if (rate >= expectedReturn + 2) {
    summary = `At ${rate}%, your mortgage rate is significantly higher than the expected ${expectedReturn}% investment return. Paying down the mortgage gives you a guaranteed, tax-free ${rate}% return — which beats the expected (and risky) ${expectedReturn}% from investing. Mathematically, this is a clear win for paying down the mortgage.`;
  } else if (rate >= expectedReturn) {
    summary = `Your mortgage rate (${rate}%) is close to your expected investment return (${expectedReturn}%). Paying down gives you a guaranteed ${rate}% return with zero risk. Investing might earn slightly more but comes with market risk. For most people, the guaranteed return wins — especially when you factor in the peace of mind of being debt-free sooner.`;
  } else if (expectedReturn - rate <= 2) {
    summary = `Investing at ${expectedReturn}% could outperform the ${rate}% guaranteed return from paying down your mortgage — but the gap is narrow (${(expectedReturn - rate).toFixed(1)}%). Consider your risk tolerance: the mortgage paydown is guaranteed; the investment return is not. If a market downturn would keep you up at night, the guaranteed return may be worth the small difference.`;
  } else {
    summary = `With an expected ${expectedReturn}% investment return vs your ${rate}% mortgage rate, the math favors investing. Over ${remainingYears} years, the compounding difference is substantial. However, this assumes you actually invest the money (not spend it) and that markets deliver average returns — neither is guaranteed.`;
  }

  return {
    netDiff, absDiff, winner, winnerLabel,
    paydownReturn, investReturn: investGain,
    interestSaved: totalInterestSaved,
    investGain,
    investFinalValue: totalInvestFinal,
    newPayoffMonths,
    summary,
  };
}

function fmtMoney(n: number): string {
  const abs = Math.round(Math.abs(n));
  if (abs >= 1_000_000) return `$${(abs / 1_000_000).toFixed(1)}M`;
  return `$${abs.toLocaleString()}`;
}

function fmtMonths(months: number | null): string {
  if (months === null) return "—";
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs === 0) return `${mos} months`;
  if (mos === 0) return `${yrs} years`;
  return `${yrs}y ${mos}m`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MortgageVsInvestEngine() {
  const [balance, setBalance] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [remainingYears, setRemainingYears] = useState(25);
  const [lumpSum, setLumpSum] = useState(30000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [extraMonthly, setExtraMonthly] = useState(0);

  const result = useMemo(() => analyze({
    balance, rate, remainingYears, lumpSum, expectedReturn, extraMonthly,
  }), [balance, rate, remainingYears, lumpSum, expectedReturn, extraMonthly]);

  useAutoSave(
    "mortgage-vs-invest",
    "Payoff vs Invest",
    result.winnerLabel,
    "/decision/mortgage-vs-invest",
    [result.winner, result.winnerLabel]
  );


  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 mb-5">
          <PiggyBank className="h-6 w-6 text-purple-600" />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Pay Off Your Mortgage or Invest the Cash?
        </h1>
        <p className="mt-3 text-base text-zinc-500 max-w-lg">
          Got extra cash? Compare the guaranteed return of paying down your
          mortgage against the expected return of investing it — with your
          exact numbers.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ============================================================ */}
        {/*  INPUT FORM                                                    */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Your Mortgage</p>

          <Field label="Remaining balance" value={balance} onChange={setBalance} prefix="$" step={10000} />

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Interest rate — <span className="text-zinc-400">{rate}%</span>
            </label>
            <input type="range" min={2} max={10} step={0.125} value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>2%</span><span>6%</span><span>10%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Remaining term — <span className="text-zinc-400">{remainingYears} years</span>
            </label>
            <input type="range" min={1} max={30} value={remainingYears}
              onChange={e => setRemainingYears(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>1 yr</span><span>15 yr</span><span>30 yr</span>
            </div>
          </div>

          <hr className="border-zinc-100" />
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Extra Cash</p>

          <Field label="Lump sum available" value={lumpSum} onChange={setLumpSum} prefix="$" step={5000} />
          <Field label="Extra per month (optional)" value={extraMonthly} onChange={setExtraMonthly} prefix="$" step={100} />

          <hr className="border-zinc-100" />
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Investment Assumption</p>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Expected annual return — <span className="text-zinc-400">{expectedReturn}%</span>
            </label>
            <input type="range" min={2} max={12} step={0.5} value={expectedReturn}
              onChange={e => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>2% (bonds)</span><span>7% (S&P avg)</span><span>12% (aggressive)</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  RESULTS                                                      */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {/* Winner Card */}
          <div className={`rounded-2xl border p-6 ${
            result.winner === "paydown"
              ? "bg-purple-50 border-purple-200"
              : "bg-emerald-50 border-emerald-200"
          }`}>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-2">
              Over {remainingYears} Years
            </p>
            <p className={`text-2xl font-bold ${
              result.winner === "paydown" ? "text-purple-700" : "text-emerald-700"
            }`}>
              {result.winner === "paydown" ? "Pay Down Mortgage" : "Invest the Cash"}
            </p>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              {result.winnerLabel}
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold text-zinc-400 mb-4">
              Side-by-Side Over {remainingYears} Years
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Pay Down Column */}
              <div className="rounded-xl border border-purple-100 bg-purple-50/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <p className="text-xs font-semibold text-purple-700">Pay Down</p>
                </div>
                <div className="space-y-2">
                  <Mini label="Interest saved" value={fmtMoney(result.interestSaved)} bold />
                  <Mini label="Guaranteed return" value={`${rate}%`} />
                  {result.newPayoffMonths && (
                    <Mini label="New payoff" value={fmtMonths(result.newPayoffMonths)} />
                  )}
                  <Mini label="Risk level" value="Zero risk" />
                </div>
              </div>

              {/* Invest Column */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <p className="text-xs font-semibold text-emerald-700">Invest</p>
                </div>
                <div className="space-y-2">
                  <Mini label="Expected gain" value={fmtMoney(result.investGain)} bold />
                  <Mini label="Final value" value={fmtMoney(result.investFinalValue)} />
                  <Mini label="Expected return" value={`${expectedReturn}%`} />
                  <Mini label="Risk level" value="Market risk" />
                </div>
              </div>
            </div>
          </div>

          {/* Key numbers */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric
              label="Guaranteed Savings"
              value={fmtMoney(result.paydownReturn)}
              icon={<Shield className="h-3.5 w-3.5" />}
              color="text-purple-600"
            />
            <Metric
              label="Expected Investment Gain"
              value={fmtMoney(result.investGain)}
              icon={<TrendingUp className="h-3.5 w-3.5" />}
              color="text-emerald-600"
            />
          </div>

          {/* Rate context pill */}
          <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-zinc-400 shrink-0" />
              <p className="text-xs font-semibold text-zinc-500">The Math at a Glance</p>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Paying down your {rate}% mortgage is equivalent to earning a{" "}
              <strong>guaranteed, tax-free {rate}% return</strong> on your
              money. To beat that by investing, you&apos;d need to earn{" "}
              <strong>more than {rate}% after taxes</strong> — which at{" "}
              {expectedReturn}% expected return is
              {expectedReturn > rate ? " possible but not guaranteed" : " unlikely"}.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SUMMARY                                                        */}
      {/* ============================================================ */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-2 flex items-center gap-2">
          <Info className="h-4 w-4 text-zinc-400" />
          What This Means
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{result.summary}</p>
      </div>
      {/* Footnote */}
      <p className="mt-6 text-xs text-zinc-400 text-center">
      <div className="flex items-center justify-center mt-6">
        <SaveResultButton
          engine="mortgage-vs-invest"
          label="Payoff vs Invest"
          outcome={result.winnerLabel}
          href="/decision/mortgage-vs-invest"
        />
      </div>
        All calculations run locally in your browser. Nothing is sent anywhere.
        Investment returns are not guaranteed — past performance does not
        predict future results. This is an educational tool, not financial
        advice.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Field({
  label, value, onChange, prefix, suffix, step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">{prefix}</span>
        )}
        <input type="number" value={value}
          onChange={e => onChange(Number(e.target.value) || 0)} step={step}
          className={`w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition ${prefix ? "pl-7" : ""} ${suffix ? "pr-7" : ""}`} />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className={`text-xs ${bold ? "font-semibold text-zinc-900" : "text-zinc-700"}`}>{value}</span>
    </div>
  );
}

function Metric({
  label, value, icon, color,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 px-3 py-2.5">
      <p className="text-xs text-zinc-400 flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className={`text-sm font-semibold mt-0.5 ${color ?? "text-zinc-900"}`}>{value}</p>
    </div>
  );
}
