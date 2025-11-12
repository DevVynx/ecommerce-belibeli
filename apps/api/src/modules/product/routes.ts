import { Router } from "express";
import { findAll } from "./controller";
import { authentication } from "@/shared/middlewares/authentication";

const productRouter = Router();

productRouter.get("/product", authentication, findAll);

export { productRouter };
