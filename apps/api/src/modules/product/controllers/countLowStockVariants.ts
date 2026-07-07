import type { AdminCountLowStockVariantsResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { productServices } from "../services";

export const countLowStockVariants: RequestHandler = async (
  _req,
  res: Response<AdminCountLowStockVariantsResponse>
) => {
  const result = await productServices.countLowStockVariants();
  res.json(result);
};
