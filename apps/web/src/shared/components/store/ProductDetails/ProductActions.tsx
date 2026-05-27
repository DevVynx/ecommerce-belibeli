import { motion, useAnimation } from "framer-motion";
import { Heart, Minus, Plus } from "lucide-react";

import { Button } from "@/shared/components/shadcn-ui/button";

type ProductActionsProps = {
  selectedVariant: { stock: number; isAvailable: boolean } | null;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
  isOutOfStock: boolean;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  showError: boolean;
  controls: ReturnType<typeof useAnimation>;
  stockFeedback: string | null;
};

export const ProductActions = ({
  selectedVariant,
  quantity,
  onQuantityChange,
  onAddToCart,
  isAddingToCart,
  isOutOfStock,
  isWishlisted,
  onToggleWishlist,
  showError,
  controls,
  stockFeedback,
}: ProductActionsProps) => {
  return (
    <div className="space-y-3">
      {showError && (
        <motion.p animate={controls} className="text-destructive text-sm">
          Por favor, selecione todas as opções antes de adicionar ao carrinho.
        </motion.p>
      )}

      {selectedVariant && (
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm font-medium">Quantidade:</span>
          <div className="border-border flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isAddingToCart}
              className="text-muted-foreground size-8"
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </Button>
            <span className="border-border text-foreground flex min-w-10 items-center justify-center border-x px-2 py-1 text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= (selectedVariant?.stock ?? 99) || isAddingToCart}
              className="text-muted-foreground size-8"
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button
          onClick={onAddToCart}
          disabled={isAddingToCart || !selectedVariant || isOutOfStock}
          className="flex-1 rounded-lg py-4 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-lg shadow-black/10"
        >
          {isAddingToCart
            ? "Adicionando..."
            : isOutOfStock
              ? "Indisponível"
              : "Adicionar ao Carrinho"}
        </Button>

        <Button
          variant="outline"
          onClick={onToggleWishlist}
          className="rounded-lg px-8 py-4"
          aria-label={isWishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart className={`size-5 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
        </Button>
      </div>

      {stockFeedback && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm"
        >
          {stockFeedback}
        </motion.p>
      )}
    </div>
  );
};
