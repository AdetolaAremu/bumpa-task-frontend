import { createSlice } from "@reduxjs/toolkit";
import type {
  IAllBadges,
  IAllAcheivements,
  IUserAchievement,
  IUserBadge,
} from "../../interfaces/responses/Ecom.response";
import {
  getAllAchievements,
  getAllBadges,
  getUserAchievements,
  getUserBadges,
} from "../Action";

interface GamificationState {
  allBadges: IAllBadges["data"] | null;
  allAchievements: IAllAcheivements["data"] | null;
  allUserAchievements: IUserAchievement["data"] | null;
  allUserBadges: IUserBadge["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: GamificationState = {
  allBadges: null,
  allAchievements: null,
  allUserAchievements: null,
  allUserBadges: null,
  loading: false,
  error: null,
};

const gamificationSlice = createSlice({
  name: "gamification",
  initialState,
  reducers: {
    clearGamificationData: (state) => {
      state.allBadges = null;
      state.allAchievements = null;
      state.allUserAchievements = null;
      state.allUserBadges = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearGamificationData, clearError } = gamificationSlice.actions;
export default gamificationSlice.reducer;
