import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DragonTiger2020Component from "../../../../components/cardGames/games/dt2020";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
    getCardDetailInitial,
    getDragonTigerDetailHorseRacing,
    resetCardDetail,
    updateBalanceOnBetPlaceCards,
    updateCardMatchRates,
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

const DragonTiger2020 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardMatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.dragonTiger20) {
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
      dispatch(getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId }));
    }
  };
  const handleMatchResult = () => {
    dispatch(getUsersProfile());
  };
  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        dispatch(getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.dragonTiger20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
        socketService.card.joinMatchRoom(cardGamesType.dragonTiger20);
        socketService.card.getCardRates(
          cardGamesType.dragonTiger20,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.dragonTiger20,
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
    try {
      if (dragonTigerDetail?.id) {
        return () => {
          socketService.card.leaveMatchRoom(cardGamesType.dragonTiger20);
          socketService.card.getCardRatesOff(cardGamesType.dragonTiger20);
          socketService.card.getLiveGameResultTop10Off(
            cardGamesType.dragonTiger20
          );
          if (!state?.userId) {
            socketService.card.userCardBetPlacedOff();
            socketService.card.cardResultOff();
            socketService.card.matchResultDeclareAllUserOff();
          }
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id, state]);

  useEffect(() => {
    if (state?.userId) {
      dispatch(
        getCardDetailInitial(
          `${cardGamesType.dragonTiger20}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
      dispatch(
        getDragonTigerDetailHorseRacing(
          `${cardGamesType.dragonTiger20}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
    } else {
      dispatch(getCardDetailInitial(cardGamesType.dragonTiger20));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.dragonTiger20));
    }
    return () => {
      socketService.card.cardResult(handleMatchResult);
      dispatch(resetCardDetail());
    };
  }, [state]);

  return loading ? <Loader /> : <DragonTiger2020Component />;
};

export default DragonTiger2020;
