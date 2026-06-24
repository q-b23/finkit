import Link from "next/link";
import { Home, AlertTriangle, ArrowLeftRight, EyeOff } from "lucide-react";

export const metadata = {
  title: "Page Not Found — FinKit",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
          404
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-3">
          This page does not exist
        </h1>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          But your housing questions do. Here are the tools that actually help.
        </p>

        <div className="space-y-3">
          <Link
            href="/decision/mortgage"
            className="flex items-center gap-3 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 hover:bg-red-400 transition-colors"
          >
            <AlertTriangle className="h-5 w-5" />
            Mortgage Stress Test
          </Link>
          <Link
            href="/decision/rent-vs-buy"
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 hover:border-zinc-300 transition-colors"
          >
            <ArrowLeftRight className="h-5 w-5 text-zinc-400" />
            Rent vs Buy Calculator
          </Link>
          <Link
            href="/hidden-housing-costs"
            className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 hover:border-zinc-300 transition-colors"
          >
            <EyeOff className="h-5 w-5 text-zinc-400" />
            Hidden Housing Costs
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mt-4 text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to FinKit Home
          </Link>
        </div>
      </div>
    </div>
  );
}
