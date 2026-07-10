import "server-only";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) throw new Error("Firebase API key not configured");
  return key;
}

export async function generateEmailVerificationLink(
  idToken: string
): Promise<{ oobCode: string; link: string }> {
  const apiKey = getApiKey();
  const continueUrl = `${APP_URL}/auth/verify-email/confirm`;

  const res = await fetch(
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

  const data = await res.json();
  if (!data.oobLink) {
    throw new Error(data.error?.message || "Failed to generate verification link");
  }

  const url = new URL(data.oobLink);
  const oobCode = url.searchParams.get("oobCode") || "";
  const link = `${APP_URL}/auth/verify-email/confirm?oobCode=${encodeURIComponent(oobCode)}&mode=verifyEmail&apiKey=${apiKey}&lang=en`;

  return { oobCode, link };
}

export async function generatePasswordResetLink(
  email: string
): Promise<{ oobCode: string; link: string }> {
  const apiKey = getApiKey();
  const continueUrl = `${APP_URL}/auth/reset-password/confirm`;

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
        continueUrl,
      }),
    }
  );

  const data = await res.json();
  if (!data.oobLink) {
    throw new Error(data.error?.message || "Failed to generate reset link");
  }

  const url = new URL(data.oobLink);
  const oobCode = url.searchParams.get("oobCode") || "";
  const link = `${APP_URL}/auth/reset-password/confirm?oobCode=${encodeURIComponent(oobCode)}&mode=resetPassword&apiKey=${apiKey}&lang=en`;

  return { oobCode, link };
}
