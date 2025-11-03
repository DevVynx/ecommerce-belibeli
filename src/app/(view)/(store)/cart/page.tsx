import { CartList } from "./components/CartList/CartList";
import { CartHeader } from "./components/Header/CartHeader";

const CartPage = () => {
  return (
    <div className="mx-auto p-3 lg:container">
      <CartHeader />
      <CartList />
    </div>
  );
};

export default CartPage;
