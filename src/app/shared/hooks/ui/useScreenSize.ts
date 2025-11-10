"use client";
import { debounce } from "@/shared/utils/timing/debounce";
import { useState, useEffect } from "react";

/**
 * Based on Tailwind CSS breakpoints
 * https://tailwindcss.com/docs/responsive-design
 */

export const useScreenSize = () => {
  const LARGE_SCREEN_BREAKPOINT = 1024;
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < LARGE_SCREEN_BREAKPOINT);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const debouncedHandleResize = debounce(handleResize, 200);

    handleResize();

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return {
    width,
    isMobile,
    height,
  };
};
