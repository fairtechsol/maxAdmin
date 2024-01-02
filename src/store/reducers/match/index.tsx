import { combineReducers } from "@reduxjs/toolkit";
import { sidebarListReducer } from "./sidebarListSlice";

export const matchReducer = combineReducers({
  sidebarList: sidebarListReducer,
});
