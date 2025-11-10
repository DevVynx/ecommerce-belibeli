"use client";
import { useScrollDirection } from "@/app/shared/hooks/ui/useScrollDirection";
import { CategoryBar } from "./CategoryBar/CategoryBar";
import { NavBar } from "./NavBar/NavBar";

export function Header() {
  const scrollDir = useScrollDirection();

  const isHidden = scrollDir === "down";

  const translateYClass = isHidden ? "-translate-y-full" : "translate-y-0";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-1 bg-neutral-100 p-2 inset-shadow-2xs transition-transform duration-300 ease-in-out ${translateYClass} `}
    >
      <div className="mx-auto lg:container">
        <NavBar />
        <CategoryBar />
      </div>
    </header>
  );
}
