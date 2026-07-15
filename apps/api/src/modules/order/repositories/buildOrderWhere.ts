import type { OrderStatus, Prisma } from "../../../../prisma/generated/client/client";

type BuildOrderWhereParams = {
  q?: string;
  status?: OrderStatus;
};

export function buildOrderWhere({ q, status }: BuildOrderWhereParams): Prisma.OrderWhereInput {
  const where: Prisma.OrderWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (q) {
    const orConditions: Prisma.OrderWhereInput[] = [
      { user: { name: { contains: q, mode: "insensitive" } } },
      { user: { email: { contains: q, mode: "insensitive" } } },
    ];

    if (/^\d+$/.test(q)) {
      orConditions.push({ orderNumber: { equals: Number(q) } });
    }

    where.OR = orConditions;
  }

  return where;
}
