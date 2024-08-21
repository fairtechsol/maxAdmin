import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CricketMatch20Component from "../../../../components/cardGames/games/cricketMatch_20";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateCricketMatch20MatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const CricketMatch20 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCricketMatch20MatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.cmatch20) {
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
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
        socketService.card.getCardRatesOff(cardGamesType.cmatch20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.cmatch20);
        socketService.card.getCardRates(
          cardGamesType.cmatch20,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.cmatch20,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cmatch20));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.cmatch20);
        socketService.card.getCardRatesOff(cardGamesType.cmatch20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(resetCardDetail());
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  return loading ? <Loader /> : <CricketMatch20Component />;
};

export default CricketMatch20;
