import { z } from "zod";

const envSchema = z.object({
  // Firebase Client
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),

  // Firebase Server (base64-encoded service account JSON)
  FIREBASE_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),

  // FCM
  FCM_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),

  // Cloudflare D1
  CF_ACCOUNT_ID: z.string().optional(),
  CF_D1_DATABASE_ID: z.string().optional(),
  CF_D1_API_TOKEN: z.string().optional(),

  // Cloudflare R2
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().optional(),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_R2_BUCKET_NAME: z.string().optional(),
  CLOUDFLARE_R2_PUBLIC_URL: z.string().optional(),

  // Razorpay
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),

  // LLM Provider
  LLM_PROVIDER_API_KEY: z.string().optional(),

  // GA4
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),

  // VAPID
  VAPID_ENCRYPTION_KEY: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_VAPID_KEY: z.string().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
});

export function getEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten());
    return {} as z.infer<typeof envSchema>;
  }
  return parsed.data;
}
