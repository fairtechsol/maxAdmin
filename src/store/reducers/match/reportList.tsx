import { createSlice } from "@reduxjs/toolkit";
import {
  
    getReportAccountList, getReportCurrentBet,
} from "../../actions/match/matchAction";

interface InitialState {
    ReportAccountList: any;
    CurrentBetAccountList: any;
    loading: boolean;
    success: boolean;
    error: any;
}

const initialState: InitialState = {
    ReportAccountList: [],
    CurrentBetAccountList: [],
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
            });
    },
});

export const reportListReducer = reportListSlice.reducer;