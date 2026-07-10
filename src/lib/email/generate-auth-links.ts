import "server-only";
import { getAdminAuth } from "@/lib/auth/firebase-admin";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) throw new Error("Firebase API key not configured");
  return key;
}

async function generateOobLink(params: {
  requestType: string;
  email?: string;
  idToken?: string;
}): Promise<{ oobCode: string; link: string }> {
  const apiKey = getApiKey();
  const continueUrl = `${APP_URL}/auth/${params.requestType === "PASSWORD_RESET" ? "reset-password/confirm" : "verify-email/confirm"}`;

  const body: Record<string, any> = {
    requestType: params.requestType,
    returnOobLink: true,
    continueUrl,
  };
  if (params.email) body.email = params.email;
  if (params.idToken) body.idToken = params.idToken;

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": APP_URL,
        "Referer": APP_URL + "/",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  if (!data.oobLink) {
    throw new Error(data.error?.message || "Failed to generate link");
  }

  const url = new URL(data.oobLink);
  const oobCode = url.searchParams.get("oobCode") || "";
  const mode = params.requestType === "PASSWORD_RESET" ? "resetPassword" : "verifyEmail";
  const linkParams = new URLSearchParams({
    oobCode,
    mode,
    apiKey,
    lang: "en",
    continueUrl,
  });
  const link = `${APP_URL}/auth/${params.requestType === "PASSWORD_RESET" ? "reset-password/confirm" : "verify-email/confirm"}?${linkParams}`;

  return { oobCode, link };
}

export async function generateEmailVerificationLink(
  idToken: string,
  email?: string
): Promise<{ oobCode: string; link: string }> {
  const auth = getAdminAuth();
  if (auth && email && typeof auth.generateEmailVerificationLink === "function") {
    try {
      const link = await auth.generateEmailVerificationLink(email);
      const url = new URL(link);
      const oobCode = url.searchParams.get("oobCode") || "";
      return { oobCode, link };
    } catch (err: any) {
      console.warn("Admin SDK generateEmailVerificationLink failed, falling back to REST:", err?.message);
    }
  }
  return generateOobLink({ requestType: "VERIFY_EMAIL", idToken });
}

export async function generatePasswordResetLink(
  email: string
): Promise<{ oobCode: string; link: string }> {
  const auth = getAdminAuth();
  if (auth && typeof auth.generatePasswordResetLink === "function") {
    try {
      const link = await auth.generatePasswordResetLink(email);
      const url = new URL(link);
      const oobCode = url.searchParams.get("oobCode") || "";
      return { oobCode, link };
    } catch (err: any) {
      console.warn("Admin SDK generatePasswordResetLink failed, falling back to REST:", err?.message);
    }
  }
  return generateOobLink({ requestType: "PASSWORD_RESET", email });
}
