import type { ProductOption, ProductOptionValue } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export type ProductInclude = Prisma.ProductGetPayload<{
  include: {
    category: { select: { id: true; name: true } };
    productOption: { include: { values: true } };
  };
}>;

export type ProductOptionsArray = ProductInclude["productOption"];

export type OptionValue = ProductOptionValue;

export type BackendOption = {
  optionId: number;
  optionValueId: number;
}

export type ProductOptionWithValues = ProductOption & {
  values: OptionValue[];
};
