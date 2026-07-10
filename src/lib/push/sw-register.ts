"use client";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { auth } from "@/lib/firebase";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push notifications not supported in this browser");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });

    await navigator.serviceWorker.ready;
    return registration;
  } catch (error) {
    console.error("Service worker registration failed:", error);
    return null;
  }
}

export async function getFCMToken(registration: ServiceWorkerRegistration): Promise<string | null> {
  if (!VAPID_KEY) {
    console.warn("VAPID key not configured");
    return null;
  }

  try {
    const messaging = getMessaging();
    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!currentToken) {
      console.warn("No FCM token returned");
      return null;
    }

    return currentToken;
  } catch (error) {
    console.error("FCM token retrieval failed:", error);
    return null;
  }
}

export async function setupPushNotifications(): Promise<string | null> {
  if (!auth.currentUser) {
    console.warn("User not authenticated for push setup");
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission denied");
    return null;
  }

  const registration = await registerServiceWorker();
  if (!registration) return null;

  return getFCMToken(registration);
}

export function onForegroundMessage(callback: (payload: unknown) => void) {
  try {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, (payload: unknown) => {
      callback(payload);
    });
    return unsubscribe;
  } catch {
    console.warn("Firebase Messaging not available");
    return () => {};
  }
}

export async function subscribeToSite(siteId: string, fcmToken: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/v1/sites/${siteId}/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fcm_token: fcmToken }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
