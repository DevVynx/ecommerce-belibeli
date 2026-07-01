import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export const ProfileSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border p-6">
        <Skeleton className="mb-4 h-6 w-44" />
        <Skeleton className="mb-2 h-4 w-64" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-6">
        <Skeleton className="mb-4 h-6 w-36" />
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="mb-2 h-24 w-full" />
        ))}
      </div>
    </div>
  );
};
