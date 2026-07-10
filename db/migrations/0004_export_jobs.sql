-- Export jobs for async CSV generation (written to R2 private bucket)
CREATE TABLE IF NOT EXISTS export_jobs (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  site_id TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('processing', 'completed', 'failed')) DEFAULT 'processing',
  row_count INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  created_by_user_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_export_jobs_workspace ON export_jobs(workspace_id, created_at);
CREATE INDEX IF NOT EXISTS idx_export_jobs_site ON export_jobs(site_id, created_at);
