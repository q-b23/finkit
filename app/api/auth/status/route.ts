/**
 * GET /api/auth/status?request_id=xxx
 *
 * Returns: { status: "pending" | "complete" | "failed", token?: string }
 *
 * Status is computed deterministically:
 * - Checks local in-memory Map (same-instance cache).
 * - Falls back to elapsed-time computation from the encoded request_id
 *   (works across different serverless instances).
 */

import { NextResponse } from "next/server";
import { getRequest, cleanupStore } from "@/lib/auth/request-store";

export async function GET(request: Request) {
  console.log("【API】收到 GET /api/auth/status");

  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get("request_id");

  if (!requestId) {
    console.error("【API】缺少 request_id 参数");
    return NextResponse.json({ error: "Missing request_id" }, { status: 400 });
  }

  console.log("【API】查询状态", { requestId });

  const req = getRequest(requestId);
  if (!req) {
    console.error("【API】请求未找到（已过期或无效）", { requestId });
    return NextResponse.json(
      { status: "failed", error: "Request not found or expired" },
      { status: 404 }
    );
  }

  cleanupStore();

  console.log("【API】返回状态", { requestId, status: req.status, hasToken: !!req.token });
  return NextResponse.json({
    status: req.status,
    token: req.token,
  });
}
