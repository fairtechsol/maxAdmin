import { createSlice } from "@reduxjs/toolkit";
import { addUser } from "../../actions/user/userActions";
// actions/user/userAction

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
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
        state.success = true;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;
