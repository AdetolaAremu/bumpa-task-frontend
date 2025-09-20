import { createSlice } from "@reduxjs/toolkit";
import type {
  IAllAcheivements,
  IAllBadges,
  IAllProducts,
  IGetAProduct,
  IGetUserCart,
  ILoginUser,
  IOrdersResponse,
  IUserAchievement,
  IUserBadge,
  IUserStats,
} from "../interfaces/responses/Ecom.response";
import {
  addToCart,
  clearUserCart,
  confirmPayment,
  getAllAchievements,
  getAllBadges,
  getAllOrders,
  getAllProducts,
  getUserAchievements,
  getUserBadges,
  getUserCart,
  getUserCashBack,
  getUserStats,
  loginUser,
  proceedToPayment,
} from "./Action";

interface AppState {
  products: IAllProducts["data"];
  product: IGetAProduct["data"] | null;
  cart: IGetUserCart["data"] | null;

  userStat: IUserStats["data"] | null;
  allOrders: IOrdersResponse["data"] | null;
  allBadges: IAllBadges["data"] | null;
  allAchievements: IAllAcheivements["data"] | null;
  allUserAchievements: IUserAchievement["data"] | null;
  allUserBadges: IUserBadge["data"] | null;
  userCashback: string | null;

  userToken: string | null;
  getUrl: string | null;
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
  userStat: null,
  allOrders: {
    current_page: 1,
    data: [],
  },
  allBadges: null,
  allAchievements: null,
  allUserAchievements: null,
  allUserBadges: null,
  userCashback: null,
  cart: null,
  getUrl: null,
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
      })

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
      })

      .addCase(getUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.userStat = action.payload;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch dashboard details";
      })

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
      })

      .addCase(getAllAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.allAchievements = action.payload;
      })
      .addCase(getAllAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch achievements";
      })

      .addCase(getAllBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.allBadges = action.payload;
      })
      .addCase(getAllBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch badges";
      })

      .addCase(getUserAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.allUserAchievements = action.payload;
      })
      .addCase(getUserAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch achievements";
      })

      .addCase(getUserBadges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBadges.fulfilled, (state, action) => {
        state.loading = false;
        state.allUserBadges = action.payload;
      })
      .addCase(getUserBadges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch badges";
      })

      .addCase(getUserCashBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCashBack.fulfilled, (state, action) => {
        state.loading = false;
        state.userCashback = action.payload;
      })
      .addCase(getUserCashBack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cashback";
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
