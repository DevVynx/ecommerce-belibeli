import type { GetUserResponse } from "@repo/types/contracts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: GetUserResponse["user"] | null;
  isAuthenticated: boolean;
  setUser: (user: GetUserResponse["user"]) => void;
  clearUser: () => void;
};

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // Nome da chave que ficará salva no localStorage
    }
  )
);
