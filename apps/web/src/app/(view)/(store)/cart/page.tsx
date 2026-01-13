"use client";
import { CartList } from "@/app/(view)/(store)/cart/components/CartList/CartList";
import { CartPageSkeleton } from "@/app/(view)/(store)/cart/components/CartPageSkeleton";
import { CartSummary } from "@/app/(view)/(store)/cart/components/CartSummary";
import { EmptyCart } from "@/app/(view)/(store)/cart/components/EmptyCart";
import { RecommendedProducts } from "@/app/(view)/(store)/cart/components/RecommendedProducts";
import { CartLoadError } from "@/app/shared/components/store/CartLoadError";
import { ProductDetailsModal } from "@/app/shared/components/store/ProductDetailsModal/ProductDetailsModal";
import { useFindCart } from "@/app/shared/hooks/data/useCartQueries";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";

const CartPage = () => {
  const { data: cartData, refetch, isError, isLoading } = useFindCart();
  const { data: productsData } = useFindProducts();

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
    <section className="mt-14.5 bg-white pb-40 lg:pb-0">
      {/* <CartHeader /> */}
      <div className="mx-auto my-2 justify-center gap-3 p-3 lg:container lg:flex">
        <CartList items={cartData.cart.items} />
        <CartSummary
          summary={{
            count: cartData.count,
            discount: cartData.discount,
            subtotal: cartData.subtotal,
            total: cartData.total,
          }}
        />
      </div>
      <RecommendedProducts products={productsData.products} />
      <ProductDetailsModal />
    </section>
  );
};

export default CartPage;
