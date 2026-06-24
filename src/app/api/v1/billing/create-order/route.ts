import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { getEnv } from "@/lib/env";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    const { plan_id } = body;

    if (!plan_id) return err("plan_id is required", 400);

    const plans = await executeQuery<any>(
      "SELECT * FROM plans WHERE id = ?",
      [plan_id]
    );
    if (plans.length === 0) return err("Plan not found", 404);
    const plan = plans[0];

    if (!plan.razorpay_plan_id) {
      return err("Razorpay plan ID not configured", 500);
    }

    const env = getEnv();
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      return err("Razorpay not configured", 500);
    }

    const authHeader = Buffer.from(
      `${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`
    ).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: plan.razorpay_plan_id,
        customer_notify: true,
        total_count: 12,
        notes: {
          workspace_id: auth.workspaceId || "",
          user_id: auth.userId,
        },
      }),
    });

    const subscription = await res.json();

    if (!res.ok) {
      return err(subscription.error?.description || "Failed to create subscription", 400);
    }

    const now = new Date().toISOString();
    const end = new Date(Date.now() + 30 * 86400000).toISOString();

    await executeQuery(
      `UPDATE subscriptions SET
        razorpay_subscription_id = ?,
        plan_id = ?,
        status = 'created',
        current_period_start = ?,
        current_period_end = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE workspace_id = ?`,
      [subscription.id, plan_id, now, end, auth.workspaceId]
    );

    return ok({ subscription_id: subscription.id, amount: plan.price_monthly * 100 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
