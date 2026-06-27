export type CreateOrderRequest = {
  addressId?: string;
  shippingAddress?: {
    receiverName: string;
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  shippingPrice: number;
  paymentMethod: "card" | "pix";
};
