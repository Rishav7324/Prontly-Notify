"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ code, language = "javascript", showLineNumbers = false, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("group relative rounded-xl border border-border bg-surface/80 overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-text-muted hover:text-text-primary hover:bg-background/50 transition-all"
        >
          {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="flex">
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-8 text-right text-text-muted select-none text-xs">
                    {i + 1}
                  </span>
                )}
                <span>{line}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
