import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export const OrdersSectionSkeleton = () => {
  return (
    <div className="rounded-lg border p-6">
      <Skeleton className="mb-4 h-6 w-36" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
};
