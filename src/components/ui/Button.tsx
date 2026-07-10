"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary/50",
  secondary:
    "bg-surface text-text-primary hover:bg-black/10 active:bg-black/[0.15] disabled:bg-surface/50 disabled:text-text-muted",
  outline:
    "border border-border text-text-primary hover:bg-black/5 active:bg-black/10 disabled:opacity-50",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-black/5 active:bg-black/10 disabled:opacity-50",
  destructive:
    "bg-error text-white hover:bg-red-600 active:bg-red-700 disabled:bg-error/50",
  link: "text-primary hover:text-primary-400 underline-offset-4 hover:underline disabled:opacity-50",
  "icon-only":
    "text-text-secondary hover:text-text-primary hover:bg-black/5 active:bg-black/10 disabled:opacity-50",
};

const sizeStyles = {
  sm: "h-8 gap-1.5 rounded px-3 text-xs [&_svg]:size-3.5",
  md: "h-10 gap-2 rounded-lg px-4 text-sm [&_svg]:size-4",
  lg: "h-12 gap-2.5 rounded-lg px-6 text-base [&_svg]:size-5",
  xl: "h-14 gap-3 rounded-xl px-8 text-lg [&_svg]:size-5",
};

const iconOnlySizes = {
  sm: "size-8 rounded [&_svg]:size-4",
  md: "size-10 rounded-lg [&_svg]:size-4",
  lg: "size-12 rounded-lg [&_svg]:size-5",
  xl: "size-14 rounded-xl [&_svg]:size-5",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === "icon-only";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-primary disabled:pointer-events-none",
          variantStyles[variant],
          isIconOnly ? iconOnlySizes[size] : sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {!isIconOnly && children}
      </button>
    );
  }
);

Button.displayName = "Button";
