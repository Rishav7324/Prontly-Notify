import { create } from "zustand";
import type { Workspace, Site, User } from "@/types";

interface WorkspaceState {
  workspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  setWorkspace: (workspace: Workspace) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspace: null,
  workspaces: [],
  isLoading: true,
  setWorkspace: (workspace) => set({ workspace }),
  setWorkspaces: (workspaces) => set({ workspaces }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface SiteState {
  site: Site | null;
  sites: Site[];
  isLoading: boolean;
  setSite: (site: Site) => void;
  setSites: (sites: Site[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  site: null,
  sites: [],
  isLoading: true,
  setSite: (site) => set({ site }),
  setSites: (sites) => set({ sites }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
}));
