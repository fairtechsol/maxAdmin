import { createSlice } from "@reduxjs/toolkit";
import {
    addUserMultiLogin,
    getUserMultiLoginList,
    resetAddSuccessMultiUser,
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
        state.error = action?.error?.message;
      })
      .addCase(getUserMultiLoginList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserMultiLoginList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(getUserMultiLoginList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetAddSuccessMultiUser, (state) => {
        state.addSuccess = false;
      });
  },
});

export const userMultiLoginReducer = userMultiLoginSlice.reducer;
