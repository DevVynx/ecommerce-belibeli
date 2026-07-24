"use client";
import { cn } from "@/shared/utils/lib/utils";

type StockBadgeProps = {
  stock: number;
  className?: string;
};

export const StockBadge = ({ stock, className }: StockBadgeProps) => {
  if (stock === 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600",
          className
        )}
      >
        <span className="size-1.5 rounded-full bg-red-500" />
        Fora de Estoque
      </span>
    );
  }

  if (stock <= 10) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700",
          className
        )}
      >
        <span className="size-1.5 rounded-full bg-amber-500" />
        Apenas {stock} {stock === 1 ? "unidade" : "unidades"}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-green-500" />
      Em Estoque
    </span>
  );
};
