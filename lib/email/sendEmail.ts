/**
 * Email delivery service — Resend transport layer.
 *
 * Architecture:
 *   Business logic → sendEmail() → Resend API
 *
 * Debugging:
 *   All errors are logged to console.error with 【Resend】prefix
 *   for easy filtering in Vercel Logs.
 */

import { Resend } from "resend";

/* ------------------------------------------------------------------ */
/*  Email options (unchanged public API)                              */
/* ------------------------------------------------------------------ */

export interface EmailOptions {
  /** Recipient email address */
  to: string;
  /** Email subject line */
  subject: string;
  /** Plain-text body */
  text: string;
  /** Optional HTML body (falls back to text if omitted) */
  html?: string;
}

/* ------------------------------------------------------------------ */
/*  Sender configuration                                              */
/* ------------------------------------------------------------------ */

/**
 * Production sender — requires getfinkit.com to be verified in your
 * Resend dashboard (https://resend.com/domains). If the domain has not
 * been verified yet, Resend will reject the email with a
 * "domain not verified" error.
 *
 * For testing without a verified domain, Resend allows sending from:
 *   "onboarding@resend.dev"
 * Only to the email address associated with your Resend account.
 */
const FROM_ADDRESS = "FinKit <support@getfinkit.com>";
const REPLY_TO = "support@getfinkit.com";

/* ------------------------------------------------------------------ */
/*  Resend client factory                                             */
/* ------------------------------------------------------------------ */

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "【Resend】错误：未读取到 RESEND_API_KEY 环境变量。请在 Vercel → Settings → Environment Variables 中添加 RESEND_API_KEY。"
    );
    throw new Error(
      "Resend API key not configured. Set RESEND_API_KEY environment variable."
    );
  }

  // Log partial key for debugging (first 6 chars only — safe to expose)
  const keyPreview = apiKey.length > 6
    ? apiKey.slice(0, 3) + "…" + apiKey.slice(-3)
    : "***";
  console.log(`【Resend】已读取 RESEND_API_KEY（预览: ${keyPreview}）`);

  return new Resend(apiKey);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

/**
 * Send a single email via Resend.
 *
 * @throws if RESEND_API_KEY is not configured or delivery fails
 */
export async function sendEmail(options: EmailOptions): Promise<{ id: string }> {
  console.log("【Resend】准备发送邮件 →", {
    to: options.to,
    subject: options.subject,
    textLength: options.text.length,
    hasHtml: !!options.html,
  });

  // Validate input
  if (!options.to || !options.subject || !options.text) {
    console.error("【Resend】错误：缺少必填字段", {
      hasTo: !!options.to,
      hasSubject: !!options.subject,
      hasText: !!options.text,
    });
    throw new Error("Missing required email fields: to, subject, text");
  }

  let resend: Resend;
  try {
    resend = getResend();
  } catch (err) {
    console.error("【Resend】客户端初始化失败:", err instanceof Error ? err.message : err);
    throw err;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      replyTo: REPLY_TO,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    // Resend SDK returns { data, error }
    if (result.error) {
      console.error("【Resend 发送失败日志】:", JSON.stringify(result.error, null, 2));
      throw new Error(`Resend delivery failed: ${result.error.message}`);
    }

    if (!result.data?.id) {
      console.error("【Resend】错误：返回数据缺少 email ID", result.data);
      throw new Error("Resend returned success but missing email ID");
    }

    console.log("【Resend】邮件发送成功 → ID:", result.data.id);
    return result.data as { id: string };

  } catch (err) {
    // Log the full error object for Vercel Logs debugging
    if (err instanceof Error) {
      console.error("【Resend 发送失败日志】:", {
        message: err.message,
        name: err.name,
        stack: err.stack?.split("\n").slice(0, 3).join("\n"),
      });
    } else {
      console.error("【Resend 发送失败日志】:", err);
    }

    // Common Resend error patterns — provide actionable diagnostics
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("domain not verified") || msg.includes("from") && msg.includes("valid")) {
      console.error(
        "【Resend】诊断：域名未验证。请在 https://resend.com/domains 中验证 getfinkit.com"
      );
    } else if (msg.includes("api_key") || msg.includes("unauthorized") || msg.includes("401")) {
      console.error(
        "【Resend】诊断：API Key 无效。请检查 Vercel 中的 RESEND_API_KEY 是否正确。"
      );
    } else if (msg.includes("rate") || msg.includes("429")) {
      console.error("【Resend】诊断：触发速率限制。Resend 免费计划每天 100 封。");
    }

    // Re-throw so the API route can return a safe user-facing message
    throw err;
  }
}
