"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const cache = new Map<string, { data: unknown; ts: number }>();
const inflight = new Map<string, Promise<unknown>>();

export function useFetch<T = unknown>(url: string | null, ttlMs = 0) {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: !!url, error: null });
  const abortRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (signal: AbortSignal) => {
    if (!url) return;

    const cached = cache.get(url);
    if (cached && Date.now() - cached.ts < ttlMs) {
      setState({ data: cached.data as T, loading: false, error: null });
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      let promise = inflight.get(url);
      if (!promise) {
        promise = fetch(url, { signal }).then((r) => r.json());
        inflight.set(url, promise);
      }
      const json = await promise as { success?: boolean; data?: unknown; error?: string };
      if (signal.aborted) return;

      if (json.success) {
        cache.set(url, { data: json.data, ts: Date.now() });
        setState({ data: json.data as T, loading: false, error: null });
      } else {
        setState({ data: null, loading: false, error: json.error || "Request failed" });
      }
    } catch (err: unknown) {
      if (signal.aborted) return;
      const msg = err instanceof Error ? err.message : "Request failed";
      setState({ data: null, loading: false, error: msg });
    } finally {
      inflight.delete(url);
    }
  }, [url, ttlMs]);

  useEffect(() => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    execute(ctrl.signal);
    return () => ctrl.abort();
  }, [execute]);

  const refetch = useCallback(() => {
    if (url) cache.delete(url);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    execute(ctrl.signal);
  }, [url, execute]);

  return { ...state, refetch };
}
