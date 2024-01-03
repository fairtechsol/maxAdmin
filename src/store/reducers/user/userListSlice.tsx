import { createSlice } from "@reduxjs/toolkit";
import {
  changeAmmountUser,
  getUsers,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
  changePassword,
} from "../../actions/user/userActions";

interface InitialState {
  userList: any;
  success: boolean;
  loading: boolean;
  error: any;
  transactionPassword: any;
}

const initialState: InitialState = {
  userList: null,
  success: false,
  loading: false,
  error: null,
  transactionPassword: "",
};

export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userList = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
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
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.transactionPassword = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const userListReducers = userList.reducer;
