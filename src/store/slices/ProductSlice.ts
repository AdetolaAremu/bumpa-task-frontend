import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../Action";
import type {
  IAllProducts,
  IGetAProduct,
} from "../../interfaces/responses/Ecom.response";

interface ProductsState {
  products: IAllProducts["data"];
  product: IGetAProduct["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
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
  product: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
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
    clearError: (state) => {
      state.error = null;
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
      });
  },
});

export const { clearProducts, clearProduct, clearError } =
  productsSlice.actions;
export default productsSlice.reducer;
