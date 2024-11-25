import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BollywoodTableComponent from "../../../../components/cardGames/games/bollywoodTable";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateBollywoodTableCardMatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const BollywoodTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateBollywoodTableCardMatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.btable) {
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
        socketService.card.getCardRatesOff(cardGamesType.btable);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.btable);
        socketService.card.getCardRates(
          cardGamesType.btable,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.btable,
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
      dispatch(getCardDetailInitial(cardGamesType.btable));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.btable));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.btable);
        socketService.card.getCardRatesOff(cardGamesType.btable);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(resetCardDetail());
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <BollywoodTableComponent />;
};

export default BollywoodTable;
