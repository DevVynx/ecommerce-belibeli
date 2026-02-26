import { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: "NotFoundError",
    message: "Route not found",
    code: "NOT_FOUND",
  });
};
