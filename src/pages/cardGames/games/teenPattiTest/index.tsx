import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TeentPattiComponent from "../../../../components/cardGames/games/teenPattiTest";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  updateTeenPattiTestMatchRates,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { getUsersProfile } from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const TeenPattiTest = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateTeenPattiTestMatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.teenTest) {
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
        dispatch(
          getPlacedBets({ id: dragonTigerDetail?.id, userId: state?.userId })
        );
        socketService.card.getCardRatesOff(cardGamesType.teenTest);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.teenTest);
        socketService.card.getCardRates(
          cardGamesType.teenTest,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.teenTest,
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
            `${cardGamesType.teenTest}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
        dispatch(
          getDragonTigerDetailHorseRacing(
            `${cardGamesType.teenTest}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
      } else {
        dispatch(getCardDetailInitial(cardGamesType.teenTest));
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.teenTest));
      }
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.teenTest);
        socketService.card.getCardRatesOff(cardGamesType.teenTest);
        socketService.card.getLiveGameResultTop10Off(cardGamesType.teen20);
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

  return loading ? <Loader /> : <TeentPattiComponent />;
};

export default memo(TeenPattiTest);
