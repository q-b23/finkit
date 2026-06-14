"use client";

import { useState } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  tags: string[];
  accent: string;
}

const tools: Tool[] = [
  {
    id: "fire",
    name: "FIRE Calculator",
    description: "Project compound growth, find your FIRE number, and discover your Coast FIRE age — all inflation-adjusted.",
    icon: "🔥",
    href: "/dashboard/fire",
    tags: ["Compound Growth", "4% Rule", "Coast FIRE"],
    accent: "bg-amber-500",
  },
  {
    id: "debt",
    name: "Debt Payoff Planner",
    description: "Compare snowball vs avalanche strategies. See your exact debt-free date and track every milestone.",
    icon: "📋",
    href: "/dashboard/debt",
    tags: ["Snowball vs Avalanche", "Amortization Table", "CSV Export"],
    accent: "bg-emerald-500",
  },
  {
    id: "loan-compare",
    name: "Loan Comparison",
    description: "Compare multiple loan offers side by side. Monthly payments, total cost, and a composite score for the best deal.",
    icon: "🏦",
    href: "/dashboard/loan",
    tags: ["Multi-Loan Compare", "PMT Calculator", "Visual Charts"],
    accent: "bg-blue-500",
  },
  {
    id: "loan-matrix",
    name: "Loan Matrix",
    description: "Head-to-head loan comparison. See which option saves you the most in interest and monthly payments.",
    icon: "📊",
    href: "/dashboard/loans",
    tags: ["Side-by-Side", "Interest Savings", "2-Option Compare"],
    accent: "bg-violet-500",
  },
];

const StatsBar = () => (
  <div className="grid grid-cols-4 gap-4">
    {[
      { value: "4", label: "Core Tools" },
      { value: "0", label: "Data Uploaded" },
      { value: "100%", label: "Open Source" },
      { value: "Local", label: "All Computation" },
    ].map((stat) => (
      <div
        key={stat.label}
        className="rounded-xl border border-zinc-200 bg-white px-4 py-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
      >
        <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {stat.value}
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
);

const Navbar = () => (
  <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-950">
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        FinKit
      </span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        Jun 14, 2026
      </span>
      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
    </div>
  </nav>
);

const ToolCard = ({ tool }: { tool: Tool }) => (
  <a
    href={tool.href}
    className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
  >
    <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${tool.accent}`} />
    <span className="mb-4 text-2xl">{tool.icon}</span>
    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
      {tool.name}
    </h3>
    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
      {tool.description}
    </p>
    <div className="mt-4 flex flex-wrap gap-2">
      {tool.tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
        >
          {tag}
        </span>
      ))}
    </div>
  </a>
);

const Footer = () => (
  <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
    All calculations happen locally in your browser.<br />
    We never store or share your financial data.{" "}
    <a href="https://github.com/q-b23/finkit" className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300">
      Verify on GitHub
    </a>
  </p>
);

export default function Dashboard() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {greeting}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Choose a tool to start planning your financial future.
          </p>
        </div>

        <StatsBar />

        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Your Tools
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}
