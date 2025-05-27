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
      let params: any = {
        status: requestData.status,
        page: requestData.page || 1,
        limit: requestData.limit || 15,
        searchBy: requestData.searchBy,
        keyword: requestData.keyword,
        isCurrentBets: true,
        marketBetType: requestData.marketBetType,
      };
      if (requestData.betType) {
        params["betType"] = `eq${requestData.betType}`;
      }
      const resp = await service.get(ApiConstants.REPORT.BETHISTORY, {
        params,
      });
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
export const getCasinoReport = createAsyncThunk<any, any>(
  "casino/report",
  async ({ id, page, limit, searchBy, keyword, filter, sort }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.CASINO_REPORT}/${id}?page=${page || 1}&limit=${
          limit || 25
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
export const getCasinoReportGameList = createAsyncThunk<any>(
  "casino/report/gameList",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.REPORT.CASINO_REPORT_PROVIDERS
      );
      if (resp?.data) {
        return resp?.data?.map((item: any) => ({
          label: item,
          value: item,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getBetAccountStatementModal = createAsyncThunk<any, any>(
  "transaction/BetAccountStatementModal",
  async ({ id, sort, betId, status, runnerId, result, isCard }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.BET_ACCOUNTSTATEMENT}?createBy=eq${id}&sort=${
          sort ? sort : ""
        }${
          betId
            ? `&betId=inArr${JSON.stringify(betId)}`
            : runnerId
            ? isCard
              ? `&betPlaced.runnerId=${runnerId}`
              : `&runnerId=eq${runnerId}`
            : ""
        }${result ? `&result=${result}` : status ? `&status=${status}` : ""}`
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
      const resp = await service.get(ApiConstants.REPORT.GENRALREPORT, {
        params: {
          type,
        },
      });
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
        ApiConstants.REPORT.PROFIT_LOSS,
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
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBets = createAsyncThunk<any, any>(
  "/bet",
  async ({ userId, id }, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.BET.GETPLACEDBETS, {
        params: {
          result: `inArr${JSON.stringify(["PENDING", "UNDECLARE"])}`,
          "betPlaced.matchId": id,
          userId: userId,
        },
      });
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMorePlacedBets = createAsyncThunk<any, any>(
  "/bet/more",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.GETPLACEDBETS}?result=inArr${JSON.stringify([
          "PENDING",
          "UNDECLARE",
        ])}&betPlaced.matchId=${requestData.matchId}${
          requestData.filter ? requestData.filter : ""
        }`
      );
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error) {
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
        ApiConstants.USER.USER_MATCH_LOCK,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateUserMarketLock = createAsyncThunk<any, any>(
  "/userMarketLock",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.USER_MARKET_LOCK,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
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
        ApiConstants.USER.USER_MARKET_LOCK_ALL_CHILD,
        {
          params: {
            matchId: id,
          },
        }
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMarketLockAllChild = createAsyncThunk<any, any>(
  "/marketLockAllChild",
  async (requestData, thunkApi) => {
    try {
      let params: any = {
        matchId: requestData?.matchId,
      };
      if (requestData?.betId) {
        params["betId"] = requestData?.betId;
      } else {
        params["sessionType"] = requestData?.sessionType;
      }

      const resp = await service.get(
        ApiConstants.USER.USER_MARKET_LOCK_ALL_CHILD,
        {
          params,
        }
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getUserDetailsForParent = createAsyncThunk<any, any>(
  "/userDetails_ForParent",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.USER_DETAIL_FOR_PARENT, {
        params: {
          userId: id,
        },
      });
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMarketUserBook = createAsyncThunk<any, any>(
  "/marketUserBook",
  async ({ id, type, betId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MARKETWISE_USERBOOK}${id}?type=${type}&betId=${betId}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
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
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getRunAmount = createAsyncThunk<any, any>(
  "/runAmount",
  async ({ id, matchId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.RUN_AMOUNT}/${id}?matchId=${matchId}`
      );
      if (resp?.data !== null) {
        return resp?.data?.profitLoss.betPlaced;
      }
    } catch (error) {
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
        `${ApiConstants.REPORT.CARD_RESULT_REPORT}${type}?page=${
          page || 1
        }&limit=${limit || 15}&searchBy=${searchBy}&keyword=${
          keyword || ""
        }&sort=cardResult.createdAt:DESC${filter}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getMarketAnalysis = createAsyncThunk<any, any>(
  "/marketAnalysis",
  async ({ url }, thunkApi) => {
    try {
      const resp = await service.get(url);
      if (resp) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateBetsPlaced: any = createAsyncThunk<any, any>(
  "/placed/bets",
  async (placedBets) => {
    return placedBets;
  }
);
export const getRunAmountMeter = createAsyncThunk<any, any>(
  "/runAmountMeter",
  async ({ id, matchId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.RUN_AMOUNT}/${id}?matchId=${matchId}`
      );
      if (resp?.data?.profitLoss) {
        let data = {
          id: id,
          arr: resp?.data?.profitLoss ? resp?.data?.profitLoss.betPlaced : [],
        };
        return data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateBalance = createAsyncThunk<any, any>(
  "/user/balance",
  async (balance) => {
    return balance;
  }
);
export const updateTeamRatesOnMarketUndeclare = createAsyncThunk<any, any>(
  "/teamRates/updateOnMarketUndeclare",
  async (data) => {
    return data;
  }
);
export const updatePlacedbetsDeleteReason = createAsyncThunk<any, any>(
  "/updatePlacedbetsDeleteReason/bets",
  async (data) => {
    return data;
  }
);

export const resetRunAmount = createAction("runAmount/reset");
export const successResetForLockUnlock = createAction(
  "successResetForLockUnlock/reset"
);
export const betReportAccountListReset = createAction(
  "betReportAccountList/reset"
);

export const updateTeamRatesOnDelete = createAsyncThunk<any, any>(
  "/teamRates/updateOnDelete",
  async (data) => {
    return data;
  }
);

export const updateMaxLossForDeleteBet = createAsyncThunk<any, any>(
  "/maxLossOnDelete/update",
  async (data) => {
    return data;
  }
);
export const updateMaxLossForBet = createAsyncThunk<any, any>(
  "/maxLoss/update",
  async (data) => {
    return data;
  }
);
export const updateTeamRates = createAsyncThunk<any, any>(
  "/teamRates/update",
  async (data) => {
    return data;
  }
);
export const updatePlacedbets = createAsyncThunk<any, any>(
  "/maxLoss/updatePlacedbets",
  async (data) => {
    return data;
  }
);
export const resetGameReportList = createAction("gameReportList/reset");
export const getMorePlacedBetsReset = createAction("getMorePlacedBets/reset");
export const getMarketLockChildReset = createAction("getMarketLockChild/reset");
export const resetMarketAnalysys = createAction("marketAnalysis/reset");
export const resetPlacedBets = createAction("placedBets/reset");
export const resetCasinoReport = createAction("casinoReport/reset");
