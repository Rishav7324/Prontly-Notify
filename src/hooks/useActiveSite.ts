"use client";

import { useSiteStore } from "@/store";
import type { Site } from "@/types";

export function useActiveSite() {
  const { site, sites, isLoading, setSite, setSites } = useSiteStore();

  return {
    activeSite: site,
    sites,
    isLoadingSites: isLoading,
    setActiveSite: setSite,
    setSites,
  } as const;
}
