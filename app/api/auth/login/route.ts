/**
 * POST /api/auth/login
 *
 * Accepts: { email: string }
 * Returns:  202 { request_id: string, status: "pending" }
 *
 * Creates an auth request that auto-completes after 5 seconds.
 * The request_id encodes the creation timestamp, so ANY serverless
 * instance can compute elapsed time without shared state.
 *
 * In production: replace simulated auto-complete with real email
 * sending + magic-link callback verification.
 */

import { NextResponse } from "next/server";
import { createRequest, cleanupStore } from "@/lib/auth/request-store";

export async function POST(request: Request) {
  console.log("【API】收到 POST /api/auth/login");

  let body: { email?: string };
  try {
    body = await request.json();
    console.log("【API】解析请求体成功", { email: body.email });
  } catch {
    console.error("【API】无法解析 JSON body");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.error("【API】邮箱地址无效", { email });
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // Generate request ID with embedded timestamp.
  // Status resolution is now deterministic — the status endpoint
  // computes elapsed time from the encoded timestamp without
  // relying on setTimeout or shared server state.
  const requestId = createRequest(email.trim());
  console.log("【API】准备调用 sendEmail → 创建请求", { requestId, email: email.trim() });

  // Clean up old requests
  cleanupStore();

  console.log("【API】返回 202 → 前端应开始轮询 /api/auth/status");
  return NextResponse.json(
    { request_id: requestId, status: "pending" },
    { status: 202 }
  );
}
