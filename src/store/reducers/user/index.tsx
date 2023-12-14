import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { userListReducers } from "./userListSlice";
import { userUpdateReducer } from "./userUpdateSlice";

export const userReducer1 = combineReducers({
  profile: profileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducers,
});
