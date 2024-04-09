import { createSlice } from "@reduxjs/toolkit";
import {
  changeAmmountUser,
  getUsers,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
  changePassword,
  userBalance,
  searchList,
  accountListModalReset,
  getAlreadyUserExist,
  getUserHeaderDetail,
} from "../../actions/user/userActions";

interface InitialState {
  userList: any;
  searchListData: any;
  userBalanceList: any;
  childUsersData: any;
  success: boolean;
  modalSuccess: boolean;
  loading: boolean;
  error: any;
  transactionPassword: any;
  userAlreadyExist: boolean;
}

const initialState: InitialState = {
  userList: null,
  searchListData: null,
  userBalanceList: null,
  childUsersData: null,
  success: false,
  modalSuccess: false,
  loading: false,
  error: null,
  transactionPassword: "",
  userAlreadyExist: false,
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
      .addCase(searchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(searchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.searchListData = action.payload;
      })
      .addCase(searchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserHeaderDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.childUsersData = null;
      })
      .addCase(getUserHeaderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.childUsersData = action.payload;
      })
      .addCase(getUserHeaderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(userBalance.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(userBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userBalanceList = action.payload;
      })
      .addCase(userBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changeAmmountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.modalSuccess = false;
      })
      .addCase(changeAmmountUser.fulfilled, (state) => {
        state.loading = false;
        state.modalSuccess = true;
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
        state.modalSuccess = true;
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
        state.modalSuccess = true;
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
        state.modalSuccess = true;
      })
      .addCase(setLockUnlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.modalSuccess = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.modalSuccess = true;
        state.transactionPassword = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAlreadyUserExist.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAlreadyUserExist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userAlreadyExist = action.payload;
      })
      .addCase(getAlreadyUserExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(accountListModalReset, (state) => {
        state.modalSuccess = false;
      });
  },
});

export const userListReducers = userList.reducer;
