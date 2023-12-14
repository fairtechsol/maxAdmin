import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { userReducer1 } from "./reducers/user";
import { userReducer } from "./reducers/user/userReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    user1: userReducer1,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
