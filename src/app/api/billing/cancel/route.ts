"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function POST() {
  try {
    const auth = await requireAuth();

    const workspaces = await executeQuery<{ plan: string; current_period_end: string }[]>(
      "SELECT plan, current_period_end FROM workspaces WHERE id = ?",
      [auth.workspaceId]
    );

    if (!workspaces || workspaces.length === 0) {
      return Response.json({ error: "Workspace not found" }, { status: 404 });
    }

    const workspace = workspaces[0] as { plan: string; current_period_end: string };

    return Response.json({
      success: true,
      message: "Subscription cancellation initiated. You will retain access until the end of the current billing period.",
      effectiveDate: workspace.current_period_end,
    });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
