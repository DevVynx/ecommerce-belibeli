"use client";
import { Rating } from "@mui/material";
import { addItemToCartRequest } from "@repo/types/contracts";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

import { useProductDetailsContext } from "@/app/shared/contexts/ProductDetailsContext";
import { useAddItemToCart } from "@/app/shared/hooks/data/useCartMutations";
import { getPercentDiscount } from "@/app/shared/utils/product/getPercentDiscount";
import { isSaleActive } from "@/app/shared/utils/product/isSaleActive";

import { ProductOptions } from "./ProductOptions";
import { QuantitySelector } from "./QuantitySelector";

export type SelectedOptionsState = Record<string, string>;

export const ProductDetails = () => {
  const { selectedProduct, setIsProductDetailsModalOpen } = useProductDetailsContext();
  const { mutate } = useAddItemToCart();

  const [count, setCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>({});
  const [showError, setShowError] = useState(false);

  if (!selectedProduct) {
    return <p className="text-red-500">Falha ao carregar os detalhes do produto</p>;
  }

  const { id, image, title, ratingRate, ratingCount, price, promotionPrice, productOptions } =
    selectedProduct;

  const areAllOptionsSelected = (): boolean => {
    if (productOptions.length === 0) return true;

    return productOptions.every((option) => {
      const selectedValue = selectedOptions[option.id];
      return selectedValue !== undefined && selectedValue !== "";
    });
  };

  console.log(areAllOptionsSelected());

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
      return;
    }

    const payload = buildPayload();
    mutate(payload);
    setIsProductDetailsModalOpen(false);
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
        <div className="min-h-0 flex-1 overflow-y-auto py-2 pr-2">
          {/* Product Options */}
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
              disabled={!areAllOptionsSelected()}
              className={`flex-1 px-8 py-4 font-bold text-white uppercase transition-colors ${
                areAllOptionsSelected()
                  ? "cursor-pointer bg-black hover:bg-black/80"
                  : "cursor-not-allowed bg-black/40"
              } `}
            >
              Adicionar ao Carrinho
            </button>

            <button className="group cursor-pointer rounded-full border border-black/10 p-3 transition-transform hover:scale-105">
              <HeartIcon className="h-10 w-10 text-black/80 group-hover:fill-red-500 group-hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
