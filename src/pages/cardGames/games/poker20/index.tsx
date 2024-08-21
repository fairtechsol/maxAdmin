import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Poker20Component from "../../../../components/cardGames/games/poker20";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateCardPoker20Rates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const Poker20 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardPoker20Rates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.poker20) {
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
        socketService.card.getCardRatesOff(cardGamesType.poker20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.poker20);
        socketService.card.getCardRates(
          cardGamesType.poker20,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.poker20,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
        socketService.card.matchResultDeclareAllUser(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    return () => {
      try {
        socketService.card.leaveMatchRoom(cardGamesType.poker20);
        socketService.card.getCardRatesOff(cardGamesType.poker20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.poker20));
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

  return loading ? <Loader /> : <Poker20Component />;
};

export default Poker20;
