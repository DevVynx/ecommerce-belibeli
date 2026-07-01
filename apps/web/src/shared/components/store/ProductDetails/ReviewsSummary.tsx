import { Star } from "lucide-react";

import { Progress } from "@/shared/components/Progress";
import { Rating, RatingItem } from "@/shared/components/shadcn-ui/rating";

type ReviewSummaryProps = {
  ratingRate: number;
  distribution: Record<number, number>;
  total: number;
};

export const ReviewsSummary = ({ ratingRate, distribution, total }: ReviewSummaryProps) => {
  return (
    <div className="w-full rounded-lg border">
      <div className="flex w-full justify-between border-b p-3">
        <div className="flex items-center gap-2 text-yellow-400">
          <Rating value={ratingRate} step={0.5} readOnly className="gap-2 text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <RatingItem key={i}>
                <Star className="size-6" />
              </RatingItem>
            ))}
          </Rating>
        </div>
        <h2 className="text-primary pr-1 text-2xl font-bold tracking-wide">{ratingRate}</h2>
      </div>
      <div className="space-y-3 p-3">
        {Array.from({ length: 5 }, (_, i) => {
          const star = 5 - i;
          const count = distribution[star] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground w-3 pl-1 font-semibold">{star}</span>
              <Progress value={pct} indicatorProps={{ className: "bg-yellow-400" }} />
              <span className="w-10 pr-1 text-right font-semibold tabular-nums">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
