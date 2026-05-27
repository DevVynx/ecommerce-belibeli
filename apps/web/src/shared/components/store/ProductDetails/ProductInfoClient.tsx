"use client";
import type { GetProductDetailsResponse } from "@repo/types/contracts";
import { useAnimation } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { addToWishlist } from "@/shared/actions/wishlist/addToWishlist";
import { removeFromWishlist } from "@/shared/actions/wishlist/removeFromWishlist";
import { showNotification } from "@/shared/components/showNotification";
import { ProductDetailsCollapsible } from "@/shared/components/Store/ProductDetails/ProductDetailsCollapsible";
import { useCartMutations } from "@/shared/hooks/data/useCartMutations";
import { useProductVariantSelection } from "@/shared/hooks/data/useProductVariantSelection";
import { useWishlistState } from "@/shared/states/wishlist";
import { authenticatedAction } from "@/shared/utils/api/authenticatedAction";
import { calculateDiscountPercent, formatPrice } from "@/shared/utils/store/price";

import { ProductActions } from "./ProductActions";
import { ProductGallery } from "./ProductGallery";
import { ProductTrustBar } from "./ProductTrustBar";
import { VariantSelector } from "./VariantSelector";

type ProductInfoClientProps = {
  data: GetProductDetailsResponse;
};

export const ProductInfoClient = ({ data }: ProductInfoClientProps) => {
  const { product, variants, options } = data;

  const { addItemToCart, isLoading: isAddingToCart } = useCartMutations();
  const displayVariantStock = variants.find((v) => v.id === product.display.variantId)?.stock ?? 0;
  const { selectedOptions, setSelectedOptions, selectedVariant } = useProductVariantSelection(
    variants,
    options,
    {
      variantId: product.display.variantId,
      price: product.display.price,
      salePrice: product.display.salePrice,
      stock: displayVariantStock,
      isOnSale: product.display.isOnSale,
      isAvailable: product.display.isAvailable,
    }
  );
  const {
    addItem: optimisticAddToWishlist,
    remove: optimisticRemoveFromWishlist,
    rollback: optimisticRollbackWishlist,
    hasHydrated: hasHydratedWishlist,
    ids: wishlistIds,
  } = useWishlistState();
  const controls = useAnimation();

  const [showError, setShowError] = useState(false);
  const [stockFeedback, setStockFeedback] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = !!selectedVariant && !selectedVariant.isAvailable;
  const isWishlisted = hasHydratedWishlist && wishlistIds.includes(product.id);
  const currentSku = selectedVariant?.sku ?? variants[0]?.sku ?? "";
  const currentStock = selectedVariant?.stock ?? displayVariantStock;
  const isLowStock = currentStock > 0 && currentStock < 5;

  useEffect(() => {
    setQuantity(1);
    setShowError(false);
    setStockFeedback(null);
  }, [product.id, selectedOptions, variants, options]);

  const displayPrice = selectedVariant?.price ?? product.display.price;
  const displaySalePrice = selectedVariant?.salePrice ?? product.display.salePrice;
  const displayIsOnSale = selectedVariant?.isOnSale ?? product.display.isOnSale;
  const installmentValue = displaySalePrice / 3;
  const percentDiscount = displayIsOnSale
    ? calculateDiscountPercent(displayPrice, displaySalePrice)
    : 0;

  const buildSelectedOptionsForCart = (): Array<{ name: string; value: string }> => {
    return Object.entries(selectedOptions).map(([optionId, valueId]) => {
      const option = options.find((opt) => opt.id === optionId);
      const value = option?.values.find((val) => val.id === valueId);
      return {
        name: option?.name ?? "Unknown",
        value: value?.value ?? "Unknown",
      };
    });
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;

    if (!selectedVariant) {
      setShowError(true);
      controls.start({
        x: [0, -8, 8, -8, 8, -8, 8, -6, 6, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      return;
    }

    const result = await addItemToCart({
      productVariantId: selectedVariant.id,
      quantity,
      stock: selectedVariant.stock,
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      variantId: selectedVariant.id,
      image: product.display.image,
      price: selectedVariant.price,
      salePrice: selectedVariant.salePrice,
      isOnSale: displayIsOnSale,
      isAvailable: selectedVariant.isAvailable,
      selectedOptions: buildSelectedOptionsForCart(),
    });

    if (result?.error) {
      const message =
        typeof result.error.message === "string"
          ? result.error.message
          : "Erro ao adicionar ao carrinho.";
      setStockFeedback(message);
      return;
    }

    showNotification({
      type: "success",
      title: "Adicionado ao carrinho",
      message: "O seu item foi adicionado ao carrinho.",
    });
  };

  const handleToggleWishlist = async () => {
    if (isWishlisted) {
      optimisticRemoveFromWishlist(product.id);
      const { error } = await authenticatedAction(removeFromWishlist, {
        productId: product.id,
      });
      if (error) optimisticRollbackWishlist();
    } else {
      const wishlistItem = {
        id: product.id,
        product: {
          id: product.id,
          slug: product.slug,
          title: product.title,
          ratingRate: product.ratingRate,
          ratingCount: product.ratingCount,
          display: { ...product.display },
        },
      };

      optimisticAddToWishlist(wishlistItem);
      const { error } = await authenticatedAction(addToWishlist, {
        productId: product.id,
      });
      if (error) optimisticRollbackWishlist();
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > (selectedVariant?.stock ?? 99)) return;
    setQuantity(newQuantity);
  };

  const handleSelectOption = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
    if (showError) setShowError(false);
  };

  return (
    <>
      <section className="mb-10 flex flex-col justify-center gap-8 lg:flex-row lg:gap-12">
        <div className="w-full lg:max-w-2xl">
          <ProductGallery
            images={[
              product.display.image,
              product.display.image,
              product.display.image,
              product.display.image,
            ]}
            title={product.title}
          />
        </div>

        <div className="flex w-full flex-col justify-between lg:max-w-lg">
          <div>
            <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
              SKU: {currentSku}
            </span>

            <h1 className="mt-2 mb-2 text-2xl leading-tight font-black tracking-tighter lg:text-3xl">
              {product.title}
            </h1>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < Math.floor(product.ratingRate)
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground font-mono text-xs">
                {product.ratingRate.toFixed(1)} ({product.ratingCount} avaliações)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-mono text-2xl tracking-tighter">
                {formatPrice(displaySalePrice)}
              </div>
              {displayIsOnSale && (
                <div>
                  <span className="font-mono text-sm text-red-500 line-through">
                    {formatPrice(displayPrice)}
                  </span>
                  <span className="ml-2 rounded-md bg-red-500 p-1 font-mono text-xs font-bold text-white">
                    -{percentDiscount}%
                  </span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground mt-1 mb-4 font-mono text-sm">
              ou 3x de{" "}
              <span className="text-primary font-semibold tracking-tighter">
                {formatPrice(installmentValue)}
              </span>{" "}
              sem juros
            </p>
          </div>

          <div>
            {options.length > 0 && (
              <VariantSelector
                options={options}
                selectedOptions={selectedOptions}
                onSelectOption={handleSelectOption}
              />
            )}

            {isLowStock && (
              <p className="mb-4 font-mono text-xs tracking-widest text-amber-600 uppercase">
                Apenas {currentStock} {currentStock === 1 ? "unidade" : "unidades"} restante
                {currentStock === 1 ? "" : "s"}
              </p>
            )}

            <ProductActions
              selectedVariant={selectedVariant}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
              isOutOfStock={isOutOfStock}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleToggleWishlist}
              showError={showError}
              controls={controls}
              stockFeedback={stockFeedback}
            />

            <ProductTrustBar />
          </div>
        </div>
      </section>

      <ProductDetailsCollapsible description={data.product.description} />
    </>
  );
};
