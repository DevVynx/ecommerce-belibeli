import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export function DaySummaryCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <Skeleton className="mb-5 h-5 w-28" />

      <div className="space-y-5">
        <div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-2 h-8 w-36" />
          <Skeleton className="mt-1.5 h-4 w-24" />
        </div>

        <div className="border-border/50 border-t pt-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-2 h-8 w-16" />
          <Skeleton className="mt-1.5 h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
