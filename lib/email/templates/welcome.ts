/**
 * Welcome email template — sent once on first successful login.
 */

export interface WelcomeEmailParams {
  /** Recipient email address */
  to: string;
}

const BASE_URL = process.env.FINKIT_BASE_URL ?? "https://getfinkit.com";

export function welcomeEmail(params: WelcomeEmailParams) {
  const subject = "Welcome to FinKit — Make Your Housing Decision with Confidence";

  const text = `Welcome to FinKit!

Thank you for signing in. FinKit helps you make smarter housing decisions
with free, private tools that run directly in your browser.

Available calculators:

• Mortgage Affordability — check your stress score before you buy
• Rent vs Buy — compare the real 5‑year cost
• Hidden Housing Costs — see what your mortgage doesn't show
• Mortgage vs Invest — should you pay down or invest?
• Market Timing — is now the right time to buy?

Start here: ${BASE_URL}

Future reports can be delivered directly to this email.

— The FinKit Team`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 16px; color: #18181b;">
  <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Welcome to FinKit</h1>
  <p style="font-size: 16px; color: #52525b; margin: 0 0 24px; line-height: 1.6;">
    Thank you for signing in. FinKit helps you make smarter housing decisions
    with free, private tools that run directly in your browser.
  </p>

  <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px;">Available Calculators</h2>
  <ul style="padding: 0; margin: 0 0 24px; list-style: none;">
    <li style="padding: 6px 0; font-size: 15px; color: #3f3f46;">Mortgage Affordability</li>
    <li style="padding: 6px 0; font-size: 15px; color: #3f3f46;">Rent vs Buy</li>
    <li style="padding: 6px 0; font-size: 15px; color: #3f3f46;">Hidden Housing Costs</li>
    <li style="padding: 6px 0; font-size: 15px; color: #3f3f46;">Mortgage vs Invest</li>
    <li style="padding: 6px 0; font-size: 15px; color: #3f3f46;">Market Timing</li>
  </ul>

  <a href="${BASE_URL}" style="display: inline-block; background: #18181b; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    Start Exploring
  </a>

  <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0 16px;">
  <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
    Future reports can be delivered directly to this email.
  </p>
</body>
</html>`;

  return { subject, text, html };
}
