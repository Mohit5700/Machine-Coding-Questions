import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  /**
   * CALCULATED DERIVED STATE VIA REDUCE:
   * Do not store total price inside local component state fields! That causes syncing bugs.
   * Instead, recalculate the sum dynamically on every re-render using array .reduce().
   * Formula: total value = cumulative sum + (individual item cost * selection quantity)
   */
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0, // Set calculations accumulator baseline to 0 dollars
  );

  // GUARD CLAUSE: Early return UI layout if basket array length is empty
  return cartItems.length === 0 ? (
    <h1 className="text-center text-3xl">Cart is empty</h1>
  ) : (
    <div className="px-4 py-8 flex flex-col gap-5">
      <div className="text-2xl text-center">
        {/* .toFixed(2) forces currency numbers to clip smoothly into standard two decimal places */}
        Sub-total: ${cartTotal.toFixed(2)}
      </div>

      {/* Loop over your selected list items to create separate item card blocks */}
      {cartItems.map((prod) => (
        <CartItem key={prod.id} prod={prod} />
      ))}
    </div>
  );
};

export default Cart;
