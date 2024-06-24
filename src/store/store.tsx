import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { matchReducer } from "./reducers/match";
import { userReducer } from "./reducers/user";
import { cardDetailReducers } from "./reducers/card/cardDetailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    card: cardDetailReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
