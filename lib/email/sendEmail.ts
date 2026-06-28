/**
 * Email delivery service — single abstraction layer for all outgoing email.
 *
 * Architecture:
 *   Business logic → sendEmail() → SMTP provider
 *
 * To swap providers (Resend, Postmark, SES, SendGrid, etc.):
 *   Replace the transporter factory inside getTransporter().
 *   No business logic changes required.
 */

import nodemailer from "nodemailer";

/* ------------------------------------------------------------------ */
/*  Email options                                                     */
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
/*  Transporter factory — swap providers here                         */
/* ------------------------------------------------------------------ */

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP credentials not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

const FROM_ADDRESS = "support@getfinkit.com";

/**
 * Send a single email. Returns the nodemailer info object on success.
 *
 * @throws if SMTP is not configured or delivery fails
 */
export async function sendEmail(options: EmailOptions) {
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: FROM_ADDRESS,
    replyTo: FROM_ADDRESS,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html || options.text,
  });

  return info;
}
