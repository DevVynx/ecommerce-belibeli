export type ShippingOptionDto = {
  code: string;
  price: number;
  deadline: string;
};

export type QuoteShippingResponse = {
  destinationCep: string;
  originCep: string;
  items: {
    quantity: number;
    weight: number;
  };
  shippingOptions: ShippingOptionDto[];
};
