"use client";
import { useFindCart } from "@/shared/hooks/data/useCartQueries";
import { CartList } from "./components/CartList/CartList";
import { CartSummary } from "./components/CartSummary/CartSummary";
import { CartHeader } from "./components/Header/CartHeader";

const CartPage = () => {
  const { data, isLoading, isError } = useFindCart();

  if (isError) {
    return <h1 className="text-red-500">Falha ao carregar os produtos</h1>;
  }

  if (isLoading) {
    return <h1 className="text-red-500">AAAAAAAAAAAAAAAAAAAAA</h1>;
  }

  if (!data?.cart) {
    return <h1 className="text-red-500">Você não tem produtos no carrinho</h1>;
  }

  return (
    <section className="bg-neutral-100 pb-40 lg:p-0">
      <div className="mx-auto">
        <CartHeader />
        <div className="mx-auto mt-2 flex justify-center gap-3 p-3 lg:container lg:flex">
          <CartList cart={data.cart} />
          <CartSummary cart={data.cart} count={data.count} />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
