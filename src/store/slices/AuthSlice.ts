// slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../Action";

interface AuthState {
  userToken: string | null;
  loading: boolean;
  loginError: string | null;
}

const initialState: AuthState = {
  userToken: localStorage.getItem("token"),
  loading: false,
  loginError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserToken: (state) => {
      state.userToken = null;
      localStorage.removeItem("token");
      state.loginError = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(logoutUser.fulfilled, (state) => {
        state.userToken = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.userToken = null;
      });
  },
});

export const { clearUserToken, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
