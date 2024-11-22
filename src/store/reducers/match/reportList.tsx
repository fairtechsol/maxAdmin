import { createSlice } from "@reduxjs/toolkit";
import {
  getReportAccountList,
  getReportCurrentBet,
  getGameReport,
  getGeneralReport,
  getProfitLossReport,
  getBetAccountStatementModal,
  getCardReport,
  resetGameReportList,
  getCasinoReport,
  getCasinoReportGameList,
} from "../../actions/match/matchAction";

interface InitialState {
  ReportAccountList: any;
  CurrentBetAccountList: any;
  gameReportList: any;
  gameGeneralList: any;
  casinoResultReport: any;
  casinoReport: any;
  casinoReportGameList: any;
  profitLossReport: any;
  betAccountStatementModal: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  ReportAccountList: [],
  CurrentBetAccountList: [],
  gameReportList: [],
  gameGeneralList: [],
  casinoResultReport: null,
  casinoReport: [],
  casinoReportGameList: [],
  betAccountStatementModal: null,
  profitLossReport: null,
  loading: false,
  success: false,
  error: null,
};

const reportListSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportAccountList.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getReportAccountList.fulfilled, (state, action) => {
        state.success = true;
        state.ReportAccountList = action.payload;
        state.loading = false;
      })
      .addCase(getReportAccountList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getReportCurrentBet.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getReportCurrentBet.fulfilled, (state, action) => {
        state.success = true;
        state.CurrentBetAccountList = action.payload;
        state.loading = false;
      })
      .addCase(getReportCurrentBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getGameReport.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getGameReport.fulfilled, (state, action) => {
        state.success = true;
        state.gameReportList = action.payload;
        state.loading = false;
      })
      .addCase(getGameReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getGeneralReport.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getGeneralReport.fulfilled, (state, action) => {
        state.success = true;
        state.gameGeneralList = action.payload;
        state.loading = false;
      })
      .addCase(getGeneralReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfitLossReport.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfitLossReport.fulfilled, (state, action) => {
        state.success = true;
        state.profitLossReport = action.payload;
        state.loading = false;
      })
      .addCase(getProfitLossReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getBetAccountStatementModal.pending, (state) => {
        state.loading = false;
        state.error = null;
        state.betAccountStatementModal = null;
      })
      .addCase(getBetAccountStatementModal.fulfilled, (state, action) => {
        state.betAccountStatementModal = action.payload;
        state.loading = false;
      })
      .addCase(getBetAccountStatementModal.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCardReport.pending, (state) => {
        // state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getCardReport.fulfilled, (state, action) => {
        // state.loading = false;
        state.casinoResultReport = action.payload;
      })
      .addCase(getCardReport.rejected, (state, action) => {
        // state.loading = false;
        // state.success = false;
        state.error = action?.error?.message;
      })
      .addCase(getCasinoReport.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getCasinoReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.casinoReport = action.payload;
      })
      .addCase(getCasinoReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCasinoReportGameList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getCasinoReportGameList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.casinoReportGameList = action.payload;
      })
      .addCase(getCasinoReportGameList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })

      .addCase(resetGameReportList, (state) => {
        state.gameReportList = [];
      });
  },
});

export const reportListReducer = reportListSlice.reducer;
