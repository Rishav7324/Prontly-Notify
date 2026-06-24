import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "default" | "loading" | "empty" | "error";

interface StateContainerProps {
  state: State;
  children?: React.ReactNode;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  errorMessage?: string;
}

export function StateContainer({ state, children, emptyMessage, emptyAction, errorMessage }: StateContainerProps) {
  if (state === "loading") {
    return (
      <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-lg border border-border bg-surface/50">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/50 p-8 text-center">
        <p className="mb-4 text-muted">{emptyMessage || "No data available yet."}</p>
        {emptyAction}
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-error/30 bg-error/10 p-8 text-center">
        <p className="mb-4 text-error">{errorMessage || "Something went wrong. Please try again."}</p>
      </div>
    );
  }

  return <>{children}</>;
}