import { db } from "@/shared/lib/db";

export async function get(userId: number) {
  const cart = await db.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true, productOptions: true } } },
  });

  const count = cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return { cart, count };
}

export const cartService = { get };
