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
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON not configured");
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

export async function verifyIdToken(idToken: string) {
  const app = getAdminApp();
  if (!app) throw new Error("Firebase Admin not initialized");
  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    return decoded;
  } catch (err: any) {
    throw new Error(err.message || "Token verification failed");
  }
}

export async function getUser(uid: string) {
  const app = getAdminApp();
  if (!app) throw new Error("Firebase Admin not initialized");
  try {
    const userRecord = await adminAuth.getUser(uid);
    return userRecord;
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch user");
  }
}
