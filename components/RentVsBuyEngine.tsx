"use client";

import { useState, useMemo } from "react";
import EmailResultForm from "@/components/EmailResultForm";
import { ArrowLeftRight, TrendingUp, TrendingDown, Home, Building2, Clock, Info } from "lucide-react";
import SaveResultButton from "@/components/SaveResultButton";
import { useAutoSave } from "@/hooks/useAutoSave";
import { calcPMT } from "@/lib/loan-math";

/* ------------------------------------------------------------------ */
/*  Rent vs Buy math (local only)                                     */
/* ------------------------------------------------------------------ */


interface RvBResult {
  /** Positive = buying wins, negative = renting wins */
  netDiff: number;
  /** Absolute value for display */
  absDiff: number;
  /** "Buying saves you $X" or "Renting saves you $X" */
  winnerLabel: string;
  /** Which side wins */
  winner: "buy" | "rent" | "tossup";
  /** Green/amber for summary card */
  winnerColor: string;
  buyTotalCost: number;
  rentTotalCost: number;
  buyMonthly: number;
  rentMonthly: number;
  monthlySavingsRenting: number;
  buyEquityBuilt: number;
  investedDownPayment: number;
  investedMonthlySavings: number;
  breakEvenYear: number | null;
  summary: string;
}

function analyze(params: {
  homePrice: number;
  downPct: number;
  rate: number;
  taxRate: number;
  insurance: number;
  hoa?: number;
  monthlyRent: number;
  stayYears: number;
  appreciation: number;
  investmentReturn: number;
  maintenancePct: number;
  closingCostPct: number;
  sellingCostPct: number;
  rentIncreasePct: number;
}): RvBResult {
  return analyzeCore(params, true);
}

function analyzeCore(params: {
  homePrice: number;
  downPct: number;
  rate: number;
  taxRate: number;
  insurance: number;
  hoa?: number;
  monthlyRent: number;
  stayYears: number;
  appreciation: number;
  investmentReturn: number;
  maintenancePct: number;
  closingCostPct: number;
  sellingCostPct: number;
  rentIncreasePct: number;
}, computeBreakEven: boolean): RvBResult {
  const months = params.stayYears * 12;

  // --- BUYING SIDE ---
  const downPayment = params.homePrice * (params.downPct / 100);
  const loan = params.homePrice - downPayment;
  const monthlyPI = calcPMT(loan, params.rate, 30);
  const monthlyTax = (params.homePrice * (params.taxRate / 100)) / 12;
  const monthlyInsurance = params.insurance;
  const monthlyHOA = params.hoa ?? 0;
  const monthlyMaintenance = (params.homePrice * (params.maintenancePct / 100)) / 12;
  const buyMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA + monthlyMaintenance;

  const totalHousingPayments = buyMonthly * months;
  const closingCosts = params.homePrice * (params.closingCostPct / 100);
  const futureHomeValue = params.homePrice * Math.pow(1 + params.appreciation / 100, params.stayYears);
  const sellingCosts = futureHomeValue * (params.sellingCostPct / 100);

  const r = params.rate / 100 / 12;
  const totalN = 360;
  const paymentsMade = months;
  const remainingBalance = paymentsMade >= totalN ? 0 :
    loan * (Math.pow(1 + r, totalN) - Math.pow(1 + r, paymentsMade)) /
    (Math.pow(1 + r, totalN) - 1);

  const equityAtSale = futureHomeValue - remainingBalance;
  const buyTotalCost = downPayment + totalHousingPayments + closingCosts + sellingCosts - equityAtSale;

  // --- RENTING SIDE ---
  let totalRentPayments = 0;
  let currentRent = params.monthlyRent;
  for (let y = 0; y < params.stayYears; y++) {
    for (let m = 0; m < 12; m++) {
      totalRentPayments += currentRent;
    }
    currentRent *= (1 + params.rentIncreasePct / 100);
  }

  const monthlySavingsRenting = Math.max(0, buyMonthly - params.monthlyRent);
  const investedDownPayment = downPayment * Math.pow(1 + params.investmentReturn / 100, params.stayYears);

  const mr = params.investmentReturn / 100 / 12;
  let investedMonthlySavings = 0;
  if (mr === 0) {
    investedMonthlySavings = monthlySavingsRenting * months;
  } else {
    investedMonthlySavings = monthlySavingsRenting *
      ((Math.pow(1 + mr, months) - 1) / mr);
  }

  const totalInvested = downPayment + (monthlySavingsRenting * months);
  const totalInvestmentValue = investedDownPayment + investedMonthlySavings;
  const investmentGains = totalInvestmentValue - totalInvested;
  const rentTotalCost = totalRentPayments - investmentGains;

  // --- COMPARISON ---
  const netDiff = rentTotalCost - buyTotalCost;
  const absDiff = Math.abs(netDiff);

  let winnerLabel: string;
  let winner: "buy" | "rent" | "tossup";
  let winnerColor: string;
  // "Too Close to Call" when the difference is under 5% of home price
  const tossupThreshold = params.homePrice * 0.05;
  if (absDiff < tossupThreshold) {
    winner = "tossup";
    winnerColor = "text-zinc-600 bg-zinc-50 border-zinc-200";
    winnerLabel = `Too Close to Call — the difference is only $${Math.round(absDiff).toLocaleString()} over ${params.stayYears} years`;
  } else if (netDiff > 0) {
    winner = "buy";
    winnerColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
    winnerLabel = `Likely Better to Buy — saves ~$${Math.round(absDiff).toLocaleString()} over ${params.stayYears} years`;
  } else {
    winner = "rent";
    winnerColor = "text-amber-600 bg-amber-50 border-amber-200";
    winnerLabel = `Likely Better to Rent — saves ~$${Math.round(absDiff).toLocaleString()} over ${params.stayYears} years`;
  }

  // --- BREAK-EVEN (only when requested) ---
  let breakEvenYear: number | null = null;
  if (computeBreakEven && winner === "rent") {
    for (let y = params.stayYears + 1; y <= 30; y++) {
      const testResult = analyzeCore({ ...params, stayYears: y }, false);
      if (testResult.winner === "buy") {
        breakEvenYear = y;
        break;
      }
    }
  }

  // --- SUMMARY ---
  let summary = "";
  if (winner === "tossup") {
    summary = `Over ${params.stayYears} years, buying and renting come out nearly even — the difference is just $${Math.round(absDiff).toLocaleString()}. At this point, the decision comes down to lifestyle: do you want the freedom of renting or the stability of owning? Financially, there's no wrong answer.`;
  } else if (winner === "rent") {
    summary = `Over ${params.stayYears} years, renting and investing the difference puts you about $${Math.round(absDiff).toLocaleString()} ahead. The high cost of mortgage interest at ${params.rate}% plus closing costs, maintenance, and selling commission outweigh the equity you'd build.`;
    if (breakEvenYear) {
      summary += ` Buying would only start winning after about ${breakEvenYear} years.`;
    }
  } else {
    summary = `Over ${params.stayYears} years, buying saves you about $${Math.round(absDiff).toLocaleString()} compared to renting. The combination of home appreciation, equity build-up, and tax benefits outweighs the transaction costs and maintenance.`;
  }

  return {
    netDiff, absDiff, winnerLabel, winner, winnerColor,
    buyTotalCost, rentTotalCost,
    buyMonthly, rentMonthly: params.monthlyRent,
    monthlySavingsRenting,
    buyEquityBuilt: equityAtSale - downPayment,
    investedDownPayment,
    investedMonthlySavings,
    breakEvenYear,
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

export default function RentVsBuyEngine() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(6.5);
  const [taxRate, setTaxRate] = useState(1.1);
  const [insurance, setInsurance] = useState(150);
  const [hoa, setHoa] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [stayYears, setStayYears] = useState(5);
  const [appreciation, setAppreciation] = useState(3);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [maintenancePct, setMaintenancePct] = useState(1);
  const [closingCostPct, setClosingCostPct] = useState(3);
  const [sellingCostPct, setSellingCostPct] = useState(6);
  const [rentIncreasePct, setRentIncreasePct] = useState(3);

  const result = useMemo(() => analyze({
    homePrice, downPct, rate, taxRate, insurance, hoa,
    monthlyRent, stayYears, appreciation, investmentReturn,
    maintenancePct, closingCostPct, sellingCostPct, rentIncreasePct,
  }), [homePrice, downPct, rate, taxRate, insurance, hoa,

      monthlyRent, stayYears, appreciation, investmentReturn,
      maintenancePct, closingCostPct, sellingCostPct, rentIncreasePct]);

  // Compute 5-year and 10-year scenarios for the comparison table
  const result5 = useMemo(() => analyze({
    homePrice, downPct, rate, taxRate, insurance, hoa,
    monthlyRent, stayYears: 5, appreciation, investmentReturn,
    maintenancePct, closingCostPct, sellingCostPct, rentIncreasePct,
  }), [homePrice, downPct, rate, taxRate, insurance, hoa,
      monthlyRent, appreciation, investmentReturn,
      maintenancePct, closingCostPct, sellingCostPct, rentIncreasePct]);

  const result10 = useMemo(() => analyze({
    homePrice, downPct, rate, taxRate, insurance, hoa,
    monthlyRent, stayYears: 10, appreciation, investmentReturn,
    maintenancePct, closingCostPct, sellingCostPct, rentIncreasePct,
  }), [homePrice, downPct, rate, taxRate, insurance, hoa,
      monthlyRent, appreciation, investmentReturn,
      maintenancePct, closingCostPct, sellingCostPct, rentIncreasePct]);

  useAutoSave(
    "rent-vs-buy",
    "Rent vs Buy",
    result.winnerLabel,
    "/decision/rent-vs-buy",
    [result.winner, result.winnerLabel]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 mb-5">
          <ArrowLeftRight className="h-6 w-6 text-amber-600" />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          Rent vs Buy: What Do Your Numbers Say?
        </h1>
        <p className="mt-3 text-base text-zinc-500 max-w-lg">
          Enter your local market numbers. We&apos;ll compare the real all-in
          cost of both paths and tell you which builds more wealth.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ============================================================ */}
        {/*  INPUT FORM                                                    */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">The House</p>

          <Field label="Home price" value={homePrice} onChange={setHomePrice} prefix="$" step={10000} />

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

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Interest rate — <span className="text-zinc-400">{rate}%</span>
            </label>
            <input type="range" min={2} max={10} step={0.125} value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>2%</span><span>6%</span><span>10%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Property tax %" value={taxRate} onChange={setTaxRate} suffix="%" step={0.1} />
            <Field label="Insurance/mo" value={insurance} onChange={setInsurance} prefix="$" step={10} />
            <Field label="HOA/mo" value={hoa} onChange={setHoa} prefix="$" step={25} />
          </div>

          <hr className="border-zinc-100" />
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">The Alternative</p>

          <Field label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix="$" step={50} />

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              How long will you stay? — <span className="text-zinc-400">{stayYears} {stayYears === 1 ? "year" : "years"}</span>
            </label>
            <input type="range" min={1} max={15} value={stayYears}
              onChange={e => setStayYears(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>1 yr</span><span>5 yr</span><span>10 yr</span><span>15 yr</span>
            </div>
          </div>

          <hr className="border-zinc-100" />
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Assumptions</p>

          <CollapsibleFields
            appreciation={appreciation} setAppreciation={setAppreciation}
            investmentReturn={investmentReturn} setInvestmentReturn={setInvestmentReturn}
            maintenancePct={maintenancePct} setMaintenancePct={setMaintenancePct}
            closingCostPct={closingCostPct} setClosingCostPct={setClosingCostPct}
            sellingCostPct={sellingCostPct} setSellingCostPct={setSellingCostPct}
            rentIncreasePct={rentIncreasePct} setRentIncreasePct={setRentIncreasePct}
          />
        </div>

        {/* ============================================================ */}
        {/*  RESULTS                                                      */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {/* Winner Card */}
          <div className={`rounded-2xl border p-6 ${result.winnerColor}`}>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-2">
              {stayYears}-Year Outcome
            </p>
            <p className="text-2xl font-bold">
              {result.winner === "buy" ? "Buying Wins" : result.winner === "rent" ? "Renting Wins" : "Too Close to Call"}
            </p>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              {result.winnerLabel}
            </p>
          </div>

          {/* Side-by-side cost bars */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold text-zinc-400 mb-4">
              Total {stayYears}-Year Cost
            </p>

            {/* Buy bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-zinc-700">Buying</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900">{fmtMoney(result.buyTotalCost)}</span>
              </div>
              <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${Math.min(100, (Math.abs(result.buyTotalCost) / Math.max(Math.abs(result.buyTotalCost), Math.abs(result.rentTotalCost))) * 100)}%` }} />
              </div>
            </div>

            {/* Rent bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-zinc-700">Renting + Investing</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900">{fmtMoney(result.rentTotalCost)}</span>
              </div>
              <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${Math.min(100, (Math.abs(result.rentTotalCost) / Math.max(Math.abs(result.buyTotalCost), Math.abs(result.rentTotalCost))) * 100)}%` }} />
              </div>
            </div>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Monthly (Buy)" value={`$${Math.round(result.buyMonthly).toLocaleString()}`} />
            <Metric label="Monthly (Rent)" value={`$${Math.round(result.rentMonthly).toLocaleString()}`} />
            <Metric label="Monthly Savings Renting" value={`$${Math.round(result.monthlySavingsRenting).toLocaleString()}`}
              sub={result.monthlySavingsRenting <= 0 ? "Rent exceeds buy cost" : undefined} />
            <Metric label="Equity Built" value={fmtMoney(result.buyEquityBuilt)}
              sub={result.buyEquityBuilt < 0 ? "Underwater" : undefined} />
            <Metric label="Invested Down Pmt Grows To" value={fmtMoney(result.investedDownPayment)} />
            <Metric label="Invested Savings Grow To" value={fmtMoney(result.investedMonthlySavings)} />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      
      {/* ============================================================ */}
      {/*  5-YR / 10-YR COMPARISON TABLE                                 */}
      {/* ============================================================ */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-zinc-400" />
          How Time Changes the Math
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          The longer you stay, the more buying tends to win. Compare your numbers at 5 and 10 years.
        </p>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left py-2 pr-3 text-xs font-medium text-zinc-400">Timeframe</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Buying Cost</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Renting Cost</th>
                <th className="text-right py-2 pl-3 text-xs font-medium text-zinc-400">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[result5, result10].map((r, i) => {
                const years = i === 0 ? 5 : 10;
                const isCurrent = years === stayYears;
                const recLabel = r.winner === "tossup" ? "Tossup" : r.winner === "buy" ? "Buy" : "Rent";
                const recColor = r.winner === "tossup" ? "text-zinc-600 bg-zinc-100" : r.winner === "buy" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50";
                return (
                  <tr key={years} className={`border-b border-zinc-50 ${isCurrent ? "bg-zinc-50 font-medium" : ""}`}>
                    <td className="py-3 pr-3 text-zinc-900">
                      {years} years{isCurrent ? " (your plan)" : ""}
                    </td>
                    <td className="text-right py-3 px-3 text-zinc-900">
                      {fmtMoney(r.buyTotalCost)}
                    </td>
                    <td className="text-right py-3 px-3 text-zinc-500">
                      {fmtMoney(r.rentTotalCost)}
                    </td>
                    <td className="text-right py-3 pl-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${recColor}`}>{recLabel}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/*  BREAK-EVEN                                                     */}
      {/* ============================================================ */}
      {result.breakEvenYear && (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-400" />
            Break-Even Point
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            At your current numbers, buying only becomes cheaper than renting
            after about{" "}
            <strong className="text-zinc-900">{result.breakEvenYear} years</strong>.
            {result.breakEvenYear > stayYears
              ? ` Since you plan to stay ${stayYears} years, renting is the better financial move right now.`
              : ` Since you plan to stay ${stayYears} years, you'd be past the break-even — buying may be worth it.`}
          </p>
        </div>
      )}

      {/* ============================================================ */}
      {/*  SUMMARY                                                        */}
      {/* ============================================================ */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
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
          engine="rent-vs-buy"
          label="Rent vs Buy"
          outcome={result.winnerLabel}
          href="/decision/rent-vs-buy"
        />
      </div>
        All calculations run locally in your browser. Nothing is sent anywhere.
        This is an educational tool — not financial advice.
      </p>

      {/* Email results form */}
      <EmailResultForm
        subject="FinKit Rent vs Buy Results"
        text={`Rent vs Buy Analysis\n\nHome Price: $${homePrice.toLocaleString()}\nDown Payment: ${downPct}%\nInterest Rate: ${rate}%\nMonthly Rent: $${monthlyRent.toLocaleString()}\nPlanned Stay: ${stayYears} years\n\nResult: ${result.winnerLabel}\n${result.summary}\n\nComparison Table:\n- 5 Years: ${result5.winnerLabel}\n- 10 Years: ${result10.winnerLabel}\n\nGenerated by FinKit — https://getfinkit.com`}
      />

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

function CollapsibleFields({
  appreciation, setAppreciation,
  investmentReturn, setInvestmentReturn,
  maintenancePct, setMaintenancePct,
  closingCostPct, setClosingCostPct,
  sellingCostPct, setSellingCostPct,
  rentIncreasePct, setRentIncreasePct,
}: {
  appreciation: number; setAppreciation: (v: number) => void;
  investmentReturn: number; setInvestmentReturn: (v: number) => void;
  maintenancePct: number; setMaintenancePct: (v: number) => void;
  closingCostPct: number; setClosingCostPct: (v: number) => void;
  sellingCostPct: number; setSellingCostPct: (v: number) => void;
  rentIncreasePct: number; setRentIncreasePct: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
      >
        {open ? "Hide" : "Show"} advanced assumptions
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-3 space-y-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
          <Field label="Home appreciation (%/yr)" value={appreciation} onChange={setAppreciation} suffix="%" step={0.5} />
          <Field label="Investment return (%/yr)" value={investmentReturn} onChange={setInvestmentReturn} suffix="%" step={0.5} />
          <Field label="Maintenance (% of home/yr)" value={maintenancePct} onChange={setMaintenancePct} suffix="%" step={0.1} />
          <Field label="Closing costs (%)" value={closingCostPct} onChange={setClosingCostPct} suffix="%" step={0.5} />
          <Field label="Selling costs (%)" value={sellingCostPct} onChange={setSellingCostPct} suffix="%" step={0.5} />
          <Field label="Rent increase (%/yr)" value={rentIncreasePct} onChange={setRentIncreasePct} suffix="%" step={0.5} />
        </div>
      )}
    </div>
  );
}

function Metric({
  label, value, sub, emphasis,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${emphasis ? "border-zinc-300 bg-zinc-50" : "border-zinc-100"}`}>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className={`text-sm font-semibold ${emphasis ? "text-base" : ""} text-zinc-900`}>{value}</p>
      {sub && <p className="text-[10px] text-zinc-400 mt-0.5">{sub}</p>}
    </div>
  );
}
