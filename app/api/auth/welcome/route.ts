/**
 * POST /api/auth/welcome
 *
 * Sends the welcome email on first successful login.
 * Called by the frontend after authentication completes.
 *
 * Idempotent: the frontend tracks `welcomeEmailSent` in localStorage
 * and only calls this endpoint once per user.
 */

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendEmail";
import { welcomeEmail } from "@/lib/email/templates/welcome";

export async function POST(request: Request) {
  console.log("[WELCOME] preparing");

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    console.error("[WELCOME] failed — invalid JSON");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.error("[WELCOME] failed — invalid email", { email });
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const { subject, text, html } = welcomeEmail({ to: email.trim() });

  try {
    console.log("[WELCOME] sending", { to: email.trim() });
    await sendEmail({ to: email.trim(), subject, text, html });
    console.log("[WELCOME] success", { to: email.trim() });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("[WELCOME] failed", err);
    return NextResponse.json(
      { error: "Failed to send welcome email" },
      { status: 500 }
    );
  }
}
