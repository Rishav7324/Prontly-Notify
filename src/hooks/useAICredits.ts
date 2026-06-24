"use client";

import { useState, useEffect, useCallback } from "react";

interface AICredits {
  used: number;
  limit: number;
  remaining: number;
}

export function useAICredits() {
  const [credits, setCredits] = useState<AICredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCredits = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/ai/usage");
      const json = await res.json();
      if (json.success) {
        setCredits(json.data);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const hasCredits = credits ? credits.remaining > 0 : true;
  const pctUsed = credits && credits.limit > 0 ? Math.round((credits.used / credits.limit) * 100) : 0;

  return { credits, isLoading, hasCredits, pctUsed, refetch: fetchCredits };
}
