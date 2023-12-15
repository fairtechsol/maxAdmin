import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface ChangePassword {
  userId?: string;
  newPassword: string;
  confirmPassword: string;
  transactionPassword: string;
}

export const getUsers = createAsyncThunk("user/list", async () => {
  try {
    const resp = await service.get(`${ApiConstants.USER.LIST}`);
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
      const resp = await service.post(
        `${ApiConstants.USER.UPDATE}`,
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

export const getUsersProfile = createAsyncThunk("user/profile", async () => {
  try {
    const resp = await service.get(`${ApiConstants.USER.PROFILE}`);
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
      const resp = await service.post(
        `${ApiConstants.USER.BALANCEUPDATE}`,
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

export const setCreditRefference = createAsyncThunk<any, any>(
  "user/update/creditreferrence",
  async (requestData) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CREDITREFERRENCE}`,
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
        `${ApiConstants.USER.EXPOSURELIMIT}`,
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
      const resp = await service.post(
        `${ApiConstants.USER.LOCKUNLOCK}`,
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

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CHANGEPASSWORD}`,
        requestData
      );
      if (resp) {
        console.log(resp.data, "data");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const handleExport = createAsyncThunk<any, string>(
  "user/export",
  async (type) => {
    try {
      const response = await service.get(
        `${ApiConstants.USER.LIST}?type=${type}`
      );

      const fileData = response?.data;

      let blob = new Blob();
      if (type === "pdf") {
        // window.open(`data:application/pdf;base64,${fileData}`, '_blank');
        const binaryData = new Uint8Array(
          atob(fileData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        blob = new Blob([binaryData], { type: "application/pdf" });
      } else if (type === "excel") {
        const binaryData = new Uint8Array(
          atob(fileData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        // Create a Blob from the Uint8Array
        blob = new Blob([binaryData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      }
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create an <a> element and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "temp";
      link.click();
      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const userListReset = createAction("userList/reset");
export const changePasswordReset = createAction("changePasswordReset/reset");
export const profileReset = createAction("profile/reset");
