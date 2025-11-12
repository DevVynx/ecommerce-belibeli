import { RequestHandler } from "express";

const findAll: RequestHandler = (req, res) => {
  res.json({
    title: "cerveja",
    rating: "4.5",
    price: "$200",
  });
};

export { findAll };
