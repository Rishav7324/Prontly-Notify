import { create } from "zustand";

interface CampaignDraft {
  siteId: string;
  title: string;
  body: string;
  iconUrl: string;
  imageUrl: string;
  clickUrl: string;
  actionButtons: { label: string; url: string }[];
  segmentId: string | null;
  scheduledAt: string | null;
  step: "compose" | "target" | "schedule" | "review";
  isSaving: boolean;
  lastSavedAt: string | null;
}

interface CampaignDraftState {
  draft: CampaignDraft;
  setField: <K extends keyof CampaignDraft>(key: K, value: CampaignDraft[K]) => void;
  setStep: (step: CampaignDraft["step"]) => void;
  reset: (siteId: string) => void;
  setSaving: (isSaving: boolean) => void;
}

const initialDraft: CampaignDraft = {
  siteId: "",
  title: "",
  body: "",
  iconUrl: "",
  imageUrl: "",
  clickUrl: "",
  actionButtons: [],
  segmentId: null,
  scheduledAt: null,
  step: "compose",
  isSaving: false,
  lastSavedAt: null,
};

export const useCampaignDraftStore = create<CampaignDraftState>((set) => ({
  draft: { ...initialDraft },
  setField: (key, value) => set((s) => ({ draft: { ...s.draft, [key]: value } })),
  setStep: (step) => set((s) => ({ draft: { ...s.draft, step } })),
  reset: (siteId) => set({ draft: { ...initialDraft, siteId } }),
  setSaving: (isSaving) => set((s) => ({ draft: { ...s.draft, isSaving, lastSavedAt: isSaving ? s.draft.lastSavedAt : new Date().toISOString() } })),
}));
