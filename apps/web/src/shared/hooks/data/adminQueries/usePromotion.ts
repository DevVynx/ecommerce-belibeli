import type {
  AdminSearchPromotionsRequest,
  AdminSearchPromotionsResponse,
} from "@repo/types/contracts";
import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export function useAdminSearchPromotions(params: AdminSearchPromotionsRequest) {
  return useQuery({
    queryKey: ["admin", "promotions", "search", params],
    queryFn: async () => {
      const queryParams: Record<string, string | number> = {};

      if (params.q) queryParams.q = params.q;
      if (params.isActive !== undefined) queryParams.isActive = params.isActive ? "true" : "false";
      if (params.type) queryParams.type = params.type;
      if (params.targetType) queryParams.targetType = params.targetType;
      if (params.sortBy) queryParams.sortBy = params.sortBy;
      if (params.page) queryParams.page = params.page;
      if (params.limit) queryParams.limit = params.limit;

      const { data, error } = await withAuthRefresh(() =>
        fetchClient<AdminSearchPromotionsResponse>("/admin/promotions/search", {
          isPrivate: true,
          params: queryParams,
        })
      );

      if (error) {
        throw new Error((error.message as string) || "Erro ao buscar promoções");
      }

      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
