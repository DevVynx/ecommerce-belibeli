import { WishlistDto } from "@repo/types/contracts";

import { EmptyWishlist } from "@/app/(view)/(store)/wishlist/components/EmptyWishlist";
import { WishlistProductCard } from "@/app/(view)/(store)/wishlist/components/WishlistProductCard";

type WishlistItemsProps = {
  wishlist: WishlistDto | null;
};

export const WishlistItems = ({ wishlist }: WishlistItemsProps) => {
  const hasItems = !!wishlist && wishlist.items.length > 0;

  return hasItems ? (
    <div className="mb-20 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {wishlist.items.map((item) => (
        <WishlistProductCard key={item.id} product={item.product} />
      ))}
    </div>
  ) : (
    <EmptyWishlist />
  );
};
