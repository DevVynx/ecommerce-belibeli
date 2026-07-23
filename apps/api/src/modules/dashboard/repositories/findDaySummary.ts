import { db } from "@/shared/lib/db";

export const findDaySummary = async (start: Date, end: Date) => {
  const result = await db.order.aggregate({
    _sum: { total: true },
    _count: { id: true },
    where: {
      status: { notIn: ["CANCELED", "REFUNDED"] },
      createdAt: { gte: start, lt: end },
    },
  });

  return {
    revenue: Number(result._sum.total ?? 0),
    orders: result._count.id,
  };
};
