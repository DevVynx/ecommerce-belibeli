import { HeaderSkeleton } from "@/app/shared/components/store/Skeletons/HeaderSkeleton";
import { ProductCardSkeleton } from "@/app/shared/components/store/Skeletons/ProductCardSkeleton";
import { Skeleton } from "@/app/shared/components/ui/skeleton";

export const StorePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderSkeleton />

      {/* Hero Banner Skeleton */}
      <section className="relative mt-14 w-full lg:mt-0">
        <Skeleton className="h-133.25 w-full bg-neutral-300 md:h-178.5" />

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-4">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </section>

      <main className="max-w-9xl mx-auto bg-white pb-14 lg:pb-0">
        {/* Categories Skeleton */}
        <section className="overflow-x-auto py-10">
          <div className="flex justify-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 px-3">
                <Skeleton className="h-20 w-20 rounded-full bg-neutral-200 lg:h-30 lg:w-30" />
                <Skeleton className="h-4 w-16 bg-neutral-200" />
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sale Section Skeleton */}
        <section className="bg-neutral-100 px-3 py-12">
          <div className="mx-auto lg:container">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full bg-neutral-200" />
                <Skeleton className="h-6 w-40 bg-neutral-200" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-8 w-12 rounded-full bg-neutral-200" />
                  <span className="text-lg font-bold">:</span>
                  <Skeleton className="h-8 w-12 rounded-full bg-neutral-200" />
                  <span className="text-lg font-bold">:</span>
                  <Skeleton className="h-8 w-12 rounded-full bg-neutral-200" />
                </div>
              </div>
              <div className="mr-4 hidden gap-3 lg:flex">
                <Skeleton className="h-9 w-22 rounded-md bg-neutral-200" />
                <Skeleton className="h-9 w-22 rounded-md bg-neutral-200" />
              </div>
            </div>

            {/* Products Carousel */}
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* For You Section Skeleton */}
        <section className="px-3 py-12">
          <div className="mx-auto lg:container">
            <Skeleton className="mx-auto mb-10 h-7 w-32" />

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(20)].map((_, i) => (
                <ProductCardSkeleton key={i} grid />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
