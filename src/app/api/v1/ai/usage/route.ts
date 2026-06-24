import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const auth = await requireAuth();

    const month = new Date().toISOString().slice(0, 7);

    const usage = await executeQuery<any>(
      "SELECT feature, credits_used FROM ai_usage WHERE workspace_id = ? AND month = ?",
      [auth.workspaceId, month]
    );

    const plan = await executeQuery<any>(
      "SELECT p.ai_credit_limit FROM workspaces w JOIN plans p ON w.plan_id = p.id WHERE w.id = ?",
      [auth.workspaceId]
    );

    const totalUsed = usage.reduce((sum: number, row: any) => sum + row.credits_used, 0);
    const limit = plan[0]?.ai_credit_limit || 0;

    return ok({
      month,
      credits_used: totalUsed,
      credits_limit: limit,
      credits_remaining: Math.max(0, limit - totalUsed),
      breakdown: usage,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
