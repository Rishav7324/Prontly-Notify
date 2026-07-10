import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/auth/firebase-admin";
import sendEmail from "@/lib/email";

function verificationEmailHtml(name: string, link: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%">
<tr><td style="padding:32px;background:#1e293b;border-radius:16px;border:1px solid rgba(255,255,255,0.08)">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding-bottom:24px">
<img src="https://prontly.com/logo.png" width="40" height="40" alt="Prontly" style="border-radius:10px">
</td></tr>
<tr><td align="center" style="padding-bottom:8px">
<h1 style="margin:0;font-size:20px;font-weight:700;color:#f8fafc">Verify your email</h1>
</td></tr>
<tr><td align="center" style="padding-bottom:24px">
<p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.6">Hi <strong style="color:#f8fafc">${name}</strong>,<br>click the button below to verify your email address and start using Prontly Notify.</p>
</td></tr>
<tr><td align="center" style="padding-bottom:24px">
<a href="${link}" style="display:inline-block;padding:14px 32px;background:#3b82f6;color:#fff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px">Verify email</a>
</td></tr>
<tr><td align="center">
<p style="margin:0;font-size:12px;color:#64748b">Or paste this link in your browser:<br><a href="${link}" style="color:#3b82f6;word-break:break-all;font-size:12px">${link}</a></p>
</td></tr>
</table>
</td></tr>
<tr><td align="center" style="padding-top:24px">
<p style="margin:0;font-size:11px;color:#475569">Prontly Notify &bull; Push notification platform</p>
</td></tr>
</table>
</td></tr></table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, email: rawEmail, name } = body;
    if (!idToken) {
      return NextResponse.json({ success: false, error: "Missing idToken" }, { status: 400 });
    }

    const decoded = await verifyIdToken(idToken);
    if (!decoded || !decoded.uid) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Firebase API key not configured" }, { status: 500 });
    }

    const continueUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-success`;
    const oobRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken,
          continueUrl,
        }),
      }
    );
    const oobData = await oobRes.json();
    if (!oobData.oobLink) {
      return NextResponse.json(
        { success: false, error: oobData.error?.message || "Failed to generate verification link" },
        { status: 500 }
      );
    }

    const oobCode = new URL(oobData.oobLink).searchParams.get("oobCode") || "";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verifyUrl = `${appUrl}/verify-success?oobCode=${encodeURIComponent(oobCode)}`;

    const email = rawEmail || decoded.email || "there";
    const displayName = name || email.split("@")[0] || "there";
    await sendEmail({
      to: email,
      subject: "Verify your email — Prontly Notify",
      html: verificationEmailHtml(displayName, verifyUrl),
    });

    return NextResponse.json({ success: true, verifyUrl });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send verification email" },
      { status: 500 }
    );
  }
}
