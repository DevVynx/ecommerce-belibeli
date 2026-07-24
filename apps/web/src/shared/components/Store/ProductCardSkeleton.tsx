import { Skeleton } from "@/shared/components/shadcn-ui/skeleton";

type ProductCardSkeletonProps = {
  grid?: boolean;
};

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ grid }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white ${
        grid ? "w-full" : "w-60 shrink-0"
      }`}
    >
      <div className="relative flex aspect-square w-full items-center justify-center p-4">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-white"></div>
      </div>

      <div className="space-y-2 p-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
