import { db } from "@/shared/lib/db";

import { buildOrderWhere } from "./buildOrderWhere";

type FindAllProps = {
  skip: number;
  take: number;
  sort: "asc" | "desc";
  q?: string;
  status?: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED" | "REFUNDED";
};

export const findAll = async ({ skip, take, sort, q, status }: FindAllProps) => {
  const where = buildOrderWhere({ q, status });

  const orders = await db.order.findMany({
    skip,
    take,
    where,
    orderBy: [{ createdAt: sort }, { id: "asc" }],
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return orders;
};
