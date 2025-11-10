import axios, { type AxiosError } from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { status, config } = error;

    if (!config?.url) return Promise.reject(error);

    const criticalProtectedEndpoints = ["/profile"];
    const isCriticalEndpoint = criticalProtectedEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint),
    );

    if (status === 401 && isCriticalEndpoint) {
      const currentPath = window.location.pathname;
      const isLoginPage = currentPath.startsWith("/login");
      if (!isLoginPage) {
        const redirect = encodeURIComponent(currentPath + window.location.search);
        window.location.href = `/login?redirect=${redirect}`;
      }
    }

    return Promise.reject(error);
  },
);

export default API;
