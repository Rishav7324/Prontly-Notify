import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  isStaff: integer("is_staff", { mode: "boolean" }).notNull().default(false),
  staffRole: text("staff_role"),
  notificationPrefs: text("notification_prefs").notNull().default("{}"),
  lastLoginAt: text("last_login_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const workspaces = sqliteTable(
  "workspaces",
  {
    id: text("id").primaryKey(),
    ownerUserId: text("owner_user_id").notNull().references(() => users.id),
    name: text("name").notNull(),
    planId: text("plan_id").notNull().references(() => plans.id),
    razorpayCustomerId: text("razorpay_customer_id"),
    defaultTimezone: text("default_timezone").notNull().default("Asia/Kolkata"),
    currentPeriodEnd: text("current_period_end"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_workspaces_owner").on(t.ownerUserId)],
);

export const workspaceMembers = sqliteTable(
  "workspace_members",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    userId: text("user_id").references(() => users.id),
    invitedEmail: text("invited_email").notNull(),
    role: text("role").notNull().$type<"owner" | "admin" | "member">(),
    siteAccess: text("site_access").notNull().default("all"),
    status: text("status").notNull().$type<"active" | "pending">().default("pending"),
    invitedAt: text("invited_at").notNull(),
    joinedAt: text("joined_at"),
  },
  (t) => [
    index("idx_workspace_members_workspace").on(t.workspaceId),
    index("idx_workspace_members_user").on(t.userId),
  ],
);

export const sites = sqliteTable(
  "sites",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    name: text("name").notNull(),
    domain: text("domain").notNull(),
    category: text("category").notNull().default("blog"),
    platform: text("platform").notNull().default("custom"),
    publicKey: text("public_key").notNull(),
    privateKey: text("private_key"),
    installStatus: text("install_status")
      .notNull().$type<"pending" | "verified" | "broken">()
      .default("pending"),
    onboardingStep: integer("onboarding_step").notNull().default(0),
    sendingEnabled: integer("sending_enabled", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_sites_workspace").on(t.workspaceId)],
);

export const subscribers = sqliteTable(
  "subscribers",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull().references(() => sites.id),
    endpoint: text("endpoint"),
    fcmToken: text("fcm_token"),
    authKey: text("auth_key"),
    p256dhKey: text("p256dh_key"),
    browser: text("browser"),
    os: text("os"),
    device: text("device"),
    country: text("country"),
    city: text("city"),
    tags: text("tags").notNull().default("[]"),
    status: text("status").notNull().$type<"active" | "unsubscribed">().default("active"),
    subscribedAt: text("subscribed_at").notNull(),
    lastSeenAt: text("last_seen_at"),
    unsubscribedAt: text("unsubscribed_at"),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  },
  (t) => [
    index("idx_subscribers_site").on(t.siteId),
    index("idx_subscribers_site_status").on(t.siteId, t.status),
    index("idx_subscribers_site_last_seen").on(t.siteId, t.lastSeenAt),
  ],
);

export const subscriberAttributes = sqliteTable(
  "subscriber_attributes",
  {
    id: text("id").primaryKey(),
    subscriberId: text("subscriber_id").notNull().references(() => subscribers.id),
    key: text("key").notNull(),
    value: text("value").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [
    index("idx_sub_attr_subscriber").on(t.subscriberId),
    index("idx_sub_attr_key_value").on(t.key, t.value),
  ],
);

export const segments = sqliteTable(
  "segments",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull().references(() => sites.id),
    name: text("name").notNull(),
    type: text("type")
      .notNull().$type<"manual" | "dynamic" | "ai_suggested">()
      .default("manual"),
    ruleJson: text("rule_json").notNull().default("[]"),
    subscriberCountCached: integer("subscriber_count_cached").notNull().default(0),
    createdByUserId: text("created_by_user_id").references(() => users.id),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_segments_site").on(t.siteId)],
);

export const plans = sqliteTable("plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  priceMonthly: integer("price_monthly").notNull(),
  priceAnnual: integer("price_annual").notNull(),
  razorpayPlanId: text("razorpay_plan_id"),
  subscriberLimit: integer("subscriber_limit").notNull(),
  siteLimit: integer("site_limit").notNull(),
  aiCreditLimit: integer("ai_credit_limit").notNull(),
  teamSeatLimit: integer("team_seat_limit").notNull(),
  features: text("features").notNull().default("{}"),
  createdAt: text("created_at").notNull(),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().unique().references(() => workspaces.id),
  planId: text("plan_id").notNull().references(() => plans.id),
  razorpaySubscriptionId: text("razorpay_subscription_id"),
  status: text("status")
    .notNull().$type<"active" | "past_due" | "canceled" | "trialing">()
    .default("active"),
  currentPeriodStart: text("current_period_start").notNull(),
  currentPeriodEnd: text("current_period_end").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const invoices = sqliteTable(
  "invoices",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    razorpayInvoiceId: text("razorpay_invoice_id"),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull().default("INR"),
    status: text("status")
      .notNull().$type<"paid" | "open" | "void" | "uncollectible">(),
    invoicePdfUrl: text("invoice_pdf_url"),
    periodStart: text("period_start"),
    periodEnd: text("period_end"),
    paidAt: text("paid_at"),
    createdAt: text("created_at").notNull(),
  },
  (t) => [index("idx_invoices_workspace").on(t.workspaceId, t.createdAt)],
);

export const campaigns = sqliteTable(
  "campaigns",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull().references(() => sites.id),
    title: text("title").notNull(),
    body: text("body").notNull(),
    iconUrl: text("icon_url"),
    imageUrl: text("image_url"),
    clickUrl: text("click_url"),
    actionButtons: text("action_buttons").notNull().default("[]"),
    segmentId: text("segment_id").references(() => segments.id),
    status: text("status")
      .notNull().$type<"draft" | "scheduled" | "sending" | "sent" | "failed">()
      .default("draft"),
    scheduledAt: text("scheduled_at"),
    sentAt: text("sent_at"),
    aiGenerated: integer("ai_generated", { mode: "boolean" }).notNull().default(false),
    createdByUserId: text("created_by_user_id").references(() => users.id),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [
    index("idx_campaigns_site_status").on(t.siteId, t.status),
    index("idx_campaigns_site_scheduled").on(t.siteId, t.scheduledAt),
  ],
);

export const campaignStats = sqliteTable("campaign_stats", {
  campaignId: text("campaign_id").primaryKey().references(() => campaigns.id),
  sentCount: integer("sent_count").notNull().default(0),
  deliveredCount: integer("delivered_count").notNull().default(0),
  failedCount: integer("failed_count").notNull().default(0),
  clickCount: integer("click_count").notNull().default(0),
  updatedAt: text("updated_at").notNull(),
});

export const campaignDeliveries = sqliteTable(
  "campaign_deliveries",
  {
    id: text("id").primaryKey(),
    campaignId: text("campaign_id").notNull().references(() => campaigns.id),
    subscriberId: text("subscriber_id").notNull().references(() => subscribers.id),
    status: text("status")
      .notNull().$type<"pending" | "delivered" | "failed" | "clicked">()
      .default("pending"),
    errorCode: text("error_code"),
    sentAt: text("sent_at"),
    deliveredAt: text("delivered_at"),
    clickedAt: text("clicked_at"),
  },
  (t) => [index("idx_campaign_deliveries_campaign").on(t.campaignId, t.status)],
);

export const deliveryFailuresPermanent = sqliteTable(
  "delivery_failures_permanent",
  {
    id: text("id").primaryKey(),
    campaignId: text("campaign_id").notNull(),
    subscriberId: text("subscriber_id").notNull(),
    errorCode: text("error_code"),
    failedAt: text("failed_at").notNull(),
  },
);

export const automations = sqliteTable(
  "automations",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull().references(() => sites.id),
    name: text("name").notNull(),
    triggerType: text("trigger_type")
      .notNull().$type<"new_subscriber" | "tag_added" | "page_visited" | "inactive_days" | "ai_suggested">(),
    triggerConfig: text("trigger_config").notNull().default("{}"),
    status: text("status")
      .notNull().$type<"active" | "paused" | "draft">()
      .default("draft"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_automations_site").on(t.siteId)],
);

export const automationSteps = sqliteTable(
  "automation_steps",
  {
    id: text("id").primaryKey(),
    automationId: text("automation_id").notNull().references(() => automations.id),
    stepOrder: integer("step_order").notNull(),
    type: text("type").notNull().$type<"wait" | "send" | "condition">(),
    config: text("config").notNull().default("{}"),
  },
  (t) => [index("idx_automation_steps_automation").on(t.automationId, t.stepOrder)],
);

export const automationRuns = sqliteTable(
  "automation_runs",
  {
    id: text("id").primaryKey(),
    automationId: text("automation_id").notNull().references(() => automations.id),
    subscriberId: text("subscriber_id").notNull().references(() => subscribers.id),
    currentStepId: text("current_step_id").references(() => automationSteps.id),
    status: text("status")
      .notNull().$type<"active" | "completed" | "exited">()
      .default("active"),
    nextActionAt: text("next_action_at"),
    startedAt: text("started_at").notNull(),
    completedAt: text("completed_at"),
  },
  (t) => [index("idx_automation_runs_status").on(t.status, t.nextActionAt)],
);

export const coupons = sqliteTable("coupons", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  type: text("type").notNull().$type<"percentage" | "fixed">(),
  value: integer("value").notNull(),
  maxRedemptions: integer("max_redemptions"),
  redemptionCount: integer("redemption_count").notNull().default(0),
  eligiblePlanIds: text("eligible_plan_ids").notNull().default("[]"),
  expiresAt: text("expires_at"),
  status: text("status")
    .notNull().$type<"active" | "expired" | "disabled">()
    .default("active"),
  createdAt: text("created_at").notNull(),
});

export const aiUsage = sqliteTable(
  "ai_usage",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    month: text("month").notNull(),
    feature: text("feature").notNull(),
    creditsUsed: integer("credits_used").notNull().default(0),
  },
  (t) => [uniqueIndex("idx_ai_usage_unique").on(t.workspaceId, t.month, t.feature)],
);

export const emailSendLog = sqliteTable(
  "email_send_log",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    type: text("type")
      .notNull().$type<"verify_email" | "reset_password" | "welcome" | "password_changed">(),
    sentAt: text("sent_at").notNull(),
    ipAddress: text("ip_address"),
    messageId: text("message_id"),
    error: text("error"),
  },
  (t) => [
    index("idx_email_send_log_email").on(t.email),
    index("idx_email_send_log_sent_at").on(t.sentAt),
  ],
);

export const emailDailyCounter = sqliteTable("email_daily_counter", {
  date: text("date").primaryKey(),
  count: integer("count").notNull().default(0),
});

export const apiKeys = sqliteTable(
  "api_keys",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    name: text("name").notNull(),
    keyHash: text("key_hash").notNull(),
    keyPrefix: text("key_prefix").notNull(),
    scopes: text("scopes").notNull().default("[]"),
    createdByUserId: text("created_by_user_id").references(() => users.id),
    lastUsedAt: text("last_used_at"),
    revokedAt: text("revoked_at"),
    createdAt: text("created_at").notNull(),
  },
  (t) => [index("idx_api_keys_workspace").on(t.workspaceId)],
);

export const blogPosts = sqliteTable(
  "blog_posts",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    bodyMdx: text("body_mdx"),
    excerpt: text("excerpt"),
    featuredImageUrl: text("featured_image_url"),
    category: text("category"),
    tags: text("tags").notNull().default("[]"),
    status: text("status")
      .notNull().$type<"draft" | "scheduled" | "published">()
      .default("draft"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    authorId: text("author_id").references(() => users.id),
    publishedAt: text("published_at"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [index("idx_blog_posts_status").on(t.status, t.publishedAt)],
);

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorUserId: text("actor_user_id").notNull().references(() => users.id),
    action: text("action").notNull(),
    targetType: text("target_type"),
    targetId: text("target_id"),
    reason: text("reason"),
    metadata: text("metadata").notNull().default("{}"),
    createdAt: text("created_at").notNull(),
  },
  (t) => [
    index("idx_audit_logs_actor").on(t.actorUserId),
    index("idx_audit_logs_action").on(t.action),
    index("idx_audit_logs_created").on(t.createdAt),
  ],
);

export const featureFlags = sqliteTable("feature_flags", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(false),
  description: text("description"),
  workspaceId: text("workspace_id").references(() => workspaces.id),
  updatedAt: text("updated_at").notNull(),
});

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    userId: text("user_id").notNull().references(() => users.id),
    token: text("token").notNull(),
    userAgent: text("user_agent"),
    ip: text("ip"),
    expiresAt: text("expires_at").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (t) => [index("idx_sessions_workspace_user").on(t.workspaceId, t.userId)],
);

export const analyticsDaily = sqliteTable(
  "analytics_daily",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull().references(() => sites.id),
    date: text("date").notNull(),
    sent: integer("sent").notNull().default(0),
    delivered: integer("delivered").notNull().default(0),
    clicked: integer("clicked").notNull().default(0),
    dismissed: integer("dismissed").notNull().default(0),
  },
  (t) => [
    uniqueIndex("idx_analytics_daily_site_date").on(t.siteId, t.date),
    index("idx_analytics_daily_site").on(t.siteId, t.date),
  ],
);

export const exportJobs = sqliteTable(
  "export_jobs",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull(),
    siteId: text("site_id").notNull(),
    r2Key: text("r2_key").notNull(),
    status: text("status")
      .notNull().$type<"processing" | "completed" | "failed">()
      .default("processing"),
    rowCount: integer("row_count").notNull().default(0),
    error: text("error"),
    createdByUserId: text("created_by_user_id"),
    createdAt: text("created_at").notNull(),
    completedAt: text("completed_at"),
  },
  (t) => [
    index("idx_export_jobs_workspace").on(t.workspaceId, t.createdAt),
    index("idx_export_jobs_site").on(t.siteId, t.createdAt),
  ],
);

export const webhooks = sqliteTable(
  "webhooks",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").notNull().references(() => workspaces.id),
    url: text("url").notNull(),
    events: text("events").notNull().default("[]"),
    secret: text("secret").notNull(),
    status: text("status").notNull().$type<"active" | "disabled">().default("active"),
    consecutiveFailures: integer("consecutive_failures").notNull().default(0),
    createdAt: text("created_at").notNull(),
  },
  (t) => [index("idx_webhooks_workspace").on(t.workspaceId)],
);
