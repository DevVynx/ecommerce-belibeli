import { db } from "@/shared/lib/db";

type DateRange = { start: Date; end: Date } | null;

export const countActiveOrders = async (period: DateRange) => {
  const where = {
    status: { in: ["PAID" as const, "DELIVERED" as const] },
    ...(period ? { createdAt: { gte: period.start, lt: period.end } } : {}),
  };

  return db.order.count({ where });
};
