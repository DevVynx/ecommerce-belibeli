import { db } from "@/shared/lib/db";

type DateRange = { start: Date; end: Date } | null;

export const findSalesStats = async (period: DateRange) => {
  if (!period) {
    const result = await db.order.aggregate({
      _sum: { total: true },
      where: {
        status: { in: ["PAID", "DELIVERED"] },
      },
    });

    return Number(result._sum.total ?? 0);
  }

  const result = await db.order.aggregate({
    _sum: { total: true },
    where: {
      status: { in: ["PAID", "DELIVERED"] },
      createdAt: { gte: period.start, lt: period.end },
    },
  });

  return Number(result._sum.total ?? 0);
};
