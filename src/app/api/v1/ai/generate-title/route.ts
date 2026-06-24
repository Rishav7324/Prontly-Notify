import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { generateTitles } from "@/lib/ai/client";

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

    if (!body.body) return err("Campaign body is required", 400);
    if (body.body.length > 240) return err("Body exceeds 240 characters", 400);

    const titles = await generateTitles(body.body);
    return ok({ titles, generated: titles.length > 0 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
