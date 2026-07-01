import type { ReviewDto } from "@repo/types/contracts";
import { Star } from "lucide-react";

import { Rating, RatingItem } from "@/shared/components/shadcn-ui/rating";

export const ReviewCard = ({ review }: { review: ReviewDto }) => {
  return (
    <div className="border-border rounded-lg border p-5">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
          {review.author.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold tracking-tight uppercase">{review.author}</p>
            <Rating value={review.rating} readOnly className="gap-0 text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <RatingItem key={i}>
                  <Star className="size-4" />
                </RatingItem>
              ))}
            </Rating>
          </div>
          {review.createdAt && (
            <p className="text-muted-foreground text-xs">
              {new Date(review.createdAt).toLocaleDateString("pt-BR")}
            </p>
          )}
          {review.variantLabel && (
            <p className="text-muted-foreground text-xs">{review.variantLabel}</p>
          )}
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};
