import { getProducts } from "@/shared/actions/products/getProducts";

import { FlashSaleCarouselContent } from "./FlashSaleCarouselContent";

export const FlashSaleCarousel = async () => {
  const { data } = await getProducts();

  const products = data?.products ?? [];

  return <FlashSaleCarouselContent products={products} />;
};
