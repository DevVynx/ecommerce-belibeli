import type { Prisma } from "../../../../prisma/generated/client/client";

type CouponRaw = Prisma.CouponGetPayload<object>;

type CouponInfo = {
  code: string;
  description: string;
  type: "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";
};

export const toCouponDto = (raw: CouponRaw): CouponInfo => ({
  code: raw.code,
  description: raw.description,
  type: raw.type,
});
