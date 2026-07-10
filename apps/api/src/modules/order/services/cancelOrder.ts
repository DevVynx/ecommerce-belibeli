import { db } from "@/shared/lib/db";
import type { CancelOrderParams } from "@/modules/order/types/ServiceParams";

export const cancelOrder = async ({ orderId }: CancelOrderParams) => {
  const order = await db.$transaction(async (tx) => {
    await tx.couponUsage.deleteMany({ where: { orderId } });

    return await tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELED" },
    });
  });

  return { order };
};
