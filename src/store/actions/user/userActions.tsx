import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface ChangePassword {
  userId?: string;
  newPassword: string;
  confirmPassword: string;
  oldPassword?: string;
  transactionPassword?: string;
}

interface GetUsers {
  userName?: string;
  page?: number;
  limit?: number;
  sort?: any;
  order?: any;
  userId?: string;
  activeTab?: string;
}
interface SearchUsers {
  userName?: string;
  createdBy?: string;
  isUser?: boolean;
}

interface RequestData {
  userName?: string;
  currentPage?: number;
  url?: any;
  searchBy?: string;
  userId?: string;
  roleName?: string;
  domain?: string;
  filter?: string;
}

export const getUsers = createAsyncThunk<any, GetUsers | undefined>(
  "user/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.LIST}?${
          requestData?.userId ? `userId=${requestData.userId}&` : ""
        }searchBy=user.userName&keyword=${
          requestData?.userName ? requestData?.userName : ""
        }${requestData?.page ? `&page=${requestData.page}` : ""}${
          requestData?.limit ? `&limit=${requestData.limit}` : ""
        }&sort=${requestData?.sort}:${requestData?.order}${
          requestData?.activeTab === "active"
            ? "&user.betBlock=false&userBlock=eqfalse"
            : "&orVal=user.betBlock=true|or|userBlock=eqtrue"
        }`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getTotalBalance = createAsyncThunk<any, RequestData | undefined>(
  "user/balance/total",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.TOTAL_BALANCE}?userId=${
          requestData?.userId ? requestData?.userId : ""
        }&roleName=${requestData?.roleName ? requestData?.roleName : ""}${
          requestData?.filter ? requestData?.filter : ""
        }`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const searchList = createAsyncThunk<any, SearchUsers | undefined>(
  "user/searchList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.SEARCH_LIST}?createBy=${
          requestData?.createdBy
        }&userName=${requestData?.userName ? requestData?.userName : ""}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUserHeaderDetail = createAsyncThunk<any, string>(
  "userHeaderDetail/searchList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_DETAILS_FOR_PARENT}?userId=${requestData}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getAlreadyUserExist = createAsyncThunk<
  any,
  SearchUsers | undefined
>("user/clientName", async (requestData, thunkApi) => {
  try {
    const resp = await service.get(
      `${ApiConstants.USER.ALREADY_EXIST}?userName=${requestData}`
    );
    if (resp) {
      return resp?.data?.isUserExist;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    return thunkApi.rejectWithValue(err.response?.status);
  }
});

export const updateUser = createAsyncThunk<any, any>(
  "user/updateUser",
  async (requestData, thunkApi) => {
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
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUsersProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.USER.PROFILE}`);
      if (resp) {
        localStorage.setItem("key", resp?.data[0][0]?.id);
        return resp?.data[0][0];
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addUser = createAsyncThunk<any, any>(
  "user/add",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post("/user/add", requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.data?.attemptsLeft) {
        alert(
          `transaction code not valid. You have ${error?.response?.data?.data?.attemptsLeft}attempt left`
        );
      }
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const changeAmmountUser = createAsyncThunk<any, any>(
  "balance/update",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.BALANCEUPDATE}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.data?.attemptsLeft) {
        alert(
          `transaction code not valid. You have ${error?.response?.data?.data?.attemptsLeft}attempt left`
        );
      }
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const userBalance = createAsyncThunk<any>(
  "user/balance",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.USER.USERBALANCE}`);
      if (resp) {
        return resp?.data?.response;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setCreditRefference = createAsyncThunk<any, any>(
  "user/update/creditreferrence",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CREDITREFERRENCE}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.data?.attemptsLeft) {
        alert(
          `transaction code not valid. You have ${error?.response?.data?.data?.attemptsLeft}attempt left`
        );
      }
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setExposureLimit = createAsyncThunk<any, any>(
  "user/update/exposurelimit",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.EXPOSURELIMIT}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.data?.attemptsLeft) {
        alert(
          `transaction code not valid. You have ${error?.response?.data?.data?.attemptsLeft}attempt left`
        );
      }
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setLockUnlockUser = createAsyncThunk<any, any>(
  "/user/lockUnlockUser",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.LOCKUNLOCK}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.data?.attemptsLeft) {
        alert(
          `transaction code not valid. You have ${error?.response?.data?.data?.attemptsLeft}attempt left`
        );
      }
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getSearchClientList = createAsyncThunk<
  any,
  SearchUsers | undefined
>("user/clientList", async (requestData, thunkApi) => {
  try {
    const resp = await service.get(
      `${ApiConstants.USER.SEARCH_LIST}?userName=${requestData?.userName}${
        requestData?.isUser ? "&isUser=true" : ""
      }`
    );
    if (resp) {
      return resp?.data;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw thunkApi.rejectWithValue(err.response?.status);
  }
});

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CHANGEPASSWORD}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.data?.attemptsLeft) {
        alert(
          `transaction code not valid. You have ${error?.response?.data?.data?.attemptsLeft}attempt left`
        );
      }
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const handleExport = createAsyncThunk<any, any>(
  "user/export",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(
        `${requestData?.endpoint}?type=${requestData?.type}${
          requestData?.filter ? requestData?.filter : ""
        }${requestData?.userId ? `&userId=${requestData.userId}&` : ""}${
          requestData?.sort
            ? requestData.order
              ? `&sort=${requestData?.sort}:${requestData?.order}`
              : `&sort=${requestData?.sort}`
            : ""
        }${requestData?.searchBy ? `&searchBy=${requestData?.searchBy}` : ""}${
          requestData?.keyword || requestData?.userName
            ? `&keyword=${requestData?.keyword || requestData?.userName}`
            : ""
        }${
          requestData?.activeTab
            ? requestData?.activeTab === "active"
              ? "&user.betBlock=false&userBlock=eqfalse"
              : "&orVal=user.betBlock=true|or|userBlock=eqtrue"
            : ""
        }`
      );

      const fileData = response?.data?.file;

      let blob = new Blob();
      if (requestData?.type === "pdf") {
        // window.open(`data:application/pdf;base64,${fileData}`, '_blank');
        const binaryData = new Uint8Array(
          atob(fileData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        blob = new Blob([binaryData], { type: "application/pdf" });
      } else if (requestData?.type === "excel") {
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
      link.download = requestData.name
        ? `${requestData?.name}`.replace(/[^\w\s]/g, "_")
        : "userlist";
      link.click();
      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUserWiseExposure = createAsyncThunk<any, any>(
  "userwiseExposure/clientList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_WISE_EVENTWISE_EXPOSURE}/${requestData}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateUserBalance = createAsyncThunk<any, any>(
  "updateUserBalance",
  async (data) => {
    return data;
  }
);

export const dropdownSummary = createAsyncThunk<any, any>(
  "dropdownSummary",
  async (data) => {
    return data;
  }
);

export const successMessageReset = createAction("successMessageReset/reset");
export const userListReset = createAction("userList/reset");
export const addSuccessReset = createAction("addSuccess/reset");
export const changePasswordReset = createAction("changePasswordReset/reset");
export const profileReset = createAction("profile/reset");
export const accountListModalReset = createAction("accountListModal/reset");
export const userModalReset = createAction("userModalReset/reset");
export const resetSearchUserList = createAction("searchUserList/reset");
export const resetUserWiseExposureList = createAction(
  "userWiseExposureList/reset"
);
