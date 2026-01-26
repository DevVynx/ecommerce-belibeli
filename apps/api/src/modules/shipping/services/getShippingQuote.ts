import type { GetShippingQuoteParams } from "@/modules/shipping/types/ServiceParams";
import { calculateShippings } from "@/modules/shipping/utils/calculateShippings";
import { db } from "@/shared/lib/db";
import { ForbiddenError, NotFoundError } from "@/shared/utils/HttpErrors";

export const getShippingQuote = async ({ userId, cartId, destinyCep }: GetShippingQuoteParams) => {
  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: { items: { select: { product: true, quantity: true } } },
  });

  if (!cart) {
    throw new NotFoundError("Item do carrinho não encontrado.");
  }

  if (cart.userId !== userId) {
    throw new ForbiddenError("Item do carrinho não pertence ao usuário.");
  }

  if (cart.items.length === 0) {
    throw new ForbiddenError("Carrinho vazio não pode gerar cotação de frete.");
  }

  let weight = 0;
  let price = 0;
  let totalQuantity = 0;

  for (const item of cart.items) {
    const { product, quantity } = item;

    if (!product.weight || product.weight <= 0) {
      throw new ForbiddenError(
        `Produto ${product.id} não possui peso válido para cálculo de frete.`
      );
    }

    const unitPrice = Number(product.promotionPrice ?? product.price);

    weight += product.weight * quantity;
    price += unitPrice * quantity;
    totalQuantity += quantity;
  }

  if (weight <= 0) {
    throw new ForbiddenError("Peso total inválido para cálculo de frete.");
  }

  if (price <= 0) {
    throw new ForbiddenError("Valor total inválido para cálculo de frete.");
  }

  const shippingOptions = calculateShippings({
    destinyCep,
    weight: Number(weight.toFixed(2)),
    price,
  });

  return {
    items: { quantity: totalQuantity, weight: Number(weight.toFixed(2)) },
    shippingOptions,
  };
};
