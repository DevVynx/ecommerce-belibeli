import { buildOrderWhere } from "./buildOrderWhere";
import { countActiveOrders } from "./countActiveOrders";
import { countAll } from "./countAll";
import { createOrder } from "./createOrder";
import { findAll } from "./findAll";
import { findOrderById } from "./findOrderById";
import { findOrderByProduct } from "./findOrderByProduct";
import { findOrdersByUserId } from "./findOrdersByUserId";
import { updateOrderStatus } from "./updateOrderStatus";

export const orderRepositories = {
  buildOrderWhere,
  countActiveOrders,
  countAll,
  createOrder,
  findAll,
  findOrderById,
  findOrderByProduct,
  findOrdersByUserId,
  updateOrderStatus,
};
