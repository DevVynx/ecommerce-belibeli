import { Router } from "express";

import v from "@/modules/products/helpers/validators";

import { getAll } from "./controllers";

const productRouter: Router = Router();

productRouter.get("/products", v.getAll.middleware, getAll);

export { productRouter };
