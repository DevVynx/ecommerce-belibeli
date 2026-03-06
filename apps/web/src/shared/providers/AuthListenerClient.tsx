"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function AuthListenerClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const interceptor = API.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401 && !pathname.startsWith("/")) {
          const search = searchParams?.toString ? `?${searchParams.toString()}` : "";
          const redirect = encodeURIComponent(pathname + (search === "?" ? "" : search));
          router.push(`/login?redirect=${redirect}`);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      API.interceptors.response.eject(interceptor);
    };
  }, [router, pathname, searchParams]);

  return <>{children}</>;
}
