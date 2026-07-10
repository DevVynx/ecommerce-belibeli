"use client";

import type { QueryKey } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useInvalidate() {
  const qc = useQueryClient();

  return (...keys: QueryKey[]) => {
    keys.forEach((key) => qc.invalidateQueries({ queryKey: key }));
  };
}
