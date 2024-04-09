import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersProfile,
  profileReset,
  updateUserBalance,
} from "../../../store/actions/user/userActions";

interface InitialState {
  userDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  userDetail: null,
  loading: false,
  success: false,
  error: null,
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
      .addCase(updateUserBalance.fulfilled, (state, action) => {
        state.userDetail = {
          ...state.userDetail,
          userBal: {
            ...state.userDetail.userBal,
            currentBalance: action.payload.currentBalance,
            profitLoss: action.payload.profitLoss,
          },
        };
      });
  },
});

export const profileReducer = profileSlice.reducer;
