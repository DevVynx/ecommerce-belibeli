<<<<<<< HEAD
import type { OrderDto } from "@repo/types/contracts";

=======
>>>>>>> 1ec5953 (refactor(api): extract DTO mappers from services)
import { orderRepositories } from "@/modules/order/repositories";

type ListOrdersParams = {
  userId: string;
};

export const listOrders = async ({ userId }: ListOrdersParams) => {
  const orders = await orderRepositories.findOrdersByUserId({ userId });

<<<<<<< HEAD
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
=======
  return { orders };
>>>>>>> 1ec5953 (refactor(api): extract DTO mappers from services)
};
