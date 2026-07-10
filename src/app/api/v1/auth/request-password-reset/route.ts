import { NextRequest, NextResponse } from "next/server";
import { generatePasswordResetLink } from "@/lib/email/generate-auth-links";
import { sendTransactionalEmail } from "@/lib/email/brevo-client";
import { checkRateLimit, logEmailSend, checkDailyWarning } from "@/lib/email/rate-limit";
import { renderEmail } from "@/lib/email/render-template";
import { ResetPassword } from "@/emails/reset-password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined;

    const rateCheck = await checkRateLimit({ email, type: "reset_password", ip });
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: rateCheck.reason }, { status: 429 });
    }

    const { link } = await generatePasswordResetLink(email);

    const html = await renderEmail(ResetPassword, { resetLink: link });

    const result = await sendTransactionalEmail({
      to: [{ email }],
      subject: "Reset your password — Prontly Notify",
      htmlContent: html,
    });

    await logEmailSend({
      email,
      type: "reset_password",
      ip,
      messageId: result.messageId,
    });

    const dailyCount = await checkDailyWarning();
    if (dailyCount !== null) {
      console.warn(`[DAILY WARNING] ${dailyCount} emails sent today — approaching Brevo daily limit`);
    }

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to send reset email" },
      { status: 500 }
    );
  }
}
