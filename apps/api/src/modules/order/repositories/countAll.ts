import { db } from "@/shared/lib/db";

import type { OrderStatus } from "../../../../prisma/generated/client/client";
import { buildOrderWhere } from "./buildOrderWhere";

type CountAllProps = {
  q?: string;
  status?: OrderStatus;
};

export const countAll = async ({ q, status }: CountAllProps = {}) => {
  const where = buildOrderWhere({ q, status });

  return db.order.count({ where });
};
