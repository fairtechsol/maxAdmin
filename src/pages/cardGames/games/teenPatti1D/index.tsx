import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import {
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  updateTeenPatti1DMatchRates,
} from "../../../../store/actions/card/cardDetail";
import { socket, socketService } from "../../../../socketManager";
import Loader from "../../../../components/commonComponent/loader";
import TeentPatti1DComponent from "../../../../components/cardGames/games/teenpatti1D";

const TeenPatti1D = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateTeenPatti1DMatchRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.teenOneDay) {
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
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.teenOneDay));
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
        socketService.card.getCardRatesOff(cardGamesType.teenOneDay);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff()
        socketService.card.joinMatchRoom(cardGamesType.teenOneDay);
        socketService.card.getCardRates(
          cardGamesType.teenOneDay,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.teenOneDay,
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
        socketService.card.leaveMatchRoom(cardGamesType.teenOneDay);
        socketService.card.getCardRatesOff(cardGamesType.teenOneDay);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff()
      } catch (e) {
        console.log(e);
      }
    };
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <TeentPatti1DComponent />;
};

export default TeenPatti1D;
