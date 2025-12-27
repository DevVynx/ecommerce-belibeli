"use client";

import { useEffect } from "react";

import { useGetUser } from "@/app/shared/hooks/data/useAuthQueries";
import { useUserState } from "@/app/shared/states/useUser";

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
