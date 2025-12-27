"use client";

import { useEffect } from "react";

import { useFindWishlist } from "@/app/shared/hooks/data/useWishlistQueries";
import { useUserState } from "@/app/shared/states/useUser";
import { useWishlistStore } from "@/app/shared/states/useWishlist";

export function WishlistInitializer({ children }: { children: React.ReactNode }) {
  const user = useUserState((s) => s.user);
  const clearWishlist = useWishlistStore((s) => s.clear);
  const hydrate = useWishlistStore((s) => s.hydrate);

  const isAuthenticated = !!user?.id;

  const { data, isError } = useFindWishlist();

  useEffect(() => {
    if (!isAuthenticated) {
      clearWishlist();
      return;
    }

    if (data?.wishlist) {
      hydrate(data.wishlist.items);
    }

    if (isError) {
      clearWishlist();
    }
  }, [isAuthenticated, data, isError, hydrate, clearWishlist]);

  return <>{children}</>;
}
