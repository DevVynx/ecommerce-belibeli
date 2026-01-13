import type { CartItemDto } from "@repo/types/contracts";
import { Minus, Plus } from "lucide-react";
import React from "react";

import { HeartIcon } from "@/app/shared/assets/animatedIcons/heart";
import { TrashIcon } from "@/app/shared/assets/animatedIcons/trash";
import { Button } from "@/app/shared/components/ui/button";
import { isSaleActive } from "@/app/shared/utils/product/isSaleActive";

type CartItemProps = {
  product: CartItemDto["product"];
  productOptions: CartItemDto["productOptions"];
  quantity: number;
  onDelete?: () => void;
  onAddToWishlist?: () => void;
  onQuantityChange?: (newQuantity: number) => void;
};

export const CartItem = ({
  product,
  productOptions,
  quantity,
  onDelete,
  onAddToWishlist,
  onQuantityChange,
}: CartItemProps) => {
  const isProductOnSale = isSaleActive(product.promotionEnd);

  const handleIncrease = () => {
    onQuantityChange?.(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange?.(quantity - 1);
    }
  };

  return (
    <div className="flex w-full rounded-sm bg-neutral-100 p-4 text-xs md:text-lg">
      <CartItemImage product={product} />
      <div className="relative ml-3 flex flex-1">
        <CartItemInfo>
          <div>
            <CartItemTitle productTitle={product.title} />
            <CartItemSpecifications productOptions={productOptions} />
          </div>
          <CartItemPrice
            productPrice={product.price}
            productPromoPrice={product.promotionPrice}
            isProductOnSale={isProductOnSale}
          />
        </CartItemInfo>
        <CartItemActions>
          <CartItemSecondaryActions onDelete={onDelete} onAddToWishlist={onAddToWishlist} />
          <CartItemQuantityControl
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </CartItemActions>
      </div>
    </div>
  );
};

type CartItemImageProps = {
  product: CartItemDto["product"];
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
  return <div className="flex flex-1 flex-col justify-between">{children}</div>;
};

type CartItemTitleProps = React.ComponentProps<"h1"> & {
  productTitle: string;
};

const CartItemTitle = ({ productTitle, ...props }: CartItemTitleProps) => {
  return (
    <h1 {...props} className="line-clamp-1 text-sm leading-tight font-semibold md:text-lg">
      {productTitle}
    </h1>
  );
};

type CartItemSpecificationsProps = {
  productOptions: CartItemDto["productOptions"];
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

type CartItemPriceProps = React.ComponentProps<"div"> & {
  productPrice: number;
  productPromoPrice: number | null;
  isProductOnSale: boolean;
};

const CartItemPrice = ({
  productPrice,
  productPromoPrice,
  isProductOnSale,
}: CartItemPriceProps) => {
  return (
    <div className="flex items-center gap-1 self-stretch">
      <strong className="text-xs font-semibold sm:text-base md:text-lg">
        R$
        {isProductOnSale ? productPromoPrice?.toFixed(2) : productPrice.toFixed(2)}
      </strong>
      {isProductOnSale && (
        <span className="text-xs text-red-500 line-through md:text-sm">
          R${Number(productPrice).toFixed(2)}
        </span>
      )}
    </div>
  );
};

type CartItemActionsProps = {
  children: React.ReactNode;
};

const CartItemActions = ({ children }: CartItemActionsProps) => {
  return (
    <div className="flex h-full flex-col items-end justify-between gap-5 sm:absolute sm:right-0 sm:bottom-0 sm:flex-row-reverse">
      {children}
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
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrease}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-50 active:bg-gray-200 md:h-8 md:w-8 md:text-base"
        aria-label="Diminuir quantidade"
      >
        <Minus className="size-2.5 stroke-black/70 md:size-4" />
      </button>
      <span className="w-6 text-center text-xs sm:w-8 sm:text-sm md:w-10 md:text-lg">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-50 active:bg-gray-200 md:h-8 md:w-8 md:text-base"
        aria-label="Aumentar quantidade"
      >
        <Plus className="size-2.5 stroke-black/70 md:size-4" />
      </button>
    </div>
  );
};

type CartItemSecondaryActionsProps = {
  onDelete?: () => void;
  onAddToWishlist?: () => void;
};

const CartItemSecondaryActions = ({ onDelete, onAddToWishlist }: CartItemSecondaryActionsProps) => {
  return (
    <div className="flex items-center gap-6.5 md:flex-row">
      <Button
        onClick={onAddToWishlist}
        className="flex cursor-pointer items-center justify-center rounded-full bg-transparent p-1 transition-colors hover:bg-red-400 active:bg-gray-200 sm:h-6 sm:w-6 md:h-8 md:w-8"
        aria-label="Adicionar à lista de desejos"
      >
        <HeartIcon size={20} className="text-black/70" />
      </Button>
      <Button
        onClick={onDelete}
        className="flex cursor-pointer items-center justify-center rounded-full bg-transparent p-1 transition-colors hover:bg-red-200 active:bg-red-100 sm:h-6 sm:w-6 md:h-8 md:w-8"
        aria-label="Remover do carrinho"
      >
        <TrashIcon size={20} className="text-black/70" />
      </Button>
    </div>
  );
};
