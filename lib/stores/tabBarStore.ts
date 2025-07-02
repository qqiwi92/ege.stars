import { create } from "zustand";

interface TabBarStore {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const useTabBarStore = create<TabBarStore>((set) => ({
  isVisible: true,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
