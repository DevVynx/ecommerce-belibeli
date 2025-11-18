import { productService } from "./service.js";
import { RequestHandler } from "express";
import { getValidatedValues } from "@/modules/products/validator.js";

const findAll: RequestHandler = async (req, res) => {
  const { params, query } = getValidatedValues(req);
  const { teste } = params;
  const { categoryId, limit, offset } = query;
  console.log(teste, categoryId, limit, offset);

  const { products, count } = await productService.findAll({ categoryId, offset, limit });
  return res.json({ products, count });
};

export { findAll };
