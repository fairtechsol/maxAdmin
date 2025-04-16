import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Lucky7Component from "../../../../components/cardGames/games/lucky7";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  update7CardMatchRates,
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

const Lucky7 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      if (cardGamesType.lucky7 === event?.data?.t1[0]?.gtype) {
        dispatch(update7CardMatchRates(event?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.lucky7) {
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
      if (dragonTigerDetail?.id) {
        dispatch(
          getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId })
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
        socketService.card.joinMatchRoom(cardGamesType.lucky7);
        socketService.card.getCardRates(
          cardGamesType.lucky7,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.lucky7,
          handleLiveGameResultTop10
        );
        if (!state?.userId) {
          socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
          socketService.card.cardResult(handleCardResult);
          socketService.card.matchResultDeclareAllUser(handleCardResult);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id, state]);

  useEffect(() => {
    return () => {
      socketService.card.leaveMatchRoom(cardGamesType.lucky7);
      socketService.card.getCardRatesOff(cardGamesType.lucky7);
      socketService.card.getLiveGameResultTop10Off(cardGamesType.lucky7);
      if (!state?.userId) {
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
      }
    };
  }, [dragonTigerDetail?.id, state]);

  useEffect(() => {
    if (state?.userId) {
      dispatch(
        getCardDetailInitial(
          `${cardGamesType.lucky7}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
      dispatch(
        getDragonTigerDetailHorseRacing(
          `${cardGamesType.lucky7}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
    } else {
      dispatch(getCardDetailInitial(cardGamesType.lucky7));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.lucky7));
    }
    return () => {
      socketService.card.cardResult(handleMatchResult);
      dispatch(resetCardDetail());
    };
  }, [state]);

  return loading ? <Loader /> : <Lucky7Component />;
};

export default memo(Lucky7);
