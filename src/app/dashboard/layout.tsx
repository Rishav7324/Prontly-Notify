"use client";

import { AuthGuard } from "@/components/layout/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { ToastProvider } from "@/components/ui/Toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ToastProvider>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex flex-1 flex-col lg:pl-[260px]">
            <TopBar />
            <main className="flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-6">
              {children}
            </main>
          </div>
          <MobileTabBar />
        </div>
      </ToastProvider>
    </AuthGuard>
  );
}
