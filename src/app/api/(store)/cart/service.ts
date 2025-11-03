import { verifyToken } from "@/proxy/verifyToken";
import { db } from "@/shared/lib/db";
import type { NextRequest } from "next/server";

export async function get(req: NextRequest) {
  const token = req.cookies.get("accessToken");

  if (!token?.value) {
    return { items: [], count: 0 };
  }

  const { userId } = await verifyToken(token.value);

  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true, productOptions: { select: { option: true, optionValue: true } } },
      },
    },
  });

  if (!cart) {
    return { items: [], count: 0 };
  }

  const count = cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return { cart, count };
}

export const cartService = { get };
