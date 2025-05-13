import { createReducer } from "@reduxjs/toolkit";
import {
  authReset,
  checkOldPassword,
  generateAuthToken,
  getAuthenticator,
  login,
  verifyAuthToken,
} from "../../actions/auth/authActions";

const initialState: any = {
  success: false,
  loading: false,
  isAuthenticator: false,
  forceChangePassword: false,
  userRole: "",
  oldPasswordMatched: false,
  loginData: null,
  authToken: "",
  authenticatedData: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const { roleName, forceChangePassword, isAuthenticator } = action.payload;
      state.loading = false;
      state.success = true;
      state.userRole = roleName;
      state.forceChangePassword = forceChangePassword;
      state.loginData = action.payload;
      state.isAuthenticator = isAuthenticator;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(checkOldPassword.pending, (state) => {
      state.oldPasswordMatched = false;
    })
    .addCase(checkOldPassword.fulfilled, (state, action) => {
      state.oldPasswordMatched = action.payload;
    })
    .addCase(checkOldPassword.rejected, (state) => {
      // state.loading = false;
    })
    .addCase(authReset, (state) => {
      state.success = false;
      state.forceChangePassword = false;
    })
    .addCase(generateAuthToken.pending, (state) => {
      state.loading = true;
    })
    .addCase(generateAuthToken.fulfilled, (state, action) => {
      state.loading = false;
      state.authToken = action.payload;
    })
    .addCase(generateAuthToken.rejected, (state) => {
      state.loading = false;
    })
    .addCase(verifyAuthToken.pending, (state) => {
      state.loading = true;
    })
    .addCase(verifyAuthToken.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(verifyAuthToken.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getAuthenticator.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAuthenticator.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticatedData = action.payload;
    })
    .addCase(getAuthenticator.rejected, (state) => {
      state.loading = false;
    });
});
