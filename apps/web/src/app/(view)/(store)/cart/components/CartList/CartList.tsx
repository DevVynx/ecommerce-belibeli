import type { CartItemDto } from "@repo/types/contracts";

import { CartItem } from "./CartItem";

type CartListProps = {
  items: CartItemDto[];
};

export const CartList = ({ items }: CartListProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};
