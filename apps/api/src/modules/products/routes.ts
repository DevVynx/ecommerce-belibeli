import { Router } from "express";

import v from "@/modules/products/validators";

import { findAll } from "./controllers";

const productRouter: Router = Router();

productRouter.get("/products", v.findAll.middleware, findAll);

export { productRouter };
