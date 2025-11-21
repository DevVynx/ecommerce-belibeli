import { Router } from "express";
import { findAll } from "./controller";
import v from "@/modules/products/validators";

const productRouter: Router = Router();

productRouter.get("/products", v.findAll.middleware, findAll);

export { productRouter };
