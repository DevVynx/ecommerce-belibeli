import type { AdminDaySummaryResponse } from "@repo/types/contracts";
import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export function useAdminDashboardDaySummary() {
  return useQuery({
    queryKey: ["admin", "dashboard", "day-summary"],
    queryFn: async () => {
      const { data, error } = await withAuthRefresh(() =>
        fetchClient<AdminDaySummaryResponse>("/admin/dashboard/day-summary", {
          isPrivate: true,
        })
      );

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    staleTime: 60_000,
  });
}
