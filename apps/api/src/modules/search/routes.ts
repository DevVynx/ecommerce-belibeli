import { Router } from "express";

import { registerAnalytics, searchSuggestions } from "@/modules/search/controllers";
import v from "@/modules/search/validators";

const searchRouter: Router = Router();
searchRouter.post("/search/analytics", v.registerAnalytics.middleware, registerAnalytics);
searchRouter.get("/search/suggestions", v.searchSuggestions.middleware, searchSuggestions);
export { searchRouter };
