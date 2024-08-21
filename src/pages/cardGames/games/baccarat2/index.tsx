import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Baccarat2Component from "../../../../components/cardGames/games/baccarat2";
import { socket, socketService } from "../../../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  graphData,
  resetCardDetail,
  updateBaccarat2Rates,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const Bacarrat2 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateBaccarat2Rates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.baccarat2) {
      dispatch(updateBetsPlaced(event?.jobData));
      dispatch(updateBalanceOnBetPlaceCards(event?.jobData));
      dispatch(updateProfitLossCards(event?.userRedisObj));
    }
  };
  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
    dispatch(graphData(event?.graphdata));
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
        socketService.card.getCardRatesOff(cardGamesType.baccarat2);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.baccarat2);
        socketService.card.getCardRates(
          cardGamesType.baccarat2,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.baccarat2,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.baccarat2));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.baccarat2);
        socketService.card.getCardRatesOff(cardGamesType.baccarat2);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(resetCardDetail());
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.baccarat2));
      } else if (document.visibilityState === "hidden") {
        dispatch(resetCardDetail());
        socketService.card.leaveMatchRoom(cardGamesType.baccarat2);
        socketService.card.getCardRatesOff(cardGamesType.baccarat2);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <Baccarat2Component />;
};

export default Bacarrat2;
