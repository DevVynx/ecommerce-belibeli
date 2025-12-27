import { ExplorationSectionSkeleton } from "@/app/(view)/(store)/wishlist/components/Skeletons/ExplorationSectionSkeleton";
import { WishlistItemsSkeleton } from "@/app/(view)/(store)/wishlist/components/Skeletons/WishlistItemsSkeleton";
import { HeaderSkeleton } from "@/app/shared/components/store/Skeletons/HeaderSkeleton";
import { Skeleton } from "@/app/shared/components/ui/skeleton";

export const WishlistSkeleton = () => {
  return (
    <section className="mt-20 px-2">
      <HeaderSkeleton />
      <div className="mx-auto lg:container">
        {/* Wishlist Header */}
        <div className="mb-10 border-b pb-5">
          <Skeleton className="h-8 w-44 lg:h-12 lg:w-88" />
          <Skeleton className="mt-2 h-4 w-56 lg:w-62" />
        </div>

        {/* Grid */}
        <WishlistItemsSkeleton />

        {/* Exploration */}
        <ExplorationSectionSkeleton />
      </div>
    </section>
  );
};
