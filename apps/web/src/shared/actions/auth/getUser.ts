import { GetUserResponse } from "@repo/types/contracts";


export const getUser = async () => {
  const response = await API.get<GetUserResponse>("/auth/me");
  return response.data;
};
