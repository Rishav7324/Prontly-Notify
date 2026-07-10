import { NextRequest, NextResponse } from "next/server";

const publicRoutes = new Set([
  "/", "/pricing", "/docs", "/blog", "/about", "/contact",
  "/faq", "/privacy", "/terms", "/cookies", "/refund-policy",
  "/verify-success",
]);

const authRoutes = new Set([
  "/login", "/signup", "/forgot-password",
]);

const apiRoutesPattern = /^\/api\//;

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 100;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getFirebaseToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  const fbToken = req.cookies.get("__session")?.value;
  return fbToken ?? null;
}

async function verifyFirebaseToken(token: string) {
  try {
    const { verifyIdToken } = await import("@/lib/auth/firebase-admin");
    return await verifyIdToken(token);
  } catch {
    return null;
  }
}

function isTokenExpired(expiresAt: string): boolean {
  return new Date(expiresAt).getTime() < Date.now();
}

async function resolveUserRole(userId: string): Promise<string | null> {
  try {
    const { executeQuery } = await import("@/lib/db");
    const members = await executeQuery<any>(
      `SELECT role FROM workspace_members WHERE user_id = ? AND status = 'active' LIMIT 1`,
      [userId]
    );
    return members.length > 0 ? members[0].role : null;
  } catch {
    return null;
  }
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}

function logAccess(pathname: string, userId: string | null, status: number, duration: number) {
  const timestamp = new Date().toISOString();
  console.log(
    JSON.stringify({
      level: "info",
      timestamp,
      message: "Protected route access",
      pathname,
      userId,
      status,
      durationMs: duration,
    })
  );
}

export async function proxy(request: NextRequest) {
  const start = performance.now();
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/_next") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const isApiRoute = apiRoutesPattern.test(pathname);

  if (isApiRoute) {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }

  const token = getFirebaseToken(request);
  let decoded: { uid: string; is_staff?: boolean } | null = null;
  if (token) {
    decoded = await verifyFirebaseToken(token);
  }

  const impersonationCookie = request.cookies.get("__impersonate")?.value;
  const hasImpersonation = !!impersonationCookie;
  const impersonatedBy = impersonationCookie || null;

  if (hasImpersonation) {
    const response = NextResponse.next();
    response.cookies.set("__impersonate_banner", "1", {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 3600,
      path: "/",
    });
    logAccess(pathname, decoded?.uid || null, 200, Math.round(performance.now() - start));
    return response;
  }

  if (pathname.startsWith("/admin")) {
    if (!token || !decoded) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      logAccess(pathname, null, 302, Math.round(performance.now() - start));
      return NextResponse.redirect(loginUrl);
    }
    if (!decoded.is_staff) {
      logAccess(pathname, decoded.uid, 404, Math.round(performance.now() - start));
      return new NextResponse(null, { status: 404, statusText: "Not Found" });
    }
    const role = await resolveUserRole(decoded.uid);
    if (role !== "admin" && role !== "owner") {
      logAccess(pathname, decoded.uid, 404, Math.round(performance.now() - start));
      return new NextResponse(null, { status: 404, statusText: "Not Found" });
    }
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    if (impersonatedBy) {
      response.headers.set("X-Impersonated-By", impersonatedBy);
    }
    logAccess(pathname, decoded.uid, 200, Math.round(performance.now() - start));
    return response;
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token || !decoded) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      logAccess(pathname, null, 302, Math.round(performance.now() - start));
      return NextResponse.redirect(loginUrl);
    }
    const response = NextResponse.next();
    logAccess(pathname, decoded.uid, 200, Math.round(performance.now() - start));
    return response;
  }

  if (authRoutes.has(pathname)) {
    if (token && decoded) {
      logAccess(pathname, decoded.uid, 302, Math.round(performance.now() - start));
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    logAccess(pathname, null, 200, Math.round(performance.now() - start));
    return NextResponse.next();
  }

  if (publicRoutes.has(pathname)) {
    logAccess(pathname, null, 200, Math.round(performance.now() - start));
    return NextResponse.next();
  }

  logAccess(pathname, null, 200, Math.round(performance.now() - start));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js)$).*)",
  ],
};