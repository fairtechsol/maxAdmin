import { createSlice } from "@reduxjs/toolkit";
import {
  changeAmmountUser,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
} from "../../actions/user/userActions";

interface InitialState {
  userList: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  userList: null,
  success: false,
  loading: false,
  error: null,
};

export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeAmmountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAmmountUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeAmmountUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setCreditRefference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCreditRefference.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setCreditRefference.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setExposureLimit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setExposureLimit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setExposureLimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setLockUnlockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setLockUnlockUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setLockUnlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const userListReducers = userList.reducer;
