import { Metadata } from "next";

/**
 * Shared dashboard layout — provides consistent padding and max-width.
 * Individual tool pages are rendered as children.
 */
export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
      {children}
    </div>
  );
}
