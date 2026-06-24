import { create } from "zustand";
import type { SegmentRuleGroup } from "@/lib/db/queries/segments";

interface SegmentBuilderState {
  name: string;
  rules: SegmentRuleGroup[];
  setName: (name: string) => void;
  setRules: (rules: SegmentRuleGroup[]) => void;
  reset: () => void;
}

export const useSegmentBuilderStore = create<SegmentBuilderState>((set) => ({
  name: "",
  rules: [],
  setName: (name) => set({ name }),
  setRules: (rules) => set({ rules }),
  reset: () => set({ name: "", rules: [] }),
}));
