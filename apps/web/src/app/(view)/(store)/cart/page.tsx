"use client";
import { useState } from "react";

import { CartList } from "@/app/(view)/(store)/cart/components/CartList/CartList";
import { CartPageSkeleton } from "@/app/(view)/(store)/cart/components/CartPageSkeleton";
import { CartSummary } from "@/app/(view)/(store)/cart/components/CartSummary/CartSummary";
import { EmptyCart } from "@/app/(view)/(store)/cart/components/EmptyCart";
import { RecommendedProducts } from "@/app/(view)/(store)/cart/components/RecommendedProducts";
import { CartLoadError } from "@/app/shared/components/store/CartLoadError";
import { ProductDetailsModal } from "@/app/shared/components/store/ProductDetailsModal/ProductDetailsModal";
import { useFindCart } from "@/app/shared/hooks/data/useCartQueries";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";

const CartPage = () => {
  const { data: cartData, refetch, isError, isLoading } = useFindCart();
  const { data: productsData } = useFindProducts();
  const [pendingSyncItemIds, setPendingSyncItemIds] = useState<string[]>([]);

  const addPendingItem = (id: string) => {
    setPendingSyncItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removePendingItem = (id: string) => {
    setPendingSyncItemIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  if (isLoading) {
    return <CartPageSkeleton />;
  }
  if (isError || !cartData || !productsData) {
    return <CartLoadError refetchAction={refetch} />;
  }

  if (!cartData.cart) {
    return (
      <section className="bg-neutral-100 pb-40 lg:p-0">
        <div className="mx-auto flex justify-center p-10">
          <EmptyCart />
        </div>
        <RecommendedProducts products={productsData.products} />
        <ProductDetailsModal />
      </section>
    );
  }

  return (
    <section className="mt-20 bg-white px-2 pb-40 lg:pb-0">
      {/* <CartHeader /> */}
      <div className="mx-auto lg:container">
        <div className="mb-6 border-b pb-5">
          <h1 className="text-2xl font-bold lg:text-4xl lg:font-semibold">
            Seu Carrinho ({cartData.count})
          </h1>
        </div>
        <div className="justify-center gap-3 lg:flex">
          <CartList
            items={cartData.cart.items}
            addPendingItem={addPendingItem}
            removePendingItem={removePendingItem}
          />
          <div className="max-w-sm xl:max-w-lg">
            <CartSummary
              summary={{
                count: cartData.count,
                discount: cartData.discount,
                subtotal: cartData.subtotal,
                total: cartData.total,
              }}
              isCartLoading={pendingSyncItemIds.length > 0}
            />
          </div>
        </div>
      </div>
      <RecommendedProducts products={productsData.products} />
      <ProductDetailsModal />
    </section>
  );
};

export default CartPage;
