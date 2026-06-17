import { Coffee } from "lucide-react";

/**
 * Donation button linking to the FinKit Buy Me a Coffee page.
 * Use "variant" to control the visual style:
 *   sidebar — compact inline link
 *   footer   — standalone pill button with label
 */
export default function DonateButton({
  variant = "footer",
}: {
  variant?: "sidebar" | "footer";
}) {
  if (variant === "sidebar") {
    return (
      <a
        href="https://buymeacoffee.com/finkit"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-amber-600"
      >
        <Coffee className="h-4 w-4 shrink-0" />
        Buy Me a Coffee
      </a>
    );
  }

  return (
    <a
      href="https://buymeacoffee.com/finkit"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 hover:border-amber-300 hover:scale-105 active:scale-95"
    >
      <Coffee className="h-4 w-4" />
      Buy Me a Coffee
    </a>
  );
}
