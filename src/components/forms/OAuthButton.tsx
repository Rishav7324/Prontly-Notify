"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface OAuthButtonProps {
  provider: "google" | "github";
  onClick: () => void;
  loading?: boolean;
  className?: string;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
      <path d="M12 1C5.92 1 1 5.92 1 12c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-.95-.01-1.87-3.06.66-3.71-1.47-3.71-1.47-.5-1.27-1.22-1.61-1.22-1.61-1-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.7.38-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.42 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.75.37c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.21-2.57 5.14-5.02 5.41.4.34.75 1.01.75 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.63.76.53C19.85 20.98 23 16.86 23 12 23 5.92 18.08 1 12 1z" />
    </svg>
  );
}

const providerConfig = {
  google: {
    label: "Google",
    icon: <GoogleIcon />,
    className:
      "bg-white text-[#1F1F1F] border-border hover:bg-gray-50 active:bg-gray-100",
  },
  github: {
    label: "GitHub",
    icon: <GithubIcon />,
    className:
      "bg-[#24292F] text-white border-[#24292F] hover:bg-[#1B1F23] active:bg-[#15181C]",
  },
};

export function OAuthButton({ provider, onClick, loading, className }: OAuthButtonProps) {
  const config = providerConfig[provider];

  return (
    <Button
      variant="outline"
      onClick={onClick}
      loading={loading}
      className={cn(
        "w-full justify-center gap-3 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]",
        config.className,
        className,
      )}
      icon={config.icon}
    >
      Continue with {config.label}
    </Button>
  );
}
