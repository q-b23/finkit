"use client";

import { useState } from "react";

/* ── Types ── */
interface Debt {
  id: number;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface StrategyResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  timeline: { month: number; name: string; payment: number; interest: number; remaining: number }[];
  milestones: { name: string; month: number }[];
}

/* ── Helpers ── */
const fmt = (n: number): string => {
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
};

function simulate(debts: Debt[], extra: number, sortFn: (a: Debt, b: Debt) => number): StrategyResult {
  const list = debts.map((d) => ({ ...d, balance: d.balance, rate: d.rate / 100 }));
  let month = 0;
  let totalInterest = 0;
  const timeline: StrategyResult["timeline"] = [];
  const milestones: StrategyResult["milestones"] = [];
  const paid = new Set<number>();

  while (list.some((d) => d.balance > 0.01) && month < 600) {
    month++;
    let remaining = extra;
    for (const d of [...list].sort(sortFn)) {
      if (d.balance <= 0.01) continue;
      const interest = (d.balance * d.rate) / 12;
      totalInterest += interest;
      d.balance += interest;
      let payment = Math.min(d.minPayment, d.balance);
      const extraPay = remaining > 0 ? Math.min(remaining, d.balance - payment) : 0;
      payment += extraPay;
      remaining -= extraPay;
      d.balance = Math.max(0, d.balance - payment);
      timeline.push({ month, name: d.name, payment: +payment.toFixed(2), interest: +interest.toFixed(2), remaining: +d.balance.toFixed(2) });
      if (d.balance <= 0.01 && !paid.has(d.id)) {
        paid.add(d.id);
        milestones.push({ name: d.name, month });
      }
    }
    // filter in place
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].balance <= 0.01) list.splice(i, 1);
    }
  }
  return { months: month, totalInterest: +totalInterest.toFixed(2), timeline, milestones };
}

/* ── Components ── */

function DebtRow({ debt, onChange, onRemove, index }: { debt: Debt; onChange: (id: number, field: string, value: string) => void; onRemove: (id: number) => void; index: number }) {
  return (
    <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <button onClick={() => onRemove(debt.id)} className="absolute right-3 top-3 rounded-md p-1.5 text-zinc-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-zinc-600 dark:hover:bg-red-950 dark:hover:text-red-400" title="Remove debt">
        <TrashIcon />
      </button>
      <div className="mb-3">
        <input type="text" value={debt.name} onChange={(e) => onChange(debt.id, "name", e.target.value)} placeholder={`Debt ${index + 1}`} className="w-full border-0 bg-transparent text-sm font-semibold text-zinc-900 outline-none placeholder:text-zinc-300 dark:text-zinc-100 dark:placeholder:text-zinc-600" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: "balance", label: "Balance", prefix: "$", placeholder: "5,000" },
          { key: "rate", label: "APR", prefix: "%", placeholder: "18.9" },
          { key: "minPayment", label: "Min Payment", prefix: "$", placeholder: "150" },
        ].map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-xs font-medium text-zinc-400 dark:text-zinc-500">{f.label}</label>
            <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 focus-within:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-zinc-500">
              <span className="mr-1 text-sm text-zinc-400 dark:text-zinc-500">{f.prefix}</span>
              <input type="number" value={debt[f.key as keyof Debt] || ""} onChange={(e) => onChange(debt.id, f.key, e.target.value)} placeholder={f.placeholder} min="0" step={f.key === "rate" ? "0.1" : "100"} className="w-full border-0 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-300 dark:text-zinc-100 [&::-webkit-inner-spin-button]:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyCard({ name, icon, data, isWinner, savings, totalPrincipal }: { name: string; icon: React.ReactNode; data: StrategyResult; isWinner: boolean; savings: number; totalPrincipal: number }) {
  return (
    <div className={`relative rounded-2xl border p-6 shadow-sm ${isWinner ? "border-emerald-200 bg-emerald-50/30 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"}`}>
      {isWinner && <span className="absolute -top-2.5 right-4 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-white">Best</span>}
      <div className="mb-1 flex items-center gap-2">{icon}<h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3></div>
      <p className="mb-4 text-xs text-zinc-400 dark:text-zinc-500">{name === "Snowball" ? "Smallest balance first" : "Highest APR first"}</p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: `${data.months} mo`, label: "Time to Payoff" },
          { value: fmt(data.totalInterest), label: "Total Interest" },
          { value: fmt(totalPrincipal + data.totalInterest), label: "Total Paid" },
          { value: isWinner ? `-${fmt(savings)}` : `+${fmt(savings)}`, label: isWinner ? "You Save" : "Extra Cost" },
        ].map((s) => (
          <div key={s.label}>
            <p className={`text-lg font-semibold tracking-tight ${isWinner ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-100"}`}>{s.value}</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DebtPayoffPlanner() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Credit Card A", balance: 5000, rate: 24.9, minPayment: 150 },
    { id: 2, name: "Auto Loan", balance: 18000, rate: 6.5, minPayment: 380 },
    { id: 3, name: "Student Loan", balance: 32000, rate: 4.8, minPayment: 350 },
  ]);
  const [extra, setExtra] = useState(500);
  const [result, setResult] = useState<{ snowball: StrategyResult; avalanche: StrategyResult; totalPrincipal: number; savings: number; winner: string } | null>(null);
  const [tab, setTab] = useState<"snowball" | "avalanche">("snowball");

  const addDebt = () => {
    const nextId = Math.max(0, ...debts.map((d) => d.id)) + 1;
    setDebts([...debts, { id: nextId, name: "", balance: 0, rate: 0, minPayment: 0 }]);
  };
  const removeDebt = (id: number) => setDebts(debts.filter((d) => d.id !== id));
  const updateDebt = (id: number, field: string, value: string) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: field === "name" ? value : parseFloat(value) || 0 } : d)));
  };
  const calculate = () => {
    const valid = debts.filter((d) => d.balance > 0 && d.minPayment > 0);
    if (valid.length === 0) return;
    const snow = simulate(valid, extra, (a, b) => a.balance - b.balance);
    const ava = simulate(valid, extra, (a, b) => b.rate - a.rate);
    const principal = valid.reduce((s, d) => s + d.balance, 0);
    const snowTotal = principal + snow.totalInterest;
    const avaTotal = principal + ava.totalInterest;
    setResult({ snowball: { ...snow, totalPaid: +snowTotal.toFixed(2) }, avalanche: { ...ava, totalPaid: +avaTotal.toFixed(2) }, totalPrincipal: principal, savings: Math.abs(snowTotal - avaTotal), winner: snowTotal <= avaTotal ? "snowball" : "avalanche" });
  };

  const totalDebt = debts.reduce((s, d) => s + (d.balance || 0), 0);
  const totalMin = debts.reduce((s, d) => s + (d.minPayment || 0), 0);
  const avgAPR = totalDebt > 0 ? debts.reduce((s, d) => s + (d.balance || 0) * (d.rate || 0), 0) / totalDebt : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      {/* Input Panel */}
      <div className="space-y-5">{/* ... same as preview ... */}</div>
      {/* Results Panel */}
      <div>{/* ... same as preview ... */}</div>
    </div>
  );
}
