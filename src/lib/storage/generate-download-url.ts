import "server-only";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, getPrivateBucket } from "./r2-client";

export async function generatePrivateDownloadUrl(
  key: string,
  expiresIn = 900
): Promise<string> {
  const client = getR2Client();
  const command = new GetObjectCommand({
    Bucket: getPrivateBucket(),
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn });
}

export async function uploadPrivateFile(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType: string
): Promise<void> {
  const { PutObjectCommand } = require("@aws-sdk/client-s3");
  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: getPrivateBucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function deletePrivateObject(key: string): Promise<void> {
  const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: getPrivateBucket(),
      Key: key,
    })
  );
}

export async function deletePrivateObjectsByPrefix(prefix: string): Promise<number> {
  const { ListObjectsV2Command, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
  const client = getR2Client();
  let deleted = 0;

  let isTruncated = true;
  let continuationToken: string | undefined;

  while (isTruncated) {
    const list = await client.send(
      new ListObjectsV2Command({
        Bucket: getPrivateBucket(),
        Prefix: prefix,
        ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
      })
    );

    if (!list.Contents || list.Contents.length === 0) break;

    const objects = list.Contents.map((o: any) => ({ Key: o.Key }));
    await client.send(
      new DeleteObjectsCommand({
        Bucket: getPrivateBucket(),
        Delete: { Objects: objects, Quiet: true },
      })
    );
    deleted += objects.length;
    isTruncated = list.IsTruncated || false;
    continuationToken = list.NextContinuationToken;
  }

  return deleted;
}
