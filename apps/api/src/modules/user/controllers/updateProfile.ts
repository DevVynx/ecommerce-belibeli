import type { RequestHandler, Response } from "express";

import { userServices } from "@/modules/user/services";

export const updateProfile: RequestHandler = async (req, res: Response) => {
  const { userId } = res.locals.user;
  const { name, email } = req.body;

  const { user } = await userServices.updateProfile({ userId, name, email });

  res.json({ user });
};
