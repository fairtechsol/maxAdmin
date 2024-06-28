import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchLockAllChild,
  getPlacedBets,
  getRunAmount,
  getUserDetailsForParent,
  getUserDetailsOfLock,
  resetRunAmount,
  successResetForLockUnlock,
  updateBetsPlaced,
  updateUserMatchLock,
} from "../../actions/match/matchAction";

interface InitialState {
  placedBets: any;
  runAmount: any;
  userMatchLock: any;
  matchLockAllChild: any;
  userDetailsForParent: any;
  loading: boolean;
  success: boolean;
  statusSuccess: boolean;
  error: any;
  childStatus: any;
}

const initialState: InitialState = {
  placedBets: [],
  runAmount: [],
  userMatchLock: [],
  matchLockAllChild: [],
  userDetailsForParent: [],
  loading: false,
  success: false,
  statusSuccess: false,
  error: null,
  childStatus: {},
};

const placedBetsSlice = createSlice({
  name: "bets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.success = true;
        state.placedBets = action.payload;
        state.loading = false;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getRunAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.runAmount = action.payload;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateUserMatchLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.statusSuccess = false;
      })
      .addCase(updateUserMatchLock.fulfilled, (state, action) => {
        state.loading = false;
        state.statusSuccess = true;
        state.userMatchLock = action.payload;
      })
      .addCase(updateUserMatchLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchLockAllChild.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchLockAllChild.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchLockAllChild = action.payload;
      })
      .addCase(getMatchLockAllChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserDetailsForParent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsForParent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDetailsForParent = action.payload;
      })
      .addCase(getUserDetailsForParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetRunAmount, (state) => {
        state.runAmount = [];
      })
      .addCase(successResetForLockUnlock, (state) => {
        state.statusSuccess = false;
      })
      .addCase(getUserDetailsOfLock.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsOfLock.fulfilled, (state, action) => {
        state.success = true;
        state.childStatus = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetailsOfLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const { newBet, userName } = action.payload;

        const isBetAlreadyPlaced = state.placedBets?.some(
          (item: any) => item?.id === newBet?.betId
        );
        if (!isBetAlreadyPlaced) {
          state.placedBets = [
            { ...newBet, user: { userName } },
            ...state.placedBets,
          ];
        }
      });
  },
});

export const placedBetsReducer = placedBetsSlice.reducer;
