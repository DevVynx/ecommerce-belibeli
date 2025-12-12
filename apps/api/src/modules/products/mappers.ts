import { ProductDto } from "@repo/types/contracts";

import type { Decimal } from "../../../prisma/generated/client/internal/prismaNamespace";

type RawProduct = {
  id: string;
  title: string;
  description: string;
  price: Decimal;
  image: string;
  promotionPrice: Decimal | null;
  promotionEnd: Date | null;
  stock: number;
  totalSold: number;
  ratingRate: Decimal;
  ratingCount: number;
  category: {
    id: string;
    name: string;
  };
  productOptions: {
    id: string;
    type: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
};

export const controllerProductMapper = (product: RawProduct): ProductDto => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: Number(product.price),
    image: product.image,
    promotionPrice: product.promotionPrice ? Number(product.promotionPrice) : null,
    promotionEnd: product.promotionEnd ? product.promotionEnd.toISOString() : null,
    stock: product.stock,
    totalSold: product.totalSold,
    ratingRate: Number(product.ratingRate),
    ratingCount: product.ratingCount,

    category: {
      id: product.category.id,
      name: product.category.name,
    },

    productOptions: product.productOptions.map((opt) => ({
      id: opt.id,
      type: opt.type,
      values: opt.values.map((val) => ({
        id: val.id,
        value: val.value,
      })),
    })),
  };
};

export const controllerProductListMapper = (products: RawProduct[]): ProductDto[] => {
  return products.map(controllerProductMapper);
};
