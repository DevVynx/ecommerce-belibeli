import { ProductCardSkeleton } from "@/app/shared/components/store/Skeletons/ProductCardSkeleton";
import { Skeleton } from "@/app/shared/components/ui/skeleton";

/**
 * Componente Skeleton completo para a página do Carrinho.
 * Simula o layout (Header, CartList, CartSummary e RecommendedProducts) durante o carregamento.
 */
export const CartPageSkeleton = () => {
  return (
    <>
      <section className="font-inter bg-neutral-100 pb-40 lg:p-0">
        <div className="mx-auto">
          {/* Header Skeleton (simula o cabeçalho) */}
          <header className="p-3 lg:bg-white">
            <div className="flex justify-between lg:hidden">
              <Skeleton className="h-7 w-7 rounded-full md:h-10 md:w-10" />
              <Skeleton className="h-6 w-32 md:h-7 md:w-40" />
              <Skeleton className="h-7 w-7 rounded-full md:h-10 md:w-10" />
            </div>
            <div className="mx-auto hidden justify-between lg:container lg:flex">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-6 w-40" />
            </div>
          </header>

          {/* Layout Principal: CartList (esquerda) e CartSummary (direita) */}
          <div className="mx-auto mt-2 flex justify-center gap-3 p-3 lg:container lg:flex">
            {/* Cart Items Skeleton - Coluna da Esquerda */}
            {/* Simula CartList */}
            <div className="flex w-full flex-col items-center gap-3 lg:flex-1">
              {[1, 2, 3].map(
                (
                  item // Reduzi para 3 para um carregamento mais rápido, mas pode aumentar
                ) => (
                  // Simula CartItem
                  <div
                    key={item}
                    className="flex w-full gap-3 rounded-md bg-white p-4 lg:max-w-4xl"
                  >
                    {/* Imagem */}
                    <Skeleton className="h-24 w-24 shrink-0 rounded-md md:h-40 md:w-32" />

                    {/* Informações e Ações */}
                    <div className="flex flex-1 flex-col justify-between space-y-2">
                      <div className="space-y-2">
                        {/* Título */}
                        <Skeleton className="h-5 w-3/4" />
                        {/* Opções */}
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>

                      {/* Preço e Controles */}
                      <div className="flex items-end justify-between">
                        {/* Preço */}
                        <Skeleton className="h-6 w-20" />

                        {/* Controles de Quantidade */}
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-12" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>

                        {/* Ações Secundárias (Wishlist/Delete) */}
                        <div className="hidden gap-2 sm:flex">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Summary Skeleton - Coluna da Direita (Desktop) */}
            {/* Simula CartSummary */}
            <div className="hidden max-w-sm lg:block lg:w-96">
              <div className="sticky top-0 space-y-3">
                {/* Bloco de Resumo de Preços */}
                <div className="space-y-3 rounded-sm bg-white p-3">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-3 w-full" />
                  </div>

                  <div className="space-y-3 border-b pb-4">
                    {/* Preço de varejo */}
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    {/* Descontos */}
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>

                  {/* Botão Finalizar Compra */}
                  <Skeleton className="h-12 w-full rounded-sm" />
                </div>

                {/* Bloco de Pagamento */}
                <div className="space-y-3 rounded-sm bg-white p-3">
                  <Skeleton className="h-7 w-32" />
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-8 w-12" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Summary - Mobile */}
          <div className="fixed right-0 bottom-0 left-0 z-10 flex flex-col items-center gap-2 bg-white p-3 lg:hidden">
            <div className="w-full rounded-md bg-neutral-100 p-3">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </section>
      <section className="bg-white px-3 py-12">
        <div className="mx-auto lg:container">
          <section className="grid grid-cols-2 items-center justify-center gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(12)].map((_, index) => (
              <ProductCardSkeleton key={index} grid={true} />
            ))}
          </section>
        </div>
      </section>
    </>
  );
};
