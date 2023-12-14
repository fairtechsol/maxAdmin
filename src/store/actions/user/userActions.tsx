import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";

interface ChangePassword {
  userId?: string;
  newPassword: string;
  confirmPassword: string;
  transactionPassword: string;
}

export const getUsers = createAsyncThunk("user/list", async () => {
  try {
    const resp = await service.get("/user/list");
    if (resp) {
      return resp?.data;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});
export const updateUser = createAsyncThunk<any, any>(
  "user/updateUser",
  async (requestData) => {
    try {
      const resp = await service.post("/user/updateUser", requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getUsersProfile = createAsyncThunk("user/profile", async () => {
  try {
    const resp = await service.get(`/user/profile`);
    if (resp) {
      return resp?.data[0][0];
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const addUser = createAsyncThunk<any, any>(
  "user/add",
  async (requestData) => {
    try {
      const resp = await service.post("/user/add", requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const changeAmmountUser = createAsyncThunk<any, any>(
  "balance/update",
  async (requestData) => {
    try {
      const resp = await service.post("/balance/update", requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const setCreditRefference = createAsyncThunk<any, any>(
  "user/update/creditreferrence",
  async (requestData) => {
    try {
      const resp = await service.post(
        "/user/update/creditreferrence",
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const setExposureLimit = createAsyncThunk<any, any>(
  "user/update/exposurelimit",
  async (requestData) => {
    try {
      const resp = await service.post(
        "/user/update/exposurelimit",
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const setLockUnlockUser = createAsyncThunk<any, any>(
  "/user/lockUnlockUser",
  async (requestData) => {
    try {
      const resp = await service.post("/user/lockUnlockUser", requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post("/user/changePassword", requestData);
      if (resp) {
        console.log(resp.data, "data");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const userListReset = createAction("userList/reset");
export const changePasswordReset = createAction("changePasswordReset/reset");
export const profileReset = createAction("profile/reset");
