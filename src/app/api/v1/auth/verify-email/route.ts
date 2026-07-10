import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oobCode, firebaseUid } = body;
    if (!oobCode) {
      return NextResponse.json({ success: false, error: "Missing oobCode" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Firebase API key not configured" }, { status: 500 });
    }

    const verifyRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oobCode, verifyEmail: true }),
      }
    );
    const verifyData = await verifyRes.json();

    if (verifyData.error) {
      return NextResponse.json(
        { success: false, error: verifyData.error.message || "Verification failed" },
        { status: 400 }
      );
    }

    if (firebaseUid) {
      await executeQuery(
        "UPDATE users SET email_verified = true, updated_at = CURRENT_TIMESTAMP WHERE firebase_uid = ?",
        [firebaseUid]
      );
    }

    return NextResponse.json({
      success: true,
      email: verifyData.email || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Verification failed" },
      { status: 500 }
    );
  }
}
