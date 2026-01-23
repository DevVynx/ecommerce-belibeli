import { ProductDto } from "@repo/types/contracts";

export function getProductsOnSale(products: ProductDto[] | undefined) {
  if (!products) return [];

  const productsOnSale = products.filter((product) => {
    if (!product.promotionEnd) return false;

    const now = new Date();
    const end = new Date(product.promotionEnd);

    return now < end;
  });

  return productsOnSale;
}
