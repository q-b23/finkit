"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 shrink-0" />
      ) : (
        <Sun className="h-4 w-4 shrink-0" />
      )}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
