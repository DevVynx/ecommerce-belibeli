import { cancelOrder } from "./cancelOrder";
import { confirmPayment } from "./confirmPayment";
import { createOrder } from "./createOrder";
import { listOrders } from "./listOrders";

export const orderServices = {
  createOrder,
  confirmPayment,
  cancelOrder,
  listOrders,
};
