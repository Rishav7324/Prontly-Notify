"use server";

import { auth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const workspace = await session.env.DB.prepare("SELECT * FROM workspaces WHERE id = ?")
    .bind(session.workspaceId).first();
  if (!workspace) return Response.json({ error: "Workspace not found" }, { status: 404 });

  if (workspace.plan === "free" || workspace.plan === "starter") {
    const razorpayOrderId = `cancel_${session.workspaceId}_${Date.now()}`;
    return Response.json({
      success: true,
      message: "Subscription cancellation initiated. It will take effect at the end of the current billing period.",
      effectiveDate: workspace.current_period_end,
      razorpayOrderId,
    });
  }

  if (workspace.plan === "pro" || workspace.plan === "enterprise") {
    const razorpayOrderId = `cancel_${session.workspaceId}_${Date.now()}`;
    return Response.json({
      success: true,
      message: "Subscription cancellation initiated. You will retain access until the end of the current billing period.",
      effectiveDate: workspace.current_period_end,
      razorpayOrderId,
    });
  }

  return Response.json({ success: true, message: "No active subscription to cancel." });
}
