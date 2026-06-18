import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";

/**
 * REDUX TOOLKIT STORE CONFIGURATION:
 * configureStore automatically sets up the Redux DevTools extension
 * and middleware like redux-thunk.
 */
const store = configureStore({
  reducer: {
    // These keys (products, cart, filter) define the structure of your global state
    products: productReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});

export default store;
