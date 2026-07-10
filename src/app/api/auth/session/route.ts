import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/auth/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;
    if (!idToken) {
      return NextResponse.json(
        { success: false, error: "Missing idToken" },
        { status: 400 }
      );
    }

    const decoded = await verifyIdToken(idToken);
    if (!decoded || !decoded.uid) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    const maxAge = 60 * 60 * 24 * 14; // 14 days
    response.cookies.set("__session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 401 }
    );
  }
}
