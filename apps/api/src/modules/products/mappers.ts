import { PublicProductDto } from "@repo/types/contracts";

import { PromotionTypes } from "../../../prisma/generated/client/enums";
import type { Decimal } from "../../../prisma/generated/client/internal/prismaNamespace";

type RawPromotion = {
  type: string;
  discountValue: Decimal;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
};

type RawVariant = {
  id: string;
  sku: string;
  price: Decimal;
  stock: number;
  isActive: boolean;
  promotions?: RawPromotion[];
  productVariantOptions: { productOptionValueId: string }[];
};

type RawProduct = {
  id: string;
  title: string;
  description: string;
  image: string;
  ratingRate: Decimal;
  ratingCount: number;
  category: { id: string; name: string; promotions?: RawPromotion[] };
  promotions?: RawPromotion[];
  productOptions: {
    id: string;
    name: string;
    values: { id: string; value: string }[];
  }[];
  productVariants: RawVariant[];
};
// --------------------------------------------------------

const calculateSalePrice = (basePrice: number, promotions: RawPromotion[]): number => {
  const now = new Date();

  // 1. Filtra promoções válidas
  const activePromos = promotions.filter((p) => {
    const start = new Date(p.startsAt);
    const end = new Date(p.endsAt);
    return p.isActive && now >= start && now <= end;
  });

  if (!activePromos.length) return basePrice;

  // 2. Aplica a melhor promoção (menor preço final)
  const bestPrice = activePromos.reduce((min, promo) => {
    const discount = Number(promo.discountValue);
    const type = promo.type as PromotionTypes; // Garante o enum

    let calculated = basePrice;

    if (type === PromotionTypes.PERCENTAGE) {
      calculated = basePrice - basePrice * (discount / 100);
    } else if (type === PromotionTypes.FIXED) {
      calculated = basePrice - discount;
    }

    return calculated < min ? calculated : min;
  }, basePrice);

  return Math.max(0, bestPrice); // Evita preço negativo
};

export const controllerProductMapper = (product: RawProduct): PublicProductDto => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    image: product.image,
    ratingRate: Number(product.ratingRate),
    ratingCount: product.ratingCount,

    category: {
      id: product.category.id,
      name: product.category.name,
    },

    // Mapeia as opções disponíveis (Cores, Tamanhos)
    productOptions: product.productOptions.map((opt) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values.map((v) => ({ id: v.id, value: v.value })),
    })),

    // Lista de Variantes Simples
    variants: product.productVariants.map((variant) => {
      const basePrice = Number(variant.price);

      // Junta todas as promoções possíveis
      const allPromos = [
        ...(product.category.promotions || []),
        ...(product.promotions || []),
        ...(variant.promotions || []),
      ];

      return {
        id: variant.id,
        sku: variant.sku,
        price: basePrice,
        salePrice: calculateSalePrice(basePrice, allPromos),
        stock: variant.stock,
        optionValueIds: variant.productVariantOptions.map((o) => o.productOptionValueId),
      };
    }),
  };
};

export const controllerProductListMapper = (products: RawProduct[]): PublicProductDto[] => {
  return products.map(controllerProductMapper);
};
