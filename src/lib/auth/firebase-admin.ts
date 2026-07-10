import "server-only";
import { getEnv } from "@/lib/env";

let adminApp: any = null;
let adminAuth: any = null;

function getAdminApp() {
  if (adminApp) return adminApp;
  try {
    const firebaseAdmin = require("firebase-admin");
    const env = getEnv();
    if (!env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      return null;
    }
    const serviceAccount = JSON.parse(
      Buffer.from(env.FIREBASE_SERVICE_ACCOUNT_JSON, "base64").toString("utf-8")
    );
    adminApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
    adminAuth = firebaseAdmin.auth();
    return adminApp;
  } catch {
    return null;
  }
}

async function verifyWithRestApi(idToken: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) throw new Error("Firebase API key not configured");
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );
  const data = await res.json();
  if (!data.users || data.users.length === 0) {
    throw new Error(data.error?.message || "Token verification failed");
  }
  return {
    uid: data.users[0].localId,
    email: data.users[0].email || null,
    email_verified: data.users[0].emailVerified || false,
    is_staff: false,
  };
}

export async function verifyIdToken(idToken: string) {
  const app = getAdminApp();
  if (app) {
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      return decoded;
    } catch (err: any) {
      throw new Error(err.message || "Token verification failed");
    }
  }
  return verifyWithRestApi(idToken);
}

export async function getUser(uid: string) {
  const app = getAdminApp();
  if (app) {
    try {
      const userRecord = await adminAuth.getUser(uid);
      return userRecord;
    } catch (err: any) {
      throw new Error(err.message || "Failed to fetch user");
    }
  }
  return null;
}

export async function getUserByEmail(email: string) {
  const app = getAdminApp();
  if (app) {
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      return userRecord;
    } catch {
      return null;
    }
  }
  return null;
}

export async function generatePasswordResetLink(email: string) {
  const env = getEnv();
  const apiKey = env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return null;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
    }
  );
  const data = await res.json();
  return data.oobLink || null;
}

export { getAdminApp };
