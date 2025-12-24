import { WishlistDto } from "@repo/types/contracts";

import { WishlistProductCard } from "@/app/(view)/(store)/wishlist/components/WishlistProductCard";

type WishlistItemsProps = {
  wishlist: WishlistDto;
};

export const WishlistItems = ({ wishlist }: WishlistItemsProps) => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {wishlist.items.map((item) => (
        <WishlistProductCard key={item.id} product={item.product} />
      ))}
    </div>
  );
};
