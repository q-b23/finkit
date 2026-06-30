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

/** Seconds before a Resend API call is considered timed out. */
const RESEND_TIMEOUT_MS = 15_000;

/* ------------------------------------------------------------------ */
/*  Resend client factory                                             */
/* ------------------------------------------------------------------ */

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("【Resend】错误：未读取到 RESEND_API_KEY。");
    console.error("【Resend】请检查：");
    console.error("【Resend】  - Vercel Project Settings");
    console.error("【Resend】  - Environment Variables");
    console.error("【Resend】  - Production 环境是否添加");
    console.error("【Resend】  - 修改后是否重新 Deploy");
    throw new Error(
      "Resend API key not configured. Set RESEND_API_KEY environment variable."
    );
  }

  // Safe key preview: first 3 chars + ... + last 3 chars
  const preview = apiKey.length > 6
    ? apiKey.slice(0, 3) + "..." + apiKey.slice(-3)
    : "***";
  console.log(`【Resend】API Key 已加载：${preview}`);

  return new Resend(apiKey);
}

/* ------------------------------------------------------------------ */
/*  Error diagnosis                                                   */
/* ------------------------------------------------------------------ */

function diagnoseError(err: unknown): void {
  const msg = err instanceof Error ? err.message : String(err);

  if (/domain/i.test(msg)) {
    console.error("【Resend】诊断：域名可能未验证。请检查 Resend Domains。");
    console.error("【Resend】  → https://resend.com/domains");
  } else if (/401|unauthorized/i.test(msg)) {
    console.error("【Resend】诊断：API Key 无效或权限不足。");
  } else if (/429|rate/i.test(msg)) {
    console.error("【Resend】诊断：可能触发 Resend 免费额度限制。");
  } else if (/fetch|network|timeout/i.test(msg)) {
    console.error("【Resend】诊断：可能是网络异常或 Resend 服务暂时不可用。");
  }
}

/* ------------------------------------------------------------------ */
/*  Timeout helper                                                    */
/* ------------------------------------------------------------------ */

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Resend request timeout")), ms)
    ),
  ]);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

/**
 * Send a single email via Resend.
 *
 * @throws if RESEND_API_KEY is not configured, parameters are invalid,
 *         the request times out, or delivery fails
 */
export async function sendEmail(options: EmailOptions): Promise<{ id: string }> {
  // ── 1. Pre-send log ──────────────────────────────────────────────
  console.log("【Resend】准备发送邮件", {
    to: options.to,
    subject: options.subject,
    from: FROM_ADDRESS,
    nodeEnv: process.env.NODE_ENV,
  });

  // ── 2. Parameter validation ──────────────────────────────────────
  if (!options.to || !options.subject || !options.text) {
    console.error("【Resend】参数错误", {
      hasTo: !!options.to,
      hasSubject: !!options.subject,
      hasText: !!options.text,
    });
    throw new Error("Missing required email fields: to, subject, text");
  }

  // ── 3. Resend client init ────────────────────────────────────────
  let resend: Resend;
  try {
    resend = getResend();
  } catch (err) {
    // Error already logged inside getResend(); re-throw unchanged
    throw err;
  }

  // ── 4. Send with timeout + full try/catch ────────────────────────
  try {
    const result = await withTimeout(
      resend.emails.send({
        from: FROM_ADDRESS,
        replyTo: REPLY_TO,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      }),
      RESEND_TIMEOUT_MS
    );

    // Resend SDK returns { data, error }
    if (result.error) {
      console.error("【Resend】发送失败", result.error);
      diagnoseError(new Error(result.error.message));
      throw new Error(`Resend delivery failed: ${result.error.message}`);
    }

    if (!result.data?.id) {
      const err = new Error("Resend returned success but missing email ID");
      console.error("【Resend】发送失败", err);
      throw err;
    }

    // ── 5. Success log ─────────────────────────────────────────────
    console.log("【Resend】发送成功", {
      messageId: result.data.id,
      to: options.to,
      subject: options.subject,
    });

    return result.data as { id: string };

  } catch (err) {
    // ── 6. Error log + diagnosis ───────────────────────────────────
    console.error("【Resend】发送失败", err);
    diagnoseError(err);

    // Re-throw so the API route can return a safe user-facing message
    throw err;
  }
}
