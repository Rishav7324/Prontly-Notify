import { z } from "zod";

const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export const siteSchema = z.object({
  name: z.string().min(1).max(100),
  domain: z.string().regex(domainRegex, "Invalid domain format"),
  category: z.enum(["blog", "ecommerce", "saas", "news", "other"]).optional(),
  platform: z.enum(["wordpress", "shopify", "webflow", "custom", "api"]).optional(),
});

export const campaignSchema = z.object({
  title: z.string().min(1).max(65, "Title must be at most 65 characters"),
  body: z.string().min(1).max(240, "Body must be at most 240 characters"),
  icon_url: z.string().url().optional().or(z.literal("")),
  image_url: z.string().url().optional().or(z.literal("")),
  click_url: z.string().url("A valid click URL is required"),
  action_buttons: z
    .array(
      z.object({
        label: z.string().min(1).max(30),
        url: z.string().url(),
      })
    )
    .max(2)
    .optional(),
  segment_id: z.string().uuid().optional().nullable(),
  scheduled_at: z.string().datetime().optional().nullable(),
});

const allowedAttributes = [
  "browser", "os", "country", "city", "status",
  "subscribed_at", "last_seen_at",
];
const allowedOperators = [
  "eq", "neq", "contains", "gt", "gte", "lt", "lte", "in", "not_in",
];
const ruleConditionSchema = z.object({
  attribute: z.enum(allowedAttributes as [string, ...string[]]),
  operator: z.enum(allowedOperators as [string, ...string[]]),
  value: z.union([z.string(), z.number(), z.array(z.string())]),
});
const ruleGroupSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    operator: z.enum(["AND", "OR"]),
    conditions: z.array(
      z.union([ruleConditionSchema, ruleGroupSchema])
    ),
  })
);
export const segmentSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["manual", "dynamic", "ai_suggested"]).optional(),
  rule_json: ruleGroupSchema.optional(),
});

export const subscriberSchema = z.object({
  fcm_token: z.string().min(1, "FCM token is required"),
  browser: z.enum(["chrome", "firefox", "edge"]).optional(),
  os: z.enum(["windows", "macos", "linux", "android", "chromeos"]).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});

const validScopes = [
  "subscribers:read", "subscribers:write",
  "campaigns:read", "campaigns:write",
  "segments:read", "segments:write",
  "automations:read", "automations:write",
  "analytics:read",
  "sites:read", "sites:write",
] as const;

export const apiKeySchema = z.object({
  name: z.string().min(1).max(100),
  scopes: z
    .array(z.enum(validScopes))
    .min(1, "At least one scope is required"),
});

export const teamInviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member"]),
  site_access: z.array(z.string().uuid()).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar_url: z.string().url().optional().nullable(),
  notification_prefs: z
    .object({
      product_updates: z.boolean().optional(),
      billing_alerts: z.boolean().optional(),
      weekly_digest: z.boolean().optional(),
      delivery_failures: z.boolean().optional(),
    })
    .optional(),
});

export type SiteInput = z.infer<typeof siteSchema>;
export type CampaignInput = z.infer<typeof campaignSchema>;
export type SegmentInput = z.infer<typeof segmentSchema>;
export type SubscriberInput = z.infer<typeof subscriberSchema>;
export type ApiKeyInput = z.infer<typeof apiKeySchema>;
export type TeamInviteInput = z.infer<typeof teamInviteSchema>;
