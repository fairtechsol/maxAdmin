import { createSlice } from "@reduxjs/toolkit";
import { getMarketAnalysis } from "../../actions/match/matchAction";

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
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getMarketAnalysis.fulfilled, (state, action) => {
        state.success = true;
        state.marketAnalysisDetail = action.payload;
        state.loading = false;
      })
      .addCase(getMarketAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const marketAnalysisReducer = marketAnalysisSlice.reducer;
