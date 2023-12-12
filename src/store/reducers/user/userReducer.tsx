import { createReducer } from "@reduxjs/toolkit";
import {
  changePassword,
  changePasswordReset,
  getUsers,
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
    .addCase(changePassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(changePassword.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
    })
    .addCase(changePassword.rejected, (state) => {
      state.loading = false;
    })
    .addCase(userListReset, (state) => {
      return { ...state, success: false };
    })
    .addCase(changePasswordReset, (state) => {
      return { ...state, success: false };
    });
});
