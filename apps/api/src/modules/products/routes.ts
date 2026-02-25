import { Router } from "express";

import v from "@/modules/products/helpers/validators";

import { getAllProductsResponse } from "./controllers";

const productRouter: Router = Router();

productRouter.get("/products", v.getAll.middleware, getAllProductsResponse);

export { productRouter };
