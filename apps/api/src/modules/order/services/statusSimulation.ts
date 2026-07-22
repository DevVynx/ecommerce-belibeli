import type { OrderStatus } from "../../../../prisma/generated/client/enums";

type SimulableOrder = {
  status: OrderStatus;
  createdAt: Date;
  shippingDeliveryDays: number | null;
};

const MILESTONES_MINUTES = [
  { after: 5, status: "PAID" as OrderStatus },
  { after: 30, status: "PROCESSING" as OrderStatus },
  { after: 120, status: "SHIPPED" as OrderStatus },
];

export function getSimulatedStatus(order: SimulableOrder): OrderStatus | null {
  if (order.status === "CANCELED" || order.status === "REFUNDED" || order.status === "PENDING")
    return null;

  const elapsed = Date.now() - order.createdAt.getTime();
  const minutes = elapsed / 60000;

  for (const m of MILESTONES_MINUTES) {
    if (minutes < m.after) return m.status;
  }

  if (order.shippingDeliveryDays) {
    const deliveryMinutes = order.shippingDeliveryDays * 24 * 60;
    if (minutes >= deliveryMinutes) return "DELIVERED";
    return "SHIPPED";
  }

  return "DELIVERED";
}
