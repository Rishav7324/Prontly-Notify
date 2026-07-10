import "server-only";
import { getEnv } from "@/lib/env";

let adminApp: any = null;
let firestoreDb: any = null;

function parseServiceAccount(raw: string): any {
  try {
    return JSON.parse(raw);
  } catch {
    try {
      return JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    } catch {
      return null;
    }
  }
}

function getFirestoreApp() {
  if (adminApp) return adminApp;
  const firebaseAdmin = require("firebase-admin");
  const env = getEnv();
  if (!env.FIREBASE_SERVICE_ACCOUNT_JSON) return null;
  const serviceAccount = parseServiceAccount(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  if (!serviceAccount) return null;
  if (firebaseAdmin.apps.length === 0) {
    adminApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  } else {
    adminApp = firebaseAdmin.apps[0];
  }
  return adminApp;
}

export function getFirestore(): any {
  if (firestoreDb) return firestoreDb;
  const app = getFirestoreApp();
  if (!app) return null;
  const firebaseAdmin = require("firebase-admin");
  firestoreDb = firebaseAdmin.firestore();
  firestoreDb.settings({ ignoreUndefinedProperties: true });
  return firestoreDb;
}

export function doc(db: any, path: string, ...pathSegments: string[]) {
  return db.doc([path, ...pathSegments].join("/"));
}

export function collection(db: any, path: string, ...pathSegments: string[]) {
  return db.collection([path, ...pathSegments].join("/"));
}

export function serializeTimestamps(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (obj instanceof Date) return obj.toISOString();
  if (typeof obj.toDate === "function") return obj.toDate().toISOString();
  if (Array.isArray(obj)) return obj.map(serializeTimestamps);
  const result: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    result[k] = serializeTimestamps(v);
  }
  return result;
}
