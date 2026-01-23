"use client";
import { usePathname } from "next/navigation";

import { useScrollDirection } from "@/app/shared/hooks/ui/useScrollDirection";

import { NavBar } from "./NavBar/NavBar";

export function Header() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();

  // Routes where header should NOT be shown
  const hideHeaderRoutes = ["/checkout"];
  const shouldHideHeader = hideHeaderRoutes.some((route) => pathname.startsWith(route));

  // Don't render header if on excluded route
  if (shouldHideHeader) {
    return null;
  }

  const isHidden = scrollDir === "down";

  const translateYClass = isHidden ? "-translate-y-full" : "translate-y-0";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-20 bg-neutral-100 p-2 inset-shadow-2xs transition-transform duration-300 ease-in-out ${translateYClass} `}
    >
      <div className="mx-auto lg:container">
        <NavBar />
      </div>
    </header>
  );
}
