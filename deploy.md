# Prontly Notify — Deployment Guide

## Prerequisites

- Node.js 22+
- Git
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm i -g wrangler`)
- Access to the GitHub repo
- Cloudflare dashboard access (for env vars + D1)

---

## 1. Pre-deploy: Set environment variables in Cloudflare

Cloudflare Pages does not read your `.env` file. Every variable must be set in the dashboard.

**Go to:** Cloudflare Dashboard → prontly-notify → Settings → Environment Variables

**Non-secret variables** (set in Cloudflare dashboard UI):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | from `.env` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | from `.env` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | from `.env` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | from `.env` |
| `NEXT_PUBLIC_APP_URL` | `https://notify.prontly.in` |
| `EMAIL_FROM_TRANSACTIONAL` | `noreply@notify.prontly.in` |
| `BREVO_DAILY_SEND_LIMIT` | `300` |
| `CF_ACCOUNT_ID` | from `.env` |
| `CF_D1_DATABASE_ID` | from `.env` |

**Secret variables** (set via Wrangler — the dashboard hides the value):

```bash
wrangler pages secret put BREVO_API_KEY --project-name prontly-notify
# paste the key from .env, then press Ctrl+D

wrangler pages secret put CF_D1_API_TOKEN --project-name prontly-notify
# paste the token from .env, then press Ctrl+D

wrangler pages secret put FIREBASE_SERVICE_ACCOUNT_JSON --project-name prontly-notify
# paste the full single-line JSON from .env (FIREBASE_SERVICE_ACCOUNT_JSON=...), then press Ctrl+D
```

**Important:** `FIREBASE_SERVICE_ACCOUNT_JSON` must be the **minified single-line** JSON (as it appears in `.env` after the `=` sign). It contains the RSA private key used for OAuth2 token generation — without it, the password-reset and email-verification API routes will fail with `INSUFFICIENT_PERMISSION`.

---

## 2. Run D1 migrations

```bash
wrangler d1 execute prontly-notify --file db/migrations/0001_init.sql --remote
wrangler d1 execute prontly-notify --file db/migrations/0002_razorpay_plans.sql --remote
wrangler d1 execute prontly-notify --file db/migrations/0003_email_send_log.sql --remote
```

Each is idempotent (`CREATE TABLE IF NOT EXISTS`). Run all three.

---

## 3. Build

```bash
npm ci
npx next build
```

This compiles to `.next/`. The OpenNext adapter bundles Cloudflare Pages Functions.

**Memory note:** `next build` needs ~8 GB RAM. Build on a machine with ≥8 GB or in CI.

---

## 4. Deploy

```bash
wrangler pages deploy .next --project-name prontly-notify --branch main
```

---

## 5. Verify

### Health check

```bash
curl https://notify.prontly.in/api/v1/health
# → {"success":true,"status":"ok","timestamp":"..."}
```

### Password reset flow

Test against a real email inbox:

```bash
curl -X POST https://notify.prontly.in/api/v1/auth/request-password-reset \
  -H 'Content-Type: application/json' \
  -d '{"email":"your-actual-email@example.com"}'
```

Confirm:
- You receive **exactly one** email (from Brevo, not Firebase)
- Sender is `noreply@notify.prontly.in`
- Reset link domain is `notify.prontly.in` (not `localhost`)
- Clicking the link opens the branded confirm page

### Sign-up + email verification

```bash
curl -X POST https://notify.prontly.in/api/v1/auth/send-verification \
  -H 'Content-Type: application/json' \
  -d '{"idToken":"<valid Firebase idToken>","email":"your-email@example.com","name":"Test"}'
```

---

## 6. Post-deploy: Tail logs

```bash
wrangler pages tail --project-name prontly-notify --environment production
```

Watch for any `console.error()` output from the granular try/catch blocks.

---

## 7. Rollback if needed

```bash
wrangler pages rollback --project-name prontly-notify
```
