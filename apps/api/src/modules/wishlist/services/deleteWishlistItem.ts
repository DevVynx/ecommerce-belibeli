import type { RemoveItemFromWishlistParams } from "@/modules/wishlist/types/ServiceParams";
import { db } from "@/shared/lib/db";
import { NotFoundError } from "@/shared/utils/HttpErrors";

export const deleteWishlistItem = async ({ userId, productId }: RemoveItemFromWishlistParams) => {
  const result = await db.wishlistItem.deleteMany({
    where: {
      productId,
      wishlist: {
        userId,
      },
    },
  });

  if (result.count === 0) {
    throw new NotFoundError("Item da lista de desejos não encontrado ou não pertence ao usuário.");
  }
};
