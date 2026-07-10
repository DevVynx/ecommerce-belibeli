import { db } from "@/shared/lib/db";

type DeleteUsageByOrderIdProps = {
  orderId: string;
};

export const deleteUsageByOrderId = async ({ orderId }: DeleteUsageByOrderIdProps) => {
  await db.couponUsage.deleteMany({ where: { orderId } });
};
