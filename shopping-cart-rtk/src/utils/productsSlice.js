import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_API } from "./constants";

/**
 * ASYNC THUNK: Handling Asynchronous Logic
 * createAsyncThunk manages the lifecycle of an API request.
 * It automatically dispatches 'pending', 'fulfilled', and 'rejected' actions.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(PRODUCTS_API);
      const data = await res.json();
      return data.products; // This becomes the 'action.payload' in the fulfilled case
    } catch (error) {
      // rejectionWithValue allows us to pass a custom error message to the rejected case
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  /**
   * EXTRA REDUCERS:
   * Used for actions defined outside the slice (like the async fetchProducts thunk).
   * The 'builder' allows us to listen to the three states of our promise.
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Data from our return statement above
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from rejectWithValue
      });
  },
});

export default productsSlice.reducer;
