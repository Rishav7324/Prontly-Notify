import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/auth/firebase-admin";
import { generateEmailVerificationLink } from "@/lib/email/generate-auth-links";
import { sendTransactionalEmail } from "@/lib/email/brevo-client";
import { checkRateLimit, logEmailSend, checkDailyWarning } from "@/lib/email/rate-limit";
import { renderEmail } from "@/lib/email/render-template";
import { VerifyEmail } from "@/emails/verify-email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, email: rawEmail, name } = body;

    if (!idToken) {
      return NextResponse.json({ success: false, error: "Missing idToken" }, { status: 400 });
    }

    let decoded: any;
    try {
      decoded = await verifyIdToken(idToken);
    } catch (err: any) {
      console.error("verifyIdToken failed:", err?.message, err?.code, err?.stack);
      return NextResponse.json({ success: false, error: "Token verification failed" }, { status: 401 });
    }

    if (!decoded || !decoded.uid) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const email = rawEmail || decoded.email;
    if (!email) {
      return NextResponse.json({ success: false, error: "Email not found" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined;

    const rateCheck = await checkRateLimit({ email, type: "verify_email", ip });
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: rateCheck.reason }, { status: 429 });
    }

    let link: string;
    try {
      const result = await generateEmailVerificationLink(idToken);
      link = result.link;
    } catch (err: any) {
      console.error("generateEmailVerificationLink failed:", err?.message, err?.code, err?.stack);
      return NextResponse.json(
        { success: false, error: err?.message || "Failed to generate verification link" },
        { status: 500 }
      );
    }

    const displayName = name || email.split("@")[0] || "there";

    let html: string;
    try {
      html = await renderEmail(VerifyEmail, { name: displayName, verifyLink: link });
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
        to: [{ email, name: displayName }],
        subject: "Verify your email — Prontly Notify",
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
        type: "verify_email",
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
    console.error("send-verification unexpected error:", err?.message, err?.stack);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to send verification email" },
      { status: 500 }
    );
  }
}
