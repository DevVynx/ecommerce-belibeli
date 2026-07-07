import { db } from "@/shared/lib/db";

export const countLowStockVariants = async () => {
  return db.productVariant.count({
    where: {
      isActive: true,
      stock: { lt: 5 },
    },
  });
};
