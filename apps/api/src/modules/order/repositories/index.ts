import { createOrder } from "./createOrder";
import { findOrdersByUserId } from "./findOrdersByUserId";
import { updateOrderStatus } from "./updateOrderStatus";

export const orderRepositories = {
  createOrder,
  findOrdersByUserId,
  updateOrderStatus,
};
