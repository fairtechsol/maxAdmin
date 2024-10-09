import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  updateQueenRates,
} from "../../../../store/actions/card/cardDetail";
import { socket, socketService } from "../../../../socketManager";
import CasinoQueenComponent from "../../../../components/cardGames/games/casinoQueen";

const CasinoQueen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateQueenRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.queen) {
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
        socketService.card.getCardRatesOff(cardGamesType.queen);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.queen);
        socketService.card.getCardRates(
          cardGamesType.queen,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.queen,
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
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.queen));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.queen);
        socketService.card.getCardRatesOff(cardGamesType.queen);
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
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.queen));
      } else if (document.visibilityState === "hidden") {
        dispatch(resetCardDetail());
        socketService.card.leaveMatchRoom(cardGamesType.queen);
        socketService.card.getCardRatesOff(cardGamesType.queen);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <CasinoQueenComponent />;
};

export default CasinoQueen;
