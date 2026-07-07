import type { AdminOrderDto } from "@repo/types/contracts";

import type { Prisma } from "../../../../prisma/generated/client/client";

type AdminOrderRaw = Prisma.OrderGetPayload<{
  include: {
    user: { select: { id: true; name: true; email: true } };
  };
}>;

export const toAdminOrderDto = (raw: AdminOrderRaw): AdminOrderDto => ({
  order: {
    id: raw.id,
    orderNumber: raw.orderNumber,
    total: Number(raw.total),
    status: raw.status,
    createdAt: raw.createdAt.toISOString(),
    user: {
      id: raw.user.id,
      name: raw.user.name,
      email: raw.user.email,
    },
  },
});
