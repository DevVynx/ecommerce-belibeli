import { Star } from "lucide-react";

import { Button } from "@/shared/components/shadcn-ui/button";

type Review = {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
};

type ReviewsSectionProps = {
  ratingRate: number;
  ratingCount: number;
  reviews: Review[];
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="border-border rounded-lg border p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold tracking-tight uppercase">{review.author}</p>
          <p className="text-muted-foreground font-mono text-[10px]">{review.location}</p>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${
                i < review.rating ? "fill-yellow-400 stroke-yellow-400" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
};

export const ReviewsSection = ({ ratingRate, ratingCount, reviews }: ReviewsSectionProps) => {
  const fullStars = Math.floor(ratingRate);
  const hasHalfStar = ratingRate - fullStars >= 0.5;

  return (
    <section className="mb-32">
      <div className="border-border mb-10 flex flex-col gap-4 border-b pb-8">
        <h2 className="text-3xl font-black tracking-tighter">Avaliações</h2>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono text-5xl font-black tracking-tighter">
              {ratingRate.toFixed(1)}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => {
                  const isFilled = i < fullStars;
                  const isHalf = !isFilled && hasHalfStar && i === fullStars;
                  return (
                    <Star
                      key={i}
                      className={`size-4 ${
                        isFilled
                          ? "fill-yellow-400 stroke-yellow-400"
                          : isHalf
                            ? "fill-yellow-400/50 stroke-yellow-400"
                            : "text-muted-foreground"
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-muted-foreground font-mono text-xs">
                {ratingCount} avaliações
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="outline"
          className="rounded-lg px-6 py-3 font-mono text-sm font-bold tracking-widest uppercase"
        >
          Ver todas as avaliações
        </Button>
      </div>
    </section>
  );
};
