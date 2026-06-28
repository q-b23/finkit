/**
 * Email delivery service — Resend transport layer.
 *
 * Architecture:
 *   Business logic → sendEmail() → Resend API
 *
 * To swap providers: replace the transporter here.
 * No business logic changes required.
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
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const FROM_ADDRESS = "FinKit <support@getfinkit.com>";
const REPLY_TO = "support@getfinkit.com";

/* ------------------------------------------------------------------ */
/*  Resend client factory                                             */
/* ------------------------------------------------------------------ */

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Resend API key not configured. Set RESEND_API_KEY environment variable."
    );
  }
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
export async function sendEmail(options: EmailOptions) {
  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    replyTo: REPLY_TO,
    to: [options.to],
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }

  return data;
}
