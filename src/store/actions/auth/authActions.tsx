import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface LoginData {
  userName: string;
  password: string;
  loginType: string;
}

export const login = createAsyncThunk<any, LoginData>(
  "auth/login",
  async (requestData, thunkApi) => {
    try {
      const { data } = await service.post(
        `${ApiConstants.AUTH.LOGIN}`,
        requestData
      );
      const { token, userId } = data;
      localStorage.setItem("jwtMaxAdmin", token);
      localStorage.setItem("uid", userId);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const checkOldPassword = createAsyncThunk<any, any>(
  "check/oldPassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.AUTH.OLD_PASSWORD}`,
        requestData
      );
      if (resp) {
        return resp?.data?.isPasswordMatch;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const logout = createAsyncThunk<any>("auth/logout", async () => {
  try {
    const response = await service.post(`${ApiConstants.AUTH.LOGOUT}`);
    localStorage.clear();
    window.location.replace("/admin/login");
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.status;
  }
});

export const generateAuthToken = createAsyncThunk<any, any>(
  "generateAuthToken",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.AUTHENTICATOR.generateAuthToken,
        requestData
      );
      return resp.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const verifyAuthToken = createAsyncThunk<any, any>(
  "verifyAuthToken",
  async (requestData, thunkApi) => {
    try {
      const resp: any = await service.post(
        ApiConstants.AUTHENTICATOR.verifyAuthToken,
        { authToken: requestData.authToken }
      );
      if (resp?.statusCode === 200) {
        localStorage.setItem("isAuthenticator", "true");
        if (requestData?.loginData?.isBetExist) {
          window.location.replace("/admin/market-analysis");
        } else {
          window.location.replace(
            `/admin/active-inactive-user-list/${localStorage.getItem("uid")}`
          );
        }
        return resp.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getAuthenticator = createAsyncThunk<any>(
  "getAuthenticator",
  async (_, thunkApi) => {
    try {
      const resp: any = await service.get(
        ApiConstants.AUTHENTICATOR.getAuthenticator
      );
      if (resp) {
        return resp.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const resendTokenToDisable = createAsyncThunk<any>(
  "resendTokenToDisable",
  async (_, thunkApi) => {
    try {
      const resp: any = await service.post(
        ApiConstants.AUTHENTICATOR.resendToken
      );
      if (resp) {
        return resp.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const removeAuthenticator = createAsyncThunk<any, any>(
  "removeAuthenticator",
  async (requestData, thunkApi) => {
    try {
      const resp: any = await service.post(
        ApiConstants.AUTHENTICATOR.removeAuthenticator,
        requestData
      );
      if (resp) {
        return resp.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const authReset = createAction("auth/reset");
