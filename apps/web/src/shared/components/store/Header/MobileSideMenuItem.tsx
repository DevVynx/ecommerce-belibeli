import { motion } from "framer-motion";
import Link from "next/link";
import type { JSX } from "react";

import { cn } from "@/shared/utils/lib/utils";

type MobileSideMenuItemProps = {
  onClick?: () => void;
  link: string;
  className?: string;
  icon: JSX.Element;
  label: string;
};

export const MobileSideMenuItem = ({
  onClick,
  link,
  className,
  icon,
  label,
}: MobileSideMenuItemProps) => {
  const isSpecialColor = className
    ?.split(" ")
    .some(
      (cls) =>
        cls.startsWith("text-") &&
        !["text-xs", "text-sm", "text-base", "text-lg", "text-xl"].includes(cls)
    );

  return (
    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} className="w-full">
      <Link
        onClick={onClick}
        href={link}
        className="group hover:bg-accent active:bg-accent/80 flex w-full items-center gap-4 rounded-xl px-3 py-3 transition-all"
      >
        <div
          className={cn(
            "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary flex size-10 items-center justify-center rounded-lg transition-colors",
            isSpecialColor && "text-current group-hover:text-current"
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-foreground/80 transition-colors",
            !isSpecialColor && "group-hover:text-foreground",
            "text-sm font-medium",
            className
          )}
        >
          {label}
        </span>
      </Link>
    </motion.div>
  );
};
