import { combineReducers } from "@reduxjs/toolkit";
import { sidebarListReducer } from "./sidebarListSlice";
import { reportListReducer } from "./reportList";
import { bettListReducer } from "./betListSlice";

export const matchReducer = combineReducers({
  sidebarList: sidebarListReducer,
  reportList: reportListReducer,
  bettListSlice: bettListReducer
});
