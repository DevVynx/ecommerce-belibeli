"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface HeaderHeightContextType {
  headerHeight: number;
  headerVisible: boolean;
}

const HeaderHeightContext = createContext<HeaderHeightContextType | undefined>(undefined);

export function HeaderHeightProvider({ children }: { children: React.ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    // Get header element
    const header = document.querySelector("header");
    if (!header) return;

    // Set header height once via callback
    const handleHeightChange = () => {
      setHeaderHeight(header.offsetHeight);
    };

    // Check header visibility by looking at the className
    const checkVisibility = () => {
      const classList = header.className;
      // If it has -translate-y-full, it's hidden
      const isHidden = classList.includes("-translate-y-full");
      setHeaderVisible(!isHidden);
    };

    // Initial setup
    handleHeightChange();
    checkVisibility();

    // Watch for changes in className (visibility changes)
    const observer = new MutationObserver(checkVisibility);
    observer.observe(header, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HeaderHeightContext.Provider value={{ headerHeight, headerVisible }}>
      {children}
    </HeaderHeightContext.Provider>
  );
}

export function useHeaderHeight() {
  const context = useContext(HeaderHeightContext);
  if (!context) {
    throw new Error("useHeaderHeight must be used within HeaderHeightProvider");
  }
  return context;
}
