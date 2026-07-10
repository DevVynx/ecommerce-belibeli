import { couponRepositories } from "@/modules/coupon/repositories";
import { ConflictError, NotFoundError, UnprocessableEntityError } from "@/shared/utils/HttpErrors";

const RESTRICTED_WHEN_USED = [
  "code",
  "type",
  "value",
  "maxDiscount",
  "minOrderValue",
  "startsAt",
] as const;

export const updateCoupon = async (id: string, data: Record<string, unknown>) => {
  const coupon = await couponRepositories.findById(id);

  if (!coupon) {
    throw new NotFoundError("Cupom não encontrado.");
  }

  const usageCount = await couponRepositories.countUsagesByCouponId(id);

  if (usageCount > 0) {
    const restrictedSent = RESTRICTED_WHEN_USED.filter((f) => f in data);
    if (restrictedSent.length > 0) {
      throw new UnprocessableEntityError(
        `Cupom já utilizado. Não é possível alterar: ${restrictedSent.join(", ")}.`
      );
    }
  }

  if (data.code !== undefined && data.code !== coupon.code) {
    const existing = await couponRepositories.findByCode({ code: data.code as string });
    if (existing) {
      throw new ConflictError("Já existe um cupom com este código.");
    }
  }

  if (data.usageLimit !== undefined && (data.usageLimit as number) < usageCount) {
    throw new UnprocessableEntityError(
      `Limite de uso não pode ser menor que os ${usageCount} usos já realizados.`
    );
  }

  const updated = await couponRepositories.update(id, data);

  return { coupon: updated };
};
