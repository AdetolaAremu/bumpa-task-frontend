import { createSlice } from "@reduxjs/toolkit";
import type { IOrdersResponse } from "../../interfaces/responses/Ecom.response";
import { getAllOrders } from "../Action";

interface OrdersState {
  allOrders: IOrdersResponse["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  allOrders: {
    current_page: 1,
    data: [],
  },
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.allOrders = null;

      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch orders";
      });
  },
});

export const { clearOrders, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;
