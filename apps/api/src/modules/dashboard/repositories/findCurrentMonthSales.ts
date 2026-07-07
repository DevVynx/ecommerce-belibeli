import { db } from "@/shared/lib/db";

export const findCurrentMonthSales = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const result = await db.order.aggregate({
    _sum: { total: true },
    where: {
      status: { in: ["PAID", "DELIVERED"] },
      createdAt: { gte: startOfMonth },
    },
  });

  return Number(result._sum.total ?? 0);
};
