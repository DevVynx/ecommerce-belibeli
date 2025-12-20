import type { CreateWishlistItemParams } from "@/modules/wishlist/types/ServiceParams";
import { db } from "@/shared/lib/db";
import { ConflictError, NotFoundError } from "@/shared/utils/HttpErrors";

export const createWishlistItem = async ({
  userId,
  productId,
}: CreateWishlistItemParams) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { productOptions: { include: { values: true } } },
  });

  if (!product) {
    throw new NotFoundError("Produto não encontrado.");
  }

  let wishlist = await db.wishlist.findUnique({ where: { userId } });

  if (!wishlist) {
    wishlist = await db.wishlist.create({ data: { userId } });
  }

  const existingItem = await db.wishlistItem.findUnique({
    where: {
      wishlistId_productId: {
        wishlistId: wishlist.id,
        productId,
      },
    },
  });

  if (existingItem) {
    throw new ConflictError("Este produto já está na sua lista de desejos");
  }

  const wishlistItem = await db.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return { wishlistItem };
};
