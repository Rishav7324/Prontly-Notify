import type { Metadata } from "next";
import Link from "next/link";
import { Bell } from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthLeftPanel } from "./_components/AuthLeftPanel";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/[0.03] p-12">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 w-full">
          <AuthLeftPanel />
        </div>
      </div>

      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-text-primary">
              <Bell className="size-5 text-primary" />
              Prontly Notify
            </Link>
          </div>
          <ToastProvider>{children}</ToastProvider>
        </div>
      </div>
    </div>
  );
}
