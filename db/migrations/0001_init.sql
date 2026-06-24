-- Prontly Notify V1 — D1 Schema Migration
-- Idempotent: uses CREATE TABLE IF NOT EXISTS

-- Users & Auth
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT false,
  is_staff BOOLEAN DEFAULT false,
  staff_role TEXT,
  notification_prefs TEXT DEFAULT '{}',
  last_login_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Workspaces (billing entity, surfaces as "account")
CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  plan_id TEXT NOT NULL REFERENCES plans(id),
  razorpay_customer_id TEXT,
  default_timezone TEXT DEFAULT 'Asia/Kolkata',
  current_period_end DATETIME,
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_workspaces_owner ON workspaces(owner_user_id);

-- Workspace members (team)
CREATE TABLE IF NOT EXISTS workspace_members (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  user_id TEXT REFERENCES users(id),
  invited_email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  site_access TEXT DEFAULT 'all',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending')),
  invited_at DATETIME NOT NULL DEFAULT (datetime('now')),
  joined_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user ON workspace_members(user_id);

-- Sites (registered websites)
CREATE TABLE IF NOT EXISTS sites (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  category TEXT DEFAULT 'blog',
  platform TEXT DEFAULT 'custom',
  public_key TEXT NOT NULL,
  private_key TEXT,
  install_status TEXT DEFAULT 'pending' CHECK (install_status IN ('pending', 'verified', 'broken')),
  onboarding_step INTEGER DEFAULT 0,
  sending_enabled BOOLEAN DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sites_workspace ON sites(workspace_id);

-- Subscribers (push subscriptions)
CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  endpoint TEXT,
  fcm_token TEXT,
  auth_key TEXT,
  p256dh_key TEXT,
  browser TEXT,
  os TEXT,
  device TEXT,
  country TEXT,
  city TEXT,
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at DATETIME NOT NULL DEFAULT (datetime('now')),
  last_seen_at DATETIME,
  unsubscribed_at DATETIME,
  is_active BOOLEAN DEFAULT true
);
CREATE INDEX IF NOT EXISTS idx_subscribers_site ON subscribers(site_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_site_status ON subscribers(site_id, status);
CREATE INDEX IF NOT EXISTS idx_subscribers_site_last_seen ON subscribers(site_id, last_seen_at);

-- Subscriber attributes (key-value tags)
CREATE TABLE IF NOT EXISTS subscriber_attributes (
  id TEXT PRIMARY KEY,
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sub_attr_subscriber ON subscriber_attributes(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_sub_attr_key_value ON subscriber_attributes(key, value);

-- Segments
CREATE TABLE IF NOT EXISTS segments (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  name TEXT NOT NULL,
  type TEXT DEFAULT 'manual' CHECK (type IN ('manual', 'dynamic', 'ai_suggested')),
  rule_json TEXT DEFAULT '[]',
  subscriber_count_cached INTEGER DEFAULT 0,
  created_by_user_id TEXT REFERENCES users(id),
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_segments_site ON segments(site_id);

-- Plans (pricing tiers)
CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly INTEGER NOT NULL,
  price_annual INTEGER NOT NULL,
  subscriber_limit INTEGER NOT NULL,
  site_limit INTEGER NOT NULL,
  ai_credit_limit INTEGER NOT NULL,
  team_seat_limit INTEGER NOT NULL,
  features TEXT DEFAULT '{}',
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Subscriptions (active billing)
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  workspace_id TEXT UNIQUE NOT NULL REFERENCES workspaces(id),
  plan_id TEXT NOT NULL REFERENCES plans(id),
  razorpay_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  current_period_start DATETIME NOT NULL,
  current_period_end DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  razorpay_invoice_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL CHECK (status IN ('paid', 'open', 'void', 'uncollectible')),
  invoice_pdf_url TEXT,
  period_start DATETIME,
  period_end DATETIME,
  paid_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_invoices_workspace ON invoices(workspace_id, created_at);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  icon_url TEXT,
  image_url TEXT,
  click_url TEXT,
  action_buttons TEXT DEFAULT '[]',
  segment_id TEXT REFERENCES segments(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  scheduled_at DATETIME,
  sent_at DATETIME,
  ai_generated BOOLEAN DEFAULT false,
  created_by_user_id TEXT REFERENCES users(id),
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_campaigns_site_status ON campaigns(site_id, status);
CREATE INDEX IF NOT EXISTS idx_campaigns_site_scheduled ON campaigns(site_id, scheduled_at);

-- Campaign stats (pre-aggregated)
CREATE TABLE IF NOT EXISTS campaign_stats (
  campaign_id TEXT PRIMARY KEY REFERENCES campaigns(id),
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Campaign deliveries (per-subscriber, 90-day retention)
CREATE TABLE IF NOT EXISTS campaign_deliveries (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id),
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'failed', 'clicked')),
  error_code TEXT,
  sent_at DATETIME,
  delivered_at DATETIME,
  clicked_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_campaign_deliveries_campaign ON campaign_deliveries(campaign_id, status);

-- Automations
CREATE TABLE IF NOT EXISTS automations (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('new_subscriber', 'tag_added', 'page_visited', 'inactive_days', 'ai_suggested')),
  trigger_config TEXT DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'paused', 'draft')),
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_automations_site ON automations(site_id);

-- Automation steps
CREATE TABLE IF NOT EXISTS automation_steps (
  id TEXT PRIMARY KEY,
  automation_id TEXT NOT NULL REFERENCES automations(id),
  step_order INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('wait', 'send', 'condition')),
  config TEXT DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS idx_automation_steps_automation ON automation_steps(automation_id, step_order);

-- Automation runs (per-subscriber progress)
CREATE TABLE IF NOT EXISTS automation_runs (
  id TEXT PRIMARY KEY,
  automation_id TEXT NOT NULL REFERENCES automations(id),
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  current_step_id TEXT REFERENCES automation_steps(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'exited')),
  next_action_at DATETIME,
  started_at DATETIME NOT NULL DEFAULT (datetime('now')),
  completed_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_automation_runs_status ON automation_runs(status, next_action_at);

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value INTEGER NOT NULL,
  max_redemptions INTEGER DEFAULT 1,
  redemption_count INTEGER DEFAULT 0,
  eligible_plan_ids TEXT DEFAULT '[]',
  expires_at DATETIME,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'disabled')),
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- AI usage credits
CREATE TABLE IF NOT EXISTS ai_usage (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  month TEXT NOT NULL,
  feature TEXT NOT NULL,
  credits_used INTEGER DEFAULT 0,
  UNIQUE(workspace_id, month, feature)
);

-- API keys
CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  scopes TEXT DEFAULT '[]',
  created_by_user_id TEXT REFERENCES users(id),
  last_used_at DATETIME,
  revoked_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_api_keys_workspace ON api_keys(workspace_id);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  body_mdx TEXT,
  excerpt TEXT,
  featured_image_url TEXT,
  category TEXT,
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  seo_title TEXT,
  seo_description TEXT,
  author_id TEXT REFERENCES users(id),
  published_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status, published_at);

-- Audit logs (immutable)
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  reason TEXT,
  metadata TEXT DEFAULT '{}',
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- Feature flags
CREATE TABLE IF NOT EXISTS feature_flags (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT false,
  description TEXT,
  workspace_id TEXT REFERENCES workspaces(id),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  token TEXT NOT NULL,
  user_agent TEXT,
  ip TEXT,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_workspace_user ON sessions(workspace_id, user_id);

-- Daily analytics rollup
CREATE TABLE IF NOT EXISTS analytics_daily (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  date TEXT NOT NULL,
  sent INTEGER DEFAULT 0,
  delivered INTEGER DEFAULT 0,
  clicked INTEGER DEFAULT 0,
  dismissed INTEGER DEFAULT 0,
  UNIQUE(site_id, date)
);
CREATE INDEX IF NOT EXISTS idx_analytics_daily_site ON analytics_daily(site_id, date);

-- Seed plan data
INSERT OR IGNORE INTO plans (id, name, price_monthly, price_annual, subscriber_limit, site_limit, ai_credit_limit, team_seat_limit, features) VALUES
  ('free', 'Free', 0, 0, 2000, 1, 10, 1, '{"analytics_basic":true,"ai_title_suggestions":true,"api_access":false,"team_access":false,"automation":false,"priority_support":false}'),
  ('starter', 'Starter', 99900, 999000, 10000, 3, 50, 2, '{"analytics_basic":true,"analytics_advanced":false,"ai_title_suggestions":true,"ai_full_suite":false,"api_access":false,"team_access":true,"automation":true,"priority_support":false}'),
  ('growth', 'Growth', 299900, 2499000, 50000, 10, 200, 5, '{"analytics_basic":true,"analytics_advanced":true,"ai_title_suggestions":true,"ai_full_suite":true,"api_access":true,"team_access":true,"automation":true,"priority_support":false}'),
  ('scale', 'Scale', 799900, 6999000, 200000, 50, 1000, 15, '{"analytics_basic":true,"analytics_advanced":true,"ai_title_suggestions":true,"ai_full_suite":true,"api_access":true,"team_access":true,"automation":true,"priority_support":true}');
