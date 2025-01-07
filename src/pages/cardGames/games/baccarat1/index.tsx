import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BaccaratComponent from "../../../../components/cardGames/games/baccarat1";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  graphData,
  resetCardDetail,
  updateBaccarat1Rates,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { getUsersProfile } from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const Bacarrat1 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateBaccarat1Rates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.baccarat) {
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
      dispatch(getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId }));
    }
  };

  const handleMatchResult = () => {
    dispatch(getUsersProfile());
  };

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId }));
        socketService.card.getCardRatesOff(cardGamesType.baccarat);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.baccarat);
        socketService.card.getCardRates(
          cardGamesType.baccarat,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.baccarat,
          handleLiveGameResultTop10
        );
        if (!state?.userId) {
          socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
          socketService.card.cardResult(handleCardResult);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id, state]);

  useEffect(() => {
    try {
      if (state?.userId) {
        dispatch(
          getCardDetailInitial(
            `${cardGamesType.baccarat}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
        dispatch(
          getDragonTigerDetailHorseRacing(
            `${cardGamesType.baccarat}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
      } else {
        dispatch(getCardDetailInitial(cardGamesType.baccarat));
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.baccarat));
      }
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.baccarat);
        socketService.card.getCardRatesOff(cardGamesType.baccarat);
        socketService.card.getLiveGameResultTop10Off(cardGamesType.baccarat);
        if (!state?.userId) {
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
        }
        socketService.card.cardResult(handleMatchResult);
        dispatch(resetCardDetail());
      };
    } catch (e) {
      console.log(e);
    }
  }, [state]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.userId) {
          dispatch(
            getCardDetailInitial(
              `${cardGamesType.baccarat}?userId=${state?.userId}&roleName=${state?.roleName}`
            )
          );
          dispatch(
            getDragonTigerDetailHorseRacing(
              `${cardGamesType.baccarat}?userId=${state?.userId}&roleName=${state?.roleName}`
            )
          );
        } else {
          dispatch(getCardDetailInitial(cardGamesType.baccarat));
          dispatch(getDragonTigerDetailHorseRacing(cardGamesType.baccarat));
        }
      } else if (document.visibilityState === "hidden") {
        dispatch(resetCardDetail());
        socketService.card.leaveMatchRoom(cardGamesType.baccarat);
        socketService.card.getCardRatesOff(cardGamesType.baccarat);
        socketService.card.getLiveGameResultTop10Off(cardGamesType.baccarat);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [state]);

  return <BaccaratComponent />;
};

export default Bacarrat1;
