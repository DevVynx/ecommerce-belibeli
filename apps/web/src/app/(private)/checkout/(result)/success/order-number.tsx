"use client";

import { useSearchParams } from "next/navigation";

export const OrderNumber = () => {
  const searchParams = useSearchParams();
  const order = searchParams.get("order");

  return <span>BEL-{order?.padStart(6, "0").toUpperCase()}</span>;
};
