import { createContext, useContext, useEffect, useReducer } from "react";
import { filterReducer, productReducer } from "./reducer";
import { PRODUCTS_API } from "../utils/constants";
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "./actionTypes";

// Create a Context object to pass data down without prop-drilling
const ProductContext = createContext();

const Context = ({ children }) => {
  /**
   * DATA REDUCER STATE SLICE:
   * Tracks network inventory retrieval, loading spin statuses, and api faults.
   */
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loading: false,
    error: null,
  });

  /**
   * FILTERS REDUCER STATE SLICE:
   * Keeps track of the current user preferences. We keep this separate from the raw
   * inventory data so we can clear/modify configurations without refetching from the API.
   */
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    sort: "", // Values: "lowToHigh" | "highToLow" | ""
    byStock: false, // Values: true (show everything) | false (hide out of stock)
    byRating: 0, // Values: 1 through 5
    searchQuery: "", // Free-text string input
  });

  /**
   * ASYNC NETWORK CALL HANDLER:
   * Fetches data on initial mounting sequence.
   */
  const fetchProducts = async () => {
    try {
      // Step 1: Turn on the loading flag in state to show a spinner
      dispatch({ type: FETCH_PRODUCTS_REQUEST });

      const res = await fetch(PRODUCTS_API);
      const data = await res.json();

      // Step 2: On success, save the raw items array to state and turn off loading
      if (data?.products) {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: data.products,
        });
      }
    } catch (error) {
      // Step 3: Capture errors and store them in state to show a fallback message
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
  };

  // Run the network fetch once when the context provider hits the screen
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    // Deliver states and dispatch actions through a single provider value interface
    <ProductContext.Provider
      value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * CUSTOM HOOK CONTRACT:
 * Simplifies data consumption across downstream nodes, abstracting standard useContext calls.
 */
export const useProductContext = () => {
  return useContext(ProductContext);
};

export default Context;
