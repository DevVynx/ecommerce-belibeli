import v from "@/modules/products/validators";
import { productService } from "./service.js";
import { RequestHandler } from "express";

const findAll: RequestHandler = async (req, res) => {
  const { query } = v.findAll.getValidatedValues(req);
  const { categoryId, limit, offset } = query;

  const { products, count } = await productService.findAll({ categoryId, offset, limit });
  return res.json({ products, count });
};

export { findAll };
