import { createSlice } from "@reduxjs/toolkit";
import { addSuccessReset, addUser } from "../../actions/user/userActions";
// actions/user/userAction

interface InitialState {
  addSuccess: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  loading: false,
  addSuccess: false,
  error: null,
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.addSuccess = true;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(addSuccessReset, (state) => {
        return {
          ...state,
          addSuccess: false
        };
      });
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;
