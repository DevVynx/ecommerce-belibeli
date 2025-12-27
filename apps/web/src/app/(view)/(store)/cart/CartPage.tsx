"use client";
import type { ProductDto } from "@repo/types/contracts";

import { CartList } from "@/app/(view)/(store)/cart/components/CartList/CartList";
import { CartPageSkeleton } from "@/app/(view)/(store)/cart/components/CartPageSkeleton";
import { CartSummary } from "@/app/(view)/(store)/cart/components/CartSummary";
import { EmptyCart } from "@/app/(view)/(store)/cart/components/EmptyCart";
import { RecommendedProducts } from "@/app/(view)/(store)/cart/components/RecommendedProducts";
import { CartLoadError } from "@/app/shared/components/store/CartLoadError";
import { ProductDetailsModal } from "@/app/shared/components/store/ProductDetailsModal/ProductDetailsModal";
import { useFindCart } from "@/app/shared/hooks/data/useCartQueries";

type CartPageProps = {
  products: ProductDto[];
};

export const CartPage = ({ products }: CartPageProps) => {
  const { data, refetch, isError, isLoading } = useFindCart();

  if (isLoading) {
    return <CartPageSkeleton />;
  }
  if (isError || !data) {
    return <CartLoadError refetchAction={refetch} />;
  }

  if (!data.cart) {
    return (
      <section className="bg-neutral-100 pb-40 lg:p-0">
        <div className="mx-auto flex justify-center p-10">
          <EmptyCart />
        </div>
        <RecommendedProducts products={products} />
        <ProductDetailsModal />
      </section>
    );
  }

  return (
    <section className="mt-14.5 bg-white pb-40 lg:pb-0">
      {/* <CartHeader /> */}
      <div className="mx-auto my-2 justify-center gap-3 p-3 lg:container lg:flex">
        <CartList items={data.cart.items} />
        <CartSummary
          summary={{
            count: data.count,
            discount: data.discount,
            subtotal: data.subtotal,
            total: data.total,
          }}
        />
      </div>
      <RecommendedProducts products={products} />
      <ProductDetailsModal />
    </section>
  );
};
