import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import productsReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";
import paymentReducer from "./slices/PyamentSlice";
import ordersReducer from "./slices/OrderSlice";
import gamificationReducer from "./slices/GamificationSlice";
import userReducer from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    // product: AppReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    payment: paymentReducer,
    orders: ordersReducer,
    gamification: gamificationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
