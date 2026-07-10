import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/auth/firebase-admin";
import { generateEmailVerificationLink } from "@/lib/email/generate-auth-links";
import { sendTransactionalEmail } from "@/lib/email/brevo-client";
import { checkRateLimit, logEmailSend } from "@/lib/email/rate-limit";
import { renderEmail } from "@/lib/email/render-template";
import { VerifyEmail } from "@/emails/verify-email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json({ success: false, error: "Missing idToken" }, { status: 400 });
    }

    const decoded = await verifyIdToken(idToken);
    if (!decoded || !decoded.uid) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const email = decoded.email;
    if (!email) {
      return NextResponse.json({ success: false, error: "Email not found" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined;

    const rateCheck = await checkRateLimit({ email, type: "verify_email", ip });
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: rateCheck.reason }, { status: 429 });
    }

    const { link } = await generateEmailVerificationLink(idToken);
    const displayName = decoded.email?.split("@")[0] || "there";

    const html = await renderEmail(VerifyEmail, { name: displayName, verifyLink: link });

    const result = await sendTransactionalEmail({
      to: [{ email, name: displayName }],
      subject: "Verify your email — Prontly Notify",
      htmlContent: html,
    });

    await logEmailSend({
      email,
      type: "verify_email",
      ip,
      messageId: result.messageId,
    });

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to resend verification email" },
      { status: 500 }
    );
  }
}
