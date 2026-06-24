import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

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
    const { razorpay_payment_id, razorpay_subscription_id, plan_id } = body;

    await executeQuery(
      `UPDATE subscriptions SET
        status = 'active',
        razorpay_subscription_id = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE workspace_id = ?`,
      [razorpay_subscription_id, auth.workspaceId]
    );

    const plan = await executeQuery<any>(
      "SELECT * FROM plans WHERE id = ?",
      [plan_id]
    );

    const wsResult = await executeQuery<any>(
      "UPDATE workspaces SET plan_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
      [plan_id, auth.workspaceId]
    );

    return ok({ activated: true, subscription_id: razorpay_subscription_id });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
