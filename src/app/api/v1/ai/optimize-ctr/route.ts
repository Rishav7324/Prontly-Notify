import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { optimizeCTR } from "@/lib/ai/client";

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

    if (!body.title || !body.body) {
      return err("Title and body are required", 400);
    }
    if (body.title.length > 65) return err("Title exceeds 65 characters", 400);
    if (body.body.length > 240) return err("Body exceeds 240 characters", 400);

    const optimized = await optimizeCTR(
      { title: body.title, body: body.body },
      body.context
    );

    return ok({ original: { title: body.title, body: body.body }, optimized });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
