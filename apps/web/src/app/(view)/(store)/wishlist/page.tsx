"use client";
import { ExplorationSection } from "@/app/(view)/(store)/wishlist/components/ExplorationSection";
import { WishlistSkeleton } from "@/app/(view)/(store)/wishlist/components/Skeletons/WishlistSkeleton";
import { WishlistItems } from "@/app/(view)/(store)/wishlist/components/WishlistItems";
import { WishlistLoadError } from "@/app/(view)/(store)/wishlist/components/WishlistLoadError";
import { useFindWishlist } from "@/app/shared/hooks/data/useWishlistQueries";

const WishlistPage = () => {
  const { data, isLoading, isError, refetch } = useFindWishlist();

  if (isLoading) return <WishlistSkeleton />;
  if (isError || !data) return <WishlistLoadError refetchAction={refetch} />;

  return (
    <section className="mt-20 px-2">
      <div className="mx-auto lg:container">
        <div className="mb-10 border-b pb-5">
          <h1 className="text-2xl font-bold lg:text-4xl lg:font-semibold">Lista de Desejos</h1>
          <p className="mt-1 ml-0.5 text-sm font-semibold text-gray-500 lg:text-base">
            {data.count} itens salvos para comprar depois
          </p>
        </div>
        <WishlistItems wishlist={data.wishlist} />
        <ExplorationSection />
      </div>
    </section>
  );
};

export default WishlistPage;
