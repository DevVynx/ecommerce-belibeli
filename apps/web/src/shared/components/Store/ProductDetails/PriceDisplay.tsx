"use client";
import { useProductVariantContext } from "@/shared/context/ProductVariantContext";
import { asDecimal, calculateDiscountPercent, formatPrice } from "@/shared/utils/store/price";

export const PriceDisplay = () => {
  const { displayPrice, displaySalePrice, displayIsOnSale } = useProductVariantContext();

  const savings = displayIsOnSale
    ? asDecimal(displayPrice).minus(asDecimal(displaySalePrice)).toNumber()
    : 0;
  const percentDiscount = displayIsOnSale
    ? calculateDiscountPercent(displayPrice, displaySalePrice)
    : 0;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{formatPrice(displaySalePrice)}</div>
        {displayIsOnSale && (
          <div>
            <span className="text-sm text-red-500 line-through">{formatPrice(displayPrice)}</span>
          </div>
        )}
      </div>
      {displayIsOnSale && (
        <p className="mt-1 text-sm font-semibold text-emerald-600">
          Você economiza {formatPrice(savings)} ({percentDiscount}% de desconto)
        </p>
      )}
    </div>
  );
};
