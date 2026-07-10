import * as fs from "fs";
import * as path from "path";

const API_DIR = path.resolve(__dirname, "../src/app/api");

interface RouteMethod {
  method: string;
  line: number;
}

interface RouteInfo {
  filePath: string;
  urlPath: string;
  methods: RouteMethod[];
  auth: "requireAuth" | "verifyIdToken" | "none" | "unknown";
  hasRoleGuard: boolean;
  hasStaffGuard: boolean;
  hasSiteAccessGuard: boolean;
  validationImports: string[];
  inlineSchemas: string[];
}

export interface RouteManifest {
  generatedAt: string;
  baseUrl: string;
  routes: RouteInfo[];
  summary: {
    total: number;
    withAuth: number;
    withoutAuth: number;
    methods: Record<string, number>;
  };
}

function extractMethods(content: string): RouteMethod[] {
  const methods: RouteMethod[] = [];
  const pattern = /^export\s+async\s+function\s+(GET|POST|PATCH|PUT|DELETE)\s*\(/gm;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const line = content.substring(0, match.index).split("\n").length;
    methods.push({ method: match[1], line });
  }
  return methods;
}

function detectAuth(content: string): RouteInfo["auth"] {
  if (content.includes("requireAuth(")) return "requireAuth";
  if (content.includes("verifyIdToken(")) return "verifyIdToken";
  if (content.includes("requireAuth") && !content.includes("requireAuth(")) return "requireAuth";
  return "none";
}

function hasGuard(content: string, guardName: string): boolean {
  return content.includes(guardName);
}

function extractValidationImports(content: string): string[] {
  const schemas: string[] = [];
  const importPattern = /from\s+["']@\/lib\/validation["']/;
  if (importPattern.test(content)) {
    // Find what's imported
    const namedImport = content.match(/import\s+\{[^}]+\}\s+from\s+["']@\/lib\/validation["']/);
    if (namedImport) {
      const names = namedImport[0].match(/\b\w+Schema\b/g) || [];
      schemas.push(...names);
    }
  }
  return schemas;
}

function extractInlineSchemas(content: string): string[] {
  const schemas: string[] = [];
  const zodPattern = /const\s+(\w+Schema)\s*=\s*z\.object\(/g;
  let match;
  while ((match = zodPattern.exec(content)) !== null) {
    schemas.push(match[1]);
  }
  return schemas;
}

function routeFileToUrl(filePath: string): string {
  const relative = path.relative(API_DIR, filePath);
  const parts = relative.replace(/\\/g, "/").split("/");
  const urlParts: string[] = ["/api"];

  for (const part of parts) {
    if (part === "route.ts" || part === "route.js") continue;
    if (part.startsWith("[") && part.endsWith("]")) {
      urlParts.push(":" + part.slice(1, -1));
    } else if (part.startsWith("...") || part.startsWith("[...")) {
      urlParts.push("*");
    } else {
      urlParts.push(part);
    }
  }

  return urlParts.join("/");
}

function scanRoutes(): RouteInfo[] {
  const routes: RouteInfo[] = [];

  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name === "route.ts" || entry.name === "route.js") {
        const content = fs.readFileSync(fullPath, "utf-8");
        routes.push({
          filePath: fullPath,
          urlPath: routeFileToUrl(fullPath),
          methods: extractMethods(content),
          auth: detectAuth(content),
          hasRoleGuard: hasGuard(content, "requireRole"),
          hasStaffGuard: hasGuard(content, "requireStaff"),
          hasSiteAccessGuard: hasGuard(content, "requireSiteAccess"),
          validationImports: extractValidationImports(content),
          inlineSchemas: extractInlineSchemas(content),
        });
      }
    }
  }

  walkDir(API_DIR);
  return routes.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
}

export function generateManifest(baseUrl = "http://localhost:3000"): RouteManifest {
  const routes = scanRoutes();

  const methodCounts: Record<string, number> = {};
  let withAuth = 0;
  let withoutAuth = 0;

  for (const route of routes) {
    if (route.auth !== "none") withAuth++;
    else withoutAuth++;
    for (const m of route.methods) {
      methodCounts[m.method] = (methodCounts[m.method] || 0) + 1;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    baseUrl,
    routes,
    summary: {
      total: routes.length,
      withAuth,
      withoutAuth,
      methods: methodCounts,
    },
  };
}

// Run directly: npx tsx scripts/discover-routes.ts
const isMain = process.argv[1]?.endsWith("discover-routes.ts");
if (isMain) {
  const manifest = generateManifest();
  const outPath = path.resolve(__dirname, "route-manifest.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  console.log(`Discovered ${manifest.summary.total} routes → ${outPath}`);
  console.log(`  Auth required: ${manifest.summary.withAuth}`);
  console.log(`  No auth:       ${manifest.summary.withoutAuth}`);
  console.log(`  Methods:       ${JSON.stringify(manifest.summary.methods)}`);

  for (const r of manifest.routes) {
    const methods = r.methods.map((m) => m.method).join(",");
    const auth = r.auth === "requireAuth" ? "🔒" : r.auth === "verifyIdToken" ? "🔑" : "⬜";
    console.log(`  ${auth} ${methods.padEnd(8)} ${r.urlPath}`);
  }
}
