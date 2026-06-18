import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SORT_BY_PRICE,
  FILTER_BY_STOCK,
  FILTER_BY_RATING,
  FILTER_BY_SEARCH,
  CLEAR_FILTERS,
} from "./actionTypes";

/**
 * PRODUCT INVENTORY REDUCER STATE MACHINE
 * Manages raw product array state and API request lifecycles.
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
        products: action.payload, // Hydrate products collection block
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Cache exception strings
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
