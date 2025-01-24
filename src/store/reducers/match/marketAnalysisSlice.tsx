import { createSlice } from "@reduxjs/toolkit";
import { getMarketAnalysis, resetMarketAnalysys } from "../../actions/match/matchAction";

interface InitialState {
  marketAnalysisDetail: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  marketAnalysisDetail: [],
  loading: false,
  success: false,
  error: null,
};

const marketAnalysisSlice = createSlice({
  name: "marketAnalysis",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMarketAnalysis.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMarketAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.marketAnalysisDetail = action.payload;
      })
      .addCase(getMarketAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      }).addCase(resetMarketAnalysys, (state) => {
        state.marketAnalysisDetail = null;
      });
  },
});

export const marketAnalysisReducer = marketAnalysisSlice.reducer;
