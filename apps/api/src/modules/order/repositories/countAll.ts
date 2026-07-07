import { db } from "@/shared/lib/db";

export const countAll = async () => {
  return db.order.count();
};
