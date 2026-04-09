import { LoginRequest, RegisterRequest } from "@repo/types/contracts";

export type GetUserByIdParams = {
  userId: string;
};

export type LoginParams = LoginRequest;

export type LogoutParams = {
  userId: string;
};

export type RegisterParams = Omit<RegisterRequest, "confirmPassword">;

export type RefreshAccessTokenParams = {
  refreshToken: string;
};

export type GoogleAuthParams = {
  code: string;
};
