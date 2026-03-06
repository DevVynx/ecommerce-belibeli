import type { JSX } from "react";

type Props = {
  onClick?: () => void;
  link?: string;
  className?: string;
  icon: JSX.Element;
  label: string;
};

export const SideMenuItem = ({ onClick, link, className, icon, label }: Props) => {
  return (
    <a
      onClick={onClick}
      href={link}
      className="flex w-full items-center gap-3 rounded-md py-3 active:bg-black/10"
    >
      {icon}
      <span className={`text-base ${className}`}>{label}</span>
    </a>
  );
};
