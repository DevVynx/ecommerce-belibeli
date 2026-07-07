import type {
  AdminDashboardStatsRequest,
  AdminDashboardStatsResponse,
} from "@repo/types/contracts";
import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export function useAdminDashboardStats(params: AdminDashboardStatsRequest) {
  return useQuery({
    queryKey: ["admin", "dashboard", "stats"],
    queryFn: async () => {
      const queryParams: Record<string, string | number> = {};

      if (params) {
        if (params.range) queryParams.range = params.range;
      }

      const { data, error } = await fetchClient<AdminDashboardStatsResponse>(
        `/admin/dashboard/stats`,
        {
          isPrivate: true,
          params,
        }
      );

      if (error) {
        throw new Error((error.message as string) || "Erro ao buscar Stats");
      }

      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
