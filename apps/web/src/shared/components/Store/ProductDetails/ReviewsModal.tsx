import type { ReviewDto } from "@repo/types/contracts";
import { useEffect } from "react";

import { getReviews } from "@/shared/actions/reviews/getReviews";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcn-ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import { ReviewCard } from "@/shared/components/Store/ProductDetails/ReviewCard";
import {
  type PaginatePayload,
  useInfScrollPagination,
} from "@/shared/hooks/data/useInfScrollPagination";

type ReviewsModalProps = {
  productId: string;
  ratingFilter: number | undefined;
  sort: "newest" | "relevant";
  onRatingChange: (value: string) => void;
  onSortChange: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const ReviewsModal = ({
  productId,
  ratingFilter,
  sort,
  onRatingChange,
  onSortChange,
  isOpen,
  onClose,
}: ReviewsModalProps) => {
  const filterKey = `${productId}-${ratingFilter ?? "all"}-${sort}`;

  const loadReviews = async (offset: number, limit: number): PaginatePayload<ReviewDto> => {
    const { data, error } = await getReviews({
      productId,
      offset,
      limit,
      rating: ratingFilter,
      sort,
    });
    if (!data || error) return { items: [], hasMore: false };
    return { items: data.reviews, hasMore: data.pagination.hasMore, total: data.pagination.total };
  };

  const {
    items: reviews,
    isLoading,
    hasMore,
    total,
    sentinelRef,
    rootRef,
    loadMore,
  } = useInfScrollPagination<ReviewDto>({
    action: loadReviews,
    limit: 10,
    resetKey: filterKey,
  });

  useEffect(() => {
    if (isOpen) loadMore();
  }, [isOpen, filterKey, loadMore]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={rootRef}
        className="flex h-[90vh] max-w-7xl flex-col gap-6 overflow-y-auto rounded-lg lg:gap-4"
      >
        <DialogHeader className="mr-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DialogTitle className="text-xl">Todas as Avaliações ({total})</DialogTitle>
            <div className="flex items-center justify-center gap-4">
              <Select
                value={ratingFilter ? String(ratingFilter) : "todas"}
                onValueChange={onRatingChange}
              >
                <SelectTrigger className="h-8 w-35 py-5">
                  <SelectValue placeholder="Filtrar por nota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todas">Todas as notas</SelectItem>
                    <SelectItem value="5">5 estrelas</SelectItem>
                    <SelectItem value="4">4 estrelas</SelectItem>
                    <SelectItem value="3">3 estrelas</SelectItem>
                    <SelectItem value="2">2 estrelas</SelectItem>
                    <SelectItem value="1">1 estrela</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={onSortChange}>
                <SelectTrigger className="h-8 w-37 py-5">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="relevant">Mais relevantes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {isLoading && (
          <p className="text-muted-foreground py-4 text-center text-sm">Carregando...</p>
        )}

        {hasMore && <div ref={sentinelRef} />}
      </DialogContent>
    </Dialog>
  );
};
