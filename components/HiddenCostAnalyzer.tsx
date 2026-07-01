"use client";

import { useState, useMemo } from "react";
import EmailResultForm from "@/components/EmailResultForm";
import { EyeOff, DollarSign, Percent, TrendingUp, AlertTriangle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hidden Cost math                                                   */
/* ------------------------------------------------------------------ */

interface HiddenCostResult {
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  monthlyMaintenance: number;
  monthlyUtilities: number;
  totalHiddenMonthly: number;
  totalHiddenAnnual: number;
  hiddenCostRatio: number;
  summary: string;
}

function analyze(params: {
  homePrice: number;
  monthlyMortgage: number;
  taxRate: number;
  insurance: number;
  hoa: number;
  maintenancePct: number;
  utilities: number;
}): HiddenCostResult {
  const monthlyTax = (params.homePrice * (params.taxRate / 100)) / 12;
  const monthlyInsurance = params.insurance;
  const monthlyHOA = params.hoa;
  const monthlyMaintenance = (params.homePrice * (params.maintenancePct / 100)) / 12;
  const monthlyUtilities = params.utilities;

  const totalHiddenMonthly = monthlyTax + monthlyInsurance + monthlyHOA + monthlyMaintenance + monthlyUtilities;
  const totalHiddenAnnual = totalHiddenMonthly * 12;

  const totalMonthlyHousing = params.monthlyMortgage + totalHiddenMonthly;
  const hiddenCostRatio = totalMonthlyHousing > 0 ? (totalHiddenMonthly / totalMonthlyHousing) * 100 : 0;

  let summary = "";
  if (hiddenCostRatio > 40) {
    summary = `Hidden costs make up ${hiddenCostRatio.toFixed(0)}% of your total monthly housing payment — that's nearly half. If you only budgeted for the mortgage, you're missing $${Math.round(totalHiddenMonthly).toLocaleString()}/month in real costs.`;
  } else if (hiddenCostRatio > 25) {
    summary = `Hidden costs add $${Math.round(totalHiddenMonthly).toLocaleString()}/month — about ${hiddenCostRatio.toFixed(0)}% of your total housing cost. That's a significant line item most first-time buyers forget.`;
  } else {
    summary = `Hidden costs add $${Math.round(totalHiddenMonthly).toLocaleString()}/month — ${hiddenCostRatio.toFixed(0)}% of your total. Manageable, but don't let it surprise you.`;
  }

  return {
    monthlyTax,
    monthlyInsurance,
    monthlyHOA,
    monthlyMaintenance,
    monthlyUtilities,
    totalHiddenMonthly,
    totalHiddenAnnual,
    hiddenCostRatio,
    summary,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function HiddenCostAnalyzer() {
  const [homePrice, setHomePrice] = useState(450000);
  const [monthlyMortgage, setMonthlyMortgage] = useState(2400);
  const [taxRate, setTaxRate] = useState(1.1);
  const [insurance, setInsurance] = useState(150);
  const [hoa, setHoa] = useState(0);
  const [maintenancePct, setMaintenancePct] = useState(1);
  const [utilities, setUtilities] = useState(350);

  const result = useMemo(() => analyze({
    homePrice, monthlyMortgage, taxRate, insurance, hoa, maintenancePct, utilities,
  }), [homePrice, monthlyMortgage, taxRate, insurance, hoa, maintenancePct, utilities]);

  const totalMonthly = monthlyMortgage + result.totalHiddenMonthly;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 mb-5">
          <EyeOff className="h-6 w-6 text-purple-600" />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
          What Your Mortgage Doesn't Tell You
        </h1>
        <p className="mt-3 text-base text-zinc-500 max-w-lg">
          Your mortgage payment is only part of the total cost of
          homeownership. Enter your numbers to see the hidden costs most
          buyers forget.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ============================================================ */}
        {/*  INPUT FORM                                                    */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Your Numbers</p>

          <Field label="Home price" value={homePrice} onChange={setHomePrice} prefix="$" step={10000} />
          <Field label="Monthly mortgage (P&I)" value={monthlyMortgage} onChange={setMonthlyMortgage} prefix="$" step={50} />

          <hr className="border-zinc-100" />
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Hidden Costs</p>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Property tax %" value={taxRate} onChange={setTaxRate} suffix="%" step={0.1} />
            <Field label="Insurance/mo" value={insurance} onChange={setInsurance} prefix="$" step={10} />
            <Field label="HOA dues/mo" value={hoa} onChange={setHoa} prefix="$" step={25} />
            <Field label="Maintenance %/yr" value={maintenancePct} onChange={setMaintenancePct} suffix="%" step={0.1} />
          </div>
          <Field label="Utilities/mo (est.)" value={utilities} onChange={setUtilities} prefix="$" step={25} />
        </div>

        {/* ============================================================ */}
        {/*  RESULTS                                                      */}
        {/* ============================================================ */}
        <div className="space-y-6">
          {/* Total monthly breakdown card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              True Monthly Housing Cost
            </p>

            {/* Stacked bar */}
            <div className="h-4 bg-zinc-100 rounded-full overflow-hidden flex mb-4">
              {(() => {
                const mortgageW = totalMonthly > 0 ? (monthlyMortgage / totalMonthly) * 100 : 0;
                const taxW = totalMonthly > 0 ? (result.monthlyTax / totalMonthly) * 100 : 0;
                const insW = totalMonthly > 0 ? (result.monthlyInsurance / totalMonthly) * 100 : 0;
                const hoaW = totalMonthly > 0 ? (result.monthlyHOA / totalMonthly) * 100 : 0;
                const maintW = totalMonthly > 0 ? (result.monthlyMaintenance / totalMonthly) * 100 : 0;
                const utilW = totalMonthly > 0 ? (result.monthlyUtilities / totalMonthly) * 100 : 0;
                return (
                  <>
                    <div className="h-full bg-zinc-800" style={{ width: `${mortgageW}%` }} title="Mortgage" />
                    <div className="h-full bg-purple-400" style={{ width: `${taxW}%` }} title="Tax" />
                    <div className="h-full bg-purple-300" style={{ width: `${insW}%` }} title="Insurance" />
                    <div className="h-full bg-amber-300" style={{ width: `${hoaW}%` }} title="HOA" />
                    <div className="h-full bg-purple-200" style={{ width: `${maintW}%` }} title="Maintenance" />
                    <div className="h-full bg-amber-200" style={{ width: `${utilW}%` }} title="Utilities" />
                  </>
                );
              })()}
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-zinc-900">
                ${Math.round(totalMonthly).toLocaleString()}
                <span className="text-sm font-normal text-zinc-400">/month</span>
              </span>
              <span className="text-sm text-zinc-500">
                ${Math.round(totalMonthly * 12).toLocaleString()}/year
              </span>
            </div>
          </div>

          {/* Hidden cost breakdown */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Property Tax" value={`$${Math.round(result.monthlyTax).toLocaleString()}/mo`} />
            <Metric label="Insurance" value={`$${Math.round(result.monthlyInsurance).toLocaleString()}/mo`} />
            <Metric label="HOA" value={`$${Math.round(result.monthlyHOA).toLocaleString()}/mo`} />
            <Metric label="Maintenance" value={`$${Math.round(result.monthlyMaintenance).toLocaleString()}/mo`} />
            <Metric label="Utilities" value={`$${Math.round(result.monthlyUtilities).toLocaleString()}/mo`} />
            <Metric label="Total Hidden" value={`$${Math.round(result.totalHiddenMonthly).toLocaleString()}/mo`} emphasis />
          </div>

          {/* Hidden cost ratio callout */}
          <div className={`flex items-start gap-3 rounded-xl border p-4 ${
            result.hiddenCostRatio > 40
              ? "bg-red-50 border-red-100"
              : result.hiddenCostRatio > 25
              ? "bg-amber-50 border-amber-100"
              : "bg-emerald-50 border-emerald-100"
          }`}>
            {result.hiddenCostRatio > 40 ? (
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            ) : result.hiddenCostRatio > 25 ? (
              <TrendingUp className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            ) : (
              <DollarSign className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-semibold ${
                result.hiddenCostRatio > 40 ? "text-red-800" :
                result.hiddenCostRatio > 25 ? "text-amber-800" : "text-emerald-800"
              }`}>
                Hidden costs are {result.hiddenCostRatio.toFixed(0)}% of your total
              </p>
              <p className="text-sm opacity-80 mt-1">
                {result.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Annual projection */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <Percent className="h-4 w-4 text-zinc-400" />
          Annual Hidden Costs: ${Math.round(result.totalHiddenAnnual).toLocaleString()}
        </h3>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left py-2 pr-3 text-xs font-medium text-zinc-400">Cost</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Monthly</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">Annual</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-zinc-400">5 Years</th>
                <th className="text-right py-2 pl-3 text-xs font-medium text-zinc-400">30 Years</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Property Tax", monthly: result.monthlyTax },
                { label: "Insurance", monthly: result.monthlyInsurance },
                { label: "HOA", monthly: result.monthlyHOA },
                { label: "Maintenance", monthly: result.monthlyMaintenance },
                { label: "Utilities", monthly: result.monthlyUtilities },
                { label: "Total Hidden", monthly: result.totalHiddenMonthly, emphasis: true },
              ].map((row) => (
                <tr key={row.label} className={`border-b border-zinc-50 ${row.emphasis ? "bg-zinc-50 font-semibold" : ""}`}>
                  <td className="py-3 pr-3 text-zinc-900">{row.label}</td>
                  <td className="text-right py-3 px-3 text-zinc-900">${Math.round(row.monthly).toLocaleString()}</td>
                  <td className="text-right py-3 px-3 text-zinc-500">${Math.round(row.monthly * 12).toLocaleString()}</td>
                  <td className="text-right py-3 px-3 text-zinc-500">${Math.round(row.monthly * 60).toLocaleString()}</td>
                  <td className="text-right py-3 pl-3 text-zinc-500">${Math.round(row.monthly * 360).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Email results form */}
      <EmailResultForm
        subject="FinKit Hidden Housing Costs Results"
        text={`Hidden Housing Costs Analysis

Home Price: $${homePrice.toLocaleString()}
Monthly Mortgage (P&I): $${monthlyMortgage.toLocaleString()}

Hidden Monthly Costs:
- Property Tax: $${result.monthlyTax.toFixed(0)}
- Insurance: $${result.monthlyInsurance.toFixed(0)}
- HOA: $${result.monthlyHOA.toFixed(0)}
- Maintenance: $${result.monthlyMaintenance.toFixed(0)}
- Utilities: $${result.monthlyUtilities.toFixed(0)}

Total Hidden Monthly: $${result.totalHiddenMonthly.toFixed(0)}
Total Hidden Annual: $${result.totalHiddenAnnual.toFixed(0)}
True Monthly Cost: $${totalMonthly.toFixed(0)}
Hidden Cost Ratio: $${result.hiddenCostRatio.toFixed(1)}%

Generated by FinKit — https://getfinkit.com`}
      />

      {/* Footnote */}
      <p className="mt-6 text-xs text-zinc-400 text-center">
        All calculations run locally in your browser. Nothing is sent anywhere.
        This is an educational tool — not financial advice.
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

function Metric({
  label, value, emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${emphasis ? "border-zinc-300 bg-zinc-50" : "border-zinc-100"}`}>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className={`text-sm font-semibold ${emphasis ? "text-base" : ""} text-zinc-900`}>{value}</p>
    </div>
  );
}
