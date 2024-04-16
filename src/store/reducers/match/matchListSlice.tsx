import { createSlice } from "@reduxjs/toolkit";
import {
  matchDetailAction,
  updateMatchRates,
} from "../../actions/match/matchAction";
interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  matchDetails: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
};

const matchListSlice = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(matchDetailAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchDetails = action.payload;
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          bookmaker,
          marketCompleteMatch,
          matchOdd,
          sessionBettings,
          manualTideMatch,
          quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
        } = action.payload;

        let removedsessionBettings = state.matchDetails.sessionBettings.filter(
          (item: any) => {
            return apiSession.some(
              (apiItem: any) => apiItem?.id === JSON.parse(item)?.id
            );
          }
        );

        let newSessionBettings = removedsessionBettings.filter((item: any) => {
          return sessionBettings.some(
            (apiItem: any) => JSON.parse(apiItem)?.id === JSON.parse(item)?.id
          );
        });

        apiSession.forEach((apiItem: any) => {
          if (
            !newSessionBettings.some(
              (item: any) => JSON.parse(item).id === apiItem.id
            )
          ) {
            newSessionBettings.push(
              JSON.stringify({
                id: apiItem?.id,
                name: apiItem?.RunnerName,
                yesRate: apiItem.BackPrice1,
                yesPercent: apiItem.BackSize1,
                noRate: apiItem.LayPrice1,
                noPercent: apiItem.LaySize1,
                selectionId: apiItem.SelectionId,
                minBet: apiItem.min,
                maxBet: apiItem.max,
                activeStatus: apiItem.activeStatus,
                updatedAt: apiItem.updatedAt,
                type: "session",
                isManual: false,
                status:
                  apiItem.GameStatus === "" ? "active" : apiItem.GameStatus,
              })
            );
          }
        });
        sessionBettings.forEach((apiItem: any) => {
          if (
            !newSessionBettings.some(
              (item: any) => JSON.parse(item).id === apiItem.id
            )
          ) {
            newSessionBettings.push(apiItem);
          }
        });

        state.matchDetails = {
          ...state.matchDetails,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSessionActive: apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          bookmaker: bookmaker,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          sessionBettings: newSessionBettings?.map((item: any) => {
            if (!JSON.parse(item)?.selectionId) {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingSession = sessionBettings.find(
                (sessionItem: any) => JSON.parse(sessionItem).id === id
              );
              let parsedSession = JSON.parse(matchingSession);
              if (parsedSession) {
                return JSON.stringify({
                  ...parsedItem,
                  ...parsedSession,
                });
              } else return JSON.stringify(parsedItem);
            } else {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingApiSession = apiSession.find(
                (sessionItem: any) => sessionItem.id === id
              );
              if (matchingApiSession) {
                return JSON.stringify({
                  ...parsedItem,
                  yesRate: matchingApiSession.BackPrice1,
                  yesPercent: matchingApiSession.BackSize1,
                  noRate: matchingApiSession.LayPrice1,
                  noPercent: matchingApiSession.LaySize1,
                  activeStatus: "live",
                  status:
                    matchingApiSession.GameStatus === ""
                      ? "active"
                      : matchingApiSession.GameStatus,
                });
              } else {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: 0,
                  yesRate: 0,
                  yesPercent: 0,
                  noPercent: 0,
                  activeStatus:
                    parsedItem.activeStatus === "live"
                      ? "save"
                      : parsedItem.activeStatus,
                  status:
                    matchingApiSession.GameStatus === ""
                      ? "active"
                      : matchingApiSession.GameStatus,
                });
              }
            }
          }),
        };
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
