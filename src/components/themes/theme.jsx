import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: "white",
  setTheme: (newTheme) => set({ theme: newTheme }),
}));

export default useThemeStore;
