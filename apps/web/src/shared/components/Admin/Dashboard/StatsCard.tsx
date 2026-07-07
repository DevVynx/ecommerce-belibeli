"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { useAnimatedIcons } from "@/shared/hooks/ui/useAnimatedIcons";
import type { AnimatedIconComponent } from "@/shared/types/Icon";
import { cn } from "@/shared/utils/lib/utils";

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string | ReactNode;
  icon: AnimatedIconComponent;
  iconId: string;
  href?: string;
  hrefLabel?: string;
  variant?: "default" | "destructive";
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconId,
  href,
  hrefLabel = "Ver mais",
  variant = "default",
}: StatsCardProps) {
  const { getHandlers, getIconRef } = useAnimatedIcons({
    autoStartDelay: 200,
    autoStartDuration: 1500,
  });

  return (
    <div
      className={cn(
        "bg-card flex h-55 flex-col justify-between rounded-xl border p-6",
        variant === "destructive" && "border-red-200"
      )}
    >
      <div>
        <div className="flex items-start justify-between">
          <h3
            className={cn(
              "text-muted-foreground font-medium",
              variant === "destructive" && "text-red-500"
            )}
          >
            {title}
          </h3>
          <div {...getHandlers(iconId)}>
            <Icon
              ref={getIconRef(iconId)}
              size={30}
              className={cn(variant === "destructive" && "text-red-500")}
            />
          </div>
        </div>

        <p className="mt-3 text-4xl font-bold tracking-tight">{value}</p>

        {description && (
          <p
            className={cn(
              "mt-2 text-sm",
              variant === "destructive" ? "text-red-500" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          {hrefLabel}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
