import type { RequestHandler } from "express";

export const authentication: RequestHandler = (req, res, next) => {
  console.log("alguma coisa1");
  next();
};
