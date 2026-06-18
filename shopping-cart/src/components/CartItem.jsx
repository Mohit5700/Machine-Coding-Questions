import React from "react";
import { useProductContext } from "../context/Context";
import { CHANGE_CART_QTY, REMOVE_FROM_CART } from "../context/actionTypes";
import StarRating from "./StarRating";

const CartItem = ({ prod }) => {
  // Extract dispatcher out of your context manager instance
  const { dispatch } = useProductContext();

  /**
   * REUSABLE UTILITY ACTION DISPATCHER:
   * Bundles quantity mutation events cleanly into a single handler.
   */
  const updateCartQty = (id, qty) => {
    dispatch({ type: CHANGE_CART_QTY, payload: { id, qty } });
  };

  return (
    <div className="flex items-center justify-between p-5 border-2 h-36">
      <img
        src={prod.thumbnail}
        alt={prod.title}
        className="object-contain w-48 h-full"
      />

      <div className="flex flex-col">
        <span>{prod.title}</span>
        {/* Computes row item price totals dynamically (Unit Price * Current Chosen Quantity) */}
        <span>${(prod.price * prod.qty).toFixed(2)}</span>
      </div>

      <StarRating value={prod.rating} />

      {/* QUANTITY CONTROL MODULE */}
      <div className="flex items-center gap-2">
        {/* INCREMENT BUTTON */}
        <button
          className="border p-1 cursor-pointer"
          onClick={() => updateCartQty(prod.id, prod.qty + 1)}
          /* 
            SAFETY GUARD CEILING: 
            Disables click events if user selections hit backend item stock ceilings (prod.stock)
          */
          disabled={prod.qty === prod.stock}
        >
          ➕
        </button>

        <span>{prod.qty}</span>

        {/* DECREMENT BUTTON */}
        <button
          className="border p-1 cursor-pointer"
          onClick={() => {
            /**
             * DECREMENT SAFETY ROUTER:
             * If a user tries to decrement an item that is already down to 1,
             * we interpret that as a choice to completely delete the item.
             * Otherwise, we safely subtract 1 from the active quantity.
             */
            if (prod.qty === 1) {
              dispatch({ type: REMOVE_FROM_CART, payload: prod });
            } else {
              updateCartQty(prod.id, prod.qty - 1);
            }
          }}
        >
          ➖
        </button>
      </div>

      {/* EXPLICIT REMOVE ACTION TRASH BUTTON */}
      <button
        className="px-2 py-1 mt-2 border-none cursor-pointer bg-blue-400 text-white rounded-sm"
        onClick={() =>
          dispatch({
            type: REMOVE_FROM_CART,
            payload: prod,
          })
        }
      >
        Remove from Cart
      </button>
    </div>
  );
};

export default CartItem;
