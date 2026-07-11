"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { withTimeout } from "@/lib/utils";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  workspace: any | null;
  loading: boolean;
  userRole: string | null;
  workspaceId: string | null;
  isStaff: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  workspace: null,
  loading: true,
  userRole: null,
  workspaceId: null,
  isStaff: false,
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [workspace, setWorkspace] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [isStaff, setIsStaff] = useState<boolean>(false);

  const fetchUserMeta = async (firebaseUser: User) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      const res = await withTimeout(
        fetch("/api/v1/users/me", {
          headers: { Authorization: `Bearer ${idToken}` },
        }),
        8000
      );
      const data = await res.json();
      if (data.success && data.data) {
        setUserRole(data.data.workspace_role || null);
        setWorkspaceId(data.data.workspace_id || null);
        setIsStaff(!!data.data.is_staff);
        setProfile(data.data.user || null);
        setWorkspace(data.data.workspaces?.[0] || null);
      }
    } catch {
      // meta fetch is non-critical and must never block navigation
    }
  };

  const refreshUser = async () => {
    if (user) {
      await user.reload();
      await fetchUserMeta(user);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        fetchUserMeta(firebaseUser);
      } else {
        setUserRole(null);
        setWorkspaceId(null);
        setIsStaff(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUserRole(null);
    setWorkspaceId(null);
    setIsStaff(false);
    setProfile(null);
    setWorkspace(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, workspace, loading, userRole, workspaceId, isStaff, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
