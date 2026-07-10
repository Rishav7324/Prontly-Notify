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

    let link: string;
    try {
      const result = await generatePasswordResetLink(email);
      link = result.link;
    } catch (err: any) {
      console.error("generatePasswordResetLink failed:", err?.message, err?.code, err?.stack);
      return NextResponse.json(
        { success: false, error: err?.message || "Failed to generate reset link" },
        { status: 500 }
      );
    }

    let html: string;
    try {
      html = await renderEmail(ResetPassword, { resetLink: link });
    } catch (err: any) {
      console.error("renderEmail failed:", err?.message, err?.stack);
      return NextResponse.json(
        { success: false, error: "Failed to render email template" },
        { status: 500 }
      );
    }

    let result: { messageId: string };
    try {
      result = await sendTransactionalEmail({
        to: [{ email }],
        subject: "Reset your password — Prontly Notify",
        htmlContent: html,
      });
    } catch (err: any) {
      console.error("sendTransactionalEmail (Brevo) failed:", err?.message, err?.code, err?.stack);
      return NextResponse.json(
        { success: false, error: err?.message || "Failed to send email via Brevo" },
        { status: 500 }
      );
    }

    try {
      await logEmailSend({
        email,
        type: "reset_password",
        ip,
        messageId: result.messageId,
      });
    } catch (err: any) {
      console.error("logEmailSend failed:", err?.message, err?.stack);
    }

    try {
      const dailyCount = await checkDailyWarning();
      if (dailyCount !== null) {
        console.warn(`[DAILY WARNING] ${dailyCount} emails sent today — approaching Brevo daily limit`);
      }
    } catch (err: any) {
      console.error("checkDailyWarning failed:", err?.message, err?.stack);
    }

    return NextResponse.json({ success: true, messageId: result!.messageId });
  } catch (err: any) {
    console.error("request-password-reset unexpected error:", err?.message, err?.stack);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to send reset email" },
      { status: 500 }
    );
  }
}
