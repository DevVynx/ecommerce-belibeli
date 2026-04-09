"use client";
import { Heart, ShoppingCart } from "lucide-react";

import { BadgedIconButton } from "@/shared/components/BadgedIconButton";
import { UserMenu } from "@/shared/components/store/Header/UserMenu";
import { useFindCartItems } from "@/shared/hooks/data/useCartQueries";
import { useFindWishlist } from "@/shared/hooks/data/useWishlistQueries";

import { HeaderLogo } from "./Logo";
import { MobileSideMenu } from "./MobileSideMenu";
import { SearchInput } from "./SearchInput";

export const NavBar = () => {
  const { data: cartData } = useFindCartItems();
  const { data: wishlistData } = useFindWishlist();

  const wishlistItemsCount = wishlistData ? wishlistData.count : 0;
  const cartItemsCount = cartData ? cartData.count : 0;

  return (
    <nav className="flex h-12 items-center justify-center gap-3 lg:gap-6">
      <HeaderLogo />
      <SearchInput />
      <div className="flex items-center gap-2 lg:gap-3">
        {/* User Menu - Desktop */}
        <UserMenu />

        {/* Wishlist - Desktop and Mobile */}
        <BadgedIconButton
          icon={<Heart className="size-7 cursor-pointer stroke-2" />}
          count={wishlistItemsCount}
          link="/wishlist"
        />

        {/* Cart - Desktop and Mobile */}
        <BadgedIconButton
          icon={<ShoppingCart className="size-7 cursor-pointer stroke-2" />}
          count={cartItemsCount}
          link="/cart"
        />

        {/* Side Menu - Mobile */}
        <MobileSideMenu />
      </div>
    </nav>
  );
};
