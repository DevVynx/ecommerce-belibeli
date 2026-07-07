import { db } from "@/shared/lib/db";

type FindAllProps = {
  skip: number;
  take: number;
  sort: "asc" | "desc";
};

export const findAll = async ({ skip, take, sort }: FindAllProps) => {
  const orders = await db.order.findMany({
    skip,
    take,
    orderBy: { createdAt: sort },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return orders;
};
