/**
 * POST /api/send-results
 *
 * Accepts: { email, subject, text }
 * Sends the calculation summary to the provided email address.
 *
 * Security:
 *   - Only POST is accepted
 *   - Email address is validated
 *   - SMTP credentials are never exposed (server-side only)
 *   - No data is stored — fire-and-forget delivery
 */

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendEmail";

export async function POST(request: Request) {
  let body: { email?: string; subject?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, subject, text } = body;

  // Basic validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
  }

  if (!subject || !text) {
    return NextResponse.json({ error: "Subject and text are required" }, { status: 400 });
  }

  // Cap payload size
  if (text.length > 10000 || subject.length > 200) {
    return NextResponse.json({ error: "Content too long" }, { status: 400 });
  }

  try {
    await sendEmail({ to: email.trim(), subject, text });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email delivery failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
