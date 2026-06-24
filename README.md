# Prontly Notify

A next-generation push notification platform built for scale — delivering real-time, personalized push notifications to millions of devices with enterprise-grade reliability, granular audience segmentation, and AI-powered engagement optimization.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Database Schema](#database-schema)
7. [API Reference](#api-reference)
8. [Authentication & Authorization](#authentication--authorization)
9. [Campaign System](#campaign-system)
10. [Push Notification Delivery](#push-notification-delivery)
11. [Subscriber Management](#subscriber-management)
12. [Segmentation Engine](#segmentation-engine)
13. [Automation Flows](#automation-flows)
14. [Analytics & Insights](#analytics--insights)
15. [AI Features](#ai-features)
16. [Billing & Subscription](#billing--subscription)
17. [Admin Panel](#admin-panel)
18. [SDK Integration](#sdk-integration)
19. [Security](#security)
20. [Deployment](#deployment)
21. [Performance Optimization](#performance-optimization)
22. [Testing](#testing)
23. [Contributing](#contributing)
24. [License](#license)

---

## 1. Overview

Prontly Notify is a full-stack push notification infrastructure platform that enables businesses to send, track, and optimize push notifications across web, mobile, and desktop. The platform is built from the ground up to handle enterprise-scale workloads — supporting millions of subscribers, thousands of concurrent campaigns, and real-time delivery analytics — while remaining developer-friendly through a comprehensive REST API, client SDKs, and a no-code campaign builder.

### Core Capabilities

- **Campaign Builder** — A four-step guided wizard (compose, target, schedule, review) with a live device preview that renders notifications exactly as end-users will see them. Supports rich media (images, action buttons), deep linking, and channel-specific payloads.
- **Segment Engine** — Rule-based audience segmentation with real-time count estimation. Combine behavioral attributes (last session, custom events), demographic filters (country, language, device), and custom properties into reusable segments. Supports AND/OR/NOT logic with nested group operators.
- **Automation Flows** — Drag-and-drop flow canvas for creating triggered notification sequences. Trigger on events (signup, purchase, inactivity), add conditional branches, apply delays, and loop through A/B variants. Each flow maintains a real-time execution graph.
- **AI Optimization** — Built-in AI tools for campaign subject line generation, send time optimization (predicts individual user open times from historical engagement), segment discovery (clusters users by behavior patterns), content personalization, and churn prediction scoring.
- **Delivery Engine** — FCM HTTP v1 batch delivery supporting 500 tokens per batch with configurable throttling. Handles token invalidation, delivery receipts, retry logic with exponential backoff, and automatic cleanup of stale registrations.
- **Analytics Suite** — Real-time dashboards with configurable date ranges, comparative period analysis, funnel visualization, geographic heat maps, device breakdowns, and AI-generated natural language summaries of performance trends.
- **Team Collaboration** — Role-based access control with granular permissions (owner, admin, editor, viewer, api). Supports team invites, audit logging, and per-resource access policies.
- **Billing Engine** — Subscription lifecycle management integrated with Razorpay. Supports monthly/annual billing, prorated upgrades/downgrades, coupon administration, invoice generation, failed payment retry workflows, and churn analytics.

### Design Philosophy

The platform follows several key design principles:

1. **Server-First Rendering** — All public-facing pages use Next.js server components with progressive hydration for interactive islands. Dashboard and admin interfaces use client components with server-side data fetching patterns.

2. **Defensive Programming** — Every API endpoint validates inputs, returns structured error responses, and handles edge cases including rate limits, concurrent modifications, and partial failures. UI components handle loading, empty, error, and success states independently.

3. **Observability by Default** — All API calls are logged with timing, status, and request IDs. Campaign deliveries are tracked individually with per-token status. System health endpoints expose D1 query latency, FCM API latency, error rates, and cache hit ratios.

4. **Zero Trust Security** — All endpoints require authentication except public pages and webhook handlers. Authentication tokens are signed, short-lived HTTP-only cookies. API keys grant scoped access. Webhook payloads are verified against stored secrets.

5. **Cost-Effective Infrastructure** — Deployed entirely on Cloudflare's edge network (Workers, D1, R2, KV) to eliminate cold starts, reduce latency, and minimize operational costs. No dedicated server infrastructure required.

---

## 2. Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        Client Layer                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Browser  │  │  Mobile  │  │  Server  │  │  Third-Party     │ │
│  │  (Web)    │  │  (App)   │  │  (API)   │  │  Integrations    │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬──────────┘ │
└───────┼──────────────┼────────────┼──────────────────┼───────────┘
        │              │            │                  │
┌───────┴──────────────┴────────────┴──────────────────┴───────────┐
│                        Edge Layer (Cloudflare)                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    Next.js Application                          │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │ │
│  │  │  Pages       │  │  API Routes  │  │  Server Actions      │ │ │
│  │  │  (SSR/SSG)   │  │  (REST)     │  │  (Mutations)         │ │ │
│  │  └─────────────┘  └──────┬──────┘  └──────────────────────┘ │ │
│  └──────────────────────────┼───────────────────────────────────┘ │
│                             │                                     │
│  ┌──────────────────────────┴───────────────────────────────────┐ │
│  │                    Services Layer                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │ │
│  │  │ Campaign      │  │ FCM Client   │  │ Razorpay Client   │ │ │
│  │  │ Sender        │  │ (OAuth2 JWT) │  │ (Subscription)    │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └────────┬───────────┘ │ │
│  │  ┌──────┴───────┐  ┌──────┴───────┐  ┌────────┴───────────┐ │ │
│  │  │ Rate Limiter  │  │ Token Manager│  │ Webhook Handler   │ │ │
│  │  └──────────────┘  └──────────────┘  └────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │ │
│                             │                                     │
│  ┌──────────────────────────┴───────────────────────────────────┐ │
│  │                    Data Layer                                  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │ │
│  │  │  Cloudflare   │  │  Cloudflare   │  │  Cloudflare KV    │ │ │
│  │  │  D1 (SQLite)  │  │  R2 (Object)  │  │  (Cache/Sessions) │ │ │
│  │  └──────────────┘  └──────────────┘  └────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │ │
└──────────────────────────────────────────────────────────────────┘
                        │
┌───────────────────────────────┬──────────────────────────────────┐
│        External Services      │        External Services         │
│  ┌─────────────────────────┐  │  ┌───────────────────────────┐  │
│  │  Firebase Cloud         │  │  │  Razorpay                │  │
│  │  Messaging (FCM)        │  │  │  Payment Gateway         │  │
│  └─────────────────────────┘  │  └───────────────────────────┘  │
└───────────────────────────────┴──────────────────────────────────┘
```

### Request Lifecycle

1. **Client Request** — A browser, mobile app, or external service sends an HTTP request to the edge.
2. **Edge Routing** — Cloudflare Workers (via Next.js) route the request to the appropriate handler.
3. **Authentication** — API routes validate the session cookie, API key, or webhook signature. Unauthenticated requests receive a 401 response.
4. **Input Validation** — Request bodies are validated against Zod schemas. Invalid inputs receive structured 400 responses with field-level error details.
5. **Business Logic** — Services process the request, interacting with the data layer as needed.
6. **Database Operations** — D1 executes parameterized SQL queries. Write operations use transactions for consistency.
7. **External Service Calls** — FCM, Razorpay, or other external APIs are called asynchronously where possible.
8. **Response** — The handler returns a structured JSON response with `success`, `data`, and optional `error` and `meta` fields.
9. **Client Update** — The client receives the response, updates UI state, and triggers secondary effects (toasts, navigation, refetching).

### Campaign Delivery Pipeline

The campaign delivery pipeline is designed for reliability at scale:

1. **Campaign Creation** — A campaign is created with composition, targeting, and scheduling parameters. Status is set to `draft`.
2. **Scheduling** — When the scheduled time arrives (or immediately if send is triggered), a server action transitions the campaign to `sending`.
3. **Subscriber Resolution** — The campaign's target segment is resolved to a list of subscriber IDs. If no segment is specified, all workspace subscribers are included.
4. **Token Collection** — Subscriber IDs are mapped to their FCM registration tokens. Tokens are deduplicated and validated.
5. **Batch Processing** — Tokens are processed in batches of 500 (the FCM batch limit). Each batch is sent with a 1-second throttle between batches to respect rate limits.
6. **Delivery Tracking** — Each delivery attempt records the token, status (sent/failed), error message, and timestamp in `campaign_deliveries`.
7. **Token Cleanup** — Tokens that return `UNREGISTERED` or `INVALID_ARGUMENT` errors are removed from the subscribers table to maintain token hygiene.
8. **Completion** —`campaign_stats` are updated with delivery counts, open rates, and click rates. The campaign status transitions to `sent` or `partial` if some deliveries failed.
9. **Analytics Update** — Campaign analytics are refreshed, and workspace-level delivery metrics are recalculated.

### Data Flow Diagram

```
           ┌─────────────┐
           │  Campaign   │
           │  Created    │
           └──────┬──────┘
                  │
                  ▼
           ┌─────────────┐
           │ Resolve     │
           │ Segment     │
           └──────┬──────┘
                  │
                  ▼
           ┌─────────────┐     ┌──────────────┐
           │ Collect     │────▶│  Token       │
           │ Subscribers │     │  Validation  │
           └──────┬──────┘     └──────┬───────┘
                  │                   │
                  │                   ▼
                  │           ┌──────────────┐
                  │           │ Batch        │
                  │           │ (500 tokens) │
                  │           └──────┬───────┘
                  │                  │
                  ▼                  ▼
           ┌─────────────┐     ┌──────────────┐
           │ Process     │◀────│  Throttle    │
           │ Batch       │     │  (1s delay)  │
           └──────┬──────┘     └──────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
   ┌────────┐┌────────┐┌────────┐
   │ Sent   ││ Failed ││Stale   │
   │        ││        ││Token   │
   └────┬───┘└────┬───┘└────┬───┘
        │         │         │
        │         │         ▼
        │         │   ┌──────────────┐
        │         │   │ Remove Token │
        │         │   └──────────────┘
        │         │
        ▼         ▼
   ┌─────────────────────┐
   │ Update Campaign     │
   │ Stats & Complete    │
   └─────────────────────┘
```

---

## 3. Tech Stack

### Frontend

| Technology | Purpose | Version |
|---|---|---|
| Next.js | Meta-framework for React with SSR, SSG, and API routes | 16.2.x |
| React | UI component library | 19.x |
| TypeScript | Static type checking | 5.x |
| Tailwind CSS | Utility-first CSS framework | 4.x |
| Recharts | Composable charting library | 2.x |
| Lucide React | Icon component library | latest |
| React Hot Toast | Toast notification system | 2.x |
| Framer Motion | Animation library | 11.x |

### Backend

| Technology | Purpose | Version |
|---|---|---|
| Next.js API Routes | REST API endpoints | 16.2.x |
| Next.js Server Actions | Server-side mutations | 16.2.x |
| Zod | Schema validation | 3.x |
| bcryptjs | Password hashing | 2.x |
| jsonwebtoken | JWT creation and verification | 9.x |
| jose | JWT utilities for Edge Runtime | 5.x |

### Infrastructure

| Technology | Purpose |
|---|---|
| Cloudflare D1 | Serverless SQLite database |
| Cloudflare R2 | Object storage for assets |
| Cloudflare KV | Key-value cache and session store |
| Cloudflare Workers | Compute at edge |
| Firebase Cloud Messaging (FCM) | Push notification delivery |
| Razorpay | Payment processing and subscriptions |

### Developer Tools

| Technology | Purpose |
|---|---|
| Vitest | Unit and integration testing |
| Testing Library | React component testing |
| ESLint | Code linting |
| Prettier | Code formatting |
| Turbopack | Development bundler |

---

## 4. Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- A Cloudflare account with D1, R2, and Workers enabled
- A Firebase project with Cloud Messaging enabled
- A Razorpay merchant account

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL=libsql://your-db.turso.io

# Authentication
JWT_SECRET=your-256-bit-secret-key-here

# Firebase Cloud Messaging
NEXT_PUBLIC_FCM_VAPID_KEY=your-vapid-key
FCM_SERVICE_ACCOUNT_JSON=base64-encoded-service-account-json

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=rzp_secret_xxxxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Prontly Notify
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/prontly-notify.git
cd prontly-notify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
npx wrangler d1 execute prontly-notify --file=db/migrations/0001_init.sql
npx wrangler d1 execute prontly-notify --file=db/migrations/0002_razorpay_plans.sql

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Commands

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
```

---

## 5. Project Structure

```
prontly-notify/
├── public/                          # Static assets
│   ├── blog/                        # Blog images
│   ├── docs/                        # Documentation screenshots
│   ├── fonts/                       # Self-hosted fonts
│   └── images/                      # General images
│
├── src/
│   ├── app/
│   │   ├── (auth)/                  # Authentication routes
│   │   │   ├── _components/         # Auth-specific components
│   │   │   │   ├── AuthCard.tsx           # Auth form container
│   │   │   │   ├── AuthLeftPanel.tsx      # Split-panel branding
│   │   │   │   ├── OAuthButton.tsx        # Social login buttons
│   │   │   │   └── PasswordStrengthMeter.tsx # Password strength indicator
│   │   │   ├── forgot-password/     # Password recovery flow
│   │   │   ├── login/               # Sign-in page
│   │   │   ├── signup/              # Registration page
│   │   │   └── verify-email/        # Email verification page
│   │   │
│   │   ├── (public)/                # Public-facing routes
│   │   │   ├── about/               # Company information
│   │   │   ├── blog/                # Blog listing and detail
│   │   │   ├── contact/             # Contact form
│   │   │   ├── docs/                # Documentation hub
│   │   │   ├── faq/                 # Frequently asked questions
│   │   │   ├── legal/               # Privacy, terms, cookies, refund
│   │   │   └── pricing/             # Pricing plans and comparison
│   │   │
│   │   ├── admin/                   # Admin panel
│   │   │   ├── _components/         # Admin-specific components
│   │   │   ├── accounts/            # User account management
│   │   │   ├── audit-and-flags/     # Audit logs and feature flags
│   │   │   ├── billing/             # Revenue and subscription data
│   │   │   ├── blog/                # Blog content management
│   │   │   ├── coupons/             # Coupon and discount management
│   │   │   ├── sites/               # Website management
│   │   │   └── system/              # System health and error logs
│   │   │
│   │   ├── api/                     # API routes
│   │   │   ├── v1/
│   │   │   │   ├── admin/           # Admin API endpoints
│   │   │   │   ├── auth/            # Authentication endpoints
│   │   │   │   ├── billing/         # Billing and subscription endpoints
│   │   │   │   ├── campaigns/       # Campaign CRUD and sending
│   │   │   │   ├── integrations/    # Integration configuration
│   │   │   │   ├── notifications/   # Notification preferences
│   │   │   │   ├── segments/        # Segment CRUD and evaluation
│   │   │   │   ├── subscribers/     # Subscriber management
│   │   │   │   ├── team/            # Team management
│   │   │   │   └── webhooks/        # Webhook handlers
│   │   │   │
│   │   │   └── webhooks/            # External webhook endpoints
│   │   │
│   │   ├── dashboard/              # Dashboard routes
│   │   │   ├── _components/        # Dashboard-specific components
│   │   │   ├── analytics/          # Analytics and reporting
│   │   │   ├── api-keys/           # API key management
│   │   │   ├── automation/         # Automation flows
│   │   │   ├── campaigns/          # Campaign management
│   │   │   ├── integrations/       # Integration and SDK setup
│   │   │   ├── segments/           # Audience segmentation
│   │   │   ├── settings/           # Account and workspace settings
│   │   │   ├── subscribers/        # Subscriber management
│   │   │   └── team/               # Team management
│   │   │
│   │   ├── layout.tsx              # Root layout with fonts
│   │   ├── not-found.tsx           # 404 page
│   │   └── error.tsx               # Global error boundary
│   │
│   ├── components/
│   │   ├── billing/                # Billing components
│   │   │   └── RazorpayCheckout.tsx     # Razorpay payment integration
│   │   │
│   │   ├── domain/                 # Domain-specific components
│   │   │   ├── AutomationCanvas.tsx     # Drag-and-drop flow builder
│   │   │   ├── EmptyState.tsx           # Empty state placeholder
│   │   │   ├── IntegrationSnippet.tsx   # SDK code snippet display
│   │   │   └── SegmentRuleBuilder.tsx   # Rule-based query builder
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── Footer.tsx               # Public site footer
│   │   │   └── Navbar.tsx               # Floating pill-shaped navbar
│   │   │
│   │   └── ui/                     # UI primitives library
│   │       ├── Badge.tsx                # Status badge
│   │       ├── Breadcrumb.tsx           # Navigation breadcrumb
│   │       ├── Button.tsx               # Button with variants
│   │       ├── Card.tsx                 # Content card
│   │       ├── DataTable.tsx            # Sortable, searchable table
│   │       ├── Modal.tsx                # Accessible modal dialog
│   │       ├── Skeleton.tsx             # Loading skeleton
│   │       ├── StepsIndicator.tsx       # Multi-step progress
│   │       ├── Tabs.tsx                 # Tab navigation
│   │       ├── Toast.tsx                # Toast notification system
│   │       └── UsageMeter.tsx           # Usage progress bar
│   │
│   ├── lib/
│   │   ├── auth.ts                 # Authentication utilities
│   │   ├── db.ts                   # D1 database client
│   │   ├── fcm/
│   │   │   ├── campaign-sender.ts  # Campaign delivery pipeline
│   │   │   └── client.ts           # FCM HTTP v1 OAuth2 client
│   │   ├── razorpay.ts             # Razorpay API client
│   │   └── utils.ts                # Shared utility functions
│   │
│   ├── middleware.ts               # Next.js middleware (auth, redirects)
│   └── types/                      # TypeScript type definitions
│       ├── api.ts                  # API request/response types
│       ├── campaign.ts             # Campaign types
│       ├── database.ts             # Database row types
│       └── subscriber.ts           # Subscriber and segment types
│
├── tests/
│   ├── components/                 # Component tests
│   │   ├── Badge.test.tsx
│   │   ├── Breadcrumb.test.tsx
│   │   ├── Button.test.tsx
│   │   ├── StepsIndicator.test.tsx
│   │   └── UsageMeter.test.tsx
│   └── lib/
│       └── utils.test.ts           # Utility function tests
│
├── db/
│   └── migrations/
│       ├── 0001_init.sql           # Initial schema
│       └── 0002_razorpay_plans.sql # Razorpay plan IDs
│
├── .env.example                    # Environment variable template
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vitest.config.ts                # Vitest configuration
├── AGENTS.md                       # AI agent development guidelines
├── Ui-ux.txt                       # UI/UX design specification
└── README.md                       # This file
```

---

## 6. Database Schema

The platform uses Cloudflare D1, a serverless SQLite database. The schema is defined through incremental migrations.

### Table: `users`

Stores user accounts within the platform.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `email` | TEXT UNIQUE NOT NULL | User email address |
| `password_hash` | TEXT NOT NULL | bcrypt hashed password |
| `name` | TEXT NOT NULL | Display name |
| `avatar_url` | TEXT | Profile picture URL |
| `email_verified` | INTEGER DEFAULT 0 | Email verification flag |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Account creation time |
| `updated_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Last update time |

### Table: `workspaces`

Organizational units that contain subscribers, campaigns, and settings.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `name` | TEXT NOT NULL | Workspace display name |
| `slug` | TEXT UNIQUE NOT NULL | URL-friendly identifier |
| `owner_id` | TEXT NOT NULL REFERENCES users(id) | Workspace owner |
| `plan_id` | TEXT REFERENCES plans(id) | Current subscription plan |
| `plan_status` | TEXT DEFAULT 'free' | free, active, past_due, cancelled |
| `razorpay_subscription_id` | TEXT | Active Razorpay subscription |
| `subscriber_limit` | INTEGER DEFAULT 1000 | Maximum subscribers |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Last update time |

### Table: `plans`

Subscription plan definitions.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `name` | TEXT NOT NULL | Plan display name |
| `slug` | TEXT UNIQUE NOT NULL | URL-friendly identifier |
| `description` | TEXT | Plan description |
| `price_monthly` | INTEGER | Monthly price in paise |
| `price_annual` | INTEGER | Annual price in paise |
| `subscriber_limit` | INTEGER | Subscriber cap |
| `features` | TEXT | JSON array of feature strings |
| `razorpay_plan_id` | TEXT | Razorpay plan ID for subscriptions |
| `sort_order` | INTEGER DEFAULT 0 | Display ordering |
| `is_active` | INTEGER DEFAULT 1 | Plan availability |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |

### Table: `subscribers`

Push notification subscribers registered to a workspace.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT NOT NULL REFERENCES workspaces(id) | Parent workspace |
| `token` | TEXT NOT NULL | FCM registration token |
| `device_type` | TEXT | web, ios, android |
| `browser` | TEXT | Browser name (for web tokens) |
| `os` | TEXT | Operating system |
| `country` | TEXT | ISO country code |
| `language` | TEXT | ISO language code |
| `tags` | TEXT | JSON array of custom tags |
| `custom_properties` | TEXT | JSON object of key-value pairs |
| `last_active_at` | TEXT | Last interaction timestamp |
| `subscribed_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Subscription date |
| `unsubscribed_at` | TEXT | Unsubscription date |
| `is_active` | INTEGER DEFAULT 1 | Active subscription flag |

### Table: `campaigns`

Push notification campaigns.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT NOT NULL REFERENCES workspaces(id) | Parent workspace |
| `name` | TEXT NOT NULL | Campaign display name |
| `subject` | TEXT | Notification title/subject |
| `body` | TEXT NOT NULL | Notification body content |
| `icon` | TEXT | Notification icon URL |
| `image` | TEXT | Large notification image URL |
| `action_url` | TEXT | Deep link or destination URL |
| `action_buttons` | TEXT | JSON array of button definitions |
| `channel_id` | TEXT | FCM channel/group ID |
| `ttl` | INTEGER | Time-to-live in seconds |
| `priority` | TEXT DEFAULT 'normal' | normal, high |
| `segment_id` | TEXT REFERENCES segments(id) | Target segment |
| `status` | TEXT DEFAULT 'draft' | draft, scheduled, sending, sent, partial, failed |
| `scheduled_at` | TEXT | Scheduled send timestamp |
| `sent_at` | TEXT | Actual send timestamp |
| `created_by` | TEXT REFERENCES users(id) | Creator |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Last update time |

### Table: `campaign_stats`

Delivery statistics for each campaign.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `campaign_id` | TEXT NOT NULL REFERENCES campaigns(id) | Parent campaign |
| `total_sent` | INTEGER DEFAULT 0 | Total deliveries attempted |
| `total_delivered` | INTEGER DEFAULT 0 | Successful deliveries |
| `total_failed` | INTEGER DEFAULT 0 | Failed deliveries |
| `total_opens` | INTEGER DEFAULT 0 | Times notification was opened |
| `total_clicks` | INTEGER DEFAULT 0 | Times action button was clicked |
| `unique_opens` | INTEGER DEFAULT 0 | Unique open counts |
| `unique_clicks` | INTEGER DEFAULT 0 | Unique click counts |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Last update time |

### Table: `campaign_deliveries`

Individual delivery records for each subscriber in a campaign.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `campaign_id` | TEXT NOT NULL REFERENCES campaigns(id) | Parent campaign |
| `subscriber_id` | TEXT REFERENCES subscribers(id) | Target subscriber |
| `token` | TEXT NOT NULL | Delivered FCM token |
| `status` | TEXT NOT NULL | sent, failed, opened, clicked |
| `error_message` | TEXT | Delivery error details |
| `delivered_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Delivery timestamp |
| `opened_at` | TEXT | Open timestamp |
| `clicked_at` | TEXT | Click timestamp |

### Table: `segments`

Reusable audience segments defined by rules.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT NOT NULL REFERENCES workspaces(id) | Parent workspace |
| `name` | TEXT NOT NULL | Segment display name |
| `description` | TEXT | Segment description |
| `rules` | TEXT NOT NULL | JSON rule tree structure |
| `estimated_count` | INTEGER | Live subscriber count estimate |
| `is_dynamic` | INTEGER DEFAULT 1 | Auto-updating segment flag |
| `created_by` | TEXT REFERENCES users(id) | Creator |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Last update time |

### Table: `automations`

Automation flow definitions.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT NOT NULL REFERENCES workspaces(id) | Parent workspace |
| `name` | TEXT NOT NULL | Automation display name |
| `description` | TEXT | Automation description |
| `trigger_type` | TEXT NOT NULL | event, scheduled, webhook |
| `trigger_config` | TEXT | JSON trigger configuration |
| `nodes` | TEXT NOT NULL | JSON flow graph definition |
| `status` | TEXT DEFAULT 'draft' | draft, active, paused, archived |
| `created_by` | TEXT REFERENCES users(id) | Creator |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |
| `updated_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Last update time |

### Table: `api_keys`

Scoped API keys for programmatic access.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT NOT NULL REFERENCES workspaces(id) | Parent workspace |
| `name` | TEXT NOT NULL | Key display name |
| `key_prefix` | TEXT NOT NULL | First 8 characters of the key |
| `key_hash` | TEXT NOT NULL | bcrypt hash of full key |
| `scopes` | TEXT | JSON array of permission scopes |
| `last_used_at` | TEXT | Last usage timestamp |
| `expires_at` | TEXT | Key expiration |
| `is_active` | INTEGER DEFAULT 1 | Key active flag |
| `created_by` | TEXT REFERENCES users(id) | Creator |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |

### Table: `team_members`

Workspace team membership and roles.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT NOT NULL REFERENCES workspaces(id) | Parent workspace |
| `user_id` | TEXT NOT NULL REFERENCES users(id) | Team member |
| `role` | TEXT NOT NULL | owner, admin, editor, viewer, api |
| `invited_by` | TEXT REFERENCES users(id) | Inviter |
| `invited_at` | TEXT | Invitation timestamp |
| `accepted_at` | TEXT | Acceptance timestamp |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Creation time |

### Table: `audit_logs`

Immutable audit trail for all important actions.

| Column | Type | Description |
|---|---|---|
| `id` | TEXT PRIMARY KEY | UUID v4 |
| `workspace_id` | TEXT REFERENCES workspaces(id) | Scope |
| `user_id` | TEXT REFERENCES users(id) | Acting user |
| `action` | TEXT NOT NULL | Action identifier |
| `resource_type` | TEXT | Resource type affected |
| `resource_id` | TEXT | Resource ID affected |
| `details` | TEXT | JSON details about the action |
| `ip_address` | TEXT | Request IP address |
| `user_agent` | TEXT | Request user agent |
| `created_at` | TEXT DEFAULT CURRENT_TIMESTAMP | Action timestamp |

### Index Design

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);

-- Subscriber queries
CREATE INDEX idx_subscribers_workspace ON subscribers(workspace_id, is_active);
CREATE INDEX idx_subscribers_token ON subscribers(token);
CREATE INDEX idx_subscribers_country ON subscribers(workspace_id, country);
CREATE INDEX idx_subscribers_last_active ON subscribers(workspace_id, last_active_at);

-- Campaign queries
CREATE INDEX idx_campaigns_workspace ON campaigns(workspace_id, status);
CREATE INDEX idx_campaigns_scheduled ON campaigns(status, scheduled_at);
CREATE INDEX idx_campaigns_created_by ON campaigns(created_by);

-- Campaign delivery queries
CREATE INDEX idx_deliveries_campaign ON campaign_deliveries(campaign_id, status);
CREATE INDEX idx_deliveries_subscriber ON campaign_deliveries(subscriber_id);

-- Segment queries
CREATE INDEX idx_segments_workspace ON segments(workspace_id);

-- Automation queries
CREATE INDEX idx_automations_workspace ON automations(workspace_id, status);

-- API key lookup
CREATE INDEX idx_api_keys_workspace ON api_keys(workspace_id);
CREATE INDEX idx_api_keys_prefix ON api_keys(key_prefix);

-- Audit log queries
CREATE INDEX idx_audit_logs_workspace ON audit_logs(workspace_id, created_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at);
```

---

## 7. API Reference

All API endpoints are prefixed with `/api/v1/` and return JSON responses with a standardized envelope:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Authentication Endpoints

#### `POST /api/v1/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecureP@ss123",
  "plan": "starter"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "name": "John Doe", "email": "john@example.com" },
    "workspace": { "id": "uuid", "name": "John Doe's Workspace", "slug": "johns-workspace" }
  }
}
```

#### `POST /api/v1/auth/login`

Authenticate and create a session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecureP@ss123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "name": "John Doe", "email": "john@example.com" },
    "workspaces": [{ "id": "uuid", "name": "My Workspace", "slug": "my-workspace" }]
  }
}
```

#### `POST /api/v1/auth/logout`

Destroy the current session.

**Response:** `200 OK`

#### `POST /api/v1/auth/forgot-password`

Send a password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** `200 OK`

#### `POST /api/v1/auth/reset-password`

Reset password with a valid token.

**Request Body:**
```json
{
  "token": "reset-token",
  "password": "NewSecureP@ss123"
}
```

**Response:** `200 OK`

### Campaign Endpoints

#### `GET /api/v1/campaigns`

List campaigns with pagination and filtering.

**Query Parameters:**
- `page` (number, default: 1)
- `perPage` (number, default: 20)
- `status` (string: draft, scheduled, sending, sent, partial, failed)
- `search` (string: search in name)
- `sortBy` (string: created_at, name, status, sent_at)
- `sortOrder` (string: asc, desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "campaigns": [{ "id": "uuid", "name": "Welcome Series", "status": "sent", ... }]
  },
  "meta": { "page": 1, "perPage": 20, "total": 45, "totalPages": 3 }
}
```

#### `POST /api/v1/campaigns`

Create a new campaign.

**Request Body:**
```json
{
  "name": "Welcome Series",
  "subject": "Welcome to our platform!",
  "body": "We're excited to have you on board.",
  "icon": "https://example.com/icon.png",
  "image": "https://example.com/banner.png",
  "actionUrl": "https://example.com/welcome",
  "actionButtons": [
    { "label": "Get Started", "action": "https://example.com/start", "icon": "arrow_forward" }
  ],
  "channelId": "general",
  "ttl": 86400,
  "priority": "normal",
  "segmentId": "segment-uuid",
  "scheduledAt": "2025-06-01T10:00:00Z"
}
```

**Response:** `201 Created`

#### `GET /api/v1/campaigns/[id]`

Get campaign details with stats.

**Response:**
```json
{
  "success": true,
  "data": {
    "campaign": { ... },
    "stats": { "totalSent": 5000, "totalDelivered": 4850, "totalOpens": 2340, ... }
  }
}
```

#### `PUT /api/v1/campaigns/[id]`

Update a campaign (only draft status).

#### `DELETE /api/v1/campaigns/[id]`

Delete a campaign.

#### `POST /api/v1/campaigns/[id]/duplicate`

Duplicate an existing campaign.

#### `POST /api/v1/campaigns/[id]/send`

Trigger immediate sending of a scheduled or draft campaign.

**Response:**
```json
{
  "success": true,
  "data": {
    "campaignId": "uuid",
    "totalTargeted": 5000,
    "status": "sending"
  }
}
```

### Subscriber Endpoints

#### `GET /api/v1/subscribers`

List subscribers with filtering.

**Query Parameters:**
- `page`, `perPage`
- `isActive` (boolean)
- `deviceType` (string: web, ios, android)
- `country` (string: ISO code)
- `search` (string: search in token or tags)
- `sortBy`, `sortOrder`

#### `POST /api/v1/subscribers`

Register a new subscriber token.

**Request Body:**
```json
{
  "token": "fcm-registration-token",
  "deviceType": "web",
  "browser": "Chrome",
  "os": "Windows",
  "country": "US",
  "language": "en",
  "tags": ["newsletter", "product"],
  "customProperties": { "tier": "premium", "signupDate": "2025-01-15" }
}
```

#### `PUT /api/v1/subscribers/[id]`

Update subscriber properties and tags.

#### `DELETE /api/v1/subscribers/[id]`

Remove a subscriber and their token.

#### `POST /api/v1/subscribers/export`

Export subscribers as CSV.

**Request Body:**
```json
{
  "filters": { "isActive": true, "country": "US" },
  "fields": ["id", "deviceType", "country", "language", "subscribedAt"]
}
```

**Response:** CSV file download.

### Segment Endpoints

#### `GET /api/v1/segments`

List all segments for the workspace.

#### `POST /api/v1/segments`

Create a segment with rule definitions.

**Request Body:**
```json
{
  "name": "Premium US Users",
  "description": "Premium tier users in the United States",
  "rules": {
    "operator": "AND",
    "conditions": [
      { "field": "country", "operator": "eq", "value": "US" },
      { "field": "tags", "operator": "contains", "value": "premium" },
      {
        "operator": "OR",
        "conditions": [
          { "field": "deviceType", "operator": "eq", "value": "web" },
          { "field": "deviceType", "operator": "eq", "value": "ios" }
        ]
      }
    ]
  }
}
```

#### `GET /api/v1/segments/[id]`

Get segment details with estimated count.

#### `PUT /api/v1/segments/[id]`

Update segment rules.

#### `DELETE /api/v1/segments/[id]`

Delete a segment.

#### `POST /api/v1/segments/estimate-count`

Get a live count estimate for rule criteria without saving.

### Automation Endpoints

#### `GET /api/v1/automations`

List automation flows.

#### `POST /api/v1/automations`

Create an automation flow.

**Request Body:**
```json
{
  "name": "Post-Purchase Follow-up",
  "description": "Send follow-up notifications after purchase",
  "triggerType": "event",
  "triggerConfig": {
    "event": "purchase.completed",
    "delay": 0
  },
  "nodes": [
    { "id": "node-1", "type": "trigger", "config": {}, "position": { "x": 100, "y": 200 } },
    { "id": "node-2", "type": "send", "config": { "campaignId": "uuid" }, "position": { "x": 300, "y": 200 } },
    { "id": "node-3", "type": "delay", "config": { "duration": 86400 }, "position": { "x": 500, "y": 200 } },
    { "id": "node-4", "type": "condition", "config": { "field": "event.opened", "operator": "eq", "value": "true" }, "position": { "x": 700, "y": 200 } }
  ],
  "edges": [
    { "source": "node-1", "target": "node-2" },
    { "source": "node-2", "target": "node-3" },
    { "source": "node-3", "target": "node-4" }
  ]
}
```

#### `PUT /api/v1/automations/[id]`

Update automation flow.

#### `DELETE /api/v1/automations/[id]`

Delete an automation.

#### `POST /api/v1/automations/[id]/activate`

Activate a paused or draft automation.

#### `POST /api/v1/automations/[id]/pause`

Pause an active automation.

### Analytics Endpoints

#### `GET /api/v1/analytics/overview`

Get workspace-level analytics overview.

**Query Parameters:**
- `startDate`, `endDate` (ISO date strings)
- `compareTo` (same period for comparison)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalDelivered": 125000,
    "deliveryRate": 97.2,
    "openRate": 42.5,
    "clickRate": 18.3,
    "dailyStats": [
      { "date": "2025-05-01", "delivered": 4200, "opens": 1780, "clicks": 760 }
    ],
    "deviceBreakdown": [
      { "deviceType": "web", "count": 65000, "percentage": 52 }
    ],
    "countryBreakdown": [
      { "country": "US", "count": 38000, "percentage": 30.4 }
    ],
    "comparison": {
      "deliveryRateChange": 1.2,
      "openRateChange": -0.8,
      "clickRateChange": 2.1
    }
  }
}
```

#### `GET /api/v1/analytics/campaigns`

Get campaign-level analytics.

#### `GET /api/v1/analytics/export`

Export analytics data as CSV or JSON.

### Billing Endpoints

#### `GET /api/v1/billing/plans`

List all active subscription plans.

#### `GET /api/v1/billing/subscription`

Get current workspace subscription details.

#### `POST /api/v1/billing/create-subscription`

Create a new Razorpay subscription.

**Request Body:**
```json
{
  "planId": "plan-uuid",
  "billingCycle": "monthly",
  "couponCode": "SAVE20"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subscriptionId": "rzp_sub_xxxx",
    "razorpayKeyId": "rzp_live_xxxx",
    "amount": 299900,
    "currency": "INR"
  }
}
```

#### `POST /api/v1/billing/verify-payment`

Verify a Razorpay payment after checkout.

**Request Body:**
```json
{
  "razorpayPaymentId": "rzp_pay_xxxx",
  "razorpayOrderId": "rzp_order_xxxx",
  "razorpaySignature": "signature-string"
}
```

#### `POST /api/v1/billing/cancel-subscription`

Cancel the active subscription.

#### `GET /api/v1/billing/invoices`

List invoice history.

### Team Endpoints

#### `GET /api/v1/team`

List team members.

#### `POST /api/v1/team/invite`

Invite a user to the workspace.

**Request Body:**
```json
{
  "email": "colleague@example.com",
  "role": "editor"
}
```

#### `PUT /api/v1/team/[id]`

Update a team member's role.

#### `DELETE /api/v1/team/[id]`

Remove a team member.

### API Key Endpoints

#### `GET /api/v1/api-keys`

List API keys (returns only prefixes, not full keys).

#### `POST /api/v1/api-keys`

Generate a new API key.

**Request Body:**
```json
{
  "name": "Production Key",
  "scopes": ["campaigns:read", "subscribers:write"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "pn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "keyPrefix": "pn_xxxxxx",
    "name": "Production Key",
    "scopes": ["campaigns:read", "subscribers:write"]
  }
}
```

**Note:** The full key is only returned once. Store it securely.

#### `DELETE /api/v1/api-keys/[id]`

Revoke an API key.

### Webhook Endpoints

#### `POST /api/v1/webhooks/razorpay`

Razorpay webhook handler for subscription events.

**Events Handled:**
- `subscription.activated`
- `subscription.charged`
- `subscription.completed`
- `subscription.halted`
- `subscription.pending`
- `payment.failed`
- `invoice.paid`
- `invoice.partially_paid`

#### `GET /api/v1/gdpr-export`

Export all user data for GDPR compliance.

**Response:** JSON file download containing all user-associated data.

### Admin Endpoints

All admin endpoints require the admin role.

#### `GET /api/v1/admin/overview`

Platform-wide KPI dashboard data.

#### `GET /api/v1/admin/accounts`

List all user accounts with filtering.

#### `PUT /api/v1/admin/accounts/[id]/suspend`

Suspend a user account.

#### `PUT /api/v1/admin/accounts/[id]/reinstate`

Reinstate a suspended account.

#### `GET /api/v1/admin/sites`

List all workspaces (sites) on the platform.

#### `GET /api/v1/admin/billing/overview`

Platform revenue overview (MRR, ARPU, churn rate).

#### `GET /api/v1/admin/billing/failed-payments`

List failed payment transactions.

#### `GET /api/v1/admin/coupons`

Admin coupon management.

#### `POST /api/v1/admin/coupons`

Create a coupon code.

#### `GET /api/v1/admin/system/health`

System health metrics (D1 latency, FCM latency, error rates).

#### `GET /api/v1/admin/system/errors`

Recent error logs.

#### `GET /api/v1/admin/audit-logs`

Platform-wide audit log.

#### `GET /api/v1/admin/feature-flags`

List feature flags.

#### `PUT /api/v1/admin/feature-flags/[id]`

Toggle a feature flag.

### Error Responses

All API endpoints return consistent error structures:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "password", "message": "Password must be at least 8 characters" }
    ]
  }
}
```

**Common Error Codes:**
| Code | HTTP Status | Description |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
| `EXTERNAL_ERROR` | 502 | Downstream service failure |

---

## 8. Authentication & Authorization

### Authentication Flow

The platform uses a hybrid authentication approach: session-based for browser clients and API key-based for programmatic access.

#### Session Authentication

1. **Registration** — A user submits their email and password. The password is hashed with bcrypt (12 salt rounds) and stored in the `users` table. A workspace is created for the user. An HTTP-only secure session cookie is issued.

2. **Login** — The user provides email and password. The password hash is verified. On success, a session token is generated using `jsonwebtoken` with a 7-day expiry. The token is stored as an HTTP-only, SameSite=Lax, Secure cookie.

3. **Session Verification** — The middleware (`src/middleware.ts`) intercepts all requests to protected routes (`/dashboard/*`, `/admin/*`, `/api/v1/*`). It reads the session cookie, verifies the JWT signature, checks expiry, and attaches the user context to the request.

4. **Logout** — The session cookie is cleared, invalidating the browser session.

#### API Key Authentication

1. **Key Generation** — A user creates an API key from the dashboard. A 48-character key is generated with a `pn_` prefix. The full key is returned once. The key is hashed with bcrypt and stored alongside a prefix for identification.

2. **Key Usage** — The client includes the API key in the `Authorization` header: `Authorization: Bearer pn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

3. **Key Verification** — API routes check for the `Authorization` header. If present, the key is looked up by prefix, the hash is verified, and the associated workspace is determined. Scopes are checked against the requested operation.

4. **Key Revocation** — The key is marked inactive in the database. All subsequent requests with that key return 401.

#### Middleware Flow

```typescript
// Simplified middleware logic
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — no auth required
  if (isPublicPath(pathname)) return NextResponse.next();

  // Webhook routes — signature verification
  if (pathname.startsWith('/api/webhooks/')) {
    return verifyWebhookSignature(request);
  }

  // API routes — check session or API key
  if (pathname.startsWith('/api/')) {
    const session = await getSession(request);
    if (session) return attachUser(session, request);

    const apiKey = await verifyApiKey(request);
    if (apiKey) return attachWorkspace(apiKey, request);

    return unauthorizedResponse();
  }

  // Dashboard and admin routes — require session
  const session = await getSession(request);
  if (!session) return redirectToLogin(request);

  // Admin routes — require admin role
  if (pathname.startsWith('/admin') && session.role !== 'admin') {
    return forbiddenResponse();
  }

  return attachUser(session, request);
}
```

### Authorization Model

#### Roles (Hierarchical)

| Role | Description | Permissions |
|---|---|---|
| `super_admin` | Platform administrator | All platform operations, user management, system configuration |
| `owner` | Workspace owner | All workspace operations, billing management, team management |
| `admin` | Workspace administrator | All workspace operations except billing and team removal |
| `editor` | Content manager | Campaign creation and editing, subscriber management |
| `viewer` | Read-only access | View campaigns, analytics, subscribers (no mutations) |
| `api` | Programmatic access | Scoped to assigned API key permissions |

#### API Key Scopes

| Scope | Description |
|---|---|
| `campaigns:read` | List and view campaigns |
| `campaigns:write` | Create, update, delete, and send campaigns |
| `subscribers:read` | List and export subscribers |
| `subscribers:write` | Register, update, and delete subscribers |
| `segments:read` | List and view segments |
| `segments:write` | Create, update, and delete segments |
| `analytics:read` | View analytics data |
| `automations:read` | List and view automations |
| `automations:write` | Create, update, and delete automations |

#### Permission Enforcement

Permissions are enforced at two levels:

1. **Route Level** — The middleware checks for valid authentication and redirects or rejects unauthenticated requests.

2. **Service Level** — Each API handler verifies that the authenticated user or API key has the required permissions for the specific operation. This prevents path traversal and IDOR (Insecure Direct Object Reference) attacks.

```typescript
// Example permission check in campaign handler
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, workspace } = await getAuthContext(request);

  // Verify campaign belongs to the workspace
  const campaign = await db.query(
    'SELECT * FROM campaigns WHERE id = ? AND workspace_id = ?',
    [params.id, workspace.id]
  );
  if (!campaign) {
    return NextResponse.json(
      { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Campaign not found' } },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: { campaign } });
}
```

### Security Headers

The application sets the following security headers:

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https://*.razorpay.com; frame-src https://checkout.razorpay.com;"
  },
];
```

---

## 9. Campaign System

### Campaign Lifecycle

```
                     ┌─────────────┐
                     │    Draft    │
                     └──────┬──────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
                ▼           ▼           ▼
          ┌──────────┐┌──────────┐┌──────────┐
          │ Schedule  ││  Send    ││ Duplicate│
          │ (future)  ││ (now)    ││          │
          └─────┬─────┘└────┬─────┘└──────────┘
                │           │
                ▼           ▼
          ┌──────────┐┌──────────┐
          │Scheduled  ││ Sending  │
          └─────┬─────┘└────┬─────┘
                │           │
                └──────┬────┘
                       ▼
                 ┌──────────┐
                 │  Sent /  │
                 │ Partial  │
                 └──────────┘
```

### Campaign Builder (4-Step Wizard)

The campaign builder guides users through four steps with a persistent progress indicator at the top.

#### Step 1: Compose

The composition step captures the notification content:

- **Notification Title** — Short, attention-grabbing subject line (max 100 characters). A character counter shows remaining length. AI suggestion button generates title variations.
- **Notification Body** — Main message content (max 500 characters). Supports basic Markdown formatting. Live preview mirror updates on every keystroke.
- **Notification Icon** — Small icon displayed next to the title. Accepts URL input or opens an asset picker.
- **Large Image** — Optional banner image displayed in expanded notification view. Accepts URL input with preview.
- **Action URL** — Destination link when the notification is clicked. Validated for URL format.
- **Action Buttons** — Up to 3 action buttons, each with:
  - Label (max 25 characters)
  - Action URL or deep link
  - Icon selection (optional)
- **Channel ID** — FCM channel/group for Android notification grouping.
- **Priority** — Normal or High. High priority notifications bypass Do Not Disturb mode on Android.
- **Time-to-Live (TTL)** — How long the notification should be retained if the device is offline. Options: 1 hour, 4 hours, 1 day, 3 days, 7 days, or custom.

#### Step 2: Target

The targeting step defines the audience:

- **Segment Selection** — Choose from existing segments or create a new one inline. Shows segment name, description, and estimated subscriber count.
- **No Segment (All)** — Send to all active subscribers in the workspace.
- **Preview Count** — Real-time estimate of how many subscribers will receive the notification based on the selected segment.

#### Step 3: Schedule

The scheduling step determines when to send:

- **Send Now** — Immediate delivery after confirmation.
- **Schedule for Later** — Date and time picker with timezone support. Campaigns can be scheduled up to 30 days in advance.
- **Time Zone Optimization** — Option to deliver based on each subscriber's detected timezone (requires timezone data in subscriber properties). The system sends at the optimal time for each recipient.

#### Step 4: Review

The review step presents a summary of all selections:

- **Campaign Summary Card** — Shows all configuration details: title, body, image, target audience, schedule.
- **Device Preview** — Live preview showing how the notification will appear on:
  - Web (Chrome, Firefox, Safari)
  - Android
  - iOS
- **Delivery Estimate** — Total subscriber count, estimated delivery time, and batch count.
- **Confirmation Button** — "Send Campaign" or "Schedule Campaign" depending on selection.

### Campaign Template System

Campaigns can be saved as templates for reuse:

- **Template Fields** — Name, subject, body, icon, image, action buttons, channel, priority, TTL.
- **Template Variables** — Support for merge tags: `{{subscriber.name}}`, `{{subscriber.country}}`, `{{workspace.name}}`, `{{unsubscribe_url}}`.
- **Template Library** — Browse, search, and filter templates in the dashboard. Preview before applying.

### Campaign Analytics

After sending, each campaign provides:

- **Delivery Rate** — Percentage of notifications successfully delivered.
- **Open Rate** — Percentage of delivered notifications that were opened.
- **Click Rate** — Percentage of opened notifications that had an action button clicked.
- **Unique vs Total** — Both unique and total counts for opens and clicks.
- **Time Series Chart** — Delivery and engagement over time (1-hour intervals).
- **Device Breakdown** — Performance by device type.
- **Geographic Map** — Engagement by country.
- **Subscriber Activity** — List of subscribers who opened or clicked, with timestamps.

---

## 10. Push Notification Delivery

### FCM HTTP v1 API Integration

The platform uses Firebase Cloud Messaging HTTP v1 API for push notification delivery. This approach was chosen over Firebase Admin SDK for several reasons:

1. **Cost Efficiency** — The HTTP v1 API is free to use at any scale.
2. **Zero Dependency** — No need for Firebase Admin SDK, reducing bundle size and dependency complexity.
3. **Edge Compatibility** — The OAuth2 JWT assertion approach works in edge runtimes (Cloudflare Workers, Vercel Edge).
4. **Better Control** — Direct API access allows fine-grained error handling and retry logic.

### FCM Client Implementation

The FCM client (`src/lib/fcm/client.ts`) handles authentication and message sending:

1. **Service Account Key** — The service account JSON is stored as a base64-encoded environment variable (`FCM_SERVICE_ACCOUNT_JSON`).

2. **JWT Assertion** — An assertion JWT is created with the following claims:
   - `iss` — Client email from service account
   - `scope` — `https://www.googleapis.com/auth/firebase.messaging`
   - `aud` — `https://oauth2.googleapis.com/token`
   - `exp` — 1 hour from creation
   - `iat` — Current timestamp
   - `sub` — Client email

3. **Token Exchange** — The assertion JWT is exchanged for an OAuth2 access token by calling the Google OAuth2 token endpoint:
   ```
   POST https://oauth2.googleapis.com/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt>
   ```

4. **Message Sending** — The access token is used to call the FCM API:
   ```
   POST https://fcm.googleapis.com/v1/projects/<project-id>/messages:send
   Authorization: Bearer <access-token>
   Content-Type: application/json
   
   {
     "message": {
       "token": "<registration-token>",
       "notification": {
         "title": "<title>",
         "body": "<body>",
         "image": "<image-url>"
       },
       "webpush": { ... },
       "android": { ... },
       "apns": { ... },
       "fcm_options": { ... }
     }
   }
   ```

5. **Token Caching** — Access tokens are cached in Cloudflare KV until 5 minutes before expiry to reduce OAuth2 token exchange requests.

### Campaign Sender Implementation

The campaign sender (`src/lib/fcm/campaign-sender.ts`) orchestrates bulk delivery:

```typescript
// Simplified flow
async function sendCampaign(campaign: Campaign, subscribers: Subscriber[]): Promise<DeliveryResult> {
  const tokens = subscribers.filter(s => s.is_active).map(s => s.token);
  const batches = chunk(tokens, 500); // FCM batch limit

  let sent = 0, failed = 0;

  for (const batch of batches) {
    const results = await Promise.allSettled(
      batch.map(token => sendSingleMessage(campaign, token))
    );

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.success) {
        sent++;
      } else {
        failed++;
        if (result.value?.error === 'UNREGISTERED') {
          await markTokenStale(result.value.token);
        }
      }
    }

    // Throttle between batches (1 second)
    await delay(1000);
  }

  return { sent, failed, total: tokens.length };
}
```

### Error Handling

| FCM Error | Action |
|---|---|
| `UNREGISTERED` | Remove token from subscribers table |
| `INVALID_ARGUMENT` | Remove token from subscribers table |
| `SENDER_ID_MISMATCH` | Log error, investigate FCM configuration |
| `QUOTA_EXCEEDED` | Implement exponential backoff, retry |
| `UNAVAILABLE` | Retry with backoff (server transient error) |
| `INTERNAL` | Retry with backoff |
| `THIRD_PARTY_AUTH_ERROR` | Refresh OAuth2 token, retry once |

### Delivery Recording

Each delivery attempt is recorded in `campaign_deliveries`:

```typescript
await db.execute(
  `INSERT INTO campaign_deliveries (id, campaign_id, subscriber_id, token, status, error_message)
   VALUES (?, ?, ?, ?, ?, ?)`,
  [uuid(), campaign.id, subscriber.id, token, status, error]
);
```

After all batches complete, `campaign_stats` are updated:

```sql
UPDATE campaign_stats
SET total_sent = ?, total_delivered = ?, total_failed = ?
WHERE campaign_id = ?
```

---

## 11. Subscriber Management

### Subscription Flow

1. **Permission Request** — The client SDK requests notification permission from the browser (Notification.requestPermission for web, FCM SDK for mobile).

2. **Token Generation** — On permission grant, FCM generates a unique registration token for the device-browser pair.

3. **Token Registration** — The client calls `POST /api/v1/subscribers` with the token and device metadata.

4. **Token Storage** — The token is stored in the `subscribers` table, linked to the workspace.

5. **Token Refresh** — FCM tokens can change under certain conditions (app reinstall, browser data clear, token expiry). The client SDK handles token refresh events and calls the API to update the stored token.

6. **Unsubscription** — The client can call `DELETE /api/v1/subscribers/[id]` or mark as inactive through the dashboard.

### Subscriber Properties

The platform supports rich subscriber metadata:

- **Device Information** — Device type (web, ios, android), browser name, operating system, user agent.
- **Geographic Data** — Country (ISO code), language (ISO code), timezone.
- **Custom Tags** — Arbitrary string tags for classification (e.g., "newsletter", "promotional", "transactional").
- **Custom Properties** — Key-value pairs for any subscriber attribute (e.g., `{ "tier": "premium", "signup_date": "2025-01-15", "total_purchases": 12 }`).
- **Engagement Data** — Last active timestamp, total notifications received, total notifications opened.

### Subscriber Search and Filtering

The subscriber list supports:

- **Full-Text Search** — Search across token, tags, and custom properties.
- **Device Filter** — Filter by device type, browser, operating system.
- **Geographic Filter** — Filter by country and language.
- **Date Range** — Filter by subscription date, last active date.
- **Status Filter** — Active vs unsubscribed.
- **Custom Property Filter** — Filter by any custom property key-value pair.

### CSV Export

Subscribers can be exported as CSV with:

- Selectable fields to include
- Filtered by current search/filter criteria
- Date range for subscription period
- Automatic file download with timestamp in filename

---

## 12. Segmentation Engine

### Rule Architecture

Segments are defined by a tree of rules stored as JSON:

```typescript
interface RuleNode {
  operator?: 'AND' | 'OR' | 'NOT';
  conditions?: RuleCondition[];
  children?: RuleNode[];
}

interface RuleCondition {
  field: string;       // e.g., "country", "deviceType", "tags", "custom.tier"
  operator: ConditionOperator;
  value: string | number | string[];
}

type ConditionOperator =
  | 'eq'               // Equals
  | 'neq'              // Not equals
  | 'contains'         // Array contains
  | 'not_contains'     // Array does not contain
  | 'gt'               // Greater than (numeric)
  | 'gte'              // Greater than or equal (numeric)
  | 'lt'               // Less than (numeric)
  | 'lte'              // Less than or equal (numeric)
  | 'between'          // Between two values
  | 'in'               // In a list
  | 'not_in'           // Not in a list
  | 'exists'           // Property exists
  | 'not_exists'       // Property does not exist
  | 'starts_with'      // String starts with
  | 'ends_with'        // String ends with
  | 'matches';         // Regex match
```

### Rule Builder Component

The segment rule builder (`SegmentRuleBuilder.tsx`) provides a visual query builder:

- **Root Level** — AND/OR toggle that determines how top-level conditions are combined.
- **Condition Rows** — Each row has:
  - **Field Selector** — Dropdown with available subscriber fields (country, deviceType, browser, os, language, tags, custom properties).
  - **Operator Selector** — Dropdown with operators relevant to the selected field type.
  - **Value Input** — Dynamically rendered input based on the operator (text, number, dropdown for enums, date picker, multi-select).
  - **Delete Button** — Remove the condition.
- **Grouping** — Conditions can be nested into groups with their own AND/OR operators.
- **Add Condition** — Button to add a new condition at the current level.
- **Add Group** — Button to create a new nested rule group.

### Segment Count Estimation

When building or editing a segment, the system provides a live subscriber count estimate:

1. The rule tree is serialized as JSON.
2. The JSON is sent to `POST /api/v1/segments/estimate-count`.
3. The server translates the rule tree into a parameterized SQL query:

```typescript
function buildSegmentQuery(rules: RuleNode, workspaceId: string): { sql: string; params: any[] } {
  // Recursive SQL generation from rule tree
  // Each condition maps to a WHERE clause
  // Groups map to parenthesized sub-clauses
  // Returns a complete SELECT COUNT(*) query
}
```

4. The count is returned and displayed in the UI, updating as rules change.

### Example Segment Definitions

**Premium Users in the US:**
```json
{
  "operator": "AND",
  "conditions": [
    { "field": "country", "operator": "eq", "value": "US" },
    { "field": "tags", "operator": "contains", "value": "premium" }
  ]
}
```

**Active Web Users Who Haven't Opened in 7 Days:**
```json
{
  "operator": "AND",
  "conditions": [
    { "field": "deviceType", "operator": "eq", "value": "web" },
    { "field": "isActive", "operator": "eq", "value": true },
    { "field": "lastActiveAt", "operator": "lt", "value": "7 days ago" }
  ]
}
```

**High-Value Customers (Tier = Platinum OR totalPurchases > 10):**
```json
{
  "operator": "OR",
  "conditions": [
    { "field": "custom.tier", "operator": "eq", "value": "platinum" },
    { "field": "custom.totalPurchases", "operator": "gt", "value": 10 }
  ]
}
```

---

## 13. Automation Flows

### Flow Architecture

Automation flows are directed acyclic graphs (DAGs) of nodes connected by edges. Each node represents an action or decision, and edges represent the flow of execution.

### Node Types

| Node Type | Description | Configuration |
|---|---|---|
| **Trigger** | Starts the automation flow | Event type, event-specific config |
| **Send** | Sends a notification | Campaign template ID, merge variables |
| **Delay** | Waits before proceeding | Duration (seconds, minutes, hours, days) |
| **Condition** | Branches based on subscriber data | Field, operator, value (true/false branches) |
| **Loop** | Iterates over a set of values | Variable name, source array |
| **Webhook** | Calls an external API | URL, method, headers, body template |
| **Update** | Updates subscriber properties | Field, operation (set, add, remove), value |
| **Tag** | Adds or removes tags | Tag name, action (add, remove) |

### Trigger Types

| Trigger | Description | Config |
|---|---|---|
| `signup.completed` | User completes signup | Delay before trigger |
| `purchase.completed` | User makes a purchase | Minimum purchase amount |
| `session.ended` | User ends a session | Minimum session duration |
| `custom.event` | Custom event from API | Event name, property filters |
| `schedule` | Time-based trigger | Cron expression, timezone |
| `webhook.received` | External webhook call | Webhook secret, body filter |

### Flow Canvas

The automation flow canvas (`AutomationCanvas.tsx`) provides a visual drag-and-drop editor:

- **Node Palette** — Sidebar with available node types that can be dragged onto the canvas.
- **Canvas Area** — Infinite scroll/pan area where nodes are placed and connected.
- **Node Rendering** — Each node is rendered as a card with:
  - Node type icon and color
  - Node label
  - Configuration summary
  - Input/output ports for edge connections
- **Edge Creation** — Click and drag from an output port to an input port to create an edge.
- **Node Selection** — Click a node to select it, revealing configuration options in a side panel.
- **Node Configuration Panel** — Context-sensitive form that appears when a node is selected, allowing detailed configuration of the node's behavior.
- **Validation** — Real-time validation showing disconnected nodes, empty branches, and configuration errors.

### Execution Model

When an automation is active:

1. A subscriber action triggers the automation.
2. The system creates an execution context for that subscriber.
3. The flow graph is traversed from the trigger node.
4. Each node executes according to its type:
   - **Send**: Creates and queues a notification.
   - **Delay**: Schedules continuation after the delay period.
   - **Condition**: Evaluates the condition and follows the appropriate branch.
5. The execution continues until a terminal node (end) is reached.
6. Execution state is persisted for long-running flows (with delays).

---

## 14. Analytics & Insights

### Analytics Dashboard

The analytics dashboard provides a comprehensive view of notification performance:

#### Overview Metrics

- **Total Delivered** — Number of notifications successfully sent to devices.
- **Delivery Rate** — Percentage of attempted deliveries that succeeded.
- **Open Rate** — Percentage of delivered notifications that were opened.
- **Click Rate** — Percentage of opened notifications that had an action clicked.
- **Active Subscribers** — Number of active, opted-in subscribers.
- **Subscriber Growth** — Net subscriber change over the selected period.

#### Charts and Visualizations

1. **Delivery Trend** — Area chart showing daily delivered notifications over time. Supports comparison with a previous period (displayed as a dashed overlay).

2. **Engagement Funnel** — Horizontal bar chart showing the drop-off from delivered → opened → clicked:

   ```
   Delivered ████████████████████████████████ 125,000 (100%)
   Opened    ██████████████------------------ 53,125  (42.5%)
   Clicked   ██████-------------------------- 9,562   (18.0% of opens)
   ```

3. **Device Breakdown** — Pie or donut chart showing distribution by device type (web, iOS, Android).

4. **Geographic Map** — Interactive world map with country-level engagement overlaid as a heat map.

5. **Day-of-Week Heatmap** — Grid showing engagement intensity by day of week and hour of day.

6. **Top Campaigns** — Ranked list of campaigns by open rate, click rate, or total deliveries.

#### Date Range Controls

- Preset ranges: Last 7 days, Last 30 days, Last 90 days, Last 12 months
- Custom date range with date pickers
- Comparison toggle: Compare with previous period (same length, immediately before)

### Campaign Analytics

Each campaign has its own analytics view:

- **Delivery Summary** — Card showing sent, delivered, failed counts with percentages.
- **Engagement Timeline** — Line chart showing opens and clicks over time since send.
- **Subscriber Activity** — Table showing subscribers who opened/clicked with timestamps.
- **Delivery Errors** — Table of failed deliveries with error reasons, if any.

### AI-Powered Insights

The analytics page includes AI-generated insights:

- **Summary Generation** — A natural language summary of campaign performance:

  > "Your campaign 'Summer Sale 2025' had a 47.2% open rate, which is 12% above your 30-day average. Web users performed best with a 52.1% open rate, while Android users lagged at 38.5%. The optimal send time for this campaign was between 10:00 AM and 11:00 AM EST."

- **Anomaly Detection** — Identifies statistically significant deviations from normal patterns:

  > "Delivery rate dropped by 15% on May 15. This correlates with the FCM service outage reported between 14:00-15:30 UTC."

- **Recommendations** — Actionable suggestions based on data:

  > "Consider A/B testing subject lines for your next campaign. Short subject lines (under 40 characters) performed 23% better in your last 5 campaigns."

### CSV Export

Analytics data can be exported as CSV for external analysis:

- **Campaign Report** — Per-campaign delivery and engagement data.
- **Subscriber Report** — Subscriber list with engagement metrics.
- **Daily Summary** — Day-by-day delivery and engagement counts.

---

## 15. AI Features

### AI Tools Hub

The AI Tools dashboard provides access to all AI-powered features:

#### Subject Line Generator

Generates multiple subject line variations for a campaign based on the body content:

1. User enters the campaign body text.
2. Optionally provides context (campaign goal, target audience, tone preferences).
3. AI generates 5-10 subject line suggestions.
4. User can refine, combine, or regenerate suggestions.

**Implementation Note:** This is a placeholder for future AI API integration. Currently uses a template-based generation approach with randomized variations from curated lists.

#### Send Time Optimization

Predicts the optimal send time for each subscriber based on historical engagement:

1. Analyzes historical open times for each subscriber.
2. Clusters subscribers into time-based cohorts (morning, afternoon, evening, night).
3. For subscribers without sufficient history, falls back to workspace-level optimal times.
4. Returns a recommended send time or a time distribution chart.

**Implementation Note:** This is a placeholder for future ML model integration. Currently uses workspace-wide engagement patterns to recommend optimal times.

#### Segment Discovery

Automatically identifies natural audience segments based on subscriber behavior:

1. Analyzes subscriber attributes and engagement patterns.
2. Uses clustering algorithms to group similar subscribers.
3. Returns suggested segments with descriptions and estimated sizes.

**Implementation Note:** This is a placeholder for future ML integration. Currently returns template segments based on common patterns (device type, geographic location, engagement level).

#### Content Personalization

Generates personalized notification content for individual subscribers:

1. Takes a base template with merge variables.
2. Fills merge variables with subscriber-specific data.
3. Optionally rephrases content based on subscriber preferences and past engagement.

**Implementation Note:** Basic merge variable replacement is implemented. Advanced personalization requires future NLP integration.

#### Churn Prediction

Identifies subscribers at risk of unsubscribing:

1. Analyzes engagement trends (decreasing open rates, increasing time between opens).
2. Assigns a churn risk score (0-100) to each subscriber.
3. Flags high-risk subscribers for re-engagement campaigns.

**Implementation Note:** This is a placeholder for future ML model integration. Currently uses a heuristic scoring based on recency, frequency, and engagement trend.

### AI Insight Generation

The analytics dashboard includes AI-powered natural language insights:

- **Campaign Performance Summary** — Generated on demand when viewing campaign analytics.
- **Workspace Health Report** — Weekly summary of workspace performance trends.
- **Anomaly Alerts** — Automatic detection of significant metric changes.

**Implementation:** AI insights are generated by template-based natural language generation with dynamic variable insertion. The system analyzes metric comparisons, identifies notable changes (above/below thresholds), and constructs coherent paragraphs.

---

## 16. Billing & Subscription

### Pricing Plans

| Plan | Monthly | Annual (per month) | Subscribers | Features |
|---|---|---|---|---|
| Free | $0 | $0 | 1,000 | Basic campaigns, standard analytics, 1 team member |
| Starter | $29 | $24 (Save 17%) | 10,000 | All Free + segments, automation, 5 team members |
| Growth | $99 | $79 (Save 20%) | 50,000 | All Starter + AI insights, API access, 20 team members |
| Scale | $299 | $249 (Save 17%) | 200,000 | All Growth + priority support, dedicated infra, unlimited team |

### Subscription Flow

1. **Plan Selection** — User selects a plan and billing cycle on the pricing page.
2. **Account Creation** — If not logged in, user completes registration. The selected plan is passed as a query parameter and preserved through the auth flow.
3. **Checkout Initiation** — The Razorpay checkout is initialized:
   - Frontend calls `POST /api/v1/billing/create-subscription` with plan ID and billing cycle.
   - Server creates a Razorpay subscription using the Razorpay API.
   - Server returns the subscription ID and Razorpay key.
4. **Payment Processing** — The Razorpay checkout widget opens in the browser:
   - User enters payment details (card, UPI, net banking, wallet).
   - Razorpay processes the payment and triggers a callback.
5. **Payment Verification** — On successful payment:
   - Frontend calls `POST /api/v1/billing/verify-payment` with payment details.
   - Server verifies the Razorpay signature.
   - Server updates the workspace subscription status and plan.
   - Server responds with success.
6. **Confirmation** — The user is redirected to the dashboard with a success message.

### Razorpay Integration

The Razorpay integration (`src/lib/razorpay.ts`) handles:

- **Subscription Creation** — Creates Razorpay subscriptions with plan mapping.
- **Payment Verification** — Verifies payment signatures using HMAC SHA256.
- **Webhook Processing** — Handles webhook events for subscription lifecycle:
  - `subscription.activated` — Marks subscription as active.
  - `subscription.charged` — Updates next billing date.
  - `subscription.completed` — Marks subscription as completed.
  - `subscription.halted` — Marks subscription as past due.
  - `payment.failed` — Records payment failure, sends notification.
- **Invoice Management** — Fetches and caches invoice data.

### Coupon System

Coupons can be created via the admin panel:

| Field | Description |
|---|---|
| Code | Unique coupon code (uppercase, alphanumeric) |
| Discount Type | Percentage or fixed amount |
| Discount Value | Percentage (1-100) or amount in paise |
| Applicable Plans | Which plans the coupon works with |
| Max Redemptions | Usage limit (optional) |
| Expiry Date | Coupon validity period |
| Min Amount | Minimum subscription amount required |

### Failed Payment Handling

1. Payment failure is detected via Razorpay webhook.
2. The workspace is flagged as past due.
3. An audit log entry is created.
4. An email notification is sent to the workspace owner.
5. The owner can retry payment from the subscription settings.
6. After 14 days of failed payment, the subscription is cancelled and workspace is downgraded.

---

## 17. Admin Panel

The admin panel provides platform-wide management and monitoring capabilities.

### Overview Dashboard

- **Platform KPIs** — Total users, total workspaces, total subscribers, total campaigns sent.
- **Revenue Metrics** — MRR, ARPU, churn rate, total revenue.
- **Growth Chart** — User and workspace growth over time.
- **Recent Activity** — Latest platform events and actions.

### Account Management

- **User List** — Searchable, filterable table of all platform users.
- **User Details** — View user information, associated workspaces, subscription status.
- **Account Actions** — Suspend or reinstate user accounts with reason input and confirmation modal.
- **Account Analytics** — Per-user metrics (total campaigns, subscribers, activity timeline).

### Website Oversight

- **Workspace List** — All workspaces with owner, plan, subscriber count, status.
- **Workspace Details** — Subscriber breakdown, campaign history, billing status.
- **Workspace Actions** — Suspend workspace, change plan, reset API keys.

### Revenue & Billing

- **MRR Chart** — Monthly recurring revenue trend.
- **Active Subscriptions** — Count of active subscriptions by plan.
- **Failed Payments** — List of failed payments with retry option.
- **Cancellation Analysis** — Cancellation reasons and churn type breakdown.
- **Coupon Performance** — Coupon usage statistics (redemptions, revenue, conversion rate).
- **Plan Distribution** — Subscriber count by plan.

### Blog CMS

- **Article List** — All blog posts with status (draft, published, archived).
- **Article Editor** — Rich text editor with:
  - Title, slug, excerpt
  - Cover image
  - Content (with heading, image, code block support)
  - SEO fields (meta title, meta description, canonical URL)
  - Tags and categories
  - Author assignment
  - Publish/draft toggle

### System Health

- **D1 Database** — Query latency, row counts, migration status.
- **FCM API** — Latency, success rate, quota usage.
- **Error Logs** — Recent application errors with stack traces and context.
- **Cache Status** — KV cache hit/miss ratios.

### Coupons & Discounts

- **Coupon List** — All active and expired coupons.
- **Coupon Creation** — Form with fields for code, discount type/value, applicable plans, limits, expiry.
- **Coupon Performance** — Redemption stats per coupon.

### Audit Logs & Feature Flags

- **Audit Log** — Filterable, searchable log of all platform actions:
  - User, action, resource type, resource ID timestamps.
  - Filters: action type, user, date range, resource type.
- **Feature Flags** — Toggle platform features on/off:
  - Flag name, description, current state, last modified.
  - Toggle with confirmation and audit trail.

---

## 18. SDK Integration

### Web SDK

The Prontly Notify Web SDK enables push notification support in web applications.

#### Installation

```html
<script src="https://cdn.prontly.com/sdk/v1/prontly.js"></script>
```

Or via npm:

```bash
npm install @prontly/notify-sdk
```

#### Initialization

```javascript
import { ProntlyNotify } from '@prontly/notify-sdk';

const prontly = new ProntlyNotify({
  apiKey: 'pn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  workspaceId: 'workspace-uuid',
  serviceWorkerUrl: '/service-worker.js',
});

prontly.init();
```

#### Service Worker

```javascript
// service-worker.js
importScripts('https://cdn.prontly.com/sdk/v1/prontly-sw.js');
```

#### Subscriber Registration

```javascript
// Request notification permission and register the subscriber
const subscriber = await prontly.subscribe({
  tags: ['newsletter', 'product-updates'],
  customProperties: {
    tier: 'premium',
    signupDate: '2025-01-15',
  },
});

console.log('Subscriber registered:', subscriber.id);
```

#### Events and Tracking

```javascript
// Track notification open
prontly.trackNotificationOpen(campaignDeliveryId);

// Track notification click
prontly.trackNotificationClick(campaignDeliveryId, buttonIndex);

// Track custom events for automation triggers
prontly.track('purchase.completed', {
  amount: 4999,
  currency: 'USD',
  productId: 'prod_123',
});

// Update subscriber properties
prontly.updateSubscriber({
  tags: ['vip'],
  customProperties: { totalPurchases: 12 },
});

// Unsubscribe
prontly.unsubscribe();
```

#### Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | string | required | Prontly Notify API key |
| `workspaceId` | string | required | Workspace identifier |
| `serviceWorkerUrl` | string | `/prontly-sw.js` | Service worker file path |
| `autoRegister` | boolean | `true` | Auto-register on init |
| `debug` | boolean | `false` | Enable debug logging |
| `baseUrl` | string | `https://api.prontly.com` | API base URL |
| `vapidKey` | string | from config | FCM VAPID key for push |

#### Security

- The SDK generates a cryptographically random device ID for each installation.
- All API calls use HTTPS with TLS 1.3.
- API keys are included in the `Authorization` header, never in URLs.
- Subscriber tokens are transmitted securely and stored encrypted at rest.

### Integration Setup

The integration setup page guides users through SDK installation:

1. **SDK Selection** — Choose platform (Web, iOS, Android, React Native, Flutter).
2. **Code Snippet** — Copy-paste installation code with pre-filled workspace credentials.
3. **Verification** — Test the integration by sending a test notification.
4. **Troubleshooting** — Common issues and solutions.

### Code Snippet Display

The integration page (`IntegrationSnippet.tsx`) provides:

- **Syntax Highlighting** — Language-specific code display with copy button.
- **Live Preview** — See how the code looks in context.
- **Credential Injection** — Workspace-specific values automatically filled.
- **Multiple Frameworks** — Vanilla JS, React, Vue, Angular examples.

---

## 19. Security

### Data Encryption

#### At Rest

- **Passwords** — Hashed with bcrypt (12 salt rounds). No plain-text passwords are stored.
- **API Keys** — Full key is hashed with bcrypt. Only the prefix (first 8 characters) is stored for identification.
- **FCM Tokens** — Stored as-is (they are already opaque strings). Access is restricted to the owning workspace.
- **Session Tokens** — JWT signed with a server-side secret. Tokens contain user ID and workspace ID, never passwords or sensitive data.

#### In Transit

- All HTTP traffic is redirected to HTTPS.
- TLS 1.3 is enforced for all API communications.
- HSTS headers are set with `max-age=63072000; includeSubDomains; preload`.
- Razorpay checkout loads via HTTPS with integrity verification.

### Authentication Security

- **Session Tokens** — HTTP-only, Secure, SameSite=Lax cookies. 7-day expiry. Tokens are signed with a 256-bit HMAC key.
- **Password Policy** — Minimum 8 characters, must contain uppercase, lowercase, number, and special character. Password strength meter provides real-time feedback.
- **Rate Limiting** — Login attempts are rate-limited to 5 per minute per IP address. Password reset requests are rate-limited to 1 per minute per email.
- **Account Lockout** — After 10 failed login attempts, the account is locked for 15 minutes.
- **Email Verification** — New accounts require email verification before accessing dashboard features.

### API Security

- **API Key Authentication** — Alternative to session auth for programmatic access.
- **Scope Enforcement** — Each API key has defined scopes that are checked on every request.
- **Request Validation** — All inputs are validated against Zod schemas. SQL injection is prevented by parameterized queries.
- **CSRF Protection** — State-changing operations require SameSite cookies. API endpoints validate content types.

### Webhook Security

- **Signature Verification** — Webhook payloads are verified against stored secrets using HMAC SHA256.
- **Idempotency** — Webhook handlers deduplicate events using event IDs.
- **IP Allowlisting** — Webhook endpoints are configured to accept requests only from Razorpay IP ranges.

### Infrastructure Security

- **Edge Network** — All traffic passes through Cloudflare's edge network, providing DDoS protection, WAF, and bot management.
- **Database** — D1 is accessed only through parameterized queries. No direct database access from outside the application.
- **Environment Variables** — Secrets are stored as environment variables, never committed to version control.
- **Dependencies** — Regular security audits via `npm audit`. Dependencies are pinned to specific versions.

### GDPR Compliance

- **Data Export** — The GDPR export endpoint (`/api/v1/gdpr-export`) returns all user-associated data in JSON format:
  - User profile (name, email, creation date)
  - Workspace memberships
  - Websites/sites
  - Subscribers (anonymized tokens)
  - Campaigns
  - Audit logs
- **Data Retention** — User data is retained for the duration of the account. Upon account deletion, data is purged within 30 days.
- **Cookie Consent** — The platform uses only essential cookies for authentication. No tracking cookies are used.
- **Data Processing** — All data processing occurs within the user's chosen region (via Cloudflare's global network).

---

## 20. Deployment

### Environment Configuration

#### Required Environment Variables

```bash
# Application
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Prontly Notify

# Database
DATABASE_URL=libsql://your-database.turso.io

# Authentication
JWT_SECRET=<256-bit random secret>

# Firebase Cloud Messaging
NEXT_PUBLIC_FCM_VAPID_KEY=<vapid-public-key>
FCM_SERVICE_ACCOUNT_JSON=<base64-encoded-firebase-service-account>

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=<razorpay-key-id>
RAZORPAY_KEY_SECRET=<razorpay-key-secret>
RAZORPAY_WEBHOOK_SECRET=<razorpay-webhook-secret>
```

#### Optional Environment Variables

```bash
# Feature Flags
NEXT_PUBLIC_ENABLE_AI_FEATURES=true

# Monitoring
SENTRY_DSN=<sentry-dsn>

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000
```

### Build and Deploy

#### Standard Deployment

```bash
# Install dependencies
npm ci

# Build the application
npm run build

# Start the production server
npm start
```

#### Docker Deployment

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t prontly-notify .
docker run -p 3000:3000 --env-file .env.production prontly-notify
```

#### Cloudflare Pages Deployment

```bash
# Build
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .next
```

### Database Migrations

Migrations are managed through SQL files in `db/migrations/`:

```bash
# Apply all pending migrations
npx wrangler d1 execute prontly-notify --file=db/migrations/0001_init.sql
npx wrangler d1 execute prontly-notify --file=db/migrations/0002_razorpay_plans.sql

# In production
npx wrangler d1 execute prontly-notify --remote --file=db/migrations/0001_init.sql
```

### Monitoring and Observability

#### Health Check Endpoint

`GET /api/v1/admin/system/health` returns:

```json
{
  "success": true,
  "data": {
    "database": {
      "status": "healthy",
      "latencyMs": 12,
      "connectionCount": 5
    },
    "fcm": {
      "status": "healthy",
      "latencyMs": 145,
      "tokenExpiryMs": 3200000
    },
    "cache": {
      "status": "healthy",
      "hitRate": 0.87
    },
    "uptime": 345600,
    "version": "1.0.0"
  }
}
```

#### Error Logging

Application errors are caught by the global error boundary and logged to the `audit_logs` table with:

- Error message and stack trace
- Request URL and method
- User ID (if authenticated)
- Workspace ID (if applicable)
- Timestamp

#### Performance Monitoring

- **API Latency** — Each API call is timed and logged.
- **Campaign Delivery Rate** — Real-time delivery success rate monitoring.
- **Database Query Performance** — Slow query logging (queries exceeding 500ms).
- **Cache Hit Ratio** — KV cache performance tracking.

---

## 21. Performance Optimization

### Frontend Performance

#### Code Splitting

The application uses dynamic imports for heavy components to reduce the initial bundle size:

```typescript
import dynamic from 'next/dynamic';

const DataTable = dynamic(() => import('@/components/ui/DataTable'), {
  loading: () => <Skeleton variant="table" />,
});

const AnalyticsChart = dynamic(() => import('@/components/domain/AnalyticsChart'), {
  loading: () => <Skeleton variant="chart" />,
});

const RazorpayCheckout = dynamic(() => import('@/components/billing/RazorpayCheckout'), {
  loading: () => <Skeleton variant="card" />,
});
```

#### Image Optimization

- All images use Next.js `Image` component for automatic optimization.
- Images are served from Cloudflare's CDN with cache headers.
- Placeholder blur-up technique for below-the-fold images.

#### Font Optimization

- Sora and Inter fonts are self-hosted with `font-display: swap`.
- Font files are subset to Latin character sets.
- Preload hints for critical font files.

#### Bundle Analysis

The application is structured to minimize bundle size:

- UI primitives are tree-shakeable.
- Chart libraries are loaded only on analytics pages.
- Razorpay SDK is loaded on-demand during checkout.
- 85+ Lighthouse performance score maintained.

### Database Performance

#### Indexing Strategy

All query patterns are covered by composite indexes:

- **Workspace-scoped queries** — Indexed by `workspace_id` + relevant column.
- **Status-based queries** — Indexed by `status` + `created_at` for efficient filtering.
- **Date range queries** — Indexed by date columns for range scans.

#### Query Optimization

- All queries use parameterized statements to benefit from query plan caching.
- COUNT queries for large tables use indexed columns only.
- Pagination uses offset/limit with ordered indexes.
- Bulk inserts use batched statements (500 rows per batch).

#### Connection Management

- Connection pooling is configured for concurrent requests.
- Read replicas can be added for analytics queries (future capability).
- Query timeout is set to 10 seconds for complex analytics queries.

### Caching Strategy

#### Cloudflare KV Cache

- **FCM Access Tokens** — Cached for 55 minutes (tokens expire at 60 minutes).
- **Plan Data** — Cached for 1 hour (rarely changes).
- **Public Content** — Blog posts, pricing, FAQ cached for 5 minutes.
- **Segment Counts** — Cached for 30 seconds (near real-time).

#### Browser Cache

- Static assets (CSS, JS, fonts) cached for 1 year with content hash in filename.
- API responses include appropriate `Cache-Control` headers.
- Public pages use `stale-while-revalidate` strategy.

#### Next.js Cache

- Static pages are pre-rendered at build time.
- ISR (Incremental Static Regeneration) for blog and documentation pages.
- Server components cache fetch results within a request.

### Edge Optimizations

#### Middleware

- Authentication checks run at the edge before reaching the server.
- Redirects and rewrites are handled at the edge.
- Bot detection and rate limiting at the edge layer.

#### Response Compression

- All responses use gzip compression.
- Static assets are pre-compressed at build time with Brotli.

---

## 22. Testing

### Testing Philosophy

The project follows a pragmatic testing approach:

- **Unit Tests** — Test individual functions and utilities in isolation.
- **Component Tests** — Test UI components with user interaction simulation.
- **Integration Tests** — Test API endpoints and data flow (future).
- **E2E Tests** — Test critical user journeys (future).

### Test Structure

```
tests/
├── components/
│   ├── Badge.test.tsx
│   ├── Breadcrumb.test.tsx
│   ├── Button.test.tsx
│   ├── StepsIndicator.test.tsx
│   └── UsageMeter.test.tsx
└── lib/
    └── utils.test.ts
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npx vitest --coverage

# Run specific test file
npx vitest tests/components/Button.test.tsx
```

### Test Examples

#### Utility Test

```typescript
// tests/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatNumber, truncate } from '@/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'active')).toBe('base active');
  });

  it('removes conflicting Tailwind classes', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2');
  });
});

describe('formatDate', () => {
  it('formats ISO date string', () => {
    expect(formatDate('2025-01-15T10:30:00Z')).toBe('Jan 15, 2025');
  });
});

describe('formatNumber', () => {
  it('formats with commas', () => {
    expect(formatNumber(1250000)).toBe('1,250,000');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 5)).toBe('He...');
  });

  it('does not truncate short strings', () => {
    expect(truncate('Hi', 5)).toBe('Hi');
  });
});
```

#### Component Test

```typescript
// tests/components/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading')).toBeDefined();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testing Standards

- **Coverage Target** — 80%+ for utility functions, 70%+ for UI components.
- **Mock Strategy** — External services (FCM, Razorpay, database) are mocked. Business logic is tested with real implementations of internal functions.
- **Accessibility** — Component tests verify ARIA labels, roles, and keyboard navigation.
- **State Coverage** — Components are tested in loading, empty, error, and success states.

---

## 23. Contributing

### Development Workflow

1. **Fork the Repository** — Create a personal fork on GitHub.
2. **Create a Feature Branch** — Branch from `main` with a descriptive name: `feat/campaign-scheduler`, `fix/delivery-tracking`.
3. **Set Up Development Environment** — Follow the [Getting Started](#getting-started) section.
4. **Make Changes** — Follow the coding standards below.
5. **Write Tests** — Add tests for new functionality.
6. **Run Tests** — Ensure all tests pass.
7. **Submit a Pull Request** — Open a PR against `main` with a clear description.

### Coding Standards

#### TypeScript

- **Strict Mode** — The project uses TypeScript strict mode. All variables must have explicit types or be inferrable.
- **No `any`** — Avoid using `any` type. Use `unknown` if the type is truly unknown, then narrow with type guards.
- **Functional Style** — Prefer pure functions and immutability. Avoid classes for business logic.
- **Async/Await** — Use async/await over raw promises. Use `Promise.all` for concurrent operations.

#### React

- **Server Components** — Default to server components for data fetching and static content. Use `"use client"` only when interactivity is required.
- **Client Components** — Minimize client component scope. Colocate related state and effects.
- **Hooks** — Custom hooks for reusable stateful logic. Hooks should have a single responsibility.
- **Props** — Use TypeScript interfaces for prop types. Destructure props in function arguments.

#### CSS

- **Tailwind CSS** — Use Tailwind utility classes. Custom CSS is for complex animations and third-party overrides only.
- **Design System** — Use the UI primitive components (`Button`, `Card`, `Badge`, etc.) instead of raw HTML elements.
- **Responsive Design** — Mobile-first approach. Test on mobile, tablet, and desktop breakpoints.

#### Git

- **Commit Messages** — Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- **Atomic Commits** — Each commit represents a single logical change.
- **Branch Naming** — `feat/description`, `fix/description`, `chore/description`.

### Pull Request Process

1. **Description** — Clearly describe the change, motivation, and testing approach.
2. **Screenshots** — Include before/after screenshots for UI changes.
3. **Checklist** — Ensure:
   - [ ] Code follows project coding standards
   - [ ] Tests pass
   - [ ] New tests added
   - [ ] TypeScript has no errors
   - [ ] Build succeeds
   - [ ] No new warnings
4. **Review** — Request review from at least one team member.
5. **Merge** — Squash merge into `main` with a clean commit message.

---

## 24. License

Copyright (c) 2025 Prontly Technologies. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, modification, or use of this software, via any medium, is strictly prohibited without the express written permission of Prontly Technologies.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

---

*Prontly Notify — Enterprise Push Notification Infrastructure*
