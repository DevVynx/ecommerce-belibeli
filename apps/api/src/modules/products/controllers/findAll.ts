import { FindAllProductsResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/products/validators";

import { productServices } from "../services";

export const findAll: RequestHandler = async (
  req,
  res: Response<FindAllProductsResponse>
) => {
  const { query } = v.findAll.getValidatedValues(req);
  const { categoryId, limit, offset } = query;

  const { products, count } = await productServices.findAll({
    categoryId,
    offset,
    limit,
  });
  return res.json({ products, count });
};
