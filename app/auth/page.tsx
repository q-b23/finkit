import { Metadata } from "next";
import { AuthCard } from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to FinKit to sync your financial plans across devices. Your data stays private and encrypted.",
};

/**
 * Auth page — renders the AuthCard component in a centered layout.
 */
export default function AuthPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg items-center px-6 py-16 md:min-h-screen md:py-24">
      <AuthCard />
    </div>
  );
}
