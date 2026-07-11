"use client";

import { useCallback, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  planId: string;
  planName: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function RazorpayCheckout({
  planId,
  planName,
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
}: RazorpayCheckoutProps) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/billing/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: planId }),
      });

      const json = await res.json();
      if (!json.success) {
        addToast(json.error || "Failed to create subscription", "error");
        setLoading(false);
        return;
      }

      const { subscription_id } = json.data;

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        addToast("Razorpay is not configured", "error");
        setLoading(false);
        return;
      }

      if (typeof window.Razorpay === "undefined") {
        await loadRazorpayScript();
      }

      const options = {
        key: razorpayKey,
        subscription_id,
        name: "Prontly Notify",
        description: `${planName} Plan - Monthly`,
        theme: { color: "#0447ff" },
        handler: function (response: any) {
          fetch("/api/v1/billing/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              plan_id: planId,
            }),
          })
            .then((r) => r.json())
            .then((d) => {
              if (d.success) {
                addToast("Subscription activated!", "success");
                window.location.href = "/dashboard/billing";
              } else {
                addToast(d.error || "Payment verification failed", "error");
              }
            });
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      addToast(err.message || "Checkout failed", "error");
      setLoading(false);
    }
  }, [planId, planName, addToast]);

  return (
    <Button
      onClick={handleCheckout}
      variant={variant}
      size={size}
      className={className}
      loading={loading}
      disabled={disabled || loading}
    >
      {children || "Subscribe Now"}
    </Button>
  );
}

async function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window.Razorpay !== "undefined") {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}
