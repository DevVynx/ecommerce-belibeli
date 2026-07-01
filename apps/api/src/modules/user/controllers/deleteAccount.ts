import type { RequestHandler, Response } from "express";

import { userServices } from "@/modules/user/services";

export const deleteAccount: RequestHandler = async (req, res: Response) => {
  const { userId } = res.locals.user;

  await userServices.deleteAccount({ userId });

  res.status(204).send();
};
