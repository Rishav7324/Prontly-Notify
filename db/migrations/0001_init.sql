-- Prontly Notify - Complete D1 Database Schema
-- Migration 0001: Initial schema creation

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  is_staff BOOLEAN DEFAULT FALSE,
  staff_role TEXT,
  notification_prefs TEXT DEFAULT '{"product_updates":true,"billing_alerts":true,"weekly_digest":false,"delivery_failures":true}',
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);

CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly INTEGER NOT NULL DEFAULT 0,
  price_annual INTEGER NOT NULL DEFAULT 0,
  subscriber_limit INTEGER NOT NULL DEFAULT 1000,
  site_limit INTEGER NOT NULL DEFAULT 1,
  ai_credit_limit INTEGER NOT NULL DEFAULT 50,
  team_seat_limit INTEGER NOT NULL DEFAULT 1,
  features TEXT DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  plan_id TEXT NOT NULL REFERENCES plans(id),
  razorpay_customer_id TEXT,
  default_timezone TEXT DEFAULT 'Asia/Kolkata',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_workspaces_owner_user_id ON workspaces(owner_user_id);

CREATE TABLE IF NOT EXISTS workspace_members (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  user_id TEXT REFERENCES users(id),
  invited_email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  site_access TEXT DEFAULT '"all"',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending')),
  invited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  joined_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON workspace_members(user_id);

CREATE TABLE IF NOT EXISTS sites (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  category TEXT,
  platform TEXT,
  vapid_public_key TEXT,
  vapid_private_key TEXT,
  install_status TEXT DEFAULT 'pending' CHECK (install_status IN ('pending', 'verified', 'broken')),
  onboarding_step INTEGER DEFAULT 0,
  sending_enabled BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sites_workspace_id ON sites(workspace_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_sites_domain_workspace ON sites(domain, workspace_id);

CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  fcm_token TEXT NOT NULL,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_subscribers_site_id_status ON subscribers(site_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_site_id_fcm_token ON subscribers(site_id, fcm_token);
CREATE INDEX IF NOT EXISTS idx_subscribers_site_id_last_seen ON subscribers(site_id, last_seen_at);

CREATE TABLE IF NOT EXISTS subscriber_attributes (
  id TEXT PRIMARY KEY,
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  key TEXT NOT NULL,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscriber_attributes_subscriber_id ON subscriber_attributes(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_subscriber_attributes_key_value ON subscriber_attributes(key, value);

CREATE TABLE IF NOT EXISTS segments (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  name TEXT NOT NULL,
  type TEXT DEFAULT 'manual' CHECK (type IN ('manual', 'dynamic', 'ai_suggested')),
  rule_json TEXT DEFAULT '{}',
  subscriber_count_cached INTEGER DEFAULT 0,
  created_by_user_id TEXT REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_segments_site_id ON segments(site_id);

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  icon_url TEXT,
  image_url TEXT,
  click_url TEXT NOT NULL,
  action_buttons TEXT DEFAULT '[]',
  segment_id TEXT REFERENCES segments(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  scheduled_at DATETIME,
  sent_at DATETIME,
  ai_generated BOOLEAN DEFAULT FALSE,
  created_by_user_id TEXT NOT NULL REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_campaigns_site_id_status ON campaigns(site_id, status);
CREATE INDEX IF NOT EXISTS idx_campaigns_site_id_scheduled_at ON campaigns(site_id, scheduled_at);

CREATE TABLE IF NOT EXISTS campaign_stats (
  campaign_id TEXT PRIMARY KEY REFERENCES campaigns(id),
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

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

CREATE INDEX IF NOT EXISTS idx_campaign_deliveries_campaign_id_status ON campaign_deliveries(campaign_id, status);

CREATE TABLE IF NOT EXISTS automations (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id),
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('new_subscriber', 'tag_added', 'page_visited', 'inactive_days', 'ai_suggested')),
  trigger_config TEXT DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'paused', 'draft')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS automation_steps (
  id TEXT PRIMARY KEY,
  automation_id TEXT NOT NULL REFERENCES automations(id),
  step_order INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('wait', 'send', 'condition')),
  config TEXT DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_automation_steps_automation_id_order ON automation_steps(automation_id, step_order);

CREATE TABLE IF NOT EXISTS automation_runs (
  id TEXT PRIMARY KEY,
  automation_id TEXT NOT NULL REFERENCES automations(id),
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  current_step_id TEXT REFERENCES automation_steps(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'exited')),
  next_action_at DATETIME,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_automation_runs_status_next_action ON automation_runs(status, next_action_at);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  workspace_id TEXT UNIQUE NOT NULL REFERENCES workspaces(id),
  plan_id TEXT NOT NULL REFERENCES plans(id),
  razorpay_subscription_id TEXT UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  current_period_start DATETIME NOT NULL,
  current_period_end DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  razorpay_invoice_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  invoice_pdf_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_invoices_workspace_id_created ON invoices(workspace_id, created_at);

CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed_amount')),
  value INTEGER NOT NULL,
  max_redemptions INTEGER,
  redemption_count INTEGER DEFAULT 0,
  eligible_plan_ids TEXT DEFAULT '[]',
  expires_at DATETIME,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'disabled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_usage (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  month TEXT NOT NULL,
  feature TEXT NOT NULL,
  credits_used INTEGER DEFAULT 0
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_usage_workspace_month_feature ON ai_usage(workspace_id, month, feature);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  scopes TEXT DEFAULT '[]',
  created_by_user_id TEXT NOT NULL REFERENCES users(id),
  last_used_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  revoked_at DATETIME
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  body_mdx TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  category TEXT,
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  seo_title TEXT,
  seo_description TEXT,
  author_id TEXT NOT NULL REFERENCES users(id),
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  reason TEXT,
  metadata TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_created ON audit_logs(actor_user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON audit_logs(target_type, target_id);

CREATE TABLE IF NOT EXISTS feature_flags (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'off' CHECK (status IN ('on', 'off', 'rollout')),
  rollout_percentage INTEGER DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  eligible_plan_ids TEXT DEFAULT '[]',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
