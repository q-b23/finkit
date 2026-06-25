import Logo from "@/components/Logo";
import Link from "next/link";
import DonateButton from "@/components/DonateButton";
import { KoFiLink } from "@/components/KoFiSupport";

/**
 * Minimal footer rendered at the bottom of every page via the root layout.
 * Links to privacy policy and GitHub repo.
 */
export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="px-6 py-8 md:ml-64 md:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
          <p className="text-xs text-zinc-400">
            Make your housing decision with confidence. Everything runs locally.
          </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Privacy
            </Link>
            <a
              href="https://github.com/q-b23/finkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              GitHub
            </a>

            <DonateButton variant="footer" />
          </div>
        </div>

        {/* Ko-fi support row */}
        <div className="mt-6 pt-5 border-t border-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            Help keep FinKit free &mdash; no ads, no subscriptions, no data selling.
          </p>
          <KoFiLink />
        </div>
      </div>
    </footer>
  );
}
