import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <div className="bg-card h-55 rounded-xl border p-6">
      <div className="flex items-start justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="size-[30px] rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-9 w-32" />
      <Skeleton className="mt-3 h-4 w-44" />
      <Skeleton className="mt-4 h-4 w-20" />
    </div>
  );
}
