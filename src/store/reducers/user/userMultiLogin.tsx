import { createSlice } from "@reduxjs/toolkit";
import {
    addUserMultiLogin,
    changePasswordUserMultiLogin,
    getUserMultiLoginList,
    lockUserMultiLogin,
    resetAddSuccessMultiUser,
    resetMultiLoginSucess,
} from "../../../store/actions/user/userActions";

interface InitialState {
  success: boolean;
  loading: boolean;
  addSuccess: boolean;
  error: any;
  multiLoginUserList: [];
}

const initialState: InitialState = {
  loading: false,
  addSuccess: false,
  success: false,
  error: null,
  multiLoginUserList: [],
};

const userMultiLoginSlice = createSlice({
  name: "userMultiLogin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserMultiLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserMultiLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.addSuccess = true;
      })
      .addCase(addUserMultiLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getUserMultiLoginList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserMultiLoginList.fulfilled, (state, action) => {
        state.loading = false;
        state.multiLoginUserList = action.payload;
      })
      .addCase(getUserMultiLoginList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(lockUserMultiLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(lockUserMultiLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(lockUserMultiLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(changePasswordUserMultiLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordUserMultiLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePasswordUserMultiLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetAddSuccessMultiUser, (state) => {
        state.addSuccess = false;
      })
      .addCase(resetMultiLoginSucess, (state) => {
        state.success = false;
      });
  },
});

export const userMultiLoginReducer = userMultiLoginSlice.reducer;
