import { combineReducers } from "@reduxjs/toolkit";
import { sidebarListReducer } from "./sidebarListSlice";
import { reportListReducer } from "./reportList";
import { bettListReducer } from "./betListSlice";
import { matchListReducer } from "./matchListSlice";
import { placedBetsReducer } from "./bets";

export const matchReducer = combineReducers({
  sidebarList: sidebarListReducer,
  reportList: reportListReducer,
  bettListSlice: bettListReducer,
  matchListSlice: matchListReducer,
  placeBets: placedBetsReducer,
});
