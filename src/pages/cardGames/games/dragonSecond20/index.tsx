import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragonSecond20Component from "../../../../components/cardGames/games/dragon2nd20";
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
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";
import { useLocation } from "react-router-dom";
import { getUsersProfile } from "../../../../store/actions/user/userActions";

const DragonTiger20Second = () => {
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
    if (event?.jobData?.matchType === cardGamesType.dragonTiger202) {
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
  const handleMatchResult = () => {
    dispatch(getUsersProfile());
  };
  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.dragonTiger202);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
        socketService.card.joinMatchRoom(cardGamesType.dragonTiger202);
        socketService.card.getCardRates(
          cardGamesType.dragonTiger202,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.dragonTiger202,
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
          socketService.card.leaveMatchRoom(cardGamesType.dragonTiger202);
          socketService.card.getCardRatesOff(cardGamesType.dragonTiger202);
          socketService.card.getLiveGameResultTop10Off(cardGamesType.dragonTiger202);
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
          `${cardGamesType.dragonTiger202}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
      dispatch(
        getDragonTigerDetailHorseRacing(
          `${cardGamesType.dragonTiger202}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
    } else {
      dispatch(getCardDetailInitial(cardGamesType.dragonTiger202));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.dragonTiger202));
    }
    return () => {
      socketService.card.cardResult(handleMatchResult);
      dispatch(resetCardDetail());
    };
  }, [state]);

  return loading ? <Loader /> : <DragonSecond20Component />;
};

export default DragonTiger20Second;
