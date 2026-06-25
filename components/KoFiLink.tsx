import { Heart } from "lucide-react";

const KOFI_URL = "https://ko-fi.com/finkit";

export default function KoFiLink({ variant = "footer" }: { variant?: "footer" | "sidebar" }) {
  if (variant === "sidebar") {
    return (
      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-amber-600"
      >
        <Heart className="h-4 w-4 shrink-0" />
        Support FinKit
      </a>
    );
  }

  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
    >
      Support FinKit on Ko-fi
    </a>
  );
}
