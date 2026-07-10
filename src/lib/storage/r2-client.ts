import "server-only";

let s3Client: any = null;

export function getR2Client(): any {
  if (s3Client) return s3Client;
  const { S3Client } = require("@aws-sdk/client-s3");
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!accountId) throw new Error("CLOUDFLARE_ACCOUNT_ID not set");

  s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
  });
  return s3Client;
}

export function getPublicBucket(): string {
  return process.env.CLOUDFLARE_R2_PUBLIC_BUCKET || "prontly-notify-public";
}

export function getPrivateBucket(): string {
  return process.env.CLOUDFLARE_R2_PRIVATE_BUCKET || "prontly-notify-private";
}

export function getPublicUrlBase(): string {
  return process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://assets.prontly.in";
}
