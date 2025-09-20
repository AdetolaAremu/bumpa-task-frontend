import { createSlice } from "@reduxjs/toolkit";
import type { IUserStats } from "../../interfaces/responses/Ecom.response";
import { getUserCashBack, getUserStats } from "../Action";

interface UserState {
  userStat: IUserStats["data"] | null;
  userCashback: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userStat: null,
  userCashback: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userStat = null;
      state.userCashback = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { clearUserData, clearError } = userSlice.actions;
export default userSlice.reducer;
