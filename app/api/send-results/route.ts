/**
 * POST /api/send-results
 *
 * Accepts: { email, subject, text }
 * Sends the calculation summary to the provided email address.
 *
 * Security:
 *   - Only POST is accepted
 *   - Email address is validated
 *   - RESEND_API_KEY is never exposed (server-side only)
 *   - No data is stored — fire-and-forget delivery
 */

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendEmail";

export async function POST(request: Request) {
  console.log("【API】收到 POST /api/send-results");

  let body: { email?: string; subject?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    console.error("【API】无法解析 JSON body");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, subject, text } = body;

  // Basic validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.error("【API】邮箱地址无效", { email });
    return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
  }

  if (!subject || !text) {
    console.error("【API】缺少必填字段", { hasSubject: !!subject, hasText: !!text });
    return NextResponse.json({ error: "Subject and text are required" }, { status: 400 });
  }

  // Cap payload size
  if (text.length > 10000 || subject.length > 200) {
    console.error("【API】内容超长", { textLength: text.length, subjectLength: subject.length });
    return NextResponse.json({ error: "Content too long" }, { status: 400 });
  }

  console.log("【API】准备调用 sendEmail", { to: email.trim(), subject, textLength: text.length });

  try {
    await sendEmail({ to: email.trim(), subject, text });
    console.log("【API】sendEmail 返回成功");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("【API】sendEmail 抛出异常:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
