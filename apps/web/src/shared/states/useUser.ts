import type { GetUserResponse } from "@repo/types/contracts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: GetUserResponse["user"] | null;
  isAuthenticated: boolean;
  authError: string | null;
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

      setUser: (user) => set({ user, isAuthenticated: true, authError: null }),
      clearUser: () => set({ user: null, isAuthenticated: false, authError: null }),
      setAuthError: (error) => set({ authError: error }),
    }),
    {
      name: "auth-storage", // Nome da chave que ficará salva no localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
