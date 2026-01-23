import { Rating } from "@mui/material";
import type { WishlistItemDto } from "@repo/types/contracts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { TrashIcon } from "@/app/shared/assets/animatedIcons/trash";
import { Button } from "@/app/shared/components/ui/button";
import { useRemoveItemFromWishlist } from "@/app/shared/hooks/data/useWishlistMutations";
import { useAnimatedIcon } from "@/app/shared/hooks/ui/useAnimatedIcon";
import { getPercentDiscount } from "@/app/shared/utils/store/product/getPercentDiscount";
import { isSaleActive } from "@/app/shared/utils/store/product/isSaleActive";

type WishlistProductCardProps = {
  product: WishlistItemDto["product"];
};

export const WishlistProductCard = ({ product: p }: WishlistProductCardProps) => {
  const { mutate } = useRemoveItemFromWishlist();
  const isProductOnSale = isSaleActive(p.promotionEnd);
  const percentDiscount = getPercentDiscount(p);
  const { iconRef, handleMouseEnter, handleMouseLeave } = useAnimatedIcon();

  useEffect(() => {
    const startTimer = setTimeout(() => {
      iconRef.current?.startAnimation();
      setTimeout(() => {
        iconRef.current?.stopAnimation();
      }, 1000);
    }, 200);
    return () => {
      clearTimeout(startTimer);
    };
  }, [iconRef]);

  return (
    <Link href={"/"}>
      <div className="flex h-full w-full max-w-sm cursor-pointer flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:scale-105">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={p.image}
            alt={p.title}
            width={400}
            height={400}
            className="aspect-square w-full object-contain"
          />

          {/* Percent */}
          {isProductOnSale && (
            <strong className="absolute top-2 right-2 my-1 inline-block rounded-4xl bg-red-500 px-2 py-1 text-sm font-bold text-white">
              - {percentDiscount}% off
            </strong>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900">{p.title}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Rating defaultValue={p.ratingRate} precision={0.1} size="small" readOnly={true} />
            <span className="text-sm text-zinc-400">({p.ratingCount} Avaliações)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1">
            <strong className="font-semibold">
              R$
              {isProductOnSale ? Number(p.promotionPrice)?.toFixed(2) : Number(p.price).toFixed(2)}
            </strong>
            {isProductOnSale && (
              <span className="text-sm text-red-500 line-through">
                R${Number(p.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                mutate({ productId: p.id });
              }}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              type="button"
              className="font-semi-bold mt-2 h-8 w-full rounded-xl border border-gray-500 bg-white px-4 py-2 text-sm text-black hover:bg-neutral-200"
            >
              Remover da lista
              <TrashIcon ref={iconRef} size={15} />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
