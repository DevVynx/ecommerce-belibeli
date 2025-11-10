import type {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "@/app/(view)/(auth)/types/Auth";
import API from "./API";

async function login(userData: LoginRequest) {
  const response = await API.post("/login", userData);
  return response.data;
}

async function register(userData: RegisterRequest) {
  const response = await API.post<RegisterResponse>("/register", userData);
  return response.data;
}

export const authService = { login, register };
