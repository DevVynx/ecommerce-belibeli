import { Skeleton } from "@/app/shared/components/ui/skeleton";

export const HeaderSkeleton = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-neutral-100 p-2">
      <div className="mx-auto lg:container">
        <nav className="flex gap-3 lg:gap-6">
          {/* Logo */}
          <Skeleton className="h-8 w-10 rounded-md bg-neutral-200 lg:h-10 lg:w-40" />

          {/* Search Bar */}
          <div className="flex flex-1 items-center gap-3 lg:gap-6">
            <Skeleton className="h-10 flex-1 rounded-full bg-neutral-200" />

            {/* Icons */}
            <div className="flex items-center gap-2 lg:gap-4">
              <Skeleton className="h-7 w-7 rounded-full bg-neutral-200" />
              <Skeleton className="h-7 w-7 rounded-full bg-neutral-200" />
              <Skeleton className="h-7 w-7 rounded-full bg-neutral-200 lg:hidden" />
              <Skeleton className="hidden h-7 w-7 rounded-full bg-neutral-200 lg:block" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
