import { getProducts } from "@/shared/actions/products/getProducts";

import { ForYouSectionContent } from "./ForYouSectionContent";

export const ForYouSectionLoader = async () => {
  const { data } = await getProducts();
  const products = data?.products ?? [];

  return <ForYouSectionContent products={products} />;
};
