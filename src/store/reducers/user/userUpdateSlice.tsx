import { createSlice } from "@reduxjs/toolkit";
import {
  addSuccessReset,
  addUser,
  successMessageReset,
} from "../../actions/user/userActions";

interface InitialState {
  addSuccess: boolean;
  loading: boolean;
  error: any;
  successMessage: string;
}

const initialState: InitialState = {
  loading: false,
  addSuccess: false,
  error: null,
  successMessage: "",
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
        state.successMessage = "Successfully Insert";
      })
      .addCase(addUser.rejected, (state, action) => {
        let attemptLeftData: any = action.payload;
        state.loading = false;
        if (attemptLeftData?.data?.data?.attemptsLeft) {
          state.successMessage =
            `transaction code not valid. You have ${attemptLeftData.data.data.attemptsLeft}attempt left` ||
            " ";
        }
        state.error = action?.error?.message;
      })
      .addCase(addSuccessReset, (state) => {
        state.addSuccess = false;
      })
      .addCase(successMessageReset, (state) => {
        state.successMessage = "";
      });
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;
