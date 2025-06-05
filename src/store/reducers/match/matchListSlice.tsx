import { createSlice } from "@reduxjs/toolkit";
import {
  matchDetailAction,
  updateBalance,
  updateMatchRates,
  updateMaxLossForBet,
  updateMaxLossForDeleteBet,
  updateTeamRates,
  updateTeamRatesOnDelete,
  updateTeamRatesOnMarketUndeclare,
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
  liveScoreBoardData: null,
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
        state.matchDetails = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        state.success = true;
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
        state.error = action.error?.message;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament, scoreBoard } =
          action.payload;

        state.liveScoreBoardData = scoreBoard?.data;
        state.loading = false;
        state.matchDetails = {
          ...state.matchDetails,
          gmid: action.payload?.gmid,
          apiSession: apiSession,
          sessionBettings: sessionBettings,
          tournament:
            tournament?.length > 0
              ? tournament?.sort((a: any, b: any) => {
                  if (a.sno !== b.sno) {
                    return a.sno - b.sno;
                  }
                  if (a.parentBetId === null && b.parentBetId !== null)
                    return -1;
                  if (a.parentBetId !== null && b.parentBetId === null)
                    return 1;
                  return 0;
                })
              : [],
        };
      })
      .addCase(updateTeamRatesOnMarketUndeclare.fulfilled, (state, action) => {
        const { betId, profitLossData } = action.payload;

        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + state.matchDetails?.id]: JSON.stringify(
              profitLossData?.[betId + "_profitLoss_" + state.matchDetails?.id]
            ),
          },
        };
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const { jobData, userRedisObj } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [jobData?.betId + "_profitLoss_" + jobData?.matchId]:
              JSON.stringify(userRedisObj),
          },
        };
      })
      .addCase(updateTeamRatesOnDelete.fulfilled, (state, action) => {
        const { betId, teamRate } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + state.matchDetails?.id]:
              JSON.stringify(teamRate),
          },
        };
      })
      .addCase(updateMaxLossForDeleteBet.fulfilled, (state, action) => {
        const { bets, betId, profitLoss } = action.payload;
        const match = state?.matchDetails;
        if (!bets?.length || match?.id !== bets?.[0]?.matchId) return;
        let updated = false;
        const updatedProfitLossDataSession =
          match.profitLossDataSession?.map((item: any) => {
            if (item.betId !== betId) return item;
            updated = true;
            return {
              ...item,
              maxLoss: profitLoss?.maxLoss,
              totalBet: profitLoss?.totalBet,
              profitLoss: profitLoss?.betPlaced,
            };
          }) || [];
        if (!updated) {
          updatedProfitLossDataSession.push({
            betId,
            maxLoss: profitLoss?.maxLoss,
            profitLoss: profitLoss?.betPlaced,
            totalBet: 1,
          });
        }
        state.matchDetails = {
          ...match,
          profitLossDataSession: updatedProfitLossDataSession,
        };
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action.payload;
        const match = state?.matchDetails;
        const placedBet = jobData?.placedBet;
        if (match?.id !== placedBet?.matchId) return;
        let updated = false;
        const updatedProfitLossDataSession =
          match.profitLossDataSession?.map((item: any) => {
            if (item.betId !== placedBet.betId) return item;
            updated = true;
            return {
              ...item,
              maxLoss: profitLoss?.maxLoss,
              totalBet: profitLoss?.totalBet,
              profitLoss: profitLoss?.betPlaced,
            };
          }) || [];
        if (!updated) {
          updatedProfitLossDataSession.push({
            betId: placedBet.betId,
            maxLoss: profitLoss?.maxLoss,
            profitLoss: profitLoss?.betPlaced,
            totalBet: 1,
          });
        }
        state.matchDetails = {
          ...match,
          profitLossDataSession: updatedProfitLossDataSession,
        };
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        state.matchDetails.profitLossDataMatch = {
          ...state.matchDetails.profitLossDataMatch,
          [jobData?.betId + "_profitLoss_" + state.matchDetails?.id]:
            JSON.stringify(userRedisObj),
        };
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
