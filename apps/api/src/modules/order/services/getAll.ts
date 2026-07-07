import { orderRepositories } from "@/modules/order/repositories";

type GetAllOrdersParams = {
  page: number;
  limit: number;
  sort: "asc" | "desc";
};

export const getAll = async ({ page, limit, sort }: GetAllOrdersParams) => {
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    orderRepositories.findAll({ skip, take: limit, sort }),
    orderRepositories.countAll(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return { orders, pagination: { total, page, totalPages } };
};
