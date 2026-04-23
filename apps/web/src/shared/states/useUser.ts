import type { GetUserResponse } from "@repo/types/contracts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: GetUserResponse["user"] | null;
  isAuthenticated: boolean;
  authError: string | null;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  setUser: (user: GetUserResponse["user"]) => void;
  clearUser: () => void;
  setAuthError: (error: string | null) => void;
};

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      authError: null,
      hasHydrated: false,

      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
      setUser: (user) => set({ user, isAuthenticated: true, authError: null }),
      clearUser: () => {
        localStorage.removeItem("wishlist-storage");
        set({ user: null, isAuthenticated: false, authError: null });
      },
      setAuthError: (error) => set({ authError: error }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasHydrated: state.hasHydrated,
      }),
    }
  )
);
