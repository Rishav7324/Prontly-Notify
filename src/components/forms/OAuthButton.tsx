"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface OAuthButtonProps {
  provider: "google" | "github";
  onClick: () => void;
  loading?: boolean;
  className?: string;
}

const providerConfig = {
  google: { label: "Google", icon: "G", bg: "bg-white text-gray-900 hover:bg-gray-100" },
  github: { label: "GitHub", icon: "GH", bg: "bg-[#24292F] text-white hover:bg-[#1B1F23]" },
};

export function OAuthButton({ provider, onClick, loading, className }: OAuthButtonProps) {
  const config = providerConfig[provider];

  return (
    <Button
      variant="outline"
      onClick={onClick}
      loading={loading}
      className={cn("w-full justify-center gap-3", className)}
    >
      <span className="flex size-5 items-center justify-center rounded text-xs font-bold">
        {config.icon}
      </span>
      Continue with {config.label}
    </Button>
  );
}
