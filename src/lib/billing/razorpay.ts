import "server-only";
import { getEnv } from "@/lib/env";

function getClient() {
  const env = getEnv();
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay not configured");
  }
  const auth = Buffer.from(
    `${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");
  return { auth, keyId: env.RAZORPAY_KEY_ID, keySecret: env.RAZORPAY_KEY_SECRET };
}

export async function createSubscription(params: {
  planId: string;
  customerId: string;
  totalCount: number;
  notes?: Record<string, string>;
}) {
  const { auth } = getClient();
  const res = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: params.planId,
      customer_id: params.customerId,
      total_count: params.totalCount,
      notes: params.notes,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.description || "Failed to create subscription");
  }

  return res.json();
}

export async function cancelSubscription(subscriptionId: string) {
  const { auth } = getClient();
  const res = await fetch(
    `https://api.razorpay.com/v1/subscriptions/${subscriptionId}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.description || "Failed to cancel subscription");
  }

  return res.json();
}

export async function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): Promise<boolean> {
  try {
    const crypto = await import("crypto");
    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");
    return expected === signature;
  } catch {
    return false;
  }
}

export async function retryPayment(
  subscriptionId: string,
  paymentId: string
) {
  const { auth } = getClient();
  const res = await fetch(
    `https://api.razorpay.com/v1/payments/${paymentId}/retry`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription_id: subscriptionId }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.description || "Failed to retry payment");
  }

  return res.json();
}
