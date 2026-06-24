import { NextRequest, NextResponse } from "next/server";

const publicRoutes = new Set([
  "/", "/pricing", "/docs", "/blog", "/about", "/contact",
  "/faq", "/privacy", "/terms", "/cookies", "/refund-policy",
]);

const authRoutes = new Set([
  "/login", "/signup", "/forgot-password",
]);

function getFirebaseToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  const fbToken = req.cookies.get("__session")?.value;
  return fbToken ?? null;
}

async function verifyFirebaseToken(token: string) {
  try {
    const { getAuth } = await import("firebase-admin/auth");
    return await getAuth().verifyIdToken(token);
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  const token = getFirebaseToken(request);
  let decoded: { uid: string; is_staff?: boolean } | null = null;
  if (token) {
    decoded = await verifyFirebaseToken(token);
  }

  if (pathname.startsWith("/admin")) {
    if (!token || !decoded) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!decoded.is_staff) {
      return new NextResponse(null, { status: 404, statusText: "Not Found" });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token || !decoded) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (authRoutes.has(pathname)) {
    if (token && decoded) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
