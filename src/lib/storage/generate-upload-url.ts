import "server-only";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, getPublicBucket, getPublicUrlBase } from "./r2-client";

export async function generatePublicUploadUrl(
  key: string,
  contentType: string,
  contentLength?: number
): Promise<{ presignedUrl: string; publicUrl: string }> {
  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: getPublicBucket(),
    Key: key,
    ContentType: contentType,
    ...(contentLength ? { ContentLength: contentLength } : {}),
  });
  const presignedUrl = await getSignedUrl(client, command, { expiresIn: 300 });
  const publicUrl = `${getPublicUrlBase()}/${key}`;
  return { presignedUrl, publicUrl };
}

const ALLOWED_CONTENT_TYPES = new Set([
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/jpg",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateUploadRequest(
  contentType: string,
  contentLength?: number
): string | null {
  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    return `Invalid content type "${contentType}". Allowed: ${[...ALLOWED_CONTENT_TYPES].join(", ")}`;
  }
  if (contentLength && contentLength > MAX_FILE_SIZE) {
    return `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB`;
  }
  return null;
}

export function buildPublicKey(
  prefix: "sites" | "blog" | "avatars" | "og",
  id: string,
  filename: string
): string {
  const ext = filename.endsWith(".webp") ? "webp" : "webp"; // always convert to webp
  return `${prefix}/${id}/${filename.replace(/\.[^.]+$/, "")}.${ext}`;
}

export async function verifyUploadComplete(key: string): Promise<boolean> {
  const { HeadObjectCommand } = require("@aws-sdk/client-s3");
  const client = getR2Client();
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: getPublicBucket(),
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}

export async function deletePublicObject(key: string): Promise<void> {
  const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: getPublicBucket(),
      Key: key,
    })
  );
}

export async function deleteObjectsByPrefix(prefix: string): Promise<number> {
  const { ListObjectsV2Command, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
  const client = getR2Client();
  let deleted = 0;

  let isTruncated = true;
  let continuationToken: string | undefined;

  while (isTruncated) {
    const list = await client.send(
      new ListObjectsV2Command({
        Bucket: getPublicBucket(),
        Prefix: prefix,
        ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
      })
    );

    if (!list.Contents || list.Contents.length === 0) break;

    const objects = list.Contents.map((o: any) => ({ Key: o.Key }));
    await client.send(
      new DeleteObjectsCommand({
        Bucket: getPublicBucket(),
        Delete: { Objects: objects, Quiet: true },
      })
    );
    deleted += objects.length;
    isTruncated = list.IsTruncated || false;
    continuationToken = list.NextContinuationToken;
  }

  return deleted;
}
