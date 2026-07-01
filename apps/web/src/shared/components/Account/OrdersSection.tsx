import { listOrders } from "@/shared/actions/orders/listOrders";
import { SectionError } from "@/shared/components/SectionError";

import { OrdersSectionContent } from "./OrdersSectionContent";

export const OrdersSection = async () => {
  const { data, error } = await listOrders();

  if (error || !data) {
    return (
      <div className="rounded-lg border p-6">
        <SectionError
          title="Pedidos indisponíveis"
          description="Não foi possível carregar seus pedidos. Tente novamente mais tarde."
          toastDuration={6000}
        />
      </div>
    );
  }

  return <OrdersSectionContent orders={data.orders} />;
};
