"use client";
import { useFindCart } from "@/shared/hooks/data/useCartQueries";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { data } = useFindCart();

  if (!data) {
    return <h1 className="text-red-500">Falha ao carregar os produtos</h1>;
  }

  if (!data.cart) {
    return <h1 className="text-red-500">Você não tem produtos no carrinho</h1>;
  }

  return (
    <div className="mt-8 flex flex-col gap-5">
      {data.cart.items.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          product={cartItem.product}
          productOptions={cartItem.productOptions}
          quantity={cartItem.quantity}
        />
      ))}
    </div>
  );
};
