"use client";

import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";
import { ProductCardSkeleton } from "@/shared/components/store/Skeletons/ProductCardSkeleton";

export const FlashSaleSkeleton = () => {
  return (
    <>
      <div className="mb-6 flex justify-end gap-2">
        <Skeleton className="h-8 w-20 border bg-neutral-200" />
        <Skeleton className="h-8 w-20 border bg-neutral-200" />
      </div>
      <div className="flex gap-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};
