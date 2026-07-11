"use client";

import { useEffect } from "react";
import { useSiteStore } from "@/store";
import { useAuth } from "@/context/AuthContext";
import type { Site } from "@/types";

export function useActiveSite() {
  const { site, sites, isLoading, setSite, setSites, setLoading } = useSiteStore();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (!isLoading && sites.length > 0) return;

    let cancelled = false;
    setLoading(true);

    user.getIdToken().then((token: string) =>
      fetch("/api/v1/sites", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          const list: Site[] = data.success ? data.data ?? [] : [];
          setSites(list);
          if (list.length > 0 && !site) setSite(list[0]);
        })
        .catch(() => {
          if (!cancelled) setSites([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        })
    );

    return () => { cancelled = true; };
  }, [user]);

  return {
    activeSite: site,
    sites,
    isLoadingSites: isLoading,
    setActiveSite: setSite,
    setSites,
  } as const;
}
