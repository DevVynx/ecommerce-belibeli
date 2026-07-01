import { orderRepositories } from "@/modules/order/repositories";

type ListOrdersParams = {
  userId: string;
};

export const listOrders = async ({ userId }: ListOrdersParams) => {
  const orders = await orderRepositories.findOrdersByUserId({ userId });

  return { orders };
};
