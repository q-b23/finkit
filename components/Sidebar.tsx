"use client";

import Logo from "@/components/Logo";
import DonateButton from "@/components/DonateButton";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Flame,
  Scale,
  Banknote,
  LogIn,
  Menu,
  X,
  BookOpen,
  Newspaper,
  Home,
  ArrowLeftRight,
  Clock,
  PiggyBank,
} from "lucide-react";

/**
 * Navigation items rendered in the sidebar.
 * Ordered by priority: housing decisions first, then tools, then content.
 */
const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/decision/mortgage", label: "Affordability", icon: Home },
  { href: "/decision/rent-vs-buy", label: "Rent vs Buy", icon: ArrowLeftRight },
  { href: "/decision/timing", label: "Market Timing", icon: Clock },
  { href: "/decision/mortgage-vs-invest", label: "Pay Down or Invest", icon: PiggyBank },
  { href: "/dashboard/debt", label: "Debt Planner", icon: Scale },
  { href: "/dashboard/fire", label: "FIRE Calculator", icon: Flame },
  { href: "/dashboard/loan", label: "Loan Compare", icon: Banknote },
  { href: "/guides", label: "Guides", icon: BookOpen },
  { href: "/blog", label: "Blog", icon: Newspaper },
] as const;

/**
 * Renders a single sidebar link with active-state highlighting.
 */
function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-100 text-zinc-900"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

/**
 * Responsive sidebar that collapses into a hamburger menu on mobile.
 * Desktop: fixed left sidebar (w-64).
 * Mobile: overlay drawer triggered by hamburger in a top header bar.
 */
export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Determine whether a nav item is active.
   * Root path "/" is only active on exact match; dashboard sub-routes
   * use startsWith to catch nested routes.
   */
  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-4"
        onClick={() => setMobileOpen(false)}
      >
        <Logo />
        <span className="text-lg font-semibold tracking-tight text-zinc-900">
          FinKit
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-100 px-3 py-4">
        <DarkModeToggle />

        <Link
          href="/auth"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive("/auth")
              ? "bg-zinc-100 text-zinc-900"
              : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
          }`}
        >
          <LogIn className="h-4 w-4 shrink-0" />
          Sign In
        </Link>

        <p className="mt-3 px-3 text-[11px] leading-relaxed text-zinc-300">
          Make your housing decision with confidence.
          <br />
          Everything runs locally.
        </p>

        <DonateButton variant="sidebar" />
      </div>
    </div>
  );

  return (
    <>
      {/* ---- Desktop Sidebar ---- */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-zinc-100 bg-white md:flex">
        {sidebarContent}
      </aside>

      {/* ---- Mobile Top Bar + Drawer ---- */}
      <div className="md:hidden">
        {/* Top header */}
        <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-100 bg-white px-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <Logo className="h-7 w-7" />
            <span className="text-base font-semibold tracking-tight text-zinc-900">
              FinKit
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </header>

        {/* Mobile drawer overlay */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            {/* Drawer panel */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
              {sidebarContent}
            </aside>
          </>
        )}
      </div>
    </>
  );
}
