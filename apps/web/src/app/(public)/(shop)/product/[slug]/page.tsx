import type { Metadata } from "next";
import { Suspense } from "react";

import { getProductBySlug } from "@/shared/actions/products/getProductBySlug";
import { ProductInfoSection } from "@/shared/components/Store/ProductDetails/ProductInfoSection";
import { ReviewsSection } from "@/shared/components/Store/ProductDetails/ReviewsSection";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const mockReviews = [
  {
    id: "1",
    author: "Ana Silva",
    location: "São Paulo, SP",
    rating: 5,
    comment:
      "Produto excelente! Qualidade superior ao esperado. A entrega foi super rápida e veio muito bem embalado. Recomendo!",
  },
  {
    id: "2",
    author: "Carlos Oliveira",
    location: "Rio de Janeiro, RJ",
    rating: 4,
    comment:
      "Muito bom! O material é de alta qualidade e o acabamento impecável. Único ponto é que demorou um pouco mais que o previsto.",
  },
  {
    id: "3",
    author: "Mariana Costa",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment:
      "Comprei presente e amei! A embalagem é linda, parece presente de loja física. O produto superou minhas expectativas.",
  },
  {
    id: "4",
    author: "Pedro Santos",
    location: "Curitiba, PR",
    rating: 4,
    comment:
      "Boa compra! Custo-benefício excelente. Atendeu bem minhas necessidades. Senti falta de mais opções de cores.",
  },
];

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await getProductBySlug({ slug });

  if (!data) {
    return { title: "Produto não encontrado | BeliBeli Store" };
  }

  return {
    title: `${data.product.title} | BeliBeli Store`,
    description: data.product.description,
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  return (
    <div className="container mx-auto mt-10 px-2 py-8 md:px-0">
      <Suspense fallback={<h1>Carregando...</h1>}>
        <ProductInfoSection params={params} />
      </Suspense>

      <ReviewsSection ratingRate={4.5} ratingCount={128} reviews={mockReviews} />
    </div>
  );
};

export default ProductPage;
