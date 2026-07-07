import { db } from "@/shared/lib/db";

export const findPreviousMonthSales = async () => {
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const result = await db.order.aggregate({
    _sum: { total: true },
    where: {
      status: { in: ["PAID", "DELIVERED"] },
      createdAt: { gte: startOfPreviousMonth, lt: startOfCurrentMonth },
    },
  });

  return Number(result._sum.total ?? 0);
};
