import { Skeleton } from "@/shared/components/ui/skeleton";

export const CartPageSkeleton = () => {
  return (
    <section className="bg-neutral-100 pb-40 lg:p-0">
      <div className="mx-auto">
        {/* Header Skeleton */}
        <header className="p-3 lg:bg-white">
          <div className="flex justify-between lg:hidden">
            <Skeleton className="h-7 w-7 rounded-full md:h-10 md:w-10" />
            <Skeleton className="h-6 w-32 md:h-7 md:w-40" />
            <Skeleton className="h-7 w-7 rounded-full md:h-10 md:w-10" />
          </div>
          <div className="mx-auto hidden justify-between lg:container lg:flex">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-6 w-40" />
          </div>
        </header>

        <div className="mx-auto mt-2 flex justify-center gap-3 p-3 lg:container lg:flex">
          {/* Cart Items Skeleton */}
          <div className="flex w-full flex-col items-center gap-3 lg:flex-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex w-full gap-3 rounded-md bg-white p-3 lg:max-w-4xl">
                <Skeleton className="h-24 w-24 shrink-0 rounded-md md:h-40 md:w-32" />
                <div className="flex flex-1 flex-col justify-between space-y-2">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton - Desktop */}
          <div className="hidden lg:block lg:w-100">
            <div className="sticky top-0 space-y-3">
              <div className="space-y-3 rounded-sm bg-white p-3">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-12 w-full rounded-sm" />
              </div>
              <div className="space-y-3 rounded-sm bg-white p-3">
                <Skeleton className="h-7 w-32" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <Skeleton key={i} className="h-8 w-12" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Summary - Mobile */}
        <div className="fixed right-0 bottom-0 left-0 z-10 flex flex-col items-center gap-2 bg-white p-3 lg:hidden">
          <div className="w-full rounded-md bg-neutral-100 p-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </section>
  );
};
