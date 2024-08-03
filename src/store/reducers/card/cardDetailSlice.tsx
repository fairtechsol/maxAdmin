import { createSlice } from "@reduxjs/toolkit";
import {
  casinoScoreboardMatchRates,
  casinoWarMatchRates,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  resetScoreBoard,
  resultDragonTiger,
  update7BCardMatchRates,
  update7CardMatchRates,
  updateCard32BMatchRates,
  updateCard32MatchRates,
  updateCardAbj1Rates,
  updateCardAbjRates,
  updateCardMatchRates,
  updateCardPoker1DayRates,
  updateCardPoker20Rates,
  updateCardPoker6Rates,
  updateCardRace20Rates,
  updateCardSuperoverRates,
  updateCricket5MatchRates,
  updateCricketMatch20MatchRates,
  updateDragonTigerLionRates,
  updateDragonTigerOneDayRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  updateTeenPatti1DMatchRates,
  updateTeenPattiMatchRates,
  updateTeenPattiOpenMatchRates,
  updateTeenPattiTestMatchRates,
} from "../../actions/card/cardDetail";
import _ from "lodash";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  dragonTigerDetail: any;
  lucky7Detail: any;
  liveGameResultTop10: any;
  cards32Detail: any;
  resultData: any;
  scoreBoardData: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
  dragonTigerDetail: null,
  lucky7Detail: [],
  liveGameResultTop10: [],
  cards32Detail: [],
  resultData: null,
  scoreBoardData: null,
};

const cardDetail = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDragonTigerDetailHorseRacing.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getDragonTigerDetailHorseRacing.fulfilled, (state, action) => {
        state.success = true;
        state.dragonTigerDetail = action.payload;
        state.liveGameResultTop10 = action.payload.topTenResult;
      })
      .addCase(getDragonTigerDetailHorseRacing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateCardMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const tiePair = t2.slice(0, 4);
          const dragonOdds = t2.slice(4, 8);
          const dragonCards = t2.slice(8, 21);
          const tigerOdds = t2.slice(21, 25);
          const tigerCards = t2.slice(25, 38);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            profitLoss:
              t1[0]?.mid === 0 ? {} : { ...state.dragonTigerDetail.profitLoss },
            videoInfo,
            tiePair,
            dragonOdds,
            dragonCards,
            tigerOdds,
            tigerCards,
          };
        }
      })
      .addCase(update7CardMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const lowHigh = t2.slice(0, 2);
          const redBlack = t2.slice(2, 4);
          const luckOdds = t2.slice(4, 6);
          const luckyCards = t2.slice(6, 19);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            lowHigh,
            redBlack,
            luckOdds,
            luckyCards,
          };
        }
      })
      .addCase(update7BCardMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          const { t1, t2 } = action.payload;
          const videoInfo = { ...t1[0] };
          const lowHigh = t2.slice(0, 2);
          const redBlack = t2.slice(2, 4);
          const luckOdds = t2.slice(4, 6);
          const luckyCards = t2.slice(6, 19);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            lowHigh,
            redBlack,
            luckOdds,
            luckyCards,
          };
        }
      })
      .addCase(updateCardAbjRates.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          const { t1, t2 } = action.payload;
          const videoInfo = { ...t1[0] };
          const abjSa = t2.slice(0, 3);
          const abjSb = t2.slice(3, 6);
          const oddEven = t2.slice(23, 25);
          const abjCards = t2.slice(19, 23);
          const cards = t2.slice(6, 19);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            abjSa,
            abjSb,
            oddEven,
            abjCards,
            cards,
          };
        }
      })
      .addCase(updateLiveGameResultTop10.fulfilled, (state, action) => {
        state.liveGameResultTop10 = action.payload;
      })
      .addCase(updateProfitLossCards.fulfilled, (state, action) => {
        state.dragonTigerDetail = {
          ...state.dragonTigerDetail,
          profitLoss: {
            ...state.dragonTigerDetail.profitLoss,
            ...action.payload,
          },
        };
      })
      .addCase(updateTeenPattiMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          const { t1, t2 } = action.payload;
          const videoInfo = { ...t1[0] };
          const playerA = t2.slice(0, 2);
          const playerB = t2.slice(2, 4);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            playerA,
            playerB,
          };
        }
      })
      .addCase(updateCard32MatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          const { t1, t2 } = action.payload;
          const videoInfo = { ...t1[0] };
          const set1 = t2.slice(0, 2);
          const set2 = t2.slice(2, 4);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            set1,
            set2,
          };
        }
      })
      .addCase(resultDragonTiger.pending, (state) => {
        // state.loading = true;
        state.success = false;
        state.error = null;
        state.resultData = null;
      })
      .addCase(resultDragonTiger.fulfilled, (state, action) => {
        state.success = true;
        state.resultData = action.payload;
      })
      .addCase(resultDragonTiger.rejected, (state, action) => {
        // state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateDragonTigerLionRates.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          const { t1, t2 } = action.payload;
          const videoInfo = { ...t1[0] };
          const dragonData = t2.slice(0, 18);
          const tigerData = t2.slice(18, 36);
          const lionData = t2.slice(36, 54);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            profitLoss:
              t1[0]?.mid === 0 ? {} : { ...state.dragonTigerDetail.profitLoss },
            videoInfo,
            dragonData,
            tigerData,
            lionData,
          };
        }
      })
      .addCase(updateDragonTigerOneDayRates.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          const { t1, t2 } = action.payload;
          const videoInfo = { ...t1[0] };
          const pair = { ...t2[2] };
          const matchOddsData = t2.slice(0, 2);
          const dragonData = t2.slice(3, 11);
          const tigerData = t2.slice(11, 19);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            profitLoss:
              t1[0]?.mid === 0 ? {} : { ...state.dragonTigerDetail.profitLoss },
            videoInfo,
            dragonData,
            tigerData,
            matchOddsData,
            pair,
          };
        }
      })
      .addCase(updateTeenPatti1DMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1 } = action.payload;
          state.loading = false;

          const videoInfo = {
            ...t1[0],
            C4: t1[1].C1,
            C5: t1[1].C2,
            C6: t1[1].C3,
          };
          const playerA = t1.slice(0, 1);
          const playerB = t1.slice(1, 2);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            playerA,
            playerB,
          };
        }
      })
      .addCase(updateTeenPattiOpenMatchRates.fulfilled, (state, action) => {
        const payload = action?.payload;
        if (payload) {
          const { t1, t2 } = payload;

          state.loading = false;

          const videoInfo = { ...t1[0] };

          const players = t2
            .slice(0, 8)
            .map((player: any, index: any) => ({
              [`player${index + 1}`]: player,
            }))
            .reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {});

          const pairsPlus = t2
            .slice(8, 16)
            .map((pair: any, index: any) => ({
              [`pairPlus${index + 1}`]: pair,
            }))
            .reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {});

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            players,
            pairsPlus,
          };
        } else {
          console.error("Action payload is undefined");
          state.loading = false;
        }
      })
      .addCase(updateCardAbj1Rates.fulfilled, (state, action) => {
        const payload = action?.payload;
        if (payload) {
          state.loading = false;
          const { t1, t2, t3 } = payload;
          const videoInfo = { ...t1[0] };
          const cardInfo = { ...t3[0] };
          const ander = t2.slice(0, 13);
          const bahar = t2.slice(13, 26);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            cardInfo,
            ander,
            bahar,
          };
        }
      })
      .addCase(updateCardSuperoverRates.fulfilled, (state, action) => {
        const payload = action?.payload;
        if (payload) {
          state.loading = false;
          const { t1, t2, t3, t4 } = payload;
          const videoInfo = { ...t1[0] };
          const bookmaker = { ...t2 };
          const fancy = { ...t3 };
          const fancy1 = { ...t4 };
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            bookmaker,
            fancy,
            fancy1,
          };
        }
      })
      .addCase(updateCardRace20Rates.fulfilled, (state, action) => {
        const payload = action?.payload;
        if (payload) {
          const { t1, t2 } = payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const cards = t2.slice(0, 4);
          const total = t2.slice(4, 6);
          const win = t2.slice(6, 12);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            cards,
            total,
            win,
          };
        }
      })
      .addCase(updateCricket5MatchRates.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          // const { t1, t2, t3 } = payload;
          state.loading = false;
          const videoInfo = { ...(payload?.t1[0] ?? {}) };
          const odds = [...(payload?.t2 ?? {})];
          const fancy = [...(payload?.t3 ?? {})];
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            odds,
            fancy,
          };
        }
      })
      .addCase(updateCard32BMatchRates.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          const { t1, t2 } = payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const matchOdd = t2.slice(0, 4);
          const oddEven = t2.slice(4, 12);
          const redBlack = [t2[12], t2[13], t2[26]];
          const singleCard = t2.slice(14, 24);
          const cardtotal = t2.slice(24, 26);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            matchOdd,
            oddEven,
            redBlack,
            singleCard,
            cardtotal,
          };
        }
      })
      .addCase(casinoWarMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;

          const videoInfo = t1 && t1.length > 0 ? { ...t1[0] } : "";
          const players = t2
            ? t2.map(({ sid, nat, b1, gstatus, min, max }: any) => ({
                sid,
                nat,
                b1,
                gstatus,
                min,
                max,
              }))
            : [];
          const categorizedPlayers = players.reduce((acc: any, player: any) => {
            const category = player.nat.split(" ")[0];
            if (!acc[category]) acc[category] = [];
            acc[category].push(player);
            return acc;
          }, {});

          const chunkedPlayers = Object.values(categorizedPlayers)
            .map((category: any) => _.chunk(category, 6))
            .flat();

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            players: chunkedPlayers,
          };
        } else {
          state.loading = false;
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo: "",
            players: [],
          };
        }
      })
      .addCase(updateCardPoker6Rates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const handsData = t2.slice(0, 6);
          const patternData = t2.slice(6, 15);
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            handsData,
            patternData,
          };
        }
      })
      .addCase(updateCardPoker1DayRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2, t3 } = action.payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const oddsData = { ...t2 };
          const playersBonusPair = { ...t3 };
          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            oddsData,
            playersBonusPair,
          };
        }
      })
      .addCase(updateCardPoker20Rates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const odds = t2.slice(0, 18);

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            odds,
          };
        }
      })
      .addCase(updateCricketMatch20MatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;
          const videoInfo = { ...t1[0] };
          const leftBoard = t2.slice(0, 5);
          const rightBoard = t2.slice(5, 9);

          let newProfitLoss =
            t1[0]?.mid === 0 ||
            (t1[0]?.mid !== state.dragonTigerDetail?.videoInfo?.mid &&
              state.dragonTigerDetail?.videoInfo?.mid !== undefined)
              ? {}
              : { ...state.dragonTigerDetail.profitLoss };

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            profitLoss: newProfitLoss,
            videoInfo,
            leftBoard,
            rightBoard,
          };
        }
      })
      .addCase(updateTeenPattiTestMatchRates.fulfilled, (state, action) => {
        if (action.payload) {
          const { t1, t2 } = action.payload;
          state.loading = false;

          const videoInfo = { ...t1[0] };

          const sections = [
            t2.slice(0, 1)[0],
            t2.slice(1, 2)[0],
            t2.slice(2, 3)[0],
            t2.slice(3, 4)[0],
            t2.slice(4, 5)[0],
            t2.slice(5, 6)[0],
          ];

          state.dragonTigerDetail = {
            ...state.dragonTigerDetail,
            videoInfo,
            sections,
          };
        }
      })
      .addCase(casinoScoreboardMatchRates.fulfilled, (state, action) => {
        state.scoreBoardData = action.payload;
      })
      .addCase(resetCardDetail, (state) => {
        state.dragonTigerDetail = null;
      })
      .addCase(resetScoreBoard, (state) => {
        state.scoreBoardData = null;
      });
  },
});

export const cardDetailReducers = cardDetail.reducer;
