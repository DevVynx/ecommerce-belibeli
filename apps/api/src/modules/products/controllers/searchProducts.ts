import { SearchProductsResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/products/helpers/validators";
import { ProductMapper } from "@/modules/products/mappers";

import { productServices } from "../services";

export const searchProducts: RequestHandler = async (
  req,
  res: Response<SearchProductsResponse>
) => {
  const { query } = v.searchProducts.getValidatedValues(req);
  const { q, categoryId, minPrice, maxPrice, sortBy, offset, limit } = query;

  const { enrichedProducts, pagination } = await productServices.search({
    q,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    offset,
    limit,
  });

  const { products } = ProductMapper.toCatalogSummary(enrichedProducts);

  return res.json({
    products,
    filters: {
      categories: [],
      priceRange: { min: 0, max: 0, absoluteMin: 0, absoluteMax: 0 },
      ratingOptions: [],
      onSaleCount: 0,
      options: [],
    },
    pagination,
  });
};
