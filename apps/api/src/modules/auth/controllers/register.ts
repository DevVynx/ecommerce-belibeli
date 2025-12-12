import { RegisterResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { authServices } from "@/modules/auth/services";
import v from "@/modules/auth/validators";

export const register: RequestHandler = async (
  req,
  res: Response<RegisterResponse>
) => {
  const { name, email, password } = v.register.getValidatedValues(req).body;
  const user = await authServices.register({ name, email, password });

  return res.status(201).json({ user });
};
