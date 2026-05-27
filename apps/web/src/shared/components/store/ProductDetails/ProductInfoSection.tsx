import { getProductBySlug } from "@/shared/actions/products/getProductBySlug";
import { SectionError } from "@/shared/components/SectionError";

import { ProductInfoClient } from "./ProductInfoClient";

type ProductInfoSectionProps = {
  params: Promise<{ slug: string }>;
};

export const ProductInfoSection = async ({ params }: ProductInfoSectionProps) => {
  const { slug } = await params;
  const { data, error } = await getProductBySlug({ slug });

  if (!data || error) {
    return (
      <SectionError
        title="Produto Indisponível"
        description="Não foi possível carregar o produto no momento. Tente novamente mais tarde."
        toastDuration={6000}
      />
    );
  }

  return <ProductInfoClient data={data} />;
};
