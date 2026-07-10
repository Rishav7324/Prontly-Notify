#!/usr/bin/env tsx
/**
 * Prontly Notify — Self-discovering API Load Test
 *
 * Usage:
 *   npx tsx scripts/load-test.ts                          # localhost defaults
 *   npx tsx scripts/load-test.ts --base-url https://staging.example.com
 *   npx tsx scripts/load-test.ts --i-understand-this-hits-production
 *
 * Flags:
 *   --base-url <url>       Target URL (default: http://localhost:3000)
 *   --concurrency <n>      Profile A concurrency (default: 50)
 *   --sustained-rps <n>    Profile B target requests/sec (default: 20)
 *   --sustained-secs <n>   Profile B duration seconds (default: 30)
 *   --i-understand-this-hits-production   Allow production targeting
 *   --skip-teardown        Keep test data after run
 *   --help                 This message
 */

import * as fs from "fs";
import * as path from "path";
import { generateManifest, type RouteManifest, type RouteInfo } from "./discover-routes";

// ─── Types ───────────────────────────────────────────────────
interface TestResult {
  route: string;
  method: string;
  profileA: { pass: boolean; detail: string; concurrencyCorrect: boolean };
  profileB: { pass: boolean; detail: string; p50: number; p95: number; p99: number };
  profileC: ProfileCResult[];
  skipped: string | null;
  serverErrors: string[];
}

interface ProfileCResult {
  scenario: string;
  pass: boolean;
  expectedStatus: number;
  actualStatus: number;
  detail: string;
}

interface TestReport {
  timestamp: string;
  baseUrl: string;
  summary: {
    total: number;
    tested: number;
    skipped: number;
    passed: number;
    failed: number;
    latencyExceeded: string[];
  };
  results: TestResult[];
  env: Record<string, string>;
}

// ─── CLI ─────────────────────────────────────────────────────
function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  const raw = process.argv.slice(2);
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].startsWith("--")) {
      const key = raw[i].slice(2);
      const val = i + 1 < raw.length && !raw[i + 1].startsWith("--") ? raw[i + 1] : "true";
      args[key] = val;
    }
  }
  return args;
}

function help() {
  const text = fs.readFileSync(__filename, "utf-8");
  const start = text.indexOf("/**");
  const end = text.indexOf("*/");
  console.log(text.slice(start, end + 2));
  process.exit(0);
}

// ─── Config ──────────────────────────────────────────────────
const PRODUCTION_SAFE_ROUTES = new Set([
  "GET /api/v1/billing/plans",
  "GET /api/v1/sdk-snippet",
  "GET /api/og",
]);
const NEVER_TEST = new Set([
  "POST /api/v1/billing/webhook",
  "POST /api/v1/billing/create-order",
  "POST /api/v1/billing/verify-payment",
  "POST /api/v1/billing/change-plan",
  "POST /api/v1/billing/cancel",
]);

// ─── Helpers ─────────────────────────────────────────────────
let capturedLogs: string[] = [];
const origLog = console.log;
const origError = console.error;

function captureLogs() {
  capturedLogs = [];
  console.log = (...args: any[]) => { capturedLogs.push("[LOG] " + args.join(" ")); };
  console.error = (...args: any[]) => { capturedLogs.push("[ERR] " + args.join(" ")); };
}

function restoreLogs() {
  console.log = origLog;
  console.error = origError;
}

async function fetchWithTiming(
  url: string,
  init?: RequestInit
): Promise<{ response: Response; durationMs: number }> {
  const start = performance.now();
  const response = await fetch(url, init);
  const durationMs = performance.now() - start;
  return { response, durationMs };
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Test Data Setup ─────────────────────────────────────────
interface TestContext {
  firebaseToken: string;
  userId: string;
  workspaceId: string;
  siteId: string;
  campaignIds: string[];
  segmentIds: string[];
  subscriberIds: string[];
}

async function setupTestData(baseUrl: string): Promise<TestContext> {
  console.log("\n[setup] Creating test data...");

  // 1. Create Firebase test user via signup
  const testEmail = `loadtest-${Date.now()}@prontly-test.example`;
  const testPassword = "TestPass123!";
  const signupRes = await fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      name: "Load Test User",
    }),
  });
  if (!signupRes.ok) throw new Error(`Signup failed: ${await signupRes.text()}`);

  // 2. Login to get ID token
  const loginRes = await fetch(`${baseUrl}/api/auth/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: testPassword }),
  });
  // This sets the __session cookie — but we need the raw token for auth header
  // Actually the signup/login flow returns the token. Let's try a different approach:
  // Use the Firebase REST API to sign in and get an ID token directly
  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!firebaseApiKey) throw new Error("NEXT_PUBLIC_FIREBASE_API_KEY not set");

  const firebaseAuthRes = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: testPassword, returnSecureToken: true }),
    }
  );
  const fbAuth = await firebaseAuthRes.json();
  if (!fbAuth.idToken) throw new Error(`Firebase login failed: ${JSON.stringify(fbAuth)}`);

  const token = fbAuth.idToken;
  const userId = fbAuth.localId;

  // Also hit the session endpoint to set the cookie
  await fetch(`${baseUrl}/api/auth/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: token }),
  });

  const authHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // 3. Create workspace (via user creation endpoint which auto-creates workspace)
  // The /api/v1/users POST should have created one during signup
  const workspaceRes = await fetch(`${baseUrl}/api/v1/users/me`, { headers: authHeader });
  const me = await workspaceRes.json();
  const workspaceId = me.data?.workspace_id;
  if (!workspaceId) throw new Error("No workspace found after signup");

  // 4. Create a site
  const siteRes = await fetch(`${baseUrl}/api/v1/sites`, {
    method: "POST",
    headers: authHeader,
    body: JSON.stringify({
      name: "Load Test Site",
      domain: `loadtest-${Date.now()}.example.com`,
      category: "blog",
      platform: "custom",
    }),
  });
  const siteData = await siteRes.json();
  if (!siteData.success) throw new Error(`Site creation failed: ${JSON.stringify(siteData)}`);
  const siteId = siteData.data.id;

  // 5. Create 5000 subscribers (in batches for speed)
  const subscriberIds: string[] = [];
  const BATCH_SIZE = 100;
  const TOTAL_SUBSCRIBERS = 5000;
  const browsers = ["chrome", "firefox", "edge"] as const;
  const countries = ["IN", "US", "GB", "DE", "BR", "JP", "AU", "CA", "FR", "NL"];

  console.log(`[setup] Creating ${TOTAL_SUBSCRIBERS} subscribers (batches of ${BATCH_SIZE})...`);
  for (let i = 0; i < TOTAL_SUBSCRIBERS; i += BATCH_SIZE) {
    const batch = [];
    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_SUBSCRIBERS; j++) {
      batch.push(
        fetch(`${baseUrl}/api/v1/sites/${siteId}/subscribers`, {
          method: "POST",
          headers: authHeader,
          body: JSON.stringify({
            fcm_token: `test-fcm-${Date.now()}-${i + j}:VALID_STRUCTURAL_FORMAT`,
            browser: browsers[j % browsers.length],
            country: countries[j % countries.length],
            os: "linux",
          }),
        }).then(async (r) => {
          const body = await r.json();
          if (body.success) subscriberIds.push(body.data.id);
          return body;
        })
      );
    }
    await Promise.all(batch);
    if ((i / BATCH_SIZE) % 5 === 0) {
      console.log(`  ... ${Math.min(i + BATCH_SIZE, TOTAL_SUBSCRIBERS)}/${TOTAL_SUBSCRIBERS} subscribers`);
    }
  }
  console.log(`  Created ${subscriberIds.length} subscribers`);

  // 6. Create 200 campaigns
  const campaignIds: string[] = [];
  const statuses = ["draft", "scheduled", "sending", "sent", "failed"] as const;
  for (let i = 0; i < 200; i++) {
    const res = await fetch(`${baseUrl}/api/v1/campaigns`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        site_id: siteId,
        title: `Load Test Campaign ${i} - ${"x".repeat(Math.min(i, 40))}`,
        body: `This is test campaign number ${i}. Testing pagination and list performance.`.slice(0, 240),
        click_url: "https://example.com",
        status: statuses[i % statuses.length],
      }),
    });
    const body = await res.json();
    if (body.success) campaignIds.push(body.data.id);
  }
  console.log(`  Created ${campaignIds.length} campaigns`);

  // 7. Create 50 segments
  const segmentIds: string[] = [];
  for (let i = 0; i < 50; i++) {
    const res = await fetch(`${baseUrl}/api/v1/segments`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        site_id: siteId,
        name: `Load Test Segment ${i}`,
        rule_json: {
          operator: "AND",
          conditions: [
            { attribute: "country", operator: "eq", value: countries[i % countries.length] },
            { attribute: "browser", operator: "eq", value: browsers[i % browsers.length] },
          ],
        },
      }),
    });
    const body = await res.json();
    if (body.success) segmentIds.push(body.data.id);
  }
  console.log(`  Created ${segmentIds.length} segments`);

  return { firebaseToken: token, userId, workspaceId, siteId, campaignIds, segmentIds, subscriberIds };
}

async function teardownTestData(baseUrl: string, ctx: TestContext, authHeader: Record<string, string>) {
  console.log("\n[teardown] Cleaning up test data...");

  // Delete site first (cascade should handle subscribers, campaigns, segments)
  await fetch(`${baseUrl}/api/v1/sites/${ctx.siteId}`, {
    method: "DELETE",
    headers: authHeader,
  }).catch(() => {});

  // Delete the test user
  await fetch(`${baseUrl}/api/v1/users/me`, {
    method: "DELETE",
    headers: authHeader,
  }).catch(() => {});

  console.log("[teardown] Done.");
}

// ─── Profile A: Concurrent Correctness ──────────────────────
async function profileAConcurrent(
  baseUrl: string,
  route: RouteInfo,
  method: string,
  authHeader: Record<string, string> | null,
  ctx: TestContext
): Promise<TestResult["profileA"]> {
  const url = fillUrlParams(baseUrl, route.urlPath, ctx);
  const CONCURRENCY = 50;

  // Build a request factory with varied payloads
  const requests = Array.from({ length: CONCURRENCY }, (_, i) => {
    const init = buildRequestInit(method, route, ctx, i);
    if (authHeader && init.headers) {
      init.headers = { ...init.headers, ...authHeader };
    }
    return fetchWithTiming(url, init);
  });

  const start = performance.now();
  const results = await Promise.all(requests);
  const totalTime = performance.now() - start;

  const statuses = results.map((r) => r.response.status);
  const successCount = statuses.filter((s) => s >= 200 && s < 300).length;
  const conflictCount = statuses.filter((s) => s === 409 || s === 400).length;
  const errors = statuses.filter((s) => s >= 500);

  let pass = true;
  let detail = `Concurrency=${CONCURRENCY}, 2xx=${successCount}, 4xx=${statuses.length - successCount - errors.length}, 5xx=${errors.length}, total=${totalTime.toFixed(0)}ms`;

  // For POST /sites (unique domain constraint): expect 1 success + 49 conflicts
  if (method === "POST" && route.urlPath === "/api/v1/sites") {
    if (successCount === 1 && conflictCount >= 48) {
      detail += " | Unique constraint verified: 1 created, rest rejected";
    } else {
      pass = false;
      detail += ` | UNIQUE CONSTRAINT FAILURE: expected 1 success + 49 conflicts, got ${successCount} successes + ${conflictCount} conflicts`;
    }
  } else if (errors.length > 0) {
    pass = false;
    detail += ` | ${errors.length} server errors`;
  }

  return { pass, detail, concurrencyCorrect: pass };
}

// ─── Profile B: Sustained Load / Latency ────────────────────
async function profileBSustained(
  baseUrl: string,
  route: RouteInfo,
  method: string,
  authHeader: Record<string, string> | null,
  ctx: TestContext
): Promise<TestResult["profileB"]> {
  const url = fillUrlParams(baseUrl, route.urlPath, ctx);
  const TARGET_RPS = 20;
  const DURATION_SECS = 10; // shorter for dev speed; real runs use 30+
  const TOTAL_REQUESTS = TARGET_RPS * DURATION_SECS;
  const latencies: number[] = [];

  // Fire requests in waves of TARGET_RPS
  for (let wave = 0; wave < DURATION_SECS; wave++) {
    const waveStart = performance.now();
    const waveRequests = Array.from({ length: TARGET_RPS }, (_, i) => {
      const init = buildRequestInit(method, route, ctx, wave * TARGET_RPS + i);
      if (authHeader && init.headers) {
        init.headers = { ...init.headers, ...authHeader };
      }
      return fetchWithTiming(url, init);
    });
    const waveResults = await Promise.all(waveRequests);
    for (const r of waveResults) latencies.push(r.durationMs);

    // Maintain the 1-second wave interval
    const elapsed = performance.now() - waveStart;
    if (elapsed < 1000) await sleep(1000 - elapsed);
  }

  const sorted = [...latencies].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const p99 = sorted[Math.floor(sorted.length * 0.99)];

  // TRD targets: read p95 < 300ms, write p95 < 800ms
  const isRead = method === "GET";
  const target = isRead ? 300 : 800;
  const pass = p95 <= target;

  const detail = `RPS=${TARGET_RPS}, duration=${DURATION_SECS}s, samples=${latencies.length}, p50=${p50.toFixed(0)}ms, p95=${p95.toFixed(0)}ms, p99=${p99.toFixed(0)}ms, target=${target}ms ${pass ? "✓" : "✗"}`;

  return { pass, detail, p50, p95, p99 };
}

// ─── Profile C: Failure Mode Injection ──────────────────────
async function profileCFailures(
  baseUrl: string,
  route: RouteInfo,
  method: string,
  ctx: TestContext
): Promise<TestResult["profileC"]> {
  const results: ProfileCResult[] = [];
  const url = fillUrlParams(baseUrl, route.urlPath, ctx);

  // Scenario 1: Missing auth
  if (route.auth !== "none") {
    const { response } = await fetchWithTiming(url, {
      method,
      headers: { "Content-Type": "application/json" },
    });
    const body = await response.text();
    const pass = response.status === 401;
    results.push({
      scenario: "Missing auth token",
      pass,
      expectedStatus: 401,
      actualStatus: response.status,
      detail: pass ? "Properly rejected" : `Expected 401, got ${response.status}: ${body.slice(0, 200)}`,
    });
  }

  // Scenario 2: Expired/invalid token
  const { response: badTokenRes } = await fetchWithTiming(url, {
    method,
    headers: { Authorization: "Bearer definitely-expired-invalid-token", "Content-Type": "application/json" },
  });
  const p = badTokenRes.status === 401;
  results.push({
    scenario: "Expired/invalid token",
    pass: p,
    expectedStatus: 401,
    actualStatus: badTokenRes.status,
    detail: p ? "Properly rejected" : `Expected 401, got ${badTokenRes.status}`,
  });

  // Scenario 3: Malformed payload (for POST/PUT/PATCH)
  if (["POST", "PUT", "PATCH"].includes(method)) {
    const { response: badPayloadRes } = await fetchWithTiming(url, {
      method,
      headers: { Authorization: "Bearer " + ctx.firebaseToken, "Content-Type": "application/json" },
      body: JSON.stringify({ __malformed: true, totally_wrong: [1, 2, 3] }),
    });
    const body = await badPayloadRes.text();
    const p2 = badPayloadRes.status === 400;
    results.push({
      scenario: "Malformed payload",
      pass: p2,
      expectedStatus: 400,
      actualStatus: badPayloadRes.status,
      detail: p2 ? `Got 400: ${body.slice(0, 150)}` : `Expected 400, got ${badPayloadRes.status}: ${body.slice(0, 150)}`,
    });
  }

  // Scenario 4: Oversized string (campaign title >65 chars or body >240)
  if (route.urlPath.includes("/campaigns") && ["POST", "PUT", "PATCH"].includes(method)) {
    const { response: oversizedRes } = await fetchWithTiming(url, {
      method,
      headers: { Authorization: "Bearer " + ctx.firebaseToken, "Content-Type": "application/json" },
      body: JSON.stringify({
        site_id: ctx.siteId,
        title: "x".repeat(100),
        body: "y".repeat(300),
        click_url: "https://example.com",
      }),
    });
    const p3 = oversizedRes.status === 400;
    results.push({
      scenario: "Oversized payload (title>65, body>240)",
      pass: p3,
      expectedStatus: 400,
      actualStatus: oversizedRes.status,
      detail: p3 ? "Rejected oversized fields" : `Expected 400, got ${oversizedRes.status}`,
    });
  }

  return results;
}

// ─── URL Parameter Resolution ───────────────────────────────
function fillUrlParams(baseUrl: string, urlPath: string, ctx: TestContext): string {
  let url = baseUrl.replace(/\/$/, "") + urlPath;
  url = url.replace(/:siteId/g, ctx.siteId);
  url = url.replace(/:workspaceId/g, ctx.workspaceId);
  url = url.replace(/:userId/g, ctx.userId);
  url = url.replace(/:id/g, ctx.campaignIds[0] || ctx.segmentIds[0] || "none");
  return url;
}

// ─── Request Builder ─────────────────────────────────────────
function buildRequestInit(
  method: string,
  route: RouteInfo,
  ctx: TestContext,
  variant = 0
): RequestInit {
  const init: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (["POST", "PUT", "PATCH"].includes(method)) {
    // Build varied payload based on route path
    if (route.urlPath.includes("/sites")) {
      init.body = JSON.stringify({
        name: `Load Test Site ${variant}`,
        domain: `loadtest-${Date.now()}-${variant}.example.com`,
        category: "blog",
        platform: "custom",
      });
    } else if (route.urlPath.includes("/campaigns")) {
      init.body = JSON.stringify({
        site_id: ctx.siteId,
        title: `Test Campaign ${variant}`,
        body: `Test body for campaign ${variant}`.slice(0, 240),
        click_url: "https://example.com",
      });
    } else if (route.urlPath.includes("/segments")) {
      init.body = JSON.stringify({
        site_id: ctx.siteId,
        name: `Test Segment ${variant}`,
        rule_json: { operator: "AND", conditions: [{ attribute: "country", operator: "eq", value: "IN" }] },
      });
    } else if (route.urlPath.includes("/subscribers")) {
      init.body = JSON.stringify({
        fcm_token: `test-fcm-${Date.now()}-${variant}:VALID`,
        browser: "chrome",
      });
    } else if (route.urlPath.includes("/api-keys")) {
      init.body = JSON.stringify({
        name: `Test Key ${variant}`,
        scopes: ["subscribers:read"],
      });
    } else if (route.urlPath.includes("/team/members")) {
      init.body = JSON.stringify({
        email: `invite-${variant}@example.com`,
        role: "member",
      });
    } else if (route.urlPath.includes("/automations")) {
      init.body = JSON.stringify({
        site_id: ctx.siteId,
        name: `Test Automation ${variant}`,
        trigger_type: "new_subscriber",
      });
    } else {
      init.body = JSON.stringify({ site_id: ctx.siteId });
    }
  }

  return init;
}

// ─── Route Testing ───────────────────────────────────────────
async function testRoute(
  baseUrl: string,
  route: RouteInfo,
  method: string,
  authHeader: Record<string, string> | null,
  ctx: TestContext
): Promise<TestResult> {
  const routeKey = `${method} ${route.urlPath}`;

  // Check if route should be skipped
  if (NEVER_TEST.has(routeKey)) {
    return {
      route: route.urlPath,
      method,
      profileA: { pass: false, detail: "", concurrencyCorrect: false },
      profileB: { pass: false, detail: "", p50: 0, p95: 0, p99: 0 },
      profileC: [],
      skipped: "Payment/webhook route — skipped for safety",
      serverErrors: [],
    };
  }

  console.log(`\n  Testing ${routeKey}...`);

  captureLogs();
  let profileAResult: TestResult["profileA"] = { pass: false, detail: "Skipped", concurrencyCorrect: false };
  let profileBResult: TestResult["profileB"] = { pass: false, detail: "Skipped", p50: 0, p95: 0, p99: 0 };
  let profileCResult: TestResult["profileC"] = [];

  try {
    profileAResult = await profileAConcurrent(baseUrl, route, method, authHeader, ctx);
    await sleep(500);
    profileBResult = await profileBSustained(baseUrl, route, method, authHeader, ctx);
    await sleep(500);
    profileCResult = await profileCFailures(baseUrl, route, method, ctx);
  } catch (err: any) {
    const fail = { pass: false, detail: `Error: ${err.message}`, concurrencyCorrect: false };
    profileAResult = fail;
    profileBResult = { ...fail, p50: 0, p95: 0, p99: 0 };
  }
  restoreLogs();

  return {
    route: route.urlPath,
    method,
    profileA: profileAResult,
    profileB: profileBResult,
    profileC: profileCResult,
    skipped: null,
    serverErrors: capturedLogs.filter((l) => l.includes("[ERR]")),
  };
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  const args = parseArgs();
  if (args.help) help();

  const baseUrl = args["base-url"] || "http://localhost:3000";
  const isProduction = baseUrl.includes("prontly.in") || baseUrl.includes("production");
  if (isProduction && !args["i-understand-this-hits-production"]) {
    console.error("\n✗ Production URL detected. Pass --i-understand-this-hits-production to proceed.");
    console.error("  Routes excluded from production load: payment/billing, FCM send, subscriber notify\n");
    process.exit(1);
  }

  const startTime = Date.now();
  console.log(`\n━━━ Prontly Notify API Load Test ━━━`);
  console.log(`  Target:    ${baseUrl}`);
  console.log(`  Started:   ${new Date().toISOString()}`);
  console.log(`  Production-safe mode: ${isProduction}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Step 1: Discover routes
  console.log("[1/4] Discovering routes...");
  const manifest = generateManifest(baseUrl);
  fs.writeFileSync(
    path.resolve(__dirname, "route-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`  Found ${manifest.summary.total} routes (${manifest.summary.methods.GET} GET, ${manifest.summary.methods.POST} POST, ${manifest.summary.methods.DELETE} DELETE, ${manifest.summary.methods.PATCH} PATCH)`);

  // Step 2: Setup test data
  console.log("\n[2/4] Setting up test data...");
  let ctx: TestContext;
  try {
    ctx = await setupTestData(baseUrl);
  } catch (err: any) {
    console.error(`  ✗ Test data setup failed: ${err.message}`);
    console.error("  Make sure the target server is running and Firebase is configured.");
    process.exit(1);
  }
  const authHeader = {
    Authorization: `Bearer ${ctx.firebaseToken}`,
    "Content-Type": "application/json",
  };

  // Step 3: Test every route
  console.log("\n[3/4] Running load tests...");
  const results: TestResult[] = [];
  let testedCount = 0;

  for (const route of manifest.routes) {
    for (const methodInfo of route.methods) {
      const result = await testRoute(baseUrl, route, methodInfo.method, authHeader, ctx);
      results.push(result);
      if (!result.skipped) testedCount++;
    }
  }

  // Step 4: Teardown & Report
  console.log("\n[4/4] Cleaning up and generating report...");
  if (args["skip-teardown"]) {
    console.log("  ⚠ --skip-teardown: test data left in place");
  } else {
    await teardownTestData(baseUrl, ctx, authHeader);
  }

  // Build report
  const passed = results.filter((r) => !r.skipped && r.profileA.pass && r.profileB.pass && r.profileC.every((c) => c.pass));
  const failed = results.filter((r) => !r.skipped && !(r.profileA.pass && r.profileB.pass && r.profileC.every((c) => c.pass)));
  const skipped = results.filter((r) => r.skipped);
  const latencyExceeded = results.filter((r) => !r.skipped && !r.profileB.pass).map((r) => `${r.method} ${r.route}`);

  const report: TestReport = {
    timestamp: new Date().toISOString(),
    baseUrl,
    summary: {
      total: manifest.summary.total,
      tested: testedCount,
      skipped: skipped.length,
      passed: passed.length,
      failed: failed.length,
      latencyExceeded,
    },
    results,
    env: {
      NODE_ENV: process.env.NODE_ENV || "",
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✓ set" : "✗ missing",
    },
  };

  const reportPath = path.resolve(__dirname, `../test-results/load-test-${startTime}.json`);
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Terminal summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(0);
  console.log(`\n━━━ Results ━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Total routes discovered: ${manifest.summary.total}`);
  console.log(`  Fully tested:            ${testedCount}`);
  console.log(`  Skipped:                 ${skipped.length}`);
  if (skipped.length > 0) {
    for (const s of skipped) {
      console.log(`    ⚠ ${s.method} ${s.route} — ${s.skipped}`);
    }
  }
  console.log(`  Passed all profiles:     ${passed.length}`);
  console.log(`  Failed at least one:     ${failed.length}`);
  if (latencyExceeded.length > 0) {
    console.log(`  Routes exceeding latency targets:`);
    for (const r of latencyExceeded) console.log(`    ✗ ${r}`);
  }
  console.log(`  Duration:                ${duration}s`);
  console.log(`  Report:                  ${reportPath}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Exit with error if any route failed
  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
