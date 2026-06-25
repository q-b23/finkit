"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle, Info, TrendingDown, TrendingUp } from "lucide-react";
import SaveResultButton from "@/components/SaveResultButton";
import { KoFiSupportPrompt } from "@/components/KoFiSupport";
import { useAutoSave } from "@/hooks/useAutoSave";
import { calcPMT } from "@/lib/loan-math";

/* ------------------------------------------------------------------ */
/*  Mortgage math (local only)                                        */
/* ------------------------------------------------------------------ */


interface DecisionResult {
  /** 0-100 risk score */
  riskScore: number;
  /** SAFE | CAUTIOUS | RISKY | AVOID */
  recommendation: string;
  /** Human-readable recommendation label */
  recommendationColor: string;
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalHousing: number;
  pctTakeHome: number;
  pctGross: number;
  dti: number;
  remainingDisposable: number;
  cashflowBufferPct: number;
  safePrice: number;
  dangerZoneStart: number;
  /** narrative summary */
  summary: string;
}

export function analyze(params: {
  grossIncome: number;
  takeHome: number;
  homePrice: number;
  downPct: number;
  rate: number;
  monthlyDebts: number;
  taxRate: number;
  insurance: number;
  hoa?: number;
}): DecisionResult {
  const loan = params.homePrice * (1 - params.downPct / 100);
  const monthlyPI = calcPMT(loan, params.rate, 30);
  const monthlyTax = (params.homePrice * (params.taxRate / 100)) / 12;
  const monthlyInsurance = params.insurance;
  const monthlyHOA = params.hoa ?? 0;
  const totalHousing = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA;
  const monthlyGross = params.grossIncome / 12;
  const pctGross = (totalHousing / monthlyGross) * 100;
  const pctTakeHome = params.takeHome > 0 ? (totalHousing / params.takeHome) * 100 : 100;
  const dti = ((totalHousing + params.monthlyDebts) / monthlyGross) * 100;
  const remainingDisposable = params.takeHome - totalHousing - params.monthlyDebts;
  const cashflowBufferPct = params.takeHome > 0 ? (remainingDisposable / params.takeHome) * 100 : 0;

  // Risk scoring
  let riskScore = 0;
  if (pctGross > 28) riskScore += 25;
  else if (pctGross > 25) riskScore += 10;
  if (pctTakeHome > 50) riskScore += 30;
  else if (pctTakeHome > 40) riskScore += 15;
  else if (pctTakeHome > 35) riskScore += 5;
  if (dti > 50) riskScore += 25;
  else if (dti > 43) riskScore += 15;
  else if (dti > 36) riskScore += 5;
  if (cashflowBufferPct < 10) riskScore += 20;
  else if (cashflowBufferPct < 20) riskScore += 10;
  if (params.rate >= 7) riskScore += 10;
  else if (params.rate >= 6) riskScore += 5;
  riskScore = Math.min(100, riskScore);

  let recommendation: string;
  let recommendationColor: string;
  if (riskScore <= 20) { recommendation = "SAFE"; recommendationColor = "text-emerald-600"; }
  else if (riskScore <= 45) { recommendation = "CAUTIOUS"; recommendationColor = "text-amber-600"; }
  else if (riskScore <= 70) { recommendation = "RISKY"; recommendationColor = "text-orange-600"; }
  else { recommendation = "AVOID"; recommendationColor = "text-red-600"; }

  // Compute "the line" — what price would bring risk to ~30?
  const targetPctTakeHome = 40;
  const targetMonthlyHousing = params.takeHome * (targetPctTakeHome / 100);
  const estimatedMonthlyPITarget = targetMonthlyHousing - monthlyTax - monthlyInsurance - monthlyHOA;
  if (estimatedMonthlyPITarget <= 0) {
    return {
      riskScore, recommendation, recommendationColor,
      monthlyPI, monthlyTax, monthlyInsurance, monthlyHOA, totalHousing,
      pctTakeHome, pctGross, dti, remainingDisposable, cashflowBufferPct,
      safePrice: 0, dangerZoneStart: 0,
      summary: "Your income is too low relative to your debts and expenses to safely afford a home at current rates. Consider increasing income or reducing debts first."
    };
  }
  // Back-solve for loan amount
  const r = params.rate / 100 / 12;
  const n = 360;
  const maxLoan = estimatedMonthlyPITarget * ((1 - Math.pow(1 + r, -n)) / r);
  const safePrice = maxLoan / (1 - params.downPct / 100);
  const dangerZoneStart = safePrice * 1.15;

  // Narrative summary
  let summary = "";
  if (riskScore <= 20) {
    summary = `At ${homePriceDisplay(params.homePrice)} with ${params.downPct}% down, your housing costs would be ${pctTakeHome.toFixed(0)}% of your take-home pay — well within the safe zone. You'd have $${Math.round(remainingDisposable).toLocaleString()}/month left for everything else.`;
  } else if (riskScore <= 45) {
    summary = `At ${homePriceDisplay(params.homePrice)}, housing would take ${pctTakeHome.toFixed(0)}% of your take-home pay. It's doable, but you'd want to keep a close eye on your budget. Your safe price ceiling is around ${homePriceDisplay(Math.round(safePrice))}.`;
  } else if (riskScore <= 70) {
    summary = `At ${homePriceDisplay(params.homePrice)}, ${pctTakeHome.toFixed(0)}% of your take-home pay would go to housing — that's firmly in the "house poor" danger zone. For your income, a safer price would be under ${homePriceDisplay(Math.round(safePrice))}.`;
  } else {
    summary = `This house at ${homePriceDisplay(params.homePrice)} would consume ${pctTakeHome.toFixed(0)}% of your take-home pay. You would have just $${Math.round(remainingDisposable).toLocaleString()}/month left after housing and debts. This is the definition of house poor.`;
  }

  return {
    riskScore, recommendation, recommendationColor,
    monthlyPI, monthlyTax, monthlyInsurance, monthlyHOA, totalHousing,
    pctTakeHome, pctGross, dti, remainingDisposable, cashflowBufferPct,
    safePrice: Math.round(safePrice), dangerZoneStart: Math.round(dangerZoneStart),
    summary
  };
}

function homePriceDisplay(price: number): string {
  if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(price).toLocaleString()}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MortgageDecisionEngine() {
  const [grossIncome, setGrossIncome] = useState(120000);
  const [takeHome, setTakeHome] = useState(7600);
  const [homePrice, setHomePrice] = useState(450000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(6.5);
  const [monthlyDebts, setMonthlyDebts] = useState(600);
  const [taxRate, setTaxRate] = useState(1.1);
  const [insurance, setInsurance] = useState(150);
  const [hoa, setHoa] = useState(0);

  const result = useMemo(() => analyze({
    grossIncome, takeHome, homePrice, downPct, rate, monthlyDebts, taxRate, insurance, hoa
  }), [grossIncome, takeHome, homePrice, downPct, rate, monthlyDebts, taxRate, insurance, hoa]);

  useAutoSave(
    "mortgage",
    "Stress Test",
    `${result.recommendation} — ${result.riskScore}% risk score`,
    "/decision/mortgage",
    [result.riskScore, result.recommendation]
  );

  const riskRingColor = result.riskScore <= 25 ? "stroke-emerald-500" :

    result.riskScore <= 50 ? "stroke-amber-500" :
    result.riskScore <= 75 ? "stroke-orange-500" : "stroke-red-500";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Can You Afford This House — Safely?
        </h1>
        <p className="mt-3 text-base text-zinc-500 max-w-lg">
          Enter your numbers below. We'll calculate your risk score and
          tell you where the line is — before you sign anything.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ============================================================ */}
        {/*  INPUT FORM                                                    */}
        {/* ============================================================ */}
        <div className="space-y-5">
          <Field label="Annual gross household income" value={grossIncome} onChange={setGrossIncome} prefix="$" step={5000} />
          <Field label="Monthly take-home pay" value={takeHome} onChange={setTakeHome} prefix="$" step={100} />
          <Field label="Home price" value={homePrice} onChange={setHomePrice} prefix="$" step={10000} />

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Down payment — <span className="text-zinc-400">{downPct}%</span>
            </label>
            <input
              type="range" min={3} max={50} value={downPct}
              onChange={e => setDownPct(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>3%</span><span>20%</span><span>50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Interest rate — <span className="text-zinc-400">{rate}%</span>
            </label>
            <input
              type="range" min={2} max={10} step={0.125} value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>2%</span><span>6%</span><span>10%</span>
            </div>
          </div>

          <Field label="Monthly debt payments" value={monthlyDebts} onChange={setMonthlyDebts} prefix="$" step={50} />
          <Field label="Property tax rate (%)" value={taxRate} onChange={setTaxRate} suffix="%" step={0.1} />
          <Field label="Home insurance ($/month)" value={insurance} onChange={setInsurance} prefix="$" step={10} />
          <Field label="HOA dues ($/month)" value={hoa} onChange={setHoa} prefix="$" step={25} />
        </div>

        {/* ============================================================ */}
        {/*  RESULTS                                                      */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {/* Risk Score Ring */}
          <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Stress Score</p>
            <div className="relative flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#f4f4f5" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round"
                  className={riskRingColor}
                  strokeDasharray={`${(result.riskScore / 100) * 326.7} 326.7`}
                />
              </svg>
              <span className="absolute text-3xl font-bold text-zinc-900">{result.riskScore}</span>
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">Stress Level</p>
            <p className={`mt-0.5 text-lg font-bold ${result.recommendationColor}`}>
              {result.recommendation}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Monthly P&I" value={`$${Math.round(result.monthlyPI).toLocaleString()}`} />
            <Metric label="Property Tax" value={`$${Math.round(result.monthlyTax).toLocaleString()}`} />
            <Metric label="Insurance" value={`$${Math.round(result.monthlyInsurance).toLocaleString()}`} />
            <Metric label="HOA" value={`$${Math.round(result.monthlyHOA).toLocaleString()}`} />
            <Metric label="Total Housing" value={`$${Math.round(result.totalHousing).toLocaleString()}`} emphasis />
            <Metric label="% of Take-Home" value={`${result.pctTakeHome.toFixed(0)}%`}
              warn={result.pctTakeHome > 40} danger={result.pctTakeHome > 50} />
            <Metric label="DTI Ratio" value={`${result.dti.toFixed(0)}%`}
              warn={result.dti > 36} danger={result.dti > 43} />
            <Metric label="Left After Housing" value={`$${Math.round(result.remainingDisposable).toLocaleString()}`}
              danger={result.remainingDisposable < 500} />
            <Metric label="Cashflow Buffer" value={`${result.cashflowBufferPct.toFixed(0)}%`}
              warn={result.cashflowBufferPct < 20} danger={result.cashflowBufferPct < 10} />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  THE LINE                                                      */}
      {/* ============================================================ */}
      {result.safePrice > 0 && (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <Info className="h-4 w-4 text-zinc-400" />
            Your Affordability Zone
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="h-3 bg-zinc-200 rounded-full overflow-hidden flex">
                {(() => {
                  const safeW = Math.min(100, (result.safePrice / result.dangerZoneStart) * 50);
                  const dangerW = Math.min(100 - safeW, 35);
                  const avoidW = 100 - safeW - dangerW;
                  return (
                    <>
                      <div className="h-full bg-emerald-400" style={{ width: `${safeW}%` }} />
                      <div className="h-full bg-amber-400" style={{ width: `${dangerW}%` }} />
                      <div className="h-full bg-red-400" style={{ width: `${avoidW}%` }} />
                    </>
                  );
                })()}
              </div>
              <div className="flex justify-between text-xs text-zinc-400 mt-2">
                <span className="text-emerald-600">Safe: ≤{homePriceDisplay(result.safePrice)}</span>
                <span className="text-amber-600">Stretch: {homePriceDisplay(result.safePrice)}–{homePriceDisplay(result.dangerZoneStart)}</span>
                <span className="text-red-600">Risky: &gt;{homePriceDisplay(result.dangerZoneStart)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      
      {/* ============================================================ */}
      {/*  SCENARIO COMPARISON — down payment options                     */}
      {/* ============================================================ */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-zinc-400" />
          Down Payment Scenarios
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Same home, same rate — different down payments. See how much you save.
        </p>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left py-2 pr-3 text-xs font-medium text-zinc-400">Down Payment</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Monthly P&amp;I</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Total Interest</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Stress Level</th>
              </tr>
            </thead>
            <tbody>
              {[5, 10, 20].map(pct => {
                const s = analyze({ grossIncome, takeHome, homePrice, downPct: pct, rate, monthlyDebts, taxRate, insurance, hoa });
                const loanAmt = homePrice * (1 - pct / 100);
                const totalInterest = (s.monthlyPI * 360) - loanAmt;
                const stressLabel = s.recommendation === "SAFE" ? "Low" : s.recommendation === "CAUTIOUS" ? "Moderate" : s.recommendation === "RISKY" ? "High" : "Severe";
                const stressColor = s.recommendation === "SAFE" ? "text-emerald-600 bg-emerald-50" : s.recommendation === "CAUTIOUS" ? "text-amber-600 bg-amber-50" : s.recommendation === "RISKY" ? "text-orange-600 bg-orange-50" : "text-red-600 bg-red-50";
                return (
                  <tr key={pct} className={`border-b border-zinc-50 ${pct === downPct ? "bg-zinc-50 font-medium" : ""}`}>
                    <td className="py-3 pr-3 text-zinc-900">
                      {pct}%{pct === downPct ? " (current)" : ""}
                    </td>
                    <td className="text-right py-3 px-3 text-zinc-900">
                      ${Math.round(s.monthlyPI).toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-3 text-zinc-500">
                      ${Math.round(totalInterest).toLocaleString()}
                    </td>
                    <td className="text-right py-3 pl-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${stressColor}`}>{stressLabel}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {downPct < 20 && (() => {
          const current = analyze({ grossIncome, takeHome, homePrice, downPct, rate, monthlyDebts, taxRate, insurance, hoa });
          const at20 = analyze({ grossIncome, takeHome, homePrice, downPct: 20, rate, monthlyDebts, taxRate, insurance, hoa });
          const monthlySavings = current.monthlyPI - at20.monthlyPI;
          const loanCurrent = homePrice * (1 - downPct / 100);
          const loan20 = homePrice * (1 - 20 / 100);
          const interestCurrent = (current.monthlyPI * 360) - loanCurrent;
          const interest20 = (at20.monthlyPI * 360) - loan20;
          const interestSavings = interestCurrent - interest20;
          return (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <TrendingDown className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Save ${Math.round(monthlySavings).toLocaleString()}/month with 20% down
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  That's ${Math.round(monthlySavings * 12).toLocaleString()}/year in cash flow and ${Math.round(interestSavings).toLocaleString()} less in total interest over the life of the loan — plus no PMI.
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/*  SUMMARY                                                        */}
      {/* ============================================================ */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-2 flex items-center gap-2">
          {result.riskScore <= 25 ? <CheckCircle className="h-4 w-4 text-emerald-500" /> :
           result.riskScore <= 50 ? <Info className="h-4 w-4 text-amber-500" /> :
           result.riskScore <= 75 ? <AlertTriangle className="h-4 w-4 text-orange-500" /> :
           <AlertTriangle className="h-4 w-4 text-red-500" />}
          What this means
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{result.summary}</p>
        {result.riskScore > 50 && (
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-4">
            <TrendingDown className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Financial stress is likely</p>
              <p className="text-sm text-red-700 mt-1">
                Buyers in this risk zone are 3× more likely to report feeling
                house poor within 2 years. If  you're already worried,
                that feeling doesn't go away after closing — it gets worse.
              </p>
            </div>
          </div>
        )}
        {result.riskScore <= 20 && (
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-100 p-4">
            <TrendingUp className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Low stress — you can breathe</p>
              <p className="text-sm text-emerald-700 mt-1">
                At this price, your housing costs are well within recommended
                limits. You should still budget for maintenance (~1% of home
                value/year), but you  won't be house poor.
              </p>
            </div>
          </div>

        )}
      </div>

      {/* ============================================================ */}
      {/*  FOOTNOTE                                                      */}
      {/* ============================================================ */}
      <p className="mt-6 text-xs text-zinc-400 text-center">
      <div className="flex items-center justify-center mt-6">
        <SaveResultButton
          engine="mortgage"
          label="Stress Test"
          outcome={`${result.recommendation} — ${result.riskScore}% risk score`}
          href="/decision/mortgage"
        />
      </div>

        {/* Ko-fi support prompt — shown after results */}
        <KoFiSupportPrompt />

        All calculations run locally in your browser. Nothing is sent anywhere.
        This is an educational tool — not financial advice.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable input field                                               */
/* ------------------------------------------------------------------ */

let _fieldIdCounter = 0;
function Field({
  label, value, onChange, prefix, suffix, step
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
    const id = `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${++_fieldIdCounter}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">{prefix}</span>
        )}
        <input
          type="number"
          id={id}
          value={value}
          onChange={e => onChange(Number(e.target.value) || 0)}
          step={step}
          className={`w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition ${prefix ? "pl-7" : ""} ${suffix ? "pr-7" : ""}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric pill                                                       */
/* ------------------------------------------------------------------ */

function Metric({
  label, value, emphasis, warn, danger
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  warn?: boolean;
  danger?: boolean;
}) {
  const color = danger ? "text-red-600" : warn ? "text-amber-600" : "text-zinc-900";
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${emphasis ? "border-zinc-300 bg-zinc-50" : "border-zinc-100"}`}>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className={`text-sm font-semibold ${emphasis ? "text-base" : ""} ${color}`}>{value}</p>
    </div>
  );
}
