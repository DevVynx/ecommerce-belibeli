import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <div className="flex h-125 gap-10">
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full items-center justify-center bg-black/10 p-4">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="flex h-full flex-1 flex-col">
        <div className="shrink-0">
          <Skeleton className="mb-3 h-8 w-3/4 rounded" />

          <div className="my-3 flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="size-4 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-4 w-28 rounded" />
          </div>

          <div className="flex items-center gap-2 border-b border-zinc-300 pb-3">
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-5 w-14 rounded-sm" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-2 pr-2 pl-2">
          <div className="mb-6 space-y-5">
            {Array.from({ length: 2 }).map((_, optIdx) => (
              <div key={optIdx}>
                <div className="mb-2 flex items-center gap-2">
                  <Skeleton className="h-5 w-20 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 4 }).map((_, valIdx) => (
                    <Skeleton
                      key={valIdx}
                      className="h-9 w-20 rounded-md"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Skeleton className="h-5 w-20 rounded" />
            <div className="flex items-center">
              <Skeleton className="h-9 w-8 rounded-none" />
              <Skeleton className="h-9 w-14 rounded-none" />
              <Skeleton className="h-9 w-8 rounded-none" />
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-14 flex-1 rounded-none" />
            <Skeleton className="size-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
