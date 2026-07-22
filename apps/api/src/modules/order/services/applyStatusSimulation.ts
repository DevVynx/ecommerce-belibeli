import { sendOrderStatusEmail } from "@/modules/notification/services/sendOrderStatusEmail";
import { orderRepositories } from "@/modules/order/repositories";

import type { OrderStatus } from "../../../../prisma/generated/client/enums";
import { getSimulatedStatus } from "./statusSimulation";

type SimulableOrder = {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  shippingDeliveryDays: number | null;
};

export async function applyStatusSimulation(order: SimulableOrder) {
  const newStatus = getSimulatedStatus(order);

  if (!newStatus || newStatus === order.status) return;

  await orderRepositories.updateOrderStatus({
    orderId: order.id,
    status: newStatus,
  });

  try {
    await sendOrderStatusEmail(order.id, newStatus);
  } catch (error) {
    console.log(error);
    // email failure should not break the response
  }
}
