import type { OrderDto } from "@repo/types/contracts";

import { orderRepositories } from "@/modules/order/repositories";

type ListOrdersParams = {
  userId: string;
};

export const listOrders = async ({ userId }: ListOrdersParams) => {
  const orders = await orderRepositories.findOrdersByUserId({ userId });

  const ordersDto: OrderDto[] = orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    total: Number(order.total),
    subtotal: Number(order.subtotal),
    shipping: Number(order.shipping),
    discount: Number(order.discount),
    status: order.status,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt.toISOString(),
  }));

  return { orders: ordersDto };
};
