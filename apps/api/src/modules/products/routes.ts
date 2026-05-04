import { Router } from "express";

import { getProductDetails } from "@/modules/products/controllers/getProductDetails";
import v from "@/modules/products/helpers/validators";

import { getAllProducts } from "./controllers";

const productRouter: Router = Router();

productRouter.get("/products", v.getAll.middleware, getAllProducts);
productRouter.get("/products/:productId", v.getById.middleware, getProductDetails);

export { productRouter };
