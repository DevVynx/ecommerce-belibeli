"use client";
import Link from "next/link";

import { IconMobileButton } from "@/app/shared/components/IconMobileButton";
import { Button } from "@/app/shared/components/ui/button";
import { useSideMenu } from "@/app/shared/contexts/SideMenuMobileContext";
import { useFindCartItems } from "@/app/shared/hooks/data/useCartQueries";
import { useFindWishlist } from "@/app/shared/hooks/data/useWishlistQueries";
import { useUserStore } from "@/app/shared/store/useUser";

import { HeaderLogo } from "./Logo";
import { headerActionIcons } from "./MenuItems";
import { SearchInput } from "./SearchInput";
import { SideMenu } from "./SideMenu/SideMenu";

export const NavBar = () => {
  const { isSideMenuMobOpen, setIsSideMenuMobOpen } = useSideMenu();
  const { data: cartData } = useFindCartItems();
  const { data: wishlistData } = useFindWishlist();
  const user = useUserStore((s) => s.user);

  const cartItemsCount = cartData ? cartData.count : 0;
  const wishlistItemsCount = wishlistData ? wishlistData.count : 0;

  const handleActionClick = (key: string) => {
    if (key === "Menu") setIsSideMenuMobOpen(true);
  };

  return (
    <nav className="flex gap-3 lg:gap-6">
      <HeaderLogo />
      <div className="flex w-full items-center gap-3 lg:gap-6">
        <SearchInput />
        <div className="flex items-center gap-2 lg:gap-4">
          {user ? (
            headerActionIcons.map((action) => (
              <div key={action.key} className={`flex items-center gap-0.5 ${action.className}`}>
                <IconMobileButton link={action.link} onClick={() => handleActionClick(action.key)}>
                  {action.icon}
                </IconMobileButton>
                {action.key === "Heart" && (
                  <span className="mb-2 text-sm font-bold">{wishlistItemsCount}</span>
                )}
                {action.key === "Cart" && (
                  <span className="mb-2 text-sm font-bold">{cartItemsCount}</span>
                )}
              </div>
            ))
          ) : (
            <Link href={"/login"}>
              <Button className="px-8 font-bold md:px-12">Login</Button>
            </Link>
          )}
        </div>
        <SideMenu
          onClose={() => setIsSideMenuMobOpen(false)}
          backgroundClassName={
            isSideMenuMobOpen ? "opacity-100 bg-black/70" : "opacity-0 pointer-events-none"
          }
          sideMenuClassName={isSideMenuMobOpen ? "translate-x-0" : "translate-x-full"}
        />
      </div>
    </nav>
  );
};
