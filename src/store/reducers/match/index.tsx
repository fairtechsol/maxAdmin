import { combineReducers } from "@reduxjs/toolkit";
import { bettListReducer } from "./betListSlice";
import { placedBetsReducer } from "./bets";
import { marketAnalysisReducer } from "./marketAnalysisSlice";
import { matchListReducer } from "./matchListSlice";
import { reportListReducer } from "./reportList";
import { sidebarListReducer } from "./sidebarListSlice";

export const matchReducer = combineReducers({
  sidebarList: sidebarListReducer,
  reportList: reportListReducer,
  bettListSlice: bettListReducer,
  matchListSlice: matchListReducer,
  placeBets: placedBetsReducer,
  marketAnalysis: marketAnalysisReducer,
});
