"use client";

import { useState } from "react";
import { MobileBottomNavItem } from "./NavItem";
import { bottomNavItems } from "./NavItems";

export const MobileBottomNav = () => {
  const [active, setActive] = useState("Home");

  return (
    <nav className="fixed bottom-0 flex w-full items-center justify-around bg-white p-1 inset-shadow-2xs lg:hidden">
      {bottomNavItems.map((item) => (
        <MobileBottomNavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isActive={active === item.label}
          onClick={() => setActive(item.label)}
          href={item.href}
        />
      ))}
    </nav>
  );
};
