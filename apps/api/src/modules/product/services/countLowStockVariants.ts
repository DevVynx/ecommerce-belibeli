import { productRepositories } from "@/modules/product/repositories";

export const countLowStockVariants = async () => {
  const lowStockCount = await productRepositories.countLowStockVariants();
  return { lowStockCount };
};
