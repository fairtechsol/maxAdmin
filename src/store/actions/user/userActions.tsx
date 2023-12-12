import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";

interface ChangePassword {
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
