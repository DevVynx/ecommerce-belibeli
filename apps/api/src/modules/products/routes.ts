import { Router } from "express";
import { findAll } from "./controllers";
import v from "@/modules/products/validators";

const productRouter: Router = Router();

productRouter.get("/products", v.findAll.middleware, findAll);

export { productRouter };
