import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Cards32BComponent from "../../../../components/cardGames/games/cards32B";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateCard32BMatchRates,
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

const Cards32B = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCard32BMatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.card32B) {
      dispatch(updateBetsPlaced(event?.jobData));
      dispatch(updateBalanceOnBetPlaceCards(event?.jobData));
      dispatch(updateProfitLossCards(event?.userRedisObj));
    }
  };

  const handleCardResult = (event: any) => {
    if (event?.matchId === dragonTigerDetail?.id) {
      dispatch(
        getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId })
      );
    }
  };
  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
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
        socketService.card.getCardRatesOff(cardGamesType.card32B);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.card32B);
        socketService.card.getCardRates(
          cardGamesType.card32B,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.card32B,
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
      try {
        socketService.card.leaveMatchRoom(cardGamesType.card32B);
        socketService.card.getCardRatesOff(cardGamesType.card32B);
        socketService.card.getLiveGameResultTop10Off(cardGamesType.card32B);
        if (!state?.userId) {
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
          socketService.card.matchResultDeclareAllUserOff();
        }
        socketService.card.cardResult(handleMatchResult);
      } catch (e) {
        console.log(e);
      }
    };
  }, [dragonTigerDetail?.id, state]);

  useEffect(() => {
    if (state?.userId) {
      dispatch(
        getCardDetailInitial(
          `${cardGamesType.card32B}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
      dispatch(
        getDragonTigerDetailHorseRacing(
          `${cardGamesType.card32B}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
    } else {
      dispatch(getCardDetailInitial(cardGamesType.card32B));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.card32B));
    }
    return () => {
      dispatch(resetCardDetail());
    };
  }, [state]);

  return loading ? <Loader /> : <Cards32BComponent />;
};

export default memo(Cards32B);
