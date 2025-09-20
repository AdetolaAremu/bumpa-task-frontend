import { createSlice } from "@reduxjs/toolkit";
import { confirmPayment, proceedToPayment } from "../Action";

interface PaymentState {
  getUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  getUrl: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentUrl: (state) => {
      state.getUrl = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(proceedToPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(proceedToPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.getUrl = action.payload;
      })
      .addCase(proceedToPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to initiate payment";
      })
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.getUrl = action.payload;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to verify payment";
      });
  },
});

export const { clearPaymentUrl, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
