"use client";

import { useEffect } from "react";

import { useGetUser } from "@/shared/hooks/data/useAuthQueries";

export function UserInitializer({ children }: { children: React.ReactNode }) {
  const { data, isError } = useGetUser();
  const setUser = useUserState((s) => s.setUser);
  const clearUser = useUserState((s) => s.clearUser);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }

    if (isError) {
      clearUser();
    }
  }, [data, isError, setUser, clearUser]);

  return <>{children}</>;
}
