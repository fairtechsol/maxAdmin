import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CardJComponent from "../../../../components/cardGames/games/3CardJ";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  update3CardJRates,
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

const CardJ = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(update3CardJRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        dispatch(
          getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId })
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  const handleBetPlacedOn3CardJ = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.cardj) {
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
      dispatch(
        getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId })
      );
    }
  };

  const handleMatchResult = () => {
    dispatch(getUsersProfile());
  };

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.cardj);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.cardj);
        socketService.card.getCardRates(
          cardGamesType.cardj,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.cardj,
          handleLiveGameResultTop10
        );
        if (!state?.userId) {
          socketService.card.userCardBetPlaced(handleBetPlacedOn3CardJ);
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
            `${cardGamesType.cardj}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
        dispatch(
          getDragonTigerDetailHorseRacing(
            `${cardGamesType.cardj}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
      } else {
        dispatch(getCardDetailInitial(cardGamesType.cardj));
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cardj));
      }
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.cardj);
        socketService.card.getCardRatesOff(cardGamesType.cardj);
        socketService.card.getLiveGameResultTop10Off(cardGamesType.cardj);
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
              `${cardGamesType.cardj}?userId=${state?.userId}&roleName=${state?.roleName}`
            )
          );
          dispatch(
            getDragonTigerDetailHorseRacing(
              `${cardGamesType.cardj}?userId=${state?.userId}&roleName=${state?.roleName}`
            )
          );
        } else {
          dispatch(getCardDetailInitial(cardGamesType.cardj));
          dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cardj));
        }
      } else if (document.visibilityState === "hidden") {
        dispatch(resetCardDetail());
        socketService.card.leaveMatchRoom(cardGamesType.cardj);
        socketService.card.getCardRatesOff(cardGamesType.cardj);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [state]);

  return <CardJComponent />;
};

export default memo(CardJ);
