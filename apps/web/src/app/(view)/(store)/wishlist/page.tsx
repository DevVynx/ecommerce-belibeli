"use client";
import { ExplorationSection } from "@/app/(view)/(store)/wishlist/components/ExplorationSection";
import { WishlistItems } from "@/app/(view)/(store)/wishlist/components/WishlistItems";
import { useFindWishlist } from "@/app/shared/hooks/data/useWishlistQueries";

const WishlistPage = () => {
  const { data } = useFindWishlist();

  if (!data?.wishlist) return <h1>Falha na busca</h1>;

  return (
    <section className="mt-20 px-2">
      <div className="mx-auto lg:container">
        <div className="border-b pb-5 mb-10">
          <h1 className="text-2xl font-bold lg:text-5xl lg:font-semibold">Lista de Desejos</h1>
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
