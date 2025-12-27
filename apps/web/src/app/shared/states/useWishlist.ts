import type { WishlistItemDto } from "@repo/types/contracts";
import { create } from "zustand";

type WishlistStore = {
  map: Record<string, true>;
  hydrate: (items: WishlistItemDto[]) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
};

// useWishlist.ts
export const useWishlistStore = create<WishlistStore>((set, get) => ({
  map: {},

  hydrate: (items) =>
    set({
      map: Object.fromEntries(items.map((item) => [item.product.id, true])),
    }),

  add: (id) => set((state) => ({ map: { ...state.map, [id]: true } })),

  remove: (id) =>
    set((state) => {
      const copy = { ...state.map };
      delete copy[id];
      return { map: copy };
    }),

  clear: () => set({ map: {} }),

  has: (id) => !!get().map[id],
}));
