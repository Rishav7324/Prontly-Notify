"use client";

import { useAuthStore } from "@/store";

export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  };
}
