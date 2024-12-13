import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";
import moment from "moment-timezone";

export const getDragonTigerDetailHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/matchDetail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.CARDS.MATCH.GET_CARD_DETAIL}/${requestData}`
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

export const getCardDetailInitial = createAsyncThunk<any, any>(
  "card/cardDetailInitial",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.CARDS.MATCH.GET_CARD_DETAIL_INITIAL}/${requestData}`
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

export const resultDragonTiger = createAsyncThunk<any, any>(
  "result/placeBetDragonTiger",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.CARDS.MATCH.RESULT}/${requestData}`
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
export const transactionProviderBets = createAsyncThunk<any, any>(
  "result/transactionProviderBets",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.REPORT.CASINO_REPORT}/${
          requestData?.id
        }?sort=virtualCasinoBetPlaced.createdAt:ASC&providerName=eq${
          requestData?.name
        }&createdAt=between${moment(new Date(requestData?.date))?.format(
          "YYYY-MM-DD"
        )}|${moment(
          new Date(requestData?.date).setDate(
            new Date(requestData?.date).getDate() + 1
          )
        )?.format("YYYY-MM-DD")}`
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
// export const updateprofitLossDataMatchForHorseRacingOnDelete = createAsyncThunk<any, any>(
//   "horseRacing/profitLossDataMatchUpdateOnDelete",
//   async (data) => {
//     return data;
//   }
// );
export const updateCardMatchRates = createAsyncThunk<any, any>(
  "dt20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const update7CardMatchRates = createAsyncThunk<any, any>(
  "lucky7/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeenPattiMatchRates = createAsyncThunk<any, any>(
  "teen20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardAbjRates = createAsyncThunk<any, any>(
  "abj2/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCard32MatchRates = createAsyncThunk<any, any>(
  "card32/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateLiveGameResultTop10 = createAsyncThunk<any, any>(
  "update/LiveGameResultTop10",
  async (data) => {
    return data;
  }
);
export const updateBalanceOnBetPlaceCards = createAsyncThunk<any, any>(
  "update/balanceOnBetPlaceCards",
  async (data) => {
    return data;
  }
);
export const updateProfitLossCards = createAsyncThunk<any, any>(
  "update/profitLossCards",
  async (data) => {
    return data;
  }
);

export const updateDragonTigerLionRates = createAsyncThunk<any, any>(
  "dtl20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateDragonTigerOneDayRates = createAsyncThunk<any, any>(
  "dtoneDay/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const update7BCardMatchRates = createAsyncThunk<any, any>(
  "lucky7B/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeenPatti1DMatchRates = createAsyncThunk<any, any>(
  "teen/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeenPattiOpenMatchRates = createAsyncThunk<any, any>(
  "teen8/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardAbj1Rates = createAsyncThunk<any, any>(
  "abj1/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const casinoScoreboardMatchRates = createAsyncThunk<any, any>(
  "casinoScoreboard/matchRatesUpdate",
  async (requestData, thunkApi) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      // const resp = await axios.get(
      //   `${Constants.thirdPartyCard}${ApiConstants.SCOREBOARD.match}/${requestData?.id}?gameName=${requestData?.type}`,
      //   config
      // );
      const resp = await axios.get(
        `${Constants.thirdPartyLive}/cricketScore?eventId=${requestData?.id}`,
        config
      );
      if (resp?.data) {
        return resp?.data?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const transactionProviderName = createAsyncThunk<any, any>(
  "result/transactionProviderName",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.REPORT.CASINO_REPORT_PROVIDERS}`);
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateCardSuperoverRates = createAsyncThunk<any, any>(
  "superover/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardRace20Rates = createAsyncThunk<any, any>(
  "race20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCricket5MatchRates = createAsyncThunk<any, any>(
  "cricket5/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCard32BMatchRates = createAsyncThunk<any, any>(
  "card32B/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const casinoWarMatchRates = createAsyncThunk<any, any>(
  "war/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardPoker6Rates = createAsyncThunk<any, any>(
  "poker6/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardPoker1DayRates = createAsyncThunk<any, any>(
  "poker1day/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCardPoker20Rates = createAsyncThunk<any, any>(
  "poker20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateCricketMatch20MatchRates = createAsyncThunk<any, any>(
  "cricketMatch20/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeenPattiTestMatchRates = createAsyncThunk<any, any>(
  "teen9/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateAmarAkbarAnthonyCardMatchRates = createAsyncThunk<any, any>(
  "aaa/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateBollywoodTableCardMatchRates = createAsyncThunk<any, any>(
  "btable/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateCardWorliRates = createAsyncThunk<any, any>(
  "worli2/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateBaccarat1Rates = createAsyncThunk<any, any>(
  "baccarat/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateBaccarat2Rates = createAsyncThunk<any, any>(
  "baccarat2/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const graphData = createAsyncThunk<any, any>(
  "update/graphData",
  async (data) => {
    return data;
  }
);

export const update3CardJRates = createAsyncThunk<any, any>(
  "3cardj/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateQueenRates = createAsyncThunk<any, any>(
  "queen/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const casinoMeterPattiMatchRates = createAsyncThunk<any, any>(
  "casinometer/matchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const ballbyballMatchRates = createAsyncThunk<any, any>(
  "ballbyballMatchRates/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const resetScoreBoard = createAction("scoreboard/reset");
export const resetCardDetail = createAction("cardDetail/reset");
export const transactionProviderBetsReset = createAction("transactionProviderBetsReset/reset");
