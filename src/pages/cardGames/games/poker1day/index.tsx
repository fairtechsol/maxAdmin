import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket, socketService } from "../../../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { cardGamesType } from "../../../../utils/Constants";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateCardPoker1DayRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import { AppDispatch, RootState } from "../../../../store/store";
import Poker1DayComponent from "../../../../components/cardGames/games/poker1Day";
import Loader from "../../../../components/commonComponent/loader";

const Poker1day = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardPoker1DayRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.poker1Day) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
      dispatch(updateBalanceOnBetPlaceCards(event?.jobData));
      dispatch(updateProfitLossCards(event?.userRedisObj));
    }
  };
  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
  };
  const handleCardResult = (event: any) => {
    if (event?.matchId === dragonTigerDetail?.id) {
      dispatch(getPlacedBets(dragonTigerDetail?.id));
    }
  };
  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
        socketService.card.getCardRatesOff(cardGamesType.poker1Day);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.poker1Day);
        socketService.card.getCardRates(
          cardGamesType.poker1Day,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.poker1Day,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail]);

  useEffect(() => {
    return () => {
      try {
        socketService.card.leaveMatchRoom(cardGamesType.poker1Day);
        socketService.card.getCardRatesOff(cardGamesType.poker1Day);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.poker1Day));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    return () => {
      try {
        dispatch(resetCardDetail());
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return loading ? <Loader /> : <Poker1DayComponent />;
};

export default Poker1day;
