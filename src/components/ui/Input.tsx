"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputBaseProps {
  error?: string;
  label?: string;
  hint?: string;
  containerClassName?: string;
}

type InputAsInput = InputHTMLAttributes<HTMLInputElement> &
  InputBaseProps & {
    as?: "input";
  };

type InputAsTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputBaseProps & {
    as: "textarea";
  };

type InputProps = InputAsInput | InputAsTextarea;

export const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const {
      error,
      label,
      hint,
      containerClassName,
      className,
      as = "input",
      ...rest
    } = props;

    const isTextarea = as === "textarea";
    const [showPassword, setShowPassword] = useState(false);
    const type = "type" in rest ? rest.type : undefined;
    const isPassword = type === "password";

    const inputStyles = cn(
      "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-150",
      "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
      error
        ? "border-error focus:ring-error/30 focus:border-error"
        : "border-border hover:border-border-strong",
      "disabled:cursor-not-allowed disabled:opacity-50",
      isPassword && "pr-10",
      isTextarea && "min-h-[100px] resize-y",
      className
    );

    const renderIcon = () => {
      if (error) {
        return (
          <AlertCircle className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-error" />
        );
      }
      if (isPassword) {
        return (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        );
      }
      return null;
    };

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {isTextarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={inputStyles}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputStyles}
              type={
                isPassword ? (showPassword ? "text" : "password") : type
              }
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          {renderIcon()}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-text-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
