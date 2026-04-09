import { Suspense } from "react";

import { ForYouSectionLoader } from "@/shared/components/store/ForYouSection/ForYouSectionLoader";
import { ForYouSectionSkeleton } from "@/shared/components/store/ForYouSection/ForYouSectionSkeleton";

export const ForYouSection = () => {
  return (
    <Suspense fallback={<ForYouSectionSkeleton />}>
      <ForYouSectionLoader />
    </Suspense>
  );
};
