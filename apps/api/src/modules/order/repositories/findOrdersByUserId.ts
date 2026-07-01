import { db } from "@/shared/lib/db";

type FindOrdersByUserIdProps = {
  userId: string;
};

export const findOrdersByUserId = async ({ userId }: FindOrdersByUserIdProps) => {
  const orders = await db.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return orders;
};
