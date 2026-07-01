import type { OrderDto } from "@repo/types/contracts";

import type { Prisma } from "../../../../prisma/generated/client/client";

type OrderRaw = Prisma.OrderGetPayload<object>;

export const toOrderDto = (raw: OrderRaw): OrderDto => ({
  id: raw.id,
  orderNumber: raw.orderNumber,
  total: Number(raw.total),
  subtotal: Number(raw.subtotal),
  shipping: Number(raw.shipping),
  discount: Number(raw.discount),
  status: raw.status,
  paymentMethod: raw.paymentMethod,
  createdAt: raw.createdAt.toISOString(),
});
