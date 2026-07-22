import { orderRepositories } from "@/modules/order/repositories";

import { applyStatusSimulation } from "./applyStatusSimulation";

type ListOrdersParams = {
  userId: string;
};

export const listOrders = async ({ userId }: ListOrdersParams) => {
  const orders = await orderRepositories.findOrdersByUserId({ userId });

  await Promise.all(orders.map((order) => applyStatusSimulation(order)));

  return { orders };
};
