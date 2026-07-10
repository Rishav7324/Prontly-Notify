import { NextRequest } from "next/server";
import { z } from "zod";
import { generatePasswordResetLink } from "@/lib/auth/firebase-admin";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

const bodySchema = z.object({
  email: z.string().email("Valid email is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    await generatePasswordResetLink(parsed.data.email);

    return ok({ message: "If the email exists, a password reset link has been sent" });
  } catch {
    return ok({ message: "If the email exists, a password reset link has been sent" });
  }
}
