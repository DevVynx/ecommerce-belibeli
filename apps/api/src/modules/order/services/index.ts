import { cancelOrder } from "./cancelOrder";
import { confirmPayment } from "./confirmPayment";
import { countActiveOrders } from "./countActiveOrders";
import { createOrder } from "./createOrder";
import { findOrderById } from "./findById";
import { getAll } from "./getAll";
import { listOrders } from "./listOrders";
import { validateOrderProduct } from "./validateOrderProduct";

export const orderServices = {
  countActiveOrders,
  createOrder,
  confirmPayment,
  cancelOrder,
  findOrderById,
  getAll,
  listOrders,
  validateOrderProduct,
};
