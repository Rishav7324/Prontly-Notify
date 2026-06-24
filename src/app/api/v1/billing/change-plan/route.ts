import { NextRequest } from "next/server";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { createSubscription, cancelSubscription } from "@/lib/billing/razorpay";
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
    await requireRole(auth, ["owner", "admin"]);

    const body = await request.json();
    if (!body.plan_id) return err("plan_id is required", 400);

    const plan = await executeQuery<any>("SELECT * FROM plans WHERE id = ? AND is_active = TRUE", [body.plan_id]);
    if (plan.length === 0) return err("Plan not found", 400);

    const workspace = await executeQuery<any>("SELECT * FROM workspaces WHERE id = ?", [auth.workspaceId]);
    if (workspace.length === 0) return err("Workspace not found", 404);

    const existingSub = await executeQuery<any>(
      "SELECT * FROM subscriptions WHERE workspace_id = ? AND status IN ('active', 'past_due', 'trialing')",
      [auth.workspaceId]
    );

    if (body.plan_id === "free") {
      if (existingSub.length > 0 && existingSub[0].razorpay_subscription_id) {
        await cancelSubscription(existingSub[0].razorpay_subscription_id);
      }
      if (existingSub.length > 0) {
        await executeQuery(
          "UPDATE subscriptions SET plan_id = ?, status = 'active', updated_at = CURRENT_TIMESTAMP WHERE workspace_id = ?",
          ["free", auth.workspaceId]
        );
      }
      await executeQuery(
        "UPDATE workspaces SET plan_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        ["free", auth.workspaceId]
      );
      return ok({ plan_id: "free", message: "Downgraded to Free plan" });
    }

    if (existingSub.length > 0 && existingSub[0].razorpay_subscription_id) {
      await cancelSubscription(existingSub[0].razorpay_subscription_id);
    }

    const env = getEnv();
    const razorpayPlanId = body.razorpay_plan_id || plan[0].id;

    const razorpaySub = await createSubscription({
      planId: razorpayPlanId,
      customerId: workspace[0].razorpay_customer_id || "temp_customer",
      totalCount: 12,
      notes: { workspace_id: auth.workspaceId ?? "" },
    });

    const subId = existingSub.length > 0
      ? existingSub[0].id
      : crypto.randomUUID();

    if (existingSub.length > 0) {
      await executeQuery(
        `UPDATE subscriptions SET plan_id = ?, razorpay_subscription_id = ?, status = 'active',
         current_period_start = CURRENT_TIMESTAMP, current_period_end = datetime('now', '+30 days'),
         updated_at = CURRENT_TIMESTAMP WHERE workspace_id = ?`,
        [body.plan_id, razorpaySub.id, auth.workspaceId]
      );
    } else {
      await executeQuery(
        `INSERT INTO subscriptions (id, workspace_id, plan_id, razorpay_subscription_id, status, current_period_start, current_period_end)
         VALUES (?, ?, ?, ?, 'active', CURRENT_TIMESTAMP, datetime('now', '+30 days'))`,
        [subId, auth.workspaceId, body.plan_id, razorpaySub.id]
      );
    }

    await executeQuery(
      "UPDATE workspaces SET plan_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [body.plan_id, auth.workspaceId]
    );

    return ok({
      plan_id: body.plan_id,
      razorpay_subscription_id: razorpaySub.id,
      short_url: razorpaySub.short_url,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
