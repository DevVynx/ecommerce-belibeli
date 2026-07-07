import type { AdminGetOrdersRequest, AdminListOrdersResponse } from "@repo/types/contracts";
import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export function useAdminOrders(params: AdminGetOrdersRequest) {
  return useQuery({
    queryKey: ["admin", "orders", params],
    queryFn: async () => {
      const queryParams: Record<string, string | number> = {};

      if (params) {
        if (params.limit) queryParams.limit = params.limit;
        if (params.page !== undefined) queryParams.page = params.page;
        if (params.sort !== undefined) queryParams.sort = params.sort;
      }

      const { data, error } = await fetchClient<AdminListOrdersResponse>(`/admin/orders`, {
        isPrivate: true,
        params: queryParams,
      });

      if (error) {
        throw new Error((error.message as string) || "Erro ao buscar pedidos");
      }

      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
