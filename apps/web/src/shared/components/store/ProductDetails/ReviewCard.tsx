import type { ReviewDto } from "@repo/types/contracts";
import { Star } from "lucide-react";

import { Rating, RatingItem } from "@/shared/components/shadcn-ui/rating";

export const ReviewCard = ({ review }: { review: ReviewDto }) => {
  return (
    <div className="border-border rounded-lg border p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold tracking-tight uppercase">{review.author}</p>
          <p className="text-muted-foreground font-mono text-[10px]">{review.location}</p>
        </div>
        <Rating value={review.rating} readOnly className="gap-0 text-yellow-400">
          {Array.from({ length: 5 }, (_, i) => (
            <RatingItem key={i}>
              <Star className="size-4" />
            </RatingItem>
          ))}
        </Rating>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
};
