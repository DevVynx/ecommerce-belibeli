import { Router } from "express";

import v from "@/modules/products/helpers/validators";

import { getAllProducts, getProductBySlug, getProductDetails } from "./controllers";

const productRouter: Router = Router();

productRouter.get("/products", v.getAll.middleware, getAllProducts);
productRouter.get("/products/:productId", v.getById.middleware, getProductDetails);
productRouter.get("/products/slug/:slug", v.getBySlug.middleware, getProductBySlug);

export { productRouter };
