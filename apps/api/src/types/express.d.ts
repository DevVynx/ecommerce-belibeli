import "express";

type Property = "body" | "query" | "header" | "params";

declare global {
  namespace Express {
    interface Request {
      validated: Partial<Record<Property, unknown>>;
    }
  }
}
