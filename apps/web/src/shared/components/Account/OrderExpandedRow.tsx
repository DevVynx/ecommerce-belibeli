import type { OrderDetailDto } from "@repo/types/contracts";
import { MapPin, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getOrderById } from "@/shared/actions/orders/getOrderById";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/shadcn-ui/tooltip";
import { authenticatedAction } from "@/shared/utils/api/authenticatedAction";

import { ReviewModal } from "./ReviewModal";

type OrderExpandedRowProps = {
  orderId: string;
  isExpanded: boolean;
};

export const OrderExpandedRow = ({ orderId, isExpanded }: OrderExpandedRowProps) => {
  const [orderDetail, setOrderDetail] = useState<OrderDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviewItem, setReviewItem] = useState<OrderDetailDto["items"][number] | null>(null);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    const { data, error: fetchError } = await authenticatedAction(getOrderById, orderId);

    setIsLoading(false);

    if (fetchError || !data) {
      setError(true);
      return;
    }

    setOrderDetail(data.order);
  }, [orderId]);

  useEffect(() => {
    if (isExpanded && !orderDetail && !isLoading && !error) {
      fetchDetail();
    }
  }, [isExpanded, orderDetail, isLoading, error, fetchDetail]);

  const handleReviewCreated = useCallback(() => {
    setOrderDetail(null);
    fetchDetail();
  }, [fetchDetail]);

  if (!isExpanded) return null;

  return (
    <tr className="bg-muted/20 border-b">
      <td colSpan={5} className="pt-2 pb-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : error ? (
          <p className="text-muted-foreground text-sm">
            Não foi possível carregar os detalhes do pedido.
          </p>
        ) : orderDetail ? (
          <div className="space-y-4 px-2">
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 flex-1 items-start gap-1">
                <MapPin className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {orderDetail.shippingAddress
                    ? `${orderDetail.shippingAddress.street}, ${orderDetail.shippingAddress.number} - ${orderDetail.shippingAddress.neighborhood}, ${orderDetail.shippingAddress.city}/${orderDetail.shippingAddress.state}`
                    : "Endereço não disponível"}
                </span>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3 text-sm">
                <span className="text-muted-foreground whitespace-nowrap">
                  Subtotal:{" "}
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                      orderDetail.subtotal
                    )}
                  </span>
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground whitespace-nowrap">
                  Frete:{" "}
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                      orderDetail.shipping
                    )}
                  </span>
                </span>
                {orderDetail.discount > 0 && (
                  <>
                    <span className="text-muted-foreground">|</span>
                    <span className="whitespace-nowrap text-emerald-600">
                      Desconto: -
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(orderDetail.discount)}
                    </span>
                  </>
                )}
                <span className="text-muted-foreground">|</span>
                <span className="font-semibold whitespace-nowrap">
                  Total:{" "}
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                    orderDetail.total
                  )}
                </span>
              </div>
            </div>

            <div className="divide-y rounded-lg border">
              {orderDetail.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3">
                  <div className="bg-muted flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.productName}</p>
                    <p className="text-muted-foreground text-xs">{item.variantLabel}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Qtd: {item.quantity} x{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.unitPrice)}
                    </p>
                  </div>

                  <div className="text-right text-sm font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.totalPrice)}
                  </div>

                  <div className="shrink-0">
                    {(() => {
                      const cannotReview = ["CANCELED", "REFUNDED"].includes(orderDetail.status);

                      if (cannotReview) return null;

                      if (item.hasReviewed && item.userReview) {
                        return (
                          <Tooltip delayDuration={500}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 text-yellow-500 hover:text-yellow-500"
                                onClick={() => setReviewItem(item)}
                              >
                                <Star className="size-4 fill-yellow-500" />
                                <span className="text-xs">{item.userReview.rating}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="w-64 p-3">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex text-yellow-500">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <Star
                                        key={i}
                                        className={`size-3.5 ${i < item.userReview!.rating ? "fill-yellow-500" : "fill-none text-yellow-500/30"}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-muted-foreground text-xs">
                                    {new Date(item.userReview.createdAt).toLocaleDateString(
                                      "pt-BR"
                                    )}
                                  </span>
                                </div>
                                <p className="text-foreground/80 text-xs leading-relaxed">
                                  {item.userReview.comment.length > 90
                                    ? item.userReview.comment.slice(0, 90) + "…"
                                    : item.userReview.comment}
                                </p>
                                <p className="text-muted-foreground/60 flex items-center gap-1 pt-0.5 text-[10px] font-medium tracking-wider uppercase">
                                  Ver avaliação completa
                                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                                    →
                                  </span>
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        );
                      }

                      if (orderDetail.status === "DELIVERED") {
                        return (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="group gap-1"
                                onClick={() => setReviewItem(item)}
                              >
                                <Star className="size-4" />
                                <span className="text-xs">Avaliar</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p className="flex items-center gap-1">
                                Clique para avaliar este produto
                                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                                  →
                                </span>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      }

                      return (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled
                                className="pointer-events-none gap-1 opacity-50"
                              >
                                <Star className="size-4" />
                                <span className="text-xs">Avaliar</span>
                              </Button>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p className="flex items-center gap-1 text-xs">
                              Aguarde o produto ser entregue para avaliar
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>

            {reviewItem && orderDetail && (
              <ReviewModal
                item={reviewItem}
                open={!!reviewItem}
                onClose={() => setReviewItem(null)}
                onReviewChanged={handleReviewCreated}
              />
            )}
          </div>
        ) : null}
      </td>
    </tr>
  );
};
