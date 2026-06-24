"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth();
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");
    const subscriberId = searchParams.get("subscriberId");

    if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

    const sites = await executeQuery(
      "SELECT public_key FROM sites WHERE id = ? AND workspace_id = ?",
      [siteId, auth.workspaceId]
    );
    if (!sites || sites.length === 0) return Response.json({ error: "Site not found" }, { status: 404 });

    const site = sites[0] as { public_key: string };

    const script = `
(function() {
  var key = '${site.public_key}';
  var workerUrl = '${process.env.NEXT_PUBLIC_SITE_URL}/sw.js';

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register(workerUrl).then(function(reg) {
      Notification.requestPermission().then(function(perm) {
        if (perm === 'granted') {
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(key)
          }).then(function(sub) {
            var data = {
              siteId: '${siteId}',
              subscription: sub.toJSON(),
              browser: navigator.userAgent,
              url: window.location.href,
              ${subscriberId ? "subscriberId: '" + subscriberId + "'," : ""}
              referrer: document.referrer
            };
            fetch('${process.env.NEXT_PUBLIC_SITE_URL}/api/subscribers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
          });
        }
      });
    });
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
})();
`;

    return new Response(script, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
