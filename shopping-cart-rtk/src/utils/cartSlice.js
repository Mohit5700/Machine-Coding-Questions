import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      /**
       * IMMUTABLE "PUSH":
       * Thanks to Immer, we can use .push() directly. RTK will translate
       * this into a safe, immutable update behind the scenes.
       */
      state.cartItems.push({ ...action.payload, qty: 1 });
    },

    removeFromCart: (state, action) => {
      // Re-assigning the array via filter is still a standard, safe pattern
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },

    changeCartQty: (state, action) => {
      const { id, qty } = action.payload;
      // .find() returns a reference to the object in the state array
      const product = state.cartItems.find((item) => item.id === id);
      if (product) {
        // Modifying this reference directly updates the state correctly in RTK
        product.qty = qty;
      }
    },
  },
});

export const { addToCart, removeFromCart, changeCartQty } = cartSlice.actions;
export default cartSlice.reducer;
