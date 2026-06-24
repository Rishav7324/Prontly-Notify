import "server-only";
import { getEnv } from "@/lib/env";

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  const env = getEnv();
  if (!env.FCM_SERVICE_ACCOUNT_JSON) {
    throw new Error("FCM_SERVICE_ACCOUNT_JSON not configured");
  }

  const serviceAccount = JSON.parse(
    Buffer.from(env.FCM_SERVICE_ACCOUNT_JSON, "base64").toString("utf-8")
  );

  const jwtPayload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  };

  const jwt = Buffer.from(JSON.stringify(jwtPayload)).toString("base64");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return accessToken!;
}

export interface FcmPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  click_url: string;
  action_buttons?: { label: string; url: string }[];
}

export interface FcmResult {
  success: boolean;
  token: string;
  error?: string;
}

export async function sendNotification(
  payload: FcmPayload,
  fcmToken: string
): Promise<FcmResult> {
  try {
    const token = await getAccessToken();
    const message = {
      message: {
        token: fcmToken,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        webpush: {
          notification: {
            title: payload.title,
            body: payload.body,
            icon: payload.icon,
            image: payload.image,
            requireInteraction: true,
          },
          fcm_options: {
            link: payload.click_url,
          },
        },
      },
    };

    const res = await fetch(
      "https://fcm.googleapis.com/v1/projects/prontly-notify/messages:send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      const errorMsg = err.error?.details?.[0]?.errorCode || err.error?.message || "FCM send failed";
      if (
        errorMsg.includes("UNREGISTERED") ||
        errorMsg.includes("NOT_FOUND") ||
        errorMsg.includes("INVALID_ARGUMENT")
      ) {
        return { success: false, token: fcmToken, error: "UNREGISTERED" };
      }
      return { success: false, token: fcmToken, error: errorMsg };
    }

    return { success: true, token: fcmToken };
  } catch (err: any) {
    return { success: false, token: fcmToken, error: err.message };
  }
}

export async function sendBatch(
  payload: FcmPayload,
  tokens: string[]
): Promise<FcmResult[]> {
  const results: FcmResult[] = [];
  const batchSize = 500;

  for (let i = 0; i < tokens.length; i += batchSize) {
    const batch = tokens.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map((token) => sendNotification(payload, token))
    );

    for (const result of batchResults) {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        results.push({
          success: false,
          token: "unknown",
          error: result.reason?.message || "Unknown error",
        });
      }
    }

    if (i + batchSize < tokens.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}
