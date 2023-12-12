import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";

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

export const userListReset = createAction("userList/reset");