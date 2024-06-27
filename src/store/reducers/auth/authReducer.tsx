import { createReducer } from "@reduxjs/toolkit";
import {
  authReset,
  checkOldPassword,
  login,
} from "../../actions/auth/authActions";

const initialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  userRole: "",
  oldPasswordMatched: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userRole = action.payload.roleName;
      state.forceChangePassword = action?.payload?.forceChangePassword;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(checkOldPassword.pending, (state) => {
      // state.loading = true;
      state.oldPasswordMatched = false;
    })
    .addCase(checkOldPassword.fulfilled, (state, action) => {
      // state.loading = false;
      state.oldPasswordMatched = action.payload;
    })
    .addCase(checkOldPassword.rejected, (state) => {
      // state.loading = false;
    })
    .addCase(authReset, (state) => {
      // Reset the state to initial state
      state.success = false;
      state.forceChangePassword = false;
    });
});
