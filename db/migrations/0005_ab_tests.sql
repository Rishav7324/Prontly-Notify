-- A/B test campaigns
CREATE TABLE IF NOT EXISTS ab_tests (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  title TEXT NOT NULL,
  variants TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed')),
  winner_variant_index INTEGER,
  duration_hours INTEGER NOT NULL DEFAULT 24,
  sent_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT (datetime('now')),
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_ab_tests_workspace ON ab_tests(workspace_id, created_at);
