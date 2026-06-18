import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sort: "",
    byStock: false,
    byRating: 0,
    searchQuery: "",
  },
  /**
   * REDUCERS:
   * RTK uses the 'Immer' library, allowing us to write logic that looks like
   * mutation (state.sort = ...) but is safely handled as an immutable update.
   */
  reducers: {
    sortByPrice: (state, action) => {
      state.sort = action.payload;
    },
    filterByStock: (state, action) => {
      state.byStock = action.payload;
    },
    filterByRating: (state, action) => {
      state.byRating = action.payload;
    },
    filterBySearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      // We can directly re-assign the state properties here
      state.sort = "";
      state.byStock = false;
      state.byRating = 0;
      state.searchQuery = "";
    },
  },
});

// RTK automatically generates Action Creators for every reducer function
export const {
  sortByPrice,
  filterByStock,
  filterByRating,
  filterBySearch,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
