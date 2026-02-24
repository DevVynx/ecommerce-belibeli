import { GetAllProductsResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/products/helpers/validators";
import { ProductMapper } from "@/modules/products/mappers";

import { productServices } from "../services";

export const getAll: RequestHandler = async (req, res: Response<GetAllProductsResponse>) => {
  const { query } = v.getAll.getValidatedValues(req);
  const { categoryId, limit, offset } = query;

  const { products: rawProducts } = await productServices.findAll({
    categoryId,
    offset,
    limit,
  });

  const { products } = ProductMapper.toCatalogSummary(rawProducts);

  return res.json({ products });
};
