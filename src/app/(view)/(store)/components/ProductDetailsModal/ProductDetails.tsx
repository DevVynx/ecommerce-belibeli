import { useProductDetailsContext } from "@/app/(view)/(store)/contexts/ProductDetailsContext";
import { getPercentDiscount } from "@/shared/utils/product/getPercentDiscount";
import { isSaleActive } from "@/shared/utils/product/isSaleActive";
import { Rating } from "@mui/material";
import { ProductOptions } from "./ProductOptions";
import { QuantitySelector } from "./QuantitySelector";
import { useState } from "react";
import { HeartIcon } from "@/assets/Icons";
import { useCreateCart } from "@/shared/hooks/data/useCartMutations";
import type { BackendOption, ProductOptionsArray } from "@/shared/types/product";

export type SelectedOptionsState = Record<string, number>;

const formatOptionsForBackend = (selectedOptions: SelectedOptionsState): BackendOption[] => {
  return Object.entries(selectedOptions).map(([optionIdStr, optionValueId]) => ({
    optionId: parseInt(optionIdStr, 10), // Converte a chave (string) de volta para número
    optionValueId: optionValueId,
  }));
};

const getInitialState = (options: ProductOptionsArray): SelectedOptionsState => {
  return options.reduce((acc, option) => {
    acc[option.id.toString()] = option.values[0]?.id || 0;
    return acc;
  }, {} as SelectedOptionsState);
};

export const ProductDetails = () => {
  const { selectedProduct, setIsProductDetailsModalOpen } = useProductDetailsContext();

  if (!selectedProduct) {
    return <p className="text-red-500">Falha ao carregar os detalhes do produto</p>;
  }

  const { mutate } = useCreateCart();
  const [count, setCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>(() =>
    getInitialState(selectedProduct.productOption),
  );

  const { id, image, title, ratingRate, ratingCount, price, promotionPrice, productOption } =
    selectedProduct;

  const handleSelectOption = (optionId: number, valueId: number) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionId.toString()]: valueId,
    }));
  };

  const handleAddToCart = () => {
    const productOptionsPayload = formatOptionsForBackend(selectedOptions);

    mutate({ productID: id, quantity: count, productOptions: productOptionsPayload });
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
    <div className="flex h-[500px] gap-10">
      {/* Imagem - lado esquerdo */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full items-center justify-center bg-black/10 p-4">
          <img src={image} alt={title} className="max-h-full w-full object-contain" />
        </div>
      </div>

      {/* Detalhes - lado direito */}
      <div className="flex h-full flex-1 flex-col">
        {/* ========== SEÇÃO SUPERIOR (altura automática) ========== */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold">{title}</h1>

          {/* Rating */}
          <div className="my-3 flex items-center gap-2">
            <Rating defaultValue={ratingRate} precision={0.1} size="small" readOnly={true} />
            <span className="text-sm text-zinc-400">{`(${ratingCount} Avaliações)`}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 border-b border-zinc-300 pb-3">
            <strong className="text-2xl font-semibold text-gray-800">
              R$ {isProductOnSale ? Number(promotionPrice).toFixed(2) : Number(price).toFixed(2)}
            </strong>
            {isProductOnSale && (
              <>
                <span className="rounded-sm bg-red-500 px-1.5 py-0.5 text-sm font-bold text-white">
                  {`-${percentDiscount}%`}
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
          {productOption.length > 0 && (
            <div className="mb-6">
              <ProductOptions
                key={id}
                productOptions={productOption}
                onSelectOption={handleSelectOption}
                selectedOptions={selectedOptions}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <QuantitySelector
            count={count}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        </div>

        {/* ========== SEÇÃO INFERIOR (altura automática) ========== */}
        <div className="flex-shrink-0 border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 cursor-pointer bg-black px-8 py-4 font-bold text-white uppercase transition-colors hover:bg-black/80"
            >
              Adicionar ao Carrinho
            </button>

            <button className="group cursor-pointer rounded-full border border-black/10 p-3 transition-transform hover:scale-105">
              <HeartIcon className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
