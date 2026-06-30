export type OrderDto = {
  id: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  status: string;
  paymentMethod: string | null;
  createdAt: string;
};

export type CreateOrderResponse = {
  order: OrderDto;
  paymentUrl: string;
};
