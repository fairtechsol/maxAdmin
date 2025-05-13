import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { userListReducers } from "./userListSlice";
import { userUpdateReducer } from "./userUpdateSlice";
import { userMultiLoginReducer } from "./userMultiLogin";

export const userReducer = combineReducers({
  profile: profileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducers,
  multiLogin: userMultiLoginReducer
});
