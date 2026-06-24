"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

const sizeStyles: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
};

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
  name?: string;
  fallbackClassName?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  size = "md",
  name,
  src,
  alt,
  className,
  fallbackClassName,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <div
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full",
          sizeStyles[size],
          className
        )}
      >
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          onError={() => setImgError(true)}
          className="size-full rounded-full object-cover"
          {...props}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold",
        sizeStyles[size],
        className,
        fallbackClassName
      )}
      aria-label={alt ?? name ?? "Avatar"}
    >
      {name ? getInitials(name) : <UserIcon size={size} />}
    </div>
  );
}

function UserIcon({ size }: { size: AvatarSize }) {
  const iconSize = size === "sm" ? 14 : size === "md" ? 18 : 24;
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
