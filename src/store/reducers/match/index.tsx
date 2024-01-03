import { combineReducers } from "@reduxjs/toolkit";
import { sidebarListReducer } from "./sidebarListSlice";
import { reportListReducer } from "./reportList";

export const matchReducer = combineReducers({
  sidebarList: sidebarListReducer,
  reportList: reportListReducer,
});
