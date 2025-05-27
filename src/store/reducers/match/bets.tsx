import { createSlice } from "@reduxjs/toolkit";
import {
  getMarketLockAllChild,
  getMarketLockChildReset,
  getMarketUserBook,
  getMatchLockAllChild,
  getMorePlacedBets,
  getMorePlacedBetsReset,
  getPlacedBets,
  getRunAmount,
  getRunAmountMeter,
  getUserDetailsForParent,
  getUserDetailsOfLock,
  resetPlacedBets,
  resetRunAmount,
  successResetForLockUnlock,
  updateBetsPlaced,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
  updateUserMarketLock,
  updateUserMatchLock,
} from "../../actions/match/matchAction";

interface InitialState {
  placedBets: any;
  morePlacedBets: any;
  runAmount: any;
  userMatchLock: any;
  matchLockAllChild: any;
  marketLockAllChild: any;
  userDetailsForParent: any;
  loading: boolean;
  success: boolean;
  statusSuccess: boolean;
  error: any;
  childStatus: any;
  userMatchBook: any;
  userMatchLockSuccess: boolean;
  userMatchLockError: boolean;
}

const initialState: InitialState = {
  placedBets: [],
  morePlacedBets: [],
  runAmount: [],
  userMatchLock: [],
  matchLockAllChild: [],
  marketLockAllChild: [],
  userDetailsForParent: [],
  loading: false,
  success: false,
  statusSuccess: false,
  error: null,
  childStatus: {},
  userMatchBook: [],
  userMatchLockSuccess: false,
  userMatchLockError: false,
};

const placedBetsSlice = createSlice({
  name: "bets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.success = true;
        state.placedBets = action.payload;
        state.loading = false;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetPlacedBets, (state) => {
        state.placedBets = [];
      })
      .addCase(getMorePlacedBets.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getMorePlacedBets.fulfilled, (state, action) => {
        state.morePlacedBets = action.payload;
        state.loading = false;
      })
      .addCase(getMorePlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMorePlacedBetsReset, (state) => {
        state.morePlacedBets = [];
      })
      .addCase(getMarketLockChildReset, (state) => {
        state.marketLockAllChild = [];
      })
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getRunAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.runAmount = action.payload;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getRunAmountMeter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.runAmount = [];
      })
      .addCase(getRunAmountMeter.fulfilled, (state, action) => {
        const { arr } = action.payload;
        const modifiedBets = arr;
        state.loading = false;
        state.success = true;
        let data = modifiedBets;
        state.runAmount = data;
      })
      .addCase(getRunAmountMeter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateUserMatchLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.statusSuccess = false;
      })
      .addCase(updateUserMatchLock.fulfilled, (state, action) => {
        state.loading = false;
        state.statusSuccess = true;
        state.userMatchLock = action.payload;
      })
      .addCase(updateUserMatchLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMatchLockAllChild.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchLockAllChild.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchLockAllChild = action.payload;
      })
      .addCase(getMatchLockAllChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMarketLockAllChild.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMarketLockAllChild.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.marketLockAllChild = action.payload;
      })
      .addCase(getMarketLockAllChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMarketUserBook.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMarketUserBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userMatchBook = action.payload;
      })
      .addCase(getMarketUserBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getUserDetailsForParent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsForParent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDetailsForParent = action.payload;
      })
      .addCase(getUserDetailsForParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetRunAmount, (state) => {
        state.runAmount = [];
      })
      .addCase(successResetForLockUnlock, (state) => {
        state.statusSuccess = false;
      })
      .addCase(getUserDetailsOfLock.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsOfLock.fulfilled, (state, action) => {
        state.success = true;
        state.childStatus = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetailsOfLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateUserMarketLock.pending, (state) => {
        state.userMatchLockError = false;
        state.userMatchLockSuccess = false;
      })
      .addCase(updateUserMarketLock.fulfilled, (state, action) => {
        state.userMatchLockSuccess = true;
      })
      .addCase(updateUserMarketLock.rejected, (state, action) => {
        state.userMatchLockError = true;
        state.userMatchLockSuccess = false;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const { newBet, userName } = action.payload;
        const isBetAlreadyPlaced = state.placedBets?.some(
          (item: any) => item?.id === newBet?.betId
        );
        if (!isBetAlreadyPlaced) {
          state.placedBets = [
            { ...newBet, user: { userName } },
            ...state.placedBets,
          ];
        }
      })
      .addCase(updatePlacedbets.fulfilled, (state, action) => {
        const {
          betPlacedId,
          deleteReason,
          // profitLoss,
          // betId,
          isPermanentDelete,
        } = action.payload;

        const updateDeleteReason = (bet: any) => {
          if (betPlacedId?.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }
          return bet;
        };
        if (isPermanentDelete) {
          const updatedBetPlaced = state?.placedBets?.filter(
            (item: any) => !betPlacedId?.includes(item?.id)
          );
          state.placedBets = Array.from(new Set(updatedBetPlaced));
        } else {
          const updatedBetPlaced = state?.placedBets?.map(updateDeleteReason);
          state.placedBets = Array.from(new Set(updatedBetPlaced));
        }
        // if (betPlacedId) {
        //   const updatedSessionProLoss = state?.sessionProLoss?.map(
        //     (item: any) =>
        //       betId === item?.id
        //         ? {
        //             ...item,

        //             proLoss: [
        //               JSON.stringify(profitLoss),
        //               ...item.proLoss.slice(1),
        //             ],
        //           }
        //         : item
        //   );
        //   state.sessionProLoss = updatedSessionProLoss;
        // }
      })
      .addCase(updatePlacedbetsDeleteReason.fulfilled, (state, action) => {
        const { betIds, deleteReason } = action.payload;
        const updateDeleteReason = (bet: any) => {
          if (betIds?.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }

          return bet;
        };

        const updatedBetPlaced = state.placedBets?.map(updateDeleteReason);

        state.placedBets = Array.from(new Set(updatedBetPlaced));
      });
  },
});

export const placedBetsReducer = placedBetsSlice.reducer;
