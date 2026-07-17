import { RequestHandler } from "express";

import { productServices } from "@/modules/product/services";

export const uploadVariantImage: RequestHandler = async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      error: "BadRequestError",
      message: "Nenhum arquivo enviado",
    });
    return;
  }

  const { url, publicId } = await productServices.uploadVariantImage(req.file.buffer);

  res.json({ url, publicId });
};
