import { db } from "@/shared/lib/db";
import { UnprocessableEntityError } from "@/shared/utils/HttpErrors";

import type { PaymentMethod, Prisma } from "../../../../prisma/generated/client/client";

type CreateOrderData = {
  userId: string;
  total: Prisma.Decimal;
  subtotal: Prisma.Decimal;
  shipping: Prisma.Decimal;
  discount: Prisma.Decimal;
  paymentMethod: PaymentMethod;
  shippingAddress: Prisma.JsonObject;
};

type CreateOrderItemData = {
  productVariantId: string;
  quantity: number;
  unitPrice: Prisma.Decimal;
};

type CreateCouponUsageData = {
  userId: string;
  couponId: string;
  discountValue: Prisma.Decimal;
};

export const createOrder = async (
  orderData: CreateOrderData,
  itemsData: CreateOrderItemData[],
  couponData?: CreateCouponUsageData
) => {
  if (!couponData) {
    return await db.order.create({
      data: {
        userId: orderData.userId,
        total: orderData.total,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        discount: orderData.discount,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        orderItems: {
          create: itemsData.map((item) => ({
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  return await db.$transaction(async (tx) => {
    const usageCount = await tx.couponUsage.count({
      where: { couponId: couponData.couponId },
    });

    const coupon = await tx.coupon.findUniqueOrThrow({
      where: { id: couponData.couponId },
    });

    if (usageCount >= coupon.usageLimit) {
      throw new UnprocessableEntityError("Cupom esgotado.");
    }

    const userUsageCount = await tx.couponUsage.count({
      where: { couponId: couponData.couponId, userId: couponData.userId },
    });

    if (userUsageCount >= coupon.usageLimitPerUser) {
      throw new UnprocessableEntityError("Cupom esgotado.");
    }

    return await tx.order.create({
      data: {
        userId: orderData.userId,
        total: orderData.total,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        discount: orderData.discount,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        orderItems: {
          create: itemsData.map((item) => ({
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
        couponUsage: {
          create: {
            userId: couponData.userId,
            discountValue: couponData.discountValue,
            couponId: couponData.couponId,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });
  });
};
