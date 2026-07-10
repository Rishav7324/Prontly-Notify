import "server-only";
import { getAdminAuth } from "@/lib/auth/firebase-admin";

function getAppUrl(override?: string): string {
  return process.env.NEXT_PUBLIC_APP_URL || override || "http://localhost:3000";
}

const SCOPE = "https://www.googleapis.com/auth/identitytoolkit";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const FIREBASE_API = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode";

let cachedToken: { token: string; expiry: number } | null = null;

function b64u(s: string): string {
  return btoa(s).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64uDecode(s: string): string {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

async function pemToCryptoKey(pem: string): Promise<CryptoKey> {
  const header = "-----BEGIN PRIVATE KEY-----";
  const footer = "-----END PRIVATE KEY-----";
  const contents = pem.replace(header, "").replace(footer, "").replace(/\s+/g, "");
  const bin = Uint8Array.from(b64uDecode(contents), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    bin.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function signJwt(payload: Record<string, unknown>, privateKey: CryptoKey): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };
  const headerB64 = b64u(JSON.stringify(header));
  const payloadB64 = b64u(JSON.stringify(payload));
  const message = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const sig = await crypto.subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, privateKey, message);
  const sigB64 = b64u(String.fromCharCode(...new Uint8Array(sig)));
  return `${headerB64}.${payloadB64}.${sigB64}`;
}

async function getOAuthToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry - 60000) {
    return cachedToken.token;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON not configured");

  let svc: any;
  try {
    svc = JSON.parse(raw);
  } catch {
    try {
      svc = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    } catch {
      throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON");
    }
  }

  if (!svc.client_email || !svc.private_key) {
    throw new Error("Service account missing client_email or private_key");
  }

  const now = Math.floor(Date.now() / 1000);
  const privateKey = await pemToCryptoKey(svc.private_key);
  const assertion = await signJwt(
    {
      iss: svc.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
    },
    privateKey
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(data.error_description || data.error || "Failed to get OAuth token");
  }

  cachedToken = { token: data.access_token, expiry: now + (data.expires_in || 3600) };
  return data.access_token;
}

async function generateOobLink(params: {
  requestType: string;
  email?: string;
  idToken?: string;
  appUrl?: string;
}): Promise<{ oobCode: string; link: string }> {
  const base = getAppUrl(params.appUrl);
  const path = params.requestType === "PASSWORD_RESET" ? "auth/reset-password/confirm" : "auth/verify-email/confirm";
  const continueUrl = `${base}/${path}`;

  const body: Record<string, any> = {
    requestType: params.requestType,
    returnOobLink: true,
    continueUrl,
  };
  if (params.email) body.email = params.email;
  if (params.idToken) body.idToken = params.idToken;

  const res = await fetch(FIREBASE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getOAuthToken()}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!data.oobLink) {
    throw new Error(data.error?.message || "Failed to generate link");
  }

  const url = new URL(data.oobLink);
  const oobCode = url.searchParams.get("oobCode") || "";
  const mode = params.requestType === "PASSWORD_RESET" ? "resetPassword" : "verifyEmail";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";
  const linkParams = new URLSearchParams({
    oobCode,
    mode,
    apiKey,
    lang: "en",
    continueUrl,
  });
  const link = `${base}/${path}?${linkParams}`;

  return { oobCode, link };
}

export async function generateEmailVerificationLink(
  idToken: string,
  email?: string,
  appUrl?: string
): Promise<{ oobCode: string; link: string }> {
  const base = getAppUrl(appUrl);
  const auth = getAdminAuth();
  if (auth && email && typeof auth.generateEmailVerificationLink === "function") {
    try {
      const link = await auth.generateEmailVerificationLink(email);
      const url = new URL(link);
      const oobCode = url.searchParams.get("oobCode") || "";
      return { oobCode, link };
    } catch (err: any) {
      console.warn("Admin SDK generateEmailVerificationLink failed, falling back to OAuth2:", err?.message);
    }
  }
  return generateOobLink({ requestType: "VERIFY_EMAIL", idToken, appUrl });
}

export async function generatePasswordResetLink(
  email: string,
  appUrl?: string
): Promise<{ oobCode: string; link: string }> {
  const base = getAppUrl(appUrl);
  const auth = getAdminAuth();
  if (auth && typeof auth.generatePasswordResetLink === "function") {
    try {
      const link = await auth.generatePasswordResetLink(email);
      const url = new URL(link);
      const oobCode = url.searchParams.get("oobCode") || "";
      return { oobCode, link };
    } catch (err: any) {
      console.warn("Admin SDK generatePasswordResetLink failed, falling back to OAuth2:", err?.message);
    }
  }
  return generateOobLink({ requestType: "PASSWORD_RESET", email, appUrl });
}
