import { RegisterAnalyticsResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { searchServices } from "@/modules/search/services";
import v from "@/modules/search/validators";

export const registerAnalytics: RequestHandler = async (
  req,
  res: Response<RegisterAnalyticsResponse>
) => {
  const { term } = v.registerAnalytics.getValidatedValues(req).body;

  const { suggestion } = await searchServices.registerAnalytics({ term });

  return res.status(201).json({ suggestion });
};
