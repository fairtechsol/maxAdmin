import { createSlice } from "@reduxjs/toolkit";
import {
  dropdownSummary,
  getTotalBalance,
  getUsersProfile,
  profileReset,
  updateUserBalance,
} from "../../../store/actions/user/userActions";

interface InitialState {
  userDetail: any;
  totalBalance: any;
  success: boolean;
  loading: boolean;
  error: any;
  summary: boolean;
}

const initialState: InitialState = {
  userDetail: null,
  totalBalance: null,
  loading: false,
  success: false,
  error: null,
  summary: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUsersProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDetail = action.payload;
      })
      .addCase(getUsersProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(profileReset, (state) => {
        state.success = false;
      })
      .addCase(dropdownSummary.fulfilled, (state, action) => {
        state.summary = action.payload.summary;
      })
      .addCase(updateUserBalance.fulfilled, (state, action) => {
        state.userDetail = {
          ...state.userDetail,
          userBal: {
            ...state.userDetail.userBal,
            currentBalance: action.payload?.currentBalance,
            profitLoss: action.payload?.profitLoss,
          },
        };
      })
      .addCase(getTotalBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalBalance.fulfilled, (state, action) => {
        state.totalBalance = action?.payload;
        state.loading = false;
      })
      .addCase(getTotalBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const profileReducer = profileSlice.reducer;
