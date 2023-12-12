import { createReducer } from "@reduxjs/toolkit";
import {
  addUser,
  changeAmmountUser,
  getUsers,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
  userListReset,
} from "../../actions/user/userActions";

interface InitialState {
  userDetail: any;
  childUserDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  userList: any;
}

const initialState: InitialState = {
  userDetail: null,
  childUserDetail: null,
  success: false,
  loading: false,
  error: null,
  userList: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.userList = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.userList = action.payload;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(changeAmmountUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(changeAmmountUser.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.userList = action.payload;
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
    .addCase(userListReset, (state) => {
      return { ...state, success: false };
    });
});
