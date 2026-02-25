import { FindAllProductsRequest } from "@repo/types/contracts";

export type FindAllProductsParams = FindAllProductsRequest & {
  onlyAvailable?: boolean;
};

export type FindProductByIdParams = {
  productId: string;
};
