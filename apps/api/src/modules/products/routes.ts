import { Router } from "express";
import { findAll } from "./controller.js";
import { validator } from "@/modules/products/validator.js";

const productRouter: Router = Router();

productRouter.get("/products/:teste", validator, findAll);

export { productRouter };
