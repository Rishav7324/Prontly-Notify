import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { siteSchema } from "@/lib/validation";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const sites = await executeQuery<any>(
      `SELECT s.*,
        (SELECT COUNT(*) FROM subscribers WHERE site_id = s.id AND status = 'active') as subscriber_count,
        (SELECT COUNT(*) FROM campaigns WHERE site_id = s.id) as campaign_count
       FROM sites s WHERE s.id = ?`,
      [id]
    );
    if (sites.length === 0) return err("Site not found", 404);
    return ok(sites[0]);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const body = await request.json();
    const parsed = siteSchema.partial().safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.errors[0].message, 400);
    }

    const existing = await executeQuery<any>("SELECT * FROM sites WHERE id = ?", [id]);
    if (existing.length === 0) return err("Site not found", 404);

    const updates: string[] = [];
    const values: any[] = [];
    for (const [key, value] of Object.entries(parsed.data)) {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length > 0) {
      updates.push("updated_at = CURRENT_TIMESTAMP");
      values.push(id);
      await executeQuery(
        `UPDATE sites SET ${updates.join(", ")} WHERE id = ?`,
        values
      );
    }

    const site = (await executeQuery<any>("SELECT * FROM sites WHERE id = ?", [id]))[0];
    return ok(site);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const existing = await executeQuery<any>("SELECT * FROM sites WHERE id = ?", [id]);
    if (existing.length === 0) return err("Site not found", 404);

    await executeQuery("DELETE FROM campaign_deliveries WHERE campaign_id IN (SELECT id FROM campaigns WHERE site_id = ?)", [id]);
    await executeQuery("DELETE FROM campaign_stats WHERE campaign_id IN (SELECT id FROM campaigns WHERE site_id = ?)", [id]);
    await executeQuery("DELETE FROM campaigns WHERE site_id = ?", [id]);
    await executeQuery("DELETE FROM automation_runs WHERE automation_id IN (SELECT id FROM automations WHERE site_id = ?)", [id]);
    await executeQuery("DELETE FROM automation_steps WHERE automation_id IN (SELECT id FROM automations WHERE site_id = ?)", [id]);
    await executeQuery("DELETE FROM automations WHERE site_id = ?", [id]);
    await executeQuery("DELETE FROM subscriber_attributes WHERE subscriber_id IN (SELECT id FROM subscribers WHERE site_id = ?)", [id]);
    await executeQuery("DELETE FROM subscribers WHERE site_id = ?", [id]);
    await executeQuery("DELETE FROM segments WHERE site_id = ?", [id]);
    await executeQuery("DELETE FROM sites WHERE id = ?", [id]);

    return ok({ deleted: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
