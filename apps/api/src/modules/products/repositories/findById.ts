import { db } from "@/shared/lib/db";

type findProductByIdProps = {
  productId: string;
};

export const findProductById = async ({ productId }: findProductByIdProps) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  return product;
};
