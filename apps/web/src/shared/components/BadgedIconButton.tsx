import { motion } from "framer-motion";
import Link from "next/link";

import { Badge } from "@/shared/components/shadcn-ui/badge";
import { Button } from "@/shared/components/shadcn-ui/button";

type BadgedIconButtonProps = {
  icon: React.ReactNode;
  count: number;
  link?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

export const BadgedIconButton = ({
  icon,
  count,
  link,
  onClick,
  className,
}: BadgedIconButtonProps) => {
  const ButtonContent = (
    <div className={`relative flex items-center ${className}`}>
      <Button className="p-1" variant="ghost" onClick={onClick}>
        {icon}
      </Button>

      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="pointer-events-none absolute -top-0.5 -right-1"
        >
          <Badge
            variant="destructive"
            className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] font-bold"
          >
            {count > 99 ? "99+" : count}
          </Badge>
        </motion.div>
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{ButtonContent}</Link>;
  }

  return ButtonContent;
};
