import { GetAllProductsResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/products/validators";

import { productServices } from "../services";

export const getAll: RequestHandler = async (req, res: Response<GetAllProductsResponse>) => {
  const { query } = v.getAll.getValidatedValues(req);
  const { categoryId, limit, offset } = query;

  const { products } = await productServices.findAll({
    categoryId,
    offset,
    limit,
  });
  return res.json({ products });
};
