CREATE TABLE IF NOT EXISTS email_send_log (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('verify_email','reset_password','welcome','password_changed')),
  sent_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_address TEXT,
  message_id TEXT,
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_email_send_log_email ON email_send_log(email);
CREATE INDEX IF NOT EXISTS idx_email_send_log_sent_at ON email_send_log(sent_at);

CREATE TABLE IF NOT EXISTS email_daily_counter (
  date TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS delivery_failures_permanent (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  subscriber_id TEXT NOT NULL,
  error_code TEXT,
  failed_at TEXT NOT NULL DEFAULT (datetime('now'))
);
