import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Race20Component from "../../../../components/cardGames/games/race20";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateCardRace20Rates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const Race20 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardRace20Rates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.race20) {
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
        socketService.card.getCardRatesOff(cardGamesType.race20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.race20);
        socketService.card.getCardRates(
          cardGamesType.race20,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.race20,
          handleLiveGameResultTop10
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        return () => {
          socketService.card.leaveMatchRoom(cardGamesType.race20);
          socketService.card.getCardRatesOff(cardGamesType.race20);
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    dispatch(getDragonTigerDetailHorseRacing(cardGamesType.race20));
    return () => {
      dispatch(resetCardDetail());
    };
  }, []);

  return loading ? <Loader /> : <Race20Component />;
};

export default Race20;
