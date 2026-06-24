import { generateId } from "@/lib/utils";

const CSRF_COOKIE = "csrf-token";
const CSRF_HEADER = "x-csrf-token";

function getSecret(): Uint8Array {
  const secret = process.env.CSRF_SECRET ?? "prontly-csrf-secret-change-in-production";
  return new TextEncoder().encode(secret.padEnd(32, "0").slice(0, 32));
}

async function sign(value: string): Promise<string> {
  const secret = getSecret();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  const buf = new Uint8Array(signature);
  const sigHex = Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${value}.${sigHex}`;
}

async function verify(value: string): Promise<boolean> {
  const lastDot = value.lastIndexOf(".");
  if (lastDot === -1) return false;
  const message = value.slice(0, lastDot);
  const expectedSig = value.slice(lastDot + 1);

  const secret = getSecret();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  const buf = new Uint8Array(signature);
  const sigHex = Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return sigHex === expectedSig;
}

export async function generateToken(): Promise<string> {
  return sign(generateId());
}

export async function verifyToken(token: string): Promise<boolean> {
  return verify(token);
}

export function getCsrfCookieName(): string {
  return CSRF_COOKIE;
}

export function getCsrfHeaderName(): string {
  return CSRF_HEADER;
}
