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
  userModalReset,
  getSearchClientList,
  resetSearchUserList,
  getUserWiseExposure,
  resetUserWiseExposureList,
} from "../../actions/user/userActions";

interface InitialState {
  userList: any;
  searchListData: any;
  userBalanceList: any;
  searchUserList: any;
  childUsersData: any;
  success: boolean;
  modalSuccess: boolean;
  loading: boolean;
  userBalanceLoading: boolean;
  error: any;
  transactionPassword: any;
  userAlreadyExist: boolean;
  attemptsLeft: number | string;
  userWiseExposureList: any;
}

const initialState: InitialState = {
  userList: null,
  searchListData: null,
  userBalanceList: null,
  searchUserList: [],
  childUsersData: null,
  success: false,
  modalSuccess: false,
  loading: false,
  userBalanceLoading: false,
  error: null,
  transactionPassword: "",
  userAlreadyExist: false,
  attemptsLeft: 0,
  userWiseExposureList: {},
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
        // state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(searchList.fulfilled, (state, action) => {
        // state.loading = false;
        state.success = true;
        state.searchListData = action.payload;
      })
      .addCase(searchList.rejected, (state, action) => {
        // state.loading = false;
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
        state.userBalanceLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(userBalance.fulfilled, (state, action) => {
        state.userBalanceLoading = false;
        state.success = true;
        state.userBalanceList = action.payload;
      })
      .addCase(userBalance.rejected, (state, action) => {
        state.userBalanceLoading = false;
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
        alert("Successfully balance transfer");
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
        alert("Successfully update credit reference");
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
        alert("Successfully update limit");
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
      })
      .addCase(userModalReset, (state) => {
        state.childUsersData = null;
      })
      .addCase(getSearchClientList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchClientList.fulfilled, (state, action) => {
        state.loading = false;
        state.searchUserList = action?.payload;
      })
      .addCase(getSearchClientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserWiseExposure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWiseExposure.fulfilled, (state, action) => {
        state.loading = false;
        state.userWiseExposureList = action?.payload;
      })
      .addCase(getUserWiseExposure.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetUserWiseExposureList, (state) => {
        state.userWiseExposureList = {};
      })
      .addCase(resetSearchUserList, (state) => {
        state.searchUserList = [];
      });
  },
});

export const userListReducers = userList.reducer;
