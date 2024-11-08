import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../utils/helper";
import {
  matchDetailAction,
  otherMatchDetailAction,
  updateBalance,
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
        // state.loading = false;
        state.success = true;
        // state.matchDetails = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          isBookmaker: action.payload?.isBookmaker,
          marketId: action.payload?.marketId,
          rateThan100: action.payload?.rateThan100,
          title: action.payload?.title,
          manualSessionActive: action.payload?.manualSessionActive,
          eventId: action.payload?.eventId,
          isTv: action.payload?.isTv,
          matchType: action.payload?.matchType,
          betFairSessionMinBet: action.payload?.betFairSessionMinBet,
          competitionId: action.payload?.competitionId,
          teamB: action.payload?.teamB,
          teamA: action.payload?.teamA,
          teamC: action.payload?.teamC ?? null,
          betFairSessionMaxBet: action.payload?.betFairSessionMaxBet,
          startAt: action.payload?.startAt,
          apiSessionActive: action.payload?.apiSessionActive,
          competitionName: action.payload?.competitionName,
          id: action.payload?.id,
          isFancy: action.payload?.isFancy,
          teamRates: action.payload?.teamRates,
          profitLossDataSession: action.payload?.profitLossDataSession,
          profitLossDataMatch: action.payload?.profitLossDataMatch,
          stopAt: action.payload?.stopAt ?? null,
        };
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(otherMatchDetailAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(otherMatchDetailAction.fulfilled, (state, action) => {
        // state.loading = false;
        state.success = true;
        // state.matchDetails = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          isBookmaker: action.payload?.isBookmaker,
          marketId: action.payload?.marketId,
          rateThan100: action.payload?.rateThan100,
          title: action.payload?.title,
          manualSessionActive: action.payload?.manualSessionActive,
          eventId: action.payload?.eventId,
          isTv: action.payload?.isTv,
          matchType: action.payload?.matchType,
          betFairSessionMinBet: action.payload?.betFairSessionMinBet,
          competitionId: action.payload?.competitionId,
          teamB: action.payload?.teamB,
          teamA: action.payload?.teamA,
          teamC: action.payload?.teamC ?? null,
          betFairSessionMaxBet: action.payload?.betFairSessionMaxBet,
          startAt: action.payload?.startAt,
          apiSessionActive: action.payload?.apiSessionActive,
          competitionName: action.payload?.competitionName,
          id: action.payload?.id,
          isFancy: action.payload?.isFancy,
          teamRates: action.payload?.teamRates,
          profitLossDataSession: action.payload?.profitLossDataSession,
          profitLossDataMatch: action.payload?.profitLossDataMatch,
          stopAt: action.payload?.stopAt ?? null,
        };
      })
      .addCase(otherMatchDetailAction.rejected, (state, action) => {
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
          // sessionBettings,
          manualTideMatch,
          quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          completeManual,
          tournament,
          other,
        } = action.payload;

        state.loading = false;

        let parsedSessionBettings = state?.matchDetails?.sessionBettings?.map(
          (item: any) => {
            let parsedItem = JSON.parse(item);
            return parsedItem;
          }
        );
        let updatedFormat = convertData(parsedSessionBettings);

        let updatedSessionBettings = updateSessionBettingsItem(
          updatedFormat,
          apiSession
        );

        state.matchDetails = {
          ...state.matchDetails,
          // manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          // apiSessionActive: apiSession?.length >= 0 ? true : false,
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
          manualCompleteMatch: completeManual,
          updatedSessionBettings: updatedSessionBettings,
          tournament,
          other,
        };
      })

      .addCase(updateBalance.fulfilled, (state, action) => {
        const { jobData, userRedisObj } = action.payload;
        // const {
        //   newTeamRateData,
        //   teamArateRedisKey,
        //   teamBrateRedisKey,
        //   teamCrateRedisKey,
        //   betId,
        //   matchBetType,
        //   matchId,
        // } = action.payload;
        if (jobData?.matchBetType === "tournament") {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [jobData?.betId + "_profitLoss_" + jobData?.matchId]:
                JSON.stringify(jobData?.newTeamRateData),
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [jobData?.teamArateRedisKey]:
                userRedisObj[jobData?.teamArateRedisKey],
              [jobData?.teamBrateRedisKey]:
                userRedisObj[jobData?.teamBrateRedisKey],
              [jobData?.teamCrateRedisKey]:
                userRedisObj[jobData?.teamCrateRedisKey],
            },
          };
        }
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
