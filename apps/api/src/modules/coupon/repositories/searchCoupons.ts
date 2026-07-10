import { db } from "@/shared/lib/db";

import type { Prisma } from "../../../../prisma/generated/client/client";

type SearchCouponsParams = {
  q?: string;
  isActive?: boolean;
  sortBy?: "newest" | "oldest" | "expiring_soon" | "usage_desc" | "usage_asc";
  page: number;
  limit: number;
};

function buildWhere(params: Pick<SearchCouponsParams, "q" | "isActive">) {
  const { q, isActive } = params;
  const where: Prisma.CouponWhereInput = {};

  if (q) {
    where.OR = [
      { code: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  return where;
}

export const searchCoupons = async (params: SearchCouponsParams) => {
  const { sortBy, page, limit } = params;
  const where = buildWhere(params);
  const skip = (page - 1) * limit;

  if (sortBy === "usage_desc" || sortBy === "usage_asc") {
    const all = await db.coupon.findMany({
      where,
      include: { _count: { select: { couponUsages: true } } },
    });

    all.sort((a, b) =>
      sortBy === "usage_desc"
        ? b._count.couponUsages - a._count.couponUsages
        : a._count.couponUsages - b._count.couponUsages
    );

    const total = all.length;
    const rows = all.slice(skip, skip + limit);

    return { coupons: rows, total };
  }

  const orderBy: Prisma.CouponOrderByWithRelationInput =
    sortBy === "oldest"
      ? { createdAt: "asc" }
      : sortBy === "expiring_soon"
        ? { endsAt: "asc" }
        : { createdAt: "desc" };

  const [total, rows] = await Promise.all([
    db.coupon.count({ where }),
    db.coupon.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: { _count: { select: { couponUsages: true } } },
    }),
  ]);

  return { coupons: rows, total };
};
