import type { BackendOption } from "./product";

export type CreateCartParams = {
  productID: number;
  quantity: number;
  productOptions: BackendOption[];
};
