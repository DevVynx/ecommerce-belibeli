import { useQuery } from "@tanstack/react-query";

import { authService } from "@/shared/actions/auth/getUser";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authService.getUser,
    staleTime: 0,
    gcTime: 1000 * 60 * 60,
  });
};
