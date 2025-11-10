import { IconMobileButton } from "@/app/shared/components/IconMobileButton";
import Link from "next/link";
import type { JSX } from "react";

type Props = {
  icon: (isActive: boolean) => JSX.Element;
  label: string;
  isActive: boolean;
  onClick: () => void;
  href: string;
};

export const MobileBottomNavItem = ({ icon, label, isActive, onClick, href }: Props) => {
  return (
    <Link href={href}>
      <div onClick={onClick} className="flex flex-1 flex-col items-center justify-center">
        <IconMobileButton>{icon(isActive)}</IconMobileButton>
        <span className="text-sm font-bold">{label}</span>
      </div>
    </Link>
  );
};
