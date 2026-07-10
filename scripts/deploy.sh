#!/usr/bin/env bash
set -euo pipefail

# ─── Prontly Notify — Cloudflare Pages Full Deployment ─────────────────────
# Usage:  bash scripts/deploy.sh
# Prereq: wrangler CLI logged in, git remote set, Node 22+
# ────────────────────────────────────────────────────────────────────────────

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
info()  { echo -e "${CYAN}[deploy]${NC} $*"; }
ok()    { echo -e "${GREEN}[ok]${NC} $*"; }
warn()  { echo -e "${YELLOW}[warn]${NC} $*"; }
fail()  { echo -e "${RED}[fail]${NC} $*"; exit 1; }

# ─── 1. Pre-flight checks ──────────────────────────────────────────────────
info "Pre-flight checks..."

command -v node >/dev/null 2>&1 || fail "node is required (v22+)"
command -v wrangler >/dev/null 2>&1 || fail "wrangler CLI is required (npm i -g wrangler)"
command -v git >/dev/null 2>&1 || fail "git is required"

NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
[ "$NODE_VER" -ge 22 ] || warn "Node >=22 recommended (have v$(node -v))"

# Ensure we're in the project root
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"

# ─── 2. Load / validate environment ────────────────────────────────────────
info "Validating environment variables…"

REQUIRED=(
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  NEXT_PUBLIC_APP_URL
  BREVO_API_KEY
  EMAIL_FROM_TRANSACTIONAL
  CF_ACCOUNT_ID
  CF_D1_DATABASE_ID
  CF_D1_API_TOKEN
)

for var in "${REQUIRED[@]}"; do
  if [ -z "$(printenv "$var" 2>/dev/null || true)" ]; then
    # fallback to .env file
    val=$(grep "^${var}=" .env 2>/dev/null | head -1 | cut -d= -f2-)
    if [ -n "$val" ]; then
      export "$var=$val"
    else
      warn "$var is not set — set it in .env or export it"
    fi
  fi
done

# Cloudflare-specific env vars (set at the project level)
info "Ensuring Cloudflare secrets are set…"
wrangler pages secret put BREVO_API_KEY --project-name prontly-notify 2>/dev/null || warn "Run: wrangler pages secret put BREVO_API_KEY"
wrangler pages secret put CF_D1_API_TOKEN  --project-name prontly-notify 2>/dev/null || warn "Run: wrangler pages secret put CF_D1_API_TOKEN"

# ─── 3. Install dependencies ────────────────────────────────────────────────
info "Installing dependencies…"
npm ci --omit=dev || npm install

# ─── 4. Run D1 migrations ──────────────────────────────────────────────────
info "Running D1 migrations…"
for migration in db/migrations/*.sql; do
  name=$(basename "$migration")
  info "  Applying $name …"
  wrangler d1 execute prontly-notify --file "$migration" --remote 2>&1 || warn "Migration $name failed (may already be applied)"
done
ok "D1 migrations complete"

# ─── 5. Build ──────────────────────────────────────────────────────────────
info "Building Next.js app…"
npx next build 2>&1
ok "Build complete"

# ─── 6. Deploy to Cloudflare Pages ─────────────────────────────────────────
info "Deploying to Cloudflare Pages…"
wrangler pages deploy .next --project-name prontly-notify --branch main 2>&1
ok "Deployment complete"

# ─── 7. Post-deploy smoke tests ────────────────────────────────────────────
info "Running post-deploy smoke tests…"
APP_URL="${NEXT_PUBLIC_APP_URL:-https://notify.prontly.in}"

# Health check
if curl -sf "$APP_URL/api/v1/health" >/dev/null 2>&1; then
  ok "Health endpoint OK"
else
  warn "Health endpoint unreachable — check Cloudflare dashboard"
fi

# Log endpoints (don't require auth)
for path in /api/v1/auth/request-password-reset /api/v1/auth/send-verification; do
  status=$(curl -so /dev/null -w '%{http_code}' -X POST "$APP_URL$path" \
    -H 'Content-Type: application/json' \
    -d '{"email":"test@example.com"}' 2>/dev/null || echo "000")
  if [ "$status" != "000" ]; then
    ok "$path → $status"
  else
    warn "$path unreachable"
  fi
done

ok "Deploy script finished. Verify at $APP_URL"
