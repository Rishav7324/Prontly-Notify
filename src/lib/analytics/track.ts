type EventName =
  | "page_view"
  | "signup"
  | "login"
  | "campaign_created"
  | "campaign_sent"
  | "campaign_scheduled"
  | "automation_created"
  | "automation_activated"
  | "segment_created"
  | "site_added"
  | "site_verified"
  | "team_invite_sent"
  | "api_key_generated"
  | "plan_upgraded"
  | "plan_downgraded"
  | "subscription_cancelled"
  | "ai_title_generated"
  | "ai_ctr_optimized"
  | "ai_segment_suggested"
  | "ai_analytics_summary"
  | "export_downloaded"
  | "error_occurred";

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

function getAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  const prefs = localStorage.getItem("analytics-consent");
  return prefs === null || prefs === "true";
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (!getAnalyticsConsent()) return;

  try {
    const payload = {
      name,
      properties: {
        ...properties,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
    };

    if (process.env.NODE_ENV === "development") {
      console.debug("[Analytics]", name, properties);
      return;
    }

    const beaconData = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/v1/analytics/event", beaconData);
    } else {
      fetch("/api/v1/analytics/event", {
        method: "POST",
        body: beaconData,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // silently fail — analytics should never block the app
  }
}

export function trackPageView(path: string) {
  trackEvent("page_view", { path });
}
