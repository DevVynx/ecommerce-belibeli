import type { CartItemDto } from "@repo/types/contracts";

import { CartItem } from "./CartItem";

type CartListProps = {
  items: CartItemDto[];
  addPendingItem: (itemId: string) => void;
  removePendingItem: (itemId: string) => void;
};

export const CartList = ({ items, addPendingItem, removePendingItem }: CartListProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addPendingItem={addPendingItem}
          removePendingItem={removePendingItem}
        />
      ))}
    </div>
  );
};
