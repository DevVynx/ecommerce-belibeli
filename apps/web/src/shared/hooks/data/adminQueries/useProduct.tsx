import type {
  AdminCountLowStockVariantsResponse,
} from "@repo/types/contracts";
import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export function useAdminLowStockProducts() {
  return useQuery({
    queryKey: ["admin", "dashboard", "products"],
    queryFn: async () => {
      const { data, error } = await fetchClient<AdminCountLowStockVariantsResponse>(
        `/admin/products/lowStock`,
        {
          isPrivate: true,
        }
      );

      if (error) {
        throw new Error((error.message as string) || "Erro ao contar estoque");
      }

      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
