import type { CartItemDto } from "@repo/types/contracts";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import React from "react";

import { HeartIcon } from "@/app/shared/assets/animatedIcons/heart";
import { TrashIcon } from "@/app/shared/assets/animatedIcons/trash";
import { Button } from "@/app/shared/components/ui/button";
import {
  useRemoveItemFromCart,
  useUpdateCartItemQuantity,
} from "@/app/shared/hooks/data/useCartMutations";
import { useAddItemToWishlist } from "@/app/shared/hooks/data/useWishlistMutations";
import { isSaleActive } from "@/app/shared/utils/product/isSaleActive";

type CartItemProps = {
  item: CartItemDto;
  addPendingItem: (itemId: string) => void;
  removePendingItem: (itemId: string) => void;
};

export const CartItem = ({ item, addPendingItem, removePendingItem }: CartItemProps) => {
  const { mutate: addtoWishlist } = useAddItemToWishlist();
  const { mutate: removeFromCart } = useRemoveItemFromCart();
  const { mutate: updateCartItemQuantity } = useUpdateCartItemQuantity();
  const [quantity, setQuantity] = useState(item.quantity);

  const isProductOnSale = isSaleActive(item.product.promotionEnd);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleQuantityChange = (nextQuantity: number) => {
    if (nextQuantity === quantity) return;
    addPendingItem(item.id);
    setQuantity(nextQuantity);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        updateCartItemQuantity({
          cartItemId: item.id,
          quantity: nextQuantity,
        });
      } finally {
        removePendingItem(item.id);
        timeoutRef.current = null;
      }
    }, 500);
  };

  const handleAddToWishlist = () => {
    addtoWishlist({
      productId: item.product.id,
    });
    removeFromCart({
      cartItemId: item.id,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart({
      cartItemId: item.id,
    });
  };

  return (
    <div className="flex w-full rounded-sm bg-neutral-100 p-4 text-xs md:text-lg">
      <CartItemImage product={item.product} />
      <div className="relative ml-3 flex flex-1">
        <CartItemInfo>
          <div>
            <CartItemTitle productTitle={item.product.title} />
            <CartItemSpecifications productOptions={item.productOptions} />
          </div>
          <CartItemPrice
            productPrice={item.product.price}
            productPromoPrice={item.product.promotionPrice}
            isProductOnSale={isProductOnSale}
          />
        </CartItemInfo>
        <CartItemActions>
          <CartItemSecondaryActions
            handleAddToWishlist={handleAddToWishlist}
            handleRemoveFromCart={handleRemoveFromCart}
          />
          <CartItemQuantityControl
            quantity={quantity}
            onIncrease={handleQuantityChange}
            onDecrease={handleQuantityChange}
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
  onIncrease: (nextQuantity: number) => void;
  onDecrease: (nextQuantity: number) => void;
};

const CartItemQuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
}: CartItemQuantityControlProps) => {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onDecrease(quantity <= 1 ? 1 : quantity - 1)}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-50 active:bg-gray-200 md:h-8 md:w-8 md:text-base"
        aria-label="Diminuir quantidade"
      >
        <Minus className="size-2.5 stroke-black/70 md:size-4" />
      </button>
      <span className="w-6 text-center text-xs sm:w-8 sm:text-sm md:w-10 md:text-lg">
        {quantity}
      </span>
      <button
        onClick={() => onIncrease(quantity >= 99 ? 99 : quantity + 1)}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-sm hover:bg-gray-50 active:bg-gray-200 md:h-8 md:w-8 md:text-base"
        aria-label="Aumentar quantidade"
      >
        <Plus className="size-2.5 stroke-black/70 md:size-4" />
      </button>
    </div>
  );
};

type CartItemSecondaryActionsProps = {
  handleAddToWishlist: () => void;
  handleRemoveFromCart?: () => void;
};

const CartItemSecondaryActions = ({
  handleAddToWishlist,
  handleRemoveFromCart,
}: CartItemSecondaryActionsProps) => {
  return (
    <div className="flex items-center gap-6.5 md:flex-row">
      <Button
        onClick={handleAddToWishlist}
        className="flex cursor-pointer items-center justify-center rounded-full bg-transparent p-1 transition-colors hover:bg-red-400 active:bg-gray-200 sm:h-6 sm:w-6 md:h-8 md:w-8"
        aria-label="Adicionar à lista de desejos"
      >
        <HeartIcon size={20} className="text-black/70" />
      </Button>
      <Button
        onClick={handleRemoveFromCart}
        className="flex cursor-pointer items-center justify-center rounded-full bg-transparent p-1 transition-colors hover:bg-red-200 active:bg-red-100 sm:h-6 sm:w-6 md:h-8 md:w-8"
        aria-label="Remover do carrinho"
      >
        <TrashIcon size={20} className="text-black/70" />
      </Button>
    </div>
  );
};
