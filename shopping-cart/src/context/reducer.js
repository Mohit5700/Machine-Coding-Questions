import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SORT_BY_PRICE,
  FILTER_BY_STOCK,
  FILTER_BY_RATING,
  FILTER_BY_SEARCH,
  CLEAR_FILTERS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_CART_QTY,
} from "./actionTypes";

/**
 * PRODUCT INVENTORY & CART REDUCER STATE MACHINE
 * Manages raw product records, loading states, and checkout arrays.
 */
export const productReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload, // Hydrate main products array
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Cache network error string
      };

    case ADD_TO_CART:
      return {
        ...state,
        /**
         * IMMUTABLE ARRAY EXPANSION:
         * 1. [...state.cart] spreads current cart records to avoid reference mutations.
         * 2. { ...action.payload, qty: 1 } clones the incoming product item details
         *    and injects a fresh 'qty' tracking property initialized at 1 item.
         */
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        /**
         * IMMUTABLE DELETION VIA FILTER:
         * .filter() returns a brand-new array containing all items *except* the one
         * matching the targeted action payload ID.
         */
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case CHANGE_CART_QTY:
      return {
        ...state,
        /**
         * IMMUTABLE REPLACEMENT VIA MAP:
         * .map() loops through your cart items. If it matches the targeted ID,
         * it swaps the quantity property with the new user input. Otherwise,
         * it returns the item completely unchanged.
         */
        cart: state.cart.map(
          (item) =>
            item.id === action.payload.id
              ? { ...item, qty: action.payload.qty } // Replace qty property on match
              : item, // Leave other items untouched
        ),
      };

    default:
      return state;
  }
};
/**
 * FILTER PREFERENCE CONFIGURATION REDUCER STATE MACHINE
 * Tracks parameters applied dynamically across target UI viewports.
 */
export const filterReducer = (state, action) => {
  switch (action.type) {
    case SORT_BY_PRICE:
      return {
        ...state,
        sort: action.payload, // Sets "lowToHigh" or "highToLow"
      };

    case FILTER_BY_STOCK:
      return {
        ...state,
        byStock: action.payload, // Toggles true/false
      };

    case FILTER_BY_RATING:
      return {
        ...state,
        byRating: action.payload, // Tracks active rating boundaries (1-5)
      };

    case FILTER_BY_SEARCH:
      return {
        ...state,
        searchQuery: action.payload, // Captures keyboard value events
      };

    case CLEAR_FILTERS:
      // Resets parameters to initial state values
      return {
        sort: "",
        byStock: false,
        byRating: 0,
        searchQuery: "",
      };

    default:
      return state;
  }
};
