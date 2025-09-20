import { createSlice } from "@reduxjs/toolkit";
import { addToCart, clearUserCart, getUserCart } from "../Action";
import type { IGetUserCart } from "../../interfaces/responses/Ecom.response";

interface CartState {
  cart: IGetUserCart["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add to cart";
      })
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cart";
      })
      .addCase(clearUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to clear cart";
      });
  },
});

export const { clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;
