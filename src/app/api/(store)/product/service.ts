import { db } from "@/app/shared/lib/db";
import { BadRequestError } from "../../HttpErrors";

export async function get(searchParams: URLSearchParams) {
  function getCategoryID(searchParams: URLSearchParams) {
    const categoryIDParam = searchParams.get("categoryID");

    let categoryID: number | undefined = undefined;

    if (categoryIDParam !== null) {
      const parsed = Number(categoryIDParam);

      if (Number.isNaN(parsed) || parsed <= 0) {
        throw new BadRequestError("categoryID precisa ser um número maior que 0");
      }

      categoryID = parsed;
    }

    return categoryID;
  }

  function getPagination(searchParams: URLSearchParams) {
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;
    const offSet = searchParams.get("offset") ? Number(searchParams.get("offset")) : undefined;

    return { limit, offSet };
  }

  const categoryID = getCategoryID(searchParams);

  const { limit = 100, offSet = 0 } = getPagination(searchParams);

  const products = await db.product.findMany({
    where: { categoryId: categoryID },
    include: {
      category: { select: { name: true } },
      productOption: { include: { values: true } },
    },
    skip: offSet,
    take: limit,
  });

  const count = await db.product.count({
    where: { categoryId: categoryID },
    take: limit,
  });

  return { products, count };
}

export const productService = { get };
