import { createSlice } from "@reduxjs/toolkit";
import {
    betReportAccountList,
} from "../../actions/match/matchAction";

interface InitialState {
    ReportAccountList: any;
    ReportBetList: any;
    CurrentBetAccountList: any;
    loading: boolean;
    success: boolean;
    error: any;
}

const initialState: InitialState = {
    ReportAccountList: [],
    ReportBetList: [],
    CurrentBetAccountList: [],
    loading: false,
    success: false,
    error: null,
};

const bettListSlice = createSlice({
    name: "sidebar",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(betReportAccountList.pending, (state) => {
                state.loading = false;
                state.success = false;
                state.error = null;
            })
            .addCase(betReportAccountList.fulfilled, (state, action) => {
                state.success = true;
                state.ReportBetList = action.payload;
                state.loading = false;
            })
            .addCase(betReportAccountList.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            });
    },
});

export const bettListReducer = bettListSlice.reducer;