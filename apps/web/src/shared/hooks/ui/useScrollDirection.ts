"use client";
import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | "initial";

const threshold = 10;

export function useScrollDirection(hideThreshold = 80): ScrollDirection {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>("initial");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (scrollY < hideThreshold) {
        if (scrollY < threshold) {
          setScrollDir("initial");
        } else if (scrollDir === "down") {
          setScrollDir("up");
        }

        lastScrollY = scrollY > 0 ? scrollY : 0;
        return;
      }

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      if (scrollY > lastScrollY && scrollDir !== "down") {
        setScrollDir("down");
      } else if (scrollY < lastScrollY && scrollDir !== "up") {
        setScrollDir("up");
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDir);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir, hideThreshold]);

  return scrollDir;
}
