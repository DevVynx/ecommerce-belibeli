import { RequestHandler, Response } from "express";
import { productServices } from "../services";
import { FindAllProductsResponse } from "@repo/types/contracts";
import v from "@/modules/products/validators";

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
