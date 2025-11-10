import Link from "next/link";
import type React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
  className?: string;
};

export const IconMobileButton = ({ children, onClick, link, className }: Props) => {
  return link ? (
    <Link href={link}>
      <button className={`cursor-pointer stroke-3 text-black/90 ${className}`}>{children}</button>
    </Link>
  ) : (
    <button onClick={onClick} className={`cursor-pointer stroke-3 text-black/90 ${className}`}>
      {children}
    </button>
  );
};
