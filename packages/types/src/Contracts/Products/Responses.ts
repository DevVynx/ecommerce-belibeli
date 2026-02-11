export type ProductValueDto = {
  id: string;
  value: string;
};

export type ProductOptionDto = {
  id: string;
  name: string;
  values: ProductValueDto[];
};

export type PublicVariantDto = {
  id: string;
  sku: string;
  price: number;
  salePrice: number;
  isAvailable: boolean;
  optionValueIds: string[];
};

export type PublicProductDto = {
  id: string;
  title: string;
  description: string;
  image: string;
  ratingRate: number;
  ratingCount: number;
  category: {
    id: string;
    name: string;
  };
  productOptions: ProductOptionDto[];
  variants: PublicVariantDto[];
};

export type GetAllProductsResponse = {
  products: PublicProductDto[];
};
