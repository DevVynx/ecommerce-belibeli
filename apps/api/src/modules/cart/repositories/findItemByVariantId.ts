import { db } from "@/shared/lib/db";

type findCartItemByVariantIdProps = {
  cartId: string;
  productVariantId: string;
};

export const findCartItemByVariantId = async ({
  cartId,
  productVariantId,
}: findCartItemByVariantIdProps) => {
  const cartItem = await db.cartItem.findUnique({
    where: {
      cartId_productVariantId: {
        cartId,
        productVariantId,
      },
    },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
