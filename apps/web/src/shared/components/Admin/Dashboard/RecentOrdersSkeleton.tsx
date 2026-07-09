import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export function RecentOrdersSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="mt-4">
        <div className="flex justify-between border-b pb-3">
          <Skeleton className="mr-4 h-3 w-16" />
          <Skeleton className="mr-4 h-3 w-20" />
          <Skeleton className="mr-4 h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b py-3 last:border-b-0">
            <Skeleton className="mr-4 h-4 w-24" />
            <Skeleton className="mr-4 h-4 w-32" />
            <Skeleton className="mr-4 h-4 w-16" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
