"use client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/app/(view)/(auth)/types/Auth";
import { authService } from "@/app/shared/services/API/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: () => {
      router.push("/");
    },
  });
};

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError, RegisterRequest>({
    mutationFn: authService.register,
  });
};
