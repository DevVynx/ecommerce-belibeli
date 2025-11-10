import type { BackendOption } from "./Product";

export type CreateCartParams = {
  productID: number;
  quantity: number;
  productOptions: BackendOption[];
};
