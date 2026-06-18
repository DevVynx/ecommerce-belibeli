import { Router } from "express";

import { registerAnalytics } from "@/modules/search/controllers";
import v from "@/modules/search/helpers/validators";

const searchRouter: Router = Router();
searchRouter.post("/search/analytics", v.registerAnalytics.middleware, registerAnalytics);
export { searchRouter };
