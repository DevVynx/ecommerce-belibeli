import type { ProductOptions } from "@/shared/types/product";
import { isSaleActive } from "@/shared/utils/product/isSaleActive";
import type { Product } from "@prisma/client";
import React from "react";

type CartItemProps = {
  product: Product;
  productOptions: ProductOptions;
  quantity: number;
};

export const CartItem = ({ product, productOptions, quantity }: CartItemProps) => {
  const isProductOnSale = isSaleActive(product.promotionEnd);

  return (
    <div className="relative flex text-xs md:text-lg">
      <CartItemImage product={product} />
      <CartItemInfo>
        <div>
          <CartItemTitle product={product} />
          <CartItemSpecifications productOptions={productOptions} />
        </div>
        <CartItemPrice product={product} isProductOnSale={isProductOnSale} />
      </CartItemInfo>
      <CartItemQuantityControl quantity={quantity} />
    </div>
  );
};

type CartItemImageProps = {
  product: Product;
};

const CartItemImage = ({ product }: CartItemImageProps) => {
  return (
    <img
      className="aspect-square w-20 rounded-sm bg-black/10 object-contain p-1 sm:w-30 md:w-40"
      src={product.image}
      alt={product.title}
    />
  );
};

type CartItemInfoProps = {
  children: React.ReactNode;
};

const CartItemInfo = ({ children }: CartItemInfoProps) => {
  return <div className="ml-3 flex flex-col justify-between py-2">{children}</div>;
};

type CartItemTitleProps = {
  product: Product;
};

const CartItemTitle = ({ product }: CartItemTitleProps) => {
  return (
    <h1 className="line-clamp-1 text-sm leading-tight font-semibold md:text-lg">{product.title}</h1>
  );
};

type CartItemSpecificationsProps = {
  productOptions: ProductOptions;
};

const CartItemSpecifications = ({ productOptions }: CartItemSpecificationsProps) => {
  return (
    <div className="mt-1 flex flex-col gap-1">
      {productOptions.map((opt) => (
        <span key={opt.option.id} className="text-xs font-semibold text-black/80 md:text-sm">
          {opt.option.type}: <span className="text-black/60">{opt.optionValue.value}</span>
        </span>
      ))}
    </div>
  );
};

type CartItemPriceProps = {
  product: Product;
  isProductOnSale: boolean;
};

const CartItemPrice = ({ product, isProductOnSale }: CartItemPriceProps) => {
  return (
    <div className="flex items-center gap-1 self-stretch">
      <strong className="text-xs font-semibold md:text-base">
        R$
        {isProductOnSale
          ? Number(product.promotionPrice)?.toFixed(2)
          : Number(product.price).toFixed(2)}
      </strong>
      {isProductOnSale && (
        <span className="text-xs text-red-500 line-through md:text-sm">
          R${Number(product.price).toFixed(2)}
        </span>
      )}
    </div>
  );
};

type CartItemQuantityControlProps = {
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

const CartItemQuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
}: CartItemQuantityControlProps) => {
  return (
    <div className="absolute right-0 bottom-2 flex items-center">
      <button
        onClick={onDecrease}
        className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 active:bg-gray-200 sm:h-6 sm:w-6 md:h-8 md:w-8"
        aria-label="Diminuir quantidade"
      >
        -
      </button>
      <span className="w-6 text-center text-xs sm:w-8 sm:text-sm md:w-10 md:text-lg">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 active:bg-gray-200 sm:h-6 sm:w-6 md:h-8 md:w-8"
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
};

const CartItemActions = () => {
  return <div></div>;
};
