import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/env";

const staticRoutes = [
  { url: "", priority: 1.0, changeFrequency: "monthly" as const },
  { url: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/docs", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
];

const docsPages = [
  "/docs/getting-started",
  "/docs/send-notifications",
  "/docs/analytics",
  "/docs/api-reference",
  "/docs/web-push-protocol",
  "/docs/best-practices",
  "/docs/integrations",
  "/docs/faq",
];

const blogSlugs = [
  "what-is-web-push",
  "increase-engagement-with-push",
  "push-notification-strategies-2026",
  "how-to-choose-push-platform",
  "ai-powered-notifications",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const env = getEnv();
  const baseUrl = env.NEXT_PUBLIC_APP_URL ?? "https://notify.prontly.in";

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const docsEntries: MetadataRoute.Sitemap = docsPages.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...docsEntries, ...blogEntries];
}
