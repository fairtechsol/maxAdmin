import { createAsyncThunk } from "@reduxjs/toolkit";
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
  "competition/dates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.BETHISTORY}${requestData}`
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
  async ({ id, page, limit, searchBy, keyword, filter }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.ACCOUNTLIST}/${id}?page=${page || 1}&limit=${
          limit || 15
        }&searchBy=${searchBy}&keyword=${keyword}${filter ? filter : ""}`
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
  "bet",
  async ({ type, page, limit, searchBy, keyword, filter }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.BETHISTORY}?status=${type}&page=${
          page || 1
        }&limit=${limit || 15}&searchBy=${searchBy}&keyword=${
          keyword || ""
        }${filter}`
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
        `${ApiConstants.REPORT.GENRALREPORT}?type=${type}&page=${
          page || 1
        }&limit=${limit || 15}&searchBy=${searchBy}&keyword=${
          keyword || ""
        }${filter}`
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
  async (matchId) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHDETAILS}${matchId}`
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

export const getPlacedBets = createAsyncThunk<any, any>("/bet", async (id) => {
  try {
    const resp = await service.get(
      `${ApiConstants.BET.GETPLACEDBETS}?status=PENDING&betPlaced.matchId=${id}`
    );
    if (resp) {
      return resp?.data?.rows;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);
