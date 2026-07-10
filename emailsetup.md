# Email Setup Guide — Prontly Notify

## Overview

Emails are sent via **Nodemailer** over SMTP. When `SMTP_HOST` is configured in `.env`, emails are delivered. Otherwise they log to the console for development.

---

## SMTP (any provider)

Works with SendGrid, Mailgun, Postmark, Gmail SMTP, or any SMTP relay.

### Step 1 — Add env vars to `.env`

```
EMAIL_SENDER=smtp

# Required
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxx

# Optional (defaults shown)
SMTP_SECURE=false             # true for port 465
SMTP_POOL=false               # true to reuse connections
SMTP_MAX_CONNECTIONS=5        # max pooled connections
SMTP_MAX_MESSAGES=100         # messages per connection before reconnect
SMTP_CONNECTION_TIMEOUT=120000
SMTP_GREETING_TIMEOUT=30000
SMTP_SOCKET_TIMEOUT=600000
SMTP_REJECT_UNAUTHORIZED=true # false for self-signed certs
SMTP_LOGGER=false             # true to log SMTP activity
SMTP_DEBUG=false              # true for raw protocol logging

# Sender address
EMAIL_FROM="Prontly <noreply@yourdomain.com>"
```

### Step 2 — Verify the transporter

Run this test from the project root:

```js
// test-email.mjs
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await transporter.verify();
  console.log("SMTP server is ready to accept messages");
} catch (err) {
  console.error("SMTP verification failed:", err.message);
  console.error("Error code:", err.code);
  process.exit(1);
}

// Send a test email
const info = await transporter.sendMail({
  from: process.env.EMAIL_FROM || "test@example.com",
  to: "you@example.com",
  subject: "Test from Prontly",
  text: "If you see this, SMTP is working!",
  html: "<p><strong>If you see this, SMTP is working!</strong></p>",
});

console.log("Message sent:", info.messageId);
if (info.rejected?.length) {
  console.warn("Rejected recipients:", info.rejected);
}
```

Run:
```bash
export $(grep -v '^#' .env | xargs) && node test-email.mjs
```

### Step 3 — Custom sender address

The `from` field in verification emails is set by `EMAIL_FROM` in `.env`. Format:

```
"Display Name <email@domain.com>"
```

Make sure the domain is verified by your email provider (required by SendGrid, Resend, etc.).

---

## Option 3: Console logger (dev only — no actual sending)

No env vars needed. When neither `EMAIL_SENDER=resend` nor `EMAIL_SENDER=smtp` is set, emails log to stdout:

```
[EMAIL] {"to":"user@example.com","subject":"Verify your email — Prontly Notify"}
[EMAIL] HTML (3421 chars): <!DOCTYPE html>...
```

Firebase still processes the verification via REST API. The flow works end-to-end; the email just isn't delivered.

---

## Provider-specific notes

### SendGrid

| Setting | Value |
|---------|-------|
| SMTP_HOST | `smtp.sendgrid.net` |
| SMTP_PORT | `587` |
| SMTP_USER | `apikey` |
| SMTP_PASS | SendGrid API key |
| SMTP_SECURE | `false` |

Create an API key in SendGrid Dashboard → Settings → API Keys with at least "Mail Send" permission.

### Mailgun

| Setting | Value |
|---------|-------|
| SMTP_HOST | `smtp.mailgun.org` |
| SMTP_PORT | `587` |
| SMTP_USER | `postmaster@mg.yourdomain.com` |
| SMTP_PASS | Mailgun SMTP password |
| SMTP_SECURE | `false` |

Find SMTP credentials in Mailgun Dashboard → Sending → Domain Settings → SMTP credentials.

### Gmail (development only)

| Setting | Value |
|---------|-------|
| SMTP_HOST | `smtp.gmail.com` |
| SMTP_PORT | `587` |
| SMTP_USER | `your.email@gmail.com` |
| SMTP_PASS | [App password](https://support.google.com/accounts/answer/185833) (not regular password) |
| SMTP_SECURE | `false` |

Gmail has low sending limits (500/day). Use SendGrid or Resend for production.

### Gmail with OAuth2

```
EMAIL_SENDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_CLIENT_ID=xxx.apps.googleusercontent.com
SMTP_CLIENT_SECRET=GOCSPX-xxx
SMTP_REFRESH_TOKEN=1//xxx
SMTP_USER=user@gmail.com
```

The SMTP sender reads `SMTP_CLIENT_ID` / `SMTP_CLIENT_SECRET` / `SMTP_REFRESH_TOKEN` from env if present and configures OAuth2 automatically.

## Error codes (from Nodemailer)

| Code | Meaning | What to do |
|------|---------|------------|
| `ECONNECTION` | Connection closed unexpectedly | Check host/port/firewall |
| `ETIMEDOUT` | Connection or operation timed out | Increase timeouts, check network |
| `EDNS` | DNS resolution failed | Check hostname spelling |
| `ESOCKET` | Socket-level error | Network interruption |
| `ETLS` | TLS/STARTTLS failed | Check certs, try `SMTP_REJECT_UNAUTHORIZED=false` |
| `EAUTH` | Authentication failed | Check SMTP_USER / SMTP_PASS |
| `ENOAUTH` | Auth required but not provided | Add auth block |
| `EOAUTH2` | OAuth2 token error | Refresh token |
| `EENVELOPE` | Invalid envelope (bad addresses) | Check recipient addresses |
| `EMESSAGE` | Message rejected by server | Check content size, spam score |
| `ECONFIG` | Invalid transport configuration | Review env vars |
| `EPROXY` | Proxy connection error | Check proxy URL |
| `ESENDMAIL` | Sendmail process error | Check sendmail binary path |

---

## Architecture

```
Client (signup page)
  │
  ▼
POST /api/v1/auth/send-verification
  │
  ├─ Firebase REST API → generates oobCode
  │
  └─ Email sender
       ├─ Resend (EMAIL_SENDER=resend)
       ├─ SMTP via Nodemailer (EMAIL_SENDER=smtp)
       └─ Console log (no EMAIL_SENDER set)
```

The email module is at `src/lib/email/`. Add new senders by creating a file in that directory and registering it in `index.ts`.
