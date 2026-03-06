"use client";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

type SideMenuContextType = {
  isSideMenuMobOpen: boolean;
  setIsSideMenuMobOpen: (isOpen: boolean) => void;
};

const SideMenuContext = createContext<SideMenuContextType | undefined>(undefined);

export const SideMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isSideMenuMobOpen, setIsSideMenuMobOpen] = useState(false);

  useEffect(() => {
    if (isSideMenuMobOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isSideMenuMobOpen]);

  return (
    <SideMenuContext.Provider value={{ isSideMenuMobOpen, setIsSideMenuMobOpen }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (context === undefined) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }
  return context;
};
