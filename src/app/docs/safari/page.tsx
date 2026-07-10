import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Globe,
  Shield,
  Settings,
  Code,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const steps = [
  {
    title: "Register for an Apple Developer Account",
    description:
      "Safari push notifications require an active Apple Developer Program membership ($99/year). You'll need a Team ID from your developer account.",
    code: `// Your Apple Team ID (found in Apple Developer portal)
const TEAM_ID = "AB1234CDEF5";`,
    language: "javascript",
  },
  {
    title: "Create a Push Notification Certificate",
    description:
      "Generate a universal push notification certificate in your Apple Developer account under Certificates, Identifiers & Profiles. Download the .p12 file and note the Key ID.",
    code: `// Generate the VAPID claims for Safari
// Requires: TEAM_ID, Key ID, and the .p12 certificate

const safariVapidConfig = {
  teamId: process.env.APPLE_TEAM_ID,
  keyId: process.env.APPLE_KEY_ID,
  certificatePath: "./certs/safari_push.p12",
  topic: "web.com.yourdomain",
};`,
    language: "javascript",
  },
  {
    title: "Configure Safari Push Package",
    description:
      "Create a push package — a signed ZIP archive containing icons and a manifest. This is served at a well-known URL your service worker can request.",
    code: `// Push package structure:
// push-package/
//   icon.iconset/
//     icon_16x16.png
//     icon_16x16@2x.png
//     icon_32x32.png
//     icon_32x32@2x.png
//     icon_128x128.png
//     icon_128x128@2x.png
//   website.json
//   manifest.json
//   signature

// website.json
{
  "websiteName": "Your App Name",
  "websitePushID": "web.com.example.domain",
  "allowedDomains": ["https://example.com"],
  "urlFormatString": "https://example.com/%@",
  "authenticationToken": "your-32-byte-hex-token",
  "webServiceURL": "https://example.com/api/v1/push/safari"
}`,
    language: "json",
  },
  {
    title: "Implement the Safari Web Service API",
    description:
      "Safari requires a web service that handles push subscription requests. This API manages device tokens and sends notifications via APNs.",
    code: `// Required API endpoints for Safari push:
// POST /api/v1/push/safari/log
// POST /api/v1/push/safari/register
// DELETE /api/v1/push/safari/unregister
// PUT /api/v1/push/safari/update

// Example: Register endpoint
export async function POST(req: Request) {
  const { deviceToken, pushPackage } = await req.json();
  // Store device token in database
  await db.insertDeviceToken(deviceToken);
  return Response.json({}, { status: 200 });
}`,
    language: "typescript",
  },
  {
    title: "Send Notifications via APNs",
    description:
      "Use the APNs HTTP/2 API to send push notifications to Safari users. The payload format is specific to Safari and uses the 'alert' dictionary structure.",
    code: `// Safari push payload format
const safariPayload = {
  aps: {
    alert: {
      title: "Notification Title",
      body: "Notification body text",
    },
    "url-args": ["https://example.com/click"],
  },
};

// Send via APNs HTTP/2 API
const apnsResponse = await fetch(
  "https://api.push.apple.com/3/device/" + deviceToken,
  {
    method: "POST",
    headers: {
      "apns-topic": "web.com.example.domain",
      "apns-push-type": "alert",
      authorization: \`Bearer \${jwtToken}\`,
    },
    body: JSON.stringify(safariNotification),
  }
);`,
    language: "typescript",
  },
  {
    title: "Service Worker Registration (Safari 16+)",
    description:
      "Safari 16+ supports the standard Push API. Register a service worker and subscribe using VAPID, or use the legacy push package approach for older versions.",
    code: `// Safari 16+ Push API (standard)
if ("serviceWorker" in navigator && "PushManager" in window) {
  try {
    const registration = await navigator.serviceWorker.register(
      "/sw.js"
    );

    // Safari uses the standard PushSubscription
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "YOUR_VAPID_PUBLIC_KEY"
      ),
    });

    // Send subscription to your server
    await fetch("/api/v1/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription.toJSON()),
    });
  } catch (err) {
    console.error("Safari push subscription failed:", err);
  }
}

// Utility: convert base64 to Uint8Array
function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  return Uint8Array.from(raw.split("").map((c) => c.charCodeAt(0)));
}`,
    language: "javascript",
  },
];

export default function SafariPushDocPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link href="/docs">
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Docs
            </Button>
          </Link>
        </div>

        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Badge variant="info" size="sm" className="mb-1">Safari 16+</Badge>
              <h1 className="text-3xl font-bold text-text-primary">
                Safari Web Push Setup
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-text-secondary">
            Configure push notifications for Safari browsers. Safari 16+ supports the
            standard Push API, while older versions use APNs-based push via a push package.
          </p>
        </div>

        <Card variant="featured" className="mb-10">
          <CardContent>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <p className="text-sm text-text-primary">
                <strong>Prerequisites:</strong> Apple Developer Program membership, a
                registered domain with HTTPS, and a push notification certificate from
                the Apple Developer Console.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-10">
          {steps.map((step, index) => (
            <Card key={index} id={`step-${index + 1}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <CardTitle>{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
                <CodeBlock
                  code={step.code}
                  language={step.language}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="glass" className="mt-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Testing & Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-text-secondary">
            <p>
              After setup, send a test notification from your Prontly dashboard.
              Safari will display the notification in Notification Center when the
              browser is closed, or as an in-banner notification when open.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning" />
              <span>
                Your push package must be served over HTTPS with a valid TLS certificate.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <span>
                In Safari 16+, users must grant notification permission via the
                standard browser prompt.
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/dashboard/integration">
            <Button size="lg" icon={<ExternalLink className="h-4 w-4" />}>
              Configure in Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}