import { createSlice } from "@reduxjs/toolkit";
import type {
  IAllProducts,
  IGetAProduct,
  IGetUserCart,
  ILoginUser,
} from "../../interfaces/responses/Ecom.response";
import { addToCart, getAllProducts, getUserCart, loginUser } from "./Action";

interface AppState {
  products: IAllProducts["data"];
  product: IGetAProduct["data"] | null;
  cart: IGetUserCart["data"] | null;
  userToken: string | null;
  loading: boolean;
  error: string | null;
  loginError: string | null;
}

const initialState: AppState = {
  products: {
    current_page: 1,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 1,
    last_page_url: "",
    next_page_url: null,
    path: "",
    per_page: 20,
    prev_page_url: null,
    to: 0,
    total: 0,
  },
  userToken: localStorage.getItem("token"),
  product: null,
  cart: null,
  loading: false,
  error: null,
  loginError: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = { ...initialState.products };
      state.error = null;
      state.loading = false;
    },
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
      state.loading = false;
    },
    clearCart: (state) => {
      state.cart = null;
      state.error = null;
      state.loading = false;
    },
    clearUserToken: (state) => {
      state.userToken = null;
      localStorage.removeItem("token");
      state.error = null;
      state.loading = false;
      state.loginError = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load products";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload ?? "Login failed";
      })

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
        // console.log("Payload in reducer:", action.payload);
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cart";
      });
  },
});

export const {
  clearProducts,
  clearProduct,
  clearCart,
  clearUserToken,
  clearError,
  clearLoginError, // <-- Export this
} = appSlice.actions;

export default appSlice.reducer;
