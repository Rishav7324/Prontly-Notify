const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;

async function getKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret.padEnd(32, "0").slice(0, 32)),
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );
  return keyMaterial;
}

export async function encryptVapidKey(
  plaintext: string,
  secret?: string
): Promise<string> {
  const keySecret = secret ?? process.env.VAPID_ENCRYPTION_KEY ?? "default-vapid-key-change-me";
  const key = await getKey(keySecret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoder.encode(plaintext)
  );
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return Buffer.from(combined).toString("base64");
}

export async function decryptVapidKey(
  ciphertext: string,
  secret?: string
): Promise<string> {
  const keySecret = secret ?? process.env.VAPID_ENCRYPTION_KEY ?? "default-vapid-key-change-me";
  const key = await getKey(keySecret);
  const combined = Buffer.from(ciphertext, "base64");
  const iv = combined.subarray(0, 12);
  const data = combined.subarray(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}
