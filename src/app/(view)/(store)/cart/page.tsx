"use client";
import { useFindCart } from "@/shared/hooks/data/useCartQueries";
import { CartList } from "./components/CartList/CartList";
import { CartSummary } from "./components/CartSummary";
import { CartHeader } from "./components/CartHeader";
import { RecommendedProducts } from "./components/RecommendedProducts";
import { CartPageSkeleton } from "./components/CartPageSkeleton";
import { EmptyCart } from "./components/EmptyCart";
import { useProductDetailsContext } from "../contexts/ProductDetailsContext";
import { ProductDetailsModal } from "../components/ProductDetailsModal/ProductDetailsModal";

const CartPage = () => {
  const { data, isLoading, isError } = useFindCart();
  const { isProductDetailsModalOpen } = useProductDetailsContext();

  if (isError) {
    return (
      <section className="min-h-screen bg-neutral-100 pb-40 lg:p-0">
        <div className="mx-auto">
          <CartHeader />
          <div className="flex justify-center p-10">
            <h1 className="text-xl text-red-500">Falha ao carregar os produtos</h1>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return <CartPageSkeleton />;
  }

  if (!data?.cart || data.cart.items.length === 0) {
    return (
      <section className="bg-neutral-100 pb-40 lg:p-0">
        <div className="mx-auto">
          <CartHeader />
          <div className="flex justify-center p-10">
            <EmptyCart />
          </div>
          <RecommendedProducts />
        </div>
        {isProductDetailsModalOpen && <ProductDetailsModal />}
      </section>
    );
  }

  return (
    <section className="bg-neutral-100 pb-40 lg:p-0">
      <div className="mx-auto">
        <CartHeader />
        <div className="mx-auto mt-2 flex justify-center gap-3 p-3 lg:container lg:flex">
          <CartList cart={data.cart} />
          <CartSummary cart={data.cart} count={data.count} />
        </div>
        <RecommendedProducts />
      </div>
      {isProductDetailsModalOpen && <ProductDetailsModal />}
    </section>
  );
};

export default CartPage;
