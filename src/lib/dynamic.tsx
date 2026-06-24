import dynamic from "next/dynamic";

export const DynamicDataTable = dynamic(
  () => import("@/components/ui/DataTable").then((m) => ({ default: m.DataTable })),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse rounded-lg bg-surface" />
    ),
  }
);

export const DynamicModal = dynamic(
  () => import("@/components/ui/Modal").then((m) => ({ default: m.Modal })),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 animate-pulse rounded-lg bg-surface" />
    ),
  }
);

export const DynamicAnalyticsChart = dynamic(
  () => import("@/components/analytics/AnalyticsChart").then((m) => ({ default: m.AnalyticsChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 animate-pulse rounded-lg bg-surface" />
    ),
  }
);

export const DynamicRazorpayCheckout = dynamic(
  () => import("@/components/billing/RazorpayCheckout").then((m) => ({ default: m.RazorpayCheckout })),
  {
    ssr: false,
  }
);
