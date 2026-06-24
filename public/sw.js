self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const { title, body, icon, image, click_url, action_buttons } = data;

    const options = {
      body: body || "",
      icon: icon || "/favicon.ico",
      image: image || undefined,
      data: { click_url, action_buttons },
      actions: action_buttons?.slice(0, 2).map((btn: { label: string; url: string }) => ({
        action: btn.url,
        title: btn.label,
      })) || [],
      badge: "/favicon.ico",
      vibrate: [200, 100, 200],
      timestamp: Date.now(),
    };

    event.waitUntil(self.registration.showNotification(title || "Prontly Notify", options));
  } catch {
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification("Prontly Notify", {
        body: text,
        icon: "/favicon.ico",
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const clickUrl = event.notification.data?.click_url;
  const actionUrl = event.action;

  const url = actionUrl || clickUrl || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

self.addEventListener("notificationclose", (event) => {
  event.notification.close();
});

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
