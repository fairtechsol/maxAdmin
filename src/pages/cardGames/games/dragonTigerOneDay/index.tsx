import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateDragonTigerOneDayRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import { cardGamesType } from "../../../../utils/Constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { socket, socketService } from "../../../../socketManager";
import Loader from "../../../../components/commonComponent/loader";
import DragonTigerOneDayComponent from "../../../../components/cardGames/games/dragontigerOneDay";

const DragonTigerOneDay = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateDragonTigerOneDayRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };
  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.dragonTigerOneDay) {
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
      dispatch(
        getDragonTigerDetailHorseRacing(cardGamesType.dragonTigerOneDay)
      );
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
        socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
        socketService.card.joinMatchRoom(cardGamesType.dragonTigerOneDay);
        socketService.card.getCardRates(
          cardGamesType.dragonTigerOneDay,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.dragonTigerOneDay,
          handleLiveGameResultTop10
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.cardResult(handleCardResult);
        socketService.card.matchResultDeclareAllUser(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        return () => {
          socketService.card.leaveMatchRoom(cardGamesType.dragonTigerOneDay);
          socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
          socketService.card.matchResultDeclareAllUserOff();
          dispatch(resetCardDetail());
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <DragonTigerOneDayComponent />;
};

export default DragonTigerOneDay;
