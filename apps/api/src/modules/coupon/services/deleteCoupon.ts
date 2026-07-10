import { couponRepositories } from "@/modules/coupon/repositories";
import { NotFoundError, UnprocessableEntityError } from "@/shared/utils/HttpErrors";

export const deleteCoupon = async (id: string) => {
  const coupon = await couponRepositories.findById(id);

  if (!coupon) {
    throw new NotFoundError("Cupom não encontrado.");
  }

  const usageCount = await couponRepositories.countUsagesByCouponId(id);

  if (usageCount > 0) {
    throw new UnprocessableEntityError(
      `Cupom já utilizado (${usageCount} ${usageCount === 1 ? "uso" : "usos"}). Não pode ser deletado.`
    );
  }

  await couponRepositories.deleteCoupon(id);
};
