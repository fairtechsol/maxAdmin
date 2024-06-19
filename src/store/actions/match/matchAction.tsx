import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getCompetitionList = createAsyncThunk<any, any>(
  "competition/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONLIST}${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getCompetitionDates = createAsyncThunk<any, any>(
  "competition/dates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONDATES}${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const betReportAccountList = createAsyncThunk<any, any>(
  "competition/betReportList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.BETHISTORY}?status=${requestData.status}&page=${
          requestData.page || 1
        }&limit=${requestData.limit || 15}&searchBy=${
          requestData.searchBy ?? ""
        }&keyword=${requestData.keyword ?? ""}&isCurrentBets=${true}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getCompetitionMatches = createAsyncThunk<any, any>(
  "competition/matches",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONMATCHES}${requestData?.id}/${requestData?.date}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const setBreadCrumb = createAsyncThunk<any, any>(
  "/breadCrumb",
  async (data) => {
    return data;
  }
);

// ====== Reports ======

export const getReportAccountList = createAsyncThunk<any, any>(
  "transaction/list",
  async ({ id, page, limit, searchBy, keyword, filter, sort }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.ACCOUNTLIST}/${id}?page=${page || 1}&limit=${
          limit || 15
        }&searchBy=${searchBy}&keyword=${keyword}${filter ? filter : ""}&sort=${
          sort ? sort : ""
        }`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getBetAccountStatementModal = createAsyncThunk<any, any>(
  "transaction/BetAccountStatementModal",
  async ({ id, sort, betId, status }, thunkApi) => {
    try {
      const resp = await service.get(
        `${
          ApiConstants.REPORT.BET_ACCOUNTSTATEMENT
        }?betPlaced.userId=${id}&sort=${
          sort ? sort : ""
        }&betId=inArr${JSON.stringify(betId)}${
          status !== null ? `&status=${status}` : ""
        }`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getReportCurrentBet = createAsyncThunk<any, any>(
  "user/currentBetList",
  async ({ id, page, limit, searchBy, keyword, filter }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.ACCOUNTLIST}/${id}?page=${page || 1}&limit=${
          limit || 15
        }&searchBy=${searchBy}&keyword=${keyword || ""}${filter}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getGameReport = createAsyncThunk<any, any>(
  "gameReport/bet",
  async ({ type, page, searchBy, keyword, filter }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.BETHISTORY}?status=${type || ""}&searchBy=${
          searchBy || ""
        }&keyword=${keyword ? keyword : ""}${filter ? filter : ""}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getGeneralReport = createAsyncThunk<any, any>(
  "user/generalReport",
  async ({ type, page, limit, searchBy, keyword, filter }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.GENRALREPORT}?type=${type}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getProfitLossReport = createAsyncThunk<any, any>(
  "user/profitLossReport",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.REPORT.PROFIT_LOSS}`,
        requestData
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const matchDetailAction = createAsyncThunk<any, any>(
  "/match/details",
  async (matchId, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHDETAILS}${matchId}`
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
export const otherMatchDetailAction = createAsyncThunk<any, any>(
  "/otherMatch/details",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.OTHERMATCHDETAILS}${requestData?.matchId}?matchType=${requestData?.matchType}`
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

export const getPlacedBets = createAsyncThunk<any, any>(
  "/bet",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.GETPLACEDBETS}?status=PENDING&betPlaced.matchId=${id}`
      );
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateUserMatchLock = createAsyncThunk<any, any>(
  "/userMatchLock",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.USER_MATCH_LOCK}`,
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
export const getMatchLockAllChild = createAsyncThunk<any, any>(
  "/matchLockAllChild",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_MATCH_LOCK_ALL_CHILD}?matchId=${id}`
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
export const getUserDetailsForParent = createAsyncThunk<any, any>(
  "/userDetails_ForParent",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_DETAIL_FOR_PARENT}?userId=${id}`
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

export const getUserDetailsOfLock = createAsyncThunk<any, any>(
  "/userDetails_ForLock",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_CHECK_CHILD_DEACTIVATE}?matchId=${id}`
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

export const getRunAmount = createAsyncThunk<any, any>(
  "/runAmount",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.BET.RUN_AMOUNT}/${id}`);
      if (resp?.data !== null) {
        return JSON.parse(resp?.data?.profitLoss).betPlaced;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getCardReport = createAsyncThunk<any, any>(
  "user/card/report",
  async ({ type, page, limit, searchBy, keyword, filter }) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.CARD_REPORT}${type}?page=${
          page || 1
        }&limit=${limit || 15}&searchBy=${searchBy}&keyword=${
          keyword || ""
        }&sort=cardResult.createdAt:DESC${filter}`
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

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const resetRunAmount = createAction("runAmount/reset");
export const successResetForLockUnlock = createAction(
  "successResetForLockUnlock/reset"
);
export const betReportAccountListReset = createAction(
  "betReportAccountList/reset"
);
