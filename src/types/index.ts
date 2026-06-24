export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "owner" | "admin" | "member";
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  workspaceId: string;
  name: string;
  domain: string;
  publicKey: string;
  privateKey: string;
  icon?: string;
  subscriberCount: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  workspaceId: string;
  siteId: string;
  title: string;
  message: string;
  icon?: string;
  clickUrl?: string;
  status: "draft" | "scheduled" | "sending" | "sent" | "cancelled";
  scheduledAt?: string;
  sentAt?: string;
  stats?: CampaignStats;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  clicked: number;
  dismissed: number;
  openRate: number;
  clickRate: number;
}

export interface Subscriber {
  id: string;
  siteId: string;
  endpoint: string;
  authKey: string;
  p256dhKey: string;
  browser?: string;
  os?: string;
  device?: string;
  country?: string;
  city?: string;
  tags: string[];
  subscribedAt: string;
  lastSeenAt?: string;
  isActive: boolean;
}

export interface Automation {
  id: string;
  workspaceId: string;
  siteId: string;
  name: string;
  trigger: AutomationTrigger;
  steps: AutomationStep[];
  status: "active" | "paused" | "draft";
  createdAt: string;
  updatedAt: string;
}

export type AutomationTrigger = "new_subscriber" | "tag_added" | "page_visited" | "inactive_days";

export interface AutomationStep {
  id: string;
  type: "wait" | "send" | "condition";
  config: Record<string, unknown>;
  order: number;
}

export interface Segment {
  id: string;
  workspaceId: string;
  siteId: string;
  name: string;
  description?: string;
  rules: SegmentRuleGroup[];
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SegmentRuleGroup {
  id: string;
  conditions: SegmentCondition[];
  logic: "AND" | "OR";
}

export interface SegmentCondition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

export interface NotificationLog {
  id: string;
  campaignId?: string;
  subscriberId: string;
  title: string;
  body: string;
  status: "sent" | "delivered" | "clicked" | "dismissed" | "failed";
  sentAt: string;
  deliveredAt?: string;
  clickedAt?: string;
}

export interface ApiKey {
  id: string;
  workspaceId: string;
  name: string;
  key: string;
  lastUsedAt?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  workspaceId: string;
  userId: string;
  user: User;
  role: "owner" | "admin" | "member";
  joinedAt: string;
}

export interface AnalyticsSummary {
  totalSubscribers: number;
  activeSubscribers: number;
  totalCampaigns: number;
  totalNotifications: number;
  averageOpenRate: number;
  averageClickRate: number;
  subscribersByDay: { date: string; count: number }[];
  notificationsByDay: { date: string; sent: number; delivered: number; clicked: number }[];
  browserBreakdown: { browser: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
}

export interface BillingInfo {
  plan: "free" | "starter" | "pro" | "enterprise";
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  subscribersLimit: number;
  campaignsLimit: number;
  paymentMethod?: PaymentMethod;
  invoices: Invoice[];
}

export interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: "paid" | "open" | "void" | "uncollectible";
  periodStart: string;
  periodEnd: string;
  paidAt?: string;
  pdfUrl?: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string | null;
  invitedEmail: string;
  role: "owner" | "admin" | "member";
  siteAccess: string;
  status: "active" | "pending";
  invitedAt: string;
  joinedAt: string | null;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export interface SubscriberAttribute {
  id: string;
  subscriberId: string;
  key: string;
  value: string;
  updatedAt: string;
}

export interface CampaignDelivery {
  id: string;
  campaignId: string;
  subscriberId: string;
  status: "pending" | "delivered" | "failed" | "clicked";
  errorCode?: string;
  sentAt?: string;
  deliveredAt?: string;
  clickedAt?: string;
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  subscriberLimit: number;
  siteLimit: number;
  aiCreditLimit: number;
  teamSeatLimit: number;
  features: Record<string, boolean>;
}

export interface Subscription {
  id: string;
  workspaceId: string;
  planId: string;
  razorpaySubscriptionId?: string;
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  maxRedemptions: number;
  redemptionCount: number;
  eligiblePlanIds: string[];
  expiresAt?: string;
  status: "active" | "expired" | "disabled";
  createdAt: string;
}

export interface AiUsage {
  id: string;
  workspaceId: string;
  month: string;
  feature: string;
  creditsUsed: number;
}

export interface AuditLog {
  id: string;
  actorUserId: string;
  action: string;
  targetType?: string;
  targetId?: string;
  reason?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  enabled: boolean;
  description?: string;
  workspaceId?: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  bodyMdx?: string;
  excerpt?: string;
  featuredImageUrl?: string;
  category?: string;
  tags: string[];
  status: "draft" | "scheduled" | "published";
  seoTitle?: string;
  seoDescription?: string;
  authorId?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AutomationRun {
  id: string;
  automationId: string;
  subscriberId: string;
  currentStepId?: string;
  status: "active" | "completed" | "exited";
  nextActionAt?: string;
  startedAt: string;
  completedAt?: string;
}

export interface Session {
  id: string;
  workspaceId: string;
  userId: string;
  token: string;
  userAgent?: string;
  ip?: string;
  expiresAt: string;
  createdAt: string;
}
