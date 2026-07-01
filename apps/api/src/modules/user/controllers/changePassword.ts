import type { RequestHandler, Response } from "express";

import { userServices } from "@/modules/user/services";

export const changePassword: RequestHandler = async (req, res: Response) => {
  const { userId } = res.locals.user;
  const { currentPassword, newPassword } = req.body;

  await userServices.changePassword({ userId, currentPassword, newPassword });

  res.status(204).send();
};
