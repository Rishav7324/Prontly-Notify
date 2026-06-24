# Prontly Notify website blueprint implementation

**Session ID:** ses_10b1e1284ffe4Z5iiTpye7rK30
**Created:** 6/23/2026, 7:58:27 PM
**Updated:** 6/23/2026, 9:00:18 PM

---

## User

prontly-notify-website-blueprint-v3.txt   read this entire file carefullly and build this project

---

## Assistant (Build · DeepSeek V4 Flash Free · 9.5s)

_Thinking:_

The user wants me to read a file called "prontly-notify-website-blueprint-v3.txt" and then build the project described in it. Let me start by reading this file.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt"
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
1: Prontly Notify — Website Blueprint V3
2: 
3: 
4: PRONTLY NOTIFY
5: Browser Push Notification Engagement Platform
6: WEBSITE BLUEPRINT V3
7: Complete Production-Grade Development Package  —  Generated June 19, 2026
8: Field
9: 	Detail
10: 	Category
11: 	SaaS — Customer Engagement / Push Notification Platform
12: 	Primary Market
13: 	Global, primary markets: India, USA, UK, Canada, Australia
14: 	Frontend
15: 	Next.js 15 (App Router) (TypeScript)
16: 	Backend
17: 	Node.js + Next.js API Routes (serverless on Vercel)
18: 	Database
19: 	Cloudflare D1 (serverless SQLite, edge-replicated)
20: 	Auth Provider
21: 	Firebase Authentication
22: 	Storage
23: 	Cloudflare R2 (S3-compatible object storage)
24: 	Hosting / CDN
25: 	Vercel / Cloudflare
26: 	Payments
27: 	Razorpay (Subscriptions API)
28: 	Delivery Engine
29: 	Firebase Cloud Messaging — HTTP v1 API (Web Push / VAPID)
30: 	Existing Site
31: 	prontly.in
32: 	
33: 
34: Documents Generated In This Package (26):
35: * Cover Page
36: * Executive Summary
37: * PRD
38: * TRD
39: * App Flow
40: * UI/UX Brief
41: * Backend Schema
42: * Implementation Plan
43: * Business Model Blueprint
44: * Competitor Analysis Report
45: * SEO Blueprint
46: * Content Strategy
47: * Admin Panel Blueprint
48: * API Architecture
49: * Security Architecture
50: * Analytics Architecture
51: * Monetization Blueprint
52: * Deployment Architecture
53: * Scalability Blueprint
54: * AI Integration Blueprint
55: * Design System Blueprint
56: * Screen-by-Screen Wireframe Plan
57: * AI Coding Prompt Package (Project Architecture + 10 Phases + Supplementary Prompts + 36 Screen Prompts)
58: * Conversion Strategy Report
59: * Production Launch Checklist
60: * SaaS Scaling Roadmap
61: 
62: 
63: Powered by Prontly 🚀
64: 
65: 
66: ________________
67: 
68: 
69: Table of Contents
70: 
71: 
72: 
73: 
74: (Right-click and choose "Update Field" — or press F9 — after opening this document in Word to populate the page numbers above.)
75: ________________
76: 
77: 
78: Executive Summary
79: Prontly Notify is a multi-tenant SaaS platform that lets website owners collect, segment, and message browser-push subscribers — positioning it as a direct, India-headquartered alternative to OneSignal, PushEngage, and Webpushr, purpose-built for bloggers, news publishers, AI tool builders, SaaS founders, e-commerce stores, and agencies who currently rely on email and social alone for re-engagement.
80: The platform's core wedge against the existing field is depth of AI tooling at every tier — not just send tools, but a generation, optimization, scheduling, and reporting layer built directly into the campaign workflow — combined with an edge-first technical stack (Cloudflare D1 + R2, Vercel, Next.js 15) that keeps infrastructure cost low enough to offer a genuinely usable free tier, the single biggest activation lever in this category.
81: Project Snapshot
82: Field
83: 	Value
84: 	Project Name
85: 	Prontly Notify
86: 	Category
87: 	SaaS — Customer Engagement / Push Notification Platform
88: 	Primary Goal
89: 	Build a OneSignal-style push notification platform that allows website owners to increase engagement, return visitors, and conversions through browser push notifications.
90: 	Target Audience
91: 	Bloggers, News Websites, AI Tool Owners, SaaS Founders, E-commerce Stores, Digital Product Sellers, Affiliate Marketers, Content Creators, Agencies
92: 	Recommended Stack
93: 	Next.js 15 (App Router) / Node.js + Next.js API Routes (serverless on Vercel) / Cloudflare D1 (serverless SQLite, edge-replicated)
94: 	Complexity Rating
95: 	Complex (multi-tenant SaaS, real-time delivery engine, billing, AI layer, admin panel, multi-website management)
96: 	Estimated Phases
97: 	10
98: 	Total Screens
99: 	36 (across Public, Auth, User Dashboard, and Admin)
100: 	Documents Generated
101: 	26 (see Cover Page for the full list)
102: 	What's Inside This Package
103: This document bundles every artifact required to take Prontly Notify from specification to shipped product: foundation documents (PRD, technical architecture, database schema, app flow, UI/UX brief, implementation plan), twelve advanced strategy and architecture documents, a full design system and screen-by-screen wireframe plan, and a complete AI coding prompt package — project architecture, ten build phases, seven supplementary master prompts, and prompts for all 36 application screens — ready to paste into Cursor, Lovable, Windsurf, or Claude Code.
104: Business Context
105: Website owners across every target persona lose the majority of their visitors after a single session, with no low-cost, high-reach way to bring them back — email requires an address most visitors never give, retargeting ads are expensive and degrading, and organic social reach keeps shrinking. Browser push is the only zero-install, permission-based channel that still reaches a returning visitor directly. Prontly Notify exists to make that channel usable by the long tail of website owners currently priced out or engineering-blocked from raw Firebase Cloud Messaging.
106: Stack Justification
107: Next.js 15 + Cloudflare D1/R2 + Vercel was chosen specifically because it lets a small team ship a genuinely usable free tier without the infrastructure cost structure of a traditional Postgres-plus-S3 stack — the free tier is the product's primary growth lever, so keeping its marginal cost near zero is a business decision as much as a technical one. Firebase Authentication and Firebase Cloud Messaging share one underlying provider relationship, simplifying both the auth and delivery integration surface. Razorpay was chosen for its strength in the India-primary market while still supporting the secondary US/UK/Canada/Australia markets.
108: Document Map — What To Read When
109: If you need to...
110: 	Read this section
111: 	Align the team on scope and users
112: 	PRD
113: 	Make a technical stack or infrastructure decision
114: 	TRD, Backend Schema, API Architecture, Scalability Blueprint
115: 	Brief a designer or feed an AI coding tool the visual spec
116: 	Design System Blueprint, Screen-by-Screen Wireframe Plan
117: 	Actually build the product
118: 	AI Coding Prompt Package (Project Architecture → 10 Phases → Supplementary Prompts → Screen Prompts), in that order
119: 	Plan pricing, growth, or content
120: 	Business Model Blueprint, Competitor Analysis Report, SEO Blueprint, Content Strategy, Monetization Blueprint, Conversion Strategy Report
121: 	Prepare to go live, then grow
122: 	Production Launch Checklist, SaaS Scaling Roadmap
123: 	Key Risks To Watch
124: * Sender-reputation risk: a single abusive tenant can degrade FCM/browser deliverability platform-wide — mitigated by the Website Oversight admin tooling and the sending_enabled kill-switch (see Security Architecture).
125: * D1 scale ceiling: the largest tenants' subscriber tables may approach Cloudflare D1's per-database limits before the platform reaches its next funding stage — flagged explicitly as an Open Question in the TRD with a mitigation path in the Scalability Blueprint.
126: * Free-tier cannibalization: a free tier generous enough to drive adoption can also suppress upgrade pressure if gated incorrectly — addressed by gating AI credits, automation depth, and site/team limits rather than core sending volume (see Monetization Blueprint).
127: Success Metrics
128: Activation (verified install + first campaign sent within 7 days) is the primary leading indicator; MRR, free-to-paid conversion rate, and D30 retention are the primary lagging indicators. Full metric definitions are in the PRD's Success Metrics section and the Analytics Architecture document.
129: How To Use This Document
130: 1. Read the PRD and TRD first to align on scope, users, and technical decisions.
131: 2. Hand the Database Schema and API Architecture sections to your backend engineer (or AI coding agent) before any UI work starts.
132: 3. Use the Design System and Wireframe Plan to brief a designer or feed directly into an AI coding tool for pixel-accurate output.
133: 4. Execute the AI Coding Prompt Package phase-by-phase, in order — each phase assumes the previous one is complete and working.
134: 5. Use the Production Launch Checklist and Scaling Roadmap as your post-build operating manual.
135: Product Requirements Document (PRD)
136: 1. Executive Summary
137: Prontly Notify is a multi-tenant SaaS platform that gives any website owner a OneSignal-class browser push notification engine — subscriber collection, campaign composition, behavioral automation, audience segmentation, and analytics — wrapped in an AI layer that writes, times, targets, and explains campaigns on the user's behalf. It exists now because the re-engagement channel landscape has hardened: email open rates keep falling, organic social reach keeps shrinking, and browser push remains the only zero-permission-fatigue, app-install-free channel that delivers a message directly to a returning visitor's device. The market leaders (OneSignal, PushEngage) have not meaningfully invested in AI-native workflows, and none offer an edge-deployed, India-priced alternative built for the long tail of bloggers, AI-tool builders, and small e-commerce stores who are priced out of enterprise engagement suites.
138: 2. Problem Statement
139: Core user pain: Website owners lose the majority of their visitors after a single session and have no reliable, low-cost way to bring them back. Email requires an address most visitors never give up; retargeting ads are expensive and degrading as third-party cookies disappear; social algorithms bury organic posts.
140: Current alternatives and shortcomings: 
141: * OneSignal — powerful but enterprise-priced at scale, generic (not push-notification-only) UI, no AI campaign assistance, support is slow for self-serve customers.
142: * PushEngage / Webpushr — push-focused but dated UI, weak segmentation tooling, automation gated behind expensive plans.
143: * Raw Firebase Cloud Messaging — free and powerful but requires the website owner to build their own dashboard, subscriber storage, campaign UI, and analytics from scratch — a multi-week engineering project most target users cannot undertake.
144: Why this solution is better: Prontly Notify combines FCM's reliability with a purpose-built, AI-assisted campaign workflow and a genuinely usable free tier made possible by a low-cost edge stack (Cloudflare D1/R2 + Vercel), removing both the engineering burden of raw FCM and the cost/complexity ceiling of incumbent SaaS tools.
145: 3. Target Users
146: Primary Persona — "Rohan, the Solo Blogger/Niche Publisher"
147: Attribute
148: 	Detail
149: 	Role
150: 	Independent blogger / niche news publisher, 5,000–200,000 monthly visitors
151: 	Goals
152: 	Bring readers back without building an email list; monetize repeat traffic via ad impressions
153: 	Frustrations
154: 	Can't afford OneSignal at scale; doesn't have time to learn complex segmentation tools
155: 	Tech Comfort
156: 	Medium — comfortable pasting a script tag into WordPress, not comfortable writing code
157: 	Secondary Persona — "Ananya, the SaaS Founder / Growth Marketer"
158: Attribute
159: 	Detail
160: 	Role
161: 	Founder or growth marketer at an early-stage SaaS or AI tool company
162: 	Goals
163: 	Drive trial-to-paid conversion and feature-adoption nudges via behavioral push automation
164: 	Frustrations
165: 	Existing tools require an engineer to wire up; wants self-serve API + SDK access
166: 	Tech Comfort
167: 	High — wants REST API and webhook access, not just a UI
168: 	Anti-Persona
169: Enterprises requiring SOC 2-audited, dedicated-infrastructure, multi-region failover push delivery with a named account manager and custom SLAs. Prontly Notify V1 is not built for this buyer; revisit post-Series-A infrastructure investment.
170: 4. Jobs To Be Done (JTBD)
171: Functional Jobs
172: * When I publish a new article, I want to notify my returning readers instantly, so I can recover lost direct traffic.
173: * When a visitor abandons my product page, I want to send a timed nudge, so I can recover the conversion without building an email automation.
174: * When I don't know what message will perform best, I want AI to draft and test alternatives, so I can ship a high-CTR notification without copywriting expertise.
175: Emotional Jobs
176: * Feel in control of audience engagement without needing a marketing team.
177: * Feel confident that messages are reaching real, opted-in subscribers, not vanishing into a spam filter.
178: Social Jobs
179: * Be seen by clients (for agency users) as running a modern, data-driven engagement stack.
180: * Be perceived internally (for SaaS founders) as a growth-savvy operator who ships retention tactics fast.
181: 5. User Stories
182: Onboarding
183: * As a new user, I want to add my website and get a working install snippet in under 5 minutes, so that I see my first subscriber the same day I sign up.
184: * As a new user, I want to send myself a test notification during onboarding, so that I trust the system works before inviting real subscribers.
185: Core Feature Use
186: * As a publisher, I want AI to suggest three notification titles from my draft, so that I can pick the highest-predicted-CTR option in seconds.
187: * As a growth marketer, I want to build a 3-step automation triggered by subscriber inactivity, so that dormant users are re-engaged without manual sends.
188: * As any user, I want a plain-English AI summary of my weekly performance, so that I don't have to interpret charts myself.
189: Edge Cases
190: * As a user on the Free plan, I want a clear in-app warning before I exceed my subscriber limit, so that I am not surprised by a forced upgrade.
191: * As a user whose payment fails, I want a grace period and clear recovery instructions, so that my sending is not abruptly cut off mid-campaign.
192: Admin Actions
193: * As an admin, I want to suspend a site that is sending spam-flagged notifications, so that the platform's overall sender reputation with FCM and browsers is protected.
194: * As an admin, I want an immutable audit log of every account-impacting action taken by staff, so that we can pass enterprise security reviews.
195: 6. Goals & Non-Goals
196: Goals (In Scope)
197: 	Non-Goals (Explicitly Out of Scope for V1)
198: 	Browser push via FCM (Chrome, Edge, Firefox) — web push only
199: 	Native mobile push (iOS/Android app SDKs)
200: 	AI-assisted campaign creation, scheduling, segmentation, analytics
201: 	Full omnichannel orchestration (SMS, WhatsApp, in-app)
202: 	Multi-website management under one account
203: 	Multi-vendor / marketplace account hierarchy
204: 	Razorpay-based subscription billing with usage-gated tiers
205: 	Custom enterprise contract billing / invoicing workflows
206: 	Self-serve onboarding with platform-specific install guides
207: 	White-glove managed onboarding / dedicated CSM
208: 	REST API + API keys for developer-persona integration
209: 	Public app marketplace / third-party plugin ecosystem
210: 	7. Success Metrics
211: Category
212: 	Metrics
213: 	Acquisition
214: 	Signups/week; CAC by channel (organic vs. paid); Visitor-to-signup rate on Pricing/Home
215: 	Activation
216: 	% of signups completing Onboarding Wizard within 24h; Time-to-first-verified-install; Time-to-first-campaign-sent
217: 	Retention
218: 	D7 / D30 account retention; Monthly logo churn %; Subscriber-base growth rate per active site
219: 	Revenue
220: 	MRR; ARPU; Free-to-paid conversion rate; Net revenue retention (expansion via AI-credit/site-limit upgrades)
221: 	Engagement
222: 	Campaigns sent per active account per week; AI feature adoption rate (% of campaigns using AI title/timing); Automation activation rate
223: 	8. Risks & Assumptions
224: Technical Risks
225: * Risk: FCM web push delivery rates degrade due to browser-vendor policy changes (e.g., Chrome's permission-prompt friction features). Mitigation: monitor delivery-rate dashboards (Section: Delivery Monitoring) and maintain an abstraction layer so an alternate push provider could be added without a full rewrite.
226: * Risk: Cloudflare D1's relatively young feature set (e.g., row/database size limits) constrains very large subscriber tables on top accounts. Mitigation: partition subscriber data per-site from day one and monitor D1 documented limits as the platform scales; plan a read-replica/analytics-offload path before any single site approaches table-size ceilings.
227: Business Risks
228: * Risk: Free tier is generous enough to suppress upgrade pressure. Mitigation: gate the highest-leverage features (AI credits beyond a small monthly allotment, automation step count, multi-site limits) rather than core sending volume alone.
229: * Risk: Sender-reputation damage from a single abusive tenant affects deliverability platform-wide. Mitigation: automated spam-content screening plus the admin Website Oversight and Delivery Monitoring tooling specified in this blueprint.
230: Assumptions To Validate
231: * Assumption: target personas will tolerate a service-worker-based install process (vs. a one-click app-store install). Validate via onboarding completion-rate tracking in the first 90 days post-launch.
232: * Assumption: AI-generated titles measurably outperform manually written ones for this audience. Validate via an in-product A/B comparison surfaced in the Analytics AI summary.
233: Technical Requirements Document (TRD)
234: 1. Technology Stack
235: Layer
236: 	Choice
237: 	Justification
238: 	Frontend Language
239: 	TypeScript
240: 	Static typing catches integration errors across the campaign/segment/automation data model before runtime, critical given the schema complexity of a multi-tenant push platform.
241: 	Frontend Framework
242: 	Next.js 15 (App Router)
243: 	App Router enables route-level server components for the marketing/SEO surface while keeping the dashboard fully interactive client-side; Vercel-native deployment matches the chosen host.
244: 	Backend
245: 	Node.js + Next.js API Routes (serverless on Vercel)
246: 	Co-locating API routes with the frontend in one deployable unit minimizes operational overhead for a small initial team; Vercel's serverless functions scale per-request without manual server management.
247: 	Database
248: 	Cloudflare D1 (serverless SQLite, edge-replicated)
249: 	Edge-replicated SQLite gives low-latency reads for dashboard queries close to the user, at a fraction of the cost of a managed Postgres cluster — appropriate for the cost-sensitive free-tier strategy central to this product's growth model.
250: 	Auth
251: 	Firebase Authentication
252: 	Mature email/password + OAuth + email-verification flows out of the box, with a generous free tier and SDKs that integrate cleanly with Next.js middleware for route protection.
253: 	Storage
254: 	Cloudflare R2 (S3-compatible object storage)
255: 	S3-compatible API with zero egress fees — important because notification icon/image assets and exported CSV/report files are served frequently and egress costs would otherwise scale with usage.
256: 	Hosting
257: 	Vercel
258: 	First-class Next.js support, automatic preview deployments per PR, and global edge network reduce TTFB for the marketing site's SEO performance.
259: 	CDN
260: 	Cloudflare
261: 	Already required for R2 and D1; consolidating CDN, storage, and database under one provider reduces cross-network latency for the request path that fetches a subscriber's notification assets.
262: 	Payments
263: 	Razorpay (Subscriptions API)
264: 	Strong UPI/card support for the India-primary market plus international card support for the secondary US/UK/CA/AU markets; native Subscriptions API for recurring billing.
265: 	Delivery Engine
266: 	Firebase Cloud Messaging — HTTP v1 API (Web Push / VAPID)
267: 	The only standards-based, free-at-scale web push delivery mechanism supported natively by Chrome, Edge, and Firefox; HTTP v1 API (not the deprecated legacy API) for forward compatibility.
268: 	Analytics
269: 	Google Analytics 4 + Internal Analytics Engine (D1-backed)
270: 	GA4 for marketing-site acquisition tracking; a custom D1-backed analytics engine for product-usage and campaign-performance metrics that must be queryable per-tenant in the dashboard.
271: 	2. Infrastructure Architecture
272: System overview: The Next.js application is deployed to Vercel as a single project serving three route groups — public marketing/SEO pages (ISR-cached), the authenticated dashboard (client-rendered, API-driven), and the admin panel (role-gated). All data access goes through Next.js API routes acting as a thin service layer in front of Cloudflare D1. A separate scheduled-worker process (Vercel Cron invoking an API route) handles time-based campaign sends, automation step execution, and FCM delivery batching.
273: Data flow overview: 
274: 1. A subscriber's browser registers a service worker (served from R2/CDN) and obtains an FCM token via the Web Push API.
275: 2. The token, along with browser/OS/geo metadata, is POSTed to /api/v1/sites/:id/subscribers and written to D1.
276: 3. When a user composes a campaign, the API resolves the target segment into a subscriber-token list (paginated for large audiences) and enqueues delivery batches.
277: 4. A Cron-triggered worker calls the FCM HTTP v1 API in batches, records delivery/failure status per token back into D1, and updates the campaign's live analytics counters.
278: 5. The dashboard polls or re-fetches analytics endpoints, which read pre-aggregated counters from D1 rather than scanning raw event tables on every page load.
279: Third-party integrations: Firebase Cloud Messaging (delivery), Firebase Authentication (identity), Razorpay (billing), Google Analytics 4 (marketing analytics), and an LLM provider via server-side API calls for all AI features (title generation, CTR optimization, scheduling suggestions, campaign recommendations, segmentation suggestions, analytics summaries) — never called client-side, to protect API keys and allow per-plan usage metering.
280: 3. Security Requirements
281: Authentication & authorization model: Firebase Authentication issues a signed ID token on login; Next.js middleware verifies the token on every protected route and attaches the resolved user + role + active-workspace context to the request. Role-based access control distinguishes Owner, Admin (team), Member (team, scoped), and Prontly Super Admin / Admin (internal staff), enforced both in middleware and again at the database-query layer (defense in depth).
282: * Encryption at rest: D1 data is encrypted at rest by the underlying Cloudflare infrastructure; R2 objects use server-side encryption by default.
283: * Encryption in transit: TLS 1.2+ enforced on all Vercel and Cloudflare endpoints; HSTS header set platform-wide.
284: * API security: every protected route requires a valid Firebase ID token (15-minute-lifetime access pattern via SDK refresh) or a scoped API key for developer-persona REST access; refresh handled transparently by the Firebase client SDK.
285: * Input validation: all request bodies validated server-side with Zod schemas before touching the database layer; no client-supplied value is trusted for authorization decisions.
286: * OWASP Top 10 mitigation: parameterized D1 queries (injection), output encoding + CSP (XSS), CSRF tokens on state-changing dashboard forms, dependency scanning in CI (vulnerable components), audit logging + least-privilege role checks (broken access control).
287: 4. Performance Requirements
288: Metric
289: 	Target
290: 	Largest Contentful Paint (LCP)
291: 	< 2.5s on the marketing site and dashboard shell
292: 	Cumulative Layout Shift (CLS)
293: 	< 0.1 across all pages
294: 	Interaction to Next Paint (INP)
295: 	< 200ms for dashboard interactions
296: 	Server response time (API routes)
297: 	p95 < 300ms for read endpoints; p95 < 800ms for write/AI endpoints
298: 	Concurrent user capacity (V1 target)
299: 	2,000 concurrent dashboard sessions; 5M subscriber tokens addressable per send batch via queued delivery
300: 	Caching strategy: Marketing/SEO pages use Next.js ISR with a 1-hour revalidation window; static assets and the service-worker bundle are CDN-cached with long max-age and content-hashed filenames; dashboard analytics endpoints cache aggregated results for 60 seconds to absorb rapid re-renders without re-querying D1 on every interaction.
301: 5. Accessibility Requirements
302: * WCAG 2.1 Level AA compliance across all public, auth, dashboard, and admin surfaces.
303: * Full keyboard navigation: every interactive element reachable and operable via Tab/Shift+Tab/Enter/Space/Escape with a visible focus ring.
304: * Screen reader support: semantic HTML landmarks, ARIA roles only where native semantics are insufficient (e.g., custom flow-canvas, rich-text toolbar), live regions for async updates (AI generations, toasts, polling status).
305: * Minimum color contrast: 4.5:1 for normal text, 3:1 for large text and UI component boundaries — verified against the dark-premium palette specified in the Design System Blueprint, since dark backgrounds make this an easy ratio to violate accidentally.
306: 6. Compliance Requirements
307: * Data privacy: GDPR-aligned data-subject rights (access, export, deletion) for EU visitors collected as push subscribers; India's Digital Personal Data Protection Act 2023 (DPDPA) compliance for the primary market, including a documented consent and grievance-redressal mechanism; CCPA opt-out support for California-based subscribers.
308: * Payment compliance: Razorpay handles all card data; Prontly Notify never stores raw card numbers, keeping the application out of PCI-DSS SAQ-D scope (SAQ-A applicable, as a fully outsourced payment-page/tokenization flow).
309: * Cookie consent: a GDPR-compliant consent banner gates non-essential cookies (GA4) on the marketing site; essential session cookies are exempted per standard guidance but disclosed in the Cookie Policy.
310: 7. Third-Party Integrations
311: Integration
312: 	Purpose
313: 	API Version
314: 	Data Exchanged
315: 	Failure Handling
316: 	Firebase Cloud Messaging
317: 	Push delivery
318: 	HTTP v1 (OAuth2 service-account auth)
319: 	Device token, notification payload, click-action URL
320: 	Failed sends marked per-token; tokens returning UNREGISTERED are pruned from the subscriber table automatically
321: 	Firebase Authentication
322: 	Identity & session
323: 	Firebase Auth SDK (current)
324: 	Email, hashed credentials (Firebase-managed), OAuth profile basics
325: 	SDK retries transparently; UI surfaces a clear re-auth prompt on session expiry
326: 	Razorpay
327: 	Billing & subscriptions
328: 	Razorpay Subscriptions API + Webhooks
329: 	Plan ID, customer ID, payment status, invoice metadata
330: 	Webhook signature verified server-side; failed-payment webhook triggers a grace-period state machine, not an immediate service cutoff
331: 	LLM Provider (AI layer)
332: 	Title generation, CTR optimization, scheduling, recommendations, segmentation, summaries
333: 	REST, server-side only
334: 	Campaign draft text, anonymized aggregate performance stats — never raw subscriber PII
335: 	Graceful degradation: AI panel shows a retry state and the manual workflow remains fully usable without AI
336: 	Google Analytics 4
337: 	Marketing-site acquisition analytics
338: 	GA4 Measurement Protocol / gtag.js
339: 	Anonymized pageview and event data
340: 	Non-blocking script load; failure does not affect site functionality
341: 	8. Technical Constraints
342: * Browser support: Chrome 90+, Firefox 85+, Safari 14+ (push subscription UI hidden — Safari uses a different push mechanism and is out of scope for V1 FCM-based delivery), Edge 90+.
343: * Mobile OS support: iOS Safari and Android Chrome render the dashboard responsively, but web push subscription itself is a desktop/Android-Chrome-primary capability given current browser push support patterns; this is disclosed clearly in onboarding copy.
344: * Network constraints: dashboard and marketing pages must remain usable on a throttled 4G connection (India primary market) — enforced via Lighthouse mobile throttled-network testing in CI.
345: 9. Open Questions
346: 1. Should Safari push (via a separate APNs-based web push pathway) be added in V1.1, given Safari's web-push adoption pattern in the target markets?
347: 2. What is the concrete D1 row-count/database-size ceiling per tenant before a partitioning or analytics-offload strategy must be implemented — needs a load-test validation pass before the Growth-tier subscriber cap is finalized.
348: 3. Should AI credit consumption be metered per-call or per-token, and does the chosen LLM provider's pricing model favor caching repeated analytics-summary requests?
349: App Flow — Screen Flow & State Documentation
350: This document is the single source of truth for every screen in Prontly Notify, the state each screen can be in, how users move between screens, and what happens at the edges of normal usage. It complements the Screen-by-Screen Wireframe Plan (visual layout) and the Screen-wise AI Coding Prompts (build instructions) — this document focuses on flow logic and state behavior.
351: 1. Every Screen — Route Map & Access Levels
352: Public Pages
353: Screen
354: 	Route
355: 	Access Level
356: 	Home / Landing Page
357: 	/
358: 	Public
359: 	Pricing
360: 	/pricing
361: 	Public
362: 	Integrations & Docs Hub
363: 	/docs
364: 	Public
365: 	Blog Listing
366: 	/blog
367: 	Public
368: 	Blog Detail
369: 	/blog/[slug]
370: 	Public
371: 	About
372: 	/about
373: 	Public
374: 	Contact
375: 	/contact
376: 	Public
377: 	FAQ
378: 	/faq
379: 	Public
380: 	Legal Pages (Privacy / Terms / Cookies / Refund)
381: 	/privacy, /terms, /cookies, /refund-policy
382: 	Public
383: 	Auth Screens
384: Screen
385: 	Route
386: 	Access Level
387: 	Login
388: 	/login
389: 	Public (redirects if already authenticated)
390: 	Signup
391: 	/signup
392: 	Public (redirects if already authenticated)
393: 	Forgot Password
394: 	/forgot-password
395: 	Public
396: 	Email Verification
397: 	/verify-email
398: 	Authenticated, unverified
399: 	Website Onboarding Wizard
400: 	/onboarding
401: 	Authenticated, verified, zero websites added
402: 	User Dashboard
403: Screen
404: 	Route
405: 	Access Level
406: 	Dashboard Home
407: 	/dashboard
408: 	Authenticated
409: 	Website Switcher & Add Website
410: 	/dashboard/sites
411: 	Authenticated
412: 	Subscribers
413: 	/dashboard/subscribers
414: 	Authenticated
415: 	Campaign Builder (Compose Notification)
416: 	/dashboard/campaigns/new
417: 	Authenticated
418: 	Campaigns History
419: 	/dashboard/campaigns
420: 	Authenticated
421: 	Automation / Drip Builder
422: 	/dashboard/automation
423: 	Authenticated
424: 	Segments
425: 	/dashboard/segments
426: 	Authenticated
427: 	Analytics
428: 	/dashboard/analytics
429: 	Authenticated
430: 	AI Tools Hub
431: 	/dashboard/ai
432: 	Authenticated
433: 	Integration / SDK Setup
434: 	/dashboard/integration
435: 	Authenticated
436: 	Team Management
437: 	/dashboard/team
438: 	Authenticated, Owner/Admin role
439: 	API Keys
440: 	/dashboard/api-keys
441: 	Authenticated, Owner/Admin role
442: 	Billing & Subscription
443: 	/dashboard/billing
444: 	Authenticated, Owner/Admin role
445: 	Account Settings
446: 	/dashboard/settings
447: 	Authenticated
448: 	Admin Screens
449: Screen
450: 	Route
451: 	Access Level
452: 	Admin Dashboard
453: 	/admin
454: 	Admin only
455: 	User & Account Management
456: 	/admin/accounts
457: 	Admin only
458: 	Website Oversight
459: 	/admin/sites
460: 	Admin only
461: 	Subscription & Revenue Management
462: 	/admin/billing
463: 	Admin only
464: 	Blog CMS
465: 	/admin/blog
466: 	Admin only
467: 	Delivery Monitoring & System Health
468: 	/admin/system
469: 	Admin only
470: 	Coupons & Discounts
471: 	/admin/coupons
472: 	Admin only
473: 	Audit Logs & Feature Flags
474: 	/admin/audit-and-flags
475: 	Super Admin only
476: 	2. Universal State Model
477: Every data-driven screen in the product (anything beyond static marketing pages) implements the same four-state model, so AI coding agents and engineers can apply one consistent pattern across the codebase:
478: State
479: 	Behavior
480: 	Default
481: 	Data loaded successfully; full interactive UI rendered with real content.
482: 	Loading
483: 	Skeleton placeholders matching the eventual content's shape (not a generic spinner) for any fetch over ~150ms; KPI cards, tables, and charts each have a dedicated skeleton variant.
484: 	Empty
485: 	No data exists yet (e.g., zero subscribers, zero campaigns). Shows a purpose-built illustration, a one-sentence explanation, and a single primary CTA toward the action that would populate the screen (e.g., 'Send your first campaign').
486: 	Error
487: 	API failure or permission denial. Shows a clear, non-technical message, a 'Retry' action where applicable, and never a raw stack trace or status code in the user-facing copy.
488: 	Success / Confirmation
489: 	Action completed (campaign sent, settings saved, invite sent). Surfaced via a toast for low-stakes actions and an inline confirmation panel for high-stakes ones (e.g., billing changes, account suspension).
490: 	3. Key Screen Transitions
491: Trigger
492: 	From → To
493: 	Data Passed
494: 	Transition Style
495: 	Click 'Start Free'
496: 	Home/Pricing → Signup
497: 	Selected plan (query param) if arriving from Pricing
498: 	Standard route push, no modal
499: 	Signup success
500: 	Signup → Email Verification
501: 	Newly created user ID (session)
502: 	Automatic redirect on success
503: 	Email verified (detected via polling)
504: 	Email Verification → Website Onboarding Wizard
505: 	Verified session
506: 	Automatic redirect, no user action needed
507: 	Complete onboarding wizard
508: 	Onboarding → Dashboard Home
509: 	Newly created site ID (becomes active workspace)
510: 	Success animation, then redirect
511: 	Click 'New Campaign'
512: 	Dashboard Home → Campaign Builder
513: 	Active site ID
514: 	Route push
515: 	Send/Schedule campaign
516: 	Campaign Builder → Campaigns History
517: 	New campaign ID (highlighted in list)
518: 	Redirect with toast confirmation
519: 	Click 'View Analytics' on a campaign row
520: 	Campaigns History → Analytics
521: 	Campaign ID (pre-filters the analytics view)
522: 	Route push with query param
523: 	Click 'Create Segment from Filter'
524: 	Subscribers → Segments (rule builder pre-filled)
525: 	Current filter state
526: 	Route push, form pre-populated
527: 	Click 'Impersonate' (admin)
528: 	Admin Accounts → Dashboard Home (as user)
529: 	Impersonation session token, audit log entry created
530: 	New tab opens with a persistent 'Impersonating [user]' banner
531: 	4. Primary User Journeys
532: Journey A — New Visitor → Signup → First Value Moment
533: 1. Lands on Home via organic search for 'browser push notification for WordPress'.
534: 2. Scrolls hero, feature grid, and pricing teaser; clicks 'Start Free'.
535: 3. Completes Signup with email/password.
536: 4. Verifies email (polled automatically; no manual refresh needed).
537: 5. Completes the 3-step Website Onboarding Wizard, selecting WordPress as the platform and pasting the provided plugin snippet.
538: 6. Verification step confirms the service worker is live; sees the success animation.
539: 7. Lands on Dashboard Home with zero subscribers (Empty state) and a persistent 'Invite your first subscribers' banner.
540: 8. First Value Moment: the user's own test notification (sent during onboarding) appears in their browser — the 'aha' moment that proves the system works end-to-end.
541: Journey B — Returning User → Login → Core Action → Exit
542: 1. Logs in via Login screen; lands on Dashboard Home for their last-active website.
543: 2. Reviews the AI insight card recommending a re-engagement campaign for an 'at risk' segment.
544: 3. Clicks through to Campaign Builder with that segment pre-selected.
545: 4. Uses the AI title generator, accepts a suggested title, reviews the live preview, and sends immediately.
546: 5. Redirected to Campaigns History, sees the new campaign at the top with a 'Sent' badge, and closes the tab.
547: Journey C — Admin → Login → Manage Users → Take Action
548: 1. Internal staff logs in; Firebase custom claim resolves their role as Admin, routing them to /admin instead of /dashboard.
549: 2. Admin Dashboard shows an elevated 'Delivery Success Rate' alert for a specific site.
550: 3. Drills into Website Oversight, filters by the flagged domain, and inspects its recent send history.
551: 4. Determines the site is sending unsolicited promotional spam disguised as content notifications; clicks 'Disable Sending' with a required reason.
552: 5. Action is recorded in Audit Logs; the affected account owner receives an automated notice with an appeal path via Contact.
553: 5. Edge Cases
554: Edge Case
555: 	Behavior
556: 	Session expiry mid-session
557: 	API calls return 401; the client intercepts this globally, shows a non-disruptive 'Your session expired' modal, and redirects to Login preserving the current route as a post-login redirect target.
558: 	Network failure during a write action (e.g., campaign send)
559: 	The action is not silently retried automatically (to avoid duplicate sends); the UI shows an explicit error with a manual 'Retry' button and the draft is preserved client-side.
560: 	Permission escalation attempt (Member tries to access Billing)
561: 	Server-side role check returns 403 regardless of any client-side route guard; the UI shows a 'You don't have access to this page' state with a link back to Dashboard Home, never a blank screen.
562: 	Permission downgrade mid-session (Owner removes a teammate's access while they're active)
563: 	The next API call from the downgraded session returns 403; the client surfaces a session-refresh prompt that re-evaluates the user's current role.
564: 	Account deletion
565: 	Multi-step confirmation (type the workspace name to confirm) → all sites' sending is immediately disabled → a 30-day soft-delete grace period (recoverable via Contact) → permanent purge of D1 records and R2 assets after the grace period.
566: 	Data export request (GDPR/DPDPA)
567: 	Available from Account Settings → Security tab as 'Export my data'; triggers an async job that compiles account, sites, campaigns (metadata, not full subscriber PII beyond what's needed), and billing history into a downloadable archive, emailed as a signed, expiring R2 link.
568: 	6. Permission Flows
569: Unauthenticated access to a protected route: Next.js middleware checks for a valid session before the route renders; absence redirects to /login with a `?redirect=` query param so the user lands back where they intended after authenticating.
570: Non-admin access to /admin/*: Middleware checks the Firebase custom claim for admin role; failure returns a 404 (not a 403) for the /admin path specifically, to avoid revealing the existence of the admin panel to non-staff users probing the URL.
571: Role-Based Access Control Map
572: Screen Group
573: 	Owner
574: 	Admin (Team)
575: 	Member (Team)
576: 	Prontly Staff Admin
577: 	Dashboard Home, Subscribers, Campaigns, Automation, Segments, Analytics, AI Tools, Integration
578: 	Full
579: 	Full
580: 	Full (scoped to assigned sites)
581: 	No access (separate impersonation path only)
582: 	Team Management, API Keys, Billing & Subscription
583: 	Full
584: 	Full
585: 	No access
586: 	No access
587: 	Account Settings (own profile)
588: 	Full (own)
589: 	Full (own)
590: 	Full (own)
591: 	Full (own)
592: 	/admin/* (all admin screens)
593: 	No access
594: 	No access
595: 	No access
596: 	Full (Super Admin additionally sees Audit Logs & Feature Flags)
597: 	UI/UX Brief — Design System & Experience Guidelines
598: 1. Design Principles
599: Principle
600: 	What It Means In Practice
601: 	Confidence over cuteness
602: 	Every screen should feel like infrastructure software (closer to Stripe/Vercel than a consumer app) — generous whitespace, restrained color use, data presented plainly.
603: 	Glass, not noise
604: 	Glassmorphic surfaces (translucent panels, soft blur, thin borders) are used sparingly for elevation — hero panels, modals, the live notification preview — never as a blanket texture across every card.
605: 	Dark by default, light by necessity
606: 	The dark-premium palette is the primary experience; light mode is not required for V1, keeping the design system's surface area smaller and more consistent.
607: 	Mobile parity, not mobile compromise
608: 	Every core workflow (compose, target, schedule, send) must be fully completable on a 375px viewport — mobile is a first-class authoring surface for this product's on-the-go publisher persona, not a read-only companion.
609: 	AI is a suggestion, never a black box
610: 	Every AI-generated output (titles, segments, timing, summaries) is visually distinct (a consistent AI badge/accent treatment) and always shows the human override path alongside it.
611: 	2. Design System — Core Tokens
612: Full implementation-ready token values (hex codes, type scale, spacing scale) are specified in Section 21 — Design System Blueprint, written as a direct AI coding prompt. This section summarizes the rationale behind those tokens.
613: Token Group
614: 	Direction
615: 	Color
616: 	Primary #3B82F6, secondary #60A5FA, accent #93C5FD form a single-hue blue ramp — chosen because blue reads as trustworthy/technical across all nine target audience segments and avoids the red/orange alert-fatigue risk of a more "energetic" palette for a notifications product. Dark background #0F172A and surface #111827 are deliberately distinct (not a single flat dark tone) so cards visibly separate from the page without relying on shadows alone.
617: 	Typography
618: 	A geometric sans for display/headings paired with a highly legible sans for body and data-table text (full pairing specified in Section 21) — optimized for the number-dense dashboard screens (KPIs, tables, charts) where legibility at small sizes matters more than personality.
619: 	Spacing
620: 	4px base grid throughout, so every component — from a button's internal padding to a dashboard's section gaps — aligns to the same rhythm, which is what makes a dense, data-heavy dashboard still feel calm rather than cluttered.
621: 	Radius
622: 	Small radii (4–8px) on functional elements (buttons, inputs, badges) and larger radii (12–16px) on containers (cards, modals) — reinforcing the 'glass panel' feel on containers while keeping interactive controls crisp.
623: 	Shadow / Elevation
624: 	On a dark background, elevation is communicated primarily through surface-color contrast and a 1px translucent border, with shadows used as a secondary, subtle cue — heavy drop shadows read poorly on dark UI and are avoided.
625: 	3. Component Library Overview
626: The full component list with every variant and state is detailed in Section 21. At a high level, the library is organized into five groups:
627: * Primitives — Button, Input, Select, Checkbox, Toggle, Badge, Avatar, Tooltip, Skeleton.
628: * Layout — Sidebar Nav, Top Bar, Card, Modal, Drawer, Tabs, Accordion, Data Table.
629: * Data Visualization — Stat Card (with sparkline), Line/Bar/Donut Chart, Progress/Usage Meter.
630: * Domain-specific — Notification Live Preview, Segment Rule Builder Row, Automation Flow Node, AI Suggestion Card, Install-Status Checklist.
631: * Feedback — Toast, Inline Alert, Confirmation Dialog, Empty State Illustration Block.
632: 4. Layout System
633: Breakpoint
634: 	Columns
635: 	Container / Gutter Behavior
636: 	Mobile (< 768px)
637: 	4-column grid
638: 	16px screen margin, 16px gutter; single-column stacking for all form and card layouts.
639: 	Tablet (768–1024px)
640: 	8-column grid
641: 	24px margin/gutter; cards and forms typically occupy 4–6 of 8 columns, introducing the first 2-column layouts.
642: 	Desktop (> 1024px)
643: 	12-column grid
644: 	32px+ margin/gutter, 1280–1440px max content width; dashboard introduces the persistent sidebar (fixed 260px) with the 12-column grid applied to the remaining content area.
645: 	5. Mobile Design Rules
646: * Touch targets: 44×44px minimum for every tappable element, including table-row action menus and chart legend toggles.
647: * Thumb zone: primary actions (Send, Save, Confirm) are placed in a sticky bottom bar or the bottom half of the viewport wherever a multi-step flow is involved (Campaign Builder, Onboarding Wizard); destructive actions are never placed where an accidental thumb-reach could trigger them.
648: * Navigation pattern: bottom tab bar (Home, Subscribers, Campaigns, Analytics, More) for the five highest-frequency dashboard destinations; a slide-out drawer from the 'More' tab houses Automation, Segments, AI Tools, Integration, Team, Billing, and Settings.
649: * Mobile keyboard behavior: numeric keyboards for numeric-only fields (e.g., max redemptions), email keyboards for email fields, and the live notification preview in Campaign Builder repositions above the keyboard rather than being obscured by it.
650: 6. Desktop Design Rules
651: * Persistent left sidebar replaces bottom-tab navigation entirely above 1024px, exposing all eleven dashboard sections without a secondary 'More' menu.
652: * Hover states are meaningful, not decorative: table rows reveal their action menu on hover, chart series highlight on legend hover, and cards used as navigation (e.g., website switcher cards) lift 2px with a border-color shift.
653: * Keyboard shortcuts: '/' focuses the nearest search input, 'c' opens Campaign Builder from anywhere in the dashboard, 'Esc' closes the active modal/drawer — documented in a discoverable shortcuts-help overlay (triggered by '?').
654: * Data density: desktop tables show all relevant columns by default (vs. mobile's progressive disclosure into row-detail views) since desktop users are typically in an analysis or bulk-management mindset.
655: 7. Animation & Motion
656: Motion philosophy: purposeful and subtle — motion confirms that an action registered (a campaign was sent, a toggle was flipped) rather than decorating the interface. Full timing-token values are specified in Section 21.
657: * Micro-interactions (button hover/press, toggle flip) use the fast duration tier for immediate-feeling feedback.
658: * Panel/modal/drawer entrances use the normal-to-slow tier with an ease-out curve so content feels like it is settling into place, not snapping.
659: * Scroll-triggered reveals on the marketing site (feature cards, stat counters) use Intersection Observer with a small staggered delay per grid item — applied only on the public marketing pages, never in the dashboard, where motion should stay minimal to avoid distracting from data review.
660: * All motion respects prefers-reduced-motion, falling back to instant state changes with no transition.
661: 8. Accessibility Rules
662: * Focus ring: a consistent 2px outline in the accent blue with sufficient offset to remain visible against both dark surfaces and glassmorphic panels — never suppressed with outline:none without a custom replacement.
663: * ARIA labeling: icon-only buttons (table row actions, chart toggles) always carry an aria-label; charts expose a 'view as table' toggle as the primary accessible-data-access pattern rather than relying on chart-library auto-generated descriptions alone.
664: * Color-blind-safe check: the chart palette (used for CTR-by-campaign bars and delivery-by-browser donuts) is verified against deuteranopia/protanopia simulation, pairing color with a pattern or label rather than color alone for any state that conveys meaning (e.g., status badges always carry text, not just a colored dot).
665: * Reduced motion: every Framer Motion / CSS transition in the codebase is wrapped to check prefers-reduced-motion and substitutes an instant or near-instant equivalent.
666: 9. Dark Mode
667: Dark is the only supported theme for V1 — there is no light-mode toggle. This is an explicit scope decision (see PRD Non-Goals) that reduces design-system surface area and matches the 'Dark Premium' brand direction every target persona will see from first contact via the marketing site through to daily dashboard use. Components that would typically need special dark-mode handling (e.g., code blocks in the Docs Hub, the rich-text editor in Blog CMS) are designed dark-native rather than adapted from a light baseline, avoiding any contrast or legibility regressions.
668: Backend Schema — Database, APIs & Data Architecture
669: Database: Cloudflare D1 (serverless SQLite, edge-replicated). All tables use TEXT primary keys (UUIDv7 for natural time-ordering, generated application-side) rather than auto-increment integers, since UUIDs simplify multi-region edge writes and avoid ID-collision risk if D1 read-replicas are introduced later. Full field lists for every entity appear below; the equivalent content formatted as a direct AI coding prompt appears in the AI Coding Prompt Package's Database Schema Prompt.
670: 1. Entities
671: users
672: Purpose: one row per human who can log in (customers and internal staff share this table; staff are distinguished by is_staff + staff_role).
673: Field
674: 	Type
675: 	Constraints / Notes
676: 	id
677: 	TEXT (UUID)
678: 	Primary key
679: 	firebase_uid
680: 	TEXT
681: 	Unique, not null — links to Firebase Authentication
682: 	email
683: 	TEXT
684: 	Unique, not null
685: 	name
686: 	TEXT
687: 	Not null
688: 	avatar_url
689: 	TEXT
690: 	Nullable — R2 object URL
691: 	email_verified
692: 	BOOLEAN
693: 	Default false
694: 	is_staff
695: 	BOOLEAN
696: 	Default false
697: 	staff_role
698: 	TEXT
699: 	Nullable — 'admin' | 'super_admin', only set when is_staff = true
700: 	notification_prefs
701: 	TEXT (JSON)
702: 	Email preference toggles: product_updates, billing_alerts, weekly_digest, delivery_failures
703: 	last_login_at
704: 	DATETIME
705: 	Nullable
706: 	created_at / updated_at
707: 	DATETIME
708: 	Not null
709: 	Indexes: UNIQUE(firebase_uid), UNIQUE(email). Security: a user can read/write only their own row; staff rows are additionally readable by other staff for the Team-style internal directory.
710: workspaces
711: Purpose: the billing entity — one workspace can own multiple websites and have multiple team members. (Internally this is what the product surfaces to the user as their 'account'.)
712: Field
713: 	Type
714: 	Constraints / Notes
715: 	id
716: 	TEXT (UUID)
717: 	Primary key
718: 	owner_user_id
719: 	TEXT
720: 	FK → users.id, not null
721: 	name
722: 	TEXT
723: 	Not null — defaults to '[Name]'s Workspace'
724: 	plan_id
725: 	TEXT
726: 	FK → plans.id, not null
727: 	razorpay_customer_id
728: 	TEXT
729: 	Nullable until first payment method added
730: 	default_timezone
731: 	TEXT
732: 	Default 'Asia/Kolkata'
733: 	created_at / updated_at
734: 	DATETIME
735: 	Not null
736: 	Indexes: INDEX(owner_user_id). Security: readable/writable by Owner and Admin team roles; Member role has read-only access to non-billing fields.
737: workspace_members
738: Field
739: 	Type
740: 	Constraints / Notes
741: 	id
742: 	TEXT (UUID)
743: 	Primary key
744: 	workspace_id
745: 	TEXT
746: 	FK → workspaces.id, not null
747: 	user_id
748: 	TEXT
749: 	FK → users.id, nullable until invite is accepted
750: 	invited_email
751: 	TEXT
752: 	Not null
753: 	role
754: 	TEXT
755: 	'owner' | 'admin' | 'member', not null
756: 	site_access
757: 	TEXT (JSON)
758: 	'all' or an array of site IDs the member is scoped to
759: 	status
760: 	TEXT
761: 	'active' | 'pending', not null
762: 	invited_at / joined_at
763: 	DATETIME
764: 	joined_at nullable
765: 	Indexes: INDEX(workspace_id), INDEX(user_id). Security: Owner/Admin can read/write all rows in their workspace; Member can read only their own row.
766: sites
767: Purpose: a registered website (the 'app' in OneSignal terminology) with its own FCM/VAPID credentials and subscriber base.
768: Field
769: 	Type
770: 	Constraints / Notes
771: 	id
772: 	TEXT (UUID)
773: 	Primary key
774: 	workspace_id
775: 	TEXT
776: 	FK → workspaces.id, not null
777: 	name
778: 	TEXT
779: 	Not null
780: 	domain
781: 	TEXT
782: 	Not null, unique per workspace
783: 	category
784: 	TEXT
785: 	e.g., 'blog', 'ecommerce', 'saas', 'news'
786: 	platform
787: 	TEXT
788: 	'wordpress' | 'shopify' | 'webflow' | 'custom' | 'api'
789: 	vapid_public_key / vapid_private_key
790: 	TEXT
791: 	vapid_private_key encrypted at rest (application-layer AES-256-GCM before write)
792: 	install_status
793: 	TEXT
794: 	'pending' | 'verified' | 'broken', default 'pending'
795: 	onboarding_step
796: 	INTEGER
797: 	0–3, tracks wizard resume position
798: 	sending_enabled
799: 	BOOLEAN
800: 	Default true — flipped false by admin moderation
801: 	created_at / updated_at
802: 	DATETIME
803: 	Not null
804: 	Indexes: INDEX(workspace_id), UNIQUE(domain, workspace_id). Security: scoped to workspace_members with access to that specific site (per site_access JSON).
805: subscribers
806: Purpose: one row per browser push subscription. This is the highest-volume table in the schema and the primary candidate for future partitioning as sites scale.
807: Field
808: 	Type
809: 	Constraints / Notes
810: 	id
811: 	TEXT (UUID)
812: 	Primary key
813: 	site_id
814: 	TEXT
815: 	FK → sites.id, not null
816: 	fcm_token
817: 	TEXT
818: 	Not null, unique per site
819: 	browser
820: 	TEXT
821: 	'chrome' | 'firefox' | 'edge'
822: 	os
823: 	TEXT
824: 	'windows' | 'macos' | 'linux' | 'android' | 'chromeos'
825: 	country / city
826: 	TEXT
827: 	Derived from IP at subscribe time (not stored as raw IP)
828: 	status
829: 	TEXT
830: 	'active' | 'unsubscribed', default 'active'
831: 	subscribed_at
832: 	DATETIME
833: 	Not null
834: 	last_seen_at
835: 	DATETIME
836: 	Updated on every service-worker ping
837: 	unsubscribed_at
838: 	DATETIME
839: 	Nullable
840: 	Indexes: INDEX(site_id, status), UNIQUE(site_id, fcm_token), INDEX(site_id, last_seen_at). Security: never directly exposed via API beyond the owning workspace's scoped role; raw fcm_token is never returned to the client after creation.
841: subscriber_attributes
842: Purpose: flexible key-value tags per subscriber (e.g., last_article_category, cart_value) used as segmentation inputs, mirroring OneSignal's 'data tags' pattern.
843: Field
844: 	Type
845: 	Constraints / Notes
846: 	id
847: 	TEXT (UUID)
848: 	Primary key
849: 	subscriber_id
850: 	TEXT
851: 	FK → subscribers.id, not null
852: 	key
853: 	TEXT
854: 	Not null, max 64 chars
855: 	value
856: 	TEXT
857: 	Max 256 chars
858: 	updated_at
859: 	DATETIME
860: 	Not null
861: 	Indexes: INDEX(subscriber_id), INDEX(key, value) for segment-rule query performance.
862: segments
863: Field
864: 	Type
865: 	Constraints / Notes
866: 	id
867: 	TEXT (UUID)
868: 	Primary key
869: 	site_id
870: 	TEXT
871: 	FK → sites.id, not null
872: 	name
873: 	TEXT
874: 	Not null
875: 	type
876: 	TEXT
877: 	'manual' | 'dynamic' | 'ai_suggested'
878: 	rule_json
879: 	TEXT (JSON)
880: 	Condition tree (attribute/operator/value, AND/OR groups)
881: 	subscriber_count_cached
882: 	INTEGER
883: 	Recomputed on a schedule + on-demand preview
884: 	created_by_user_id
885: 	TEXT
886: 	FK → users.id, nullable for AI-system-generated
887: 	created_at / updated_at
888: 	DATETIME
889: 	Not null
890: 	Indexes: INDEX(site_id).
891: campaigns
892: Field
893: 	Type

(Output capped at 50 KB. Showing lines 1-893. Use offset=894 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 6.4s)

_Thinking:_

The file is very long. Let me continue reading it from where it was cut off.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt",
  "offset": 894
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
894: 	Constraints / Notes
895: 	id
896: 	TEXT (UUID)
897: 	Primary key
898: 	site_id
899: 	TEXT
900: 	FK → sites.id, not null
901: 	title / body
902: 	TEXT
903: 	title max 65 chars, body max 240 chars (push payload limits)
904: 	icon_url / image_url
905: 	TEXT
906: 	R2 object URLs, nullable
907: 	click_url
908: 	TEXT
909: 	Not null — destination on click
910: 	action_buttons
911: 	TEXT (JSON)
912: 	Up to 2 {label, url} objects
913: 	segment_id
914: 	TEXT
915: 	FK → segments.id, nullable (null = all active subscribers)
916: 	status
917: 	TEXT
918: 	'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
919: 	scheduled_at / sent_at
920: 	DATETIME
921: 	Nullable
922: 	ai_generated
923: 	BOOLEAN
924: 	True if title/timing came from an accepted AI suggestion
925: 	created_by_user_id
926: 	TEXT
927: 	FK → users.id
928: 	created_at / updated_at
929: 	DATETIME
930: 	Not null
931: 	Indexes: INDEX(site_id, status), INDEX(site_id, scheduled_at).
932: campaign_stats
933: Purpose: pre-aggregated per-campaign counters, updated incrementally by the delivery worker, so the Analytics and Campaigns History screens never need to scan the raw delivery log on page load.
934: Field
935: 	Type
936: 	Constraints / Notes
937: 	campaign_id
938: 	TEXT
939: 	Primary key, FK → campaigns.id
940: 	sent_count / delivered_count / failed_count / click_count
941: 	INTEGER
942: 	Default 0, incremented atomically
943: 	updated_at
944: 	DATETIME
945: 	Not null
946: 	campaign_deliveries
947: Purpose: per-subscriber delivery record, written in batches by the Cron worker. Retained for 90 days then rolled up and pruned to control table growth, with campaign_stats remaining the permanent aggregate record.
948: Field
949: 	Type
950: 	Constraints / Notes
951: 	id
952: 	TEXT (UUID)
953: 	Primary key
954: 	campaign_id
955: 	TEXT
956: 	FK → campaigns.id, not null
957: 	subscriber_id
958: 	TEXT
959: 	FK → subscribers.id, not null
960: 	status
961: 	TEXT
962: 	'pending' | 'delivered' | 'failed' | 'clicked'
963: 	error_code
964: 	TEXT
965: 	Nullable — FCM error reason on failure
966: 	sent_at / delivered_at / clicked_at
967: 	DATETIME
968: 	Nullable as appropriate
969: 	Indexes: INDEX(campaign_id, status).
970: automations
971: Field
972: 	Type
973: 	Constraints / Notes
974: 	id
975: 	TEXT (UUID)
976: 	Primary key
977: 	site_id
978: 	TEXT
979: 	FK → sites.id, not null
980: 	name
981: 	TEXT
982: 	Not null
983: 	trigger_type
984: 	TEXT
985: 	'new_subscriber' | 'tag_added' | 'page_visited' | 'inactive_days' | 'ai_suggested'
986: 	trigger_config
987: 	TEXT (JSON)
988: 	Trigger-specific parameters
989: 	status
990: 	TEXT
991: 	'active' | 'paused' | 'draft'
992: 	created_at / updated_at
993: 	DATETIME
994: 	Not null
995: 	automation_steps
996: Field
997: 	Type
998: 	Constraints / Notes
999: 	id
1000: 	TEXT (UUID)
1001: 	Primary key
1002: 	automation_id
1003: 	TEXT
1004: 	FK → automations.id, not null
1005: 	step_order
1006: 	INTEGER
1007: 	Not null
1008: 	type
1009: 	TEXT
1010: 	'wait' | 'send' | 'condition'
1011: 	config
1012: 	TEXT (JSON)
1013: 	wait duration, campaign payload, or condition rule depending on type
1014: 	Indexes: INDEX(automation_id, step_order).
1015: automation_runs
1016: Purpose: tracks each subscriber's progress through an automation, so the Cron worker knows what to execute next per subscriber without re-evaluating the whole flow.
1017: Field
1018: 	Type
1019: 	Constraints / Notes
1020: 	id
1021: 	TEXT (UUID)
1022: 	Primary key
1023: 	automation_id
1024: 	TEXT
1025: 	FK → automations.id
1026: 	subscriber_id
1027: 	TEXT
1028: 	FK → subscribers.id
1029: 	current_step_id
1030: 	TEXT
1031: 	FK → automation_steps.id, nullable when complete
1032: 	status
1033: 	TEXT
1034: 	'active' | 'completed' | 'exited'
1035: 	next_action_at
1036: 	DATETIME
1037: 	When the worker should next process this run (for 'wait' steps)
1038: 	started_at / completed_at
1039: 	DATETIME
1040: 	Not null / nullable
1041: 	Indexes: INDEX(status, next_action_at) — the primary index the Cron worker scans.
1042: plans
1043: Field
1044: 	Type
1045: 	Constraints / Notes
1046: 	id
1047: 	TEXT
1048: 	Primary key, e.g., 'free', 'growth', 'scale'
1049: 	name / price_monthly / price_annual
1050: 	TEXT / INTEGER
1051: 	Prices in paise (INR minor unit)
1052: 	subscriber_limit / site_limit / ai_credit_limit / team_seat_limit
1053: 	INTEGER
1054: 	-1 denotes unlimited
1055: 	features
1056: 	TEXT (JSON)
1057: 	Feature-flag map for plan-gated UI
1058: 	subscriptions
1059: Field
1060: 	Type
1061: 	Constraints / Notes
1062: 	id
1063: 	TEXT (UUID)
1064: 	Primary key
1065: 	workspace_id
1066: 	TEXT
1067: 	FK → workspaces.id, unique (one active subscription per workspace)
1068: 	plan_id
1069: 	TEXT
1070: 	FK → plans.id
1071: 	razorpay_subscription_id
1072: 	TEXT
1073: 	Unique, nullable for Free plan
1074: 	status
1075: 	TEXT
1076: 	'active' | 'past_due' | 'canceled' | 'trialing'
1077: 	current_period_start / current_period_end
1078: 	DATETIME
1079: 	Not null
1080: 	created_at / updated_at
1081: 	DATETIME
1082: 	Not null
1083: 	invoices, coupons, ai_usage
1084: invoices: id, workspace_id (FK), razorpay_invoice_id, amount, currency, status, invoice_pdf_url (R2), created_at — INDEX(workspace_id, created_at). coupons: id, code (unique), type, value, max_redemptions, redemption_count, eligible_plan_ids (JSON), expires_at, status. ai_usage: id, workspace_id (FK), month (YYYY-MM), feature, credits_used — UNIQUE(workspace_id, month, feature), the row the AI Tools Hub usage meter reads directly.
1085: api_keys
1086: Field
1087: 	Type
1088: 	Constraints / Notes
1089: 	id
1090: 	TEXT (UUID)
1091: 	Primary key
1092: 	workspace_id
1093: 	TEXT
1094: 	FK → workspaces.id
1095: 	name
1096: 	TEXT
1097: 	User-assigned label
1098: 	key_hash
1099: 	TEXT
1100: 	SHA-256 hash of the secret — raw key never stored
1101: 	key_prefix
1102: 	TEXT
1103: 	First 8 chars, shown in UI for identification
1104: 	scopes
1105: 	TEXT (JSON)
1106: 	e.g., ['subscribers:read', 'campaigns:write']
1107: 	created_by_user_id
1108: 	TEXT
1109: 	FK → users.id
1110: 	last_used_at / created_at / revoked_at
1111: 	DATETIME
1112: 	Nullable as appropriate
1113: 	blog_posts
1114: Field
1115: 	Type
1116: 	Constraints / Notes
1117: 	id
1118: 	TEXT (UUID)
1119: 	Primary key
1120: 	title / slug
1121: 	TEXT
1122: 	slug unique, URL-safe
1123: 	body_mdx
1124: 	TEXT
1125: 	Not null
1126: 	excerpt / featured_image_url
1127: 	TEXT
1128: 	Nullable
1129: 	category / tags
1130: 	TEXT / JSON
1131: 	Nullable
1132: 	status
1133: 	TEXT
1134: 	'draft' | 'scheduled' | 'published'
1135: 	seo_title / seo_description
1136: 	TEXT
1137: 	Nullable, fallback to title/excerpt
1138: 	author_id
1139: 	TEXT
1140: 	FK → users.id
1141: 	published_at / created_at / updated_at
1142: 	DATETIME
1143: 	Nullable / not null / not null
1144: 	audit_logs
1145: Purpose: immutable record of every staff/admin action — never updated or deleted via the application layer.
1146: Field
1147: 	Type
1148: 	Constraints / Notes
1149: 	id
1150: 	TEXT (UUID)
1151: 	Primary key
1152: 	actor_user_id
1153: 	TEXT
1154: 	FK → users.id
1155: 	action
1156: 	TEXT
1157: 	e.g., 'account.suspend', 'site.disable_sending', 'feature_flag.update'
1158: 	target_type / target_id
1159: 	TEXT
1160: 	e.g., 'workspace' / workspace_id
1161: 	reason
1162: 	TEXT
1163: 	Required for destructive actions
1164: 	metadata
1165: 	TEXT (JSON)
1166: 	Before/after values where relevant
1167: 	created_at
1168: 	DATETIME
1169: 	Not null
1170: 	Indexes: INDEX(actor_user_id, created_at), INDEX(target_type, target_id).
1171: feature_flags
1172: id, key (unique), name, status ('on'/'off'/'rollout'), rollout_percentage (0–100), eligible_plan_ids (JSON), updated_at.
1173: 2. Entity Relationship Overview
1174: workspaces is the tenant root: a workspace has many workspace_members (linking to users), many sites, one subscriptions row, many invoices, and many api_keys. Each site has many subscribers, segments, campaigns, and automations. Each subscriber has many subscriber_attributes. Each campaign has one campaign_stats row and many campaign_deliveries rows. Each automation has many automation_steps and many automation_runs (one per enrolled subscriber). blog_posts, audit_logs, and feature_flags are platform-level entities not scoped to a single workspace. plans and coupons are platform-level reference data consumed by subscriptions and the billing flow.
1175: 3. API Endpoints
1176: Auth & Users
1177: Method
1178: 	Endpoint
1179: 	Auth Level
1180: 	Notes
1181: 	GET
1182: 	/api/v1/users/me
1183: 	Authenticated
1184: 	Resolve current user + role + default workspace
1185: 	PATCH
1186: 	/api/v1/users/me
1187: 	Authenticated
1188: 	Update profile fields
1189: 	GET / DELETE
1190: 	/api/v1/users/me/sessions
1191: 	Authenticated
1192: 	List / revoke active sessions
1193: 	Sites
1194: Method
1195: 	Endpoint
1196: 	Auth Level
1197: 	Notes
1198: 	GET / POST
1199: 	/api/v1/sites
1200: 	Authenticated (workspace member)
1201: 	List / create websites
1202: 	GET / PATCH / DELETE
1203: 	/api/v1/sites/:id
1204: 	Authenticated (scoped)
1205: 	Read / update / remove a website
1206: 	GET
1207: 	/api/v1/sites/:id/sdk-snippet
1208: 	Authenticated (scoped)
1209: 	Returns platform-specific install snippet
1210: 	GET
1211: 	/api/v1/sites/:id/verify-install
1212: 	Authenticated (scoped)
1213: 	Polls service-worker detection status
1214: 	POST
1215: 	/api/v1/sites/:id/send-test-notification
1216: 	Authenticated (scoped)
1217: 	Sends a single test push to the requester
1218: 	Subscribers
1219: Method
1220: 	Endpoint
1221: 	Auth Level
1222: 	Notes
1223: 	POST
1224: 	/api/v1/sites/:id/subscribers
1225: 	Public (site key required)
1226: 	SDK-originated subscription registration
1227: 	GET
1228: 	/api/v1/sites/:id/subscribers
1229: 	Authenticated (scoped)
1230: 	Paginated, filterable list
1231: 	POST
1232: 	/api/v1/sites/:id/subscribers/export
1233: 	Authenticated (scoped)
1234: 	Async CSV export job
1235: 	Segments
1236: Method
1237: 	Endpoint
1238: 	Auth Level
1239: 	Notes
1240: 	GET / POST
1241: 	/api/v1/segments
1242: 	Authenticated (scoped)
1243: 	List / create segments
1244: 	GET / PATCH / DELETE
1245: 	/api/v1/segments/:id
1246: 	Authenticated (scoped)
1247: 	Manage a segment
1248: 	POST
1249: 	/api/v1/segments/:id/preview-count
1250: 	Authenticated (scoped)
1251: 	Live subscriber-count estimate for a rule set
1252: 	Campaigns
1253: Method
1254: 	Endpoint
1255: 	Auth Level
1256: 	Notes
1257: 	GET / POST
1258: 	/api/v1/campaigns
1259: 	Authenticated (scoped)
1260: 	List / create (draft or send)
1261: 	GET / PATCH / DELETE
1262: 	/api/v1/campaigns/:id
1263: 	Authenticated (scoped)
1264: 	Manage a single campaign
1265: 	POST
1266: 	/api/v1/campaigns/:id/send
1267: 	Authenticated (scoped)
1268: 	Trigger immediate send
1269: 	POST
1270: 	/api/v1/campaigns/:id/duplicate
1271: 	Authenticated (scoped)
1272: 	Clone into a new draft
1273: 	Automations
1274: Method
1275: 	Endpoint
1276: 	Auth Level
1277: 	Notes
1278: 	GET / POST
1279: 	/api/v1/automations
1280: 	Authenticated (scoped)
1281: 	List / create
1282: 	PATCH / DELETE
1283: 	/api/v1/automations/:id
1284: 	Authenticated (scoped)
1285: 	Update flow / steps, or remove
1286: 	AI Layer
1287: Method
1288: 	Endpoint
1289: 	Auth Level
1290: 	Notes
1291: 	POST
1292: 	/api/v1/ai/generate-title
1293: 	Authenticated (scoped, AI-credit metered)
1294: 	Returns 3 title variants
1295: 	POST
1296: 	/api/v1/ai/optimize-ctr
1297: 	Authenticated (scoped, AI-credit metered)
1298: 	Rewrites an existing draft for CTR
1299: 	POST
1300: 	/api/v1/ai/suggest-send-time
1301: 	Authenticated (scoped, AI-credit metered)
1302: 	Optimal send-time recommendation
1303: 	POST
1304: 	/api/v1/ai/campaign-recommendations
1305: 	Authenticated (scoped, AI-credit metered)
1306: 	Suggests next campaign idea from performance history
1307: 	GET
1308: 	/api/v1/ai/suggest-segments
1309: 	Authenticated (scoped, AI-credit metered)
1310: 	Returns candidate AI segments
1311: 	GET
1312: 	/api/v1/ai/analytics-summary
1313: 	Authenticated (scoped, AI-credit metered)
1314: 	Plain-language performance summary
1315: 	GET
1316: 	/api/v1/ai/usage
1317: 	Authenticated (scoped)
1318: 	Current-period AI credit usage
1319: 	Analytics
1320: Method
1321: 	Endpoint
1322: 	Auth Level
1323: 	Notes
1324: 	GET
1325: 	/api/v1/sites/:id/dashboard-summary
1326: 	Authenticated (scoped)
1327: 	KPI snapshot
1328: 	GET
1329: 	/api/v1/sites/:id/analytics
1330: 	Authenticated (scoped)
1331: 	Date-range performance data
1332: 	GET
1333: 	/api/v1/sites/:id/analytics/export
1334: 	Authenticated (scoped)
1335: 	Async CSV export
1336: 	Team & API Keys
1337: Method
1338: 	Endpoint
1339: 	Auth Level
1340: 	Notes
1341: 	GET / POST
1342: 	/api/v1/team/invite
1343: 	Authenticated (Owner/Admin)
1344: 	Invite / list members
1345: 	PATCH / DELETE
1346: 	/api/v1/team/members/:id
1347: 	Authenticated (Owner/Admin)
1348: 	Change role / remove
1349: 	GET / POST / DELETE
1350: 	/api/v1/api-keys
1351: 	Authenticated (Owner/Admin)
1352: 	Manage developer API keys
1353: 	Billing
1354: Method
1355: 	Endpoint
1356: 	Auth Level
1357: 	Notes
1358: 	GET
1359: 	/api/v1/billing/plans
1360: 	Public
1361: 	Plan catalog
1362: 	GET
1363: 	/api/v1/billing/subscription
1364: 	Authenticated (Owner/Admin)
1365: 	Current plan + usage
1366: 	POST
1367: 	/api/v1/billing/change-plan
1368: 	Authenticated (Owner/Admin)
1369: 	Upgrade/downgrade via Razorpay
1370: 	POST
1371: 	/api/v1/billing/cancel
1372: 	Authenticated (Owner/Admin)
1373: 	Cancel subscription
1374: 	POST
1375: 	/api/v1/billing/webhook
1376: 	Razorpay signature-verified
1377: 	Subscription/payment event ingestion
1378: 	Admin (Staff)
1379: Method
1380: 	Endpoint
1381: 	Auth Level
1382: 	Notes
1383: 	GET
1384: 	/api/v1/admin/overview
1385: 	Staff (admin)
1386: 	Platform KPI snapshot
1387: 	GET
1388: 	/api/v1/admin/accounts
1389: 	Staff (admin)
1390: 	Search/list all workspaces
1391: 	POST
1392: 	/api/v1/admin/accounts/:id/suspend
1393: 	Staff (admin)
1394: 	Suspend a workspace, reason required
1395: 	POST
1396: 	/api/v1/admin/accounts/:id/impersonate
1397: 	Staff (admin)
1398: 	Create an audited impersonation session
1399: 	GET / POST
1400: 	/api/v1/admin/sites
1401: 	Staff (admin)
1402: 	Oversight + moderation
1403: 	GET
1404: 	/api/v1/admin/audit-logs
1405: 	Staff (super_admin)
1406: 	Immutable action log
1407: 	GET / PATCH
1408: 	/api/v1/admin/feature-flags
1409: 	Staff (super_admin)
1410: 	Manage rollout
1411: 	4. Roles & Permissions Matrix
1412: Action
1413: 	Owner
1414: 	Admin (Team)
1415: 	Member
1416: 	Staff Admin
1417: 	Send a campaign
1418: 	Yes
1419: 	Yes
1420: 	Yes (scoped sites)
1421: 	No
1422: 	Manage billing / change plan
1423: 	Yes
1424: 	Yes
1425: 	No
1426: 	No
1427: 	Invite / remove team members
1428: 	Yes
1429: 	Yes
1430: 	No
1431: 	No
1432: 	Generate / revoke API keys
1433: 	Yes
1434: 	Yes
1435: 	No
1436: 	No
1437: 	Suspend any workspace
1438: 	No
1439: 	No
1440: 	No
1441: 	Yes
1442: 	View audit logs
1443: 	No (own actions only via activity feed)
1444: 	No
1445: 	No
1446: 	Yes (super_admin)
1447: 	Toggle feature flags
1448: 	No
1449: 	No
1450: 	No
1451: 	Yes (super_admin)
1452: 	5. Storage Architecture (Cloudflare R2)
1453: Bucket / Prefix
1454: 	Contents
1455: 	Access Control
1456: 	sites/{site_id}/icon.png, /image-{campaign_id}.png
1457: 	Notification icon and image assets
1458: 	Public read (CDN-cached) — required for FCM payload URLs to be publicly fetchable by browsers
1459: 	sites/{site_id}/sw.js
1460: 	Per-site compiled service worker
1461: 	Public read
1462: 	exports/{workspace_id}/{job_id}.csv
1463: 	Subscriber and analytics export files
1464: 	Private — served via signed, time-limited URLs only
1465: 	invoices/{workspace_id}/{invoice_id}.pdf
1466: 	Generated invoice PDFs
1467: 	Private — signed URL
1468: 	blog/{post_id}/{filename}
1469: 	Blog featured images and inline content images
1470: 	Public read (CDN-cached)
1471: 	avatars/{user_id}.png
1472: 	User profile photos
1473: 	Public read
1474: 	6. Validation Rules
1475: Field-Level
1476: * Campaign title: required, 1–65 characters (push notification title display limit).
1477: * Campaign body: required, 1–240 characters.
1478: * Site domain: required, valid hostname format, must be unique within the owning workspace.
1479: * Email fields (signup, team invite): RFC 5322 format validation, lowercase-normalized before storage.
1480: * Segment rule_json: validated against a strict schema (allowed attributes, operators) server-side before save — the rule builder UI cannot be trusted to send only well-formed rules.
1481: * API key scopes: validated against a fixed enum; unknown scope strings are rejected, not silently ignored.
1482: Business Logic
1483: * A campaign cannot transition to 'sending' status if the owning site's sending_enabled flag is false (admin-disabled) or the workspace's subscription status is 'past_due' beyond the grace period.
1484: * A new site cannot be created if the workspace has already reached its plan's site_limit; the API returns a structured upgrade-prompt error the UI renders as the Billing upsell card.
1485: * An automation cannot be activated with zero steps configured.
1486: * A workspace cannot be deleted while it has an active (non-canceled) subscription; cancellation must complete first.
1487: Implementation Plan — Phased Roadmap
1488: This is the narrative roadmap version of the build plan. The fully detailed, copy-paste-ready version of each phase — with all 14 required quality fields per phase — lives in the AI Coding Prompt Package (Section 23) and is meant to be fed directly to an AI coding agent. This document is the project-management view: timeline, dependencies, and deliverable checklists for human planning and tracking.
1489: 1. Phase-wise Roadmap
1490: #
1491: 	Phase
1492: 	Est. Timeline
1493: 	Depends On
1494: 	1
1495: 	Foundation Setup
1496: 	Week 1
1497: 	None — first phase
1498: 	2
1499: 	Design System & Core UI
1500: 	Week 1–2
1501: 	Phase 1 complete
1502: 	3
1503: 	Authentication System
1504: 	Week 2
1505: 	Phase 2 complete
1506: 	4
1507: 	Database & Backend
1508: 	Week 3–4
1509: 	Phase 3 complete
1510: 	5
1511: 	Feature Development
1512: 	Week 4–7
1513: 	Phase 4 complete
1514: 	6
1515: 	Admin Panel
1516: 	Week 7–8
1517: 	Phase 5 core features complete
1518: 	7
1519: 	SEO & Marketing
1520: 	Week 8
1521: 	Public pages from Phase 2/5 complete
1522: 	8
1523: 	Security Layer
1524: 	Week 8–9
1525: 	Phase 4 + 6 complete
1526: 	9
1527: 	Performance Optimization
1528: 	Week 9
1529: 	Core features feature-complete
1530: 	10
1531: 	Testing & Deployment
1532: 	Week 9–10
1533: 	All prior phases complete
1534: 	Total estimated timeline: 9–10 weeks for a small (2–3 engineer) team to reach production launch readiness, assuming Phase 5 (Feature Development) is the critical path and other teams (design, content, QA) work in parallel from Phase 2 onward.
1535: Phase 1 — Foundation Setup
1536: Deliverables: 
1537: * Next.js 15 + TypeScript project scaffolded on Vercel
1538: * Folder structure established (app/, components/, lib/, hooks/, store/, types/)
1539: * Environment variables configured for D1, Firebase, R2, Razorpay
1540: * ESLint/Prettier/TypeScript strict mode configured
1541: * Base routing skeleton: (public), (auth), dashboard, admin route groups
1542: Phase 2 — Design System & Core UI
1543: Deliverables: 
1544: * Tailwind config extended with full color/spacing/radius token set
1545: * Typography scale implemented
1546: * Core component library built (Button, Input, Card, Modal, Badge, Toast, etc.)
1547: * Header, footer, sidebar nav, mobile bottom-tab nav implemented
1548: * Dark-premium glassmorphic theme applied platform-wide
1549: Phase 3 — Authentication System
1550: Deliverables: 
1551: * Firebase Auth integrated (email/password + Google/GitHub OAuth)
1552: * Login, Signup, Forgot Password, Email Verification screens built
1553: * Next.js middleware for protected-route + role-based guards
1554: * Session handling and silent token refresh
1555: Phase 4 — Database & Backend
1556: Deliverables: 
1557: * Full D1 schema migrated (all entities from Backend Schema doc)
1558: * Core CRUD API routes for sites, subscribers, segments, campaigns
1559: * Zod validation schemas for every endpoint
1560: * Roles & permissions middleware enforced server-side
1561: Phase 5 — Feature Development
1562: Deliverables: 
1563: * Website Onboarding Wizard + SDK/service-worker generation
1564: * Campaign Builder with live preview, targeting, scheduling
1565: * Automation/Drip Builder with flow canvas
1566: * Segments rule builder
1567: * AI Tools Hub integrated across all 6 AI features
1568: * Team Management, API Keys, Billing & Subscription screens
1569: Phase 6 — Admin Panel
1570: Deliverables: 
1571: * Admin Dashboard with platform KPIs
1572: * User & Account Management with audited impersonation
1573: * Website Oversight + Delivery Monitoring
1574: * Blog CMS, Coupons, Audit Logs & Feature Flags
1575: Phase 7 — SEO & Marketing
1576: Deliverables: 
1577: * Dynamic meta tag system across all public routes
1578: * sitemap.xml + robots.txt generation
1579: * Schema.org markup (Organization, Product, FAQPage, BlogPosting)
1580: * OG image generation pipeline
1581: Phase 8 — Security Layer
1582: Deliverables: 
1583: * Rate limiting on auth and API endpoints
1584: * CSRF protection on dashboard forms
1585: * Security headers (CSP, HSTS, X-Frame-Options)
1586: * Audit logging wired to every admin mutation
1587: Phase 9 — Performance Optimization
1588: Deliverables: 
1589: * Image optimization pipeline (WebP, responsive srcset)
1590: * Code-splitting and lazy loading for dashboard routes
1591: * Caching strategy implemented (ISR, API response caching)
1592: * Lighthouse CI gate: 90+ mobile, 95+ desktop
1593: Phase 10 — Testing & Deployment
1594: Deliverables: 
1595: * Unit + integration test suite for critical flows
1596: * GitHub Actions CI/CD pipeline (lint, typecheck, test, deploy)
1597: * Sentry error tracking + Vercel Analytics configured
1598: * Production launch checklist executed (see Section 25)
1599: 2. AI-Ready Task Breakdown — Sample (Phase 4: Database & Backend)
1600: Each phase in the AI Coding Prompt Package is further decomposable into granular tasks formatted for direct AI-agent execution. Example breakdown shown for Phase 4; apply the same granularity pattern when decomposing any other phase during sprint planning.
1601: Task
1602: 	Acceptance Criteria
1603: 	Files to Create/Modify
1604: 	Migrate core schema
1605: 	All 18 tables from Backend Schema doc exist in D1 with correct types, indexes, and FKs; migration is idempotent and re-runnable
1606: 	db/migrations/0001_init.sql, lib/db/client.ts
1607: 	Build Sites CRUD API
1608: 	GET/POST /api/v1/sites and GET/PATCH/DELETE /api/v1/sites/:id pass Zod validation, enforce workspace-scoped auth, return the standard {success, data, error} envelope
1609: 	app/api/v1/sites/route.ts, app/api/v1/sites/[id]/route.ts, lib/validation/sites.ts
1610: 	Build Subscribers ingestion endpoint
1611: 	Public POST endpoint accepts an FCM token + site key, deduplicates on (site_id, fcm_token), and rejects malformed payloads with a 400
1612: 	app/api/v1/sites/[id]/subscribers/route.ts
1613: 	Implement role-based middleware
1614: 	Requests to scoped routes are rejected with 403 if the requester's workspace_members role/site_access does not permit the action, verified by an automated test per role
1615: 	middleware.ts, lib/auth/guards.ts
1616: 	3. Dependencies Map
1617: External Dependencies to Provision Before Development Starts
1618: Dependency
1619: 	Needed Before
1620: 	Setup Notes
1621: 	Firebase project (Auth enabled, email/password + Google/GitHub providers)
1622: 	Phase 3
1623: 	Generate web SDK config and a service-account JSON for server-side token verification
1624: 	Firebase Cloud Messaging credentials (server key / service account)
1625: 	Phase 5
1626: 	Required for the HTTP v1 API — generate via the same Firebase project, scoped service account with the FCM-send role
1627: 	Cloudflare account: D1 database + R2 bucket created
1628: 	Phase 1
1629: 	Create the D1 database and bind it to the Vercel project via Cloudflare's Hyperdrive/REST connector or the D1 HTTP API
1630: 	Vercel project linked to GitHub repo
1631: 	Phase 1
1632: 	Configure preview deployments per PR and production deployment on merge to main
1633: 	Razorpay account (test + live mode keys)
1634: 	Phase 5 (Billing screen)
1635: 	Create Subscription Plans matching the Plans table; configure the webhook endpoint URL before going live
1636: 	LLM provider API key (server-side only)
1637: 	Phase 5 (AI Tools)
1638: 	Store as a Vercel encrypted environment variable; never exposed to the client bundle
1639: 	Google Analytics 4 property
1640: 	Phase 7
1641: 	Create the GA4 property and obtain the Measurement ID before the marketing pages ship
1642: 	Domain + DNS access for prontly.in (or chosen production domain)
1643: 	Phase 10
1644: 	Required for SSL provisioning and final production cutover
1645: 	Business Model Blueprint
1646: 1. Revenue Model
1647: Freemium SaaS with subscriber-volume-tiered subscription plans, billed monthly or annually (20% annual discount) via Razorpay. Free tier is intentionally usable in production (not a crippled trial) to maximize top-of-funnel adoption among the cost-sensitive blogger/creator segments, with monetization driven by subscriber-volume growth naturally pushing successful accounts into paid tiers.
1648: 2. Pricing Tiers
1649: Plan
1650: 	Price
1651: 	Subscriber Limit
1652: 	Sites
1653: 	AI Credits/mo
1654: 	Team Seats
1655: 	Key Gates
1656: 	Free
1657: 	₹0
1658: 	1,000
1659: 	1
1660: 	50
1661: 	1 (Owner only)
1662: 	No automation, manual campaigns only, Prontly branding in footer of notifications
1663: 	Starter
1664: 	₹999/mo (₹799/mo annual)
1665: 	10,000
1666: 	3
1667: 	300
1668: 	3
1669: 	Automation unlocked (up to 2 active flows), branding removable
1670: 	Growth
1671: 	₹2,999/mo (₹2,399/mo annual)
1672: 	50,000
1673: 	10
1674: 	1,500
1675: 	10
1676: 	Unlimited automations, AI segmentation, API access
1677: 	Scale
1678: 	₹7,999/mo (₹6,399/mo annual)
1679: 	250,000
1680: 	Unlimited
1681: 	5,000
1682: 	25
1683: 	Priority delivery queue, dedicated onboarding call
1684: 	Enterprise
1685: 	Custom
1686: 	Custom
1687: 	Unlimited
1688: 	Custom
1689: 	Unlimited
1690: 	Custom SLA, sub-processor agreement, SSO (roadmap)
1691: 	Pricing is denominated in INR as the primary-market currency with automatic USD/GBP/CAD/AUD display conversion (informational; settlement remains in INR via Razorpay for V1) for the secondary US/UK/Canada/Australia markets.
1692: 3. Customer Acquisition Strategy
1693: * SEO content engine (Blog + programmatic Docs/Integrations pages) targeting 'push notification for [platform]' and 'OneSignal alternative' search intent — see SEO Blueprint and Content Strategy for execution detail.
1694: * Integration-marketplace listings: WordPress.org plugin directory, Shopify App Store — both are high-intent discovery surfaces where the target personas already search for exactly this category of tool.
1695: * Comparison/alternative pages (e.g., 'Prontly Notify vs OneSignal') capturing bottom-funnel switcher search intent.
1696: * Free-tier virality: every notification sent can optionally carry a small 'Powered by Prontly Notify' footer link on the Free plan, functioning as a low-cost referral surface.
1697: 4. Retention & Expansion Strategy
1698: * Activation-focused onboarding (Website Onboarding Wizard) targets time-to-first-value under 5 minutes — the single strongest predictor of 30-day retention in this product category.
1699: * AI-driven engagement nudges (the AI insight card on Dashboard Home) keep dormant accounts re-engaged with the product itself, not just their subscribers.
1700: * Natural expansion path: as a site's subscriber base grows past its plan's limit, the in-app usage meter on Billing & Subscription surfaces the upgrade prompt contextually rather than via a sales touch — a self-serve expansion motion appropriate for the target personas' budget and buying behavior.
1701: 5. Cost Structure Considerations
1702: Cost Category
1703: 	Driver
1704: 	Mitigation Built Into the Architecture
1705: 	Compute (Vercel)
1706: 	API route invocations, scaling with sends and dashboard traffic
1707: 	Serverless pay-per-use model avoids idle-server cost during the pre-revenue growth phase
1708: 	Database (Cloudflare D1)
1709: 	Row count and query volume, scaling with subscriber base
1710: 	Free/cheap relative to managed Postgres at this scale; pre-aggregated counters (campaign_stats) avoid expensive scans
1711: 	Storage egress (R2)
1712: 	Notification image/icon delivery, export downloads
1713: 	R2's zero-egress-fee model removes the single largest variable cost competitors on AWS S3 absorb
1714: 	Push delivery (FCM)
1715: 	Volume of notifications sent
1716: 	FCM is free at the volumes this product will operate at for the foreseeable roadmap horizon
1717: 	AI inference
1718: 	LLM API calls for all six AI features
1719: 	Usage-gated via the ai_usage table and per-plan credit limits, directly tying cost to monetized tiers
1720: 	Competitor Analysis Report
1721: This is the design and positioning intelligence foundation for the entire blueprint. Patterns identified here directly inform the Design System, Wireframe Plan, and Conversion Strategy sections later in this document.
1722: 1. Competitor Research Table
1723: Website
1724: 	Why Studied
1725: 	Key UX Patterns
1726: 	Relevance to Prontly Notify
1727: 	OneSignal
1728: 	Category leader; the de facto benchmark every prospective customer will compare against
1729: 	Generous free tier as the primary acquisition lever; dense data-table-driven dashboard; subscriber/MAU-based pricing transparency
1730: 	Sets the bar for free-tier usability and pricing transparency; Prontly Notify must match or beat the free-tier ceiling to win switchers
1731: 	PushEngage
1732: 	Closest direct competitor — push-notification-only focus, SMB/blogger-leaning customer base
1733: 	Low entry price point; pre-built automation templates (abandoned cart, win-back); segment-by-behavior UI
1734: 	Validates that the blogger/SMB segment responds to low, simple entry pricing and template-driven automation rather than blank-canvas builders
1735: 	WonderPush
1736: 	Developer-friendly alternative with strong API-first positioning
1737: 	Minimal, technical UI; heavy documentation investment; webhook-centric architecture
1738: 	Validates the developer/SaaS-founder persona's need for first-class API access (reflected in the API Keys screen and REST API Architecture)
1739: 	Webpushr
1740: 	WordPress-plugin-first distribution strategy
1741: 	One-click WordPress install flow; plugin-native dashboard embedded inside wp-admin
1742: 	Confirms WordPress must be a first-class, near-zero-friction integration path, not an afterthought
1743: 	PushOwl
1744: 	Shopify-native push notification app, strong e-commerce vertical focus
1745: 	Deep Shopify event triggers (cart abandonment, back-in-stock, price-drop); revenue-attribution reporting tied to push
1746: 	Confirms e-commerce-specific automation triggers and revenue-attribution framing are expected by store-owner personas
1747: 	Firebase Cloud Messaging (raw)
1748: 	The underlying delivery infrastructure every competitor (including Prontly Notify) is built on
1749: 	No dashboard at all — pure API/SDK; developers must build their own subscriber storage, targeting, and analytics
1750: 	Defines the 'do it yourself' baseline cost (engineering time) that Prontly Notify's entire value proposition is priced against
1751: 	2. Deep-Dive Analysis — Primary Competitors
1752: OneSignal
1753: * Hero Section: leads with the breadth claim ('one platform, every channel') rather than a single-channel promise — communicates scale and reduces perceived switching risk for growing teams.
1754: * Navigation & IA: product-led mega-menu organized by channel (Push, In-App, Email, SMS) rather than by use case — clear but can overwhelm a visitor who only wants web push.
1755: * Trust Architecture: published, calculable pricing (subscriber/MAU-based) is itself a trust signal in a category where many competitors hide pricing behind 'Contact Sales.'
1756: * CTA Patterns: the free-tier CTA is consistently the most prominent button — the free plan is the actual primary conversion goal, not a secondary option.
1757: * Conversion Flow: visitor → free signup → SDK install → first campaign, with documentation as the primary conversion-support content type.
1758: * Mobile Experience: marketing site is fully responsive but the dashboard itself is desktop-oriented, reflecting the assumption that push management is a desk-based task — an assumption Prontly Notify deliberately rejects per its mobile-first dashboard mandate.
1759: * Design Language: clean, blue-accented, light-mode-first — a visual space Prontly Notify's dark-premium direction deliberately avoids competing in directly.
1760: * Content Strategy: documentation-heavy, developer-tone copy even on marketing pages — appropriate for OneSignal's broader enterprise buyer mix but heavier than the blogger/creator persona wants.
1761: PushEngage
1762: * Hero Section: leads with a concrete outcome claim (recovering lost visitors/sales) rather than a feature list — outcome-first messaging that resonates with the SMB/blogger buyer.
1763: * Trust Architecture: case-study-driven, with specific recovered-revenue numbers per customer — strong bottom-of-funnel trust building for the e-commerce-leaning segment of its audience.
1764: * CTA Patterns: pairs a low, explicit starting price directly next to the primary CTA, removing the 'how much will this cost me' hesitation at the point of decision.
1765: * Conversion Flow: heavy use of pre-built automation templates (abandoned cart, win-back, price-drop) presented as one-click starting points rather than a blank canvas — directly informs Prontly Notify's Automation/Drip Builder template strategy.
1766: 3. UX Patterns To Adopt for Prontly Notify
1767: Pattern: Calculable, published pricing with a usage slider
1768: Inspired by: OneSignal. Implementation: the Pricing screen includes a subscriber-volume slider that recalculates the visible price live, removing any 'request a quote' friction for self-serve buyers. Why it works: pricing opacity is the single most-cited frustration in competitor reviews across this category.
1769: Pattern: Pre-built automation templates as the default entry point
1770: Inspired by: PushEngage, PushOwl. Implementation: the Automation/Drip Builder opens with a template gallery (Welcome Series, Re-engagement, Abandoned Content/Cart) before offering the blank-canvas flow editor. Why it works: blank-canvas automation builders have a well-documented activation-rate penalty versus template-first entry points.
1771: Pattern: Outcome-first hero messaging, not feature-first
1772: Inspired by: PushEngage. Implementation: Home hero headline leads with the re-engagement outcome ('Bring readers back without an email list') rather than the mechanism ('Browser push notification platform'). Why it works: the target personas (bloggers, e-commerce owners) buy outcomes, not technology categories.
1773: Pattern: Revenue/engagement attribution tied directly to campaigns
1774: Inspired by: PushOwl. Implementation: Analytics surfaces a 'conversions' column alongside CTR wherever a click_url maps to a tracked goal, not just raw delivery/click counts. Why it works: ROI-justification is the strongest retention lever for paid-tier accounts.
1775: Pattern: First-class, documented REST API as a primary (not hidden) surface
1776: Inspired by: WonderPush. Implementation: the Docs Hub gives the REST API equal navigational weight to the SDK install guides, and the API Keys screen is reachable from the main sidebar, not buried in account settings. Why it works: the developer/SaaS-founder persona actively screens out tools that treat the API as an afterthought.
1777: Pattern: One-click, platform-native install flow
1778: Inspired by: Webpushr. Implementation: the Website Onboarding Wizard's WordPress path links directly to a one-click plugin install rather than requiring manual code-paste for that platform specifically. Why it works: WordPress represents a large share of the blogger/publisher persona's installed base and one-click install measurably improves activation rate versus copy-paste snippets.
1779: 4. UX Anti-Patterns To Avoid
1780: Anti-pattern: Gating basic automation behind the highest-priced tier
1781: Seen on: several incumbent tools that reserve drip/journey automation for enterprise-only plans. Why to avoid: automation is the core differentiator Prontly Notify is positioning on; gating it away from the Starter tier would undercut the product's primary competitive wedge.
1782: Anti-pattern: Desktop-only dashboard design
1783: Seen on: OneSignal's dashboard, and most legacy competitors generally. Why to avoid: the blogger/creator persona frequently manages their site from a phone between other tasks; a desktop-only dashboard would silently exclude a meaningful share of the target audience from full product use.
1784: Anti-pattern: 'Contact Sales' as the only path to see pricing past the entry tier
1785: Seen on: several enterprise-leaning engagement platforms (CleverTap, Braze-tier competitors). Why to avoid: the self-serve, product-led growth motion this PRD specifies depends on a visitor being able to fully evaluate cost without a sales conversation.
1786: SEO Blueprint
1787: The full technical implementation prompt (meta system, schema, sitemap, robots.txt) is in the AI Coding Prompt Package's SEO Master Prompt. This document covers the strategic layer: keyword targeting, content architecture, and the programmatic SEO opportunity unique to this product category.
1788: 1. Keyword Strategy
1789: Intent Stage
1790: 	Example Queries
1791: 	Target Page
1792: 	Awareness / informational
1793: 	'how to send browser push notifications', 'what is web push', 'increase blog returning visitors'
1794: 	Blog posts
1795: 	Consideration / comparison
1796: 	'OneSignal alternative', 'best push notification tool for WordPress', 'PushEngage vs OneSignal'
1797: 	Comparison/alternative landing pages, Blog
1798: 	Platform-specific integration
1799: 	'web push notifications for Shopify', 'WordPress push notification plugin'
1800: 	Docs Hub platform pages (one per platform — programmatic SEO opportunity)
1801: 	Bottom-funnel / branded
1802: 	'prontly notify pricing', 'prontly notify review'
1803: 	Pricing, Home
1804: 	2. Programmatic SEO Opportunity
1805: The Integrations & Docs Hub is the highest-leverage programmatic SEO surface for this product: a dedicated, indexable page for every supported platform (/docs/wordpress, /docs/shopify, /docs/webflow, /docs/wix, /docs/custom-html, /docs/rest-api) plus a comparison-page template (/compare/[competitor-slug]) targeting switcher search intent for each named competitor in the Competitor Analysis Report. Each page should be genuinely differentiated content (specific install steps, specific feature comparisons) rather than templated thin content, to avoid a content-quality penalty at scale.
1806: 3. Internal Linking Strategy
1807: * Every Blog post links to at least one relevant Docs Hub platform page and one relevant feature area (e.g., a post about win-back campaigns links to the Automation feature and the AI Tools Hub).
1808: * The Pricing page links to the FAQ's billing-specific questions via anchor links, keeping objection-handling content one click away from the decision point.
1809: * Docs Hub platform pages cross-link to each other via a 'Other platforms' module, helping crawlers and agency users evaluating multi-client deployments discover the full integration matrix.
1810: 4. Schema Markup Plan
1811: Page Type
1812: 	Schema Types
1813: 	Home
1814: 	Organization, WebSite, FAQPage
1815: 	Pricing
1816: 	Product, Offer (per plan)
1817: 	Blog Listing / Detail
1818: 	Blog, BlogPosting, Person (author), BreadcrumbList
1819: 	Docs Hub
1820: 	TechArticle, BreadcrumbList, HowTo (for install-step pages)
1821: 	FAQ
1822: 	FAQPage (per question/answer pair)
1823: 	5. Content Calendar Cadence
1824: 2 posts/week at launch, prioritizing the 'platform-specific integration' and 'comparison/alternative' intent buckets first (highest conversion-to-signup rate historically for this category), tapering to 1 post/week plus ongoing Docs Hub expansion as the comparison-page library matures. See Content Strategy for the full editorial framework.
1825: Content Strategy
1826: 1. Content Pillars
1827: Pillar
1828: 	Purpose
1829: 	Example Topics
1830: 	Re-engagement Tactics
1831: 	Top-of-funnel SEO + thought leadership
1832: 	'5 ways to win back readers without email', 'Push notification copy that converts'
1833: 	Platform Integration Guides
1834: 	Programmatic SEO, bottom-funnel technical content
1835: 	'Add push notifications to WordPress in 5 minutes', 'Shopify cart abandonment push setup'
1836: 	Competitive / Alternative Content
1837: 	Switcher-intent capture
1838: 	'OneSignal alternative for small publishers', 'PushEngage vs Prontly Notify'
1839: 	Product Education
1840: 	Activation and feature-adoption support
1841: 	'How AI title generation works', 'Building your first automation'
1842: 	Customer Stories
1843: 	Trust-building, mid-funnel
1844: 	Short case studies from early adopter publishers/stores
1845: 	2. Editorial Workflow
1846: 1. Topic selected from the keyword strategy backlog (mapped in SEO Blueprint), prioritized by estimated search volume and funnel stage.
1847: 2. Draft written directly in the Blog CMS (rich-text/MDX editor) by the content owner.
1848: 3. SEO fields (meta title, description, slug) completed before the post can move to Scheduled status.
1849: 4. Internal review pass checks for at least one Docs Hub link and one feature-area link per the Internal Linking Strategy.
1850: 5. Scheduled or published; performance reviewed at 30/90 days against the post's target keyword ranking and assisted-signup attribution.
1851: 3. Tone & Voice Guidelines
1852: * Direct and practical — every piece should leave the reader able to do something, not just understand a concept abstractly.
1853: * No artificial urgency or hype language; the brand feeling is 'trustworthy, premium, technical,' which extends to content tone, not just visual design.
1854: * Platform-integration guides are written at a 'comfortable pasting a script tag, not comfortable writing code' reading level, matching the Primary Persona's tech-comfort profile from the PRD.
1855: 4. Distribution Channels
1856: * Organic search (primary channel, supported by the SEO Blueprint).
1857: * In-app surfacing: relevant Blog posts linked contextually from empty states and the AI Tools Hub (e.g., an empty Automation list links to 'Building your first automation').
1858: * Newsletter: a lightweight digest to the Blog's own newsletter capture list, reinforcing the product's own channel-diversification thesis by modeling owned-audience habits.
1859: Admin Panel Blueprint
1860: Full screen-level detail (layout, components, API calls) for every admin screen is in the App Flow and Screen-wise AI Coding Prompts sections. This document covers the operating model: who uses the admin panel, what they're responsible for, and how admin actions are governed.
1861: 1. Admin User Types
1862: Role
1863: 	Responsibilities
1864: 	Screens Accessible
1865: 	Admin (Staff)
1866: 	Day-to-day support, account moderation, content publishing, billing operations
1867: 	Admin Dashboard, User & Account Management, Website Oversight, Subscription & Revenue, Blog CMS, Delivery Monitoring, Coupons
1868: 	Super Admin (Staff)
1869: 	Everything Admin can do, plus compliance and platform-config authority
1870: 	All Admin screens, plus Audit Logs & Feature Flags
1871: 	2. Admin Panel Module Map
1872: Module
1873: 	Core Purpose
1874: 	Admin Dashboard
1875: 	Give Prontly's internal team a real-time operational and business health overview across all tenants.
1876: 	User & Account Management
1877: 	Let internal staff search, inspect, support, and moderate customer accounts.
1878: 	Website Oversight
1879: 	Monitor all registered websites platform-wide for installation health and abuse (e.g., spam content, ToS violations).
1880: 	Subscription & Revenue Management
1881: 	Give finance/ops visibility into MRR, churn, failed payments, and coupon performance.
1882: 	Blog CMS
1883: 	Let the marketing/content team create and manage blog posts that power the SEO content strategy.
1884: 	Delivery Monitoring & System Health
1885: 	Monitor FCM delivery success rates, API latency, and queue health across the notification-sending pipeline.
1886: 	Coupons & Discounts
1887: 	Let growth/marketing staff create and manage promotional discount codes for launches and campaigns.
1888: 	Audit Logs & Feature Flags
1889: 	Provide an immutable record of all admin actions and a control panel for gradually rolling out features.
1890: 	3. Governance Principles
1891: * Every destructive or account-impacting action (suspend, disable sending, impersonate, retry charge, change feature-flag rollout) requires an explicit reason captured at the point of action and written to the immutable Audit Logs table.
1892: * Impersonation is always logged and always visually disclosed to the impersonating staff member via a persistent banner — there is no silent impersonation mode.
1893: * Financial actions (refunds, charge retries) are restricted to a defined finance/ops staff_role subset, even though the Admin role technically has UI access — enforced via an additional server-side permission check beyond the basic Admin/Super Admin split.
1894: * Feature flag changes are themselves audit-logged, ensuring staged rollouts are traceable for post-incident review.
1895: 4. Admin Panel KPIs (Dashboard Composition)
1896: KPI
1897: 	Why It's on the Admin Dashboard
1898: 	MRR / Active Accounts
1899: 	Primary business health signal for leadership and ops
1900: 	FCM Delivery Success Rate
1901: 	Core reliability promise to customers — degradation here is the highest-severity operational issue the platform can have
1902: 	Open Support Tickets (if integrated)
1903: 	Surfaces support load trends that may indicate a broader product or reliability issue
1904: 	Failed Payments Count
1905: 	Direct revenue-at-risk signal requiring proactive outreach
1906: 	API Architecture
1907: Full endpoint-by-endpoint detail is in the Backend Schema document and the AI Coding Prompt Package's API Architecture Prompt. This document covers the architectural decisions and conventions that bind the API together as a coherent system.
1908: 1. API Design Conventions
1909: Convention
1910: 	Decision
1911: 	Base pattern
1912: 	/api/v1/[resource] — versioned from day one so the developer-persona's API-key integrations are never broken by an unannounced breaking change
1913: 	Response envelope
1914: 	{ success: boolean, data: any, error?: string, meta?: object } on every endpoint, including errors — clients never need to branch on HTTP status alone to determine response shape
1915: 	Pagination
1916: 	Cursor-based (not offset) on every list endpoint — required for the subscribers table specifically, where offset pagination degrades badly past tens of thousands of rows
1917: 	Auth methods
1918: 	Firebase ID token (dashboard, first-party) or a scoped API key with a Bearer prefix (developer/REST integrations) — both resolve to the same internal auth-context shape so route handlers don't need separate logic paths
1919: 	Idempotency
1920: 	Write endpoints that could plausibly be retried by a client (campaign send, subscriber export trigger) accept an optional Idempotency-Key header to prevent duplicate side effects on network-retry scenarios
1921: 	2. Internal vs. Public API Surface
1922: Internal (dashboard-only) endpoints: Most of the surface — Sites, Subscribers, Segments, Campaigns, Automations, AI, Analytics, Team, Billing — are callable by the dashboard's own session and, where explicitly scoped, by a developer's API key. There is no separate 'internal API' the dashboard uses that customers cannot also access; the dashboard is simply the first, most fully-featured client of the same public API surface — a deliberate decision that keeps the API honest and complete rather than allowing it to drift behind dashboard-only shortcuts.
1923: Admin (staff-only) endpoints: /api/v1/admin/* is a genuinely separate, staff-authenticated surface, never exposed to customer-issued API keys under any scope, since it operates across tenant boundaries by design.
1924: 3. Middleware Stack (applied in order to every request)
1925: 1. CORS — restricts cross-origin calls to the marketing/dashboard origin for session-based requests; API-key-authenticated requests are allowed broader CORS since they're meant for server-to-server or client-side SDK use from the customer's own domain.
1926: 2. Rate limiting — see Security Architecture for tier-specific limits.
1927: 3. Request logging — structured logs (request ID, route, auth context, latency) shipped to the hosting provider's log aggregation for observability.
1928: 4. Auth verification — resolves Firebase ID token or API key into a consistent { userId | apiKeyId, workspaceId, role, scopes } context object.
1929: 5. Input sanitization — strips/escapes any HTML in free-text fields (campaign body, segment names) before validation, defending against stored-XSS even if a later rendering path forgets to escape output.
1930: 6. Zod schema validation — endpoint-specific, rejects malformed payloads before any database write is attempted.
1931: 7. Response formatting — wraps the handler's return value in the standard envelope.
1932: 4. Webhook Architecture
1933: Webhook
1934: 	Source
1935: 	Handling
1936: 	Razorpay subscription/payment events
1937: 	Razorpay
1938: 	Signature-verified using the webhook secret; idempotent processing keyed on Razorpay's event ID to safely handle redelivery
1939: 	Outbound: campaign delivery events (future roadmap)
1940: 	Prontly Notify → customer's own endpoint
1941: 	Planned for the Scale/Enterprise tier, allowing customers to pipe delivery/click events into their own CRM or analytics stack
1942: 	5. Why This Architecture Fits a Multi-Tenant, AI-Augmented Push Platform
1943: The single-envelope, cursor-paginated, dual-auth-method design keeps the API simple enough for a small founding engineering team to maintain while remaining genuinely usable by the developer persona as a first-class integration surface — a gap several competitors leave unaddressed by treating their API as a secondary, dashboard-mirroring afterthought.
1944: Security Architecture
1945: Full implementation-level detail (headers, rate-limit numbers, hashing parameters) is in the AI Coding Prompt Package's Security Implementation Prompt. This document covers the threat model and architectural reasoning specific to a multi-tenant push notification platform.
1946: 1. Threat Model — What Makes This Product's Security Posture Distinct
1947: Threat
1948: 	Why It's Elevated For This Product
1949: 	Architectural Response
1950: 	Sender-reputation abuse (spam/phishing via push)
1951: 	A single abusive tenant sending unsolicited or deceptive notifications can damage FCM/browser-vendor trust for the entire platform, affecting every other tenant's deliverability
1952: 	Automated content screening on campaign send, the Website Oversight admin module, and a sending_enabled kill-switch enforced server-side regardless of UI state
1953: 	Cross-tenant data leakage
1954: 	Every query (subscribers, campaigns, segments) must be scoped to the requesting workspace; a single missing WHERE clause could expose one customer's subscriber data to another
1955: 	Every D1 query in the data-access layer is generated through a scoped query builder that requires a workspace/site ID parameter — there is no raw-query code path that bypasses this scoping in application code
1956: 	API key compromise
1957: 	A leaked customer API key could be used to exfiltrate subscriber data or send unauthorized campaigns from a legitimate tenant's account
1958: 	Scoped permissions per key (read-only keys cannot send), key-prefix-only display after creation, and per-key usage monitoring on the API Keys screen so customers can self-detect anomalous use
1959: 	Admin impersonation misuse
1960: 	Staff impersonation is operationally necessary for support but is also the highest-leverage internal-abuse vector
1961: 	Every impersonation session is time-boxed, audit-logged, and visually disclosed to the impersonated account's owner via an activity-log entry they can see
1962: 	2. Authentication & Session Security
1963: * Firebase Authentication handles credential storage and password hashing — Prontly Notify never stores raw or self-hashed passwords, eliminating an entire class of credential-storage risk from the application's own threat surface.
1964: * ID tokens are short-lived; the Firebase client SDK handles silent refresh, and Next.js middleware re-verifies the token signature on every protected request rather than trusting a cached session flag.
1965: * 2FA (TOTP) is available from Account Settings and is presented as a recommended (not yet mandatory for V1) step during onboarding for Owner-role accounts specifically, given their elevated blast radius (billing, team, API keys).
1966: 3. Data Protection
1967: * Subscriber FCM tokens are treated as sensitive identifiers: never returned in any list/export response in raw form to the dashboard UI beyond what's needed for the Subscribers table display, and excluded entirely from CSV exports unless explicitly requested with an additional confirmation step.
1968: * Site-level VAPID private keys are encrypted at the application layer (AES-256-GCM) before being written to D1, with the encryption key held in a hosting-provider-managed secret store, not in the application's own database.
1969: * PII minimization: IP addresses used for geo-resolution at subscribe time are resolved to country/city and then discarded — raw IPs are never persisted, reducing both breach impact and DPDPA/GDPR compliance scope.
1970: 4. Incident Response Posture
1971: 1. Delivery Monitoring (admin) provides the first detection layer for both reliability and abuse-pattern incidents.
1972: 2. A confirmed incident triggers an Audit Logs entry and, for customer-impacting events, a notice surfaced via the affected workspace's notification preferences.
1973: 3. Post-incident, the Audit Logs and Delivery Monitoring error logs together provide the forensic record for a written post-mortem — required practice before closing any Severity 1/2 incident.
1974: Analytics Architecture
1975: 1. Two Distinct Analytics Systems
1976: System
1977: 	Purpose
1978: 	Data Captured
1979: 	Consumed By
1980: 	Google Analytics 4
1981: 	Marketing-site acquisition and SEO performance
1982: 	Anonymized pageviews, traffic source, conversion events (signup completions)
1983: 	Growth/marketing team, external GA4 dashboard
1984: 	Internal Analytics Engine (D1-backed)
1985: 	Product-usage and campaign-performance analytics surfaced inside the dashboard itself
1986: 	Campaign sends/deliveries/clicks, subscriber growth, automation run outcomes, AI feature usage
1987: 	Customers (Analytics screen), Admin (platform-wide rollups)
1988: 	2. Internal Analytics Engine — Design Principles
1989: * Write-time aggregation, not read-time computation: the campaign_stats table (see Backend Schema) is incremented as delivery events occur, so the Analytics screen never triggers an expensive scan of raw campaign_deliveries rows on page load.
1990: * Per-tenant isolation: every analytics query is scoped by site_id/workspace_id at the query-builder level, identical to the data-isolation approach described in Security Architecture.
1991: * Date-range as the single source of truth: the selected range lives in the URL query string, making every analytics view in the product bookmarkable and shareable within a team without losing context.
1992: 3. Core Metrics Tracked
1993: Metric
1994: 	Definition
1995: 	Where Surfaced
1996: 	Subscriber Net Growth
1997: 	New subscriptions minus unsubscribes/churned tokens, over the selected date range
1998: 	Dashboard Home, Analytics
1999: 	Click-Through Rate (CTR)
2000: 	Clicked / Delivered, per campaign and as a site-wide average
2001: 	Dashboard Home, Analytics, Campaigns History
2002: 	Delivery Success Rate
2003: 	Delivered / Sent, per campaign and platform-wide
2004: 	Analytics, Admin Delivery Monitoring
2005: 	Unsubscribe Rate
2006: 	Unsubscribes / Active Subscribers, over the selected range
2007: 	Analytics
2008: 	Automation Completion Rate
2009: 	Subscribers reaching the final step / subscribers entering the flow
2010: 	Automation / Drip Builder (per-automation mini-analytics)
2011: 	AI Feature Adoption Rate
2012: 	Campaigns using an accepted AI suggestion / total campaigns sent
2013: 	AI Tools Hub, internal product analytics (not customer-facing)
2014: 	4. AI Analytics Summary — Data Pipeline
2015: The AI Analytics Summary feature does not send raw subscriber data to the LLM provider. It sends only the pre-aggregated metrics described above for the selected date range, plus campaign metadata (titles, send times) needed to generate a meaningful narrative — consistent with the data-minimization principle established in Security Architecture and the TRD's third-party integration table.
2016: Monetization Blueprint

(Output capped at 50 KB. Showing lines 894-2016. Use offset=2017 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.0s)

_Thinking:_

This is a massive blueprint document. Let me continue reading the rest of it to get the full picture before building.

**Tool: read**

**Input:**
```json
{
  "offset": 2017,
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt"
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
2017: This document focuses on the in-product monetization mechanics — how upgrade pressure is created and resolved inside the experience. Plan pricing and tier definitions are specified in the Business Model Blueprint.
2018: 1. Upgrade Trigger Points
2019: Trigger
2020: 	Where Surfaced
2021: 	Copy Direction
2022: 	Subscriber count approaching plan limit
2023: 	Billing & Subscription usage meter; a dismissible banner on Dashboard Home once >80% of limit
2024: 	'You're at 8,200 of 10,000 subscribers — upgrade to Growth before you hit your limit' (specific numbers, not vague warnings)
2025: 	Site limit reached on Add Website
2026: 	Website Switcher & Add Website screen
2027: 	'You've reached your Starter plan's 3-site limit' with a direct 'Upgrade Plan' CTA inline, not a dead-end error
2028: 	AI credits exhausted
2029: 	AI Tools Hub usage meter, and inline within any AI action that would consume a credit
2030: 	'You've used all 300 AI credits this month — upgrade for unlimited AI, or credits reset on [date]' (always shows the free reset date as the non-paying alternative, never only the upsell)
2031: 	Automation step-count limit (Free plan)
2032: 	Automation / Drip Builder, when adding a step beyond the Free tier's allowance
2033: 	Inline upgrade prompt at the exact point of friction, not a separate billing-page redirect that loses the user's in-progress flow
2034: 	Team seat limit reached
2035: 	Team Management 'Invite Member' action
2036: 	'Your plan includes 3 seats — upgrade to add more teammates'
2037: 	2. Pricing Psychology Applied
2038: * Growth plan is the visually anchored 'Most Popular' tier on Pricing — priced to be the natural landing point for the Secondary Persona (SaaS founder/growth marketer) while remaining within reach of a successful blogger.
2039: * Annual billing shows the saved amount in currency, not just a percentage (per the Conversion Strategy's pricing-psychology guidance), since concrete numbers convert better than abstract percentages for this audience.
2040: * Free plan is never time-limited — it is a permanent tier, not a trial — which removes the 'countdown anxiety' objection while still creating natural expansion pressure purely through subscriber-volume growth, a more honest and durable growth lever than an artificial trial expiry.
2041: 3. Expansion Revenue Beyond Plan Tier
2042: * Add-on AI credit packs (purchasable beyond the monthly plan allotment) for accounts that are otherwise well-served by their current tier but have an unusually AI-heavy workflow — avoids forcing a full tier upgrade for a single dimension of usage.
2043: * Additional team seats sellable individually beyond the plan's included count, rather than requiring a full tier jump for agencies that need just one or two extra logins.
2044: * Future roadmap: a verified-sender add-on (custom domain for notification click-through links) for brand-conscious e-commerce and SaaS customers.
2045: 4. Retention-Linked Monetization
2046: The cancellation flow (Billing & Subscription screen) always presents a retention offer before completing a cancellation — informed by the specific stated reason captured in a short, required cancellation-reason field, so the offer is relevant (e.g., a temporary discount for 'too expensive' vs. a feature-walkthrough offer for 'didn't see value') rather than a generic blanket discount.
2047: Deployment Architecture
2048: Step-by-step execution detail is in the AI Coding Prompt Package's Deployment Prompt. This document covers the environment topology and release process.
2049: 1. Environment Topology
2050: Environment
2051: 	Purpose
2052: 	Infrastructure
2053: 	Local Development
2054: 	Engineer workstations
2055: 	Local Next.js dev server; D1 local emulation via Wrangler; Firebase Auth emulator suite for offline-safe auth testing
2056: 	Preview
2057: 	Per-pull-request review and QA
2058: 	Automatic Vercel preview deployment per PR, pointed at a shared staging D1 database and Firebase project's test mode
2059: 	Production
2060: 	Live customer traffic
2061: 	Vercel production deployment, production D1 database, production Firebase project, production R2 bucket, live Razorpay keys
2062: 	2. Release Process
2063: 1. Feature branches open a PR against main; CI runs lint, typecheck, and the test suite automatically.
2064: 2. A Vercel preview deployment is generated per PR for visual/manual QA against the staging database.
2065: 3. On merge to main, the full test suite re-runs and, on success, deploys directly to production (continuous deployment) — chosen over a separate staging-promotion gate because the small initial team needs fast iteration speed more than a heavyweight release process at this stage.
2066: 4. Database migrations run as a distinct CI step before the application deployment completes, ensuring schema changes land before the code that depends on them goes live.
2067: 5. Post-deploy smoke test (automated) hits a small set of critical-path endpoints (auth, dashboard summary, campaign send dry-run) and pages the on-call engineer on failure.
2068: 3. Rollback Strategy
2069: Vercel's instant-rollback-to-previous-deployment capability is the primary rollback mechanism for application-code issues. Database migrations are written to be backward-compatible for at least one release cycle (additive changes deployed ahead of the code that depends on them, destructive changes deployed only after the dependent code has been live and stable) so an application rollback never leaves the database in an incompatible state.
2070: 4. Monitoring & Observability Stack
2071: Tool
2072: 	Purpose
2073: 	Sentry
2074: 	Error tracking with source maps, covering both client-side React errors and server-side API route exceptions
2075: 	Vercel Analytics
2076: 	Real-user Core Web Vitals monitoring against the LCP/CLS/INP targets defined in the TRD
2077: 	Internal Delivery Monitoring (custom)
2078: 	FCM delivery success rate, queue depth, and API latency — purpose-built since no generic APM tool natively understands push-delivery-specific health signals
2079: 	Uptime monitoring (e.g., BetterStack/UptimeRobot)
2080: 	External synthetic checks against the marketing site and a lightweight authenticated API health endpoint
2081: 	Scalability Blueprint
2082: 1. Scaling Dimensions Specific to This Product
2083: Dimension
2084: 	What Drives Growth
2085: 	Scaling Approach
2086: 	Subscriber volume per site
2087: 	Successful publisher/store growth
2088: 	subscribers table is indexed and queried strictly per-site; large-site CSV export and segment-count operations run as async jobs rather than blocking requests, so a single very large site cannot degrade response times for other tenants
2089: 	Campaign send fan-out
2090: 	Number and frequency of campaigns sent across all tenants
2091: 	Delivery is batched and queued via the Cron worker rather than sent synchronously on the send-button click — a campaign to 200,000 subscribers and a campaign to 200 subscribers both return an immediate 'queued' response to the UI
2092: 	Tenant count (workspaces/sites)
2093: 	Signup growth
2094: 	Cloudflare D1's edge-replication model keeps read latency low globally as tenant count grows, without requiring manual read-replica provisioning at this stage
2095: 	Automation run volume
2096: 	Active automations × enrolled subscribers
2097: 	automation_runs is indexed on (status, next_action_at) specifically so the Cron worker's per-tick query stays a fast indexed scan regardless of total historical run count
2098: 	2. Known Scaling Ceilings & Trigger Points for Re-architecture
2099: * D1 database/table size: monitor against Cloudflare's documented D1 limits; the trigger point for introducing per-large-tenant database sharding (one D1 database per very-high-volume site) is when any single site's subscribers table approaches a meaningful fraction of D1's per-database size ceiling — flagged as an Open Question in the TRD pending a load-test validation pass.
2100: * campaign_deliveries table growth: the 90-day retention/pruning policy (see Backend Schema) is the primary control; if analytics-retention requirements grow beyond 90 days, the next step is rolling older records into a compressed, R2-stored archive rather than keeping them in D1 indefinitely.
2101: * Vercel serverless function concurrency: monitor function invocation/duration metrics; the AI endpoints (LLM-call-bound, higher latency) are the most likely first bottleneck and are already isolated into their own route group so they can be moved to a dedicated longer-timeout configuration without affecting the rest of the API.
2102: 3. Horizontal Scaling Readiness
2103: Because the application layer is entirely stateless serverless functions (no in-process session state, no sticky-session requirements), horizontal scaling of compute is handled automatically by Vercel's platform with no architectural changes required as request volume grows. The primary engineering investment as the product scales is therefore concentrated in the data layer (D1 partitioning strategy) and the delivery pipeline (FCM batch-send throughput), not in the request-handling layer.
2104: 4. Multi-Region Considerations
2105: Cloudflare's edge network already serves R2 assets and D1 reads close to the requesting user globally without additional configuration, which is a meaningful advantage for the platform's stated US/UK/Canada/Australia secondary markets alongside its India-primary base. Write-heavy paths (campaign sends, subscriber ingestion) remain centralized through D1's primary-write-location model for V1; multi-region write distribution is not required at the current target scale and is deferred as a post-Series-A consideration.
2106: AI Integration Blueprint
2107: Prontly Notify's primary competitive differentiation is AI woven directly into the campaign workflow, not bolted on as a separate 'AI chat' surface. This document specifies the six AI features end-to-end.
2108: 1. AI Feature Specification
2109: Feature
2110: 	Input
2111: 	Output
2112: 	Where Surfaced
2113: 	AI Notification Title Generator
2114: 	Campaign body draft + site category/context
2115: 	3 alternative titles, each ≤65 characters
2116: 	Campaign Builder (Compose step, inline 'AI-suggest' button)
2117: 	AI Click-Through Optimization
2118: 	An existing draft title/body the user has already written
2119: 	A rewritten version optimized for predicted CTR, with a brief rationale
2120: 	Campaign Builder, AI Tools Hub
2121: 	AI Notification Scheduling Suggestions
2122: 	Site's historical delivery/click timestamps
2123: 	A recommended send-time window with a confidence indicator
2124: 	Campaign Builder (Schedule step)
2125: 	AI Campaign Recommendations
2126: 	Recent campaign performance history + current segment list
2127: 	A suggested next campaign concept (topic, audience, timing)
2128: 	AI Tools Hub, Dashboard Home insight card
2129: 	AI Subscriber Segmentation Suggestions
2130: 	Aggregate subscriber attribute/behavior distribution for the site
2131: 	1–3 candidate segment definitions (e.g., 'Highly Engaged', 'At Risk of Churning') with rule_json pre-filled
2132: 	Segments screen
2133: 	AI Analytics Summaries
2134: 	Pre-aggregated performance metrics for the selected date range
2135: 	2–3 sentence plain-language narrative summary
2136: 	Analytics screen
2137: 	2. AI Credit Metering
2138: Every plan tier includes a monthly AI credit allotment (see Business Model Blueprint). Usage is recorded to the ai_usage table per workspace/month/feature and surfaced via the AI Tools Hub usage meter and the GET /api/v1/ai/usage endpoint. When credits are exhausted, the manual (non-AI) workflow for every feature remains fully usable — AI is additive, never a hard gate on core functionality, consistent with the 'AI is a suggestion, never a black box' design principle from the UI/UX Brief.
2139: 3. Prompt & Data Handling Principles
2140: * All LLM calls are server-side only; the API key is never exposed to the client bundle.
2141: * No raw subscriber PII (names, tokens, individual attribute values) is ever sent to the LLM provider — only aggregate counts, anonymized distributions, and the campaign draft text the user is actively composing.
2142: * Every AI output is clearly badged in the UI (a consistent visual accent) and shown alongside the human-editable original, never auto-applied without an explicit accept action.
2143: * AI outputs are not used as the sole basis for an automated send — a human always confirms the final Send action in Campaign Builder, even when every field was AI-suggested.
2144: 4. Failure & Degradation Handling
2145: If the LLM provider is unavailable or a request times out, the relevant UI surface (AI-suggest button, AI summary card) shows a clear retry state rather than a silent failure or a generic error, and the rest of the screen's manual workflow remains fully interactive throughout — see AI Tools Hub and Campaign Builder specifications in the Screen-wise AI Coding Prompts.
2146: Design System Blueprint
2147: This section is written as a complete, copy-paste-ready AI coding prompt — feed it directly to Claude Code, Cursor, or Windsurf to scaffold the entire design system in one pass. It implements the Modern SaaS + Glassmorphism + Dark Premium direction specified for Prontly Notify, referencing OneSignal, Stripe, Linear, Vercel, Notion, and Clerk.
2148: Header
2149: DESIGN SYSTEM BLUEPRINT PROMPT
2150:  
2151: Build the complete design system for Prontly Notify.
2152: Design Style: Modern SaaS + Glassmorphism + Dark Premium
2153: Website Category: SaaS — Push Notification / Customer Engagement Platform
2154: Framework: Next.js 15 + TypeScript + Tailwind CSS
2155: 	1. Color System
2156: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2157: 1. COLOR SYSTEM
2158: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2159:  
2160: Implement as CSS custom properties AND Tailwind config extensions.
2161:  
2162: Primary Palette (single-hue blue ramp):
2163:   --color-primary-50:  #EFF6FF   /* Lightest tint — rarely used on dark UI */
2164:   --color-primary-100: #DBEAFE
2165:   --color-primary-200: #BFDBFE
2166:   --color-primary-300: #93C5FD   /* Accent — AI badges, highlights */
2167:   --color-primary-400: #60A5FA   /* Secondary — links, secondary buttons */
2168:   --color-primary-500: #3B82F6   /* Primary brand color — CTAs, focus rings */
2169:   --color-primary-600: #2563EB   /* Hover state on primary buttons */
2170:   --color-primary-700: #1D4ED8   /* Active/pressed state */
2171:   --color-primary-800: #1E40AF
2172:   --color-primary-900: #1E3A8A   /* Darkest shade — rarely used directly */
2173:  
2174: Semantic Colors:
2175:   --color-success:     #22C55E   /* Delivered, active, success toasts */
2176:   --color-warning:     #F59E0B   /* Near plan limits, pending states */
2177:   --color-error:       #EF4444   /* Failed sends, destructive actions */
2178:   --color-info:        #3B82F6   /* Info callouts — reuses primary-500 */
2179:  
2180: Neutral Palette (Dark Premium base):
2181:   --color-background:    #0F172A   /* Page background */
2182:   --color-surface:       #111827   /* Card / panel background */
2183:   --color-surface-glass: rgba(17, 24, 39, 0.6)  /* Glassmorphic panels — pair with backdrop-blur-xl */
2184:   --color-border:        rgba(255, 255, 255, 0.08)  /* Default hairline borders on dark surfaces */
2185:   --color-border-strong: rgba(255, 255, 255, 0.16)  /* Hover/focus border emphasis */
2186:   --color-text-primary:   #F8FAFC
2187:   --color-text-secondary: #94A3B8
2188:   --color-text-muted:     #64748B
2189:   --color-text-inverse:   #0F172A   /* Dark text for use on light/colored fills */
2190:  
2191: Color Psychology Note: A single-hue blue ramp (which doubles as the exact Tailwind
2192: 'blue' palette) was chosen because blue reads as trustworthy and technical across
2193: every target persona — from solo bloggers to SaaS founders — without the alert-fatigue
2194: risk a warmer, more 'energetic' palette would introduce for a notifications product.
2195: Restricting the system to one hue family (plus strictly functional semantic colors)
2196: keeps a dense, data-heavy dashboard calm instead of visually noisy.
2197: 	2. Typography System
2198: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2199: 2. TYPOGRAPHY SYSTEM
2200: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2201:  
2202: Font Pairing: Sora (display/headings) + Inter (body/data)
2203: Source: Google Fonts — import via next/font/google for zero layout shift
2204: Rationale: Sora's geometric, slightly technical character matches the brand feeling
2205: (trustworthy, premium, modern, technical) for headlines and hero copy; Inter remains
2206: the most legible sans-serif at small sizes, critical for the number-dense dashboard,
2207: data tables, and chart labels where Sora's personality would hurt readability.
2208:  
2209: Type Scale:
2210:   display-2xl: 64px/72px, weight 700   /* Hero headlines (marketing only) */
2211:   display-xl:  48px/56px, weight 700   /* Section heroes */
2212:   display-lg:  36px/44px, weight 700   /* Page titles */
2213:   h1:  30px/38px, weight 700
2214:   h2:  24px/32px, weight 600
2215:   h3:  20px/28px, weight 600
2216:   h4:  16px/24px, weight 600
2217:   body-lg: 18px/28px, weight 400       /* Lead paragraphs */
2218:   body:    14px/22px, weight 400        /* Default body, table cells */
2219:   body-sm: 13px/20px, weight 400        /* Compact text, helper copy */
2220:   label:   13px/18px, weight 500        /* Form labels */
2221:   caption: 12px/16px, weight 400        /* Captions, metadata, timestamps */
2222:   xs:      11px/14px, weight 500        /* Badges, fine print, status pills */
2223: 	3–5. Spacing, Radius, Shadow Systems
2224: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2225: 3. SPACING SYSTEM
2226: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2227: Base unit: 4px
2228: Scale: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px,
2229:        10=40px, 12=48px, 16=64px, 20=80px, 24=96px, 32=128px
2230:  
2231: Section Padding (vertical): 64px mobile / 128px desktop
2232: Container max-width: 1280px (1440px for the dashboard's wide-table views)
2233: Grid gap: 24px (16px mobile)
2234: Card padding: 24px (16px mobile, 20px on dense data-table-adjacent cards)
2235:  
2236: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2237: 4. BORDER RADIUS SYSTEM
2238: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2239:   --radius-none: 0
2240:   --radius-sm:   4px    /* Tags, small chips, badges */
2241:   --radius-md:   8px    /* Inputs, buttons */
2242:   --radius-lg:   12px   /* Cards, modals */
2243:   --radius-xl:   16px   /* Featured cards, hero panels */
2244:   --radius-2xl:  24px   /* Glassmorphic hero sections, large panels */
2245:   --radius-full: 9999px /* Avatars, pills, status badges */
2246:  
2247: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2248: 5. SHADOW SYSTEM (dark-UI adapted)
2249: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2250: On dark backgrounds, elevation is communicated primarily via --color-border-strong
2251: and surface-color contrast; shadows are a secondary, subtle cue only.
2252:   --shadow-xs:  0 1px 2px rgba(0,0,0,0.30)
2253:   --shadow-sm:  0 1px 3px rgba(0,0,0,0.35)         /* Default cards */
2254:   --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.35)   /* Elevated cards */
2255:   --shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.40) /* Modals, dropdowns */
2256:   --shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.45) /* Popovers */
2257:   --shadow-glow-primary: 0 0 24px rgba(59,130,246,0.35)  /* Featured pricing card, AI badges */
2258: 	6. Component Library
2259: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2260: 6. COMPONENT LIBRARY
2261: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2262: Implement all components with full variant + state coverage.
2263:  
2264: Buttons:
2265:   Variants: Primary (filled primary-500) | Secondary (filled surface, border) |
2266:             Outline | Ghost | Destructive (filled error) | Link | Icon-only
2267:   Sizes: SM (h-8) | MD (h-10) | LG (h-12) | XL (h-14)
2268:   States: Default | Hover (primary-600) | Active (primary-700) | Focus-visible
2269:           (2px primary-400 ring) | Disabled (40% opacity) | Loading (spinner, label hidden)
2270:  
2271: Inputs:
2272:   Variants: Text | Email | Password (show/hide toggle) | Number | Textarea |
2273:             Select | Multi-select | Checkbox | Radio | Toggle | Date | File upload
2274:   States: Default | Focus (primary-400 ring) | Error (error-colored border + message) |
2275:           Success | Disabled | Read-only
2276:  
2277: Cards:
2278:   Variants: Default (surface bg, border) | Glass (surface-glass + backdrop-blur-xl,
2279:             used for hero panels, modals, AI suggestion cards) | Elevated | Interactive
2280:             (hover: border-strong + 2px lift) | Featured (primary glow border, pricing)
2281:   States: Default | Hover | Selected | Loading (skeleton)
2282:  
2283: Navigation:
2284:   Desktop: Persistent left sidebar (260px), icon + label, active-state primary-500
2285:            left border accent. Top bar with website switcher + avatar menu.
2286:   Mobile: Bottom tab bar (5 items) + slide-out drawer for overflow items.
2287:   Supporting: Breadcrumbs | Tabs (underline style) | Pagination | Steps indicator
2288:  
2289: Domain-Specific Components:
2290:   Notification Live Preview — renders Chrome/Edge/Firefox-accurate push mockups
2291:   AI Suggestion Card — primary-300 left border accent + 'AI' badge, always shows
2292:     an 'Accept' and 'Edit manually' action pair, never auto-applies
2293:   Segment Rule Builder Row — attribute/operator/value selects + AND/OR toggle
2294:   Automation Flow Node — Trigger/Wait/Send/Condition variants on the flow canvas
2295:   Usage Meter — progress bar + numeric label, warning color at 80%, error at 100%
2296:  
2297: Feedback Components:
2298:   Toast: Success | Warning | Error | Info — auto-dismiss 4s, manual close button
2299:   Alert: Inline, icon + optional action, never color-only
2300:   Modal: SM/MD/LG/XL — glass backdrop blur, close on Escape, focus trap
2301:   Tooltip: On hover/focus, 200ms delay, configurable placement
2302:   Skeleton: Dedicated shape per content type (KPI card, table row, chart)
2303: 	7–9. Icons, Animation, Grid
2304: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2305: 7. ICON SYSTEM
2306: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2307: Library: Lucide React
2308: Sizes: 16px (inline/table) | 20px (default UI) | 24px (prominent/nav) | 32px (feature icons)
2309: Style rule: outline by default; filled/solid only for active navigation state and
2310: status indicators where fill communicates 'currently selected'
2311:  
2312: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2313: 8. ANIMATION SYSTEM
2314: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2315: Motion Philosophy: purposeful and subtle — motion confirms an action registered,
2316: it never decorates. Respect prefers-reduced-motion: Always.
2317:  
2318: Duration Scale:
2319:   --duration-instant: 0ms     /* No animation — immediate feedback */
2320:   --duration-fast:    100ms   /* Hover states, micro-interactions */
2321:   --duration-normal:  200ms   /* Toggles, dropdowns, tooltips */
2322:   --duration-slow:    300ms   /* Modals, page transitions */
2323:   --duration-slower:  500ms   /* Complex reveals, scroll animations */
2324:  
2325: Easing:
2326:   --ease-in:      cubic-bezier(0.4, 0, 1, 1)    /* Elements leaving */
2327:   --ease-out:     cubic-bezier(0, 0, 0.2, 1)    /* Elements entering */
2328:   --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1)  /* Interactive transitions */
2329:   --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1) /* Success confetti, onboarding only */
2330:  
2331: Scroll Animations: Intersection Observer, fade-up on enter viewport — marketing
2332: site only. Stagger delay for grid items: 50ms per item. Never used in the dashboard.
2333:  
2334: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2335: 9. GRID SYSTEM
2336: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2337: Mobile  (< 768px):  4 columns, 16px gutter, 16px margin
2338: Tablet  (768–1024px): 8 columns, 24px gutter, 24px margin
2339: Desktop (> 1024px): 12 columns, 32px gutter, 32px+ margin
2340: Max container: 1280px (1440px for dashboard wide-table views)
2341: 	Screen-by-Screen Wireframe Plan
2342: Every screen below follows the same eleven-point wireframe specification. This is the visual/conversion-design view of each screen; the functional build specification (state, API calls) for the same screens is in Section 23's Screen-wise AI Coding Prompts — read both together when implementing a screen.
2343: Public Pages
2344: Home / Landing Page  —  /
2345: Conversion Goal: Maximize click-through to Signup or Pricing.
2346: User Journey Context: Arrives from organic search, paid ads, or referral → explores hero/features/pricing → clicks Start Free → Signup screen.
2347: Mobile Layout (375px): 
2348: 1. Sticky header: logo left, hamburger right
2349: 2. Hero: headline + subheadline stacked, single primary CTA full-width, live notification-preview mockup below
2350: 3. Trust bar: 'Trusted by 2,000+ websites' + 4 partner logos in a horizontal scroll strip
2351: 4. How it works: 3 numbered steps stacked vertically with icon + 1-line copy
2352: 5. Feature grid: 2-column icon cards (Campaigns, Automation, AI, Analytics, Segmentation, Multi-site)
2353: 6. Live demo widget: tappable 'See a sample push' button that triggers a real browser permission demo
2354: 7. Pricing teaser: 3 plan cards stacked, 'View full pricing' link
2355: 8. Testimonial carousel: 1 card visible, swipe
2356: 9. Integration logos: WordPress, Shopify, Webflow, custom HTML grid
2357: 10. FAQ accordion (5 items)
2358: 11. Final CTA band: full-width gradient, 'Start free' button
2359: 12. Footer: stacked link columns, app store-style badges omitted (web-only)
2360: Tablet Adaptation (768px): Feature grid becomes 3-column; hero mockup moves beside headline in a 2-column split at 768px; testimonials show 2 cards side by side.
2361: Desktop Layout (1280px+): Full-width hero with headline+CTA on the left (55%) and an animated glassmorphic notification-stack mockup on the right (45%); sticky nav with dropdown for Product/Solutions/Pricing/Docs; feature grid becomes 3x2; pricing teaser becomes 3 cards side-by-side with center plan elevated; testimonial carousel becomes a 3-card row.
2362: Key Components: Navbar (transparent-to-solid on scroll); Hero mockup (animated SVG push notification stack); Logo marquee; Feature card (icon, title, 1-line desc); Pricing card (default/featured); Testimonial card (avatar, quote, company); FAQ accordion item; Sticky mobile CTA bar
2363: CTA Strategy: Primary: 'Start Free — No Card Required' (primary blue, hero + sticky mobile bar + final band). Secondary: 'Watch 90-sec demo' (ghost, beside primary in hero).
2364: Social Proof Placement: Logo marquee of recognizable site categories, a live subscriber-count stat, and a rotating testimonial carousel directly beneath the hero.
2365: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2366: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2367: 
2368: 
2369: Pricing  —  /pricing
2370: Conversion Goal: Maximize plan selection → Signup conversion.
2371: User Journey Context: Arrives from nav, home pricing teaser, or in-app upgrade prompt → selects plan → Signup (with plan pre-selected in query param) or in-app Billing screen if already authenticated.
2372: Mobile Layout (375px): 
2373: 1. Header
2374: 2. Page title + monthly/annual toggle (full-width segmented control)
2375: 3. Plan cards stacked vertically, 'Most Popular' badge on Growth
2376: 4. Feature comparison: collapsible accordion per plan instead of a wide table
2377: 5. FAQ block (billing, cancellation, data export)
2378: 6. Final CTA band
2379: 7. Footer
2380: Tablet Adaptation (768px): Plan cards become a horizontal 2-column grid (3rd plan wraps below); comparison table becomes a real scrollable table.
2381: Desktop Layout (1280px+): 3 (or 4, including Enterprise) plan cards side-by-side, center/featured plan visually elevated with border glow; full feature-comparison table below with sticky first column; annual/monthly toggle shows 'Save 20%' badge.
2382: Key Components: Segmented toggle (monthly/annual); Pricing card (featured variant); Comparison table; FAQ accordion; Enterprise contact card (ghost style)
2383: CTA Strategy: Primary: 'Start Free' per card. Secondary: 'Talk to Sales' on Enterprise card. Micro: 'See full feature list' anchor.
2384: Social Proof Placement: A single-line trust statement near the plan cards (e.g., subscriber/site totals across the platform) and the Enterprise card citing agency/team use cases.
2385: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2386: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2387: 
2388: 
2389: Integrations & Docs Hub  —  /docs
2390: Conversion Goal: Build trust and move the visitor one step closer to Signup.
2391: User Journey Context: Arrives from search engine landing on a specific doc page, or from in-app Integration/SDK Setup screen → copies snippet → returns to own site to implement → returns to dashboard to verify.
2392: Mobile Layout (375px): 
2393: 1. Header
2394: 2. Search bar for docs (full-width)
2395: 3. Platform grid: WordPress, Shopify, Webflow, Wix, Custom HTML/JS, REST API — 2-column icon tiles
2396: 4. Quick-start code block (copyable) for the selected platform
2397: 5. Related articles list
2398: 6. Footer
2399: Tablet Adaptation (768px): Platform grid becomes 3-column; sidebar nav for doc categories appears.
2400: Desktop Layout (1280px+): Left sidebar: full doc navigation tree (Getting Started, SDK, REST API, Webhooks, Segments API). Center: article content with syntax-highlighted code blocks and copy buttons. Right rail: 'On this page' anchor nav.
2401: Key Components: Doc sidebar nav; Code block with copy button + language tabs; Search-as-you-type doc search; Platform tile; Breadcrumb
2402: CTA Strategy: Primary: 'Copy install code'. Secondary: 'Start Free' persistent in header.
2403: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2404: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2405: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2406: 
2407: 
2408: Blog Listing  —  /blog
2409: Conversion Goal: Maximize click-through on contextual in-article CTAs toward Signup/Pricing.
2410: User Journey Context: Arrives from organic search or internal link → reads listing → opens Blog Detail → CTA inside article drives to Signup or Pricing.
2411: Mobile Layout (375px): 
2412: 1. Header
2413: 2. Featured post card (large image + title)
2414: 3. Category filter chips (horizontal scroll)
2415: 4. Post card list, single column
2416: 5. Newsletter capture inline card
2417: 6. Pagination
2418: 7. Footer
2419: Tablet Adaptation (768px): Post grid becomes 2-column.
2420: Desktop Layout (1280px+): Post grid becomes 3-column with featured post spanning 2 columns at top; sidebar with category list, popular posts, and newsletter signup.
2421: Key Components: Post card (image, category tag, title, excerpt, read time); Category filter chip; Newsletter inline form; Pagination / load-more
2422: CTA Strategy: Primary: 'Read article' (card click). Secondary: 'Subscribe to newsletter'.
2423: Social Proof Placement: Author credibility (name, role) on every post; related-post social proof via view/read-time metadata.
2424: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2425: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2426: 
2427: 
2428: Blog Detail  —  /blog/[slug]
2429: Conversion Goal: Maximize click-through on contextual in-article CTAs toward Signup/Pricing.
2430: User Journey Context: Arrives from search → reads → clicks inline CTA → Signup or Pricing; or browses Related Posts to stay in the funnel.
2431: Mobile Layout (375px): 
2432: 1. Header
2433: 2. Title + author/date/read-time meta
2434: 3. Hero image
2435: 4. Article body, single column, generous line-height
2436: 5. Inline CTA card after intro paragraph
2437: 6. Share buttons (sticky bottom bar)
2438: 7. Author bio card
2439: 8. Related posts (2 cards)
2440: 9. Comments (optional)
2441: 10. Footer
2442: Tablet Adaptation (768px): Share buttons move to a left-side sticky rail; related posts become 3-card row.
2443: Desktop Layout (1280px+): Center article column (max 720px) with left sticky share rail and right sticky 'Table of contents' + CTA card rail.
2444: Key Components: Article renderer (MDX); Inline CTA card; Share button group; Author bio card; Related post card; Table of contents (auto-generated from headings)
2445: CTA Strategy: Primary: contextual inline CTA tied to article topic (e.g., 'Try AI campaign suggestions free'). Secondary: footer newsletter capture.
2446: Social Proof Placement: Author credibility (name, role) on every post; related-post social proof via view/read-time metadata.
2447: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2448: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2449: 
2450: 
2451: About  —  /about
2452: Conversion Goal: Build trust and move the visitor one step closer to Signup.
2453: User Journey Context: Arrives from footer link or direct navigation → builds trust → returns to Pricing or Signup.
2454: Mobile Layout (375px): 
2455: 1. Header
2456: 2. Mission statement hero
2457: 3. Stats strip (sites served, notifications sent, countries)
2458: 4. Team grid (photo, name, role) 2-column
2459: 5. Timeline/milestones stacked
2460: 6. CTA band
2461: 7. Footer
2462: Tablet Adaptation (768px): Team grid becomes 3-column.
2463: Desktop Layout (1280px+): Team grid becomes 4-column; timeline becomes a horizontal stepper.
2464: Key Components: Stat counter (animates on scroll into view); Team member card; Timeline step
2465: CTA Strategy: Primary: 'Start Free'. Secondary: 'View open roles' (if careers page exists).
2466: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2467: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2468: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2469: 
2470: 
2471: Contact  —  /contact
2472: Conversion Goal: Build trust and move the visitor one step closer to Signup.
2473: User Journey Context: Arrives from footer/nav or pricing 'Talk to Sales' → submits form → sees success state → optionally returns to Pricing.
2474: Mobile Layout (375px): 
2475: 1. Header
2476: 2. Page title + short intro
2477: 3. Contact form: name, email, company, message, reason dropdown — single column, full-width fields
2478: 4. Alternative contact: support email, live chat trigger
2479: 5. Footer
2480: Tablet Adaptation (768px): Form and 'alternative contact' info appear side-by-side (60/40 split).
2481: Desktop Layout (1280px+): Two-column layout: form on left (60%), company info / map-free address block / response-time expectation card on right (40%).
2482: Key Components: Form input (text/email/select/textarea) with inline validation; Submit button with loading state; Toast on success/error
2483: CTA Strategy: Primary: 'Send Message'. Secondary: 'Chat with us now' (opens chat widget).
2484: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2485: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2486: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2487: 
2488: 
2489: FAQ  —  /faq
2490: Conversion Goal: Build trust and move the visitor one step closer to Signup.
2491: User Journey Context: Arrives from footer, support widget link, or direct search-engine deep link to a specific question → resolves doubt → continues to Signup/Pricing or exits satisfied.
2492: Mobile Layout (375px): 
2493: 1. Header
2494: 2. Search-within-FAQ input
2495: 3. Category tabs (Billing, Technical, Privacy, General) horizontal scroll
2496: 4. Accordion list filtered by category
2497: 5. 'Still have questions?' CTA to Contact
2498: 6. Footer
2499: Tablet Adaptation (768px): Category tabs become a fixed horizontal row, no scroll needed.
2500: Desktop Layout (1280px+): Left sidebar category list; right content area with accordion; search bar pinned at top of content area.
2501: Key Components: FAQ accordion item (single-open or multi-open); Category tab/sidebar item; Inline search with highlight match
2502: CTA Strategy: Primary: 'Contact Support' band at bottom.
2503: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2504: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2505: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2506: 
2507: 
2508: Legal Pages (Privacy / Terms / Cookies / Refund)  —  /privacy, /terms, /cookies, /refund-policy
2509: Conversion Goal: Build trust and move the visitor one step closer to Signup.
2510: User Journey Context: Arrives from footer link or during signup ('By signing up you agree to...') → reads relevant section via anchor link → returns to prior flow.
2511: Mobile Layout (375px): 
2512: 1. Header
2513: 2. Document title + 'Last updated' date
2514: 3. Table of contents (collapsible)
2515: 4. Long-form legal text, single column, readable line length
2516: 5. Footer
2517: Tablet Adaptation (768px): Table of contents becomes a sticky left rail.
2518: Desktop Layout (1280px+): Sticky left TOC rail (25%) + content column (75%) with anchor-linked sections.
2519: Key Components: Sticky TOC; Anchor-linked section heading
2520: CTA Strategy: Micro: 'Contact our DPO' mailto link within Privacy Policy.
2521: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2522: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2523: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2524: 
2525: 
2526: Auth Screens
2527: Login  —  /login
2528: Conversion Goal: Minimize time-to-completion and abandonment for this required step.
2529: User Journey Context: Arrives from expired session redirect, marketing site nav, or direct bookmark → authenticates → Dashboard Home (or onboarding wizard if no website added yet).
2530: Mobile Layout (375px): 
2531: 1. Centered card: logo, 'Welcome back' heading
2532: 2. Email field, password field (show/hide toggle)
2533: 3. 'Forgot password?' link right-aligned under password field
2534: 4. Primary 'Log In' button full-width
2535: 5. Divider 'or continue with'
2536: 6. Google / GitHub OAuth buttons stacked
2537: 7. Footer link: 'New here? Create an account'
2538: Tablet Adaptation (768px): Card width caps at 420px, centered with more surrounding whitespace; no structural change.
2539: Desktop Layout (1280px+): Split screen: left 45% glassmorphic brand panel with rotating product screenshots/testimonial; right 55% centered login card.
2540: Key Components: Auth card; Text input (email); Password input (show/hide); OAuth button (Google/GitHub); Inline error banner
2541: CTA Strategy: Primary: 'Log In'. Secondary: OAuth buttons. Micro: 'Forgot password?' and 'Create an account'.
2542: Social Proof Placement: Desktop split-panel features a rotating testimonial quote alongside a product screenshot, reinforcing trust at the exact decision point without cluttering the form itself.
2543: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2544: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2545: 
2546: 
2547: Signup  —  /signup
2548: Conversion Goal: Minimize time-to-completion and abandonment for this required step.
2549: User Journey Context: Arrives from Home/Pricing CTA or OAuth-first click → account created → Website Onboarding Wizard (never straight to an empty dashboard).
2550: Mobile Layout (375px): 
2551: 1. Centered card: logo, 'Create your free account' heading
2552: 2. Name, email, password fields stacked
2553: 3. Password strength meter inline
2554: 4. Terms checkbox with linked text
2555: 5. Primary 'Create Account' button
2556: 6. OAuth buttons
2557: 7. Footer link: 'Already have an account? Log in'
2558: Tablet Adaptation (768px): Same as Login tablet treatment — capped width, centered.
2559: Desktop Layout (1280px+): Split screen mirroring Login, with right panel highlighting '14-day free trial, no credit card' reassurance copy and a checklist of what they get.
2560: Key Components: Auth card; Password-strength meter; Checkbox with linked terms text; OAuth button
2561: CTA Strategy: Primary: 'Create Account'. Micro: plan-context banner ('You selected the Growth plan') if arriving with a plan query param.
2562: Social Proof Placement: Desktop split-panel features a rotating testimonial quote alongside a product screenshot, reinforcing trust at the exact decision point without cluttering the form itself.
2563: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2564: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2565: 
2566: 
2567: Forgot Password  —  /forgot-password
2568: Conversion Goal: Minimize time-to-completion and abandonment for this required step.
2569: User Journey Context: Arrives from Login 'Forgot password?' link → submits email → sees confirmation → checks email → Reset Password (via Firebase-hosted or custom page) → Login.
2570: Mobile Layout (375px): 
2571: 1. Centered card
2572: 2. Heading + short instructional copy
2573: 3. Email field
2574: 4. 'Send Reset Link' button
2575: 5. Success state replaces form with confirmation message + 'resend' link
2576: 6. Back to login link
2577: Tablet Adaptation (768px): No structural change beyond card max-width.
2578: Desktop Layout (1280px+): Centered card only (no split brand panel — keep this screen minimal and fast).
2579: Key Components: Auth card; Text input (email); Success confirmation state
2580: CTA Strategy: Primary: 'Send Reset Link'. Micro: 'Back to login'.
2581: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2582: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2583: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2584: 
2585: 
2586: Email Verification  —  /verify-email
2587: Conversion Goal: Minimize time-to-completion and abandonment for this required step.
2588: User Journey Context: Arrives immediately after Signup → confirms via emailed link in a new tab → original tab auto-detects and redirects to Website Onboarding Wizard.
2589: Mobile Layout (375px): 
2590: 1. Centered card: illustration, 'Verify your email' heading
2591: 2. Instructional copy with masked email shown
2592: 3. 'Resend email' button with 60-second cooldown
2593: 4. 'Change email' link
2594: 5. Auto-detect: page polls verification status and auto-redirects once confirmed
2595: Tablet Adaptation (768px): No structural change.
2596: Desktop Layout (1280px+): Centered card only.
2597: Key Components: Cooldown button (disabled state with countdown); Status poller (invisible, background)
2598: CTA Strategy: Primary: 'Resend Verification Email'. Micro: 'Change email address'.
2599: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2600: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2601: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2602: 
2603: 
2604: Website Onboarding Wizard  —  /onboarding
2605: Conversion Goal: Minimize time-to-completion and abandonment for this required step.
2606: User Journey Context: Arrives immediately after email verification or signup (existing accounts re-enter here when adding an additional website) → completes 3 steps → Dashboard Home with the new website pre-selected.
2607: Mobile Layout (375px): 
2608: 1. Step indicator (1 of 3) at top
2609: 2. Step 1: Website URL + name + category dropdown, full-width fields, 'Next' button
2610: 3. Step 2: Platform selection (WordPress/Shopify/Custom) as large tappable cards stacked
2611: 4. Step 3: Code snippet with copy button + 'I've added it' confirm button that pings a verification endpoint
2612: 5. Success state: confetti micro-animation + 'Go to Dashboard' CTA
2613: Tablet Adaptation (768px): Platform selection cards become a 2-column grid.
2614: Desktop Layout (1280px+): Centered wizard card (max 640px) with step indicator as a horizontal progress bar with labeled steps; platform cards become a 3-column row.
2615: Key Components: Step progress indicator; Platform selection card; Code snippet block with copy + verify button; Verification status badge (pending/live); Success state animation
2616: CTA Strategy: Primary per step: 'Next' / 'Verify Installation' / 'Go to Dashboard'. Micro: 'Skip for now, I'll add this later' (still lands user in an empty-state dashboard with a persistent setup banner).
2617: Social Proof Placement: 'Join 2,000+ websites already using Prontly Notify' micro-copy beneath the step indicator.
2618: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2619: Empty/Error State Design: Not applicable — content is always present on these screens by definition.
2620: 
2621: 
2622: User Dashboard
2623: Dashboard Home  —  /dashboard
2624: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2625: User Journey Context: Arrives immediately after login or onboarding completion → reviews KPIs → navigates to Campaign Builder, Analytics, or Subscribers based on what needs attention.
2626: Mobile Layout (375px): 
2627: 1. Top bar: website switcher dropdown + notification bell + avatar menu
2628: 2. KPI cards stacked: Total Subscribers, Sends Today, Avg CTR, Active Campaigns — 2x2 grid
2629: 3. Subscriber growth sparkline chart, full width
2630: 4. Recent campaigns list (last 5), card per row
2631: 5. AI insight card: 'AI Analytics Summary' contextual tip
2632: 6. Quick action buttons: 'New Campaign', 'Invite Team Member' — sticky bottom bar
2633: 7. Bottom tab navigation: Home, Subscribers, Campaigns, Analytics, More
2634: Tablet Adaptation (768px): KPI cards become a 4-column row; quick actions move into the top bar instead of a sticky bottom bar.
2635: Desktop Layout (1280px+): Persistent left sidebar nav (Dashboard, Subscribers, Campaigns, Automation, Segments, Analytics, AI Tools, Integration, Team, Billing, Settings). Main content: KPI row (4 cards), 2-column split below — growth chart (left, 65%) + AI insight & recent activity feed (right, 35%) — recent campaigns table beneath.
2636: Key Components: Website switcher dropdown (with 'Add Website' option); KPI stat card (value, delta %, sparkline); Line chart (subscriber growth); Campaign list row (status badge, sent, CTR); AI insight card; Empty state illustration (zero campaigns yet)
2637: CTA Strategy: Primary: 'New Campaign' (sticky/floating). Secondary: 'View All Analytics'. Micro: AI insight card 'Apply this suggestion' link.
2638: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2639: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2640: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2641: 
2642: 
2643: Website Switcher & Add Website  —  /dashboard/sites
2644: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2645: User Journey Context: Arrives from sidebar 'Switch Website' or dashboard top-bar dropdown 'Manage Websites' → selects a site to switch active context, or starts Add Website flow → Onboarding Wizard or Dashboard Home.
2646: Mobile Layout (375px): 
2647: 1. Header with 'Your Websites' title + 'Add Website' button
2648: 2. Search/filter input
2649: 3. Website card list: favicon, name, domain, subscriber count, status badge — stacked
2650: 4. Usage indicator: 'Using 2 of 3 sites on Growth plan' progress bar with upgrade link if near limit
2651: Tablet Adaptation (768px): Website cards become a 2-column grid.
2652: Desktop Layout (1280px+): 3-column card grid; 'Add Website' as a dashed-border ghost card in the grid itself, consistent with the card pattern.
2653: Key Components: Website card (favicon, status, subscriber count, last-active); Add-website ghost card; Usage progress bar with upgrade CTA; Search input
2654: CTA Strategy: Primary: 'Add Website' (re-enters Onboarding Wizard step 1). Secondary: 'Upgrade Plan' (shown only near/at site limit).
2655: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2656: Urgency/Scarcity Elements: Genuine, usage-driven urgency only where a real plan limit is at stake (e.g., 'Using 2 of 3 sites'); no artificial countdowns.
2657: Empty/Error State Design: Should not occur post-onboarding (a site always exists by the time this screen is reachable), but defensively shows the Add Website ghost card alone if it does.
2658: 
2659: 
2660: Subscribers  —  /dashboard/subscribers
2661: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2662: User Journey Context: Arrives from sidebar nav or Dashboard Home KPI card click-through → filters/searches → exports or creates a segment → Segments screen or Campaign Builder (targeting this segment).
2663: Mobile Layout (375px): 
2664: 1. Header: 'Subscribers' + total count badge
2665: 2. Filter chips: All, Active, Unsubscribed, by Segment (horizontal scroll)
2666: 3. Search input
2667: 4. Subscriber list: avatar-less row with browser icon, location, subscribed date, status — stacked cards
2668: 5. Floating 'Export CSV' action
2669: 6. Infinite scroll pagination
2670: Tablet Adaptation (768px): List becomes a denser table with 3 visible columns (Subscriber, Location, Status).
2671: Desktop Layout (1280px+): Full data table: Subscriber ID, Browser/OS icon, Location, Subscribed Date, Last Seen, Segments (tag pills), Status — with column sort, bulk-select checkboxes, and a right-side filter panel (date range, segment, browser, country).
2672: Key Components: Data table with sort + bulk select; Filter chip / filter panel; Status badge (active/unsubscribed); Export button with format choice (CSV); Empty state (zero subscribers — shows install-verification CTA)

(Output capped at 50 KB. Showing lines 2017-2672. Use offset=2673 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.8s)

_Thinking:_

This is an extremely large document. Let me continue reading the rest of it to understand the full scope before building.

**Tool: read**

**Input:**
```json
{
  "offset": 2673,
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt"
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
2673: CTA Strategy: Primary: 'Export CSV'. Secondary: 'Create Segment from Filter'. Micro: per-row 'View Details'.
2674: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2675: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2676: Empty/Error State Design: Illustration + 'No subscribers yet' + a direct link to the Integration screen's install-verification checklist as the primary CTA.
2677: 
2678: 
2679: Campaign Builder (Compose Notification)  —  /dashboard/campaigns/new
2680: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2681: User Journey Context: Arrives from Dashboard 'New Campaign' or Campaigns History 'Duplicate' → completes 4 steps → confirms send → redirected to Campaigns History with the new campaign highlighted, or to Analytics if sent immediately.
2682: Mobile Layout (375px): 
2683: 1. Step tabs: Compose / Target / Schedule / Review (horizontal scroll tabs)
2684: 2. Compose step: title field with AI-suggest button inline, message body field with char counter, icon/image upload, URL field, action-buttons editor (optional)
2685: 3. Live notification preview card pinned above the keyboard area
2686: 4. Target step: audience selector (All Subscribers / Segment picker / AI-suggested segment)
2687: 5. Schedule step: Send Now / Schedule for Later (date-time picker) / AI-suggested optimal time chip
2688: 6. Review step: summary card + estimated reach + 'Send Campaign' button
2689: Tablet Adaptation (768px): Preview card moves to a persistent right-side panel (40%) visible across all steps instead of being inline.
2690: Desktop Layout (1280px+): Two-column layout: left 60% multi-step form (same 4 steps, now as a vertical wizard with all steps visible as collapsible sections rather than tabs), right 40% sticky live preview panel showing the notification exactly as it will render on Chrome/Edge/Firefox with a device toggle.
2691: Key Components: AI-suggest button (title generator, shows 3 alternative titles in a popover); Live notification preview (per-browser rendering); Audience/segment picker with live reach counter; Date-time scheduler with AI-suggested-time chip; Action-button editor (add up to 2 CTA buttons to the push); Send confirmation modal
2692: CTA Strategy: Primary: 'Send Campaign' / 'Schedule Campaign'. Secondary: 'Save as Draft'. Micro: 'Use AI Suggestion' on title and timing.
2693: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2694: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2695: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2696: 
2697: 
2698: Campaigns History  —  /dashboard/campaigns
2699: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2700: User Journey Context: Arrives from sidebar nav or Dashboard Home 'Recent Campaigns' → reviews list → drills into Analytics for a specific campaign, or duplicates into a new Campaign Builder session.
2701: Mobile Layout (375px): 
2702: 1. Header + 'New Campaign' button
2703: 2. Status filter chips: All, Sent, Scheduled, Draft
2704: 3. Campaign card list: title, status badge, sent date, sent count, CTR — stacked
2705: 4. Per-card menu: Duplicate, Edit (if draft/scheduled), Delete, View Analytics
2706: Tablet Adaptation (768px): Cards become a denser 2-column grid for scheduled/draft items; sent campaigns remain a list for chronological scanning.
2707: Desktop Layout (1280px+): Data table: Title, Status, Audience, Sent/Scheduled Date, Delivered, CTR, Conversions — sortable columns, row-level action menu, bulk actions for draft cleanup.
2708: Key Components: Data table / card list (responsive switch); Status badge (sent/scheduled/draft/failed); Row action menu; Empty state (zero campaigns — CTA to Campaign Builder)
2709: CTA Strategy: Primary: 'New Campaign'. Micro: per-row 'View Analytics', 'Duplicate'.
2710: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2711: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2712: Empty/Error State Design: Illustration + 'You haven't sent a campaign yet' + primary CTA straight into Campaign Builder.
2713: 
2714: 
2715: Automation / Drip Builder  —  /dashboard/automation
2716: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2717: User Journey Context: Arrives from sidebar nav or AI Tools Hub recommendation → builds/edits a flow → activates → returns to Automation list to monitor performance via embedded mini-analytics per automation.
2718: Mobile Layout (375px): 
2719: 1. Header: 'Automations' + 'New Automation' button
2720: 2. Automation card list: name, trigger type icon, status toggle (active/paused), steps count
2721: 3. Tap into an automation opens a vertical step-by-step builder: Trigger card → Step 1 (wait/send) → Step 2 → 'Add Step' button
2722: Tablet Adaptation (768px): Automation list becomes a 2-column grid; step builder remains vertical but wider with side padding for readability.
2723: Desktop Layout (1280px+): Left list panel (30%) of all automations; right panel (70%) shows a visual horizontal flow canvas — Trigger node connected by lines to Wait/Send/Condition nodes, each editable in a side drawer on click.
2724: Key Components: Automation list card with active/paused toggle; Flow canvas node (Trigger/Wait/Send/Condition); Node configuration drawer; Trigger type picker (New Subscriber, Tag Added, Page Visited, Inactive N Days, AI-suggested re-engagement trigger)
2725: CTA Strategy: Primary: 'New Automation'. Secondary in builder: 'Activate Automation'. Micro: 'Add Step', AI 'Suggest next best step'.
2726: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2727: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2728: Empty/Error State Design: Illustration + 'Automate your first re-engagement flow' + CTA opening the template gallery (not a blank canvas).
2729: 
2730: 
2731: Segments  —  /dashboard/segments
2732: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2733: User Journey Context: Arrives from sidebar nav, Subscribers 'Create Segment from Filter', or AI insight prompt → defines/accepts a segment → uses it immediately in Campaign Builder or Automation.
2734: Mobile Layout (375px): 
2735: 1. Header + 'New Segment' button
2736: 2. AI-suggested segments banner (carousel of 2-3 cards: 'Highly Engaged Users', 'At Risk of Churning')
2737: 3. Segment list: name, subscriber count, last updated — stacked cards
2738: 4. Tap opens rule builder: condition rows (Attribute / Operator / Value) stacked with 'Add Condition' (AND/OR toggle)
2739: Tablet Adaptation (768px): AI-suggested cards become a 2-up row; segment list becomes a 2-column grid.
2740: Desktop Layout (1280px+): AI-suggested segment cards in a 3-column row at top; segment table below (Name, Count, Type — Manual/AI/Dynamic, Last Updated); rule builder opens as a full-width inline panel rather than a modal for complex conditions.
2741: Key Components: AI-suggested segment card (with 'Accept' / 'Dismiss' actions); Segment data table; Rule builder condition row; Live subscriber-count preview as rules are edited
2742: CTA Strategy: Primary: 'New Segment'. Micro: 'Accept AI Suggestion', 'Use in Campaign' (links directly into Campaign Builder targeting this segment).
2743: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2744: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2745: Empty/Error State Design: Illustration + AI-suggested segments shown immediately even with zero manual segments, so the screen is never purely empty.
2746: 
2747: 
2748: Analytics  —  /dashboard/analytics
2749: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2750: User Journey Context: Arrives from sidebar nav, Dashboard Home 'View All Analytics', or per-campaign 'View Analytics' link (pre-filtered to that campaign) → reviews trends and AI summary → acts on insight by creating a new Segment, Automation, or Campaign.
2751: Mobile Layout (375px): 
2752: 1. Header + date-range selector (7d/30d/90d/custom)
2753: 2. AI Summary card: 2-3 sentence plain-language insight, pinned at top
2754: 3. KPI cards: Subscribers Net Growth, Avg CTR, Total Delivered, Unsubscribe Rate — 2x2 grid
2755: 4. Charts stacked: Growth over time, CTR by campaign (bar), Delivery by browser/OS (donut)
2756: 5. Top campaigns table (sortable by CTR)
2757: Tablet Adaptation (768px): KPI cards become a 4-column row; charts arranged 2-up.
2758: Desktop Layout (1280px+): AI Summary card full-width at top with a 'Regenerate insight' button; KPI row (4 cards); 2-column chart grid below; full sortable/exportable performance table at the bottom with column chooser.
2759: Key Components: AI summary card with regenerate action; Date-range picker; KPI stat card; Line/bar/donut charts (Recharts-based); Sortable performance table; Export-to-CSV button
2760: CTA Strategy: Primary: 'Export Report'. Micro: 'Regenerate AI Summary', per-chart 'View as table' toggle.
2761: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2762: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2763: Empty/Error State Design: Illustration + 'Send your first campaign to see analytics here' with a CTA into Campaign Builder.
2764: 
2765: 
2766: AI Tools Hub  —  /dashboard/ai
2767: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2768: User Journey Context: Arrives from sidebar nav or a contextual 'Powered by AI' badge elsewhere in the app → tries a feature inline or deep-links into Campaign Builder/Segments/Analytics where that AI feature lives natively.
2769: Mobile Layout (375px): 
2770: 1. Header: 'AI Tools' + usage meter ('142 of 500 AI credits used this month')
2771: 2. Feature card grid, single column: AI Title Generator, CTR Optimizer, Smart Scheduling, Campaign Recommendations, Audience Segmentation, Analytics Summaries — each with icon, 1-line description, 'Try it' button
2772: Tablet Adaptation (768px): Feature cards become a 2-column grid.
2773: Desktop Layout (1280px+): Feature cards become a 3-column grid; each card expands inline on click into a quick-use panel (e.g., paste existing title → get optimized alternatives) without leaving the page, in addition to deep links into the full feature within Campaign Builder/Segments/Analytics.
2774: Key Components: AI usage meter (credits or generations remaining); Feature card (icon, description, CTA); Inline quick-use panel per feature; Upgrade prompt card (shown when AI credits are exhausted on the user's plan)
2775: CTA Strategy: Primary per card: 'Try it'. Secondary: 'Upgrade for unlimited AI' (shown contextually near the usage meter when near limit).
2776: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2777: Urgency/Scarcity Elements: Genuine, usage-driven urgency only where a real plan limit is at stake (e.g., 'Using 2 of 3 sites'); no artificial countdowns.
2778: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2779: 
2780: 
2781: Integration / SDK Setup  —  /dashboard/integration
2782: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2783: User Journey Context: Arrives from sidebar nav, onboarding 'Skip for now' banner, or a failed-delivery alert → fixes/verifies install → returns to Dashboard Home or Campaign Builder.
2784: Mobile Layout (375px): 
2785: 1. Header: 'Integration' + install-status badge (Live / Not Detected)
2786: 2. Platform tabs: WordPress, Shopify, Webflow, Custom JS, REST API
2787: 3. Code snippet block with copy button for the active platform
2788: 4. Service-worker file download link
2789: 5. 'Test Installation' button that pings verification + shows real-time result
2790: 6. Troubleshooting accordion (common issues)
2791: Tablet Adaptation (768px): Platform tabs remain horizontal; snippet block widens.
2792: Desktop Layout (1280px+): Left sidebar: platform tab list. Right: snippet + service-worker download + live install-status panel with a visual checklist (Script detected, Service worker registered, VAPID key valid, Test notification sent).
2793: Key Components: Install-status badge; Platform tab; Code snippet with copy button; Verification checklist panel; Test-notification button
2794: CTA Strategy: Primary: 'Test Installation'. Secondary: 'Send Test Notification'. Micro: 'Copy Snippet', 'Download Service Worker'.
2795: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2796: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2797: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2798: 
2799: 
2800: Team Management  —  /dashboard/team
2801: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2802: User Journey Context: Arrives from sidebar nav or Settings → invites a teammate → teammate receives email → teammate completes their own Signup/Login flow scoped to the invited workspace.
2803: Mobile Layout (375px): 
2804: 1. Header + 'Invite Member' button
2805: 2. Member list: avatar, name/email, role badge, status (active/pending invite) — stacked rows
2806: 3. Per-row menu: Change Role, Remove
2807: 4. Pending invites section, separate list
2808: Tablet Adaptation (768px): No major structural change, list gains more breathing room.
2809: Desktop Layout (1280px+): Data table: Member, Role (dropdown inline-editable), Websites Access (All / Specific sites), Last Active, Status — with bulk role-change for multi-select.
2810: Key Components: Member row/table; Role badge + inline role-editor dropdown; Invite modal (email + role + site-access scope); Pending invite row with 'Resend' / 'Revoke' actions
2811: CTA Strategy: Primary: 'Invite Member'. Micro: per-row 'Change Role', 'Remove', 'Resend Invite'.
2812: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2813: Urgency/Scarcity Elements: Genuine, usage-driven urgency only where a real plan limit is at stake (e.g., 'Using 2 of 3 sites'); no artificial countdowns.
2814: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2815: 
2816: 
2817: API Keys  —  /dashboard/api-keys
2818: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2819: User Journey Context: Arrives from sidebar nav or Integration screen 'Use REST API instead' link → generates a scoped key (shown once) → copies it into their own backend → returns periodically to monitor usage or revoke.
2820: Mobile Layout (375px): 
2821: 1. Header + 'Generate New Key' button
2822: 2. Key list: name, masked key (show last 4 chars), scope badges, created date, last used — stacked cards
2823: 3. Per-card 'Revoke' action
2824: 4. Link to API documentation
2825: Tablet Adaptation (768px): No major structural change.
2826: Desktop Layout (1280px+): Data table: Name, Key (masked, reveal-once-on-creation pattern), Scopes, Created, Last Used, Status — with a side panel showing usage stats per key (requests in last 30 days, rate-limit headroom).
2827: Key Components: API key row (masked value, copy-once warning); Scope selector (checkboxes: Read Subscribers, Send Campaigns, Manage Segments, etc.); Key generation modal with one-time-reveal warning; Revoke confirmation dialog
2828: CTA Strategy: Primary: 'Generate New Key'. Micro: 'Revoke', 'View Usage', 'Read API Docs'.
2829: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2830: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2831: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2832: 
2833: 
2834: Billing & Subscription  —  /dashboard/billing
2835: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2836: User Journey Context: Arrives from sidebar nav, an in-app upgrade prompt (usage-limit banner), or a failed-payment email link → reviews usage/invoices → upgrades, fixes payment method, or (rarely) cancels with a retention offer presented first.
2837: Mobile Layout (375px): 
2838: 1. Header: current plan card (name, price, renewal date) + 'Manage Plan' button
2839: 2. Usage meters: Subscribers, Websites, AI Credits, Team Seats — stacked progress bars with plan limits
2840: 3. Payment method card with 'Update' link (opens Razorpay-hosted update flow)
2841: 4. Invoice history list, stacked rows with download icon
2842: 5. Cancel subscription link, de-emphasized at bottom
2843: Tablet Adaptation (768px): Usage meters become a 2x2 grid.
2844: Desktop Layout (1280px+): Left column (35%): current plan card + payment method + cancel link. Right column (65%): usage meters as a 2x2 grid on top, invoice history table below with filter by date range and CSV export.
2845: Key Components: Plan summary card; Usage progress bar (with near-limit warning state); Payment method card; Invoice table row with PDF download; Plan-change modal (upgrade/downgrade comparison); Cancellation flow modal with retention offer
2846: CTA Strategy: Primary: 'Upgrade Plan'. Secondary: 'Update Payment Method'. Micro: 'Download Invoice', de-emphasized 'Cancel Subscription'.
2847: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2848: Urgency/Scarcity Elements: Genuine, usage-driven urgency only: usage meters turn warning-colored at 80% of a plan limit and error-colored at 100%, with specific real numbers — never countdown timers or fabricated scarcity.
2849: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2850: 
2851: 
2852: Account Settings  —  /dashboard/settings
2853: Conversion Goal: Maximize successful completion of the screen's core task with minimal friction.
2854: User Journey Context: Arrives from sidebar nav or avatar-menu 'Settings' → updates relevant section → sees inline save confirmation → continues elsewhere in the app.
2855: Mobile Layout (375px): 
2856: 1. Tabbed sections (scrollable tabs): Profile, Security, Notifications, Workspace — content swaps below tabs
2857: 2. Profile tab: avatar upload, name, email (with re-verify flow if changed)
2858: 3. Security tab: change password, 2FA toggle with QR setup flow, active sessions list with 'Log out' per session
2859: 4. Notifications tab: toggles for product updates, billing alerts, weekly digest, delivery-failure alerts
2860: 5. Workspace tab: workspace name, default timezone, default sending domain
2861: Tablet Adaptation (768px): Tabs become a fixed horizontal row (no scroll); content area widens.
2862: Desktop Layout (1280px+): Left vertical tab list (Profile, Security, Notifications, Workspace); right content panel, single column, max 640px for readability.
2863: Key Components: Tab navigation; Avatar uploader; Toggle switch; 2FA setup flow (QR code + verification code input); Active session row with revoke action
2864: CTA Strategy: Primary per section: 'Save Changes'. Micro: 'Enable 2FA', 'Log out of this session'.
2865: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2866: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2867: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2868: 
2869: 
2870: Admin Screens
2871: Admin Dashboard  —  /admin
2872: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2873: User Journey Context: Internal team logs in via Admin-role-gated route → reviews health → drills into User Management, Delivery Monitoring, or Subscription & Revenue based on what needs attention.
2874: Mobile Layout (375px): 
2875: 1. Header: 'Admin Overview'
2876: 2. KPI cards stacked: MRR, Active Accounts, Total Subscribers Across Platform, Notifications Sent Today, Delivery Success Rate, Open Support Tickets
2877: 3. Alerts feed: recent system warnings (e.g., FCM delivery degradation) — stacked cards
2878: 4. Recent signups list
2879: Tablet Adaptation (768px): KPI cards become a 3-column grid.
2880: Desktop Layout (1280px+): KPI row (6 cards, 3x2 or 6x1 depending on width); 2-column layout below — left: revenue + growth charts, right: live alerts feed + recent signups + recent failed payments lists.
2881: Key Components: Admin KPI card; System alert card (severity badge); Mini activity feed list; Revenue trend chart
2882: CTA Strategy: Primary: none (dashboard is read-first). Micro: 'View All Alerts', 'View All Accounts'.
2883: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2884: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2885: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2886: 
2887: 
2888: User & Account Management  —  /admin/accounts
2889: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2890: User Journey Context: Arrives from Admin Dashboard drill-down, support ticket reference, or direct search → inspects account → resolves issue (impersonate to verify, suspend for abuse, or reset access) → action is logged to Audit Logs.
2891: Mobile Layout (375px): 
2892: 1. Header + search bar
2893: 2. Filter chips: Plan tier, Status (active/suspended), Signup date range
2894: 3. Account list: name, email, plan badge, MRR, signup date — stacked rows
2895: 4. Tap opens account detail drawer: profile, websites owned, subscription status, recent activity, 'Impersonate' and 'Suspend' actions
2896: Tablet Adaptation (768px): List becomes a denser table; detail opens as a slide-over panel instead of full drawer.
2897: Desktop Layout (1280px+): Data table (Name, Email, Plan, MRR, Sites, Status, Signup Date) with server-side search/filter/sort; clicking a row opens a right-side detail panel (40% width) without losing table context.
2898: Key Components: Admin data table; Account detail side panel; Impersonate-with-audit-log button; Suspend/Reinstate action with required reason field; Activity timeline
2899: CTA Strategy: Primary: search. Micro: 'Impersonate' (logs an audit entry), 'Suspend Account' (requires reason), 'Reset Password'.
2900: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2901: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2902: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2903: 
2904: 
2905: Website Oversight  —  /admin/sites
2906: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2907: User Journey Context: Arrives from Admin Dashboard alert drill-down or scheduled review → identifies problem site → disables sending or escalates to account suspension → logs to Audit Logs.
2908: Mobile Layout (375px): 
2909: 1. Header + search
2910: 2. Filter chips: Install Status (Live/Broken), Flagged
2911: 3. Site list: favicon, domain, owner account, subscriber count, install-status badge — stacked
2912: Tablet Adaptation (768px): List becomes a table.
2913: Desktop Layout (1280px+): Data table: Domain, Owner, Subscribers, Install Status, Last Send, Flag Status — with bulk 'Flag for Review' and 'Disable Sending' actions.
2914: Key Components: Admin data table; Install-status badge; Flag/disable action with reason field
2915: CTA Strategy: Micro: 'Flag for Review', 'Disable Sending', 'View Owner Account'.
2916: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2917: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2918: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2919: 
2920: 
2921: Subscription & Revenue Management  —  /admin/billing
2922: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2923: User Journey Context: Finance/ops staff reviews Overview → drills into Failed Payments → retries or contacts the account owner → monitors Coupons tab for promo performance during launch campaigns.
2924: Mobile Layout (375px): 
2925: 1. Header: MRR + churn-rate KPI cards stacked
2926: 2. Tabs: Overview / Failed Payments / Cancellations / Coupons
2927: 3. Failed Payments tab: list of accounts with retry status and 'Retry Charge' action
2928: Tablet Adaptation (768px): Tabs remain horizontal; lists become denser tables.
2929: Desktop Layout (1280px+): KPI row at top (MRR, ARPU, Churn Rate, Failed Payment Count); tabbed content below with full tables and a revenue trend chart spanning the Overview tab.
2930: Key Components: Revenue KPI card; Revenue trend chart; Failed-payment row with retry action; Coupon performance table
2931: CTA Strategy: Micro: 'Retry Charge', 'Issue Refund', 'Create Coupon'.
2932: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2933: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2934: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2935: 
2936: 
2937: Blog CMS  —  /admin/blog
2938: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2939: User Journey Context: Content team drafts a post → previews → schedules or publishes immediately → post appears on public Blog Listing/Detail pages.
2940: Mobile Layout (375px): 
2941: 1. Header + 'New Post' button
2942: 2. Status filter tabs: Draft, Scheduled, Published
2943: 3. Post list: title, status badge, author, date — stacked
2944: 4. Tap opens editor: title field, MDX/rich-text body, category/tag selector, featured image upload, SEO fields (meta title/description) — stacked sections
2945: Tablet Adaptation (768px): Editor gains a live preview toggle.
2946: Desktop Layout (1280px+): List view: full data table with bulk actions. Editor view: split-pane — left, the MDX/rich-text editor; right, live rendered preview; SEO fields and publish controls in a collapsible right rail.
2947: Key Components: Post data table; Rich-text/MDX editor; Image uploader (to R2); SEO fields panel (title, description, slug, OG image); Publish/schedule control
2948: CTA Strategy: Primary: 'Publish' / 'Schedule'. Secondary: 'Save Draft'. Micro: 'Preview'.
2949: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2950: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2951: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2952: 
2953: 
2954: Delivery Monitoring & System Health  —  /admin/system
2955: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2956: User Journey Context: Internal ops monitors continuously or arrives via an Admin Dashboard alert → diagnoses root cause from charts/logs → acknowledges/resolves → documents in Audit Logs if customer-impacting.
2957: Mobile Layout (375px): 
2958: 1. Header: overall system status badge (Operational/Degraded/Down)
2959: 2. Metric cards stacked: FCM Success Rate, Avg Delivery Latency, Queue Depth, API Error Rate
2960: 3. Recent incidents/error log list
2961: Tablet Adaptation (768px): Metric cards become a 2x2 grid.
2962: Desktop Layout (1280px+): Status badge banner at top; metric cards in a 4-column row; time-series charts for each metric below; raw error log table with filter by error type/site at the bottom.
2963: Key Components: System status badge; Metric card with sparkline; Time-series chart; Error log table
2964: CTA Strategy: Micro: 'Acknowledge Incident', 'View Site Detail' (links into Website Oversight for the affected site).
2965: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2966: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2967: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2968: 
2969: 
2970: Coupons & Discounts  —  /admin/coupons
2971: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2972: User Journey Context: Marketing creates a coupon ahead of a campaign → shares the code externally → monitors redemptions here → deactivates once the promotion ends.
2973: Mobile Layout (375px): 
2974: 1. Header + 'New Coupon' button
2975: 2. Coupon list: code, discount type/value, status (active/expired), redemptions — stacked cards
2976: Tablet Adaptation (768px): Cards become a table.
2977: Desktop Layout (1280px+): Data table: Code, Type (%/flat), Value, Plan Restriction, Expiry, Redemptions, Status — with a creation modal supporting expiry date, max redemptions, and plan eligibility.
2978: Key Components: Coupon data table; Creation modal (code, type, value, expiry, max uses, eligible plans); Redemption count badge
2979: CTA Strategy: Primary: 'New Coupon'. Micro: 'Deactivate'.
2980: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2981: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2982: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2983: 
2984: 
2985: Audit Logs & Feature Flags  —  /admin/audit-and-flags
2986: Conversion Goal: Maximize speed of accurate decision-making for the internal staff user.
2987: User Journey Context: Security/compliance staff reviews Audit Logs periodically or during an investigation; engineering toggles Feature Flags during staged rollouts and monitors for issues via Delivery Monitoring/Admin Dashboard.
2988: Mobile Layout (375px): 
2989: 1. Tabs: Audit Logs / Feature Flags
2990: 2. Audit tab: filterable log list (actor, action, target, timestamp) stacked rows
2991: 3. Flags tab: flag list with toggle + rollout percentage stepper
2992: Tablet Adaptation (768px): Logs become a table; flags remain a list with more spacing.
2993: Desktop Layout (1280px+): Audit tab: full-width searchable/filterable table with CSV export. Flags tab: table with Flag Name, Status, Rollout %, Eligible Plans, Last Modified — inline-editable rollout percentage.
2994: Key Components: Audit log table (immutable, read-only); Feature flag row with toggle + rollout slider; Filter bar (actor, action type, date range)
2995: CTA Strategy: Micro: 'Export Logs', 'Update Rollout %'.
2996: Social Proof Placement: Not a primary design element on this screen — authenticated/internal screens prioritize task efficiency over persuasion.
2997: Urgency/Scarcity Elements: None — Prontly Notify's brand voice deliberately avoids artificial urgency or scarcity tactics (see Content Strategy, Tone & Voice Guidelines); persuasion relies on clear value communication instead.
2998: Empty/Error State Design: Standard empty-state pattern per the App Flow universal state model: illustration, one-sentence explanation, single primary CTA toward the action that populates the screen.
2999: 
3000: 
3001: AI Coding Prompt Package
3002: Every prompt block in this section (and the remainder of Section 23) is written to be copy-pasted directly into Claude Code, Cursor, Lovable, or Windsurf. Execute them in order — Project Architecture first, then Phases 1 through 10 in sequence, using the Screen-wise Prompts when each phase reaches the relevant screen.
3003: Project Architecture Prompt
3004: PROJECT ARCHITECTURE PROMPT
3005:  
3006: Build the complete project architecture for Prontly Notify, a SaaS — Customer
3007: Engagement / Push Notification Platform.
3008:  
3009: Tech Stack:
3010: - Frontend: Next.js 15 (App Router) + TypeScript
3011: - Backend: Node.js + Next.js API Routes (serverless on Vercel)
3012: - Database: Cloudflare D1 (serverless SQLite, edge-replicated)
3013: - Auth: Firebase Authentication (email/password + Google/GitHub OAuth)
3014: - Hosting: Vercel
3015: - Storage: Cloudflare R2 (S3-compatible)
3016: - CDN: Cloudflare
3017: - Payments: Razorpay (Subscriptions API)
3018: - Push Delivery: Firebase Cloud Messaging — HTTP v1 API
3019: - Analytics: Google Analytics 4 + internal D1-backed analytics engine
3020:  
3021: Folder Structure:
3022: /
3023: ├── app/
3024: │   ├── (public)/              # Home, Pricing, Docs, Blog, About, Contact, FAQ, Legal
3025: │   ├── (auth)/                # Login, Signup, Forgot Password, Verify Email, Onboarding
3026: │   ├── dashboard/
3027: │   │   ├── sites/             # Website switcher, add website
3028: │   │   ├── subscribers/
3029: │   │   ├── campaigns/
3030: │   │   │   └── new/           # Campaign Builder
3031: │   │   ├── automation/
3032: │   │   ├── segments/
3033: │   │   ├── analytics/
3034: │   │   ├── ai/                # AI Tools Hub
3035: │   │   ├── integration/
3036: │   │   ├── team/
3037: │   │   ├── api-keys/
3038: │   │   ├── billing/
3039: │   │   └── settings/
3040: │   ├── admin/
3041: │   │   ├── accounts/
3042: │   │   ├── sites/
3043: │   │   ├── billing/
3044: │   │   ├── blog/
3045: │   │   ├── system/
3046: │   │   ├── coupons/
3047: │   │   └── audit-and-flags/
3048: │   └── api/v1/                # All API routes, mirrored to the resource tree above
3049: ├── components/
3050: │   ├── ui/                    # Button, Input, Card, Modal, Badge, Toast, Skeleton...
3051: │   ├── layout/                # Sidebar, TopBar, MobileTabBar, Footer
3052: │   ├── forms/
3053: │   ├── campaign/              # Live preview, AI-suggest popover, action-button editor
3054: │   ├── automation/            # Flow canvas, node, drawer
3055: │   ├── segments/              # Rule builder row, AI suggestion card
3056: │   └── charts/                # Line/Bar/Donut wrappers, Stat card
3057: ├── lib/
3058: │   ├── db/                    # D1 client, query builders, migrations
3059: │   ├── auth/                  # Firebase admin verification, role guards
3060: │   ├── ai/                    # LLM provider client, prompt templates per AI feature
3061: │   ├── fcm/                   # FCM HTTP v1 client, batch-send logic
3062: │   ├── billing/               # Razorpay client, webhook handlers
3063: │   ├── validation/            # Zod schemas, one file per resource
3064: │   └── utils/
3065: ├── hooks/                     # useAuth, useActiveSite, useAICredits, useToast...
3066: ├── store/                     # Zustand stores: activeSite, campaignDraft, uiState
3067: ├── types/                     # Shared TypeScript interfaces, mirrors the DB schema
3068: ├── styles/                    # globals.css, theme tokens
3069: ├── workers/                   # Cron-invoked delivery + automation worker handlers
3070: └── public/                    # sw-template.js, static marketing assets
3071:  
3072: Technical Layers:
3073: 1. Presentation Layer: Next.js 15 App Router, Tailwind CSS, shadcn/ui component primitives
3074: 2. Business Logic Layer: Next.js API Routes acting as a thin service layer; Vercel Cron
3075:    for scheduled sends and automation step execution
3076: 3. Data Layer: a lightweight typed query builder over the D1 HTTP/binding API — no
3077:    heavyweight ORM, given D1's SQLite dialect and edge runtime constraints
3078: 4. Auth Layer: Firebase Authentication, Next.js middleware for session verification and
3079:    role-based access control (Owner/Admin/Member/Staff Admin/Super Admin)
3080: 5. Infrastructure Layer: Vercel (compute + hosting), Cloudflare (D1 database, R2 storage,
3081:    CDN edge network)
3082:  
3083: Environment Variables Required:
3084: NEXT_PUBLIC_FIREBASE_API_KEY=
3085: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
3086: NEXT_PUBLIC_FIREBASE_PROJECT_ID=
3087: FIREBASE_SERVICE_ACCOUNT_JSON=          # server-side only, base64-encoded
3088: FCM_SERVICE_ACCOUNT_JSON=                # server-side only, scoped to FCM send
3089: CLOUDFLARE_D1_DATABASE_ID=
3090: CLOUDFLARE_API_TOKEN=
3091: CLOUDFLARE_R2_ACCESS_KEY_ID=
3092: CLOUDFLARE_R2_SECRET_ACCESS_KEY=
3093: CLOUDFLARE_R2_BUCKET_NAME=
3094: CLOUDFLARE_R2_PUBLIC_URL=
3095: RAZORPAY_KEY_ID=
3096: RAZORPAY_KEY_SECRET=
3097: RAZORPAY_WEBHOOK_SECRET=
3098: LLM_PROVIDER_API_KEY=                    # server-side only, never exposed to client
3099: NEXT_PUBLIC_GA4_MEASUREMENT_ID=
3100: VAPID_ENCRYPTION_KEY=                    # AES-256-GCM key for per-site VAPID secrets
3101: NEXTAUTH_URL= / NEXT_PUBLIC_APP_URL=     # canonical app URL for redirects + SDK snippets
3102: SENTRY_DSN=
3103:  
3104: Initial Dependencies to Install:
3105: next@15, react@19, react-dom@19, typescript@5
3106: tailwindcss@3, @tailwindcss/forms, class-variance-authority, clsx, tailwind-merge
3107: firebase@10 (client SDK), firebase-admin@12 (server SDK)
3108: zod@3 (validation)
3109: zustand@4 (client state)
3110: recharts@2 (charts)
3111: lucide-react (icons)
3112: razorpay@2 (Node SDK)
3113: @aws-sdk/client-s3@3 (R2 is S3-compatible — used for R2 access)
3114: date-fns@3
3115: @sentry/nextjs
3116:  
3117: Theme System:
3118: Implement exactly as specified in the Design System Blueprint (Section 21) — the
3119: primary-500 #3B82F6 / secondary-400 #60A5FA / accent-300 #93C5FD blue ramp, dark
3120: background #0F172A, surface #111827, text #F8FAFC, Sora + Inter typography, 4px
3121: spacing base, and the full glassmorphic-dark-premium component treatment.
3122: 	Phase-wise Build Prompts (10 Phases)
3123: Execute these in strict numerical order. Each phase's PREREQUISITES line states exactly what must be true before starting it — do not skip ahead.
3124: Phase 1 — Foundation Setup
3125: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3126: PHASE 1 — FOUNDATION SETUP
3127: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3128:  
3129: OBJECTIVE: Scaffold a production-ready Next.js 15 + TypeScript project on Vercel with the full folder structure, environment configuration, and tooling Prontly Notify needs before any feature work begins.
3130:  
3131: PREREQUISITES: None — this is the first phase. Have a Vercel account, a GitHub repository, a Firebase project, and a Cloudflare account (D1 + R2) ready to connect.
3132:  
3133: Initialize a new Next.js 15 project using the App Router and TypeScript in strict mode. Set up the complete folder structure exactly as specified in the Project Architecture Prompt — app/ route groups for (public), (auth), dashboard, admin, and api/v1; components/ split into ui, layout, forms, and feature-specific folders; lib/ split into db, auth, ai, fcm, billing, validation, and utils; plus hooks/, store/, types/, styles/, workers/, and public/.
3134:  
3135: Configure Tailwind CSS with a custom theme extension matching the Design System Blueprint's color, spacing, radius, and typography tokens — do not use Tailwind's default palette; every color reference in the codebase should resolve through the custom token names (e.g., bg-surface, text-primary, border-default), never raw hex values, so the design system stays a single source of truth.
3136:  
3137: Set up ESLint (next/core-web-vitals + TypeScript rules), Prettier, and a pre-commit hook (Husky + lint-staged) that runs both before any commit is allowed. Configure path aliases (@/components, @/lib, @/hooks, @/types) in tsconfig.json so imports never use relative ../../../ chains.
3138:  
3139: Create the base routing skeleton: a (public) layout with the marketing header/footer, an (auth) layout with the centered-card shell, a dashboard layout with the sidebar/top-bar/mobile-tab-bar shell (initially showing placeholder nav items), and an admin layout gated by a placeholder role check to be wired fully in Phase 3.
3140:  
3141: Wire up all environment variables listed in the Project Architecture Prompt as a typed, validated config module (lib/env.ts) using Zod, so a missing or malformed environment variable fails the build immediately with a clear error rather than causing a confusing runtime failure later.
3142:  
3143: Connect the Vercel project to the GitHub repository with automatic preview deployments enabled per pull request, and confirm the Cloudflare D1 database and R2 bucket exist and are reachable from a Vercel-deployed test API route before moving to Phase 2.
3144:  
3145: Add a root-level README documenting local setup (clone, install, environment variable sourcing, running the dev server against the staging D1 database) so a new engineer can reach a running local environment in under fifteen minutes without needing to ask a teammate for undocumented steps.
3146:  
3147: SUCCESS CRITERIA:
3148: - `npm run build` completes with zero TypeScript errors and zero ESLint errors.
3149: - All four route groups ((public), (auth), dashboard, admin) render a placeholder page with the correct layout shell applied.
3150: - A test API route successfully reads and writes a row to the connected D1 database and uploads a test file to the connected R2 bucket.
3151: - A pull request triggers an automatic Vercel preview deployment with no manual configuration steps required.
3152:  
3153: FILES TO CREATE/MODIFY:
3154: - app/layout.tsx
3155: - app/(public)/layout.tsx
3156: - app/(auth)/layout.tsx
3157: - app/dashboard/layout.tsx
3158: - app/admin/layout.tsx
3159: - tailwind.config.ts
3160: - tsconfig.json
3161: - lib/env.ts
3162: - lib/db/client.ts
3163: - lib/storage/r2-client.ts
3164: - .eslintrc.json
3165: - .husky/pre-commit
3166: 	Phase 2 — Design System & Core UI
3167: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3168: PHASE 2 — DESIGN SYSTEM & CORE UI
3169: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3170:  
3171: OBJECTIVE: Implement the full reusable component library and global navigation shell so every later phase builds features out of consistent, pre-tested UI primitives rather than one-off markup.
3172:  
3173: PREREQUISITES: Phase 1 complete — folder structure, Tailwind theme tokens, and routing skeleton must exist.
3174:  
3175: Build every primitive component specified in the Design System Blueprint's Component Library section: Button (all 7 variants × 4 sizes × 6 states), Input (all 9 field types × 6 states), Card (5 variants including the Glass glassmorphic variant with backdrop-blur), Badge, Avatar, Tooltip, Skeleton, Toast, Modal, Drawer, Tabs, Accordion, and Data Table. Each component must be a typed React component accepting a documented prop interface — no untyped 'any' props.
3176:  
3177: Build the Skeleton variants specifically matched to their eventual content shape (KPI card skeleton, table row skeleton, chart skeleton) per the App Flow's Universal State Model — generic spinner-only loading states are not acceptable anywhere KPI cards, tables, or charts appear.
3178:  
3179: Implement the persistent left Sidebar Nav for desktop (260px fixed width, icon + label, active-state primary-500 left border accent) listing all eleven dashboard sections, and the Mobile Bottom Tab Bar (Home, Subscribers, Campaigns, Analytics, More) with a slide-out Drawer housing the overflow sections (Automation, Segments, AI Tools, Integration, Team, Billing, Settings) — implement the responsive breakpoint switch between these two patterns at exactly 1024px per the UI/UX Brief.
3180:  
3181: Implement the Top Bar with the Website Switcher dropdown (placeholder data for now, wired to real data in Phase 5), notification bell, and avatar menu.
3182:  
3183: Apply the dark-premium glassmorphic theme platform-wide: verify every component renders correctly against the #0F172A background with proper contrast (4.5:1 minimum for body text) and that glass-variant surfaces use backdrop-blur-xl with the surface-glass translucent fill.
3184:  
3185: Build the domain-specific components that will be reused across multiple later phases now, even though their data isn't wired yet: the Notification Live Preview shell, the AI Suggestion Card (with the consistent AI badge treatment), and the Usage Meter (progress bar + numeric label with warning/error color thresholds).
3186:  
3187: Document every component's prop interface and variant matrix in Storybook or an equivalent lightweight component-showcase route, so subsequent phases can discover and reuse existing components instead of accidentally duplicating near-identical UI — a discipline that matters disproportionately for a product with this many list/table/card-heavy screens across both the customer dashboard and the admin panel.
3188:  
3189: SUCCESS CRITERIA:
3190: - A component showcase route (e.g., /dev/components, removed before production) renders every component in every documented variant and state for visual QA.
3191: - Sidebar nav correctly switches to the mobile bottom-tab pattern below 1024px viewport width with no layout shift.
3192: - All interactive components are fully keyboard-operable (Tab order, Enter/Space activation, Escape to close modals/drawers) verified manually.
3193: - Lighthouse accessibility score of 95+ on the component showcase route.
3194:  
3195: FILES TO CREATE/MODIFY:
3196: - components/ui/*.tsx
3197: - components/layout/Sidebar.tsx
3198: - components/layout/MobileTabBar.tsx
3199: - components/layout/TopBar.tsx
3200: - components/campaign/LivePreview.tsx
3201: - components/ui/AISuggestionCard.tsx
3202: - components/ui/UsageMeter.tsx
3203: - styles/globals.css
3204: 	Phase 3 — Authentication System
3205: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3206: PHASE 3 — AUTHENTICATION SYSTEM
3207: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3208:  
3209: OBJECTIVE: Implement complete Firebase-Authentication-backed signup, login, password recovery, and email verification, with server-side session verification and role-based route protection wired for the rest of the application to depend on.
3210:  
3211: PREREQUISITES: Phase 2 complete — auth screens need the Card, Input, Button, and Toast components to already exist.
3212:  
3213: Integrate the Firebase client SDK for email/password and Google/GitHub OAuth sign-in, and the Firebase Admin SDK server-side for verifying ID tokens on every protected request.
3214:  
3215: Build the Login, Signup, Forgot Password, and Email Verification screens exactly per their Screen-wise AI Coding Prompts (Section 23) — Login and Signup both use the centered-card-on-mobile, split-panel-on-desktop pattern; Forgot Password and Email Verification stay centered-card-only at every breakpoint per their wireframe specifications.
3216:  
3217: On successful Signup, call POST /api/v1/users to provision the corresponding D1 users row and a default workspaces row, before redirecting to Email Verification.
3218:  
3219: Implement Next.js middleware (middleware.ts) that verifies the Firebase ID token on every request to a protected route group (dashboard, admin), resolves the request's { userId, workspaceId, role } context, and redirects unauthenticated requests to /login with a `?redirect=` parameter preserving the originally requested path.
3220:  
3221: Implement the role-based guard specifically for /admin/*: verify the user's is_staff + staff_role claim and return a 404 (not 403) on failure, per the Security Architecture's reasoning for not revealing the admin panel's existence to non-staff probing the URL.
3222:  
3223: Implement silent token refresh via the Firebase client SDK's built-in mechanism, and a global API-client interceptor that catches 401 responses, shows a non-disruptive session-expired modal, and redirects to Login while preserving the current route.
3224:  
3225: Implement the Website Onboarding Wizard's entry condition: a verified user with zero sites is always redirected to /onboarding immediately after login, never landing on an empty Dashboard Home without guidance.
3226:  
3227: Implement OAuth account-linking edge cases: if a visitor signs up via Google OAuth using an email address that already has a password-based account, surface a clear 'an account already exists — log in with your password, or link Google from Account Settings' message rather than silently creating a second, disconnected account under the same email.
3228:  

(Output capped at 50 KB. Showing lines 2673-3228. Use offset=3229 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 7.6s)

_Thinking:_

Let me continue reading the rest of the document.

**Tool: read**

**Input:**
```json
{
  "offset": 3229,
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt"
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
3229: Write the role-resolution logic that distinguishes Owner, Admin, and Member within a workspace_members row from is_staff/staff_role on the users table itself, and expose both as a single resolved auth context so every downstream phase can write one consistent permission check rather than juggling two separate role systems.
3230:  
3231: SUCCESS CRITERIA:
3232: - A new user can complete signup, verify their email (polling-detected, no manual refresh), and land on the Onboarding Wizard without any manual navigation.
3233: - An expired session correctly triggers the session-expired modal and redirects to Login with the return path preserved.
3234: - A non-staff user requesting any /admin/* route receives a 404, not a redirect or a visible 'access denied' page.
3235: - Server-side middleware rejects a forged or expired ID token even if a malicious client bypasses client-side route guards.
3236:  
3237: FILES TO CREATE/MODIFY:
3238: - middleware.ts
3239: - lib/auth/firebase-client.ts
3240: - lib/auth/firebase-admin.ts
3241: - lib/auth/guards.ts
3242: - app/(auth)/login/page.tsx
3243: - app/(auth)/signup/page.tsx
3244: - app/(auth)/forgot-password/page.tsx
3245: - app/(auth)/verify-email/page.tsx
3246: - app/api/v1/users/route.ts
3247: 	Phase 4 — Database & Backend
3248: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3249: PHASE 4 — DATABASE & BACKEND
3250: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3251:  
3252: OBJECTIVE: Migrate the complete D1 schema and build the core CRUD API layer — sites, subscribers, segments, campaigns — with server-side validation and role-scoped authorization enforced on every route.
3253:  
3254: PREREQUISITES: Phase 3 complete — every API route from this phase requires the auth/role-context middleware to already be functioning.
3255:  
3256: Write and run the D1 migration creating all entities specified in the Backend Schema document: users, workspaces, workspace_members, sites, subscribers, subscriber_attributes, segments, campaigns, campaign_stats, campaign_deliveries, automations, automation_steps, automation_runs, plans, subscriptions, invoices, coupons, ai_usage, api_keys, blog_posts, audit_logs, and feature_flags — with every index specified in that document (the campaign_stats and automation_runs indexes in particular are required for later phases' performance targets, not optional).
3257:  
3258: Build a typed, scoped query-builder layer (lib/db/queries/*.ts, one file per entity) so that no route handler ever writes a raw, unscoped SQL string — every query that touches workspace- or site-scoped data must take a workspaceId or siteId parameter as part of its type signature, making it a compile error to accidentally write an unscoped query.
3259:  
3260: Implement Zod validation schemas for every entity's create/update payload in lib/validation/, matching the field-level rules in the Backend Schema's Validation Rules section exactly (e.g., campaign title 1–65 chars, campaign body 1–240 chars).
3261:  
3262: Build the Sites resource: GET/POST /api/v1/sites, GET/PATCH/DELETE /api/v1/sites/:id, enforcing the plan's site_limit on creation with a structured upgrade-prompt error response (not a generic 400).
3263:  
3264: Build the Subscribers resource: the public POST ingestion endpoint (site-key-authenticated, deduplicates on site_id+fcm_token), and the authenticated, cursor-paginated GET list endpoint with filter support (status, segment, browser, country, date range).
3265:  
3266: Build the Segments resource including the rule_json schema validator (reject any condition referencing an attribute or operator outside the allowed enum) and the preview-count endpoint that estimates a live subscriber count for an in-progress rule set.
3267:  
3268: Build the Campaigns resource (draft/scheduled/send states) enforcing the business-logic rule that a campaign cannot move to 'sending' if the site's sending_enabled flag is false or the workspace's subscription is past_due beyond the grace period.
3269:  
3270: Implement the role/permission middleware layer enforcing the exact matrix in the Backend Schema's Roles & Permissions Matrix — write an automated test that asserts every restricted action returns 403 for a Member-role token, not just that it succeeds for Owner.
3271:  
3272: SUCCESS CRITERIA:
3273: - All 21 tables exist in D1 with correct types, foreign keys, and indexes; the migration is idempotent and safely re-runnable.
3274: - Every list endpoint (subscribers, campaigns, segments) returns correctly cursor-paginated results that remain fast at a simulated 100,000-row table size.
3275: - An automated test suite confirms a Member-role user cannot reach Billing, Team Management, or API Key endpoints, and a cross-workspace request for another tenant's site returns 403/404, never another tenant's data.
3276: - A campaign cannot be created beyond the site's plan-derived limits, and the API response gives the frontend everything needed to render the Billing upsell card without a second round-trip.
3277:  
3278: FILES TO CREATE/MODIFY:
3279: - db/migrations/0001_init.sql
3280: - lib/db/queries/sites.ts
3281: - lib/db/queries/subscribers.ts
3282: - lib/db/queries/segments.ts
3283: - lib/db/queries/campaigns.ts
3284: - lib/validation/*.ts
3285: - app/api/v1/sites/route.ts
3286: - app/api/v1/sites/[id]/route.ts
3287: - app/api/v1/sites/[id]/subscribers/route.ts
3288: - app/api/v1/segments/route.ts
3289: - app/api/v1/campaigns/route.ts
3290: 	Phase 5 — Feature Development
3291: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3292: PHASE 5 — FEATURE DEVELOPMENT
3293: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3294:  
3295: OBJECTIVE: Build every core product surface: the Website Onboarding Wizard, Campaign Builder, Automation/Drip Builder, Segments rule builder, AI Tools Hub (all six AI features), and the SaaS-standard workspace-management features — Team Invites, API Keys, and Billing & Subscription.
3296:  
3297: PREREQUISITES: Phase 4 complete — every screen in this phase depends on its corresponding API resource already existing.
3298:  
3299: Workspace & Multi-Website Management: build the Website Switcher & Add Website screen and the full Website Onboarding Wizard (3-step: site details, platform selection, install verification) including the per-platform SDK snippet generator and the service-worker file generation pipeline writing to R2 at sites/{site_id}/sw.js.
3300:  
3301: Campaign Builder: build the 4-step composer (Compose, Target, Schedule, Review) exactly per its Screen-wise AI Coding Prompt, wiring the Notification Live Preview to re-render reactively on every keystroke, the segment/audience picker with a debounced live reach-count call, and the Send/Schedule/Save-as-Draft actions against the Campaigns API.
3302:  
3303: Automation/Drip Builder: build the template-gallery entry point (Welcome Series, Re-engagement, Abandoned Content) plus the custom flow canvas (Trigger → Wait/Send/Condition nodes) with a linear-list accessible fallback view per the Design System's accessibility requirements.
3304:  
3305: Segments: build the rule builder (condition rows, AND/OR grouping) with the live count preview, plus the AI-suggested-segments carousel.
3306:  
3307: AI Tools Hub: implement all six AI features end-to-end per the AI Integration Blueprint — title generation, CTR optimization, send-time suggestion, campaign recommendations, segmentation suggestions, and analytics summaries — each calling its server-side-only LLM endpoint, metering against ai_usage, and degrading gracefully (manual workflow always remains usable) when credits are exhausted or the provider call fails.
3308:  
3309: Subscription Billing: integrate Razorpay Subscriptions — the Billing & Subscription screen's plan-change modal, payment-method update flow, and invoice history, plus the signature-verified webhook handler updating the subscriptions table on payment/renewal/failure events.
3310:  
3311: Team Invites: build Team Management's invite flow (email + role + site-access scope), the pending-invite email send, and the accept-invite flow that links a new or existing user account to the inviting workspace.
3312:  
3313: API Keys: build key generation (reveal-once pattern), scope selection, usage display, and revocation.
3314:  
3315: Usage Dashboards: build Dashboard Home's KPI row and growth chart, and the full Analytics screen with date-range-driven charts, the AI summary card, and CSV export.
3316:  
3317: Wire the active-website context as a single global piece of client state (Zustand store) that every feature screen reads from, so switching the active website on the Website Switcher correctly re-scopes every subsequent API call across Subscribers, Campaigns, Automation, Segments, Analytics, and AI Tools without requiring a full page reload.
3318:  
3319: SUCCESS CRITERIA:
3320: - A new user can complete onboarding, send a real test notification to themselves, and see it appear in the browser within the same session.
3321: - A campaign composed with AI-suggested title and timing sends successfully and its delivery/click counters update in campaign_stats without a page refresh.
3322: - An automation built from the Welcome Series template activates and correctly enrolls a newly added test subscriber.
3323: - A Razorpay test-mode plan upgrade completes and the workspace's plan_id and subscriber/site limits update immediately, reflected in the relevant usage meters.
3324:  
3325: FILES TO CREATE/MODIFY:
3326: - app/(auth)/onboarding/page.tsx
3327: - app/dashboard/campaigns/new/page.tsx
3328: - app/dashboard/automation/page.tsx
3329: - app/dashboard/segments/page.tsx
3330: - app/dashboard/ai/page.tsx
3331: - app/dashboard/billing/page.tsx
3332: - app/dashboard/team/page.tsx
3333: - app/dashboard/api-keys/page.tsx
3334: - lib/ai/*.ts
3335: - lib/billing/razorpay-client.ts
3336: - app/api/v1/billing/webhook/route.ts
3337: 	Phase 6 — Admin Panel
3338: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3339: PHASE 6 — ADMIN PANEL
3340: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3341:  
3342: OBJECTIVE: Build the internal staff-only admin panel: platform health monitoring, account management with audited impersonation, content moderation, billing operations, and the blog CMS that feeds the SEO content engine.
3343:  
3344: PREREQUISITES: Phase 5 core features complete — admin screens reference the same data entities customer-facing screens already populate.
3345:  
3346: Build the Admin Dashboard with platform-wide KPIs (MRR, active accounts, total subscribers, sends today, delivery success rate) polling every 60 seconds, plus the alerts feed and recent-signups list.
3347:  
3348: Build User & Account Management with server-paginated search/filter, the account detail side panel, and the audited Impersonate and Suspend actions — every mutating action here must write to audit_logs with a required reason field captured at the point of action, not optionally.
3349:  
3350: Build Website Oversight with install-status and flag filters, and the Disable Sending kill-switch enforced server-side regardless of any client-side state (a disabled site's campaigns must be rejected by the Campaigns API itself, not merely hidden in the UI).
3351:  
3352: Build Subscription & Revenue Management with the Overview/Failed Payments/Cancellations/Coupons tabs, wiring the Retry Charge action to Razorpay via the backend and reflecting the webhook-driven status update.
3353:  
3354: Build the Blog CMS: the MDX/rich-text editor with autosave, R2-backed image upload via signed URLs, the SEO fields panel, and Draft/Scheduled/Published status transitions — published posts must immediately become visible on the public Blog Listing/Detail screens built in Phase 7.
3355:  
3356: Build Delivery Monitoring & System Health with the FCM success-rate, latency, and queue-depth metric cards plus the raw error log table.
3357:  
3358: Build Coupons & Discounts and Audit Logs & Feature Flags, restricting the latter to the super_admin staff_role specifically — verify with an automated test that an Admin (non-super_admin) staff account cannot reach either screen's API routes even with a guessed URL.
3359:  
3360: Build the impersonation session mechanism itself as a short-lived, clearly-scoped token distinct from a normal user session, automatically expiring after a fixed duration (e.g., 30 minutes) and rendering a persistent, impossible-to-dismiss 'Impersonating [account name]' banner across every screen for the duration of the session, so there is no code path that allows a staff member to operate inside a customer account without that fact being visually obvious to anyone watching the staff member's screen.
3361:  
3362: SUCCESS CRITERIA:
3363: - Every destructive admin action (suspend, disable sending, impersonate) is blocked without a non-empty reason field and produces exactly one corresponding audit_logs row.
3364: - A Blog CMS post moved to Published status appears on the public /blog listing within the ISR revalidation window without a manual deploy.
3365: - A Disable Sending action on a site immediately causes that site's Campaigns API to reject new sends with a clear error, even if the customer's dashboard UI hasn't refreshed yet.
3366: - Feature Flags and Audit Logs routes return 403 for an Admin-role staff account that is not super_admin.
3367:  
3368: FILES TO CREATE/MODIFY:
3369: - app/admin/page.tsx
3370: - app/admin/accounts/page.tsx
3371: - app/admin/sites/page.tsx
3372: - app/admin/billing/page.tsx
3373: - app/admin/blog/page.tsx
3374: - app/admin/system/page.tsx
3375: - app/admin/coupons/page.tsx
3376: - app/admin/audit-and-flags/page.tsx
3377: - lib/db/queries/audit-logs.ts
3378: - app/api/v1/admin/**/*.ts
3379: 	Phase 7 — SEO & Marketing
3380: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3381: PHASE 7 — SEO & MARKETING
3382: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3383:  
3384: OBJECTIVE: Implement the full SEO technical layer across every public route — dynamic metadata, structured data, sitemap, and the programmatic Docs Hub platform pages — so the content strategy in Section 11 has a technically sound foundation to rank on.
3385:  
3386: PREREQUISITES: Public pages from Phase 2/5 must exist (Home, Pricing, Blog, Docs, About, Contact, FAQ, Legal).
3387:  
3388: Implement Next.js's generateMetadata for every public route, pulling per-page title/description from the content source (static config for marketing pages, the blog_posts table's seo_title/seo_description for Blog Detail, with a sensible fallback to title/excerpt when those fields are empty).
3389:  
3390: Generate sitemap.xml dynamically (app/sitemap.ts) including every static marketing route, every published blog_posts slug, and every Docs Hub platform page — excluding all /dashboard and /admin routes entirely.
3391:  
3392: Generate robots.txt explicitly disallowing /dashboard/*, /admin/*, and /api/* while allowing all public marketing and content routes.
3393:  
3394: Implement Schema.org JSON-LD per the SEO Blueprint's Schema Markup Plan: Organization + WebSite + FAQPage on Home, Product + Offer per plan on Pricing, BlogPosting + Person + BreadcrumbList on Blog Detail, TechArticle + BreadcrumbList + HowTo on Docs Hub platform pages, and FAQPage on every FAQ question/answer pair.
3395:  
3396: Build the OG image generation pipeline using Next.js's built-in image-response generation, producing a branded 1200x630 image per Blog post (using its title) and a single static branded image for the other marketing pages.
3397:  
3398: Build the Docs Hub platform-page template (/docs/[platform]) as the centerpiece of the programmatic SEO strategy, ensuring each platform's page (WordPress, Shopify, Webflow, Wix, Custom HTML/JS, REST API) has genuinely distinct, specific installation content — not templated thin content — pulling the live, authenticated SDK snippet for logged-in users and a generic placeholder snippet for anonymous visitors.
3399:  
3400: Build the /compare/[competitor-slug] comparison-page template per the SEO Blueprint's programmatic SEO opportunity, seeded initially with OneSignal and PushEngage comparison pages.
3401:  
3402: Connect Google Analytics 4 via next/script with the lazyOnload strategy so it never competes with above-the-fold content for bandwidth on a throttled connection, and wire signup-completion and plan-selection as explicit GA4 conversion events so the marketing/growth team can attribute organic traffic to actual revenue outcomes, not just pageviews.
3403:  
3404: Validate every generated schema block against Google's Rich Results Test as part of the QA pass for this phase, and add a lightweight automated check (even a simple JSON-LD presence assertion per route type) to the test suite so a future refactor cannot silently strip structured data from a page without the build noticing.
3405:  
3406: SUCCESS CRITERIA:
3407: - Every public page returns a unique, non-empty title and meta description; Lighthouse SEO score of 100 on Home, Pricing, and a sample Blog Detail page.
3408: - sitemap.xml correctly includes all published blog posts and excludes every dashboard/admin route, verified by crawling the generated file in CI.
3409: - Google's Rich Results Test validates the FAQPage, BlogPosting, and Product schema with zero errors.
3410: - A newly published Blog CMS post appears in sitemap.xml without a manual deployment, confirmed via the ISR revalidation window.
3411:  
3412: FILES TO CREATE/MODIFY:
3413: - app/sitemap.ts
3414: - app/robots.ts
3415: - app/(public)/docs/[platform]/page.tsx
3416: - app/(public)/compare/[slug]/page.tsx
3417: - lib/seo/schema.ts
3418: - app/api/og/route.tsx
3419: 	Phase 8 — Security Layer
3420: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3421: PHASE 8 — SECURITY LAYER
3422: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3423:  
3424: OBJECTIVE: Harden every layer of the application against the threat model defined in the Security Architecture document — rate limiting, CSRF protection, security headers, and complete audit-log coverage of admin actions.
3425:  
3426: PREREQUISITES: Phase 4 (API layer) and Phase 6 (admin actions) must be complete — this phase hardens existing surfaces rather than building new ones.
3427:  
3428: Implement rate limiting on authentication endpoints (login, signup, forgot-password) and on the public subscriber-ingestion endpoint, using a sliding-window limiter keyed by IP + email/site combination to prevent both credential-stuffing and subscriber-list-poisoning abuse.
3429:  
3430: Implement CSRF protection on every state-changing dashboard form submission via a double-submit-cookie token pattern, verified server-side on every POST/PATCH/DELETE route that relies on session-cookie auth (API-key-authenticated requests are exempt, since they don't rely on ambient browser credentials).
3431:  
3432: Set the full security header set platform-wide via next.config.js headers(): Content-Security-Policy (restricting script/style/connect sources to the application's own origin plus the specific third-party domains required — Firebase, Razorpay Checkout, GA4), Strict-Transport-Security with a long max-age and includeSubDomains, X-Frame-Options DENY, X-Content-Type-Options nosniff, and Referrer-Policy strict-origin-when-cross-origin.
3433:  
3434: Implement the scoped D1 query-builder enforcement described in the Security Architecture document as an automated lint rule or test, not just a code-review convention — add a CI check that fails the build if any new raw, unscoped database query is introduced outside the lib/db/queries/ layer.
3435:  
3436: Wire audit_logs writes into every admin mutation identified in Phase 6 (suspend, impersonate, disable-sending, retry-charge, feature-flag update) as a shared, reusable writeAuditLog() helper called from inside each route handler — not duplicated inline — so the audit trail's format stays consistent and impossible to accidentally skip.
3437:  
3438: Encrypt site-level VAPID private keys at the application layer (AES-256-GCM, using VAPID_ENCRYPTION_KEY) before any D1 write, and decrypt only at the point of FCM API call — never log or return the decrypted value in any API response.
3439:  
3440: Implement the data-export (GDPR/DPDPA) flow from Account Settings: an async job compiling account, sites, campaign metadata, and billing history into an R2-stored archive, delivered via a signed, time-limited download link sent by email.
3441:  
3442: Add automated dependency vulnerability scanning to the CI pipeline (e.g., npm audit or an equivalent SCA tool) that fails the build on any newly introduced high-or-critical-severity vulnerability, and document a clear process for triaging and patching findings rather than allowing them to silently accumulate.
3443:  
3444: SUCCESS CRITERIA:
3445: - Automated load-testing confirms the login and signup endpoints reject excess attempts past the configured rate limit with a 429 response, not a silent failure.
3446: - A CSRF token mismatch on a dashboard form submission is rejected with a 403 before any database write occurs.
3447: - Every action in Phase 6's admin success-criteria list (suspend, impersonate, disable-sending, retry-charge, feature-flag update) produces a corresponding audit_logs row with a non-empty reason field, verified by an automated test.
3448: - A security header scan (e.g., securityheaders.com or an equivalent CI check) confirms CSP, HSTS, X-Frame-Options, and X-Content-Type-Options are all present and correctly configured on every response.
3449:  
3450: FILES TO CREATE/MODIFY:
3451: - middleware.ts
3452: - lib/security/rate-limit.ts
3453: - lib/security/csrf.ts
3454: - next.config.js
3455: - lib/audit/write-audit-log.ts
3456: - lib/crypto/vapid-encryption.ts
3457: - app/api/v1/users/me/export/route.ts
3458: 	Phase 9 — Performance Optimization
3459: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3460: PHASE 9 — PERFORMANCE OPTIMIZATION
3461: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3462:  
3463: OBJECTIVE: Bring every page and API route to the TRD's stated performance targets (LCP < 2.5s, CLS < 0.1, INP < 200ms, API p95 < 300ms reads / 800ms writes) through image optimization, code-splitting, and caching.
3464:  
3465: PREREQUISITES: Core features from Phase 5 must be feature-complete — performance work optimizes existing surfaces rather than building new ones.
3466:  
3467: Implement the image optimization pipeline: all notification icon/image uploads are converted to WebP and stored in R2 at multiple responsive sizes on upload (not on every request), with the Next.js Image component used everywhere a campaign image, blog featured image, or avatar is rendered.
3468:  
3469: Implement route-level code-splitting for the heaviest dashboard surfaces — the Automation flow canvas (likely the single heaviest client bundle given its canvas/drag-drop dependencies) and the chart-heavy Analytics screen — using next/dynamic with a matching Skeleton loading fallback, so neither bundle blocks the initial render of lighter dashboard routes.
3470:  
3471: Implement the caching strategy specified in the TRD: marketing/SEO pages on ISR with a 1-hour revalidation window; the dashboard-summary and analytics endpoints cached for 60 seconds server-side (e.g., via a short-TTL KV or in-memory edge cache) to absorb rapid re-renders without re-querying D1 on every dashboard interaction; static assets and the per-site service-worker bundle CDN-cached with long max-age and content-hashed filenames.
3472:  
3473: Audit and eliminate render-blocking resources on the marketing pages specifically — the Home page's hero animation and logo marquee must not delay LCP of the headline text; defer non-critical JavaScript (GA4, any non-essential third-party script) until after first interaction or via next/script's lazyOnload strategy.
3474:  
3475: Add database query performance verification: run EXPLAIN QUERY PLAN against the subscribers, campaigns, and campaign_deliveries list queries at a simulated 100,000+ row scale to confirm every list/filter query is using the indexes defined in the Backend Schema document, not falling back to a full table scan.
3476:  
3477: Set up a Lighthouse CI gate in the deployment pipeline (see Phase 10) enforcing a minimum mobile score of 90 and desktop score of 95 on the Home, Pricing, and Dashboard Home routes, failing the build if either threshold regresses.
3478:  
3479: Profile and optimize the Campaign Builder's live preview re-render path specifically, since it re-renders on every keystroke across four form steps — apply debouncing or memoization as needed so typing in the title/body fields never visibly drops below 60fps, even on a mid-range Android device representative of the India-primary market's typical hardware.
3480:  
3481: SUCCESS CRITERIA:
3482: - Home and Pricing pages score LCP < 2.5s and CLS < 0.1 under Lighthouse's mobile-throttled-4G test profile, matching the TRD's network-constraint requirement for the India-primary market.
3483: - Dashboard Home and Analytics achieve INP < 200ms for their primary interactions (date-range change, chart hover) measured via Vercel Analytics real-user data after initial production traffic.
3484: - p95 API response time for GET endpoints stays under 300ms and for POST/AI endpoints stays under 800ms, measured over a one-week production sampling window.
3485: - Lighthouse CI blocks a deployment that regresses the mobile score below 90 on any of the three gated routes.
3486:  
3487: FILES TO CREATE/MODIFY:
3488: - next.config.js
3489: - lib/cache/edge-cache.ts
3490: - components/automation/FlowCanvas.tsx (dynamic import)
3491: - components/charts/* (dynamic import)
3492: - .github/workflows/lighthouse-ci.yml
3493: 	Phase 10 — Testing & Deployment
3494: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3495: PHASE 10 — TESTING & DEPLOYMENT
3496: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3497:  
3498: OBJECTIVE: Establish automated test coverage for every critical flow, wire up the full CI/CD pipeline, configure production observability, and execute the Production Launch Checklist (Section 27) to go live.
3499:  
3500: PREREQUISITES: All prior phases complete — this phase validates and ships the finished product, it does not build new features.
3501:  
3502: Write unit tests for every validation schema (lib/validation/*) and every business-logic guard identified across the prior phases (plan-limit enforcement, role-permission checks, campaign send-state transitions).
3503:  
3504: Write integration tests covering the critical end-to-end flows: signup → email verification → onboarding → first test notification; campaign compose → AI title suggestion → send → delivery-stat update; automation template selection → activation → subscriber enrollment; Razorpay test-mode plan upgrade → webhook → subscription status update; admin suspend action → audit log entry → affected account's sending disabled.
3505:  
3506: Configure GitHub Actions CI: on every PR, run lint, typecheck, the full test suite, and the Lighthouse CI gate from Phase 9; on merge to main, run the same suite plus the D1 migration step, then deploy to production only if every prior step passes.
3507:  
3508: Configure Sentry for both client-side (React error boundaries) and server-side (API route exception) error tracking, with source maps uploaded automatically during the CI build step so production stack traces are readable.
3509:  
3510: Configure Vercel Analytics for real-user Core Web Vitals monitoring, and the internal Delivery Monitoring system's metric collection (FCM success rate, queue depth) so the Admin Dashboard has real data from day one of production traffic.
3511:  
3512: Execute the Production Launch Checklist in full (Section 27 of this document) — domain/DNS cutover, SSL verification, production environment variable audit, Razorpay live-mode key swap, FCM production credentials, and a final smoke test against the production URL before announcing launch.
3513:  
3514: Document a basic incident-response runbook (who gets paged, where to check first — Delivery Monitoring, Sentry, Vercel deployment logs) so the small founding team has a clear first-30-minutes playbook for a production incident.
3515:  
3516: Run a final cross-browser manual QA pass (Chrome, Edge, Firefox on desktop; Chrome on Android) specifically exercising the push-subscription permission prompt and a real end-to-end test-notification delivery on each, since this is the one part of the product that cannot be fully validated by automated tests alone — browser push permission UI is outside the reach of a headless test runner.
3517:  
3518: SUCCESS CRITERIA:
3519: - CI blocks any PR that fails lint, typecheck, tests, or the Lighthouse gate from merging to main.
3520: - All five critical end-to-end flows listed above pass automated integration tests against a staging environment before each production deploy.
3521: - A deliberately triggered client-side error and a deliberately triggered API exception both appear in Sentry with a readable, source-mapped stack trace within two minutes.
3522: - The Production Launch Checklist is fully executed and signed off, and a real signup-through-first-notification flow succeeds against the live production URL.
3523:  
3524: FILES TO CREATE/MODIFY:
3525: - tests/unit/**/*.test.ts
3526: - tests/integration/**/*.test.ts
3527: - .github/workflows/ci.yml
3528: - .github/workflows/deploy.yml
3529: - sentry.client.config.ts
3530: - sentry.server.config.ts
3531: - docs/incident-response-runbook.md
3532: 	Supplementary Master Prompts
3533: These seven prompts give deeper, standalone implementation detail for cross-cutting systems referenced across multiple phases above (primarily Phases 4, 7, 8, 9, 10, and 12). Feed each to your AI coding agent at the point in the build where the corresponding phase calls for it.
3534: Database Schema Prompt
3535: DATABASE SCHEMA PROMPT
3536:  
3537: Design and implement the complete database schema for Prontly Notify.
3538: Database: Cloudflare D1 (serverless SQLite, edge-replicated)
3539:  
3540: Entity: users — Purpose: one row per human login (customers + internal staff)
3541:   Fields: id (TEXT/UUID, PK), firebase_uid (TEXT, unique), email (TEXT, unique),
3542:   name, avatar_url, email_verified (BOOL), is_staff (BOOL), staff_role (TEXT,
3543:   nullable), notification_prefs (JSON), last_login_at, created_at, updated_at
3544:   Indexes: UNIQUE(firebase_uid), UNIQUE(email)
3545:   Security: row readable/writable only by its own user; staff rows additionally
3546:   readable by other staff
3547:  
3548: Entity: workspaces — Purpose: the billing/tenant root entity
3549:   Fields: id (PK), owner_user_id (FK users), name, plan_id (FK plans),
3550:   razorpay_customer_id, default_timezone, created_at, updated_at
3551:   Indexes: INDEX(owner_user_id)  |  Relationships: 1 workspace → many sites,
3552:   workspace_members, invoices, api_keys; 1 workspace → 1 subscriptions row
3553:   Security: Owner/Admin (team role) full access; Member read-only, non-billing fields
3554:  
3555: Entity: workspace_members — Purpose: team membership + role within a workspace
3556:   Fields: id (PK), workspace_id (FK), user_id (FK, nullable until accepted),
3557:   invited_email, role ('owner'|'admin'|'member'), site_access (JSON: 'all' or
3558:   site-ID array), status ('active'|'pending'), invited_at, joined_at
3559:   Indexes: INDEX(workspace_id), INDEX(user_id)
3560:  
3561: Entity: sites — Purpose: a registered website with its own FCM/VAPID credentials
3562:   Fields: id (PK), workspace_id (FK), name, domain, category, platform,
3563:   vapid_public_key, vapid_private_key (AES-256-GCM encrypted at write time),
3564:   install_status ('pending'|'verified'|'broken'), onboarding_step (0-3),
3565:   sending_enabled (BOOL, default true), created_at, updated_at
3566:   Indexes: INDEX(workspace_id), UNIQUE(domain, workspace_id)
3567:  
3568: Entity: subscribers — Purpose: one row per browser push subscription (highest-volume table)
3569:   Fields: id (PK), site_id (FK), fcm_token (unique per site), browser, os,
3570:   country, city, status ('active'|'unsubscribed'), subscribed_at, last_seen_at,
3571:   unsubscribed_at
3572:   Indexes: INDEX(site_id, status), UNIQUE(site_id, fcm_token),
3573:   INDEX(site_id, last_seen_at)
3574:   Security: never returned in raw token form beyond what the Subscribers table needs
3575:  
3576: Entity: subscriber_attributes — Purpose: flexible key-value tags per subscriber
3577:   Fields: id (PK), subscriber_id (FK), key (max 64 chars), value (max 256 chars),
3578:   updated_at  |  Indexes: INDEX(subscriber_id), INDEX(key, value)
3579:  
3580: Entity: segments — Purpose: saved/dynamic audience definitions
3581:   Fields: id (PK), site_id (FK), name, type ('manual'|'dynamic'|'ai_suggested'),
3582:   rule_json, subscriber_count_cached (INT), created_by_user_id (FK, nullable),
3583:   created_at, updated_at  |  Indexes: INDEX(site_id)
3584:  
3585: Entity: campaigns — Purpose: a single push notification campaign
3586:   Fields: id (PK), site_id (FK), title (max 65 chars), body (max 240 chars),
3587:   icon_url, image_url, click_url, action_buttons (JSON, max 2), segment_id (FK,
3588:   nullable = all subscribers), status ('draft'|'scheduled'|'sending'|'sent'|'failed'),
3589:   scheduled_at, sent_at, ai_generated (BOOL), created_by_user_id, created_at, updated_at
3590:   Indexes: INDEX(site_id, status), INDEX(site_id, scheduled_at)
3591:  
3592: Entity: campaign_stats — Purpose: pre-aggregated per-campaign counters
3593:   Fields: campaign_id (PK, FK), sent_count, delivered_count, failed_count,
3594:   click_count (all INT, default 0, atomically incremented), updated_at
3595:  
3596: Entity: campaign_deliveries — Purpose: per-subscriber delivery record (90-day retention)
3597:   Fields: id (PK), campaign_id (FK), subscriber_id (FK), status
3598:   ('pending'|'delivered'|'failed'|'clicked'), error_code, sent_at, delivered_at,
3599:   clicked_at  |  Indexes: INDEX(campaign_id, status)
3600:  
3601: Entity: automations — Fields: id (PK), site_id (FK), name, trigger_type
3602:   ('new_subscriber'|'tag_added'|'page_visited'|'inactive_days'|'ai_suggested'),
3603:   trigger_config (JSON), status ('active'|'paused'|'draft'), created_at, updated_at
3604:  
3605: Entity: automation_steps — Fields: id (PK), automation_id (FK), step_order (INT),
3606:   type ('wait'|'send'|'condition'), config (JSON)
3607:   Indexes: INDEX(automation_id, step_order)
3608:  
3609: Entity: automation_runs — Purpose: per-subscriber progress through an automation
3610:   Fields: id (PK), automation_id (FK), subscriber_id (FK), current_step_id
3611:   (FK, nullable), status ('active'|'completed'|'exited'), next_action_at,
3612:   started_at, completed_at  |  Indexes: INDEX(status, next_action_at) — the
3613:   primary index the Cron worker scans every tick
3614:  
3615: Entity: plans — Fields: id (PK, e.g. 'free'/'growth'), name, price_monthly,
3616:   price_annual (INT, paise), subscriber_limit, site_limit, ai_credit_limit,
3617:   team_seat_limit (INT, -1 = unlimited), features (JSON)
3618:  
3619: Entity: subscriptions — Fields: id (PK), workspace_id (FK, unique), plan_id (FK),
3620:   razorpay_subscription_id (unique, nullable), status ('active'|'past_due'|
3621:   'canceled'|'trialing'), current_period_start, current_period_end, created_at, updated_at
3622:  
3623: Entity: invoices — Fields: id (PK), workspace_id (FK), razorpay_invoice_id, amount,
3624:   currency, status, invoice_pdf_url (R2), created_at  |  Indexes: INDEX(workspace_id, created_at)
3625:  
3626: Entity: coupons — Fields: id (PK), code (unique), type ('percent'|'flat'), value,
3627:   max_redemptions, redemption_count, eligible_plan_ids (JSON), expires_at, status
3628:  
3629: Entity: ai_usage — Fields: id (PK), workspace_id (FK), month ('YYYY-MM'), feature,
3630:   credits_used (INT)  |  Indexes: UNIQUE(workspace_id, month, feature)
3631:  
3632: Entity: api_keys — Fields: id (PK), workspace_id (FK), name, key_hash (SHA-256,
3633:   raw key never stored), key_prefix (first 8 chars), scopes (JSON array),
3634:   created_by_user_id, last_used_at, created_at, revoked_at
3635:  
3636: Entity: blog_posts — Fields: id (PK), title, slug (unique), body_mdx, excerpt,
3637:   featured_image_url, category, tags (JSON), status ('draft'|'scheduled'|
3638:   'published'), seo_title, seo_description, author_id (FK), published_at,
3639:   created_at, updated_at
3640:  
3641: Entity: audit_logs — Purpose: immutable staff-action record, never updated/deleted
3642:   Fields: id (PK), actor_user_id (FK), action, target_type, target_id, reason
3643:   (required for destructive actions), metadata (JSON), created_at
3644:   Indexes: INDEX(actor_user_id, created_at), INDEX(target_type, target_id)
3645:  
3646: Entity: feature_flags — Fields: id (PK), key (unique), name, status
3647:   ('on'|'off'|'rollout'), rollout_percentage (0-100), eligible_plan_ids (JSON),
3648:   updated_at
3649:  
3650: Migrations / Seed Data:
3651: Seed the plans table with Free/Starter/Growth/Scale rows matching the Business
3652: Model Blueprint's pricing table before any other phase runs. For local/staging
3653: testing, seed one demo workspace with one verified demo site, 200 synthetic
3654: subscribers across varied browser/OS/country combinations, and 5 sample campaigns
3655: in mixed statuses (draft, scheduled, sent) so every dashboard screen has realistic
3656: data to render against from the first day of frontend development.
3657: 	API Architecture Prompt
3658: API ARCHITECTURE PROMPT
3659:  
3660: Design and implement the complete API layer for Prontly Notify.
3661:  
3662: API Structure:
3663: - Base URL pattern: /api/v1/[resource]
3664: - Auth: Firebase ID token (Bearer, dashboard/first-party) OR scoped API key
3665:   (Bearer, developer/REST integrations) — both resolve to one auth-context shape
3666: - Response format: { success: boolean, data: any, error?: string, meta?: object }
3667: - Pagination: cursor-based on every list endpoint (never offset-based)
3668:  
3669: Resource: sites
3670:   GET    /api/v1/sites              — List (workspace-scoped)
3671:   POST   /api/v1/sites              — Create (enforces plan site_limit)
3672:   GET    /api/v1/sites/:id          — Get single
3673:   PATCH  /api/v1/sites/:id          — Update
3674:   DELETE /api/v1/sites/:id          — Delete
3675:   Auth: Authenticated, scoped to workspace_members.site_access
3676:   Validation: Zod — domain format, unique-per-workspace
3677:   Rate Limiting: 100 req/min per workspace
3678:  
3679: Resource: subscribers
3680:   POST /api/v1/sites/:id/subscribers          — Public (site-key auth, SDK-originated)
3681:   GET  /api/v1/sites/:id/subscribers           — Authenticated, scoped, paginated, filterable
3682:   POST /api/v1/sites/:id/subscribers/export    — Authenticated, scoped, async job
3683:   Rate Limiting: ingestion endpoint 60 req/min per site (anti-poisoning)
3684:  
3685: Resource: segments / campaigns / automations
3686:   Standard GET (list) / POST (create) / GET :id / PATCH :id / DELETE :id pattern
3687:   Plus: POST /campaigns/:id/send, POST /campaigns/:id/duplicate,
3688:   POST /segments/:id/preview-count
3689:   Auth: Authenticated, scoped  |  Validation: title/body length limits, rule_json
3690:   schema enforcement  |  Rate Limiting: 100 req/min per workspace
3691:  
3692: Resource: ai
3693:   POST /api/v1/ai/generate-title, /optimize-ctr, /suggest-send-time,
3694:   /campaign-recommendations  |  GET /api/v1/ai/suggest-segments,
3695:   /analytics-summary, /usage
3696:   Auth: Authenticated, scoped, AI-credit metered against ai_usage
3697:   Rate Limiting: 20 req/min per workspace (LLM-call-bound, higher cost per request)
3698:  
3699: Resource: billing
3700:   GET /api/v1/billing/plans (public), GET /subscription, POST /change-plan,
3701:   POST /cancel, POST /webhook (Razorpay signature-verified)
3702:   Auth: Owner/Admin role only (except plans + webhook)
3703:  
3704: Resource: admin (staff-only, never reachable via customer API keys)
3705:   GET /api/v1/admin/overview, /accounts, /sites; POST /accounts/:id/suspend,
3706:   /accounts/:id/impersonate, /sites/:id/disable-sending
3707:   GET/PATCH /api/v1/admin/audit-logs, /feature-flags (super_admin only)
3708:   Auth: Staff is_staff=true, staff_role checked per-route
3709:  
3710: Global Middleware Stack (applied in order):
3711: 1. CORS configuration — session requests restricted to app origin; API-key
3712:    requests allowed broader CORS for customer-side SDK use
3713: 2. Rate limiting — sliding window, tiered per resource as specified above
3714: 3. Request logging — structured logs (request ID, route, auth context, latency)
3715: 4. Auth verification — resolves Firebase token or API key into
3716:    { userId|apiKeyId, workspaceId, role, scopes }
3717: 5. Input sanitization — strip/escape HTML in free-text fields before validation
3718: 6. Zod schema validation — endpoint-specific, rejects malformed payloads
3719: 7. Response formatting — wraps handler output in the standard envelope
3720: 	SEO Master Prompt
3721: SEO MASTER PROMPT
3722:  
3723: Implement a complete SEO system for Prontly Notify.
3724:  
3725: 1. Meta Tag System
3726:    - Dynamic title: "[Page Title] | Prontly Notify"
3727:    - Meta description: unique per page, 150-160 chars, sourced from blog_posts.
3728:      seo_description or page-specific static config
3729:    - Canonical URLs on every route to prevent duplicate-content issues from
3730:      query-param variants (e.g., Blog category filters)
3731:    - Robots meta: index/follow on all public routes; noindex/nofollow injected
3732:      automatically for every /dashboard and /admin route via the layout
3733:  
3734: 2. OpenGraph Tags
3735:    - og:title, og:description, og:image (1200x630px, generated per Blog post
3736:      via the Next.js image-response API), og:url, og:type, og:site_name
3737:    - Twitter card: summary_large_image
3738:  
3739: 3. Structured Data / Schema.org
3740:    - Home: Organization, WebSite, FAQPage
3741:    - Pricing: Product, Offer (per plan)
3742:    - Blog Listing/Detail: Blog, BlogPosting, Person (author), BreadcrumbList
3743:    - Docs Hub: TechArticle, BreadcrumbList, HowTo (platform install pages)
3744:    - FAQ: FAQPage on every question/answer pair
3745:  
3746: 4. Sitemap
3747:    - Auto-generated sitemap.xml (app/sitemap.ts) including every static
3748:      marketing route, every published blog_posts slug, and every Docs Hub
3749:      platform/comparison page
3750:    - Include priority and lastmod per entry; lastmod sourced from
3751:      blog_posts.updated_at for content pages
3752:    - Submit URL: Google Search Console + Bing Webmaster Tools at launch
3753:  
3754: 5. Robots.txt
3755:    User-agent: *
3756:    Allow: /
3757:    Disallow: /dashboard/
3758:    Disallow: /admin/
3759:    Disallow: /api/
3760:    Sitemap: https://prontly.in/sitemap.xml
3761:  
3762: 6. Performance SEO
3763:    - Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1
3764:    - Image optimization: WebP, lazy loading below the fold, explicit
3765:      width/height on every <Image> to prevent layout shift
3766:    - Preconnect to fonts.googleapis.com, the R2 public CDN domain, and the
3767:      Firebase Auth domain
3768:    - Critical CSS inlined for Home and Pricing above-the-fold content
3769: 	Security Implementation Prompt
3770: SECURITY IMPLEMENTATION PROMPT
3771:  
3772: Implement a complete security layer for Prontly Notify.
3773: Security Priority: High (multi-tenant SaaS handling subscriber PII + payment data)
3774:  
3775: 1. API Security
3776:    - Firebase ID token validation on every protected route via Next.js middleware
3777:    - Token lifetime managed by Firebase SDK (short-lived ID token, silent
3778:      refresh) — no custom JWT issuance to maintain
3779:    - Scoped API keys for developer integrations: read vs. write scopes enforced
3780:      per endpoint; revoked keys rejected immediately (checked on every request,
3781:      not cached)
3782:  
3783: 2. Input Validation & Sanitization
3784:    - Validate all inputs server-side with Zod — never trust client-side
3785:      validation alone
3786:    - Sanitize HTML in campaign body, segment names, and blog post content to
3787:      prevent stored XSS
3788:    - Parameterized queries only via the scoped D1 query-builder layer — no
3789:      string-concatenated SQL anywhere in the codebase
3790:    - File upload validation (R2 uploads): enforce content-type allowlist
3791:      (image/png, image/webp, image/jpeg) and a max file size (2MB for
3792:      notification icons, 5MB for blog images)
3793:  
3794: 3. CSRF Protection
3795:    - SameSite=Strict on the session cookie
3796:    - Double-submit CSRF token on every dashboard form POST/PATCH/DELETE
3797:    - Origin header validation on state-changing requests as a second layer
3798:  
3799: 4. Rate Limiting
3800:    - Auth endpoints (login, signup, forgot-password): 5 requests / 15 minutes per IP
3801:    - Subscriber ingestion endpoint: 60 requests / minute per site
3802:    - Authenticated API endpoints: 100 requests / minute per workspace
3803:    - AI endpoints: 20 requests / minute per workspace (LLM-cost-aware limit)
3804:    - Public marketing-site endpoints (contact form, newsletter): 10 requests /
3805:      minute per IP
3806:    - Return 429 with a Retry-After header on every limit
3807:  
3808: 5. HTTP Security Headers
3809:    - Content-Security-Policy scoped to Firebase, Razorpay Checkout, GA4, and
3810:      the application's own origin
3811:    - X-Frame-Options: DENY
3812:    - X-Content-Type-Options: nosniff
3813:    - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
3814:    - Referrer-Policy: strict-origin-when-cross-origin
3815:  
3816: 6. Authentication Security
3817:    - Password hashing fully delegated to Firebase Authentication (no
3818:      application-managed password storage)
3819:    - Brute-force lockout behavior inherited from Firebase Auth's built-in
3820:      anomaly detection, supplemented by the rate limits above
3821:    - 2FA support (TOTP) available from Account Settings, recommended at
3822:      onboarding for Owner-role accounts
3823:  
3824: [High security priority — additionally implemented]:
3825:    - Full audit logging on every staff/admin mutation (see audit_logs schema)
3826:    - Encryption at the application layer (AES-256-GCM) for site-level VAPID
3827:      private keys before any database write
3828:    - A documented penetration-test checklist executed before the Production
3829:      Launch Checklist is signed off (auth bypass attempts, cross-tenant data
3830:      access attempts, rate-limit evasion, file-upload exploitation)
3831: 	Performance Optimization Prompt
3832: PERFORMANCE OPTIMIZATION PROMPT
3833:  
3834: Optimize Prontly Notify for production performance.
3835:  
3836: 1. Image Optimization
3837:    - Convert all uploaded campaign icons/images and blog images to WebP on
3838:      upload, stored in R2 at multiple responsive sizes
3839:    - Implement responsive images with srcset via next/image everywhere
3840:    - Lazy load below-fold images (Blog Listing cards, About team grid)
3841:    - Set explicit width/height on every image to prevent CLS
3842:    - Serve all image assets via the Cloudflare CDN
3843:  
3844: 2. Code Splitting & Loading
3845:    - Route-based code splitting (automatic via Next.js App Router)
3846:    - Dynamic imports specifically for the Automation flow canvas and the
3847:      chart-heavy Analytics screen, each with a matching Skeleton fallback
3848:    - Preload the Campaign Builder route from Dashboard Home on hover/focus
3849:      of the 'New Campaign' button, since it's the highest-frequency next action
3850:    - Remove unused CSS via Tailwind's built-in purge in production builds
3851:  
3852: 3. Caching Strategy
3853:    - Static assets: Cache-Control: max-age=31536000, immutable
3854:      (content-hashed filenames)
3855:    - Marketing/SEO pages: ISR with 1-hour revalidation
3856:    - Dashboard-summary and analytics API responses: 60-second server-side cache
3857:      to absorb rapid re-renders without re-querying D1 per interaction
3858:    - Per-site service-worker bundle: long-lived CDN cache
3859:  
3860: 4. Pagination & Data Loading
3861:    - Cursor-based pagination on Subscribers, Campaigns History, and Audit Logs
3862:    - Skeleton loaders matching final content shape for every async screen
3863:    - Infinite scroll on Subscribers (mobile) with a manual 'Load more'
3864:      keyboard/screen-reader-accessible fallback
3865:    - Debounce search inputs at 300ms (Subscribers search, Docs search)
3866:  
3867: 5. Database Performance
3868:    - Indexes on every foreign key and every field used in a WHERE/ORDER BY
3869:      clause, per the Backend Schema document's index list for all 21 entities
3870:    - Avoid N+1 queries: batch-fetch campaign_stats alongside campaigns list
3871:      queries via a single join rather than per-row follow-up queries
3872:    - Run EXPLAIN QUERY PLAN against subscribers/campaigns/
3873:      campaign_deliveries list queries at simulated 100,000+ row scale
3874:  
3875: 6. Bundle Optimization
3876:    - Analyze bundle with @next/bundle-analyzer in CI, flag any single route
3877:      bundle exceeding 200KB initial JS
3878:    - Tree-shake unused exports from recharts, lucide-react, and date-fns
3879:      (import only the specific icons/functions used, never the full library)
3880:    - Brotli/gzip compression enabled at the Vercel edge (default, verified
3881:      not disabled)
3882:  
3883: Target Metrics:
3884: - PageSpeed Score: 90+ mobile, 95+ desktop
3885: - LCP: < 2.5 seconds  |  INP: < 200ms  |  CLS: < 0.1
3886: - Initial JS bundle: < 200KB on Home and Pricing
3887: 	Deployment Prompt
3888: DEPLOYMENT PROMPT
3889:  
3890: Set up production deployment for Prontly Notify on Vercel.
3891:  
3892: 1. Environment Configuration
3893:    - .env.local for development (gitignored)
3894:    - Production secrets set directly in the Vercel project dashboard, never
3895:      committed to git
3896:    - Full environment variable checklist: see the Project Architecture
3897:      Prompt's 'Environment Variables Required' list — every variable there
3898:      must be present in both Preview and Production Vercel environments
3899:      before the first deploy of each
3900:  
3901: 2. CI/CD Pipeline (GitHub Actions)
3902:    - On PR: run lint, typecheck, unit + integration tests, Lighthouse CI gate
3903:    - On merge to main: re-run the full suite, run D1 migrations, then deploy
3904:      directly to production (continuous deployment — no separate staging-
3905:      promotion gate for this team size)
3906:    - Notify the team Slack channel on any CI failure or failed production deploy
3907:  
3908: 3. Production Deployment
3909:    - Build command: next build  |  Output: .next (Vercel-native, no custom
3910:      output directory needed)
3911:    - Node.js version: 20.x (pinned in package.json engines field)
3912:    - Domain: connect prontly.in (or the chosen production domain) to the
3913:      Vercel project, configure DNS A/CNAME records per Vercel's instructions
3914:    - SSL: auto-provisioned via Vercel's built-in Let's Encrypt integration
3915:  
3916: 4. Monitoring & Observability
3917:    - Error tracking: Sentry, client + server, with CI-uploaded source maps
3918:    - Performance monitoring: Vercel Analytics for Core Web Vitals
3919:    - Uptime monitoring: BetterStack (or UptimeRobot) synthetic checks against
3920:      the marketing site and an authenticated API health endpoint
3921:    - Log aggregation: Vercel's built-in function logs, forwarded to a log
3922:      drain for retention beyond Vercel's default window
3923:  
3924: 5. Production Checklist
3925:    - [ ] All environment variables set in production (cross-checked against
3926:          the Project Architecture Prompt's full list)
3927:    - [ ] D1 migrations run and verified against production
3928:    - [ ] R2 buckets created with correct public/private access rules per the
3929:          Backend Schema's Storage Architecture table
3930:    - [ ] CDN configured and tested for sites/*, blog/*, and avatars/* prefixes
3931:    - [ ] Custom 404 and 500 error pages styled and tested
3932:    - [ ] robots.txt and sitemap.xml verified at the production URL
3933:    - [ ] Google Search Console and Bing Webmaster Tools connected
3934:    - [ ] GA4 tracking verified firing on a real production pageview
3935:    - [ ] SSL certificate active and HSTS header confirmed
3936:    - [ ] Security headers verified via an external header-scan tool
3937:    - [ ] Razorpay live-mode keys and webhook URL configured (not test-mode)
3938:    - [ ] FCM production service-account credentials configured (not a
3939:          development Firebase project)
3940:    - [ ] D1 backup/export strategy documented and a manual restore tested
3941:          at least once before launch
3942: 	Legal Pages Prompt
3943: LEGAL PAGES PROMPT
3944:  
3945: Generate and implement all required legal pages for Prontly Notify.
3946:  
3947: 1. Privacy Policy
3948:    - Data collected: account info (name, email), site/subscriber metadata
3949:      (browser, OS, country/city — never raw IP), usage/analytics data, cookies
3950:    - How data is used: service delivery, AI-feature processing (aggregate-only,
3951:      per the AI Integration Blueprint's data-handling principles), billing
3952:    - Third-party services disclosed by name: Firebase (Google) for auth and
3953:      push delivery, Cloudflare for hosting/storage, Razorpay for payments,
3954:      Google Analytics 4, and the LLM provider powering AI features
3955:    - User rights: access, deletion, export (linked to the Account Settings
3956:      'Export my data' flow from the Security Implementation Prompt)
3957:    - Cookie policy: essential session cookies (exempt) vs. GA4 analytics
3958:      cookies (consent-gated)
3959:    - GDPR section (EU subscribers) and India DPDPA 2023 section (primary
3960:      market) with a named grievance-redressal contact
3961:    - 'Last updated' date, version-tracked in the CMS
3962:  
3963: 2. Terms of Service
3964:    - Acceptance of terms (required checkbox at Signup)
3965:    - Description of service: browser push notification SaaS platform
3966:    - Acceptable use: prohibits sending unsolicited, deceptive, or illegal

(Output capped at 50 KB. Showing lines 3229-3966. Use offset=3967 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 10.8s)

_Thinking:_

Let me read the remaining portion of this very large document.

**Tool: read**

**Input:**
```json
{
  "offset": 3967,
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt"
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
3967:      content via the platform — directly enforceable via the sending_enabled
3968:      kill-switch described in the Security Architecture document
3969:    - Subscription terms: billing cycle, auto-renewal, cancellation policy
3970:      (cross-referenced with the Billing & Subscription screen's flow)
3971:    - Limitation of liability and service-availability disclaimer
3972:    - Termination conditions (by user, and by Prontly Notify for ToS violations,
3973:      mirroring the admin Suspend/Disable Sending actions)
3974:  
3975: 3. Cookie Policy
3976:    - Itemized cookie list: session cookie (essential), GA4 cookies
3977:      (_ga, _gid — analytics, consent-gated)
3978:    - Consent banner behavior: GA4 cookies blocked until explicit consent;
3979:      essential session cookie exempted per standard guidance
3980:  
3981: 4. Refund Policy
3982:    - Free plan: not applicable (no payment taken)
3983:    - Paid plans: pro-rated refund window (e.g., 7 days from initial charge
3984:      for first-time subscribers), no refunds for renewal charges past that
3985:      window, refund request path via Contact
3986:  
3987: Implementation: render all four pages from versioned MDX/CMS entries (not
3988: hardcoded JSX) so legal/compliance staff can update language without an
3989: engineering deploy; each page displays its 'Last updated' date prominently
3990: and is included in sitemap.xml as an indexable, trust-building page rather
3991: than being noindexed.
3992: 	Screen-wise Prompts (All 36 Screens)
3993: Every screen below carries the complete 14-field specification — mobile-first, with tablet and desktop adaptations described explicitly rather than assumed. Feed each block to your AI coding agent when Phase 5/6/7's screen-build step reaches that screen.
3994: Public Pages
3995: Screen: Home / Landing Page
3996: Purpose: Convert cold traffic into free-trial signups by explaining the value of browser push notifications in under 5 seconds.
3997: User Goal: Understand what Prontly Notify does and whether it solves their re-engagement problem.
3998: Business Goal: Maximize signup conversion and minimize bounce on the highest-traffic page.
3999: Mobile Layout: 1) Sticky header: logo left, hamburger right  2) Hero: headline + subheadline stacked, single primary CTA full-width, live notification-preview mockup below  3) Trust bar: 'Trusted by 2,000+ websites' + 4 partner logos in a horizontal scroll strip  4) How it works: 3 numbered steps stacked vertically with icon + 1-line copy  5) Feature grid: 2-column icon cards (Campaigns, Automation, AI, Analytics, Segmentation, Multi-site)  6) Live demo widget: tappable 'See a sample push' button that triggers a real browser permission demo  7) Pricing teaser: 3 plan cards stacked, 'View full pricing' link  8) Testimonial carousel: 1 card visible, swipe  9) Integration logos: WordPress, Shopify, Webflow, custom HTML grid  10) FAQ accordion (5 items)  11) Final CTA band: full-width gradient, 'Start free' button  12) Footer: stacked link columns, app store-style badges omitted (web-only)
4000: Tablet Layout: Feature grid becomes 3-column; hero mockup moves beside headline in a 2-column split at 768px; testimonials show 2 cards side by side.
4001: Desktop Layout: Full-width hero with headline+CTA on the left (55%) and an animated glassmorphic notification-stack mockup on the right (45%); sticky nav with dropdown for Product/Solutions/Pricing/Docs; feature grid becomes 3x2; pricing teaser becomes 3 cards side-by-side with center plan elevated; testimonial carousel becomes a 3-card row.
4002: Components: Navbar (transparent-to-solid on scroll); Hero mockup (animated SVG push notification stack); Logo marquee; Feature card (icon, title, 1-line desc); Pricing card (default/featured); Testimonial card (avatar, quote, company); FAQ accordion item; Sticky mobile CTA bar
4003: CTA Strategy: Primary: 'Start Free — No Card Required' (primary blue, hero + sticky mobile bar + final band). Secondary: 'Watch 90-sec demo' (ghost, beside primary in hero).
4004: User Journey: Arrives from organic search, paid ads, or referral → explores hero/features/pricing → clicks Start Free → Signup screen.
4005: State Management: Static marketing content (ISR-cached); live subscriber-count + logo bar pulled from a public stats API on a 24h cache.
4006: API Calls: GET /api/v1/public/stats (subscriber count, sites count); POST /api/v1/leads/demo-request (optional waitlist capture)
4007: SEO Requirements: Title: 'Prontly Notify — Browser Push Notifications for Websites'. Meta: 150-160 char value prop. Schema: Organization + WebSite + FAQPage. OG image: 1200x630 branded hero.
4008: Accessibility: All CTAs reachable by keyboard with visible focus ring; hero animation respects prefers-reduced-motion; logo marquee pausable; contrast 4.5:1 minimum on dark background.
4009: 	
4010: 
4011: Screen: Pricing
4012: Purpose: Let visitors self-select the right plan and remove billing-related objections before signup.
4013: User Goal: Compare plans by subscriber volume and feature need, estimate true monthly cost.
4014: Business Goal: Drive upgrades to paid tiers and reduce 'contact sales' friction for mid-market buyers.
4015: Mobile Layout: 1) Header  2) Page title + monthly/annual toggle (full-width segmented control)  3) Plan cards stacked vertically, 'Most Popular' badge on Growth  4) Feature comparison: collapsible accordion per plan instead of a wide table  5) FAQ block (billing, cancellation, data export)  6) Final CTA band  7) Footer
4016: Tablet Layout: Plan cards become a horizontal 2-column grid (3rd plan wraps below); comparison table becomes a real scrollable table.
4017: Desktop Layout: 3 (or 4, including Enterprise) plan cards side-by-side, center/featured plan visually elevated with border glow; full feature-comparison table below with sticky first column; annual/monthly toggle shows 'Save 20%' badge.
4018: Components: Segmented toggle (monthly/annual); Pricing card (featured variant); Comparison table; FAQ accordion; Enterprise contact card (ghost style)
4019: CTA Strategy: Primary: 'Start Free' per card. Secondary: 'Talk to Sales' on Enterprise card. Micro: 'See full feature list' anchor.
4020: User Journey: Arrives from nav, home pricing teaser, or in-app upgrade prompt → selects plan → Signup (with plan pre-selected in query param) or in-app Billing screen if already authenticated.
4021: State Management: Plan/feature data fetched server-side at build (ISR); subscriber-volume slider recalculates price client-side.
4022: API Calls: GET /api/v1/billing/plans
4023: SEO Requirements: Title: 'Pricing — Prontly Notify'. Schema: Product + Offer per plan. Canonical self-referencing.
4024: Accessibility: Toggle is a real radio-group with ARIA roles; price changes announced via aria-live region; table has scoped headers for screen readers.
4025: 	
4026: 
4027: Screen: Integrations & Docs Hub
4028: Purpose: Show technical buyers exactly how Prontly Notify integrates with their stack (WordPress, Shopify, custom JS) before they commit.
4029: User Goal: Confirm integration is fast (under 5 minutes) and find the right SDK snippet for their platform.
4030: Business Goal: Reduce pre-signup technical objections; rank for 'web push notification + [platform]' SEO terms.
4031: Mobile Layout: 1) Header  2) Search bar for docs (full-width)  3) Platform grid: WordPress, Shopify, Webflow, Wix, Custom HTML/JS, REST API — 2-column icon tiles  4) Quick-start code block (copyable) for the selected platform  5) Related articles list  6) Footer
4032: Tablet Layout: Platform grid becomes 3-column; sidebar nav for doc categories appears.
4033: Desktop Layout: Left sidebar: full doc navigation tree (Getting Started, SDK, REST API, Webhooks, Segments API). Center: article content with syntax-highlighted code blocks and copy buttons. Right rail: 'On this page' anchor nav.
4034: Components: Doc sidebar nav; Code block with copy button + language tabs; Search-as-you-type doc search; Platform tile; Breadcrumb
4035: CTA Strategy: Primary: 'Copy install code'. Secondary: 'Start Free' persistent in header.
4036: User Journey: Arrives from search engine landing on a specific doc page, or from in-app Integration/SDK Setup screen → copies snippet → returns to own site to implement → returns to dashboard to verify.
4037: State Management: Static MDX content (ISR); copy-button state is local component state; doc search is client-side fuzzy search over a pre-built index.
4038: API Calls: GET /api/v1/docs/search?q=; GET /api/v1/sites/:id/sdk-snippet (authenticated, pulls real site key into snippet)
4039: SEO Requirements: Title formula: '[Doc Title] | Prontly Notify Docs'. Schema: TechArticle + BreadcrumbList. Programmatic SEO opportunity: one page per platform integration.
4040: Accessibility: Code blocks readable by screen readers with language announced; sidebar nav is a proper <nav> with current-page aria-current.
4041: 	
4042: 
4043: Screen: Blog Listing
4044: Purpose: Build topical authority on push-notification marketing and capture top-of-funnel organic traffic.
4045: User Goal: Find practical guides on growing subscribers and writing better notification copy.
4046: Business Goal: Organic acquisition funnel; internal links push readers toward product pages.
4047: Mobile Layout: 1) Header  2) Featured post card (large image + title)  3) Category filter chips (horizontal scroll)  4) Post card list, single column  5) Newsletter capture inline card  6) Pagination  7) Footer
4048: Tablet Layout: Post grid becomes 2-column.
4049: Desktop Layout: Post grid becomes 3-column with featured post spanning 2 columns at top; sidebar with category list, popular posts, and newsletter signup.
4050: Components: Post card (image, category tag, title, excerpt, read time); Category filter chip; Newsletter inline form; Pagination / load-more
4051: CTA Strategy: Primary: 'Read article' (card click). Secondary: 'Subscribe to newsletter'.
4052: User Journey: Arrives from organic search or internal link → reads listing → opens Blog Detail → CTA inside article drives to Signup or Pricing.
4053: State Management: Posts fetched via ISR with category filter as a query param triggering client-side re-fetch for filtered view.
4054: API Calls: GET /api/v1/blog/posts?category=&page=; POST /api/v1/newsletter/subscribe
4055: SEO Requirements: Title: 'Blog — Prontly Notify'. Paginated pages use rel=next/prev; category pages are real indexable URLs (/blog/category/[slug]).
4056: Accessibility: Filter chips are toggle buttons with aria-pressed state; images have descriptive alt text generated from post title.
4057: 	
4058: 
4059: Screen: Blog Detail
4060: Purpose: Deliver the article and convert engaged readers into trial signups via contextual CTAs.
4061: User Goal: Get the answer/guide they searched for, quickly and without friction.
4062: Business Goal: Maximize scroll depth and click-through on inline/contextual CTAs.
4063: Mobile Layout: 1) Header  2) Title + author/date/read-time meta  3) Hero image  4) Article body, single column, generous line-height  5) Inline CTA card after intro paragraph  6) Share buttons (sticky bottom bar)  7) Author bio card  8) Related posts (2 cards)  9) Comments (optional)  10) Footer
4064: Tablet Layout: Share buttons move to a left-side sticky rail; related posts become 3-card row.
4065: Desktop Layout: Center article column (max 720px) with left sticky share rail and right sticky 'Table of contents' + CTA card rail.
4066: Components: Article renderer (MDX); Inline CTA card; Share button group; Author bio card; Related post card; Table of contents (auto-generated from headings)
4067: CTA Strategy: Primary: contextual inline CTA tied to article topic (e.g., 'Try AI campaign suggestions free'). Secondary: footer newsletter capture.
4068: User Journey: Arrives from search → reads → clicks inline CTA → Signup or Pricing; or browses Related Posts to stay in the funnel.
4069: State Management: Static content (ISR) with revalidation on publish; reading-progress bar is client-side scroll state.
4070: API Calls: GET /api/v1/blog/posts/:slug; GET /api/v1/blog/posts/:slug/related
4071: SEO Requirements: Title: '[Post Title] | Prontly Notify Blog'. Schema: BlogPosting + Person (author) + BreadcrumbList. OG image per post.
4072: Accessibility: Heading hierarchy strictly sequential for screen-reader navigation; share buttons have descriptive aria-labels, not icon-only.
4073: 	
4074: 
4075: Screen: About
4076: Purpose: Build trust with buyers who research the company before committing budget.
4077: User Goal: Understand who is behind the product and whether it is a stable, credible vendor.
4078: Business Goal: Support mid-funnel trust building for B2B/agency buyers.
4079: Mobile Layout: 1) Header  2) Mission statement hero  3) Stats strip (sites served, notifications sent, countries)  4) Team grid (photo, name, role) 2-column  5) Timeline/milestones stacked  6) CTA band  7) Footer
4080: Tablet Layout: Team grid becomes 3-column.
4081: Desktop Layout: Team grid becomes 4-column; timeline becomes a horizontal stepper.
4082: Components: Stat counter (animates on scroll into view); Team member card; Timeline step
4083: CTA Strategy: Primary: 'Start Free'. Secondary: 'View open roles' (if careers page exists).
4084: User Journey: Arrives from footer link or direct navigation → builds trust → returns to Pricing or Signup.
4085: State Management: Fully static (ISR), no dynamic data.
4086: API Calls: None required (static content)
4087: SEO Requirements: Title: 'About Us — Prontly Notify'. Schema: Organization + AboutPage.
4088: Accessibility: Animated counters respect prefers-reduced-motion and provide the final number in a visually-hidden span for screen readers.
4089: 	
4090: 
4091: Screen: Contact
4092: Purpose: Capture sales and support inquiries from prospects not ready to self-serve signup.
4093: User Goal: Reach a human quickly for a pre-sales or partnership question.
4094: Business Goal: Route Enterprise-fit leads to sales without losing them to a dead-end form.
4095: Mobile Layout: 1) Header  2) Page title + short intro  3) Contact form: name, email, company, message, reason dropdown — single column, full-width fields  4) Alternative contact: support email, live chat trigger  5) Footer
4096: Tablet Layout: Form and 'alternative contact' info appear side-by-side (60/40 split).
4097: Desktop Layout: Two-column layout: form on left (60%), company info / map-free address block / response-time expectation card on right (40%).
4098: Components: Form input (text/email/select/textarea) with inline validation; Submit button with loading state; Toast on success/error
4099: CTA Strategy: Primary: 'Send Message'. Secondary: 'Chat with us now' (opens chat widget).
4100: User Journey: Arrives from footer/nav or pricing 'Talk to Sales' → submits form → sees success state → optionally returns to Pricing.
4101: State Management: Controlled form state client-side; submission posts to API and shows toast; honeypot field for spam prevention.
4102: API Calls: POST /api/v1/contact
4103: SEO Requirements: Title: 'Contact Us — Prontly Notify'. Schema: ContactPage.
4104: Accessibility: All fields have associated <label>; errors announced via aria-live=polite; reason dropdown keyboard-navigable.
4105: 	
4106: 
4107: Screen: FAQ
4108: Purpose: Pre-empt common objections (pricing, data privacy, browser support, GDPR) to reduce support load and signup hesitation.
4109: User Goal: Get a fast, specific answer without contacting support.
4110: Business Goal: Reduce support ticket volume; capture long-tail FAQ search traffic.
4111: Mobile Layout: 1) Header  2) Search-within-FAQ input  3) Category tabs (Billing, Technical, Privacy, General) horizontal scroll  4) Accordion list filtered by category  5) 'Still have questions?' CTA to Contact  6) Footer
4112: Tablet Layout: Category tabs become a fixed horizontal row, no scroll needed.
4113: Desktop Layout: Left sidebar category list; right content area with accordion; search bar pinned at top of content area.
4114: Components: FAQ accordion item (single-open or multi-open); Category tab/sidebar item; Inline search with highlight match
4115: CTA Strategy: Primary: 'Contact Support' band at bottom.
4116: User Journey: Arrives from footer, support widget link, or direct search-engine deep link to a specific question → resolves doubt → continues to Signup/Pricing or exits satisfied.
4117: State Management: Static content (ISR); accordion open/close is local state; search filters client-side.
4118: API Calls: None required beyond static content fetch at build
4119: SEO Requirements: Title: 'FAQ — Prontly Notify'. Schema: FAQPage on every question/answer pair for rich-result eligibility.
4120: Accessibility: Accordion triggers use aria-expanded/aria-controls; search input has a descriptive label, not placeholder-only.
4121: 	
4122: 
4123: Screen: Legal Pages (Privacy / Terms / Cookies / Refund)
4124: Purpose: Meet legal/compliance obligations (GDPR, India DPDPA 2023, PCI-DSS scope disclosure) and build trust with privacy-conscious buyers.
4125: User Goal: Verify how their data and their subscribers' data is handled before integrating push notifications.
4126: Business Goal: Reduce legal risk and support enterprise procurement/security review checklists.
4127: Mobile Layout: 1) Header  2) Document title + 'Last updated' date  3) Table of contents (collapsible)  4) Long-form legal text, single column, readable line length  5) Footer
4128: Tablet Layout: Table of contents becomes a sticky left rail.
4129: Desktop Layout: Sticky left TOC rail (25%) + content column (75%) with anchor-linked sections.
4130: Components: Sticky TOC; Anchor-linked section heading
4131: CTA Strategy: Micro: 'Contact our DPO' mailto link within Privacy Policy.
4132: User Journey: Arrives from footer link or during signup ('By signing up you agree to...') → reads relevant section via anchor link → returns to prior flow.
4133: State Management: Fully static (ISR); content sourced from versioned MDX/CMS entries.
4134: API Calls: None — statically generated
4135: SEO Requirements: Title per page e.g. 'Privacy Policy — Prontly Notify'. Marked noindex is NOT used (these should be indexable for trust signals) but excluded from XML sitemap priority weighting.
4136: Accessibility: Proper heading hierarchy for long-document screen-reader navigation; TOC links have descriptive text, not 'click here'.
4137: 	
4138: 
4139: Auth Screens
4140: Screen: Login
4141: Purpose: Authenticate returning users via Firebase Auth and route them to their last-used website's dashboard.
4142: User Goal: Get back into the dashboard in under 10 seconds.
4143: Business Goal: Minimize login friction and abandonment; surface password-reset path clearly.
4144: Mobile Layout: 1) Centered card: logo, 'Welcome back' heading  2) Email field, password field (show/hide toggle)  3) 'Forgot password?' link right-aligned under password field  4) Primary 'Log In' button full-width  5) Divider 'or continue with'  6) Google / GitHub OAuth buttons stacked  7) Footer link: 'New here? Create an account'
4145: Tablet Layout: Card width caps at 420px, centered with more surrounding whitespace; no structural change.
4146: Desktop Layout: Split screen: left 45% glassmorphic brand panel with rotating product screenshots/testimonial; right 55% centered login card.
4147: Components: Auth card; Text input (email); Password input (show/hide); OAuth button (Google/GitHub); Inline error banner
4148: CTA Strategy: Primary: 'Log In'. Secondary: OAuth buttons. Micro: 'Forgot password?' and 'Create an account'.
4149: User Journey: Arrives from expired session redirect, marketing site nav, or direct bookmark → authenticates → Dashboard Home (or onboarding wizard if no website added yet).
4150: State Management: Firebase Auth SDK session state; form validation client-side; loading spinner on submit button during auth call.
4151: API Calls: Firebase Auth signInWithEmailAndPassword / signInWithPopup; GET /api/v1/users/me (post-auth profile + role + workspace fetch)
4152: SEO Requirements: Title: 'Log In — Prontly Notify'. noindex, nofollow (authenticated utility page).
4153: Accessibility: Password visibility toggle has aria-pressed and accessible name; auth errors announced via aria-live; focus moves to email field on load.
4154: 	
4155: 
4156: Screen: Signup
4157: Purpose: Convert visitors into activated accounts with minimum required fields.
4158: User Goal: Create an account fast and get to the value moment (first website added) immediately.
4159: Business Goal: Maximize signup completion rate; capture plan-intent if arriving from Pricing.
4160: Mobile Layout: 1) Centered card: logo, 'Create your free account' heading  2) Name, email, password fields stacked  3) Password strength meter inline  4) Terms checkbox with linked text  5) Primary 'Create Account' button  6) OAuth buttons  7) Footer link: 'Already have an account? Log in'
4161: Tablet Layout: Same as Login tablet treatment — capped width, centered.
4162: Desktop Layout: Split screen mirroring Login, with right panel highlighting '14-day free trial, no credit card' reassurance copy and a checklist of what they get.
4163: Components: Auth card; Password-strength meter; Checkbox with linked terms text; OAuth button
4164: CTA Strategy: Primary: 'Create Account'. Micro: plan-context banner ('You selected the Growth plan') if arriving with a plan query param.
4165: User Journey: Arrives from Home/Pricing CTA or OAuth-first click → account created → Website Onboarding Wizard (never straight to an empty dashboard).
4166: State Management: Form state client-side with real-time validation; on success, Firebase user + D1 user row created via API, JWT/session cookie set.
4167: API Calls: Firebase Auth createUserWithEmailAndPassword / signInWithPopup; POST /api/v1/users (provision D1 user record, default workspace)
4168: SEO Requirements: Title: 'Create Account — Prontly Notify'. noindex, nofollow.
4169: Accessibility: Password strength meter has a text equivalent ('Weak/Medium/Strong'), not color-only; terms checkbox keyboard-toggleable with Space key.
4170: 	
4171: 
4172: Screen: Forgot Password
4173: Purpose: Let locked-out users regain account access without a support ticket.
4174: User Goal: Receive a reset link and get back in.
4175: Business Goal: Reduce support load from password issues.
4176: Mobile Layout: 1) Centered card  2) Heading + short instructional copy  3) Email field  4) 'Send Reset Link' button  5) Success state replaces form with confirmation message + 'resend' link  6) Back to login link
4177: Tablet Layout: No structural change beyond card max-width.
4178: Desktop Layout: Centered card only (no split brand panel — keep this screen minimal and fast).
4179: Components: Auth card; Text input (email); Success confirmation state
4180: CTA Strategy: Primary: 'Send Reset Link'. Micro: 'Back to login'.
4181: User Journey: Arrives from Login 'Forgot password?' link → submits email → sees confirmation → checks email → Reset Password (via Firebase-hosted or custom page) → Login.
4182: State Management: Local form state; success state is a boolean flag swapping form for confirmation message.
4183: API Calls: Firebase Auth sendPasswordResetEmail
4184: SEO Requirements: Title: 'Reset Password — Prontly Notify'. noindex, nofollow.
4185: Accessibility: Confirmation message uses aria-live=polite so screen readers announce success without requiring focus to move.
4186: 	
4187: 
4188: Screen: Email Verification
4189: Purpose: Confirm email ownership before allowing notification-sending privileges (anti-abuse measure).
4190: User Goal: Verify quickly without losing their place in onboarding.
4191: Business Goal: Reduce spam/abuse of the free tier and improve sender-domain reputation.
4192: Mobile Layout: 1) Centered card: illustration, 'Verify your email' heading  2) Instructional copy with masked email shown  3) 'Resend email' button with 60-second cooldown  4) 'Change email' link  5) Auto-detect: page polls verification status and auto-redirects once confirmed
4193: Tablet Layout: No structural change.
4194: Desktop Layout: Centered card only.
4195: Components: Cooldown button (disabled state with countdown); Status poller (invisible, background)
4196: CTA Strategy: Primary: 'Resend Verification Email'. Micro: 'Change email address'.
4197: User Journey: Arrives immediately after Signup → confirms via emailed link in a new tab → original tab auto-detects and redirects to Website Onboarding Wizard.
4198: State Management: Polls Firebase Auth user.reload() every 5s to detect emailVerified flag flip; cooldown timer is local state.
4199: API Calls: Firebase Auth sendEmailVerification; Firebase Auth user.reload() polling
4200: SEO Requirements: noindex, nofollow.
4201: Accessibility: Countdown communicated via visually-hidden live region updates, not purely visual; resend button re-enabled state is announced.
4202: 	
4203: 
4204: Screen: Website Onboarding Wizard
4205: Purpose: Get the user to their first value moment: a working push subscription on their own site, in under 5 minutes.
4206: User Goal: Add their website and confirm the integration is live as fast as possible.
4207: Business Goal: Maximize activation rate (the #1 predictor of retention for this category).
4208: Mobile Layout: 1) Step indicator (1 of 3) at top  2) Step 1: Website URL + name + category dropdown, full-width fields, 'Next' button  3) Step 2: Platform selection (WordPress/Shopify/Custom) as large tappable cards stacked  4) Step 3: Code snippet with copy button + 'I've added it' confirm button that pings a verification endpoint  5) Success state: confetti micro-animation + 'Go to Dashboard' CTA
4209: Tablet Layout: Platform selection cards become a 2-column grid.
4210: Desktop Layout: Centered wizard card (max 640px) with step indicator as a horizontal progress bar with labeled steps; platform cards become a 3-column row.
4211: Components: Step progress indicator; Platform selection card; Code snippet block with copy + verify button; Verification status badge (pending/live); Success state animation
4212: CTA Strategy: Primary per step: 'Next' / 'Verify Installation' / 'Go to Dashboard'. Micro: 'Skip for now, I'll add this later' (still lands user in an empty-state dashboard with a persistent setup banner).
4213: User Journey: Arrives immediately after email verification or signup (existing accounts re-enter here when adding an additional website) → completes 3 steps → Dashboard Home with the new website pre-selected.
4214: State Management: Wizard step stored in local state + persisted to D1 on each step so a refresh resumes progress; verification step polls a backend endpoint that checks for the service-worker registration.
4215: API Calls: POST /api/v1/sites (create website record); GET /api/v1/sites/:id/verify-install (poll for SDK detection); PATCH /api/v1/sites/:id (mark onboarding complete)
4216: SEO Requirements: noindex, nofollow.
4217: Accessibility: Step indicator announces 'Step 1 of 3' via aria-current and visually-hidden text; verification polling status changes are announced via aria-live.
4218: 	
4219: 
4220: User Dashboard
4221: Screen: Dashboard Home
4222: Purpose: Give the user an at-a-glance health check of their push notification program across the active website.
4223: User Goal: Quickly see subscriber growth, recent campaign performance, and anything needing attention.
4224: Business Goal: Surface upgrade triggers (usage near limit) and AI feature discovery contextually.
4225: Mobile Layout: 1) Top bar: website switcher dropdown + notification bell + avatar menu  2) KPI cards stacked: Total Subscribers, Sends Today, Avg CTR, Active Campaigns — 2x2 grid  3) Subscriber growth sparkline chart, full width  4) Recent campaigns list (last 5), card per row  5) AI insight card: 'AI Analytics Summary' contextual tip  6) Quick action buttons: 'New Campaign', 'Invite Team Member' — sticky bottom bar  7) Bottom tab navigation: Home, Subscribers, Campaigns, Analytics, More
4226: Tablet Layout: KPI cards become a 4-column row; quick actions move into the top bar instead of a sticky bottom bar.
4227: Desktop Layout: Persistent left sidebar nav (Dashboard, Subscribers, Campaigns, Automation, Segments, Analytics, AI Tools, Integration, Team, Billing, Settings). Main content: KPI row (4 cards), 2-column split below — growth chart (left, 65%) + AI insight & recent activity feed (right, 35%) — recent campaigns table beneath.
4228: Components: Website switcher dropdown (with 'Add Website' option); KPI stat card (value, delta %, sparkline); Line chart (subscriber growth); Campaign list row (status badge, sent, CTR); AI insight card; Empty state illustration (zero campaigns yet)
4229: CTA Strategy: Primary: 'New Campaign' (sticky/floating). Secondary: 'View All Analytics'. Micro: AI insight card 'Apply this suggestion' link.
4230: User Journey: Arrives immediately after login or onboarding completion → reviews KPIs → navigates to Campaign Builder, Analytics, or Subscribers based on what needs attention.
4231: State Management: KPIs fetched per active website on mount and on website-switch; chart range selectable (7d/30d/90d) re-triggers fetch; skeleton loaders for each card during fetch.
4232: API Calls: GET /api/v1/sites/:id/dashboard-summary; GET /api/v1/sites/:id/campaigns?limit=5; GET /api/v1/ai/insights?site_id=
4233: SEO Requirements: noindex, nofollow.
4234: Accessibility: KPI cards expose value + label in a single accessible name (not just a large visual number); charts include a 'view as table' toggle for screen-reader users.
4235: 	
4236: 
4237: Screen: Website Switcher & Add Website
4238: Purpose: Let users managing multiple websites switch context or register a new site under the same account.
4239: User Goal: Find the right website fast, or add a new one without re-entering billing details.
4240: Business Goal: Support the Multi-Website Management flow that differentiates paid tiers (site limits per plan).
4241: Mobile Layout: 1) Header with 'Your Websites' title + 'Add Website' button  2) Search/filter input  3) Website card list: favicon, name, domain, subscriber count, status badge — stacked  4) Usage indicator: 'Using 2 of 3 sites on Growth plan' progress bar with upgrade link if near limit
4242: Tablet Layout: Website cards become a 2-column grid.
4243: Desktop Layout: 3-column card grid; 'Add Website' as a dashed-border ghost card in the grid itself, consistent with the card pattern.
4244: Components: Website card (favicon, status, subscriber count, last-active); Add-website ghost card; Usage progress bar with upgrade CTA; Search input
4245: CTA Strategy: Primary: 'Add Website' (re-enters Onboarding Wizard step 1). Secondary: 'Upgrade Plan' (shown only near/at site limit).
4246: User Journey: Arrives from sidebar 'Switch Website' or dashboard top-bar dropdown 'Manage Websites' → selects a site to switch active context, or starts Add Website flow → Onboarding Wizard or Dashboard Home.
4247: State Management: List fetched on mount; site-limit check computed client-side from plan metadata returned with the list.
4248: API Calls: GET /api/v1/sites; DELETE /api/v1/sites/:id (with confirmation modal)
4249: SEO Requirements: noindex, nofollow.
4250: Accessibility: Site limit warning is announced via aria-live when the user approaches the cap, not color-only.
4251: 	
4252: 
4253: Screen: Subscribers
4254: Purpose: Let users view, search, filter, and manage their push notification subscriber base.
4255: User Goal: Find specific subscribers, understand growth/churn, and export data when needed.
4256: Business Goal: Demonstrate platform value through visible subscriber growth; surface segmentation upsell.
4257: Mobile Layout: 1) Header: 'Subscribers' + total count badge  2) Filter chips: All, Active, Unsubscribed, by Segment (horizontal scroll)  3) Search input  4) Subscriber list: avatar-less row with browser icon, location, subscribed date, status — stacked cards  5) Floating 'Export CSV' action  6) Infinite scroll pagination
4258: Tablet Layout: List becomes a denser table with 3 visible columns (Subscriber, Location, Status).
4259: Desktop Layout: Full data table: Subscriber ID, Browser/OS icon, Location, Subscribed Date, Last Seen, Segments (tag pills), Status — with column sort, bulk-select checkboxes, and a right-side filter panel (date range, segment, browser, country).
4260: Components: Data table with sort + bulk select; Filter chip / filter panel; Status badge (active/unsubscribed); Export button with format choice (CSV); Empty state (zero subscribers — shows install-verification CTA)
4261: CTA Strategy: Primary: 'Export CSV'. Secondary: 'Create Segment from Filter'. Micro: per-row 'View Details'.
4262: User Journey: Arrives from sidebar nav or Dashboard Home KPI card click-through → filters/searches → exports or creates a segment → Segments screen or Campaign Builder (targeting this segment).
4263: State Management: Server-side pagination and filtering (cursor-based); bulk-select state local; export triggers an async job with a toast notification on completion.
4264: API Calls: GET /api/v1/sites/:id/subscribers?cursor=&filter=; POST /api/v1/sites/:id/subscribers/export; POST /api/v1/segments (from current filter)
4265: SEO Requirements: noindex, nofollow.
4266: Accessibility: Table uses proper <th scope> headers; bulk-select checkboxes have accessible names referencing the row's subscriber ID; infinite scroll has a manual 'Load more' fallback for keyboard/screen-reader users.
4267: 	
4268: 
4269: Screen: Campaign Builder (Compose Notification)
4270: Purpose: The core product screen — compose, target, schedule, and send a push notification campaign.
4271: User Goal: Write an effective notification and send it to the right audience with minimal friction.
4272: Business Goal: Drive feature adoption of AI title generation and CTR optimization (key differentiators vs. competitors).
4273: Mobile Layout: 1) Step tabs: Compose / Target / Schedule / Review (horizontal scroll tabs)  2) Compose step: title field with AI-suggest button inline, message body field with char counter, icon/image upload, URL field, action-buttons editor (optional)  3) Live notification preview card pinned above the keyboard area  4) Target step: audience selector (All Subscribers / Segment picker / AI-suggested segment)  5) Schedule step: Send Now / Schedule for Later (date-time picker) / AI-suggested optimal time chip  6) Review step: summary card + estimated reach + 'Send Campaign' button
4274: Tablet Layout: Preview card moves to a persistent right-side panel (40%) visible across all steps instead of being inline.
4275: Desktop Layout: Two-column layout: left 60% multi-step form (same 4 steps, now as a vertical wizard with all steps visible as collapsible sections rather than tabs), right 40% sticky live preview panel showing the notification exactly as it will render on Chrome/Edge/Firefox with a device toggle.
4276: Components: AI-suggest button (title generator, shows 3 alternative titles in a popover); Live notification preview (per-browser rendering); Audience/segment picker with live reach counter; Date-time scheduler with AI-suggested-time chip; Action-button editor (add up to 2 CTA buttons to the push); Send confirmation modal
4277: CTA Strategy: Primary: 'Send Campaign' / 'Schedule Campaign'. Secondary: 'Save as Draft'. Micro: 'Use AI Suggestion' on title and timing.
4278: User Journey: Arrives from Dashboard 'New Campaign' or Campaigns History 'Duplicate' → completes 4 steps → confirms send → redirected to Campaigns History with the new campaign highlighted, or to Analytics if sent immediately.
4279: State Management: Multi-step form state held in a single reducer; draft auto-saved to D1 every 10s; preview re-renders reactively on every keystroke; reach counter recalculates on audience-step changes (debounced API call).
4280: API Calls: POST /api/v1/ai/generate-title; GET /api/v1/segments/:id/reach-estimate; POST /api/v1/ai/suggest-send-time; POST /api/v1/campaigns (draft or send); POST /api/v1/campaigns/:id/send
4281: SEO Requirements: noindex, nofollow.
4282: Accessibility: Step tabs/sections are keyboard-navigable in order; live preview updates are not the sole feedback — character counters and validation errors are also text-based; AI-suggestion popover is dismissible via Escape and returns focus to the trigger button.
4283: 	
4284: 
4285: Screen: Campaigns History
4286: Purpose: Provide a complete audit and performance log of every campaign sent, scheduled, or drafted.
4287: User Goal: Review what was sent, when, to whom, and how it performed; duplicate a winning campaign.
4288: Business Goal: Surface performance patterns that justify continued/expanded subscription usage.
4289: Mobile Layout: 1) Header + 'New Campaign' button  2) Status filter chips: All, Sent, Scheduled, Draft  3) Campaign card list: title, status badge, sent date, sent count, CTR — stacked  4) Per-card menu: Duplicate, Edit (if draft/scheduled), Delete, View Analytics
4290: Tablet Layout: Cards become a denser 2-column grid for scheduled/draft items; sent campaigns remain a list for chronological scanning.
4291: Desktop Layout: Data table: Title, Status, Audience, Sent/Scheduled Date, Delivered, CTR, Conversions — sortable columns, row-level action menu, bulk actions for draft cleanup.
4292: Components: Data table / card list (responsive switch); Status badge (sent/scheduled/draft/failed); Row action menu; Empty state (zero campaigns — CTA to Campaign Builder)
4293: CTA Strategy: Primary: 'New Campaign'. Micro: per-row 'View Analytics', 'Duplicate'.
4294: User Journey: Arrives from sidebar nav or Dashboard Home 'Recent Campaigns' → reviews list → drills into Analytics for a specific campaign, or duplicates into a new Campaign Builder session.
4295: State Management: Server-paginated list with status filter as query param; optimistic UI removal on delete with undo toast.
4296: API Calls: GET /api/v1/campaigns?status=&cursor=; DELETE /api/v1/campaigns/:id; POST /api/v1/campaigns/:id/duplicate
4297: SEO Requirements: noindex, nofollow.
4298: Accessibility: Row action menus are real <button> triggers for a dropdown menu (not div onclick), fully keyboard operable; status conveyed by both badge color and text label.
4299: 	
4300: 
4301: Screen: Automation / Drip Builder
4302: Purpose: Let users build trigger-based, multi-step notification sequences (welcome series, abandoned-content nudges, re-engagement drips) without manual sending.
4303: User Goal: Set up a notification sequence once and have it run automatically based on subscriber behavior or time.
4304: Business Goal: Differentiate from basic competitors by offering OneSignal-style 'Journeys' as a core (not enterprise-gated) feature, increasing retention.
4305: Mobile Layout: 1) Header: 'Automations' + 'New Automation' button  2) Automation card list: name, trigger type icon, status toggle (active/paused), steps count  3) Tap into an automation opens a vertical step-by-step builder: Trigger card → Step 1 (wait/send) → Step 2 → 'Add Step' button
4306: Tablet Layout: Automation list becomes a 2-column grid; step builder remains vertical but wider with side padding for readability.
4307: Desktop Layout: Left list panel (30%) of all automations; right panel (70%) shows a visual horizontal flow canvas — Trigger node connected by lines to Wait/Send/Condition nodes, each editable in a side drawer on click.
4308: Components: Automation list card with active/paused toggle; Flow canvas node (Trigger/Wait/Send/Condition); Node configuration drawer; Trigger type picker (New Subscriber, Tag Added, Page Visited, Inactive N Days, AI-suggested re-engagement trigger)
4309: CTA Strategy: Primary: 'New Automation'. Secondary in builder: 'Activate Automation'. Micro: 'Add Step', AI 'Suggest next best step'.
4310: User Journey: Arrives from sidebar nav or AI Tools Hub recommendation → builds/edits a flow → activates → returns to Automation list to monitor performance via embedded mini-analytics per automation.
4311: State Management: Flow graph held as a normalized node/edge state object; auto-saved on every edit; activation toggle calls an API and updates status optimistically with rollback on failure.
4312: API Calls: GET /api/v1/automations; POST /api/v1/automations; PATCH /api/v1/automations/:id; POST /api/v1/ai/suggest-automation-step
4313: SEO Requirements: noindex, nofollow.
4314: Accessibility: Flow canvas provides an alternate linear list view toggle for users who cannot use drag/drop or visual canvases; all node actions available via keyboard menu as a fallback.
4315: 	
4316: 
4317: Screen: Segments
4318: Purpose: Let users create and manage subscriber segments for precise targeting, including AI-suggested segments.
4319: User Goal: Build a reusable audience definition (e.g., 'Active in last 7 days + Country = India') without writing queries.
4320: Business Goal: Increase campaign relevance/CTR (a core value metric) and showcase the AI segmentation differentiator.
4321: Mobile Layout: 1) Header + 'New Segment' button  2) AI-suggested segments banner (carousel of 2-3 cards: 'Highly Engaged Users', 'At Risk of Churning')  3) Segment list: name, subscriber count, last updated — stacked cards  4) Tap opens rule builder: condition rows (Attribute / Operator / Value) stacked with 'Add Condition' (AND/OR toggle)
4322: Tablet Layout: AI-suggested cards become a 2-up row; segment list becomes a 2-column grid.
4323: Desktop Layout: AI-suggested segment cards in a 3-column row at top; segment table below (Name, Count, Type — Manual/AI/Dynamic, Last Updated); rule builder opens as a full-width inline panel rather than a modal for complex conditions.
4324: Components: AI-suggested segment card (with 'Accept' / 'Dismiss' actions); Segment data table; Rule builder condition row; Live subscriber-count preview as rules are edited
4325: CTA Strategy: Primary: 'New Segment'. Micro: 'Accept AI Suggestion', 'Use in Campaign' (links directly into Campaign Builder targeting this segment).
4326: User Journey: Arrives from sidebar nav, Subscribers 'Create Segment from Filter', or AI insight prompt → defines/accepts a segment → uses it immediately in Campaign Builder or Automation.
4327: State Management: Rule builder state is a structured condition tree; live count is debounced and recalculated server-side on every rule change; AI suggestions fetched once per session and cached.
4328: API Calls: GET /api/v1/segments; POST /api/v1/segments; GET /api/v1/ai/suggest-segments; POST /api/v1/segments/:id/preview-count
4329: SEO Requirements: noindex, nofollow.
4330: Accessibility: Condition rows are reachable and editable via keyboard with clear focus order; AND/OR toggle is a real radio/switch with announced state.
4331: 	
4332: 
4333: Screen: Analytics
4334: Purpose: Provide deep performance reporting across campaigns, subscriber growth, and engagement, with AI-generated narrative summaries.
4335: User Goal: Understand what is and isn't working and get a plain-English explanation of trends, not just raw charts.
4336: Business Goal: Prove ROI to retain and upgrade paying customers; surface the AI analytics-summary differentiator.
4337: Mobile Layout: 1) Header + date-range selector (7d/30d/90d/custom)  2) AI Summary card: 2-3 sentence plain-language insight, pinned at top  3) KPI cards: Subscribers Net Growth, Avg CTR, Total Delivered, Unsubscribe Rate — 2x2 grid  4) Charts stacked: Growth over time, CTR by campaign (bar), Delivery by browser/OS (donut)  5) Top campaigns table (sortable by CTR)
4338: Tablet Layout: KPI cards become a 4-column row; charts arranged 2-up.
4339: Desktop Layout: AI Summary card full-width at top with a 'Regenerate insight' button; KPI row (4 cards); 2-column chart grid below; full sortable/exportable performance table at the bottom with column chooser.
4340: Components: AI summary card with regenerate action; Date-range picker; KPI stat card; Line/bar/donut charts (Recharts-based); Sortable performance table; Export-to-CSV button
4341: CTA Strategy: Primary: 'Export Report'. Micro: 'Regenerate AI Summary', per-chart 'View as table' toggle.
4342: User Journey: Arrives from sidebar nav, Dashboard Home 'View All Analytics', or per-campaign 'View Analytics' link (pre-filtered to that campaign) → reviews trends and AI summary → acts on insight by creating a new Segment, Automation, or Campaign.
4343: State Management: Date range drives all chart/table data fetches (single source of truth in URL query params for shareable/bookmarkable reports); AI summary is cached per date-range and explicitly regenerable.
4344: API Calls: GET /api/v1/sites/:id/analytics?range=; GET /api/v1/ai/analytics-summary?range=; GET /api/v1/sites/:id/analytics/export
4345: SEO Requirements: noindex, nofollow.
4346: Accessibility: Every chart has an accompanying accessible data table toggle; AI summary text is real text (not an image), fully screen-reader readable.
4347: 	
4348: 
4349: Screen: AI Tools Hub
4350: Purpose: Centralize all AI-powered features in one discoverable place: title generation, CTR optimization, scheduling, campaign recommendations, segmentation, and analytics summaries.
4351: User Goal: Understand and use every AI capability available on their plan without hunting through other screens.
4352: Business Goal: Drive feature discovery/adoption of AI tools to justify premium-tier pricing and create switching cost vs. non-AI competitors.
4353: Mobile Layout: 1) Header: 'AI Tools' + usage meter ('142 of 500 AI credits used this month')  2) Feature card grid, single column: AI Title Generator, CTR Optimizer, Smart Scheduling, Campaign Recommendations, Audience Segmentation, Analytics Summaries — each with icon, 1-line description, 'Try it' button
4354: Tablet Layout: Feature cards become a 2-column grid.
4355: Desktop Layout: Feature cards become a 3-column grid; each card expands inline on click into a quick-use panel (e.g., paste existing title → get optimized alternatives) without leaving the page, in addition to deep links into the full feature within Campaign Builder/Segments/Analytics.
4356: Components: AI usage meter (credits or generations remaining); Feature card (icon, description, CTA); Inline quick-use panel per feature; Upgrade prompt card (shown when AI credits are exhausted on the user's plan)
4357: CTA Strategy: Primary per card: 'Try it'. Secondary: 'Upgrade for unlimited AI' (shown contextually near the usage meter when near limit).
4358: User Journey: Arrives from sidebar nav or a contextual 'Powered by AI' badge elsewhere in the app → tries a feature inline or deep-links into Campaign Builder/Segments/Analytics where that AI feature lives natively.
4359: State Management: Usage meter fetched on mount; quick-use panels hold local input/output state per card, independent of each other.
4360: API Calls: GET /api/v1/ai/usage; POST /api/v1/ai/generate-title; POST /api/v1/ai/optimize-ctr; POST /api/v1/ai/suggest-send-time; POST /api/v1/ai/campaign-recommendations; GET /api/v1/ai/suggest-segments; GET /api/v1/ai/analytics-summary
4361: SEO Requirements: noindex, nofollow.
4362: Accessibility: Usage meter announces remaining credits as text, not only a progress-bar fill; quick-use panel results are placed in an aria-live region so screen-reader users hear new AI output without losing place.
4363: 	
4364: 
4365: Screen: Integration / SDK Setup
4366: Purpose: Give existing users their site-specific SDK snippet, service-worker file, and platform-specific install instructions at any time post-onboarding.
4367: User Goal: Re-fetch their install snippet (e.g., after a site rebuild) or troubleshoot a failed install.
4368: Business Goal: Reduce churn caused by integration breakage; surface a clear health check.
4369: Mobile Layout: 1) Header: 'Integration' + install-status badge (Live / Not Detected)  2) Platform tabs: WordPress, Shopify, Webflow, Custom JS, REST API  3) Code snippet block with copy button for the active platform  4) Service-worker file download link  5) 'Test Installation' button that pings verification + shows real-time result  6) Troubleshooting accordion (common issues)
4370: Tablet Layout: Platform tabs remain horizontal; snippet block widens.
4371: Desktop Layout: Left sidebar: platform tab list. Right: snippet + service-worker download + live install-status panel with a visual checklist (Script detected, Service worker registered, VAPID key valid, Test notification sent).
4372: Components: Install-status badge; Platform tab; Code snippet with copy button; Verification checklist panel; Test-notification button
4373: CTA Strategy: Primary: 'Test Installation'. Secondary: 'Send Test Notification'. Micro: 'Copy Snippet', 'Download Service Worker'.
4374: User Journey: Arrives from sidebar nav, onboarding 'Skip for now' banner, or a failed-delivery alert → fixes/verifies install → returns to Dashboard Home or Campaign Builder.
4375: State Management: Verification checklist polls a backend status endpoint; each checklist item updates independently as detected.
4376: API Calls: GET /api/v1/sites/:id/sdk-snippet; GET /api/v1/sites/:id/verify-install; POST /api/v1/sites/:id/send-test-notification
4377: SEO Requirements: noindex, nofollow.
4378: Accessibility: Checklist items use icon + text (not icon-only) for pass/fail state; copy-to-clipboard action confirms success via a toast announced to assistive tech.
4379: 	
4380: 
4381: Screen: Team Management
4382: Purpose: Let account owners invite teammates and control their access level (agency/SaaS-founder use case).
4383: User Goal: Add a colleague with the right permission level and revoke access when needed.
4384: Business Goal: Support team-seat monetization and the Agency persona's multi-client workflow.
4385: Mobile Layout: 1) Header + 'Invite Member' button  2) Member list: avatar, name/email, role badge, status (active/pending invite) — stacked rows  3) Per-row menu: Change Role, Remove  4) Pending invites section, separate list
4386: Tablet Layout: No major structural change, list gains more breathing room.
4387: Desktop Layout: Data table: Member, Role (dropdown inline-editable), Websites Access (All / Specific sites), Last Active, Status — with bulk role-change for multi-select.
4388: Components: Member row/table; Role badge + inline role-editor dropdown; Invite modal (email + role + site-access scope); Pending invite row with 'Resend' / 'Revoke' actions
4389: CTA Strategy: Primary: 'Invite Member'. Micro: per-row 'Change Role', 'Remove', 'Resend Invite'.
4390: User Journey: Arrives from sidebar nav or Settings → invites a teammate → teammate receives email → teammate completes their own Signup/Login flow scoped to the invited workspace.
4391: State Management: Invite form local state; member list refetches after any role/removal mutation; optimistic UI for role changes with rollback on error.
4392: API Calls: GET /api/v1/team/members; POST /api/v1/team/invite; PATCH /api/v1/team/members/:id (role); DELETE /api/v1/team/members/:id
4393: SEO Requirements: noindex, nofollow.
4394: Accessibility: Role dropdown is a real <select> or ARIA combobox, fully keyboard operable; destructive 'Remove' action requires a confirmation dialog with focus trapped inside.
4395: 	
4396: 
4397: Screen: API Keys
4398: Purpose: Let developer-persona users generate and manage REST API keys for custom integrations beyond the SDK.
4399: User Goal: Generate a scoped key safely and understand its permissions before using it in code.
4400: Business Goal: Support the developer/SaaS-founder persona's need for programmatic control; reduce support tickets via clear scoping UI.
4401: Mobile Layout: 1) Header + 'Generate New Key' button  2) Key list: name, masked key (show last 4 chars), scope badges, created date, last used — stacked cards  3) Per-card 'Revoke' action  4) Link to API documentation
4402: Tablet Layout: No major structural change.
4403: Desktop Layout: Data table: Name, Key (masked, reveal-once-on-creation pattern), Scopes, Created, Last Used, Status — with a side panel showing usage stats per key (requests in last 30 days, rate-limit headroom).
4404: Components: API key row (masked value, copy-once warning); Scope selector (checkboxes: Read Subscribers, Send Campaigns, Manage Segments, etc.); Key generation modal with one-time-reveal warning; Revoke confirmation dialog
4405: CTA Strategy: Primary: 'Generate New Key'. Micro: 'Revoke', 'View Usage', 'Read API Docs'.
4406: User Journey: Arrives from sidebar nav or Integration screen 'Use REST API instead' link → generates a scoped key (shown once) → copies it into their own backend → returns periodically to monitor usage or revoke.
4407: State Management: Newly generated key value held only in transient client state (never re-fetchable after creation, per security best practice) with a clear 'copy now, you won't see this again' banner.
4408: API Calls: GET /api/v1/api-keys; POST /api/v1/api-keys; DELETE /api/v1/api-keys/:id; GET /api/v1/api-keys/:id/usage
4409: SEO Requirements: noindex, nofollow.
4410: Accessibility: One-time key reveal banner is strongly emphasized via text and an icon, not color alone; copy action confirmed via accessible toast.
4411: 	
4412: 
4413: Screen: Billing & Subscription
4414: Purpose: Let users view their current plan, usage against limits, invoices, and manage payment method via Razorpay.
4415: User Goal: Understand current spend, upgrade/downgrade, and access past invoices for accounting.

(Output capped at 50 KB. Showing lines 3967-4415. Use offset=4416 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 12.1s)

_Thinking:_

Let me read the final portion of this document.

**Tool: read**

**Input:**
```json
{
  "offset": 4416,
  "filePath": "/public/prontly-notify/prontly-notify-website-blueprint-v3.txt"
}
```

**Output:**
```
<path>/public/prontly-notify/prontly-notify-website-blueprint-v3.txt</path>
<type>file</type>
<content>
4416: Business Goal: Minimize involuntary churn from failed payments and friction-free upgrade path.
4417: Mobile Layout: 1) Header: current plan card (name, price, renewal date) + 'Manage Plan' button  2) Usage meters: Subscribers, Websites, AI Credits, Team Seats — stacked progress bars with plan limits  3) Payment method card with 'Update' link (opens Razorpay-hosted update flow)  4) Invoice history list, stacked rows with download icon  5) Cancel subscription link, de-emphasized at bottom
4418: Tablet Layout: Usage meters become a 2x2 grid.
4419: Desktop Layout: Left column (35%): current plan card + payment method + cancel link. Right column (65%): usage meters as a 2x2 grid on top, invoice history table below with filter by date range and CSV export.
4420: Components: Plan summary card; Usage progress bar (with near-limit warning state); Payment method card; Invoice table row with PDF download; Plan-change modal (upgrade/downgrade comparison); Cancellation flow modal with retention offer
4421: CTA Strategy: Primary: 'Upgrade Plan'. Secondary: 'Update Payment Method'. Micro: 'Download Invoice', de-emphasized 'Cancel Subscription'.
4422: User Journey: Arrives from sidebar nav, an in-app upgrade prompt (usage-limit banner), or a failed-payment email link → reviews usage/invoices → upgrades, fixes payment method, or (rarely) cancels with a retention offer presented first.
4423: State Management: Plan/usage data fetched on mount; Razorpay Checkout invoked as a modal overlay for payment-method updates and plan changes; webhook-driven state (e.g., payment success) reflected via a short polling fallback after checkout closes.
4424: API Calls: GET /api/v1/billing/subscription; GET /api/v1/billing/usage; GET /api/v1/billing/invoices; POST /api/v1/billing/change-plan; POST /api/v1/billing/cancel
4425: SEO Requirements: noindex, nofollow.
4426: Accessibility: Usage bars expose percentage as text alongside the visual bar; cancellation flow modal traps focus and clearly labels the retention offer as optional/skippable.
4427: 	
4428: 
4429: Screen: Account Settings
4430: Purpose: Centralize profile, notification preferences, security, and workspace-level settings.
4431: User Goal: Update their name/email/password, control which system emails they receive, and manage 2FA.
4432: Business Goal: Reduce support tickets for account-management requests; support security best practices (2FA adoption).
4433: Mobile Layout: 1) Tabbed sections (scrollable tabs): Profile, Security, Notifications, Workspace — content swaps below tabs  2) Profile tab: avatar upload, name, email (with re-verify flow if changed)  3) Security tab: change password, 2FA toggle with QR setup flow, active sessions list with 'Log out' per session  4) Notifications tab: toggles for product updates, billing alerts, weekly digest, delivery-failure alerts  5) Workspace tab: workspace name, default timezone, default sending domain
4434: Tablet Layout: Tabs become a fixed horizontal row (no scroll); content area widens.
4435: Desktop Layout: Left vertical tab list (Profile, Security, Notifications, Workspace); right content panel, single column, max 640px for readability.
4436: Components: Tab navigation; Avatar uploader; Toggle switch; 2FA setup flow (QR code + verification code input); Active session row with revoke action
4437: CTA Strategy: Primary per section: 'Save Changes'. Micro: 'Enable 2FA', 'Log out of this session'.
4438: User Journey: Arrives from sidebar nav or avatar-menu 'Settings' → updates relevant section → sees inline save confirmation → continues elsewhere in the app.
4439: State Management: Each tab manages its own form state independently; unsaved-changes warning shown if navigating away mid-edit.
4440: API Calls: GET /api/v1/users/me; PATCH /api/v1/users/me; POST /api/v1/users/me/2fa/enable; GET /api/v1/users/me/sessions; DELETE /api/v1/users/me/sessions/:id
4441: SEO Requirements: noindex, nofollow.
4442: Accessibility: Tab list uses proper ARIA tablist/tab/tabpanel roles; 2FA QR code includes a manual entry-code text fallback for users who cannot scan.
4443: 	
4444: 
4445: Admin Screens
4446: Screen: Admin Dashboard
4447: Purpose: Give Prontly's internal team a real-time operational and business health overview across all tenants.
4448: User Goal: Spot anomalies (delivery failures, churn spikes, payment failures) quickly.
4449: Business Goal: Enable proactive operations and reduce time-to-detect platform-wide incidents.
4450: Mobile Layout: 1) Header: 'Admin Overview'  2) KPI cards stacked: MRR, Active Accounts, Total Subscribers Across Platform, Notifications Sent Today, Delivery Success Rate, Open Support Tickets  3) Alerts feed: recent system warnings (e.g., FCM delivery degradation) — stacked cards  4) Recent signups list
4451: Tablet Layout: KPI cards become a 3-column grid.
4452: Desktop Layout: KPI row (6 cards, 3x2 or 6x1 depending on width); 2-column layout below — left: revenue + growth charts, right: live alerts feed + recent signups + recent failed payments lists.
4453: Components: Admin KPI card; System alert card (severity badge); Mini activity feed list; Revenue trend chart
4454: CTA Strategy: Primary: none (dashboard is read-first). Micro: 'View All Alerts', 'View All Accounts'.
4455: User Journey: Internal team logs in via Admin-role-gated route → reviews health → drills into User Management, Delivery Monitoring, or Subscription & Revenue based on what needs attention.
4456: State Management: Polls/refreshes KPIs every 60s; alerts feed uses a short-poll or websocket-style update for near-real-time incident visibility.
4457: API Calls: GET /api/v1/admin/overview; GET /api/v1/admin/alerts; GET /api/v1/admin/signups/recent
4458: SEO Requirements: noindex, nofollow. Entire /admin path blocked in robots.txt.
4459: Accessibility: Severity badges use icon + text, not color-only; auto-refreshing content does not steal focus from an in-progress admin action.
4460: 	
4461: 
4462: Screen: User & Account Management
4463: Purpose: Let internal staff search, inspect, support, and moderate customer accounts.
4464: User Goal: Find a specific account fast to resolve a support issue or investigate abuse.
4465: Business Goal: Reduce support resolution time and provide a safe, audited impersonation path for troubleshooting.
4466: Mobile Layout: 1) Header + search bar  2) Filter chips: Plan tier, Status (active/suspended), Signup date range  3) Account list: name, email, plan badge, MRR, signup date — stacked rows  4) Tap opens account detail drawer: profile, websites owned, subscription status, recent activity, 'Impersonate' and 'Suspend' actions
4467: Tablet Layout: List becomes a denser table; detail opens as a slide-over panel instead of full drawer.
4468: Desktop Layout: Data table (Name, Email, Plan, MRR, Sites, Status, Signup Date) with server-side search/filter/sort; clicking a row opens a right-side detail panel (40% width) without losing table context.
4469: Components: Admin data table; Account detail side panel; Impersonate-with-audit-log button; Suspend/Reinstate action with required reason field; Activity timeline
4470: CTA Strategy: Primary: search. Micro: 'Impersonate' (logs an audit entry), 'Suspend Account' (requires reason), 'Reset Password'.
4471: User Journey: Arrives from Admin Dashboard drill-down, support ticket reference, or direct search → inspects account → resolves issue (impersonate to verify, suspend for abuse, or reset access) → action is logged to Audit Logs.
4472: State Management: Table is server-paginated/filtered; detail panel fetches full account graph (sites, subscription, recent campaigns) on row click; all mutating actions require a confirmation modal capturing a reason that is stored in the audit trail.
4473: API Calls: GET /api/v1/admin/accounts?search=&filter=; GET /api/v1/admin/accounts/:id; POST /api/v1/admin/accounts/:id/impersonate; POST /api/v1/admin/accounts/:id/suspend
4474: SEO Requirements: noindex, nofollow.
4475: Accessibility: Destructive actions (suspend) require explicit confirmation with reason text, announced via aria-live on submission result.
4476: 	
4477: 
4478: Screen: Website Oversight
4479: Purpose: Monitor all registered websites platform-wide for installation health and abuse (e.g., spam content, ToS violations).
4480: User Goal: Identify broken integrations or policy-violating sites quickly.
4481: Business Goal: Protect platform-wide sender reputation with FCM/browsers by catching abusive senders early.
4482: Mobile Layout: 1) Header + search  2) Filter chips: Install Status (Live/Broken), Flagged  3) Site list: favicon, domain, owner account, subscriber count, install-status badge — stacked
4483: Tablet Layout: List becomes a table.
4484: Desktop Layout: Data table: Domain, Owner, Subscribers, Install Status, Last Send, Flag Status — with bulk 'Flag for Review' and 'Disable Sending' actions.
4485: Components: Admin data table; Install-status badge; Flag/disable action with reason field
4486: CTA Strategy: Micro: 'Flag for Review', 'Disable Sending', 'View Owner Account'.
4487: User Journey: Arrives from Admin Dashboard alert drill-down or scheduled review → identifies problem site → disables sending or escalates to account suspension → logs to Audit Logs.
4488: State Management: Server-paginated/filterable table; disable-sending action is immediate and reversible, surfaced with a clear undo window.
4489: API Calls: GET /api/v1/admin/sites?filter=; POST /api/v1/admin/sites/:id/disable-sending; POST /api/v1/admin/sites/:id/flag
4490: SEO Requirements: noindex, nofollow.
4491: Accessibility: Bulk action toolbar appears only when rows are selected and is announced via aria-live; reason field required before destructive actions submit.
4492: 	
4493: 
4494: Screen: Subscription & Revenue Management
4495: Purpose: Give finance/ops visibility into MRR, churn, failed payments, and coupon performance.
4496: User Goal: Reconcile revenue and intervene on at-risk accounts (failed payments, pending cancellations).
4497: Business Goal: Reduce involuntary churn and support accurate financial reporting.
4498: Mobile Layout: 1) Header: MRR + churn-rate KPI cards stacked  2) Tabs: Overview / Failed Payments / Cancellations / Coupons  3) Failed Payments tab: list of accounts with retry status and 'Retry Charge' action
4499: Tablet Layout: Tabs remain horizontal; lists become denser tables.
4500: Desktop Layout: KPI row at top (MRR, ARPU, Churn Rate, Failed Payment Count); tabbed content below with full tables and a revenue trend chart spanning the Overview tab.
4501: Components: Revenue KPI card; Revenue trend chart; Failed-payment row with retry action; Coupon performance table
4502: CTA Strategy: Micro: 'Retry Charge', 'Issue Refund', 'Create Coupon'.
4503: User Journey: Finance/ops staff reviews Overview → drills into Failed Payments → retries or contacts the account owner → monitors Coupons tab for promo performance during launch campaigns.
4504: State Management: Tab content lazy-loaded on selection; retry-charge action calls Razorpay via backend and reflects webhook-driven status update with short polling.
4505: API Calls: GET /api/v1/admin/billing/overview; GET /api/v1/admin/billing/failed-payments; POST /api/v1/admin/billing/:subscriptionId/retry; GET /api/v1/admin/billing/coupons
4506: SEO Requirements: noindex, nofollow.
4507: Accessibility: Financial figures use consistent currency formatting read correctly by screen readers (explicit currency code, not just a symbol).
4508: 	
4509: 
4510: Screen: Blog CMS
4511: Purpose: Let the marketing/content team create and manage blog posts that power the SEO content strategy.
4512: User Goal: Draft, edit, schedule, and publish posts without developer involvement.
4513: Business Goal: Keep the content engine running to support organic acquisition goals.
4514: Mobile Layout: 1) Header + 'New Post' button  2) Status filter tabs: Draft, Scheduled, Published  3) Post list: title, status badge, author, date — stacked  4) Tap opens editor: title field, MDX/rich-text body, category/tag selector, featured image upload, SEO fields (meta title/description) — stacked sections
4515: Tablet Layout: Editor gains a live preview toggle.
4516: Desktop Layout: List view: full data table with bulk actions. Editor view: split-pane — left, the MDX/rich-text editor; right, live rendered preview; SEO fields and publish controls in a collapsible right rail.
4517: Components: Post data table; Rich-text/MDX editor; Image uploader (to R2); SEO fields panel (title, description, slug, OG image); Publish/schedule control
4518: CTA Strategy: Primary: 'Publish' / 'Schedule'. Secondary: 'Save Draft'. Micro: 'Preview'.
4519: User Journey: Content team drafts a post → previews → schedules or publishes immediately → post appears on public Blog Listing/Detail pages.
4520: State Management: Editor autosaves drafts every 15s; image uploads go directly to R2 via a signed upload URL; SEO field character counts update live.
4521: API Calls: GET /api/v1/admin/blog/posts; POST /api/v1/admin/blog/posts; PATCH /api/v1/admin/blog/posts/:id; POST /api/v1/admin/blog/upload-image (R2 signed URL)
4522: SEO Requirements: noindex, nofollow (admin tool itself); content it produces is the indexable asset.
4523: Accessibility: Rich-text editor toolbar buttons have accessible labels; image upload requires alt-text input before publish is allowed.
4524: 	
4525: 
4526: Screen: Delivery Monitoring & System Health
4527: Purpose: Monitor FCM delivery success rates, API latency, and queue health across the notification-sending pipeline.
4528: User Goal: Detect and diagnose delivery degradation before customers notice or complain.
4529: Business Goal: Protect the core reliability promise of the platform; minimize MTTR (mean time to resolution) for incidents.
4530: Mobile Layout: 1) Header: overall system status badge (Operational/Degraded/Down)  2) Metric cards stacked: FCM Success Rate, Avg Delivery Latency, Queue Depth, API Error Rate  3) Recent incidents/error log list
4531: Tablet Layout: Metric cards become a 2x2 grid.
4532: Desktop Layout: Status badge banner at top; metric cards in a 4-column row; time-series charts for each metric below; raw error log table with filter by error type/site at the bottom.
4533: Components: System status badge; Metric card with sparkline; Time-series chart; Error log table
4534: CTA Strategy: Micro: 'Acknowledge Incident', 'View Site Detail' (links into Website Oversight for the affected site).
4535: User Journey: Internal ops monitors continuously or arrives via an Admin Dashboard alert → diagnoses root cause from charts/logs → acknowledges/resolves → documents in Audit Logs if customer-impacting.
4536: State Management: Metrics refresh on a short interval (e.g., 30s); charts support a custom time-range picker for incident post-mortems.
4537: API Calls: GET /api/v1/admin/system/health; GET /api/v1/admin/system/errors?range=; POST /api/v1/admin/system/incidents/:id/acknowledge
4538: SEO Requirements: noindex, nofollow.
4539: Accessibility: Status badge color is paired with explicit text state (Operational/Degraded/Down), never color-only.
4540: 	
4541: 
4542: Screen: Coupons & Discounts
4543: Purpose: Let growth/marketing staff create and manage promotional discount codes for launches and campaigns.
4544: User Goal: Create a time-bound or usage-bound coupon and track its redemption performance.
4545: Business Goal: Support go-to-market promotions without engineering involvement.
4546: Mobile Layout: 1) Header + 'New Coupon' button  2) Coupon list: code, discount type/value, status (active/expired), redemptions — stacked cards
4547: Tablet Layout: Cards become a table.
4548: Desktop Layout: Data table: Code, Type (%/flat), Value, Plan Restriction, Expiry, Redemptions, Status — with a creation modal supporting expiry date, max redemptions, and plan eligibility.
4549: Components: Coupon data table; Creation modal (code, type, value, expiry, max uses, eligible plans); Redemption count badge
4550: CTA Strategy: Primary: 'New Coupon'. Micro: 'Deactivate'.
4551: User Journey: Marketing creates a coupon ahead of a campaign → shares the code externally → monitors redemptions here → deactivates once the promotion ends.
4552: State Management: Form validation prevents overlapping/duplicate codes; redemption counts refresh on table reload.
4553: API Calls: GET /api/v1/admin/coupons; POST /api/v1/admin/coupons; PATCH /api/v1/admin/coupons/:id/deactivate
4554: SEO Requirements: noindex, nofollow.
4555: Accessibility: Modal form fields fully labeled; expiry date picker has a text-input fallback for keyboard-only use.
4556: 	
4557: 
4558: Screen: Audit Logs & Feature Flags
4559: Purpose: Provide an immutable record of all admin actions and a control panel for gradually rolling out features.
4560: User Goal: Trace who did what and when (compliance/security); toggle a feature on for a subset of accounts before full rollout.
4561: Business Goal: Satisfy enterprise security-review requirements and enable safe, staged feature releases.
4562: Mobile Layout: 1) Tabs: Audit Logs / Feature Flags  2) Audit tab: filterable log list (actor, action, target, timestamp) stacked rows  3) Flags tab: flag list with toggle + rollout percentage stepper
4563: Tablet Layout: Logs become a table; flags remain a list with more spacing.
4564: Desktop Layout: Audit tab: full-width searchable/filterable table with CSV export. Flags tab: table with Flag Name, Status, Rollout %, Eligible Plans, Last Modified — inline-editable rollout percentage.
4565: Components: Audit log table (immutable, read-only); Feature flag row with toggle + rollout slider; Filter bar (actor, action type, date range)
4566: CTA Strategy: Micro: 'Export Logs', 'Update Rollout %'.
4567: User Journey: Security/compliance staff reviews Audit Logs periodically or during an investigation; engineering toggles Feature Flags during staged rollouts and monitors for issues via Delivery Monitoring/Admin Dashboard.
4568: State Management: Audit logs are append-only and never editable in the UI; flag rollout-percentage changes are applied immediately and logged as an audit entry themselves.
4569: API Calls: GET /api/v1/admin/audit-logs?filter=; GET /api/v1/admin/feature-flags; PATCH /api/v1/admin/feature-flags/:id
4570: SEO Requirements: noindex, nofollow.
4571: Accessibility: Rollout-percentage slider has a numeric text input alternative; audit log table is fully navigable and readable via screen reader with clear column headers.
4572: 	
4573: 
4574: Conversion Strategy Report
4575: Website: Prontly Notify   |   Category: SaaS — Customer Engagement / Push Notification Platform   |   Primary Conversion Goal: Free-tier signup (self-serve, no credit card)
4576: 1. Conversion Funnel
4577: Top of Funnel — Awareness
4578: Field
4579: 	Detail
4580: 	Entry points
4581: 	Organic search (primary — see SEO Blueprint), WordPress.org/Shopify App Store listings, comparison-page switcher traffic, referral via the Free-plan 'Powered by' footer link
4582: 	Landing pages
4583: 	Home, Docs Hub platform pages, Blog posts, /compare/[competitor] pages
4584: 	User intent
4585: 	Informational — evaluating whether browser push solves their re-engagement problem at all
4586: 	Goal
4587: 	Get the visitor to grasp the value proposition and explore Pricing or Docs
4588: 	Key metrics
4589: 	Bounce rate, scroll depth on Home, pages per session
4590: 	Friction to reduce
4591: 	Page speed on a throttled connection (India-primary market), an unclear 'what is push notification' explanation for less-technical bloggers, hero CTA competing with too many secondary links
4592: 	Middle of Funnel — Consideration
4593: Field
4594: 	Detail
4595: 	Pages
4596: 	Pricing, Docs Hub (platform-specific install confidence), /compare/[competitor], About, FAQ
4597: 	User intent
4598: 	Evaluating — comparing Prontly Notify against OneSignal/PushEngage or against doing nothing
4599: 	Goal
4600: 	Build trust and demonstrate the AI-native + edge-cost-efficient differentiation
4601: 	Key metrics
4602: 	Pricing page views, Docs platform-page engagement, time on the comparison pages
4603: 	Friction to reduce
4604: 	Missing concrete proof the free tier is genuinely usable (not a crippled trial), no visible feature-comparison table against OneSignal, unanswered billing/cancellation objections
4605: 	Bottom of Funnel — Decision
4606: Field
4607: 	Detail
4608: 	Pages
4609: 	Signup, Website Onboarding Wizard
4610: 	User intent
4611: 	Ready to act — remove every remaining point of friction
4612: 	Goal
4613: 	Complete signup and reach a verified, working install
4614: 	Key metrics
4615: 	Signup form start rate, signup completion rate, onboarding wizard completion rate
4616: 	Friction to reduce
4617: 	Asking for a credit card (never, on the Free plan), too many signup fields, a confusing or copy-paste-only install step for non-technical WordPress users
4618: 	Post-Conversion — Retention
4619: Field
4620: 	Detail
4621: 	Onboarding flow
4622: 	Signup → Email Verification (auto-polled) → 3-step Website Onboarding Wizard → real test notification received
4623: 	First value milestone (the 'aha' moment)
4624: 	The user's own browser receives the test push notification they just configured — proof, not a promise, that the system works end-to-end
4625: 	Goal
4626: 	Activate the user (verified install + first real campaign sent) within 7 days
4627: 	Key metrics
4628: 	Activation rate, D7 retention, D30 retention, time-to-first-campaign-sent
4629: 	Engagement triggers
4630: 	Persistent 'Send your first campaign' banner on an empty Dashboard Home, AI-suggested first-campaign idea surfaced proactively, a day-3 product email if no campaign has been sent yet
4631: 	2. Trust Building Architecture
4632: Above the Fold (instant trust)
4633: * Live, real subscriber/site count counter in the hero subtext (e.g., '2,400+ websites already sending push with Prontly Notify') — pulled from the public stats API, never a static or inflated number.
4634: * 'No credit card required' stated directly beside the primary hero CTA, removing the most common hesitation before it has to be searched for.
4635: Feature Sections (sustained trust)
4636: * Logo bar of supported integration platforms (WordPress, Shopify, Webflow) — functions as both a trust signal and an implicit compatibility confirmation.
4637: * A short, specific testimonial carousel (named role + site category, e.g., 'Niche tech blogger, 80K monthly visitors') rather than generic, unattributed praise.
4638: Near CTA (conversion trust)
4639: * 'No credit card required' repeated at the Signup form itself, not only on Home — consistency removes a re-surfaced doubt at the exact decision point.
4640: * A small security/compliance line near the Signup form footer referencing GDPR/DPDPA-aligned data handling, linked to the Privacy Policy.
4641: Trust Element Inventory (applicable elements implemented)
4642: Element
4643: 	Implemented As
4644: 	User/site count
4645: 	Live counter in Home hero, sourced from the public stats API
4646: 	Testimonials with attribution
4647: 	Carousel on Home, case-study snippets in Blog content
4648: 	Notable integration logos
4649: 	WordPress, Shopify, Webflow logo bar on Home and Docs Hub
4650: 	Free trial offer (permanent free tier)
4651: 	Pricing's Free plan, framed as 'free forever,' not a time-boxed trial
4652: 	Security badges
4653: 	GDPR/DPDPA compliance line near Signup and in the Privacy Policy footer
4654: 	Case studies
4655: 	Customer Stories content pillar in the Content Strategy
4656: 	Money-back guarantee
4657: 	Not applicable to the permanent Free tier; the Refund Policy covers paid-tier first-charge refund windows instead
4658: 	3. CTA Strategy
4659: CTA Tier
4660: 	Specification
4661: 	Primary CTA
4662: 	Text: 'Start Free — No Card Required'. Color: primary-500 (#3B82F6), high contrast against the dark-premium background. Size: LG on desktop, full-width on mobile. Placement: hero, sticky mobile bar, end of every major marketing-page section, and a sticky header CTA after scroll.
4663: 	Secondary CTA
4664: 	Text: 'Watch 90-sec demo' / 'See full feature list'. Style: Outline/Ghost — visually subordinate to the primary, never competing for the same visual weight.
4665: 	Micro CTAs
4666: 	Inline text links ('See full feature list' anchor on Pricing, 'Read the docs' in feature descriptions, breadcrumb shortcuts on Docs Hub pages).
4667: 	CTA Copy Test Formulas
4668: * Formula A (Action + Benefit): 'Bring readers back — start free'
4669: * Formula B (Outcome + Timeframe): 'See your first subscriber today'
4670: * Formula C (Remove pain + Verb): 'Stop losing visitors — start free'
4671: 4. Pricing Psychology
4672: Element
4673: 	Application
4674: 	Layout
4675: 	3-column tiered (Free, Starter, Growth visible by default; Scale and Enterprise reachable via a 'see all plans' expand) with a monthly/annual toggle
4676: 	Anchor plan
4677: 	Growth — visually elevated card with a 'Most Popular' badge and a subtle border glow (per the Design System's shadow-glow-primary token)
4678: 	Decoy pricing
4679: 	Starter is priced and featured deliberately close enough to Growth that the marginal cost of Growth's unlimited automations and AI segmentation reads as an obviously good trade
4680: 	Annual discount
4681: 	20% off shown as a concrete saved amount in INR (e.g., '₹2,400/year saved'), not only a percentage
4682: 	Price anchoring
4683: 	Not used as a strikethrough discount tactic for V1 (no artificially inflated 'was' prices) — consistent with the brand's stated avoidance of manufactured pricing pressure
4684: 	Trial offer framing
4685: 	'Free forever' framing for the Free plan outperforms a time-boxed trial for this audience by removing countdown anxiety entirely, while the natural subscriber-volume growth curve still creates organic upgrade pressure
4686: 	FAQ below pricing
4687: 	Addresses the three most common objections directly: billing cycle/cancellation, data export on downgrade, and whether the Free plan is genuinely usable in production
4688: 	5. Urgency & Scarcity
4689: Used only where genuinely applicable — manufactured urgency would directly contradict the brand's 'trustworthy, premium, technical' positioning and the Content Strategy's explicit no-artificial-urgency tone guideline.
4690: * Waitlist/early access: not applicable — the product is self-serve and immediately available, no gated launch.
4691: * Limited seats/licenses: not applicable to V1's open self-serve model.
4692: * Time-limited offer: reserved exclusively for genuine, dated promotional coupon campaigns (see Coupons & Discounts admin module) — always shows a real, enforced expiry date, never a rolling or fake countdown.
4693: * Countdown timers: not used anywhere in the core product experience; the only legitimate use is an active, admin-created coupon's actual expiry, surfaced as a plain date, not a ticking clock.
4694: 6. Lead Generation Strategy
4695: Field
4696: 	Detail
4697: 	Lead magnet
4698: 	The product itself, via the permanent free tier — the strongest lead magnet in this category is a genuinely working free product, not a gated PDF
4699: 	Secondary lead magnet copy
4700: 	Blog newsletter: 'Push notification growth tactics, twice a month — free'
4701: 	Capture placement
4702: 	Footer newsletter form on every Blog page, inline mid-article capture card on long-form guides
4703: 	Email sequence after capture
4704: 	Email 1 (immediate): welcome + the single highest-performing blog post for their inferred persona. Email 2 (day 3): a concrete tactic (e.g., 'the 3-notification welcome series that recovers 12% of new subscribers'). Email 3 (day 7): a direct, low-pressure invitation to start the free product if they haven't already, framed around the tactic just taught.
4705: 	7. Upsell & Expansion Opportunities
4706: Field
4707: 	Detail
4708: 	In-product upsell triggers
4709: 	Subscriber count >80% of plan limit, site limit reached, AI credits exhausted, automation step-count limit hit, team seat limit reached — see Monetization Blueprint for the full trigger map
4710: 	Upgrade prompt copy
4711: 	Always states the specific real number, never a vague nudge — e.g., 'You're at 8,200 of 10,000 subscribers — upgrade to Growth before you hit your limit'
4712: 	Cross-sell
4713: 	AI credit top-up packs and additional team seats sold individually, avoiding a forced full-tier jump for a single dimension of usage (see Monetization Blueprint)
4714: 	Referral program
4715: 	Free-plan notification footer 'Powered by Prontly Notify' link functions as a passive referral channel; a formal give-credit/get-credit referral program is a near-term post-launch roadmap item, not V1 scope
4716: 	Retention offer
4717: 	Cancellation flow always presents a reason-specific retention offer before completing cancellation (discount for price-sensitivity, guided walkthrough for low perceived value) per the Monetization Blueprint
4718: 	Win-back campaign
4719: 	Triggered 14 days after a voluntary cancellation: a single email highlighting what changed or improved since they left, with a direct one-click reactivation link — no aggressive multi-email win-back sequence, consistent with the brand's restrained tone
4720: 	Production Launch Checklist
4721: A consolidated, sign-off-ready checklist pulled from across this document — Deployment Architecture, the Deployment Prompt, Security Architecture, and the SEO Blueprint — organized as the literal sequence to execute in the final week before Prontly Notify goes live.
4722: Infrastructure & Environment
4723: * All environment variables from the Project Architecture Prompt are set in Vercel's Production environment (cross-checked line-by-line against the documented list, not from memory).
4724: * Cloudflare D1 production database created, migrated, and seeded with the plans table.
4725: * Cloudflare R2 production buckets created with the correct public/private access rules per the Storage Architecture table.
4726: * Production domain DNS configured and verified pointing at Vercel; SSL certificate active and auto-renewing.
4727: * Firebase project switched to its production configuration (not the development/test project used during the build).
4728: * FCM production service-account credentials configured — confirmed distinct from any development/test FCM credentials.
4729: * Razorpay account switched from test mode to live mode; live webhook URL registered and signature secret updated in production environment variables.
4730: Data & Migrations
4731: * All D1 migrations have been run against production and verified with a row-count sanity check per table.
4732: * A manual database backup/export has been taken and a restore has been test-run at least once before go-live.
4733: * No development/test/seed data (synthetic subscribers, demo campaigns) exists in the production database.
4734: Security
4735: * Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) verified live via an external header-scan tool.
4736: * Rate limiting confirmed active on auth and subscriber-ingestion endpoints with a real test request hitting the configured limit.
4737: * CSRF protection confirmed active on at least one real dashboard form submission in production.
4738: * Audit logging confirmed writing a real row for a test admin action performed against production (then reviewed and noted as a test in the log).
4739: * VAPID private key encryption confirmed active — a freshly created production site's stored key is verified to be ciphertext, not plaintext, via direct database inspection.
4740: SEO & Discoverability
4741: * robots.txt verified live at the production URL, correctly disallowing /dashboard/, /admin/, and /api/.
4742: * sitemap.xml verified live and includes all marketing pages, published blog posts, and Docs Hub platform pages.
4743: * Google Search Console and Bing Webmaster Tools connected and the production sitemap submitted.
4744: * Schema.org markup validated with zero errors via Google's Rich Results Test on Home, Pricing, and one Blog post.
4745: * GA4 tracking confirmed firing on a real production pageview and a real signup-completion test event.
4746: Monitoring & Observability
4747: * Sentry confirmed capturing both a deliberately triggered client-side error and a deliberately triggered server-side exception, each with a readable source-mapped stack trace.
4748: * Vercel Analytics confirmed collecting Core Web Vitals data on production traffic.
4749: * Uptime monitoring (BetterStack/UptimeRobot or equivalent) configured against the marketing site and an authenticated API health endpoint, with alerting routed to the team.
4750: * Delivery Monitoring's FCM success-rate and queue-depth metrics confirmed populating with real data from a real test campaign send.
4751: Functional Smoke Test (executed against the live production URL)
4752: * A brand-new signup completes end-to-end: account creation → email verification → onboarding wizard → a real test notification received in a real browser.
4753: * A real campaign is composed (including at least one AI feature — title generation or send-time suggestion), sent to the test subscriber, and its delivery/CTR stats update correctly in Analytics.
4754: * A Razorpay live-mode payment-method addition and plan upgrade completes successfully and the workspace's plan limits update immediately.
4755: * An admin staff account can log in, view the Admin Dashboard's real KPIs, and successfully perform one read-only action (e.g., viewing an account detail panel) without error.
4756: * Custom 404 and 500 error pages render correctly and on-brand when deliberately triggered.
4757: Legal & Compliance
4758: * Privacy Policy, Terms of Service, Cookie Policy, and Refund Policy are live, dated, and linked from the Signup screen's required-acceptance checkbox and the footer.
4759: * Cookie consent banner confirmed blocking GA4 cookies until explicit consent is given.
4760: * A named data-protection/grievance contact is live in the Privacy Policy per the DPDPA 2023 requirement.
4761: Team Readiness
4762: * The incident-response runbook from Phase 10 is written, reviewed, and accessible to every team member who could be on call.
4763: * At least one team member has walked through the Admin Panel's moderation tools (Suspend, Disable Sending, Impersonate) in a staging environment before needing to use them live under pressure.
4764: * A clear internal owner is assigned for monitoring Delivery Monitoring and Sentry during the first 72 hours of public availability.
4765: Go/No-Go Sign-off
4766: Launch should not proceed until every item above is checked and at least one engineer plus one founder/product owner has explicitly signed off. A single unresolved security or data-integrity item is sufficient grounds to delay launch — none of the items above are optional 'nice to haves.'
4767: SaaS Scaling Roadmap
4768: Post-launch operating roadmap across four growth stages. Each stage lists the trigger that signals it's time to move forward, the technical/infrastructure work due, the team/process changes due, and the product priorities for that stage.
4769: Stage 0 — Launch to First 100 Paying Accounts
4770: Dimension
4771: 	Focus
4772: 	Trigger
4773: 	Production launch (Production Launch Checklist complete)
4774: 	Infrastructure
4775: 	Default Vercel/D1/R2 configuration is sufficient with no changes needed; focus engineering time on bug-fixing real usage patterns surfaced by Sentry, not premature scaling work
4776: 	Team
4777: 	Founding team handles support, content, and engineering directly; no dedicated support hire yet
4778: 	Product Priority
4779: 	Activation-rate optimization (time-to-first-verified-install, time-to-first-campaign-sent) — the single highest-leverage metric at this stage, per the PRD's Success Metrics
4780: 	Watch For
4781: 	Any pattern of onboarding drop-off at a specific wizard step (instrumented via the App Flow's universal state model) — the first sign of a friction point worth fixing immediately
4782: 	Stage 1 — 100 to 1,000 Paying Accounts
4783: Dimension
4784: 	Focus
4785: 	Trigger
4786: 	Consistent month-over-month signup growth and the first signs of D1 query latency creeping up on the largest 1-2 customer sites
4787: 	Infrastructure
4788: 	Validate the D1 per-database size ceiling against real largest-tenant data (the Open Question flagged in the TRD); implement the campaign_deliveries 90-day pruning job if not already running; begin tracking Vercel function cold-start/duration metrics specifically for the AI-endpoint route group
4789: 	Team
4790: 	First dedicated support/success hire to handle the growing support-ticket volume the founding team can no longer absorb alongside building; consider a part-time content writer to sustain the Content Strategy's publishing cadence
4791: 	Product Priority
4792: 	Expand the Automation template library based on real usage data (which templates get used vs. ignored); begin the formal referral program (flagged as post-V1 in the Conversion Strategy Report)
4793: 	Watch For
4794: 	Free-to-paid conversion rate trend — if it's flat or declining as volume grows, revisit the Monetization Blueprint's upgrade-trigger copy and timing before assuming a pricing problem
4795: 	Stage 2 — 1,000 to 10,000 Paying Accounts
4796: Dimension
4797: 	Focus
4798: 	Trigger
4799: 	A specific large tenant's subscriber table approaches a meaningful fraction of D1's documented per-database size limit, or aggregate platform-wide send volume starts pushing FCM batch-send throughput limits
4800: 	Infrastructure
4801: 	Implement per-large-tenant D1 database sharding for the small number of outlier high-volume sites (the architecture anticipates this — see Scalability Blueprint — rather than requiring a rewrite); move campaign_deliveries archival from simple pruning to a compressed R2-archive-and-purge pipeline; introduce a dedicated, longer-timeout Vercel configuration for the AI endpoint route group if latency has become customer-visible
4802: 	Team
4803: 	Build a small dedicated platform/infra function distinct from product engineering; formalize an on-call rotation beyond the single-owner model from Stage 0/1
4804: 	Product Priority
4805: 	Begin Enterprise-tier productization: SSO, custom SLA terms, and a dedicated onboarding flow for larger agency/enterprise accounts (explicitly deferred from V1 scope in the PRD's Non-Goals)
4806: 	Watch For
4807: 	Sender-reputation health platform-wide (Delivery Monitoring's FCM success rate) — at this scale a single abusive tenant has materially more potential to affect every other tenant's deliverability; the Website Oversight moderation tooling becomes a daily-use tool, not an occasional one
4808: 	Stage 3 — 10,000+ Paying Accounts / Series A+ Scale
4809: Dimension
4810: 	Focus
4811: 	Trigger
4812: 	Platform-wide scale where multi-region write distribution, dedicated compliance tooling, and a formal enterprise sales motion all become justified investments
4813: 	Infrastructure
4814: 	Evaluate multi-region D1/write-path distribution for the secondary US/UK/Canada/Australia markets if latency data justifies it; evaluate whether the LLM provider relationship should move from pay-per-call to a negotiated volume contract given AI feature usage at this scale
4815: 	Team
4816: 	Dedicated security/compliance function to support enterprise procurement reviews (SOC 2 readiness becomes a realistic and likely necessary investment at this stage, explicitly flagged as out of scope for V1 in the PRD's Anti-Persona)
4817: 	Product Priority
4818: 	Native mobile push (iOS/Android SDKs) and full omnichannel orchestration (SMS, WhatsApp, in-app) — both explicitly deferred in the PRD's Non-Goals for V1 — become reasonable roadmap items once the core web-push product has proven product-market fit and the team/infrastructure investment is justified by scale
4819: 	Watch For
4820: 	Net revenue retention trend — at this scale, expansion revenue from existing accounts should be doing more of the growth work than new-logo acquisition; if it isn't, revisit the Monetization Blueprint's expansion-revenue mechanisms before investing further in top-of-funnel acquisition spend
4821: 	Cross-Stage Principles
4822: * Never scale infrastructure ahead of a confirmed, measured trigger — every stage above is gated by a real signal (latency, table size, support volume), not a calendar date or a vanity metric.
4823: * Every infrastructure investment at each stage should be traceable back to a specific Open Question or scaling ceiling already flagged in the TRD or Scalability Blueprint, not a net-new architectural decision made under growth pressure.
4824: * Team scaling follows revenue and operational load, not the reverse — the founding team should feel the specific pain (support backlog, on-call fatigue, a stalled enterprise deal) that a new hire or system resolves before making that hire or building that system.
4825: Page  of

(End of file - total 4825 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 17.9s)

_Thinking:_

I've now read the entire 4825-line blueprint document. This is a massive project - a complete SaaS platform with 36 screens, 21 database entities, full AI integration, admin panel, billing, etc. Building this entire project would take 9-10 weeks according to the document.

Let me break this down and start building the foundation (Phase 1) following the blueprint's guidance. The key thing I notice is the AGENTS.md file which says to read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Let me check what's there.

Let me create a todo list and start building this systematically.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Check Next.js docs for breaking changes (as instructed by AGENTS.md)",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Phase 1: Foundation Setup (Next.js 15, folder structure, Tailwind config, env, routing skeleton)",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Phase 2: Design System & Core UI (components, layout, theme)",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Phase 3: Authentication System (Firebase Auth, screens, middleware)",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Phase 4: Database & Backend (D1 schema, API routes, validation)",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Phase 5: Feature Development (onboarding, campaigns, automations, segments, AI, billing, team, API keys)",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Phase 6: Admin Panel (dashboard, accounts, sites, billing, blog, system, coupons, audit)",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Phase 7: SEO & Marketing (metadata, sitemap, schema, OG images, docs hub, comparison pages)",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Phase 8: Security Layer (rate limiting, CSRF, headers, audit logging, encryption)",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Phase 10: Testing & Deployment (tests, CI/CD, monitoring, launch checklist)",
      "status": "pending",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Check Next.js docs for breaking changes (as instructed by AGENTS.md)",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Phase 1: Foundation Setup (Next.js 15, folder structure, Tailwind config, env, routing skeleton)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 2: Design System & Core UI (components, layout, theme)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 3: Authentication System (Firebase Auth, screens, middleware)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 4: Database & Backend (D1 schema, API routes, validation)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 5: Feature Development (onboarding, campaigns, automations, segments, AI, billing, team, API keys)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 6: Admin Panel (dashboard, accounts, sites, billing, blog, system, coupons, audit)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 7: SEO & Marketing (metadata, sitemap, schema, OG images, docs hub, comparison pages)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 8: Security Layer (rate limiting, CSRF, headers, audit logging, encryption)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 10: Testing & Deployment (tests, CI/CD, monitoring, launch checklist)",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 70.7s)

_Thinking:_

The AGENTS.md says I need to check the Next.js docs at `node_modules/next/dist/docs/` before writing any code. Let me check that and then start building Phase 1.

**Tool: glob**

**Input:**
```json
{
  "pattern": "node_modules/next/dist/docs/*.md",
  "path": "/public/prontly-notify"
}
```

**Error:**
```
ripgrep execution failed
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 19.9s)

_Thinking:_

The glob failed. Let me check if node_modules exists at all, or if this is a fresh project. Let me look at the directory.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify"
}
```

**Output:**
```
<path>/public/prontly-notify</path>
<type>directory</type>
<entries>
.env.local
.gitignore
.next/
AGENTS.md
CLAUDE.md
eslint.config.mjs
next-env.d.ts
next.config.ts
node_modules/
package-lock.json
package.json
postcss.config.mjs
prontly-notify-website-blueprint-v3.txt
public/
README.md
src/
tailwind.config.ts
tsconfig.json

(18 entries)
</entries>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 33.6s)

_Thinking:_

There's already a project structure here. Let me check the existing source code and understand what's already been scaffolded before I start building. This project might have already been partially created. Let me look at what exists.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/package.json"
}
```

**Output:**
```
<path>/public/prontly-notify/package.json</path>
<type>file</type>
<content>
1: {
2:   "name": "prontly-notify",
3:   "version": "0.1.0",
4:   "private": true,
5:   "scripts": {
6:     "dev": "next dev",
7:     "build": "next build",
8:     "start": "next start",
9:     "lint": "eslint"
10:   },
11:   "dependencies": {
12:     "clsx": "^2.1.1",
13:     "firebase": "^12.15.0",
14:     "firebase-admin": "^14.0.0",
15:     "lucide-react": "^1.21.0",
16:     "next": "16.2.9",
17:     "react": "19.2.4",
18:     "react-dom": "19.2.4",
19:     "tailwind-merge": "^3.6.0",
20:     "zod": "^4.4.3"
21:   },
22:   "devDependencies": {
23:     "@tailwindcss/postcss": "^4",
24:     "@types/node": "^20",
25:     "@types/react": "^19",
26:     "@types/react-dom": "^19",
27:     "eslint": "^9",
28:     "eslint-config-next": "16.2.9",
29:     "tailwindcss": "^4",
30:     "typescript": "^5"
31:   }
32: }

(End of file - total 32 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/tsconfig.json"
}
```

**Output:**
```
<path>/public/prontly-notify/tsconfig.json</path>
<type>file</type>
<content>
1: {
2:   "compilerOptions": {
3:     "target": "ES2017",
4:     "lib": ["dom", "dom.iterable", "esnext"],
5:     "allowJs": true,
6:     "skipLibCheck": true,
7:     "strict": true,
8:     "noEmit": true,
9:     "esModuleInterop": true,
10:     "module": "esnext",
11:     "moduleResolution": "bundler",
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "jsx": "react-jsx",
15:     "incremental": true,
16:     "plugins": [
17:       {
18:         "name": "next"
19:       }
20:     ],
21:     "paths": {
22:       "@/*": ["./src/*"]
23:     }
24:   },
25:   "include": [
26:     "next-env.d.ts",
27:     "**/*.ts",
28:     "**/*.tsx",
29:     ".next/types/**/*.ts",
30:     ".next/dev/types/**/*.ts",
31:     "**/*.mts"
32:   ],
33:   "exclude": ["node_modules"]
34: }

(End of file - total 34 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/tailwind.config.ts"
}
```

**Output:**
```
<path>/public/prontly-notify/tailwind.config.ts</path>
<type>file</type>
<content>
1: import type { Config } from "tailwindcss";
2: 
3: const config: Config = {
4:   darkMode: "class",
5:   content: [
6:     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
7:     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
8:     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
9:   ],
10:   theme: {
11:     extend: {
12:       colors: {
13:         background: "#0F172A", // Dark background
14:         surface: "#111827",    // Distinct card surface
15:         border: "rgba(255, 255, 255, 0.08)",
16:         primary: {
17:           DEFAULT: "#3B82F6", // Trustworthy technical blue
18:           light: "#60A5FA",
19:           accent: "#93C5FD",
20:         },
21:         muted: "#6B7280",
22:         success: "#10B981",
23:         danger: "#EF4444",
24:       },
25:       borderRadius: {
26:         sm: "4px",
27:         DEFAULT: "8px",
28:         lg: "12px",
29:         xl: "16px",
30:       },
31:       fontFamily: {
32:         sans: ["Inter", "system-ui", "sans-serif"],
33:         display: ["Calibre", "Inter", "sans-serif"],
34:       },
35:       animation: {
36:         "fade-in": "fadeIn 0.3s ease-out",
37:       },
38:       keyframes: {
39:         fadeIn: {
40:           "0%": { opacity: "0", transform: "translateY(4px)" },
41:           "100%": { opacity: "1", transform: "translateY(0)" },
42:         },
43:       },
44:     },
45:   },
46:   plugins: [],
47: };
48: export default config;

(End of file - total 48 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/next.config.ts"
}
```

**Output:**
```
<path>/public/prontly-notify/next.config.ts</path>
<type>file</type>
<content>
1: import type { NextConfig } from "next";
2: 
3: const nextConfig: NextConfig = {
4:   /* config options here */
5: };
6: 
7: export default nextConfig;

(End of file - total 7 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/CLAUDE.md"
}
```

**Output:**
```
<path>/public/prontly-notify/CLAUDE.md</path>
<type>file</type>
<content>
1: @AGENTS.md

(End of file - total 1 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src"
}
```

**Output:**
```
<path>/public/prontly-notify/src</path>
<type>directory</type>
<entries>
app/
components/
context/
lib/

(4 entries)
</entries>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 18.8s)

_Thinking:_

There's already a project skeleton. Let me check the existing structure more deeply.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src"
}
```

**Output:**
```
<path>/public/prontly-notify/src</path>
<type>directory</type>
<entries>
app/
components/
context/
lib/

(4 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/.env.local"
}
```

**Output:**
```
<path>/public/prontly-notify/.env.local</path>
<type>file</type>
<content>
1: # Firebase Client
2: NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
3: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
4: NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
5: NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
6: 
7: # Cloudflare D1
8: CF_ACCOUNT_ID=your_cf_account_id
9: CF_D1_DATABASE_ID=your_d1_database_id
10: CF_D1_API_TOKEN=your_cf_api_token
11: 
12: # App Config
13: NEXT_PUBLIC_APP_URL=http://localhost:3000

(End of file - total 13 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app</path>
<type>directory</type>
<entries>
dashboard/
favicon.ico
globals.css
layout.tsx
page.tsx

(5 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/components"
}
```

**Output:**
```
<path>/public/prontly-notify/src/components</path>
<type>directory</type>
<entries>
layout/
ui/

(2 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/context"
}
```

**Output:**
```
<path>/public/prontly-notify/src/context</path>
<type>directory</type>
<entries>
AuthContext.tsx

(1 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/lib"
}
```

**Output:**
```
<path>/public/prontly-notify/src/lib</path>
<type>directory</type>
<entries>
db.ts
firebase.ts

(2 entries)
</entries>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.4s)

_Thinking:_

Let me look at what already exists in more detail.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/layout.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app/layout.tsx</path>
<type>file</type>
<content>
1: import type { Metadata } from "next";
2: import { Inter } from "next/font/google";
3: import "./globals.css";
4: import { AuthProvider } from "@/context/AuthContext";
5: const inter = Inter({ subsets: ["latin"] });
6: 
7: export const metadata: Metadata = {
8:   title: "Prontly Notify | Browser Push Notification Platform",
9:   description: "AI-assisted browser push notifications for publishers, SaaS, and e-commerce.",
10: };
11: 
12: 
13: 
14: 
15: // Update the body return
16: <body className={`${inter.className} bg-background text-white antialiased`}>
17:   <AuthProvider>{children}</AuthProvider>
18: </body>
19: 
20: export default function RootLayout({ children }: { children: React.ReactNode }) {
21:   return (
22:     <html lang="en" className="dark">
23:       <body className={`${inter.className} bg-background text-white antialiased`}>
24:         {children}
25:       </body>
26:     </html>
27:   );
28: }

(End of file - total 28 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/page.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app/page.tsx</path>
<type>file</type>
<content>
1: import Link from "next/link";
2: import { Bell, Zap, Shield } from "lucide-react";
3: 
4: export default function LandingPage() {
5:   return (
6:     <div className="min-h-screen">
7:       {/* Nav */}
8:       <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
9:         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
10:           <div className="flex items-center gap-2 text-lg font-bold">
11:             <Bell className="h-6 w-6 text-primary" />
12:             Prontly Notify
13:           </div>
14:           <div className="flex items-center gap-6">
15:             <Link href="/pricing" className="text-sm text-muted hover:text-white">Pricing</Link>
16:             <Link href="/docs" className="text-sm text-muted hover:text-white">Docs</Link>
17:             <Link href="/login" className="text-sm text-muted hover:text-white">Login</Link>
18:             <Link href="/signup" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
19:               Start Free
20:             </Link>
21:           </div>
22:         </div>
23:       </nav>
24: 
25:       {/* Hero - Glassmorphic Panel */}
26:       <section className="mx-auto max-w-7xl px-6 py-24">
27:         <div className="relative overflow-hidden rounded-xl border border-border bg-surface/50 p-12 backdrop-blur-xl">
28:           <div className="relative z-10 max-w-3xl">
29:             <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
30:               AI-Powered Re-engagement
31:             </span>
32:             <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
33:               Bring visitors back with <span className="text-primary">Browser Push</span>.
34:             </h1>
35:             <p className="mb-8 text-lg text-muted">
36:               The edge-first, AI-native push notification platform built for bloggers, SaaS founders, and e-commerce. No app required, just instant engagement.
37:             </p>
38:             <div className="flex gap-4">
39:               <Link href="/signup" className="rounded-lg bg-primary px-6 py-3 font-medium hover:bg-primary-light">
40:                 Get Started Free
41:               </Link>
42:               <Link href="/pricing" className="rounded-lg border border-border px-6 py-3 font-medium hover:bg-surface">
43:                 View Pricing
44:               </Link>
45:             </div>
46:           </div>
47:           <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
48:         </div>
49:       </section>
50: 
51:       {/* Features Grid */}
52:       <section className="mx-auto max-w-7xl px-6 py-12">
53:         <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
54:           {[
55:             { icon: Zap, title: "AI Campaign Assistant", desc: "Generate high-CTR titles and optimize send times automatically." },
56:             { icon: Shield, title: "Edge-First Delivery", desc: "Powered by Cloudflare D1 and FCM for near-zero latency sends." },
57:             { icon: Bell, title: "Zero-Install Opt-In", desc: "Capture subscribers directly via the browser. No app store required." }
58:           ].map((f) => (
59:             <div key={f.title} className="rounded-lg border border-border bg-surface p-6">
60:               <f.icon className="mb-4 h-8 w-8 text-primary" />
61:               <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
62:               <p className="text-muted">{f.desc}</p>
63:             </div>
64:           ))}
65:         </div>
66:       </section>
67:     </div>
68:   );
69: }

(End of file - total 69 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/globals.css"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app/globals.css</path>
<type>file</type>
<content>
1: @import "tailwindcss";
2: 
3: :root {
4:   --background: #ffffff;
5:   --foreground: #171717;
6: }
7: 
8: @theme inline {
9:   --color-background: var(--background);
10:   --color-foreground: var(--foreground);
11:   --font-sans: var(--font-geist-sans);
12:   --font-mono: var(--font-geist-mono);
13: }
14: 
15: @media (prefers-color-scheme: dark) {
16:   :root {
17:     --background: #0a0a0a;
18:     --foreground: #ededed;
19:   }
20: }
21: 
22: body {
23:   background: var(--background);
24:   color: var(--foreground);
25:   font-family: Arial, Helvetica, sans-serif;
26: }

(End of file - total 26 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/context/AuthContext.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/context/AuthContext.tsx</path>
<type>file</type>
<content>
1: "use client";
2: 
3: import React, { createContext, useContext, useEffect, useState } from "react";
4: import { auth } from "@/lib/firebase";
5: import { onAuthStateChanged, signOut, User } from "firebase/auth";
6: 
7: interface AuthContextType {
8:   user: User | null;
9:   loading: boolean;
10:   logout: () => Promise<void>;
11: }
12: 
13: const AuthContext = createContext<AuthContextType>({
14:   user: null,
15:   loading: true,
16:   logout: async () => {},
17: });
18: 
19: export function AuthProvider({ children }: { children: React.ReactNode }) {
20:   const [user, setUser] = useState<User | null>(null);
21:   const [loading, setLoading] = useState(true);
22: 
23:   useEffect(() => {
24:     const unsubscribe = onAuthStateChanged(auth, (user) => {
25:       setUser(user);
26:       setLoading(false);
27:     });
28:     return () => unsubscribe();
29:   }, []);
30: 
31:   const logout = async () => {
32:     await signOut(auth);
33:   };
34: 
35:   return (
36:     <AuthContext.Provider value={{ user, loading, logout }}>
37:       {children}
38:     </AuthContext.Provider>
39:   );
40: }
41: 
42: export const useAuth = () => useContext(AuthContext);

(End of file - total 42 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/lib/firebase.ts"
}
```

**Output:**
```
<path>/public/prontly-notify/src/lib/firebase.ts</path>
<type>file</type>
<content>
1: import { initializeApp } from "firebase/app";
2: import { getAuth } from "firebase/auth";
3: 
4: const firebaseConfig = {
5:   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
6:   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
7:   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
8:   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
9: };
10: 
11: const app = initializeApp(firebaseConfig);
12: export const auth = getAuth(app);

(End of file - total 12 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/lib/db.ts"
}
```

**Output:**
```
<path>/public/prontly-notify/src/lib/db.ts</path>
<type>file</type>
<content>
1: // Cloudflare D1 REST API wrapper for Next.js API Routes
2: const D1_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
3: const D1_DATABASE_ID = process.env.CF_D1_DATABASE_ID;
4: const D1_API_TOKEN = process.env.CF_D1_API_TOKEN;
5: 
6: export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
7:   const url = `https://api.cloudflare.com/client/v4/accounts/${D1_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`;
8:   
9:   const res = await fetch(url, {
10:     method: "POST",
11:     headers: {
12:       "Authorization": `Bearer ${D1_API_TOKEN}`,
13:       "Content-Type": "application/json",
14:     },
15:     body: JSON.stringify({ sql, params }),
16:   });
17: 
18:   const data = await res.json();
19:   if (!data.success) throw new Error(data.errors?.[0]?.message || "D1 Query Failed");
20:   return data.result?.[0]?.results || [];
21: }
22: 
23: // UUIDv7 generator placeholder (use a library like 'uuidv7' in production)
24: export function generateUUID() {
25:   return crypto.randomUUID(); 
26: }

(End of file - total 26 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/components/layout"
}
```

**Output:**
```
<path>/public/prontly-notify/src/components/layout</path>
<type>directory</type>
<entries>
AuthGuard.tsx

(1 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/components/ui"
}
```

**Output:**
```
<path>/public/prontly-notify/src/components/ui</path>
<type>directory</type>
<entries>
StateContainer.tsx

(1 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/dashboard"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app/dashboard</path>
<type>directory</type>
<entries>
layout.tsx
page.tsx

(2 entries)
</entries>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.1s)

_Thinking:_

I see. This is already a partially scaffolded project with Next.js 16, React 19, Tailwind CSS 4, Firebase integration, etc. The AGENTS.md says to read Next.js docs from `node_modules/next/dist/docs/` before writing code. Let me check if that path exists.

**Tool: glob**

**Input:**
```json
{
  "pattern": "node_modules/next/dist/docs/**/*.md",
  "path": "/public/prontly-notify"
}
```

**Error:**
```
ripgrep execution failed
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.6s)

_Thinking:_

The glob tool isn't working for node_modules (probably too large). Let me try with bash.

**Tool: bash**

**Input:**
```json
{
  "command": "ls node_modules/next/dist/docs/ 2>/dev/null || echo \"No docs directory\"",
  "description": "Check for Next.js docs",
  "workdir": "/public/prontly-notify"
}
```

**Output:**
```
01-app
02-pages
03-architecture
04-community
index.md

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.2s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/node_modules/next/dist/docs/index.md",
  "limit": 40
}
```

**Output:**
```
<path>/public/prontly-notify/node_modules/next/dist/docs/index.md</path>
<type>file</type>
<content>
1: ---
2: title: Next.js Docs
3: description: Welcome to the Next.js Documentation.
4: related:
5:   title: Next Steps
6:   description: Create your first application and learn the core Next.js features.
7:   links:
8:     - app/getting-started
9: ---
10: 
11: {/* AI agent hint: If fixing slow client-side navigations, Suspense alone is not enough. You must also export `unstable_instant` from the route. Read docs/01-app/02-guides/instant-navigation.mdx before making changes. */}
12: 
13: Welcome to the Next.js documentation!
14: 
15: ## What is Next.js?
16: 
17: Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
18: 
19: It also automatically configures lower-level tools like bundlers and compilers. You can instead focus on building your product and shipping quickly.
20: 
21: Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.
22: 
23: ## How to use the docs
24: 
25: The docs are organized into 3 sections:
26: 
27: - [Getting Started](/docs/app/getting-started): Step-by-step tutorials to help you create a new application and learn the core Next.js features.
28: - [Guides](/docs/app/guides): Tutorials on specific use cases, choose what's relevant to you.
29: - [API Reference](/docs/app/api-reference): Detailed technical reference for every feature.
30: 
31: Use the sidebar to navigate through the sections, or search (`Ctrl+K` or `Cmd+K`) to quickly find a page.
32: 
33: ## App Router and Pages Router
34: 
35: Next.js has two different routers:
36: 
37: - **App Router**: The newer router that supports new React features like Server Components.
38: - **Pages Router**: The original router, still supported and being improved.
39: 
40: At the top of the sidebar, you'll notice a dropdown menu that allows you to switch between the [App Router](/docs/app) and the [Pages Router](/docs/pages) docs.

(Showing lines 1-40 of 69. Use offset=41 to continue.)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "description": "List app router docs",
  "command": "ls node_modules/next/dist/docs/01-app/",
  "workdir": "/public/prontly-notify"
}
```

**Output:**
```
01-getting-started
02-guides
03-api-reference
04-glossary.md
index.md

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 7.8s)

_Thinking:_

I see there's a note about `unstable_instant` for instant navigation. Let me check the guides and any key API references that might be relevant. Let me look at a few key docs to check for any breaking changes or important patterns.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/01-project-structure.mdx",
  "limit": 50
}
```

**Error:**
```
File not found: /public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/01-project-structure.mdx
```

**Tool: bash**

**Input:**
```json
{
  "command": "ls node_modules/next/dist/docs/01-app/02-guides/",
  "description": "List guide docs",
  "workdir": "/public/prontly-notify"
}
```

**Output:**
```
ai-agents.md
analytics.md
authentication.md
backend-for-frontend.md
caching-without-cache-components.md
cdn-caching.md
ci-build-caching.md
content-security-policy.md
css-in-js.md
custom-server.md
data-security.md
debugging.md
deploying-to-platforms.md
draft-mode.md
environment-variables.md
forms.md
how-revalidation-works.md
incremental-static-regeneration.md
index.md
instant-navigation.md
instrumentation.md
internationalization.md
json-ld.md
lazy-loading.md
local-development.md
mcp.md
mdx.md
memory-usage.md
migrating
migrating-to-cache-components.md
multi-tenant.md
multi-zones.md
open-telemetry.md
package-bundling.md
ppr-platform-guide.md
prefetching.md
preserving-ui-state.md
preventing-flash-before-hydration.md
production-checklist.md
progressive-web-apps.md
public-static-pages.md
redirecting.md
rendering-philosophy.md
sass.md
scripts.md
self-hosting.md
single-page-applications.md
static-exports.md
streaming.md
tailwind-v3-css.md
testing
third-party-libraries.md
upgrading
videos.md
view-transitions.md

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 10.4s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md",
  "limit": 80
}
```

**Output:**
```
<path>/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md</path>
<type>file</type>
<content>
1: ---
2: title: Ensuring instant navigations
3: description: Learn how to structure your app to prefetch and prerender more content, providing instant page loads and client navigations.
4: nav_title: Instant navigation
5: version: draft
6: related:
7:   title: Learn more
8:   description: Explore the full instant API, caching, and revalidation.
9:   links:
10:     - app/api-reference/file-conventions/route-segment-config/instant
11:     - app/getting-started/caching
12:     - app/getting-started/revalidating
13:     - app/guides/prefetching
14: ---
15: 
16: With [Cache Components](/docs/app/api-reference/config/next-config-js/cacheComponents) enabled, wrapping uncached data in `<Suspense>` boundaries produces instant navigations — but only if the boundaries are in the right place. A misplaced boundary can silently block client-side navigations, especially where the entry point varies by shared layout. **Always export `unstable_instant` from routes that should navigate instantly** — it validates the caching structure at dev time and build time, catching issues before they reach users.
17: 
18: This guide starts with a product page that navigates instantly, then shows how to catch and fix a page where Suspense boundaries are not in the right place.
19: 
20: ## A page that navigates instantly
21: 
22: A product page at `/store/[slug]` that fetches two things: product details (name, price) and live inventory. Product details rarely change, so they are cached with `use cache`. Inventory must be fresh and streams behind its own `<Suspense>` fallback:
23: 
24: ```tsx filename="app/store/[slug]/page.tsx" highlight={1,12-19,25}
25: export const unstable_instant = { prefetch: 'static' }
26: 
27: import { Suspense } from 'react'
28: 
29: export default async function ProductPage({
30:   params,
31: }: {
32:   params: Promise<{ slug: string }>
33: }) {
34:   return (
35:     <div>
36:       <Suspense fallback={<p>Loading product...</p>}>
37:         {params.then(({ slug }) => (
38:           <ProductInfo slug={slug} />
39:         ))}
40:       </Suspense>
41:       <Suspense fallback={<p>Checking availability...</p>}>
42:         <Inventory params={params} />
43:       </Suspense>
44:     </div>
45:   )
46: }
47: 
48: async function ProductInfo({ slug }: { slug: string }) {
49:   'use cache'
50:   const product = await fetchProduct(slug)
51:   return (
52:     <>
53:       <h1>{product.name}</h1>
54:       <p>${product.price}</p>
55:     </>
56:   )
57: }
58: 
59: async function Inventory({ params }: { params: Promise<{ slug: string }> }) {
60:   const { slug } = await params
61:   const inventory = await fetchInventory(slug)
62:   return <p>{inventory.count} in stock</p>
63: }
64: ```
65: 
66: There is no `generateStaticParams`, so `[slug]` is a dynamic segment and `slug` is only known at request time. Awaiting `params` suspends, which is why each component that reads it has its own `<Suspense>` boundary. The `params` Promise is resolved inline with `.then()` so the cached `ProductInfo` receives a plain `slug` string.
67: 
68: The [`unstable_instant`](/docs/app/api-reference/file-conventions/route-segment-config/instant) export on line 1 tells Next.js to validate that this page produces an instant [static shell](/docs/app/glossary#static-shell) at every possible entry point. Validation runs during development and at build time. If a component would block navigation, the error overlay tells you exactly which one and suggests a fix.
69: 
70: ### Inspect it with the Next.js DevTools
71: 
72: Enable the Instant Navigation DevTools toggle in your Next.js config:
73: 
74: ```ts filename="next.config.ts" highlight={5-7}
75: import type { NextConfig } from 'next'
76: 
77: const nextConfig: NextConfig = {
78:   cacheComponents: true,
79:   experimental: {
80:     instantNavigationDevToolsToggle: true,

(Showing lines 1-80 of 287. Use offset=81 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/authentication.md",
  "limit": 80
}
```

**Output:**
```
<path>/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/authentication.md</path>
<type>file</type>
<content>
1: ---
2: title: How to implement authentication in Next.js
3: nav_title: Authentication
4: description: Learn how to implement authentication in your Next.js application.
5: ---
6: 
7: Understanding authentication is crucial for protecting your application's data. This page will guide you through what React and Next.js features to use to implement auth.
8: 
9: Before starting, it helps to break down the process into three concepts:
10: 
11: 1. **[Authentication](#authentication)**: Verifies if the user is who they say they are. It requires the user to prove their identity with something they have, such as a username and password.
12: 2. **[Session Management](#session-management)**: Tracks the user's auth state across requests.
13: 3. **[Authorization](#authorization)**: Decides what routes and data the user can access.
14: 
15: This diagram shows the authentication flow using React and Next.js features:
16: 
17: <Image
18:   alt="Diagram showing the authentication flow with React and Next.js features"
19:   srcLight="/docs/light/authentication-overview.png"
20:   srcDark="/docs/dark/authentication-overview.png"
21:   width="1600"
22:   height="1383"
23: />
24: 
25: The examples on this page walk through basic username and password auth for educational purposes. While you can implement a custom auth solution, for increased security and simplicity, we recommend using an authentication library. These offer built-in solutions for authentication, session management, and authorization, as well as additional features such as social logins, multi-factor authentication, and role-based access control. You can find a list in the [Auth Libraries](#auth-libraries) section.
26: 
27: ## Authentication
28: 
29: <AppOnly>
30: 
31: ### Sign-up and login functionality
32: 
33: You can use the [`<form>`](https://react.dev/reference/react-dom/components/form) element with React's [Server Actions](/docs/app/getting-started/mutating-data) and `useActionState` to capture user credentials, validate form fields, and call your Authentication Provider's API or database.
34: 
35: Since Server Actions always execute on the server, they provide a secure environment for handling authentication logic.
36: 
37: Here are the steps to implement signup/login functionality:
38: 
39: #### 1. Capture user credentials
40: 
41: To capture user credentials, create a form that invokes a Server Action on submission. For example, a signup form that accepts the user's name, email, and password:
42: 
43: ```tsx filename="app/ui/signup-form.tsx" switcher
44: import { signup } from '@/app/actions/auth'
45: 
46: export function SignupForm() {
47:   return (
48:     <form action={signup}>
49:       <div>
50:         <label htmlFor="name">Name</label>
51:         <input id="name" name="name" placeholder="Name" />
52:       </div>
53:       <div>
54:         <label htmlFor="email">Email</label>
55:         <input id="email" name="email" type="email" placeholder="Email" />
56:       </div>
57:       <div>
58:         <label htmlFor="password">Password</label>
59:         <input id="password" name="password" type="password" />
60:       </div>
61:       <button type="submit">Sign Up</button>
62:     </form>
63:   )
64: }
65: ```
66: 
67: ```jsx filename="app/ui/signup-form.js" switcher
68: import { signup } from '@/app/actions/auth'
69: 
70: export function SignupForm() {
71:   return (
72:     <form action={signup}>
73:       <div>
74:         <label htmlFor="name">Name</label>
75:         <input id="name" name="name" placeholder="Name" />
76:       </div>
77:       <div>
78:         <label htmlFor="email">Email</label>
79:         <input id="email" name="email" type="email" placeholder="Email" />
80:       </div>

(Showing lines 1-80 of 1697. Use offset=81 to continue.)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "command": "ls node_modules/next/dist/docs/01-app/03-api-reference/",
  "description": "List API reference docs",
  "workdir": "/public/prontly-notify"
}
```

**Output:**
```
01-directives
02-components
03-file-conventions
04-functions
05-config
06-cli
07-adapters
07-edge.md
08-turbopack.md
index.md

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 17.4s)

_Thinking:_

I now have a good understanding of the project. The key things to note from the Next.js docs:

1. Next.js 16 has some changes - notably `unstable_instant` for instant navigation, Cache Components, and some other changes. The project uses Next.js 16.2.9, React 19.2.4, and Tailwind CSS 4.

2. For Tailwind CSS 4, there's a specific guide `tailwind-v3-css.md` which might be relevant for migration patterns.

3. The project already has the shell scaffolded - Firebase auth context, basic D1 wrapper, a basic landing page, dashboard layout/page, and some component setup.

Now the task says to build this project. This is a very large project. Let me take a systematic approach - I'll build according to the 10-phase plan from the blueprint, but since there's already a basic skeleton, I need to build out the full project.

Let me check the Tailwind v4 setup since they're using Tailwind v4 now.

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/tailwind-v3-css.md",
  "limit": 40
}
```

**Output:**
```
<path>/public/prontly-notify/node_modules/next/dist/docs/01-app/02-guides/tailwind-v3-css.md</path>
<type>file</type>
<content>
1: ---
2: title: How to install Tailwind CSS v3 in your Next.js application
3: nav_title: Tailwind CSS v3
4: description: Style your Next.js Application using Tailwind CSS v3 for broader browser support.
5: ---
6: 
7: {/* The content of this doc is shared between the app and pages router. You can use the `<PagesOnly>Content</PagesOnly>` component to add content that is specific to the Pages Router. Any shared content should not be wrapped in a component. */}
8: 
9: This guide will walk you through how to install [Tailwind CSS v3](https://v3.tailwindcss.com/) in your Next.js application.
10: 
11: > **Good to know:** For the latest Tailwind 4 setup, see the [Tailwind CSS setup instructions](/docs/app/getting-started/css#tailwind-css).
12: 
13: ## Installing Tailwind v3
14: 
15: Install Tailwind CSS and its peer dependencies, then run the `init` command to generate both `tailwind.config.js` and `postcss.config.js` files:
16: 
17: ```bash package="pnpm"
18: pnpm add -D tailwindcss@^3 postcss autoprefixer
19: npx tailwindcss init -p
20: ```
21: 
22: ```bash package="npm"
23: npm install -D tailwindcss@^3 postcss autoprefixer
24: npx tailwindcss init -p
25: ```
26: 
27: ```bash package="yarn"
28: yarn add -D tailwindcss@^3 postcss autoprefixer
29: npx tailwindcss init -p
30: ```
31: 
32: ```bash package="bun"
33: bun add -D tailwindcss@^3 postcss autoprefixer
34: bunx tailwindcss init -p
35: ```
36: 
37: ## Configuring Tailwind v3
38: 
39: Configure your template paths in your `tailwind.config.js` file:
40: 

(Showing lines 1-40 of 173. Use offset=41 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/dashboard/layout.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app/dashboard/layout.tsx</path>
<type>file</type>
<content>
1: import Link from "next/link";
2: import { LayoutDashboard, Users, Send, BarChart, Bot } from "lucide-react";
3: import { AuthProvider } from "@/context/AuthContext";
4: const navItems = [
5:   { href: "/dashboard", label: "Home", icon: LayoutDashboard },
6:   { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
7:   { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
8:   { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
9:   { href: "/dashboard/ai", label: "AI Tools", icon: Bot },
10: ];
11: 
12: 
13: // Wrap the return in AuthGuard
14: export default function DashboardLayout({ children }: { children: React.ReactNode }) {
15:   return (
16:     <AuthGuard>
17:       <div className="flex min-h-screen bg-background">
18:         {/* ... rest of sidebar code ... */}
19:         <main className="flex-1 p-8">{children}</main>
20:       </div>
21:     </AuthGuard>
22:   );
23: }
24: 
25: export default function DashboardLayout({ children }: { children: React.ReactNode }) {
26:   return (
27:     <div className="flex min-h-screen bg-background">
28:       {/* Sidebar - Desktop */}
29:       <aside className="hidden w-64 border-r border-border bg-surface p-4 md:block">
30:         <div className="mb-8 flex items-center gap-2 px-2 text-lg font-bold">
31:           Prontly Notify
32:         </div>
33:         <nav className="space-y-1">
34:           {navItems.map((item) => (
35:             <Link
36:               key={item.href}
37:               href={item.href}
38:               className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted hover:bg-background hover:text-white"
39:             >
40:               <item.icon className="h-4 w-4" />
41:               {item.label}
42:             </Link>
43:           ))}
44:         </nav>
45:       </aside>
46: 
47:       {/* Main Content */}
48:       <main className="flex-1 p-8">
49:         {children}
50:       </main>
51:     </div>
52:   );
53: }

(End of file - total 53 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/dashboard/page.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/app/dashboard/page.tsx</path>
<type>file</type>
<content>
1: "use client";
2: 
3: import { StateContainer } from "@/components/ui/StateContainer";
4: import { Send } from "lucide-react";
5: import Link from "next/link";
6: 
7: export default function DashboardHome() {
8:   // Mocking the "Empty" state for a new user (Journey A)
9:   const currentState = "empty" as "default" | "loading" | "empty" | "error";
10: 
11:   return (
12:     <div>
13:       <h1 className="mb-6 text-2xl font-bold">Dashboard Home</h1>
14:       
15:       <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
16:         <div className="rounded-lg border border-border bg-surface p-6">
17:           <p className="text-sm text-muted">Total Subscribers</p>
18:           <p className="mt-2 text-3xl font-bold">0</p>
19:         </div>
20:         <div className="rounded-lg border border-border bg-surface p-6">
21:           <p className="text-sm text-muted">Campaigns Sent</p>
22:           <p className="mt-2 text-3xl font-bold">0</p>
23:         </div>
24:         <div className="rounded-lg border border-border bg-surface p-6">
25:           <p className="text-sm text-muted">Avg. CTR</p>
26:           <p className="mt-2 text-3xl font-bold">0%</p>
27:         </div>
28:       </div>
29: 
30:       <h2 className="mb-4 text-xl font-semibold">Recent Campaigns</h2>
31:       <StateContainer
32:         state={currentState}
33:         emptyMessage="You haven't sent any campaigns yet. Time to reach your audience!"
34:         emptyAction={
35:           <Link 
36:             href="/dashboard/campaigns/new" 
37:             className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium hover:bg-primary-light"
38:           >
39:             <Send className="h-4 w-4" /> Send your first campaign
40:           </Link>
41:         }
42:       >
43:         {/* Default state table goes here when populated */}
44:       </StateContainer>
45:     </div>
46:   );
47: }

(End of file - total 47 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/postcss.config.mjs"
}
```

**Output:**
```
<path>/public/prontly-notify/postcss.config.mjs</path>
<type>file</type>
<content>
1: const config = {
2:   plugins: {
3:     "@tailwindcss/postcss": {},
4:   },
5: };
6: 
7: export default config;

(End of file - total 7 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/eslint.config.mjs"
}
```

**Output:**
```
<path>/public/prontly-notify/eslint.config.mjs</path>
<type>file</type>
<content>
1: import { defineConfig, globalIgnores } from "eslint/config";
2: import nextVitals from "eslint-config-next/core-web-vitals";
3: import nextTs from "eslint-config-next/typescript";
4: 
5: const eslintConfig = defineConfig([
6:   ...nextVitals,
7:   ...nextTs,
8:   // Override default ignores of eslint-config-next.
9:   globalIgnores([
10:     // Default ignores of eslint-config-next:
11:     ".next/**",
12:     "out/**",
13:     "build/**",
14:     "next-env.d.ts",
15:   ]),
16: ]);
17: 
18: export default eslintConfig;

(End of file - total 18 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/components/layout/AuthGuard.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/components/layout/AuthGuard.tsx</path>
<type>file</type>
<content>
1: "use client";
2: 
3: import { useAuth } from "@/context/AuthContext";
4: import { useRouter } from "next/navigation";
5: import { Loader2 } from "lucide-react";
6: import { useEffect } from "react";
7: 
8: export function AuthGuard({ children }: { children: React.ReactNode }) {
9:   const { user, loading } = useAuth();
10:   const router = useRouter();
11: 
12:   useEffect(() => {
13:     if (!loading && !user) {
14:       router.push("/login?redirect=" + window.location.pathname);
15:     }
16:   }, [user, loading, router]);
17: 
18:   if (loading || !user) {
19:     return (
20:       <div className="flex h-screen w-full items-center justify-center bg-background">
21:         <Loader2 className="h-8 w-8 animate-spin text-primary" />
22:       </div>
23:     );
24:   }
25: 
26:   return <>{children}</>;
27: }

(End of file - total 27 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/components/ui/StateContainer.tsx"
}
```

**Output:**
```
<path>/public/prontly-notify/src/components/ui/StateContainer.tsx</path>
<type>file</type>
<content>
1: import { Loader2 } from "lucide-react";
2: import { cn } from "@/lib/utils";
3: 
4: type State = "default" | "loading" | "empty" | "error";
5: 
6: interface StateContainerProps {
7:   state: State;
8:   children?: React.ReactNode;
9:   emptyMessage?: string;
10:   emptyAction?: React.ReactNode;
11:   errorMessage?: string;
12: }
13: 
14: export function StateContainer({ state, children, emptyMessage, emptyAction, errorMessage }: StateContainerProps) {
15:   if (state === "loading") {
16:     return (
17:       <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-lg border border-border bg-surface/50">
18:         <Loader2 className="h-6 w-6 animate-spin text-primary" />
19:       </div>
20:     );
21:   }
22: 
23:   if (state === "empty") {
24:     return (
25:       <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/50 p-8 text-center">
26:         <p className="mb-4 text-muted">{emptyMessage || "No data available yet."}</p>
27:         {emptyAction}
28:       </div>
29:     );
30:   }
31: 
32:   if (state === "error") {
33:     return (
34:       <div className="flex flex-col items-center justify-center rounded-lg border border-danger/50 bg-danger/10 p-8 text-center">
35:         <p className="mb-4 text-danger">{errorMessage || "Something went wrong. Please try again."}</p>
36:       </div>
37:     );
38:   }
39: 
40:   return <>{children}</>;
41: }

(End of file - total 41 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 11.7s)

_Thinking:_

Now I have a clear picture of what exists. The project already has:

1. A basic Next.js 16.2.9 + React 19 + Tailwind 4 setup
2. Firebase auth with client SDK (Context provider + AuthGuard)
3. A D1 wrapper for Cloudflare
4. Basic landing page with glassmorphic dark theme
5. Dashboard layout with sidebar navigation
6. StateContainer component for empty/loading/error states
7. ESLint config

Now I need to build the full project according to the blueprint. Given the massive scope, I'll work through the phases systematically. Let me start by creating the full project structure and then build each piece.

Let me first check what the `lib/utils.ts` file looks like since it's used in the StateContainer.

**Tool: glob**

**Input:**
```json
{
  "pattern": "src/lib/utils.ts",
  "path": "/public/prontly-notify"
}
```

**Error:**
```
ripgrep execution failed
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/README.md"
}
```

**Output:**
```
<path>/public/prontly-notify/README.md</path>
<type>file</type>
<content>
1: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
2: 
3: ## Getting Started
4: 
5: First, run the development server:
6: 
7: ```bash
8: npm run dev
9: # or
10: yarn dev
11: # or
12: pnpm dev
13: # or
14: bun dev
15: ```
16: 
17: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
18: 
19: You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
20: 
21: This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
22: 
23: ## Learn More
24: 
25: To learn more about Next.js, take a look at the following resources:
26: 
27: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
28: - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
29: 
30: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
31: 
32: ## Deploy on Vercel
33: 
34: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
35: 
36: Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

(End of file - total 36 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 13.1s)

_Thinking:_

The utils.ts file is imported from StateContainer but may not exist yet. Let me check, then start building the project systematically. Given the massive scope of this project, I need to work efficiently. Let me create a todo list and start building.

The project needs:
1. Tailwind theme with full custom tokens (color system, typography, spacing, etc.)
2. Core UI component library (Button, Input, Card, Badge, Toast, Modal, etc.)
3. Layout components (Sidebar, TopBar, MobileTabBar, Footer)
4. All public pages (Home, Pricing, Docs, Blog, About, Contact, FAQ, Legal)
5. Auth screens (Login, Signup, Forgot Password, Email Verification, Onboarding)
6. Dashboard screens (Home, Sites, Subscribers, Campaigns, Automation, Segments, Analytics, AI, Integration, Team, API Keys, Billing, Settings)
7. Admin screens (Dashboard, Accounts, Sites oversight, Billing, Blog CMS, System, Coupons, Audit)
8. API routes
9. Database schema / migrations
10. Authentication system (middleware, guards)

This is an enormous amount of code. Let me build it phase by phase, starting with the foundation and design system, then moving through features.

Let me start by creating the comprehensive design system (Phase 1-2), then build out the full app.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Check Next.js docs for breaking changes",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Phase 1: Foundation Setup (folder structure, Tailwind theme, env config, routing skeleton)",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Phase 2: Design System & Core UI (components, layout, theme)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Phase 3: Authentication System (Firebase Auth, screens, middleware)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Phase 4: Database & Backend (D1 schema, API routes, validation)",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Phase 5: Feature Development (onboarding, campaigns, automations, segments, AI, billing, team, API keys)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Phase 6: Admin Panel (dashboard, accounts, sites, billing, blog, system, coupons, audit)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Phase 7: SEO & Marketing (metadata, sitemap, schema, OG images, docs hub)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Phase 8: Security Layer (rate limiting, CSRF, headers, audit logging)",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Phase 9/10: Performance, Testing & Deployment",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Check Next.js docs for breaking changes",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Phase 1: Foundation Setup (folder structure, Tailwind theme, env config, routing skeleton)",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Phase 2: Design System & Core UI (components, layout, theme)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 3: Authentication System (Firebase Auth, screens, middleware)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 4: Database & Backend (D1 schema, API routes, validation)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 5: Feature Development (onboarding, campaigns, automations, segments, AI, billing, team, API keys)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Phase 6: Admin Panel (dashboard, accounts, sites, billing, blog, system, coupons, audit)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 7: SEO & Marketing (metadata, sitemap, schema, OG images, docs hub)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 8: Security Layer (rate limiting, CSRF, headers, audit logging)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 9/10: Performance, Testing & Deployment",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 14.2s)

_Thinking:_

Let me start building. First I'll create the foundational files - the lib/utils.ts (since it's already referenced), the env.ts config, and then build out the comprehensive design system in the tailwind config and globals.css. Then I'll create all the UI components, then the layout, then pages.

Given the massive scope of this project, I need to be efficient. I'll create multiple files in parallel using task agents where possible.

Let me start with the foundation files:
1. Create `src/lib/utils.ts` (referenced by StateContainer)
2. Create `src/lib/env.ts` (typed environment config)
3. Update `tailwind.config.ts` with the full design system tokens
4. Update `src/app/globals.css` with the Tailwind v4 theme

Then build the component library, then pages.

Let me start creating files.

**Tool: write**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/lib/utils.ts",
  "content": "import { type ClassValue, clsx } from \"clsx\";\nimport { twMerge } from \"tailwind-merge\";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n\nexport function generateId(): string {\n  return crypto.randomUUID();\n}\n\nexport function formatDate(date: Date | string): string {\n  return new Intl.DateTimeFormat(\"en-IN\", {\n    day: \"numeric\",\n    month: \"short\",\n    year: \"numeric\",\n  }).format(new Date(date));\n}\n\nexport function formatNumber(num: number): string {\n  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;\n  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;\n  return num.toString();\n}\n\nexport function debounce<T extends (...args: unknown[]) => unknown>(\n  fn: T,\n  ms: number\n): (...args: Parameters<T>) => void {\n  let timer: ReturnType<typeof setTimeout>;\n  return (...args: Parameters<T>) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/lib/env.ts",
  "content": "import { z } from \"zod\";\n\nconst envSchema = z.object({\n  // Firebase Client\n  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),\n  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),\n  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),\n  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),\n\n  // Firebase Server (base64-encoded service account JSON)\n  FIREBASE_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),\n\n  // FCM\n  FCM_SERVICE_ACCOUNT_JSON: z.string().min(1).optional(),\n\n  // Cloudflare D1\n  CF_ACCOUNT_ID: z.string().optional(),\n  CF_D1_DATABASE_ID: z.string().optional(),\n  CF_D1_API_TOKEN: z.string().optional(),\n\n  // Cloudflare R2\n  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().optional(),\n  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().optional(),\n  CLOUDFLARE_R2_BUCKET_NAME: z.string().optional(),\n  CLOUDFLARE_R2_PUBLIC_URL: z.string().optional(),\n\n  // Razorpay\n  RAZORPAY_KEY_ID: z.string().optional(),\n  RAZORPAY_KEY_SECRET: z.string().optional(),\n  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),\n\n  // LLM Provider\n  LLM_PROVIDER_API_KEY: z.string().optional(),\n\n  // GA4\n  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),\n\n  // VAPID\n  VAPID_ENCRYPTION_KEY: z.string().optional(),\n\n  // App\n  NEXT_PUBLIC_APP_URL: z.string().default(\"http://localhost:3000\"),\n});\n\nexport function getEnv() {\n  const parsed = envSchema.safeParse(process.env);\n  if (!parsed.success) {\n    console.error(\"Invalid environment variables:\", parsed.error.flatten());\n    return envSchema.parse({});\n  }\n  return parsed.data;\n}\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 16.9s)

_Thinking:_

Now let me update the Tailwind config with the full design system tokens and update the globals.css for Tailwind v4. Then I'll create the full component library.

**Tool: write**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/tailwind.config.ts",
  "content": "import type { Config } from \"tailwindcss\";\n\nconst config: Config = {\n  darkMode: \"class\",\n  content: [\n    \"./src/**/*.{js,ts,jsx,tsx,mdx}\",\n  ],\n  theme: {\n    extend: {\n      colors: {\n        background: \"#0F172A\",\n        surface: \"#111827\",\n        \"surface-glass\": \"rgba(17, 24, 39, 0.6)\",\n        border: {\n          DEFAULT: \"rgba(255, 255, 255, 0.08)\",\n          strong: \"rgba(255, 255, 255, 0.16)\",\n        },\n        primary: {\n          50: \"#EFF6FF\",\n          100: \"#DBEAFE\",\n          200: \"#BFDBFE\",\n          300: \"#93C5FD\",\n          400: \"#60A5FA\",\n          500: \"#3B82F6\",\n          600: \"#2563EB\",\n          700: \"#1D4ED8\",\n          800: \"#1E40AF\",\n          900: \"#1E3A8A\",\n          DEFAULT: \"#3B82F6\",\n        },\n        text: {\n          primary: \"#F8FAFC\",\n          secondary: \"#94A3B8\",\n          muted: \"#64748B\",\n          inverse: \"#0F172A\",\n        },\n        success: \"#22C55E\",\n        warning: \"#F59E0B\",\n        error: \"#EF4444\",\n        info: \"#3B82F6\",\n      },\n      borderRadius: {\n        none: \"0\",\n        sm: \"4px\",\n        DEFAULT: \"8px\",\n        md: \"8px\",\n        lg: \"12px\",\n        xl: \"16px\",\n        \"2xl\": \"24px\",\n        full: \"9999px\",\n      },\n      fontFamily: {\n        sans: [\"Inter\", \"system-ui\", \"sans-serif\"],\n        display: [\"Sora\", \"Inter\", \"system-ui\", \"sans-serif\"],\n      },\n      fontSize: {\n        \"display-2xl\": [\"64px\", { lineHeight: \"72px\", fontWeight: \"700\" }],\n        \"display-xl\": [\"48px\", { lineHeight: \"56px\", fontWeight: \"700\" }],\n        \"display-lg\": [\"36px\", { lineHeight: \"44px\", fontWeight: \"700\" }],\n      },\n      spacing: {\n        1: \"4px\",\n        2: \"8px\",\n        3: \"12px\",\n        4: \"16px\",\n        5: \"20px\",\n        6: \"24px\",\n        8: \"32px\",\n        10: \"40px\",\n        12: \"48px\",\n        16: \"64px\",\n        20: \"80px\",\n        24: \"96px\",\n        32: \"128px\",\n      },\n      boxShadow: {\n        xs: \"0 1px 2px rgba(0,0,0,0.30)\",\n        sm: \"0 1px 3px rgba(0,0,0,0.35)\",\n        md: \"0 4px 6px -1px rgba(0,0,0,0.35)\",\n        lg: \"0 10px 15px -3px rgba(0,0,0,0.40)\",\n        xl: \"0 20px 25px -5px rgba(0,0,0,0.45)\",\n        \"glow-primary\": \"0 0 24px rgba(59,130,246,0.35)\",\n      },\n      animation: {\n        \"fade-in\": \"fadeIn 0.3s ease-out\",\n        \"slide-up\": \"slideUp 0.3s ease-out\",\n        \"slide-down\": \"slideDown 0.2s ease-out\",\n      },\n      keyframes: {\n        fadeIn: {\n          \"0%\": { opacity: \"0\", transform: \"translateY(4px)\" },\n          \"100%\": { opacity: \"1\", transform: \"translateY(0)\" },\n        },\n        slideUp: {\n          \"0%\": { opacity: \"0\", transform: \"translateY(12px)\" },\n          \"100%\": { opacity: \"1\", transform: \"translateY(0)\" },\n        },\n        slideDown: {\n          \"0%\": { opacity: \"0\", transform: \"translateY(-8px)\" },\n          \"100%\": { opacity: \"1\", transform: \"translateY(0)\" },\n        },\n      },\n    },\n  },\n  plugins: [],\n};\nexport default config;\n"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "filePath": "/public/prontly-notify/src/app/globals.css",
  "content": "@import \"tailwindcss\";\n\n@theme inline {\n  --color-background: #0F172A;\n  --color-surface: #111827;\n  --color-surface-glass: rgba(17, 24, 39, 0.6);\n  --color-border-default: rgba(255, 255, 255, 0.08);\n  --color-border-strong: rgba(255, 255, 255, 0.16);\n  --color-text-primary: #F8FAFC;\n  --color-text-secondary: #94A3B8;\n  --color-text-muted: #64748B;\n  --color-text-inverse: #0F172A;\n  --font-sans: \"Inter\", system-ui, sans-serif;\n  --font-display: \"Sora\", \"Inter\", system-ui, sans-serif;\n}\n\n@layer base {\n  * {\n    border-color: rgba(255, 255, 255, 0.08);\n  }\n\n  body {\n    background-color: #0F172A;\n    color: #F8FAFC;\n    font-family: \"Inter\", system-ui, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  :focus-visible {\n    outline: 2px solid #3B82F6;\n    outline-offset: 2px;\n  }\n\n  ::selection {\n    background-color: rgba(59, 130, 246, 0.3);\n    color: #F8FAFC;\n  }\n\n  ::-webkit-scrollbar {\n    width: 6px;\n    height: 6px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: rgba(255, 255, 255, 0.1);\n    border-radius: 3px;\n  }\n\n  ::-webkit-scrollbar-thumb:hover {\n    background: rgba(255, 255, 255, 0.2);\n  }\n}\n\n@layer utilities {\n  .glass {\n    background-color: rgba(17, 24, 39, 0.6);\n    backdrop-filter: blur(24px);\n    -webkit-backdrop-filter: blur(24px);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n  }\n\n  .text-balance {\n    text-wrap: balance;\n  }\n\n  .scrollbar-hide {\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n  }\n\n  .scrollbar-hide::-webkit-scrollbar {\n    display: none;\n  }\n}\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 344.8s)

_Thinking:_

Now let me build the full UI component library and then all the pages. This is a massive task, so I'll use task agents to parallelize the work. Let me create the components and pages in batches.

I'll use a comprehensive approach:
1. First create the core UI components
2. Then create the layout components
3. Then create all pages

Let me start with the UI components first.

**Tool: task**

**Input:**
```json
{
  "description": "Build core UI components",
  "subagent_type": "general",
  "prompt": "Build the complete core UI component library for Prontly Notify, a dark-themed SaaS dashboard for browser push notifications. The project is at /public/prontly-notify, Next.js 16.2.9, Tailwind CSS v4, React 19, TypeScript strict.\n\nThe design system uses:\n- Dark background #0F172A, surface #111827\n- Primary blue #3B82F6 (primary-500), with variants 50-900\n- Text: primary #F8FAFC, secondary #94A3B8, muted #64748B\n- Border: DEFAULT rgba(255,255,255,0.08), strong rgba(255,255,255,0.16)\n- Success #22C55E, Warning #F59E0B, Error #EF4444\n- Font: Inter (body), Sora (display)\n- Border radius: sm=4px, DEFAULT=8px, lg=12px, xl=16px, 2xl=24px, full=9999px\n- Shadows: xs-xl, glow-primary\n- Spacing base: 4px\n\nThere's already a utils.ts at src/lib/utils.ts with `cn()` function. The globals.css at src/app/globals.css is set up with Tailwind v4 @theme inline and base styles.\n\nCreate ALL of the following files under src/components/ui/. Each must be a proper React component with TypeScript types, \"use client\" directive, and full variant/state coverage. Use `cn()` for className merging.\n\n1. **Button.tsx** - Button component with variants (primary, secondary, outline, ghost, destructive, link, icon-only), sizes (sm, md, lg, xl), states (default, hover, active, disabled, loading with spinner). Use forwardRef.\n\n2. **Input.tsx** - Input component with variants for text, email, password (with show/hide toggle), number, textarea. States: default, focus, error (with error message), success, disabled. Use forwardRef.\n\n3. **Card.tsx** - Card component with variants: default, glass (with backdrop-blur-xl), elevated, interactive (hover lift), featured (primary glow). Accept className and children.\n\n4. **Badge.tsx** - Badge component with variants: default, success, warning, error, info, primary. Sizes: sm, md.\n\n5. **Avatar.tsx** - Avatar with image fallback to initials, sizes: sm, md, lg.\n\n6. **Tooltip.tsx** - Simple tooltip on hover/focus with delay.\n\n7. **Skeleton.tsx** - Skeleton loader with variants: card, table-row, chart, text. Accept className for custom shapes.\n\n8. **Toast.tsx** - Toast notification system using a context provider. Variants: success, warning, error, info. Auto-dismiss after 4s with manual close. Export `ToastProvider`, `useToast`, `toast()` function.\n\n9. **Modal.tsx** - Modal dialog with backdrop blur, sizes (sm, md, lg, xl), close on Escape, focus trap, close button. Props: open, onClose, title, children, size.\n\n10. **Drawer.tsx** - Slide-in drawer from right, with backdrop, close on Escape. Props: open, onClose, title, children.\n\n11. **Tabs.tsx** - Tabs component with underline style. Props: tabs (array of {id, label}), activeTab, onChange.\n\n12. **Accordion.tsx** - Accordion with single or multi-open mode. Props: items (array of {title, content}), type ('single'|'multiple').\n\n13. **DataTable.tsx** - Data table with sortable columns, responsive (card view on mobile, table on desktop). Props: columns, data, sortable, onSort, loading, emptyMessage.\n\n14. **Select.tsx** - Select dropdown component with variants matching Input. Props: options, value, onChange, placeholder, error.\n\n15. **Toggle.tsx** - Toggle/switch component. Props: checked, onChange, disabled.\n\n16. **Checkbox.tsx** - Checkbox component. Props: checked, onChange, label, disabled.\n\n17. **ProgressBar.tsx** - Progress bar with optional label, warning/error thresholds at 80%/100%.\n\n18. **DropdownMenu.tsx** - Dropdown menu trigger + items. Props: trigger (ReactNode), items (array of {label, onClick, icon?, destructive?}).\n\n19. **AISuggestionCard.tsx** - AI suggestion card with left accent border, AI badge, accept/reject actions.\n\n20. **NotificationPreview.tsx** - Live notification preview showing Chrome/Edge/Firefox-style push notification mockup. Props: title, body, icon, image.\n\nUse lucide-react for icons. Import { cn } from \"@/lib/utils\". Make sure all components are production-quality with proper TypeScript types, accessibility attributes (aria-*), and consistent styling. Every component should work with the dark theme out of the box.\n\nReturn \"ALL UI COMPONENTS CREATED\" when done."
}
```

**Output:**
```
<task id="ses_10b185d39ffeXwPQ26NolbHm2Z" state="completed">
<task_result>
ALL UI COMPONENTS CREATED
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Build layout components",
  "subagent_type": "general",
  "prompt": "Build the layout components for Prontly Notify at /public/prontly-notify. This is a dark-themed SaaS dashboard for browser push notifications using Next.js 16.2.9, Tailwind v4, React 19, TypeScript strict.\n\nDesign tokens (from tailwind.config.ts):\n- bg-background: #0F172A\n- bg-surface: #111827\n- border-border: rgba(255,255,255,0.08)\n- text-primary: #F8FAFC, text-secondary: #94A3B8, text-muted: #64748B\n- primary: #3B82F6 (primary-500)\n- Font: Inter (font-sans), Sora (font-display)\n\nCreate these layout component files:\n\n1. **src/components/layout/Sidebar.tsx** (\"use client\")\n   - Desktop persistent left sidebar (260px fixed width)\n   - Icon + label for each nav item using lucide-react icons\n   - Active state with primary-500 left border accent\n   - Nav items: Dashboard, Subscribers, Campaigns, Automation, Segments, Analytics, AI Tools, Integration, Team, API Keys, Billing, Settings\n   - Use usePathname() from next/navigation for active state\n   - Props: none (uses navigation state)\n\n2. **src/components/layout/TopBar.tsx** (\"use client\")\n   - Top bar with website switcher dropdown, notification bell, avatar menu\n   - Website switcher: dropdown showing current site name, \"Manage Websites\" link\n   - Avatar menu: Settings, Billing, Logout options\n   - Use lucide-react icons: Bell, ChevronDown, LogOut, Settings, CreditCard\n\n3. **src/components/layout/MobileTabBar.tsx** (\"use client\")\n   - Bottom tab bar for mobile (< 1024px)\n   - 5 visible tabs: Home, Subscribers, Campaigns, Analytics, More\n   - \"More\" opens a slide-out drawer with remaining nav items\n   - Use usePathname() for active state, lucide-react icons\n   - Props: none\n\n4. **src/components/layout/Footer.tsx**\n   - Server component\n   - Marketing site footer with link columns (Product, Resources, Company, Legal)\n   - Links to Home, Pricing, Docs, Blog, About, Contact, FAQ, Privacy, Terms, Cookies, Refund\n   - \"Powered by Prontly\" copyright\n\n5. **src/components/layout/Navbar.tsx**\n   - Server component for the marketing site header\n   - Transparent-to-solid on scroll (use a client wrapper or pure CSS)\n   - Logo + nav links: Product (dropdown), Pricing, Docs, Blog\n   - \"Login\" link + \"Start Free\" CTA button (primary style)\n   - Mobile: hamburger menu\n\nAll components must be properly typed TypeScript with \"use client\" where needed. Use { cn } from \"@/lib/utils\" for classnames. Import icons from lucide-react. Make sure links use next/link.\n\nReturn \"ALL LAYOUT COMPONENTS CREATED\" when done."
}
```

**Output:**
```
<task id="ses_10b1847a7ffeAQX5VA7eIKb7VU" state="completed">
<task_result>
ALL LAYOUT COMPONENTS CREATED
</task_result>
</task>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 755.8s)

_Thinking:_

The UI and layout components have been created. Now I need to build all the pages. Let me create them in parallel batches.

**Tool: task**

**Input:**
```json
{
  "description": "Build public pages",
  "subagent_type": "general",
  "prompt": "Build ALL public marketing pages for Prontly Notify at /public/prontly-notify. This is a dark-themed SaaS platform for browser push notifications. Next.js 16.2.9, Tailwind v4, React 19, TypeScript strict.\n\nThe project already has:\n- src/app/page.tsx (basic landing page exists, needs enhancement)\n- src/app/layout.tsx (root layout with Inter font and dark class)\n- src/app/globals.css (Tailwind v4 @theme inline setup)\n- Layout components at src/components/layout/: Navbar.tsx, Footer.tsx (server components)\n\nDesign tokens (available in Tailwind):\n- bg: #0F172A, surface: #111827\n- border: rgba(255,255,255,0.08)\n- text-primary: #F8FAFC, text-secondary: #94A3B8, text-muted: #64748B\n- primary-500: #3B82F6, primary-400: #60A5FA\n- Cards: rounded-lg or rounded-xl border border-border bg-surface p-6\n- Glass effect: className=\"glass\" (defined in globals.css: bg surface-glass + backdrop-blur-xl + border)\n- Font display: font-display (Sora), body: font-sans (Inter)\n\nCreate these page files following the Screen-by-Screen Wireframe Plan from the blueprint:\n\n1. **src/app/(public)/layout.tsx** - Public layout wrapping all marketing pages with Navbar at top, Footer at bottom, children in between.\n\n2. **src/app/page.tsx** (enhance existing) - Landing page with:\n   - Sticky nav (using Navbar component)\n   - Hero: headline \"Bring visitors back with Browser Push.\" + subheadline + primary CTA \"Start Free — No Card Required\" + secondary \"View Pricing\"\n   - Glassmorphic hero panel with background blur effect\n   - Trust bar: \"Trusted by 2,000+ websites\" \n   - How it works: 3 steps\n   - Feature grid: 3x2 grid of feature cards (Campaigns, Automation, AI, Analytics, Segmentation, Multi-site)\n   - Live demo widget section\n   - Pricing teaser: 3 plan cards (Free, Starter, Growth) with \"Most Popular\" on Growth\n   - Testimonial section\n   - Integration logos: WordPress, Shopify, Webflow, Custom\n   - FAQ accordion (5 items about push notifications)\n   - Final CTA band\n\n3. **src/app/(public)/pricing/page.tsx** - Pricing page with:\n   - Monthly/annual toggle \n   - 4 plan cards side by side: Free (₹0), Starter (₹999/mo), Growth (₹2,999/mo - featured), Scale (₹7,999/mo)\n   - Feature comparison table\n   - FAQ about billing\n   - Enterprise contact section\n\n4. **src/app/(public)/docs/page.tsx** - Docs hub page with:\n   - Search bar\n   - Platform grid: WordPress, Shopify, Webflow, Wix, Custom HTML/JS, REST API\n   - Code snippet example section\n   - Doc navigation sidebar (desktop)\n\n5. **src/app/(public)/blog/page.tsx** - Blog listing page with:\n   - Featured post card\n   - Category filter chips\n   - Post card grid (3-column on desktop)\n   - Newsletter capture\n   - Pagination\n\n6. **src/app/(public)/blog/[slug]/page.tsx** - Blog detail page with:\n   - Article renderer layout\n   - Author info, date, read time\n   - Share buttons\n   - Related posts\n   - Table of contents\n\n7. **src/app/(public)/about/page.tsx** - About page with mission, stats, team\n\n8. **src/app/(public)/contact/page.tsx** - Contact form page\n\n9. **src/app/(public)/faq/page.tsx** - FAQ page with categorized accordion\n\n10. **src/app/(public)/privacy/page.tsx** - Privacy policy page\n11. **src/app/(public)/terms/page.tsx** - Terms of service page\n12. **src/app/(public)/cookies/page.tsx** - Cookie policy page\n13. **src/app/(public)/refund-policy/page.tsx** - Refund policy page\n\nUse appropriate metadata for each page. Import components from @/components/ui/* and use lucide-react icons. Make sure all links are correct. Keep the dark theme consistent throughout.\n\nReturn \"ALL PUBLIC PAGES CREATED\" when done."
}
```

**Output:**
```
<task id="ses_10b1320daffeUMEyKBr6unRije" state="completed">
<task_result>
ALL PUBLIC PAGES CREATED

All 13 files created in `src/app/(public)/`:
- `layout.tsx` - Public layout wrapping Navbar + Footer around all marketing pages
- `page.tsx` - Landing page (hero, trust bar, how-it-works, 3x2 features, live demo, pricing teaser, testimonials, integrations, FAQ, final CTA)
- `pricing/page.tsx` - Pricing with monthly/annual toggle, 4 plan cards, comparison table, FAQ, enterprise CTA
- `docs/page.tsx` - Docs hub with search, 6 platform cards, code snippet, sidebar nav
- `blog/page.tsx` - Blog listing with featured post, category filters, 3-col grid, newsletter, pagination
- `blog/[slug]/page.tsx` - Blog detail with article renderer, author info, share buttons, TOC, related posts
- `about/page.tsx` - About with mission, stats counter, team grid
- `contact/page.tsx` - Contact form with info sidebar
- `faq/page.tsx` - Categorized FAQ accordion (General, Pricing, Integration, Technical)
- `privacy/page.tsx` - Privacy policy
- `terms/page.tsx` - Terms of service
- `cookies/page.tsx` - Cookie policy with cookie table
- `refund-policy/page.tsx` - Refund policy

Also fixed:
- Root `layout.tsx` - removed orphaned dead code outside component
- `Footer.tsx` - fixed `/refund` → `/refund-policy` link
- Root `page.tsx` deleted (route conflict avoidance — `(public)/page.tsx` handles `/`)
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Build auth pages",
  "subagent_type": "general",
  "prompt": "Build ALL authentication pages for Prontly Notify at /public/prontly-notify. This is a dark-themed SaaS platform for browser push notifications. Next.js 16.2.9, Tailwind v4, React 19, TypeScript strict.\n\nThe project already has:\n- src/app/layout.tsx (root layout)\n- src/context/AuthContext.tsx (Firebase auth context with useAuth hook)\n- src/lib/firebase.ts (Firebase client SDK init)\n- src/components/ui/Button.tsx, Input.tsx, Card.tsx, Toast.tsx, Modal.tsx\n- src/components/layout/AuthGuard.tsx\n\nDesign tokens: bg #0F172A, surface #111827, border rgba(255,255,255,0.08), primary #3B82F6, text-primary #F8FAFC, text-secondary #94A3B8, text-muted #64748B.\nComponent patterns: \"glass\" class for glassmorphic cards, rounded-lg border border-border bg-surface p-6 for regular cards.\n\nCreate these auth page files:\n\n1. **src/app/(auth)/layout.tsx** - Auth layout with centered card shell. For desktop (>1024px), show a split layout: left side glassmorphic brand panel with product screenshot/testimonial, right side centered auth card. Mobile: centered card only.\n\n2. **src/app/(auth)/login/page.tsx** (\"use client\") - Login page:\n   - \"Welcome back\" heading\n   - Email input, password input with show/hide toggle\n   - \"Forgot password?\" link\n   - \"Log In\" button\n   - Google/GitHub OAuth buttons\n   - \"Create an account\" link\n   - Uses Firebase signInWithEmailAndPassword, signInWithPopup\n   - Error handling (inline error banner)\n   - Loading state on submit\n   - Use useAuth() context, redirect to /dashboard on success\n\n3. **src/app/(auth)/signup/page.tsx** (\"use client\") - Signup page:\n   - \"Create your free account\" heading\n   - Name, email, password fields\n   - Password strength meter\n   - Terms checkbox\n   - \"Create Account\" button\n   - Google/GitHub OAuth buttons\n   - \"Already have an account?\" link\n   - On success: creates Firebase user, calls POST /api/v1/users to provision D1 row, redirects to /verify-email\n\n4. **src/app/(auth)/forgot-password/page.tsx** (\"use client\") - Forgot password:\n   - Centered card only (no split panel)\n   - Email input\n   - \"Send Reset Link\" button\n   - Success state replaces form\n   - Back to login link\n   - Uses Firebase sendPasswordResetEmail\n\n5. **src/app/(auth)/verify-email/page.tsx** (\"use client\") - Email verification:\n   - Illustration + heading\n   - Shows masked email\n   - \"Resend email\" button with 60s cooldown\n   - \"Change email\" link\n   - Auto-poll Firebase user.reload() every 5s to detect emailVerified\n   - Auto-redirect to /onboarding once verified\n\n6. **src/app/(auth)/onboarding/page.tsx** (\"use client\") - Website Onboarding Wizard (3 steps):\n   - Step indicator (1/3, 2/3, 3/3)\n   - Step 1: Website URL + name + category dropdown\n   - Step 2: Platform selection (WordPress, Shopify, Custom) as large tappable cards\n   - Step 3: Code snippet display with copy button + \"I've added it\" verify button\n   - Success: confetti-like animation + \"Go to Dashboard\" CTA\n   - \"Skip for now\" option that still goes to dashboard\n   - API calls: POST /api/v1/sites (create), GET /api/v1/sites/:id/verify-install (poll), PATCH /api/v1/sites/:id\n\nAll pages should use lucide-react icons, proper TypeScript types, and follow the dark theme. Auth pages should be noindex. Use proper form validation.\n\nReturn \"ALL AUTH PAGES CREATED\" when done."
}
```

**Output:**
```
<task id="ses_10b130abeffeqdsEnfi3pG97Mg" state="completed">
<task_result>
**ALL AUTH PAGES CREATED**
</task_result>
</task>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 1442.7s)

_Thinking:_

Now I need to build the dashboard pages and admin pages. These are the most complex parts. Let me create them in parallel.

**Tool: task**

**Input:**
```json
{
  "description": "Build dashboard pages",
  "subagent_type": "general",
  "prompt": "Build ALL user dashboard pages for Prontly Notify at /public/prontly-notify. This is a dark-themed SaaS platform for browser push notifications. Next.js 16.2.9, Tailwind v4, React 19, TypeScript strict.\n\nThe project has:\n- src/app/dashboard/layout.tsx (sidebar + main area wrapper - needs enhancement)\n- src/app/dashboard/page.tsx (basic dashboard home)\n- src/components/layout/: Sidebar.tsx, TopBar.tsx, MobileTabBar.tsx (available for use)\n- src/components/ui/: Button, Input, Card, Badge, Modal, Drawer, Tabs, DataTable, Select, Toggle, Toast, Skeleton, ProgressBar, DropdownMenu, AISuggestionCard, NotificationPreview, Checkbox, Accordion, StateContainer\n\nDesign tokens:\n- Style: \"rounded-lg border border-border bg-surface p-6\" for cards\n- Glass effect: className=\"glass\"\n- KPI cards: \"rounded-lg border border-border bg-surface p-6\" with metric value in large font\n- Text: text-primary, text-secondary, text-muted\n- Primary button: \"rounded-lg bg-primary px-4 py-2 font-medium hover:bg-primary-600\"\n\nCreate/modify these dashboard page files:\n\n1. **src/app/dashboard/layout.tsx** - Enhance dashboard layout to use Sidebar (desktop), MobileTabBar (mobile), TopBar. Already has AuthGuard wrapper.\n\n2. **src/app/dashboard/page.tsx** (\"use client\") - Dashboard Home:\n   - KPI row: Total Subscribers, Sends Today, Avg CTR, Active Campaigns (with sparklines)\n   - Subscriber growth sparkline chart (use a simple inline SVG or placeholder chart)\n   - Recent campaigns list (last 5)\n   - AI insight card (using AISuggestionCard component)\n   - Empty state handling\n\n3. **src/app/dashboard/sites/page.tsx** (\"use client\") - Website Switcher & Add Website:\n   - \"Your Websites\" title + \"Add Website\" button\n   - Website card grid (favicon/initial, name, domain, subscriber count, status badge)\n   - Usage progress bar (\"Using 2 of 3 sites on Growth plan\")\n   - Add-website ghost card\n\n4. **src/app/dashboard/subscribers/page.tsx** (\"use client\") - Subscribers:\n   - \"Subscribers\" header with total count\n   - Filter chips: All, Active, Unsubscribed\n   - Search input\n   - Subscriber data table (browser icon, location, subscribed date, status)\n   - Export CSV button\n   - Create Segment from Filter action\n   - Empty state for zero subscribers\n\n5. **src/app/dashboard/campaigns/page.tsx** (\"use client\") - Campaigns History:\n   - Header + \"New Campaign\" button (links to /dashboard/campaigns/new)\n   - Status filter chips: All, Sent, Scheduled, Draft, Failed\n   - Campaign data table (title, status badge, sent date, delivered, CTR)\n   - Row actions: Duplicate, Edit (draft), View Analytics, Delete\n   - Empty state\n\n6. **src/app/dashboard/campaigns/new/page.tsx** (\"use client\") - Campaign Builder:\n   - 4 steps/tabs: Compose, Target, Schedule, Review\n   - Compose: title field with AI-suggest button, body field with char counter (max 240), icon/image URL input, click URL input\n   - Live NotificationPreview component that updates reactively\n   - Target: audience selector (All / Segment picker)\n   - Schedule: Send Now / Schedule for Later date picker / AI-suggested time\n   - Review: summary + \"Send Campaign\" button\n   - Save as Draft action\n\n7. **src/app/dashboard/automation/page.tsx** (\"use client\") - Automation / Drip Builder:\n   - Automations list with active/paused toggle per card\n   - \"New Automation\" button -> opens template gallery (Welcome Series, Re-engagement, Abandoned Content)\n   - Simple linear step builder (not a visual canvas - keep accessible)\n   - Trigger card, wait/send/condition steps\n   - Empty state\n\n8. **src/app/dashboard/segments/page.tsx** (\"use client\") - Segments:\n   - AI-suggested segments banner (2-3 cards)\n   - Segments data table (name, count, type, last updated)\n   - Rule builder: condition rows (attribute/operator/value) with AND/OR toggle\n   - Live subscriber count preview\n\n9. **src/app/dashboard/analytics/page.tsx** (\"use client\") - Analytics:\n   - Date range selector (7d/30d/90d/custom)\n   - AI Summary card with \"Regenerate\" button\n   - KPI cards: Subscribers Net Growth, Avg CTR, Total Delivered, Unsubscribe Rate\n   - Charts (use inline SVG placeholders - line, bar, donut shapes)\n   - Top campaigns table\n   - Export CSV\n\n10. **src/app/dashboard/ai/page.tsx** (\"use client\") - AI Tools Hub:\n    - Header + AI usage meter\n    - Feature card grid: AI Title Generator, CTR Optimizer, Smart Scheduling, Campaign Recommendations, Audience Segmentation, Analytics Summaries\n    - Each card has icon, description, \"Try it\" button\n    - Quick-use inline panels for each feature\n    - Upgrade prompt when credits exhausted\n\n11. **src/app/dashboard/integration/page.tsx** (\"use client\") - Integration/SDK Setup:\n    - Install status badge (Live/Not Detected)\n    - Platform tabs: WordPress, Shopify, Webflow, Custom JS, REST API\n    - Code snippet with copy button\n    - Service worker download\n    - Test Installation button\n    - Verification checklist\n\n12. **src/app/dashboard/team/page.tsx** (\"use client\") - Team Management:\n    - \"Invite Member\" button\n    - Member data table (avatar, name/email, role badge, status)\n    - Role editor dropdown (Owner/Admin/Member)\n    - Pending invites section\n    - Invite modal (email + role + site access)\n\n13. **src/app/dashboard/api-keys/page.tsx** (\"use client\") - API Keys:\n    - \"Generate New Key\" button\n    - Keys data table (name, masked key prefix, scope badges, created, last used)\n    - Key generation modal with one-time reveal warning\n    - Revoke confirmation dialog\n\n14. **src/app/dashboard/billing/page.tsx** (\"use client\") - Billing & Subscription:\n    - Current plan card (name, price, renewal date) + \"Manage Plan\" button\n    - Usage meters: Subscribers, Websites, AI Credits, Team Seats (progress bars)\n    - Payment method card\n    - Invoice history table with PDF download\n    - Plan change modal\n    - Cancel subscription (de-emphasized)\n\n15. **src/app/dashboard/settings/page.tsx** (\"use client\") - Account Settings:\n    - Tabbed sections: Profile, Security, Notifications, Workspace\n    - Profile: avatar upload, name, email\n    - Security: change password, 2FA toggle, active sessions\n    - Notifications: toggle switches for emails\n    - Workspace: workspace name, timezone\n\nAll pages must use lucide-react for icons, have proper TypeScript types, handle loading/error/empty states. Use useToast() for confirmation toasts. All API calls should be mocked with placeholder fetch calls that return promises - structure the code so real API integration is easy later. Return \"ALL DASHBOARD PAGES CREATED\" when done."
}
```

**Output:**
```
<task id="ses_10b078c61ffeEDuHvO0DASxM5c" state="completed">
<task_result>
ALL DASHBOARD PAGES CREATED

**15 pages / 2,579 total lines** across:

| Page | Route | 
|------|-------|
| Enhanced layout | `/dashboard` (wraps Sidebar + TopBar + MobileTabBar) |
| Dashboard Home | `/dashboard` — KPIs, sparklines, recent campaigns, AI insights |
| Sites | `/dashboard/sites` — website cards, usage bar, add modal |
| Subscribers | `/dashboard/subscribers` — filter chips, search, DataTable, export/segment actions |
| Campaigns | `/dashboard/campaigns` — status filters, DataTable, row dropdown actions |
| Campaign Builder | `/dashboard/campaigns/new` — 4-step tabs, live NotificationPreview |
| Automation | `/dashboard/automation` — drip list with toggle, template gallery, step builder |
| Segments | `/dashboard/segments` — AI suggestions banner, rule builder with AND/OR, live count |
| Analytics | `/dashboard/analytics` — date range, AI summary, KPI cards, SVG charts, top campaigns |
| AI Tools | `/dashboard/ai` — credit meter, 6 feature cards with inline panels, upgrade prompt |
| Integration | `/dashboard/integration` — platform tabs, code snippets with copy, checklist |
| Team | `/dashboard/team` — member DataTable with role Select, pending invites, invite modal |
| API Keys | `/dashboard/api-keys` — key table, generate modal with one-time reveal, revoke confirm |
| Billing | `/dashboard/billing` — plan card, 4 usage bars, payment method, invoice table, plan modal |
| Settings | `/dashboard/settings` — 4 tabs: Profile, Security (2FA/sessions), Notifications, Workspace |

All pages: `"use client"`, TypeScript strict, `lucide-react` icons, `useToast()` confirmations, mock async-ready API calls, loading/empty/error states via `StateContainer`/`Skeleton`, dark theme with design tokens from globals.css.
</task_result>
</task>
```

**Tool: task**

**Input:**
```json
{
  "description": "Build admin panel pages",
  "subagent_type": "general",
  "prompt": "Build ALL admin panel pages for Prontly Notify at /public/prontly-notify. This is a dark-themed internal staff admin panel for a SaaS push notification platform. Next.js 16.2.9, Tailwind v4, React 19, TypeScript strict.\n\nThe project has:\n- src/components/ui/: Button, Input, Card, Badge, Modal, Drawer, Tabs, DataTable, Select, Toggle, Toast, Skeleton, ProgressBar, DropdownMenu\n\nDesign tokens:\n- bg-background: #0F172A, bg-surface: #111827, border: rgba(255,255,255,0.08)\n- text-primary: #F8FAFC, text-secondary: #94A3B8, text-muted: #64748B\n- primary: #3B82F6, success: #22C55E, warning: #F59E0B, error: #EF4444\n- UI pattern: \"rounded-lg border border-border bg-surface p-6\"\n- Glass effect: \"glass\" class\n- Table: className=\"w-full\" with proper styling\n\nCreate ALL admin page files under src/app/admin/:\n\n1. **src/app/admin/layout.tsx** - Admin layout with sidebar (different nav from dashboard). Sidebar items: Overview, Accounts, Sites, Revenue, Blog, System, Coupons, Audit & Flags. Top bar with admin badge. Role guard checking is_staff.\n\n2. **src/app/admin/page.tsx** (\"use client\") - Admin Dashboard:\n   - KPI row: MRR, Active Accounts, Total Subscribers, Notifications Sent Today, Delivery Success Rate, Failed Payments\n   - Alerts feed: recent system warnings (FCM degradation, etc.)\n   - Revenue trend chart (inline SVG placeholder)\n   - Recent signups list\n   - Auto-refresh every 60s\n\n3. **src/app/admin/accounts/page.tsx** (\"use client\") - User & Account Management:\n   - Search bar + filter chips (Plan tier, Status)\n   - Accounts data table: Name, Email, Plan, MRR, Sites, Status, Signup Date\n   - Click row -> right side detail panel: profile, websites, subscription, recent activity\n   - Actions: Impersonate (with audit log), Suspend/Reinstate (requires reason), Reset Password\n   - All destructive actions write to audit log\n\n4. **src/app/admin/sites/page.tsx** (\"use client\") - Website Oversight:\n   - Filter: Install Status (Live/Broken), Flagged\n   - Sites data table: Domain, Owner, Subscribers, Install Status, Last Send, Flag Status\n   - Actions: \"Disable Sending\" (kill-switch), \"Flag for Review\"\n   - Reason required before destructive actions\n\n5. **src/app/admin/billing/page.tsx** (\"use client\") - Subscription & Revenue Management:\n   - Tabs: Overview, Failed Payments, Cancellations, Coupons\n   - KPI row: MRR, ARPU, Churn Rate, Failed Payment Count\n   - Failed Payments table with \"Retry Charge\" action\n   - Coupon performance table\n\n6. **src/app/admin/blog/page.tsx** (\"use client\") - Blog CMS:\n   - Status filter: Draft, Scheduled, Published\n   - Posts data table: Title, Status, Author, Date\n   - Editor view: title field, rich text body textarea, category/tag selectors\n   - Featured image uploader\n   - SEO fields panel (meta title, description, slug)\n   - Publish/Schedule/Save Draft controls\n\n7. **src/app/admin/system/page.tsx** (\"use client\") - Delivery Monitoring & System Health:\n   - System status badge: Operational/Degraded/Down\n   - Metric cards: FCM Success Rate, Avg Delivery Latency, Queue Depth, API Error Rate\n   - Time-series charts (inline SVG placeholders)\n   - Error log table with filters\n\n8. **src/app/admin/coupons/page.tsx** (\"use client\") - Coupons & Discounts:\n   - \"New Coupon\" button\n   - Coupons data table: Code, Type, Value, Plan Restriction, Expiry, Redemptions, Status\n   - Creation modal: code, type (%/flat), value, expiry, max uses, eligible plans\n\n9. **src/app/admin/audit-and-flags/page.tsx** (\"use client\") - Audit Logs & Feature Flags:\n   - Tabs: Audit Logs / Feature Flags\n   - Audit Logs: searchable/filterable table (actor, action, target, timestamp) - read-only\n   - Feature Flags: table with toggle + rollout percentage slider + eligible plans\n\nAll pages must:\n- Use \"use client\" directive\n- Import from @/components/ui/* and @/lib/utils\n- Use lucide-react icons\n- Handle loading/error states with Skeleton components\n- Use proper TypeScript types\n- Include proper accessibility attributes\n- Be noindex (metadata: { robots: { index: false } })\n\nThe admin panel uses the same dark theme. All destructive actions should require a reason + confirmation. API calls should be structured as mock fetch calls for now.\n\nReturn \"ALL ADMIN PAGES CREATED\" when done."
}
```

**Error:**
```
Tool execution aborted
```

---

## User

hi

---

## Assistant (Build · GLM 5.2 (Free) · 70.4s)

---

## User

continue

---

## Assistant (Build · DeepSeek V4 Flash Free · 209.7s)

---

## User

continue

---

## Assistant (Build · DeepSeek V4 Flash Free · 19.6s)

---

## User

continue

---

## Assistant (Build · GLM 4.7 Flash (Free) · 27.4s)

---

## User

hi

---

## Assistant (Build · GLM 4.7 Flash (Free) · 7.4s)

---

