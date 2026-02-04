import { CartDto, CartItemDto } from "@repo/types/contracts";

import type { Decimal } from "../../../prisma/generated/client/internal/prismaNamespace";

type RawCartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: Decimal;
    image: string;
    promotionPrice: Decimal | null;
    promotionEnd: Date | null;
  };
  productOptions: {
    option: {
      id: string;
      type: string;
    };
    optionValue: {
      id: string;
      value: string;
    };
  }[];
};

type RawFullCart = {
  id: string;
  items: RawCartItem[];
} | null;

export const controllerFullCartMapper = (rawCart: RawFullCart | null): CartDto | null => {
  if (!rawCart) return null;

  return {
    id: rawCart.id,
    items: rawCart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        title: item.product.title,
        image: item.product.image,
        price: Number(item.product.price),
        promotionPrice: item.product.promotionPrice ? Number(item.product.promotionPrice) : null,
        promotionEnd: item.product.promotionEnd ? item.product.promotionEnd.toISOString() : null,
      },
      productOptions: item.productOptions.map((po) => ({
        option: {
          id: po.option.id,
          type: po.option.type,
        },
        optionValue: {
          id: po.optionValue.id,
          value: po.optionValue.value,
        },
      })),
    })),
  };
};

export const controllerCartItemsMapper = (rawItems: RawCartItem[]): CartItemDto[] => {
  return rawItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: {
      id: item.product.id,
      title: item.product.title,
      image: item.product.image,
      price: Number(item.product.price),
      promotionPrice: item.product.promotionPrice ? Number(item.product.promotionPrice) : null,
      promotionEnd: item.product.promotionEnd ? item.product.promotionEnd.toISOString() : null,
    },
    productOptions: item.productOptions.map((po) => ({
      option: {
        id: po.option.id,
        type: po.option.type,
      },
      optionValue: {
        id: po.optionValue.id,
        value: po.optionValue.value,
      },
    })),
  }));
};
