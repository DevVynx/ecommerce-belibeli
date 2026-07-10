import { countGlobalUsages } from "./countGlobalUsages";
import { countUsagesByCouponId } from "./countUsagesByCouponId";
import { countUsagesByUser } from "./countUsagesByUser";
import { create } from "./create";
import { deleteCoupon } from "./delete";
import { deleteUsageByOrderId } from "./deleteUsageByOrderId";
import { findByCode } from "./findByCode";
import { findById } from "./findById";
import { searchCoupons } from "./searchCoupons";
import { update } from "./update";

export const couponRepositories = {
  countGlobalUsages,
  countUsagesByCouponId,
  countUsagesByUser,
  create,
  deleteCoupon,
  deleteUsageByOrderId,
  findByCode,
  findById,
  searchCoupons,
  update,
};
