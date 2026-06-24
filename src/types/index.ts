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
