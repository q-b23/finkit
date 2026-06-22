"use client";

import { useState, useMemo } from "react";
import { Clock, TrendingUp, TrendingDown, Info, Calendar, DollarSign, Percent } from "lucide-react";
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

function remainingBalance(principal: number, annualRate: number, totalMonths: number, paymentsMade: number): number {
  if (paymentsMade >= totalMonths) return 0;
  const r = annualRate / 100 / 12;
  return principal * (Math.pow(1 + r, totalMonths) - Math.pow(1 + r, paymentsMade)) /
    (Math.pow(1 + r, totalMonths) - 1);
}

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface TimingResult {
  /** Positive = buy now wins, negative = wait wins */
  netDiff: number;
  absDiff: number;
  winner: "now" | "wait";
  winnerLabel: string;
  nowMonthly: number;
  waitMonthly: number;
  nowTotalCost: number;
  waitTotalCost: number;
  nowEquity5yr: number;
  waitEquity5yr: number;
  rentPaidWaiting: number;
  extraDownSaved: number;
  rateChangeDirection: string;
  summary: string;
}

/* ------------------------------------------------------------------ */
/*  Analysis (pure function)                                          */
/* ------------------------------------------------------------------ */

function timingAnalysis(params: {
  homePrice: number;
  downPct: number;
  currentRate: number;
  futureRate: number;
  appreciation: number;
  waitMonths: number;
  monthlyRent: number;
  monthlySavings: number;
  horizonYears: number;
}): TimingResult {
  const { homePrice, downPct, currentRate, futureRate, appreciation, waitMonths, monthlyRent, monthlySavings, horizonYears } = params;
  const waitYears = waitMonths / 12;

  // --- BUY NOW ---
  const downNow = homePrice * (downPct / 100);
  const loanNow = homePrice - downNow;
  const nowMonthly = monthlyPMT(loanNow, currentRate, 30);
  const totalPaymentsNow = nowMonthly * horizonYears * 12;
  const remainingNow = remainingBalance(loanNow, currentRate, 360, horizonYears * 12);
  const futurePriceNow = homePrice * Math.pow(1 + appreciation / 100, horizonYears);
  const nowEquity5yr = futurePriceNow - remainingNow;
  const nowTotalCost = downNow + totalPaymentsNow - nowEquity5yr;

  // --- WAIT THEN BUY ---
  const futurePrice = homePrice * Math.pow(1 + appreciation / 100, waitYears);
  const rentPaidWaiting = monthlyRent * waitMonths;
  const extraDownSaved = monthlySavings * waitMonths;
  const downLater = futurePrice * (downPct / 100) + extraDownSaved;
  const loanLater = Math.max(0, futurePrice - downLater);
  const waitMonthly = monthlyPMT(loanLater, futureRate, 30);

  const remainingMonthsAfterWait = Math.max(0, horizonYears * 12 - waitMonths);
  const totalPaymentsWait = waitMonthly * remainingMonthsAfterWait;
  const purchaseRemaining = remainingBalance(loanLater, futureRate, 360, remainingMonthsAfterWait);
  const priceAtHorizon = futurePrice * Math.pow(1 + appreciation / 100, horizonYears - waitYears);
  const waitEquity5yr = priceAtHorizon - purchaseRemaining;
  const waitTotalCost = downLater + totalPaymentsWait + rentPaidWaiting - waitEquity5yr;

  // --- COMPARISON ---
  const netDiff = waitTotalCost - nowTotalCost;
  const absDiff = Math.abs(netDiff);

  const winner = netDiff > 0 ? "now" : "wait";
  const winnerLabel = netDiff > 0
    ? `Buying now saves you ~$${Math.round(absDiff).toLocaleString()} over ${horizonYears} years`
    : `Waiting saves you ~$${Math.round(absDiff).toLocaleString()} over ${horizonYears} years`;

  const rateChangeDirection = futureRate > currentRate ? "higher" :
    futureRate < currentRate ? "lower" : "unchanged";

  // Summary
  let summary = "";
  if (winner === "now") {
    summary = `Buying now at ${currentRate}% locks in today's price and rate. Even if rates drop to ${futureRate}%, the price appreciation of ~${appreciation}%/yr during your ${waitMonths}-month wait would cost more than you'd save on interest — especially after factoring in $${Math.round(rentPaidWaiting).toLocaleString()} in rent.`;
  } else {
    summary = `Waiting ${waitMonths} months to buy could save you money. The combination of a ${futureRate < currentRate ? "lower" : futureRate > currentRate ? "higher" : "similar"} rate (${futureRate}%) and the extra $${Math.round(extraDownSaved).toLocaleString()} you'd save toward the down payment outweighs the rent and price appreciation during the wait.`;
  }

  return {
    netDiff, absDiff, winner, winnerLabel,
    nowMonthly, waitMonthly,
    nowTotalCost, waitTotalCost,
    nowEquity5yr, waitEquity5yr,
    rentPaidWaiting, extraDownSaved,
    rateChangeDirection,
    summary,
  };
}

function fmtMoney(n: number): string {
  const abs = Math.round(Math.abs(n));
  if (abs >= 1_000_000) return `$${(abs / 1_000_000).toFixed(1)}M`;
  return `$${abs.toLocaleString()}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MarketTimingEngine() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPct, setDownPct] = useState(10);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [futureRate, setFutureRate] = useState(5.5);
  const [appreciation, setAppreciation] = useState(3);
  const [waitMonths, setWaitMonths] = useState(12);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [monthlySavings, setMonthlySavings] = useState(800);
  const [horizonYears, setHorizonYears] = useState(5);

  const result = useMemo(() => timingAnalysis({
    homePrice, downPct, currentRate, futureRate,
    appreciation, waitMonths, monthlyRent, monthlySavings, horizonYears,
  }), [homePrice, downPct, currentRate, futureRate,

      appreciation, waitMonths, monthlyRent, monthlySavings, horizonYears]);

  useAutoSave(
    "timing",
    "Market Timing",
    result.winnerLabel,
    "/decision/timing",
    [result.winner, result.winnerLabel]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 mb-5">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Is Now a Bad Time to Buy?
        </h1>
        <p className="mt-3 text-base text-zinc-500 max-w-lg">
          Model two scenarios — buy now vs wait — and see which one leaves you
          better off after factoring in rates, prices, rent, and savings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ============================================================ */}
        {/*  INPUT FORM                                                    */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">The Market</p>

          <Field label="Home price" value={homePrice} onChange={setHomePrice} prefix="$" step={10000} />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Rate now" value={currentRate} onChange={setCurrentRate} suffix="%" step={0.125} />
            <Field label="Rate if you wait" value={futureRate} onChange={setFutureRate} suffix="%" step={0.125} />
          </div>

          <Field label="Annual price appreciation" value={appreciation} onChange={setAppreciation} suffix="%" step={0.5} />

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Down payment — <span className="text-zinc-400">{downPct}%</span>
            </label>
            <input type="range" min={3} max={50} value={downPct}
              onChange={e => setDownPct(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>3%</span><span>20%</span><span>50%</span>
            </div>
          </div>

          <hr className="border-zinc-100" />
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Your Timeline</p>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              How long would you wait? — <span className="text-zinc-400">{waitMonths} months</span>
            </label>
            <input type="range" min={3} max={36} step={3} value={waitMonths}
              onChange={e => setWaitMonths(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>3 mo</span><span>12 mo</span><span>24 mo</span><span>36 mo</span>
            </div>
          </div>

          <Field label="Monthly rent while waiting" value={monthlyRent} onChange={setMonthlyRent} prefix="$" step={50} />
          <Field label="Extra you save/month while waiting" value={monthlySavings} onChange={setMonthlySavings} prefix="$" step={50} />

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Comparison horizon — <span className="text-zinc-400">{horizonYears} years</span>
            </label>
            <input type="range" min={2} max={15} value={horizonYears}
              onChange={e => setHorizonYears(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>2 yr</span><span>5 yr</span><span>10 yr</span><span>15 yr</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  RESULTS                                                      */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {/* Winner Card */}
          <div className={`rounded-2xl border p-6 ${
            result.winner === "now"
              ? "bg-emerald-50 border-emerald-200"
              : "bg-blue-50 border-blue-200"
          }`}>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-2">
              {horizonYears}-Year Outcome
            </p>
            <p className={`text-2xl font-bold ${
              result.winner === "now" ? "text-emerald-700" : "text-blue-700"
            }`}>
              {result.winner === "now" ? "Buy Now" : "Wait"}
            </p>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              {result.winnerLabel}
            </p>
          </div>

          {/* Rate Direction Indicator */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-4">
              {result.rateChangeDirection === "lower" ? (
                <TrendingDown className="h-5 w-5 text-emerald-500" />
              ) : result.rateChangeDirection === "higher" ? (
                <TrendingUp className="h-5 w-5 text-red-500" />
              ) : (
                <Info className="h-5 w-5 text-zinc-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  Rate Assumption: {result.rateChangeDirection === "lower" ? "Rates drop" : result.rateChangeDirection === "higher" ? "Rates rise" : "Rates unchanged"}
                </p>
                <p className="text-xs text-zinc-500">
                  {currentRate}% → {futureRate}% after {waitMonths} months
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-side comparison */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold text-zinc-400 mb-4">
              Scenario Comparison
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Buy Now Column */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <p className="text-xs font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Buy Now
                </p>
                <div className="space-y-2">
                  <Mini label="Monthly payment" value={`$${Math.round(result.nowMonthly).toLocaleString()}`} />
                  <Mini label="Equity at {horizonYears}yr" value={fmtMoney(result.nowEquity5yr)} />
                  <Mini label="Total cost" value={fmtMoney(result.nowTotalCost)} bold />
                </div>
              </div>

              {/* Wait Column */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                <p className="text-xs font-semibold text-blue-700 mb-3 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Wait {waitMonths}mo
                </p>
                <div className="space-y-2">
                  <Mini label="Monthly payment" value={`$${Math.round(result.waitMonthly).toLocaleString()}`} />
                  <Mini label="Equity at {horizonYears}yr" value={fmtMoney(result.waitEquity5yr)} />
                  <Mini label="Total cost" value={fmtMoney(result.waitTotalCost)} bold />
                </div>
              </div>
            </div>
          </div>

          {/* Wait Period Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric
              label="Rent Paid Waiting"
              value={`$${Math.round(result.rentPaidWaiting).toLocaleString()}`}
              icon={<DollarSign className="h-3.5 w-3.5" />}
            />
            <Metric
              label="Extra Down Payment"
              value={`$${Math.round(result.extraDownSaved).toLocaleString()}`}
              icon={<TrendingUp className="h-3.5 w-3.5" />}
            />
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
          engine="timing"
          label="Market Timing"
          outcome={result.winnerLabel}
          href="/decision/timing"
        />
      </div>
        All calculations run locally in your browser. Nothing is sent anywhere.
        Rate and price projections are assumptions — actual markets vary. This
        is an educational tool, not financial advice.
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
  label, value, icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-100 px-3 py-2.5">
      <p className="text-xs text-zinc-400 flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="text-sm font-semibold text-zinc-900 mt-0.5">{value}</p>
    </div>
  );
}
