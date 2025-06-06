import { createSlice } from "@reduxjs/toolkit";
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
  liveScoreBoardData: any;
  matchDetails: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
  liveScoreBoardData:null
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
          sessionBettings: action.payload?.sessionBettings ?? [],
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
          sessionBettings: action.payload?.sessionBettings ?? [],
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
          apiTiedMatch2,
          other,
          bookmaker,
          bookmaker2,
          marketCompleteMatch,
          marketCompleteMatch1,
          matchOdd,
          sessionBettings,
          manualTideMatch,
          quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          // setWinner,
          completeManual,
          tournament,
          scoreBoard,
        } = action.payload;
        
        state.liveScoreBoardData = scoreBoard?.data;
        state.loading = false;
        // let parsedSessionBettings = sessionBettings?.map(
        //   (item: any) => {
        //     let parsedItem = JSON.parse(item);
        //     return parsedItem;
        //   }
        // );
        // let updatedFormat = convertData(parsedSessionBettings);

        // let updatedSessionBettings = updateSessionBettingsItem(
        //   updatedFormat,
        //   apiSession
        // );
        state.matchDetails = {
          ...state.matchDetails,
          // manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          // apiSessionActive: apiSession?.length >= 0 ? true : false,
          gmid:action.payload?.gmid,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          apiTideMatch2: apiTiedMatch2,
          bookmaker: bookmaker,
          bookmaker2,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          marketCompleteMatch1,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          firstHalfGoal,
          halfTime,
          overUnder,
          manualCompleteMatch: completeManual,
          sessionBettings: sessionBettings,
          tournament: tournament?.sort((a: any, b: any) => {
            // Primary sort by sno (ascending)
            if (a.sno !== b.sno) {
              return a.sno - b.sno;
            }
            // If sno values are equal, sort so that null parentId comes first
            if (a.parentBetId === null && b.parentBetId !== null) return -1;
            if (a.parentBetId !== null && b.parentBetId === null) return 1;
            return 0;
          }),
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
              [jobData?.betId +
              "_profitLoss_" +
              jobData?.matchId]: JSON.stringify(userRedisObj),
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [jobData?.teamArateRedisKey]: userRedisObj[
                jobData?.teamArateRedisKey
              ],
              [jobData?.teamBrateRedisKey]: userRedisObj[
                jobData?.teamBrateRedisKey
              ],
              [jobData?.teamCrateRedisKey]: userRedisObj[
                jobData?.teamCrateRedisKey
              ],
            },
          };
        }
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
