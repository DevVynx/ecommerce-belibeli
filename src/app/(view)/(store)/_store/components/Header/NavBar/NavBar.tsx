"use client";
import { SearchInput } from "./SearchInput";
import { headerActionIcons } from "./MenuItems";
import { HeaderLogo } from "./Logo";
import { SideMenu } from "./SideMenu/SideMenu";
import { useSideMenu } from "@/app/(view)/(store)/contexts/SideMenuMobileContext";
import { useFindCart } from "@/app/shared/hooks/data/useCartQueries";
import { IconMobileButton } from "@/app/shared/components/IconMobileButton";

export const NavBar = () => {
  const { isSideMenuMobOpen, setIsSideMenuMobOpen } = useSideMenu();
  const { data } = useFindCart();

  const cartItemsCount = data ? data.count : 0;

  const handleActionClick = (key: string) => {
    key === "Menu" ? setIsSideMenuMobOpen(true) : undefined;
  };

  return (
    <nav className="flex gap-3 lg:gap-6">
      <HeaderLogo />
      <div className="flex w-full items-center gap-3 lg:gap-6">
        <SearchInput />
        <div className="flex items-center gap-2 lg:gap-4">
          {headerActionIcons.map((action) => {
            return (
              <div key={action.key} className={`flex items-center gap-0.5 ${action.className}`}>
                <IconMobileButton link={action.link} onClick={() => handleActionClick(action.key)}>
                  {action.icon}
                </IconMobileButton>
                {action.key === "Heart" && <span className="mb-2 text-sm font-bold">{0}</span>}
                {action.key === "Cart" && (
                  <span className="mb-2 text-sm font-bold">{cartItemsCount}</span>
                )}
              </div>
            );
          })}
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
