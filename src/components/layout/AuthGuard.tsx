"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, userRole, isStaff } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login?redirect=" + encodeURIComponent(pathname));
      return;
    }

    // Role-based routing
    if (pathname.startsWith("/admin") && !isStaff) {
      router.push("/dashboard");
      return;
    }

    // ponytail: non-staff hitting admin → redirect to dashboard
    // staff hitting dashboard → let through (they have both)
  }, [user, loading, userRole, isStaff, pathname, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
