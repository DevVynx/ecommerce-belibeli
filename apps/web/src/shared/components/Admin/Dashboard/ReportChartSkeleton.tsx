import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export function ReportChartSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-9 rounded-md" />
          ))}
        </div>
      </div>
      <Skeleton className="h-75 w-full rounded-lg" />
    </div>
  );
}
