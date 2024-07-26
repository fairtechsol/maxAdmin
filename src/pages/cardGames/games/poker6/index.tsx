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
  updateCardPoker6Rates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import { AppDispatch, RootState } from "../../../../store/store";
import Poker6Component from "../../../../components/cardGames/games/poker6";
import Loader from "../../../../components/commonComponent/loader";
const Poker6 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardPoker6Rates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.poker6) {
      dispatch(updateBetsPlaced(event?.jobData));
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
        socketService.card.getCardRatesOff(cardGamesType.poker6);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.poker6);
        socketService.card.getCardRates(
          cardGamesType.poker6,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.poker6,
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
        socketService.card.leaveMatchRoom(cardGamesType.poker6);
        socketService.card.getCardRatesOff(cardGamesType.poker6);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.poker6));
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

  return loading ? <Loader /> : <Poker6Component />;
};

export default Poker6;
