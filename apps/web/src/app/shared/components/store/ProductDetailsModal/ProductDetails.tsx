"use client";
import { Rating } from "@mui/material";
import { addItemToCartRequest, type ProductDto } from "@repo/types/contracts";
import { motion, useAnimation } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

import { useAddItemToCart } from "@/app/shared/hooks/data/useCartMutations";
import {
  useAddItemToWishlist,
  useRemoveItemFromWishlist,
} from "@/app/shared/hooks/data/useWishlistMutations";
import { useWishlistStore } from "@/app/shared/states/useWishlist";
import { getPercentDiscount } from "@/app/shared/utils/product/getPercentDiscount";
import { isSaleActive } from "@/app/shared/utils/product/isSaleActive";

import { ProductOptions } from "./ProductOptions";
import { QuantitySelector } from "./QuantitySelector";

export type SelectedOptionsState = Record<string, string>;

type ProductDetailsProps = {
  setIsProductDetailsModalOpenAction: (open: boolean) => void;
  selectedProduct: ProductDto;
};

export const ProductDetails = ({
  selectedProduct,
  setIsProductDetailsModalOpenAction,
}: ProductDetailsProps) => {
  const { mutate: addToCart } = useAddItemToCart();
  const { mutate: addToWishlist } = useAddItemToWishlist();
  const { mutate: removeFromWishlist } = useRemoveItemFromWishlist();

  const { id, image, title, ratingRate, ratingCount, price, promotionPrice, productOptions } =
    selectedProduct;

  const [count, setCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>({});
  const [showError, setShowError] = useState(false);
  const isWishlisted = useWishlistStore((state) => !!state.map[id]);
  const add = useWishlistStore((s) => s.add);
  const remove = useWishlistStore((s) => s.remove);
  const controls = useAnimation();

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      remove(id);
      removeFromWishlist({ productId: id });
    } else {
      add(id);
      addToWishlist({ productId: id });
    }
  };

  const areAllOptionsSelected = (): boolean => {
    if (productOptions.length === 0) return true;

    return productOptions.every((option) => {
      const selectedValue = selectedOptions[option.id];
      return selectedValue !== undefined && selectedValue !== "";
    });
  };

  const buildPayload = (): addItemToCartRequest => {
    return {
      productId: id,
      productOptions: Object.entries(selectedOptions).map(([optionId, optionValueId]) => ({
        optionId,
        optionValueId,
      })),
      quantity: count,
    };
  };

  const handleSelectOption = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: valueId,
    }));

    if (showError) {
      setShowError(false);
    }
  };

  const handleAddToCart = () => {
    if (!areAllOptionsSelected()) {
      setShowError(true);

      controls.start({
        x: [0, -8, 8, -8, 8, -8, 8, -6, 6, 0],
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      });

      return;
    }

    const payload = buildPayload();
    addToCart(payload);
    setIsProductDetailsModalOpenAction(false);
  };

  const handleIncrement = () => setCount(count + 1);

  const handleDecrement = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  const isProductOnSale = isSaleActive(selectedProduct.promotionEnd);
  const percentDiscount = getPercentDiscount(selectedProduct);

  return (
    <div className="flex h-125 gap-10">
      {/* Imagem - lado esquerdo */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full items-center justify-center bg-black/10 p-4">
          <img src={image} alt={title} className="max-h-full w-full object-contain" />
        </div>
      </div>

      {/* Detalhes - lado direito */}
      <div className="flex h-full flex-1 flex-col">
        {/* ========== SEÇÃO SUPERIOR ========== */}
        <div className="shrink-0">
          <h1 className="text-2xl font-bold">{title}</h1>

          {/* Rating */}
          <div className="my-3 flex items-center gap-2">
            <Rating defaultValue={ratingRate} precision={0.1} size="small" readOnly={true} />
            <span className="text-sm text-zinc-400">({ratingCount} Avaliações)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 border-b border-zinc-300 pb-3">
            <strong className="text-2xl font-semibold text-gray-800">
              R$ {isProductOnSale ? Number(promotionPrice).toFixed(2) : Number(price).toFixed(2)}
            </strong>
            {isProductOnSale && (
              <>
                <span className="rounded-sm bg-red-500 px-1.5 py-0.5 text-sm font-bold text-white">
                  -{percentDiscount}%
                </span>
                <span className="text-sm text-red-500 line-through">
                  R$ {Number(price).toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* ========== SEÇÃO DO MEIO (scroll) ========== */}
        <div className="min-h-0 flex-1 overflow-y-auto py-2 pr-2 pl-2">
          {/* Product Options */}
          <motion.div animate={controls}>
            {productOptions.length > 0 && (
              <div className="mb-6">
                <ProductOptions
                  key={id}
                  productOptions={productOptions}
                  onSelectOption={handleSelectOption}
                  selectedOptions={selectedOptions}
                />

                {/* Mensagem de erro */}
                {showError && (
                  <p className="mt-2 text-sm text-red-500">
                    Por favor, selecione todas as opções antes de adicionar ao carrinho.
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Quantity Selector */}
          <QuantitySelector
            count={count}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        </div>

        {/* ========== SEÇÃO INFERIOR ========== */}
        <div className="shrink-0 border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 cursor-pointer bg-black px-8 py-4 font-bold text-white uppercase transition-colors hover:bg-black/80"
            >
              Adicionar ao Carrinho
            </button>

            <button
              onClick={handleToggleWishlist}
              className="group cursor-pointer rounded-full border border-black/10 p-3 transition-transform hover:scale-110 active:scale-130"
            >
              <HeartIcon
                className={`size-9 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "fill-gray-400 text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
